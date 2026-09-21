// Recommendation Service for LinguaPath
// Evaluates learner practice attempts across Grammar, Vocabulary, Reading, and Writing,
// and recommends 2 topics with friendly, conversational, human-like reasons (no raw query output).

import { getPracticeAttempts, getUserProfile } from "./storageService";
import { GRAMMAR_TOPICS } from "../data/grammarData";
import { VOCABULARY_SETS } from "../data/vocabularyData";
import { READING_PASSAGES } from "../data/readingData";
import { WRITING_PROMPTS } from "../data/writingPromptsData";

export function findTopicMeta(topicIdOrSetId) {
  const grammar = GRAMMAR_TOPICS.find((t) => t.topic_id === topicIdOrSetId);
  if (grammar) return { title: grammar.title, skill: "grammar", duration: 10 };

  const vocab = VOCABULARY_SETS.find((v) => v.set_id === topicIdOrSetId);
  if (vocab) return { title: vocab.title, skill: "vocabulary", duration: 10 };

  const reading = READING_PASSAGES.find((r) => r.passage_id === topicIdOrSetId);
  if (reading) return { title: reading.title, skill: "reading", duration: 15 };

  const prompt = WRITING_PROMPTS.find((p) => p.prompt_id === topicIdOrSetId);
  if (prompt) return { title: prompt.title, skill: "writing", duration: 15 };

  if (topicIdOrSetId === "writing-lab" || topicIdOrSetId.startsWith("prompt-")) {
    return { title: "Writing Lab: Argumentative Essay", skill: "writing", duration: 15 };
  }

  return { title: topicIdOrSetId, skill: "grammar", duration: 10 };
}

function generateHumanReason(skill, title, avgScore, count) {
  if (skill === "writing") {
    if (avgScore < 60) {
      return "Your recent writing scores have been a little low — let's write a quick piece and boost your confidence.";
    } else if (avgScore < 80) {
      return "You're writing well, but a little more practice will help your paragraphs flow even more naturally.";
    } else {
      return "Great work on your recent writing! Keep up the momentum with another fun prompt.";
    }
  }

  if (avgScore < 50) {
    return `You've struggled with ${title} the last few times — let's practice together and fix that.`;
  } else if (avgScore < 70) {
    return `You're getting the hang of ${title}, but a quick refresher will turn it into second nature.`;
  } else if (avgScore < 85) {
    return `You're doing good with ${title} — a quick review will help you reach mastery.`;
  } else {
    return `You're doing awesome in ${title} — keep your skills sharp with a quick drill!`;
  }
}

export function computeRecommendations() {
  const attempts = getPracticeAttempts();
  const profile = getUserProfile();

  // Retrieve cached writing submissions from localStorage
  let writingAttempts = [];
  try {
    const rawSubs = localStorage.getItem("linguapath_active_writing");
    if (rawSubs) {
      const subs = JSON.parse(rawSubs);
      writingAttempts = subs.map((s) => ({
        topic_id_or_set_id: s.prompt_id || "prompt-gen-1",
        skill: "writing",
        score: s.feedback?.overall_score || 0,
        timestamp: s.timestamp
      }));
    }
  } catch (e) {}

  // Merge practice attempts and writing submissions, then sort chronologically
  const allAttempts = [...attempts, ...writingAttempts].sort(
    (a, b) => new Date(a.timestamp) - new Date(b.timestamp)
  );

  const recommendations = [];

  // Pull the learner's last 5 combined attempts
  const lastFive = allAttempts.slice(-5);

  if (lastFive.length > 0) {
    const grouped = {};
    for (const att of lastFive) {
      const key = att.topic_id_or_set_id;
      if (!grouped[key]) {
        grouped[key] = {
          topic_id: key,
          skill: att.skill,
          scores: []
        };
      }
      grouped[key].scores.push(att.score);
    }

    const topicStats = Object.values(grouped).map((item) => {
      const count = item.scores.length;
      const sum = item.scores.reduce((a, b) => a + b, 0);
      const avgScore = Math.round(sum / count);
      return {
        ...item,
        count,
        avgScore
      };
    });

    // Sort lowest-averaging topics first
    topicStats.sort((a, b) => a.avgScore - b.avgScore);

    for (const stat of topicStats) {
      if (recommendations.length >= 2) break;
      const meta = findTopicMeta(stat.topic_id);
      const reasonText = generateHumanReason(stat.skill, meta.title, stat.avgScore, stat.count);

      recommendations.push({
        topic_id: stat.topic_id,
        topic_title: meta.title,
        skill: stat.skill || meta.skill,
        reason: reasonText,
        suggested_duration_minutes: meta.duration
      });
    }
  }

  // If fewer than 2 recommendations are available, supplement with friendly suggestions
  if (recommendations.length < 2 && profile) {
    const existingIds = new Set(recommendations.map((r) => r.topic_id));

    // If writing has not been practiced, warmly recommend trying the Writing Lab!
    if (!existingIds.has("prompt-gen-1") && (!profile.skill_scores?.writing || profile.skill_scores.writing === 0)) {
      recommendations.push({
        topic_id: "prompt-gen-1",
        topic_title: "Writing Lab: A Memorable Journey",
        skill: "writing",
        reason: "You haven't tried a writing exercise yet — write a short piece to get instant, friendly tips!",
        suggested_duration_minutes: 15
      });
      existingIds.add("prompt-gen-1");
    }

    // Check grammar_topic_scores sorted lowest to highest
    const topicScorePairs = Object.entries(profile.grammar_topic_scores || {})
      .map(([id, score]) => ({ id, score }))
      .sort((a, b) => a.score - b.score);

    for (const pair of topicScorePairs) {
      if (recommendations.length >= 2) break;
      if (!existingIds.has(pair.id)) {
        const meta = findTopicMeta(pair.id);
        const reason =
          pair.score < 60
            ? `You found ${meta.title} a bit tricky during your level check — let's strengthen it together.`
            : `A quick practice session on ${meta.title} will make your sentences sound much more natural.`;

        recommendations.push({
          topic_id: pair.id,
          topic_title: meta.title,
          skill: "grammar",
          reason,
          suggested_duration_minutes: 10
        });
        existingIds.add(pair.id);
      }
    }

    // Supplement with unattempted grammar topics if still under 2
    if (recommendations.length < 2) {
      for (const t of GRAMMAR_TOPICS) {
        if (recommendations.length >= 2) break;
        if (!existingIds.has(t.topic_id)) {
          recommendations.push({
            topic_id: t.topic_id,
            topic_title: t.title,
            skill: "grammar",
            reason: `This is a great everyday skill to practice next to speak and write more fluently.`,
            suggested_duration_minutes: 10
          });
          existingIds.add(t.topic_id);
        }
      }
    }
  }

  return recommendations.slice(0, 2);
}
