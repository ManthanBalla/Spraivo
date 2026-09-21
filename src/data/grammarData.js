// Static dataset for 10 Grammar Topics
// Conforms strictly to the GrammarTopic and Question schemas

export const GRAMMAR_TOPICS = [
  {
    topic_id: "grammar-pos",
    title: "Parts of Speech",
    level: "beginner",
    lesson_text: "In English grammar, words are categorized into eight foundational parts of speech based on their syntactic function and meaning inside a sentence: nouns, pronouns, verbs, adjectives, adverbs, prepositions, conjunctions, and interjections. Recognizing how a word functions in context is vital because many English words can serve as different parts of speech depending on their usage. For example, 'run' functions as a verb in 'She runs quickly' but serves as a noun in 'She went for a morning run'. Mastering these core building blocks enables you to construct structurally sound sentences and comprehend more advanced grammatical frameworks.",
    example_sentences: [
      "The diligent student quietly completed her assignment. (diligent = adjective, quietly = adverb)",
      "They rested under the ancient oak tree during midday. (under = preposition)",
      "She wanted to attend the seminar, but she missed the train. (but = conjunction)",
      "Success requires consistent dedication and patience. (dedication = noun, consistent = adjective)"
    ],
    common_mistakes: [
      "Confusing adverbs and adjectives: Saying 'He drives slow' instead of 'He drives slowly'. Adverbs modify verbs, while adjectives modify nouns.",
      "Misidentifying parts of speech due to form: Assuming every word ending in '-ly' is an adverb (e.g., 'friendly' and 'lonely' are adjectives)."
    ],
    questions: [
      {
        question_id: "pos-q1",
        question_text: "Identify the part of speech of the word 'thoroughly' in the sentence: 'The inspector examined the report thoroughly.'",
        question_type: "multiple_choice",
        options: ["Adverb", "Adjective", "Noun", "Preposition"],
        correct_answer: "Adverb",
        explanation: "'Thoroughly' modifies the verb 'examined' by describing how the action was performed, making it an adverb."
      },
      {
        question_id: "pos-q2",
        question_text: "Which word in this sentence is a preposition? 'The children walked across the bridge.'",
        question_type: "multiple_choice",
        options: ["walked", "across", "bridge", "children"],
        correct_answer: "across",
        explanation: "'Across' is a preposition showing the spatial relationship between the walking action and the bridge."
      },
      {
        question_id: "pos-q3",
        question_text: "Fill in the blank with the correct coordinating conjunction: 'We planned to hike, _____ heavy rain forced us indoors.'",
        question_type: "fill_in_blank",
        correct_answer: "but",
        explanation: "'But' is the coordinating conjunction used to contrast the planned hike with the opposing situation caused by rain."
      },
      {
        question_id: "pos-q4",
        question_text: "What part of speech is 'ancient' in 'They uncovered an ancient artifact'?",
        question_type: "multiple_choice",
        options: ["Adjective", "Adverb", "Verb", "Noun"],
        correct_answer: "Adjective",
        explanation: "'Ancient' describes and modifies the noun 'artifact', which qualifies it as an adjective."
      },
      {
        question_id: "pos-q5",
        question_text: "Identify the pronoun in the following sentence: 'When Marcus arrived, he greeted everyone warmly.'",
        question_type: "multiple_choice",
        options: ["Marcus", "he", "greeted", "warmly"],
        correct_answer: "he",
        explanation: "'He' is a third-person personal pronoun that replaces the proper noun 'Marcus'."
      },
      {
        question_id: "pos-q6",
        question_text: "In the sentence 'She speaks English fluently', the word 'fluently' is an adverb modifying which verb?",
        question_type: "fill_in_blank",
        correct_answer: "speaks",
        explanation: "'Fluently' answers the question 'how does she speak?', directly modifying the verb 'speaks'."
      }
    ]
  },
  {
    topic_id: "grammar-nouns",
    title: "Nouns",
    level: "beginner",
    lesson_text: "A noun is a naming word representing a person, place, thing, or abstract idea. In English, nouns are classified into proper nouns (specific capitalized names like 'London' or 'Sarah') and common nouns ('city', 'engineer'). Furthermore, nouns are categorized into countable nouns—which can be quantified with numbers and possess plural forms (e.g., 'two chairs')—and uncountable nouns, which represent masses, concepts, or substances that cannot be counted directly (e.g., 'information', 'water', 'advice'). Knowing the distinction between countable and uncountable nouns is crucial for selecting appropriate determiners, quantifiers ('many' vs. 'much'), and verb forms.",
    example_sentences: [
      "Paris is known worldwide for its magnificent architecture. (proper noun + common abstract noun)",
      "The professor offered valuable advice to every undergraduate student. (advice = uncountable noun)",
      "Three researchers gathered detailed evidence for the clinical trial. (researchers = countable, evidence = uncountable)",
      "Honesty and integrity are essential qualities in leadership. (honesty, integrity = abstract uncountable nouns)"
    ],
    common_mistakes: [
      "Adding plural '-s' to uncountable nouns: Saying 'informations' or 'furnitures' instead of 'information' or 'furniture'.",
      "Using 'many' with uncountable nouns: Saying 'many traffic' instead of 'much traffic' or 'a lot of traffic'."
    ],
    questions: [
      {
        question_id: "nouns-q1",
        question_text: "Which of the following is an uncountable noun in English?",
        question_type: "multiple_choice",
        options: ["Equipment", "Tool", "Machine", "Device"],
        correct_answer: "Equipment",
        explanation: "'Equipment' is an uncountable mass noun in English and does not take a plural form or the indefinite article 'an'."
      },
      {
        question_id: "nouns-q2",
        question_text: "Choose the correct quantifier: 'We do not have _____ luggage to carry.'",
        question_type: "multiple_choice",
        options: ["much", "many", "a few", "several"],
        correct_answer: "much",
        explanation: "'Luggage' is an uncountable noun, so it must be quantified with 'much' rather than 'many' or 'several'."
      },
      {
        question_id: "nouns-q3",
        question_text: "What is the irregular plural form of the noun 'crisis'?",
        question_type: "fill_in_blank",
        correct_answer: "crises",
        explanation: "Nouns of Greek origin ending in '-is' form their plural by changing '-is' to '-es' (crisis -> crises)."
      },
      {
        question_id: "nouns-q4",
        question_text: "Which word in this sentence is a proper noun? 'Dr. Foster visited the museum on Tuesday.'",
        question_type: "multiple_choice",
        options: ["museum", "Tuesday", "visited", "doctor"],
        correct_answer: "Tuesday",
        explanation: "'Tuesday' is the specific name of a day of the week and is therefore a proper noun that must always be capitalized."
      },
      {
        question_id: "nouns-q5",
        question_text: "What is the correct plural form of 'leaf'?",
        question_type: "multiple_choice",
        options: ["leaves", "leafs", "leafes", "leave"],
        correct_answer: "leaves",
        explanation: "Most nouns ending in '-f' or '-fe' form their plural by changing the ending to '-ves' (leaf -> leaves)."
      },
      {
        question_id: "nouns-q6",
        question_text: "Fill in the blank with the plural form of 'person': 'Several _____ gathered outside the auditorium.'",
        question_type: "fill_in_blank",
        correct_answer: "people",
        explanation: "'People' is the standard irregular plural noun corresponding to the singular noun 'person'."
      }
    ]
  },
  {
    topic_id: "grammar-pronouns",
    title: "Pronouns",
    level: "beginner",
    lesson_text: "Pronouns are words that replace nouns or noun phrases to eliminate tedious repetition and streamline communication. English pronouns are divided into several functional categories: personal pronouns (subjective like 'I, he, they' versus objective like 'me, him, them'), possessive pronouns ('mine, yours, theirs'), reflexive pronouns ('myself, themselves'), and relative pronouns ('who, whom, which, that'). A fundamental rule of pronouns is agreement: a pronoun must agree in number, gender, and person with the noun it replaces (its antecedent). Ensuring proper pronoun case—especially in compound subjects and objects—is essential for grammatical clarity.",
    example_sentences: [
      "Elena prepared the presentation herself before the board arrived. (reflexive pronoun)",
      "The scientist who discovered the enzyme gave an inspiring lecture. (relative pronoun)",
      "My brother and I completed the project ahead of schedule. (subjective case 'I')",
      "The mentor provided constructive feedback to Julian and me. (objective case 'me')"
    ],
    common_mistakes: [
      "Using subjective pronouns in object positions: Saying 'between you and I' instead of the grammatically correct 'between you and me' (prepositions govern objective pronouns).",
      "Confusing possessive determiners with contractions: Writing 'it's' (it is) instead of the possessive pronoun 'its'."
    ],
    questions: [
      {
        question_id: "pronouns-q1",
        question_text: "Select the correct pronoun: 'The committee awarded the prize to Samantha and _____.'",
        question_type: "multiple_choice",
        options: ["me", "I", "myself", "he"],
        correct_answer: "me",
        explanation: "The pronoun is the object of the preposition 'to', so the objective case 'me' is required (not subjective 'I')."
      },
      {
        question_id: "pronouns-q2",
        question_text: "Which relative pronoun correctly refers to a person acting as the object of a clause? 'The candidate _____ we interviewed yesterday was impressive.'",
        question_type: "multiple_choice",
        options: ["whom", "which", "whose", "where"],
        correct_answer: "whom",
        explanation: "'Whom' is the objective relative pronoun referring to persons when they are the object of the verb ('we interviewed whom')."
      },
      {
        question_id: "pronouns-q3",
        question_text: "Fill in the blank with the correct reflexive pronoun: 'The athletes trained _____ vigorously for the Olympic trials.'",
        question_type: "fill_in_blank",
        correct_answer: "themselves",
        explanation: "'Themselves' is the plural third-person reflexive pronoun matching the antecedent 'The athletes'."
      },
      {
        question_id: "pronouns-q4",
        question_text: "Choose the correct pronoun: 'Neither of the boys remembered to bring _____ notebook.'",
        question_type: "multiple_choice",
        options: ["his", "their", "them", "ours"],
        correct_answer: "his",
        explanation: "'Neither' is grammatically singular and takes the singular possessive pronoun 'his'."
      },
      {
        question_id: "pronouns-q5",
        question_text: "Choose the correct sentence:",
        question_type: "multiple_choice",
        options: [
          "The company celebrated its tenth anniversary.",
          "The company celebrated it's tenth anniversary.",
          "The company celebrated its' tenth anniversary.",
          "The company celebrated it is tenth anniversary."
        ],
        correct_answer: "The company celebrated its tenth anniversary.",
        explanation: "'Its' without an apostrophe is the possessive pronoun. 'It's' is a contraction for 'it is' or 'it has'."
      },
      {
        question_id: "pronouns-q6",
        question_text: "Fill in the blank with the correct subject pronoun: 'David and _____ will lead the morning workshop.'",
        question_type: "fill_in_blank",
        correct_answer: "I",
        explanation: "Together with 'David', the pronoun acts as the subject of 'will lead', so the subjective pronoun 'I' is correct."
      }
    ]
  },
  {
    topic_id: "grammar-verbs",
    title: "Verbs",
    level: "beginner",
    lesson_text: "Verbs are the engine of every English sentence, expressing actions ('sprint', 'innovate'), states of being ('exist', 'seem'), or occurrences. Verbs are primarily classified as action verbs, linking verbs, and auxiliary (helping) verbs. Action verbs denote physical or mental actions. Linking verbs (such as 'be', 'become', 'taste') connect the subject to a descriptive complement without asserting action. Auxiliary verbs (such as 'have', 'do', 'will', and modals like 'must', 'can', 'should') partner with main verbs to form complex tenses, ask questions, or convey necessity, permission, and ability.",
    example_sentences: [
      "The software engineers deployed the security patch overnight. (action verb)",
      "The freshly baked bread smells delectable. (linking verb connecting subject to predicate adjective)",
      "We have studied the climate data thoroughly over the past decade. (auxiliary 'have' + past participle)",
      "All team members must adhere to stringent data protection policies. (modal auxiliary 'must')"
    ],
    common_mistakes: [
      "Using adverbs after linking verbs: Saying 'The soup tastes deliciously' instead of 'The soup tastes delicious' (linking verbs take adjectives).",
      "Using base verbs with third-person singular present: Saying 'He go to work' instead of 'He goes to work'."
    ],
    questions: [
      {
        question_id: "verbs-q1",
        question_text: "In the sentence 'The music sounds magnificent', what kind of verb is 'sounds'?",
        question_type: "multiple_choice",
        options: ["Linking verb", "Transitive action verb", "Modal auxiliary verb", "Passive verb"],
        correct_answer: "Linking verb",
        explanation: "'Sounds' links the subject 'music' with the adjective 'magnificent', describing a state rather than performing an action."
      },
      {
        question_id: "verbs-q2",
        question_text: "Choose the sentence containing a modal verb indicating obligation:",
        question_type: "multiple_choice",
        options: [
          "Employees must wear safety goggles in the laboratory.",
          "She might visit her grandparents this weekend.",
          "The children can swim across the pool.",
          "He would enjoy reading this historical novel."
        ],
        correct_answer: "Employees must wear safety goggles in the laboratory.",
        explanation: "The modal verb 'must' conveys mandatory requirement and legal/procedural obligation."
      },
      {
        question_id: "verbs-q3",
        question_text: "What is the past participle of the irregular verb 'freeze'?",
        question_type: "fill_in_blank",
        correct_answer: "frozen",
        explanation: "The irregular verb forms for freeze are: base 'freeze', past simple 'froze', and past participle 'frozen'."
      },
      {
        question_id: "verbs-q4",
        question_text: "Select the sentence with a transitive verb requiring a direct object:",
        question_type: "multiple_choice",
        options: [
          "The mechanic repaired the engine.",
          "The baby slept peacefully.",
          "The sun rose slowly above the horizon.",
          "They arrived punctually."
        ],
        correct_answer: "The mechanic repaired the engine.",
        explanation: "'Repaired' is transitive because it transfers action directly to the object 'the engine'. 'Slept' and 'rose' are intransitive."
      },
      {
        question_id: "verbs-q5",
        question_text: "Which auxiliary verb correctly completes the question: '_____ you ever visited the British Museum?'",
        question_type: "multiple_choice",
        options: ["Have", "Did", "Were", "Are"],
        correct_answer: "Have",
        explanation: "The present perfect tense uses auxiliary 'Have' + subject + past participle ('visited') for life experiences."
      },
      {
        question_id: "verbs-q6",
        question_text: "Fill in the blank with the past simple of the irregular verb 'begin': 'The concert _____ promptly at eight o'clock.'",
        question_type: "fill_in_blank",
        correct_answer: "began",
        explanation: "The simple past tense of 'begin' is 'began', while 'begun' is the past participle."
      }
    ]
  },
  {
    topic_id: "grammar-adjectives",
    title: "Adjectives",
    level: "beginner",
    lesson_text: "Adjectives modify, quantify, or qualify nouns and pronouns, adding vivid detail and precision to communication. In English, adjectives typically appear directly before the noun they describe (attributive position: 'a red apple') or following linking verbs (predicative position: 'the apple is red'). When multiple adjectives precede a single noun, native English follows a standard cumulative order: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose. Additionally, comparative adjectives ('taller', 'more efficient') compare two entities, while superlative adjectives ('tallest', 'most efficient') compare three or more.",
    example_sentences: [
      "She acquired a charming small antique French clock. (Order: opinion -> size -> age -> origin)",
      "This experimental algorithm is significantly faster than the previous version. (comparative adjective)",
      "Mount Everest remains the highest peak on our planet. (superlative adjective)",
      "The newly renovated auditorium was bright and spacious. (predicative adjectives following 'was')"
    ],
    common_mistakes: [
      "Double comparatives or superlatives: Saying 'more better' or 'most easiest' instead of 'better' or 'easiest'.",
      "Scrambling the adjective order: Saying 'wooden round table' instead of 'round wooden table' (shape precedes material)."
    ],
    questions: [
      {
        question_id: "adj-q1",
        question_text: "Choose the sentence with the correct natural adjective order:",
        question_type: "multiple_choice",
        options: [
          "She wore a beautiful long Italian silk dress.",
          "She wore an Italian beautiful silk long dress.",
          "She wore a silk long beautiful Italian dress.",
          "She wore a long Italian silk beautiful dress."
        ],
        correct_answer: "She wore a beautiful long Italian silk dress.",
        explanation: "The correct sequence is: Opinion (beautiful) -> Size/Length (long) -> Origin (Italian) -> Material (silk)."
      },
      {
        question_id: "adj-q2",
        question_text: "What is the comparative form of the adjective 'accurate'?",
        question_type: "multiple_choice",
        options: ["more accurate", "accurater", "most accurate", "as accurate"],
        correct_answer: "more accurate",
        explanation: "Adjectives of three or more syllables form their comparative with 'more' rather than the '-er' suffix."
      },
      {
        question_id: "adj-q3",
        question_text: "Fill in the blank with the superlative form of 'bad': 'That was the _____ decision made during the entire campaign.'",
        question_type: "fill_in_blank",
        correct_answer: "worst",
        explanation: "'Bad' is an irregular adjective: comparative is 'worse', and superlative is 'worst'."
      },
      {
        question_id: "adj-q4",
        question_text: "Which of the following sentences avoids a double comparison error?",
        question_type: "multiple_choice",
        options: [
          "This route is faster than the highway.",
          "This route is more faster than the highway.",
          "This route is more quick than the highway.",
          "This route is most fastest than the highway."
        ],
        correct_answer: "This route is faster than the highway.",
        explanation: "'Faster' is already comparative; adding 'more' creates an ungrammatical double comparative."
      },
      {
        question_id: "adj-q5",
        question_text: "What type of adjective is 'several' in 'Several candidates applied'?",
        question_type: "multiple_choice",
        options: ["Quantitative adjective", "Demonstrative adjective", "Descriptive adjective", "Proper adjective"],
        correct_answer: "Quantitative adjective",
        explanation: "'Several' quantifies the noun 'candidates' without specifying an exact number, making it a quantitative adjective."
      },
      {
        question_id: "adj-q6",
        question_text: "Fill in the blank with the comparative form of 'heavy': 'Steel is _____ than aluminum.'",
        question_type: "fill_in_blank",
        correct_answer: "heavier",
        explanation: "Two-syllable adjectives ending in '-y' change the 'y' to 'i' and add '-er' (heavy -> heavier)."
      }
    ]
  },
  {
    topic_id: "grammar-articles",
    title: "Articles",
    level: "beginner",
    lesson_text: "Articles are determiners that specify whether a noun is indefinite (referring to any general member of a group) or definite (referring to a specific, uniquely identified entity). English features two indefinite articles: 'a' (used before consonant sounds: 'a university', 'a historic event') and 'an' (used before vowel sounds: 'an hour', 'an umbrella'). Notice that choice depends on the sound, not the written letter. The definite article 'the' is used when both the speaker and listener know the specific referent, for unique items ('the sun', 'the internet'), and with superlative adjectives ('the best'). Finally, the zero article (omitting any article) applies to plural countable or uncountable nouns used in a general sense.",
    example_sentences: [
      "She will graduate from a prestigious university in an hour. ('a' before 'yu' sound, 'an' before silent 'h')",
      "The scientist who developed the formula won the Nobel Prize. (specific known scientist and prize)",
      "Children require love, nutrition, and encouragement. (zero article for abstract/general concepts)",
      "The Amazon River flows into the Atlantic Ocean. (definite article with rivers and oceans)"
    ],
    common_mistakes: [
      "Choosing 'a' vs. 'an' by spelling instead of phonetics: Saying 'a honest man' instead of 'an honest man' (honest begins with silent 'h').",
      "Using 'the' with general plural nouns: Saying 'The dogs are loyal animals' instead of 'Dogs are loyal animals' when discussing dogs in general."
    ],
    questions: [
      {
        question_id: "articles-q1",
        question_text: "Select the correct article: 'It was _____ honor to represent our department at the conference.'",
        question_type: "multiple_choice",
        options: ["an", "a", "the", "no article"],
        correct_answer: "an",
        explanation: "'Honor' begins with a silent 'h', producing an initial vowel sound (/ˈɒn.ər/), which requires 'an'."
      },
      {
        question_id: "articles-q2",
        question_text: "Choose the correct article: 'Dr. Vance teaches at _____ European university.'",
        question_type: "multiple_choice",
        options: ["a", "an", "the", "no article"],
        correct_answer: "a",
        explanation: "'European' begins with a consonant glide sound (/j/ as in 'yellow'), which grammatically mandates 'a'."
      },
      {
        question_id: "articles-q3",
        question_text: "Fill in the blank with the correct article (or 'none'): '_____ copper is a widely utilized electrical conductor.'",
        question_type: "fill_in_blank",
        correct_answer: "none",
        explanation: "Uncountable materials and chemical elements discussed in general require zero article ('none')."
      },
      {
        question_id: "articles-q4",
        question_text: "Which sentence correctly uses articles?",
        question_type: "multiple_choice",
        options: [
          "The moon orbits the Earth once every 27.3 days.",
          "A moon orbits a Earth once every 27.3 days.",
          "Moon orbits Earth once every 27.3 days.",
          "The moon orbits a Earth once every 27.3 days."
        ],
        correct_answer: "The moon orbits the Earth once every 27.3 days.",
        explanation: "Unique celestial entities known universally to humanity take the definite article 'the'."
      },
      {
        question_id: "articles-q5",
        question_text: "Select the correct option: 'I bought _____ new laptop yesterday; _____ laptop is exceptionally fast.'",
        question_type: "multiple_choice",
        options: ["a / the", "the / a", "a / a", "an / the"],
        correct_answer: "a / the",
        explanation: "Use indefinite 'a' when introducing a noun for the first time, and definite 'the' when referring back to it."
      },
      {
        question_id: "articles-q6",
        question_text: "Fill in the blank with 'a', 'an', or 'the': 'He holds _____ MBA in international finance.'",
        question_type: "fill_in_blank",
        correct_answer: "an",
        explanation: "The abbreviation 'MBA' begins phonetically with a vowel sound (/ɛm.biː.eɪ/), requiring 'an'."
      }
    ]
  },
  {
    topic_id: "grammar-prepositions",
    title: "Basic Prepositions",
    level: "beginner",
    lesson_text: "Prepositions express spatial, temporal, or logical relationships between nouns (or pronouns) and other sentence elements. The most frequently used prepositions of time and place are 'in', 'on', and 'at'. As a general guideline: 'in' is used for enclosed spaces, cities, countries, and larger time spans (months, years, decades); 'on' is used for surfaces, avenues/streets, days of the week, and specific dates; and 'at' is used for precise physical points and exact times of day. Prepositions also form fixed prepositional idioms and verb combinations ('depend on', 'interested in', 'good at') that must be committed to memory.",
    example_sentences: [
      "The symposium begins at 9:00 AM on Monday in London. (at time, on day, in city)",
      "The keys are lying on the kitchen counter. (surface = on)",
      "She is highly skilled at data visualization and interested in robotics. (fixed prepositional complements)",
      "We lived in Tokyo in 2021 before moving onto the campus. (in year, onto surface/area)"
    ],
    common_mistakes: [
      "Using 'in' for exact days or times: Saying 'in Monday' or 'in 5:00 PM' instead of 'on Monday' or 'at 5:00 PM'.",
      "Using wrong dependent prepositions: Saying 'interested for' or 'good in' instead of 'interested in' and 'good at'."
    ],
    questions: [
      {
        question_id: "prep-q1",
        question_text: "Choose the correct preposition: 'The flight departs _____ 6:30 AM tomorrow.'",
        question_type: "multiple_choice",
        options: ["at", "on", "in", "by"],
        correct_answer: "at",
        explanation: "'At' is the correct preposition used for precise clock times."
      },
      {
        question_id: "prep-q2",
        question_text: "Select the correct preposition: 'The company was founded _____ 2014.'",
        question_type: "multiple_choice",
        options: ["in", "on", "at", "during"],
        correct_answer: "in",
        explanation: "'In' is required for calendar years, decades, centuries, and months."
      },
      {
        question_id: "prep-q3",
        question_text: "Fill in the blank with the appropriate preposition: 'She is remarkably good _____ solving complex mathematical equations.'",
        question_type: "fill_in_blank",
        correct_answer: "at",
        explanation: "The fixed adjective-preposition collocation is 'good at' an activity or skill."
      },
      {
        question_id: "prep-q4",
        question_text: "Which preposition correctly completes the sentence? 'The documents were placed _____ the desk.'",
        question_type: "multiple_choice",
        options: ["on", "at", "in", "to"],
        correct_answer: "on",
        explanation: "'On' denotes physical contact with an exterior surface like a desk."
      },
      {
        question_id: "prep-q5",
        question_text: "Choose the correct preposition: 'The team will reconvene _____ Friday afternoon.'",
        question_type: "multiple_choice",
        options: ["on", "in", "at", "from"],
        correct_answer: "on",
        explanation: "'On' is used for days of the week, including specific parts of named days ('on Friday afternoon')."
      },
      {
        question_id: "prep-q6",
        question_text: "Fill in the blank with the correct preposition: 'Our success depends _____ effective team communication.'",
        question_type: "fill_in_blank",
        correct_answer: "on",
        explanation: "The verb 'depend' requires the dependent preposition 'on' (or 'upon')."
      }
    ]
  },
  {
    topic_id: "grammar-tenses",
    title: "Present/Past/Future Tenses",
    level: "intermediate",
    lesson_text: "English verb tenses situate actions in time across three primary temporal horizons (past, present, future) and four operational aspects (simple, continuous/progressive, perfect, and perfect continuous). The Simple aspect expresses habits, facts, or completed historical events. The Continuous aspect emphasizes ongoing action in progress. The Perfect aspect connects two distinct points in time—such as the Present Perfect ('have worked'), which links past events to current relevance or ongoing duration. The Future tense employs 'will' for spontaneous decisions or forecasts, and 'be going to' for predetermined intentions or immediate evidence.",
    example_sentences: [
      "Dr. Aris has published five peer-reviewed papers since 2022. (Present Perfect: past start continuing to present)",
      "They were calibrating the instruments when the power outage occurred. (Past Continuous interrupted by Past Simple)",
      "By the end of next month, we will have completed the pilot phase. (Future Perfect)",
      "The train departs at 7:15 tomorrow morning. (Present Simple used for scheduled future events)"
    ],
    common_mistakes: [
      "Using Present Perfect with specific past time markers: Saying 'I have seen him yesterday' instead of 'I saw him yesterday' (specific time markers require Past Simple).",
      "Using 'will' in time clauses: Saying 'When you will arrive, call me' instead of 'When you arrive, call me'."
    ],
    questions: [
      {
        question_id: "tenses-q1",
        question_text: "Choose the correct tense: 'I _____ in this architectural firm for six years now.'",
        question_type: "multiple_choice",
        options: ["have worked", "worked", "am working", "had worked"],
        correct_answer: "have worked",
        explanation: "'Have worked' (Present Perfect) is correct because the action began in the past and continues into the present, indicated by 'for six years now'."
      },
      {
        question_id: "tenses-q2",
        question_text: "Which sentence is grammatically correct?",
        question_type: "multiple_choice",
        options: [
          "She visited the laboratory three days ago.",
          "She has visited the laboratory three days ago.",
          "She had visited the laboratory three days ago yesterday.",
          "She was visiting the laboratory three days ago when finished."
        ],
        correct_answer: "She visited the laboratory three days ago.",
        explanation: "A specific finished past time indicator like 'three days ago' requires the Simple Past tense ('visited'), not the Present Perfect."
      },
      {
        question_id: "tenses-q3",
        question_text: "Fill in the blank with the correct form of the verb 'study': 'While he _____ for the exam, his computer suddenly shut down.'",
        question_type: "fill_in_blank",
        correct_answer: "was studying",
        explanation: "The past continuous 'was studying' describes the ongoing backdrop action interrupted by a simple past event ('shut down')."
      },
      {
        question_id: "tenses-q4",
        question_text: "Select the sentence that expresses a future event with existing prior intention:",
        question_type: "multiple_choice",
        options: [
          "We are going to launch the software next Tuesday.",
          "I will grab a sandwich right now.",
          "It will probably rain tomorrow afternoon.",
          "Perhaps they will approve the budget."
        ],
        correct_answer: "We are going to launch the software next Tuesday.",
        explanation: "'Be going to' denotes plans, decisions, and intentions formulated prior to the moment of speaking."
      },
      {
        question_id: "tenses-q5",
        question_text: "Choose the correct form: 'By December, she _____ at the university for a full decade.'",
        question_type: "multiple_choice",
        options: ["will have worked", "will work", "is working", "worked"],
        correct_answer: "will have worked",
        explanation: "The Future Perfect ('will have worked') expresses an action that will be completed by a specific future milestone ('By December')."
      },
      {
        question_id: "tenses-q6",
        question_text: "Fill in the blank with the correct present tense form: 'When the director _____ (arrive), please escort him to Room B.'",
        question_type: "fill_in_blank",
        correct_answer: "arrives",
        explanation: "In subordinate adverbial time clauses introduced by 'when', the Present Simple ('arrives') is used instead of future 'will arrive'."
      }
    ]
  },
  {
    topic_id: "grammar-sva",
    title: "Subject-Verb Agreement",
    level: "intermediate",
    lesson_text: "Subject-Verb Agreement requires that a sentence's grammatical subject and its finite verb harmonize in number and person. Singular subjects require singular verbs ('The analyst verifies data'), while plural subjects require plural verbs ('The analysts verify data'). Complications frequently arise when prepositional phrases or parenthetical expressions intervene between the subject and the verb (e.g., 'The box of chocolates is on the table'). In addition, indefinite pronouns like 'everyone', 'each', and 'neither' take singular verbs, whereas compound subjects joined by 'and' generally take plural verbs unless referring to a single unified concept.",
    example_sentences: [
      "The collection of rare antique manuscripts is preserved in climate-controlled vaults. ('collection' is singular subject)",
      "Neither the lead designer nor the developers were satisfied with the initial prototype. (verb agrees with closest subject 'developers')",
      "Each of the participants receives a certificate of completion. ('each' takes a singular verb)",
      "Bread and butter was his staple breakfast for years. (compound noun functioning as a single entity)"
    ],
    common_mistakes: [
      "Agreeing with the nearest noun inside a prepositional phrase: Saying 'The quality of these items are poor' instead of 'The quality of these items is poor'.",
      "Treating singular indefinite pronouns as plural: Saying 'Everyone are invited' instead of 'Everyone is invited'."
    ],
    questions: [
      {
        question_id: "sva-q1",
        question_text: "Choose the correct verb: 'The list of approved vendors _____ on the company intranet.'",
        question_type: "multiple_choice",
        options: ["is", "are", "were", "have been"],
        correct_answer: "is",
        explanation: "The subject is the singular noun 'list', not the plural object of preposition 'vendors'; therefore, singular 'is' is required."
      },
      {
        question_id: "sva-q2",
        question_text: "Select the correct sentence:",
        question_type: "multiple_choice",
        options: [
          "Neither the manager nor the employees were informed.",
          "Neither the manager nor the employees was informed.",
          "Neither the employees nor the manager were informed.",
          "Neither the manager nor the employee are informed."
        ],
        correct_answer: "Neither the manager nor the employees were informed.",
        explanation: "With 'neither... nor', the verb agrees with the subject closest to it. Here, 'employees' is plural, so plural 'were' is correct."
      },
      {
        question_id: "sva-q3",
        question_text: "Fill in the blank with the correct present tense form of 'be': 'Each of the incoming students _____ assigned a faculty advisor.'",
        question_type: "fill_in_blank",
        correct_answer: "is",
        explanation: "'Each' is grammatically singular and requires the singular verb 'is'."
      },
      {
        question_id: "sva-q4",
        question_text: "Choose the correct verb: 'Ten thousand dollars _____ an exorbitant price for that vintage typewriter.'",
        question_type: "multiple_choice",
        options: ["is", "are", "were", "seem"],
        correct_answer: "is",
        explanation: "Expressions of monetary amounts, time periods, and distances are treated as a single unified sum, taking a singular verb ('is')."
      },
      {
        question_id: "sva-q5",
        question_text: "Which verb form correctly completes: 'The CEO, along with two board members, _____ visiting our branch tomorrow.'",
        question_type: "multiple_choice",
        options: ["is", "are", "were", "have been"],
        correct_answer: "is",
        explanation: "Intervening phrases introduced by 'along with', 'as well as', or 'together with' do not change the number of the subject ('The CEO' is singular)."
      },
      {
        question_id: "sva-q6",
        question_text: "Fill in the blank with the present tense of 'have': 'A variety of options _____ been provided to the customer.'",
        question_type: "fill_in_blank",
        correct_answer: "have",
        explanation: "The idiomatic quantifier 'a variety of' followed by a plural noun takes a plural verb ('have')."
      }
    ]
  },
  {
    topic_id: "grammar-conditionals",
    title: "Conditionals",
    level: "intermediate",
    lesson_text: "Conditionals express hypothetical scenarios, possibilities, and their anticipated or counterfactual results. English standardly employs four primary types: Zero conditional (general facts: 'If water reaches 100°C, it boils'), First conditional (real future possibilities: 'If you submit early, they will review it'), Second conditional (unreal or unlikely present/future situations: 'If I had more time, I would study linguistics'), and Third conditional (unreal past counterfactuals: 'If we had known about the delay, we would have notified you'). Mixed conditionals also blend past conditions with present outcomes. Careful attention to auxiliary verbs ('would', 'could', 'might') in the result clause is required.",
    example_sentences: [
      "If the temperature drops below freezing, water turns to ice. (Zero conditional: general scientific truth)",
      "If market demand increases, we will expand manufacturing capacity. (First conditional: real future possibility)",
      "If she were the director, she would implement flexible working hours. (Second conditional: subjunctive 'were')",
      "If they had reserved seats earlier, they would not have missed the keynote address. (Third conditional: past counterfactual)"
    ],
    common_mistakes: [
      "Placing 'would' inside the 'if' clause: Saying 'If I would have known' instead of 'If I had known'.",
      "Using 'was' instead of the subjunctive 'were' in formal hypothetical conditionals: Using 'If I was you' instead of formal 'If I were you'."
    ],
    questions: [
      {
        question_id: "cond-q1",
        question_text: "Select the correct conditional completion: 'If she had studied the case more thoroughly, she _____ the verdict.'",
        question_type: "multiple_choice",
        options: [
          "would have anticipated",
          "would anticipate",
          "will anticipate",
          "anticipated"
        ],
        correct_answer: "would have anticipated",
        explanation: "This is a Third Conditional (unreal past). The 'if' clause has past perfect ('had studied'), so the result clause requires 'would have' + past participle."
      },
      {
        question_id: "cond-q2",
        question_text: "Choose the correct form: 'If I _____ you, I would consult with the legal adviser immediately.'",
        question_type: "multiple_choice",
        options: ["were", "was", "am", "would be"],
        correct_answer: "were",
        explanation: "In standard formal English, the subjunctive 'were' is used for all persons in Second Conditional hypothetical statements."
      },
      {
        question_id: "cond-q3",
        question_text: "Fill in the blank with the correct auxiliary: 'If it rains tomorrow, the committee _____ postpone the outdoor ceremony.'",
        question_type: "fill_in_blank",
        correct_answer: "will",
        explanation: "First Conditional structures use Simple Present in the 'if' clause and 'will' + base verb in the main result clause."
      },
      {
        question_id: "cond-q4",
        question_text: "Which sentence illustrates the Zero Conditional (universal fact)?",
        question_type: "multiple_choice",
        options: [
          "If metal is heated, it expands.",
          "If metal is heated, it will expand tomorrow.",
          "If metal were heated, it would expand.",
          "If metal had been heated, it would have expanded."
        ],
        correct_answer: "If metal is heated, it expands.",
        explanation: "The Zero Conditional pairs present simple in both clauses ('is heated' / 'expands') to state scientific facts and universal truths."
      },
      {
        question_id: "cond-q5",
        question_text: "Identify the error in: 'If we would have arrived earlier, we could have secured front-row seats.'",
        question_type: "multiple_choice",
        options: [
          "'would have arrived' should be 'had arrived'",
          "'could have secured' should be 'can secure'",
          "'earlier' should be 'more early'",
          "There is no grammatical error"
        ],
        correct_answer: "'would have arrived' should be 'had arrived'",
        explanation: "'Would' is not placed in the conditional 'if' clause; the Third Conditional requires the past perfect ('had arrived')."
      },
      {
        question_id: "cond-q6",
        question_text: "Fill in the blank with the correct verb form: 'If he spoke more clearly, people _____ (understand) him better.'",
        question_type: "fill_in_blank",
        correct_answer: "would understand",
        explanation: "Second Conditional sentences pair simple past in the condition with 'would' + base verb ('would understand') in the result clause."
      }
    ]
  }
];
