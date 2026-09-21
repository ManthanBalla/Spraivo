// Diagnostic assessment battery for initial onboarding
// Contains: 10 grammar questions (1 per topic), 5 vocabulary questions, and 1 reading passage with 4 questions

export const ONBOARDING_ASSESSMENT = {
  grammarQuestions: [
    {
      topic_id: "grammar-pos",
      topic_title: "Parts of Speech",
      question_id: "onb-g1",
      question_text: "In the sentence 'The swift cheetah caught the gazelle effortlessly', what part of speech is 'swift'?",
      question_type: "multiple_choice",
      options: ["Adjective", "Adverb", "Noun", "Verb"],
      correct_answer: "Adjective",
      explanation: "'Swift' modifies the noun 'cheetah', describing its characteristic, which makes it an adjective."
    },
    {
      topic_id: "grammar-nouns",
      topic_title: "Nouns",
      question_id: "onb-g2",
      question_text: "Which of the following nouns is uncountable in standard English?",
      question_type: "multiple_choice",
      options: ["Information", "Suggestion", "Idea", "Fact"],
      correct_answer: "Information",
      explanation: "'Information' is an uncountable noun that cannot be pluralized or directly counted."
    },
    {
      topic_id: "grammar-pronouns",
      topic_title: "Pronouns",
      question_id: "onb-g3",
      question_text: "Choose the correct pronoun: 'The instructor assigned the lab task to Michael and _____.'",
      question_type: "multiple_choice",
      options: ["me", "I", "myself", "he"],
      correct_answer: "me",
      explanation: "Prepositions like 'to' govern the objective case ('to Michael and me')."
    },
    {
      topic_id: "grammar-verbs",
      topic_title: "Verbs",
      question_id: "onb-g4",
      question_text: "What is the past participle of 'choose'?",
      question_type: "multiple_choice",
      options: ["chosen", "chose", "choosed", "chozen"],
      correct_answer: "chosen",
      explanation: "The principal parts of the irregular verb are: choose (base), chose (past simple), chosen (past participle)."
    },
    {
      topic_id: "grammar-adjectives",
      topic_title: "Adjectives",
      question_id: "onb-g5",
      question_text: "Select the sentence with the grammatically correct adjective order:",
      question_type: "multiple_choice",
      options: [
        "He bought a lovely small wooden desk.",
        "He bought a wooden small lovely desk.",
        "He bought a small wooden lovely desk.",
        "He bought a lovely wooden small desk."
      ],
      correct_answer: "He bought a lovely small wooden desk.",
      explanation: "Standard English adjective order places Opinion (lovely) -> Size (small) -> Material (wooden)."
    },
    {
      topic_id: "grammar-articles",
      topic_title: "Articles",
      question_id: "onb-g6",
      question_text: "Choose the correct article: 'She has been waiting here for _____ hour.'",
      question_type: "multiple_choice",
      options: ["an", "a", "the", "no article"],
      correct_answer: "an",
      explanation: "'Hour' begins with a silent 'h' and a vowel sound (/aʊər/), requiring 'an'."
    },
    {
      topic_id: "grammar-prepositions",
      topic_title: "Basic Prepositions",
      question_id: "onb-g7",
      question_text: "Which preposition correctly fills the blank? 'The quarterly conference starts _____ 9:00 AM sharp.'",
      question_type: "multiple_choice",
      options: ["at", "on", "in", "by"],
      correct_answer: "at",
      explanation: "Precise clock times take the preposition 'at'."
    },
    {
      topic_id: "grammar-tenses",
      topic_title: "Present/Past/Future Tenses",
      question_id: "onb-g8",
      question_text: "Choose the correct tense: 'They _____ here since 2018.'",
      question_type: "multiple_choice",
      options: ["have lived", "lived", "are living", "had lived"],
      correct_answer: "have lived",
      explanation: "'Since 2018' marks a period beginning in the past and continuing into the present, requiring the Present Perfect."
    },
    {
      topic_id: "grammar-sva",
      topic_title: "Subject-Verb Agreement",
      question_id: "onb-g9",
      question_text: "Select the correct verb: 'Neither of the proposals _____ approved by the board.'",
      question_type: "multiple_choice",
      options: ["was", "were", "are", "have been"],
      correct_answer: "was",
      explanation: "'Neither' is singular and requires a singular verb ('was')."
    },
    {
      topic_id: "grammar-conditionals",
      topic_title: "Conditionals",
      question_id: "onb-g10",
      question_text: "Complete the sentence: 'If I _____ more free time, I would learn Arabic.'",
      question_type: "multiple_choice",
      options: ["had", "have", "would have", "will have"],
      correct_answer: "had",
      explanation: "Second Conditional hypothetical sentences take simple past ('had') in the 'if' clause and 'would' in the main clause."
    }
  ],

  vocabularyQuestions: [
    {
      question_id: "onb-v1",
      question_text: "What does the word 'reluctant' mean?",
      question_type: "multiple_choice",
      options: [
        "Unwilling or hesitant",
        "Extremely energetic",
        "Generous with money",
        "Speaking loudly"
      ],
      correct_answer: "Unwilling or hesitant",
      explanation: "'Reluctant' means disinclined or hesitant to do something."
    },
    {
      question_id: "onb-v2",
      question_text: "Which word is a synonym of 'scrutinize'?",
      question_type: "multiple_choice",
      options: ["Examine closely", "Ignore completely", "Celebrate happily", "Agree readily"],
      correct_answer: "Examine closely",
      explanation: "'Scrutinize' means to inspect or examine with extreme thoroughness."
    },
    {
      question_id: "onb-v3",
      question_text: "What is the meaning of 'ubiquitous'?",
      question_type: "multiple_choice",
      options: [
        "Present everywhere",
        "Extremely rare",
        "Ancient and forgotten",
        "Difficult to carry"
      ],
      correct_answer: "Present everywhere",
      explanation: "'Ubiquitous' describes something that is omnipresent and found everywhere."
    },
    {
      question_id: "onb-v4",
      question_text: "Choose the word that means 'producing significant financial profit':",
      question_type: "multiple_choice",
      options: ["Lucrative", "Tentative", "Ambiguous", "Frugal"],
      correct_answer: "Lucrative",
      explanation: "'Lucrative' refers to an activity or enterprise that yields substantial financial gain."
    },
    {
      question_id: "onb-v5",
      question_text: "Fill in the blank: 'Someone who is always strictly on time is described as _____.'",
      question_type: "fill_in_blank",
      correct_answer: "punctual",
      explanation: "'Punctual' means adhering strictly to scheduled arrival times."
    }
  ],

  readingPassage: {
    passage_id: "onb-reading",
    title: "The Art of Active Listening",
    text: "Effective communication involves far more than merely articulating words with clarity; it hinges fundamentally on the practice of active listening. While passive hearing simply registers auditory sound waves, active listening demands focused cognitive engagement and empathetic intent. An active listener intentionally suspends personal judgments, refrains from interrupting, and concentrates on the speaker's emotional subtext as well as their spoken words.\n\nIn professional and interpersonal environments, active listening serves as a powerful catalyst for trust. By demonstrating genuine comprehension through reflective questioning and nonverbal cues—such as steady eye contact and supportive nodding—listeners validate the speaker's perspective. Research confirms that teams prioritizing active listening experience fewer procedural errors, higher creative output, and deeper collaboration.",
    questions: [
      {
        question_id: "onb-r1",
        question_text: "According to the passage, what is the primary difference between passive hearing and active listening?",
        question_type: "multiple_choice",
        options: [
          "Active listening demands focused cognitive engagement and empathetic intent",
          "Passive hearing requires note-taking and vocal responses",
          "Active listening is restricted to professional boardroom meetings",
          "Passive hearing is scientifically proven to prevent misunderstandings"
        ],
        correct_answer: "Active listening demands focused cognitive engagement and empathetic intent",
        explanation: "The passage specifies that active listening requires cognitive focus and empathy, unlike mere passive hearing of sound."
      },
      {
        question_id: "onb-r2",
        question_text: "What behavior does an active listener deliberately practice?",
        question_type: "multiple_choice",
        options: [
          "Suspends personal judgments and refrains from interrupting",
          "Prepares counterarguments while the speaker is talking",
          "Changes the subject to keep the dialogue lively",
          "Speaks for the majority of the conversation"
        ],
        correct_answer: "Suspends personal judgments and refrains from interrupting",
        explanation: "The first paragraph states that an active listener 'intentionally suspends personal judgments, refrains from interrupting'."
      },
      {
        question_id: "onb-r3",
        question_text: "What nonverbal cues are mentioned as demonstrations of genuine comprehension?",
        question_type: "multiple_choice",
        options: [
          "Steady eye contact and supportive nodding",
          "Checking the clock and typing notes",
          "Crossing arms and pacing the room",
          "Remaining completely motionless without smiling"
        ],
        correct_answer: "Steady eye contact and supportive nodding",
        explanation: "The text highlights 'steady eye contact and supportive nodding' as key nonverbal validators."
      },
      {
        question_id: "onb-r4",
        question_text: "Fill in the blank: Teams prioritizing active listening experience higher _____ output.",
        question_type: "fill_in_blank",
        correct_answer: "creative",
        explanation: "The final sentence cites 'fewer procedural errors, higher creative output, and deeper collaboration'."
      }
    ]
  }
};
