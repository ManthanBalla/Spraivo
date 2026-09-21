// Master English Grammar Curriculum (27 Comprehensive Topics)
// Categorized into 4 tracks: Parts of Speech, Tenses & Verb Conjugation, Sentence Structure & Voice, Complex Syntax & Mechanics.
// Explains every topic thoroughly from Basic to Intermediate to Advanced with complete types, rules, examples, pitfalls, and quizzes.

export const GRAMMAR_CATEGORIES = [
  "All Topics",
  "Parts of Speech",
  "Tenses & Conjugation",
  "Sentence Structure & Voice",
  "Syntax & Mechanics"
];

export const GRAMMAR_TOPICS = [
  // =========================================================================
  // TRACK 1: PARTS OF SPEECH (THE BUILDING BLOCKS)
  // =========================================================================
  {
    topic_id: "grammar-nouns",
    title: "Nouns",
    category: "Parts of Speech",
    track_order: 1,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Naming words for people, places, things, concepts, and collections with rules for countability and plurals.",
    lesson_text: "A noun is a foundational naming word that identifies a person ('architect'), place ('Kyoto'), thing ('microscope'), idea ('curiosity'), or state of being ('freedom'). In English, nouns are categorized into common vs. proper, countable vs. uncountable, concrete vs. abstract, and collective nouns. Understanding nouns is vital for subject-verb agreement, accurate use of determiners and articles, and building well-formed sentence subjects and objects.",
    progressive_levels: {
      basic: {
        heading: "Basic: What is a Noun?",
        concept: "Nouns name what we can see, touch, or identify around us. Common nouns refer to general items (boy, dog, city), while Proper nouns refer to specific names and always start with a capital letter (William, Paris, Google). Singular nouns represent one person or thing (car), while plural nouns represent two or more (cars, boxes).",
        key_points: [
          "Always capitalize Proper nouns (names of people, specific places, days, months, and brands).",
          "Most singular nouns become plural by adding '-s' or '-es' (desk -> desks, watch -> watches).",
          "Nouns act as the Subject (who does the action) or Object (who receives the action) in a sentence."
        ],
        examples: [
          "Maya bought a new camera in Tokyo. (Maya & Tokyo = proper nouns; camera = common noun)",
          "Three dogs were barking outside the house. (plural dogs, singular house)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Countable vs. Uncountable & Irregular Plurals",
        concept: "Countable nouns can be counted with discrete numbers and possess plural forms (apple -> apples, proposal -> proposals). Uncountable (mass) nouns cannot be counted individually; they represent concepts, liquids, gases, or collective materials (information, equipment, advice, traffic, research) and do NOT take '-s' or the indefinite article 'a/an'.",
        rules_and_formulas: [
          "Countable: Use 'many', 'a few', 'fewer', 'several' + plural noun (e.g., 'many laptops', 'a few ideas').",
          "Uncountable: Use 'much', 'a little', 'less', 'a piece of' + singular verb (e.g., 'much advice', 'a piece of equipment').",
          "Irregular Plurals: child -> children, foot -> feet, tooth -> teeth, mouse -> mice, person -> people, datum -> data, crisis -> crises, criterion -> criteria."
        ],
        examples: [
          "The engineer requested two pieces of equipment for the laboratory. (Correct: 'pieces of equipment', not 'equipments')",
          "Recent data shows that customer feedback is predominantly positive. ('feedback' is uncountable and takes singular verb)"
        ]
      },
      advanced: {
        heading: "Advanced: Collective Nouns, Dual Nouns & Possessive Case",
        concept: "In British vs. American English, collective nouns (team, committee, family, jury) can take a singular verb when considered as a single unit ('The team is winning') or a plural verb when individual members act separately ('The team are divided in their opinions'). Furthermore, dual nouns can switch meaning depending on countability: 'paper' (uncountable material) vs. 'a paper' (countable essay/newspaper); 'coffee' (substance) vs. 'two coffees' (two cups).",
        nuances_and_exceptions: [
          "Compound Noun Plurals: Pluralize the primary head noun, not the modifier: 'mothers-in-law' (not mother-in-laws), 'attorneys-at-law', 'passersby'.",
          "Possessive Apostrophes: Singular noun -> 'cat's bowl'; Plural ending in -s -> 'teachers' lounge'; Irregular plural not ending in -s -> 'children's playground'. Joint ownership: 'Bob and Linda's house' (one house). Separate ownership: 'Bob's and Linda's houses' (two separate houses)."
        ],
        examples: [
          "The committee has released its unanimous verdict. (unitary action = singular 'its')",
          "The jury were arguing among themselves for hours. (individual actions = plural verb)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Common Nouns", description: "General non-specific names of people, places, or items.", examples: ["engineer", "city", "smartphone", "river"] },
      { name: "Proper Nouns", description: "Specific unique names; always capitalized.", examples: ["Sarah", "London", "Microsoft", "Saturday", "Nile"] },
      { name: "Countable Nouns", description: "Items that can be counted with numbers; take singular or plural forms.", examples: ["one coin, three coins", "a computer, several computers"] },
      { name: "Uncountable (Mass) Nouns", description: "Liquids, concepts, or collective substances that cannot be counted directly; take singular verbs.", examples: ["water", "furniture", "luggage", "information", "patience"] },
      { name: "Concrete Nouns", description: "Physical entities perceived through the five senses.", examples: ["brick", "perfume", "guitar", "ice"] },
      { name: "Abstract Nouns", description: "Non-physical ideas, qualities, emotions, or conditions.", examples: ["justice", "bravery", "curiosity", "tranquility"] },
      { name: "Collective Nouns", description: "Nouns identifying groups of individuals treated as a single entity.", examples: ["team", "committee", "flock", "audience", "orchestra"] },
      { name: "Compound Nouns", description: "Two or more words joined together to form a distinct noun.", examples: ["toothpaste", "passerby", "washing machine", "mother-in-law"] }
    ],
    rules_summary: [
      { rule_name: "Uncountable Quantifiers", explanation: "Never put 'a/an' or '-s' on mass nouns. Use partitive phrases like 'a bar of chocolate' or 'a piece of advice'.", example: "He gave me two valuable pieces of advice." },
      { rule_name: "Proper Noun Capitalization", explanation: "Capitalize all proper nouns, including languages, nationalities, and celestial bodies when specific.", example: "We visited Madrid and learned Spanish." },
      { rule_name: "Head Noun Pluralization", explanation: "Pluralize the main functional noun in hyphenated compound words.", example: "Three brothers-in-law attended the reunion." }
    ],
    example_sentences: [
      "Paris is renowned worldwide for its magnificent architecture. (proper noun + abstract noun)",
      "The professor gave us insightful advice on conducting scientific research. (uncountable 'advice' and 'research')",
      "Three researchers examined sixty different criteria during the experiment. (plural researchers, irregular plural criteria)",
      "The board of directors is voting on the acquisition proposal this afternoon. (collective noun with singular agreement)"
    ],
    common_mistakes: [
      "Pluralizing mass nouns: Saying 'I need more informations and furnitures' instead of 'I need more information and furniture'.",
      "Using 'many' with mass nouns: Saying 'There is too many traffic on the highway' instead of 'There is too much traffic'.",
      "Wrong compound plural: Saying 'passerbys' instead of 'passersby'."
    ],
    questions: [
      {
        question_id: "noun-q1",
        question_text: "Which of the following nouns is UNCOUNTABLE in standard English?",
        question_type: "multiple_choice",
        options: ["Equipment", "Tool", "Machine", "Appliance"],
        correct_answer: "Equipment",
        explanation: "'Equipment' is a mass uncountable noun; it does not take 'an' or a plural '-s'."
      },
      {
        question_id: "noun-q2",
        question_text: "What is the correct plural form of 'crisis'?",
        question_type: "fill_in_blank",
        correct_answer: "crises",
        explanation: "Greek-origin nouns ending in '-is' form their plural with '-es' (crisis -> crises, oasis -> oases)."
      },
      {
        question_id: "noun-q3",
        question_text: "Choose the correct sentence regarding compound plurals:",
        question_type: "multiple_choice",
        options: [
          "Both of my sisters-in-law are pediatric doctors.",
          "Both of my sister-in-laws are pediatric doctors.",
          "Both of my sister-in-law are pediatric doctors.",
          "Both of my sisters-in-laws are pediatric doctors."
        ],
        correct_answer: "Both of my sisters-in-law are pediatric doctors.",
        explanation: "The plural suffix attaches to the principal noun 'sister', giving 'sisters-in-law'."
      },
      {
        question_id: "noun-q4",
        question_text: "Fill in the blank with the correct quantifier: 'We didn't receive _____ luggage at the baggage carousel.'",
        question_type: "multiple_choice",
        options: ["much", "many", "few", "several"],
        correct_answer: "much",
        explanation: "'Luggage' is an uncountable noun and takes 'much' in negative statements."
      },
      {
        question_id: "noun-q5",
        question_text: "What is the plural of the Latin loan word 'phenomenon'?",
        question_type: "fill_in_blank",
        correct_answer: "phenomena",
        explanation: "Nouns ending in '-on' of Greek origin change to '-a' in the plural (phenomenon -> phenomena)."
      }
    ]
  },

  {
    topic_id: "grammar-pronouns",
    title: "Pronouns",
    category: "Parts of Speech",
    track_order: 2,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Words that replace nouns to prevent repetition, showing person, number, gender, and syntactic case.",
    lesson_text: "Pronouns replace nouns or noun phrases so we don't have to awkwardly repeat names and terms. Pronouns change form based on case: Subjective ('I, you, he, she, it, we, they'), Objective ('me, you, him, her, it, us, them'), and Possessive ('mine, yours, his, hers, ours, theirs'). Mastering pronouns requires ensuring proper antecedent agreement in number, person, and case, especially with compound structures and relative clauses.",
    progressive_levels: {
      basic: {
        heading: "Basic: Subject vs. Object Pronouns",
        concept: "Subject pronouns execute the action (I eat, she works, they travel). Object pronouns receive the action or follow prepositions (he called me, she spoke with them). Never confuse subject pronouns with object pronouns.",
        key_points: [
          "Use Subject pronouns before the verb: I, you, he, she, it, we, they.",
          "Use Object pronouns after the verb or after prepositions: me, you, him, her, it, us, them.",
          "Reflexive pronouns (myself, yourself, himself) are used when the subject and object are the exact same entity."
        ],
        examples: [
          "She called him to discuss the contract. ('She' = subject, 'him' = object)",
          "The boy made himself a bowl of oatmeal. (subject and object are the same person)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Compound Pronouns & Possessive Distinctions",
        concept: "When pronouns are paired with names (compounds), test the sentence by removing the other name: 'She invited David and (me / I)' -> 'She invited me', so 'David and me' is correct. Also, never confuse possessive pronoun 'its' (belonging to it) with the contraction 'it's' (it is / it has).",
        rules_and_formulas: [
          "Prepositions ALWAYS govern the objective case: 'Between you and me' (never 'between you and I').",
          "Possessive determiners vs. Possessive pronouns: 'This is my book' (determiner) vs. 'This book is mine' (pronoun).",
          "Indefinite pronouns: 'Everyone', 'everybody', 'someone', 'neither' are grammatically singular: 'Everyone has his or her badge'."
        ],
        examples: [
          "The supervisor assigned the task to Maria and me. (Preposition 'to' requires objective 'me')",
          "The company surpassed its revenue targets this quarter. ('its' shows possession without apostrophe)"
        ]
      },
      advanced: {
        heading: "Advanced: Relative Pronouns (Who vs. Whom, That vs. Which)",
        concept: "'Who' functions as a subject pronoun (equivalent to he/they), while 'whom' functions as an object pronoun (equivalent to him/them). Use 'that' for restrictive (essential) clauses without commas; use 'which' for non-restrictive (extra descriptive) clauses with commas.",
        nuances_and_exceptions: [
          "Who vs. Whom shortcut: If the answer is 'he/she', use 'who'. If the answer is 'him/her', use 'whom' ('Whom did you invite?' -> 'I invited him').",
          "Pronouns following 'than' or 'as': In formal English, use subject pronouns when comparing subjects: 'She works faster than I [work]' (informal: 'than me').",
          "Generic singular 'they': Widely accepted and grammatically recognized for singular antecedents of unspecified gender: 'If a student has a question, they should ask the proctor'."
        ],
        examples: [
          "The candidate whom we interviewed yesterday had stellar qualifications. ('we interviewed him' -> 'whom')",
          "The laptop that has the cracked screen is in the IT room. (restrictive 'that' specifies which laptop)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Personal Pronouns (Subjective)", description: "Pronouns acting as the sentence subject.", examples: ["I", "you", "he", "she", "it", "we", "they"] },
      { name: "Personal Pronouns (Objective)", description: "Pronouns acting as direct/indirect objects or objects of prepositions.", examples: ["me", "you", "him", "her", "it", "us", "them"] },
      { name: "Possessive Pronouns", description: "Stand alone in place of a possessive noun phrase.", examples: ["mine", "yours", "his", "hers", "ours", "theirs"] },
      { name: "Reflexive & Intensive Pronouns", description: "Reflect action back to subject (-self, -selves) or add emphasis.", examples: ["myself", "himself", "herself", "themselves", "ourselves"] },
      { name: "Relative Pronouns", description: "Connect a relative clause to a noun antecedent.", examples: ["who", "whom", "whose", "which", "that"] },
      { name: "Demonstrative Pronouns", description: "Point specifically to near or distant items in space/time.", examples: ["this", "that", "these", "those"] },
      { name: "Indefinite Pronouns", description: "Refer to non-specific people or things; often grammatically singular.", examples: ["everyone", "anybody", "someone", "nothing", "either", "neither", "each"] },
      { name: "Interrogative Pronouns", description: "Used to ask direct or indirect questions.", examples: ["who", "whom", "what", "which", "whose"] }
    ],
    rules_summary: [
      { rule_name: "Prepositional Object Rule", explanation: "A pronoun following a preposition must be in the objective case.", example: "This secret is strictly between you and me." },
      { rule_name: "Relative Pronoun Case", explanation: "Use 'who' when the pronoun is the actor in its clause; use 'whom' when it is the object.", example: "The architect who designed the bridge won the award." },
      { rule_name: "Possessive Pronoun No Apostrophe", explanation: "Possessive pronouns (yours, hers, its, ours, theirs) NEVER use apostrophes.", example: "The dog wagged its tail happily." }
    ],
    example_sentences: [
      "Dr. Hernandez presented her findings, and the committee commended her. (subjective 'her' + objective 'her')",
      "He and I completed the complex mathematical proof together. (compound subject requires subjective 'He and I')",
      "The colleague whom you recommended demonstrated remarkable leadership. (objective 'whom' = object of recommended)",
      "Each of the team members submitted his or her report on time. (singular indefinite agreement)"
    ],
    common_mistakes: [
      "Using subjective 'I' as object of preposition: Saying 'Between you and I' instead of 'Between you and me'.",
      "Confusing 'it's' and 'its': Writing 'The computer lost it's connection' instead of 'its connection'.",
      "Using reflexive pronouns incorrectly for subjects: Saying 'Myself and Alex will attend' instead of 'Alex and I will attend'."
    ],
    questions: [
      {
        question_id: "pro-q1",
        question_text: "Choose the correct pronoun: 'The executive committee awarded the research grant to Liam and _____.'",
        question_type: "multiple_choice",
        options: ["me", "I", "myself", "he"],
        correct_answer: "me",
        explanation: "'To' is a preposition governing the objective case; remove 'Liam and' to test: 'awarded the grant to me'."
      },
      {
        question_id: "pro-q2",
        question_text: "Select the sentence that uses relative pronouns with formal grammatical precision:",
        question_type: "multiple_choice",
        options: [
          "The applicant whom we interviewed on Monday received an offer.",
          "The applicant who we interviewed on Monday received an offer.",
          "The applicant which we interviewed on Monday received an offer.",
          "The applicant whose we interviewed on Monday received an offer."
        ],
        correct_answer: "The applicant whom we interviewed on Monday received an offer.",
        explanation: "The pronoun is the object of the verb 'interviewed' ('we interviewed him/her'), which formally requires 'whom'."
      },
      {
        question_id: "pro-q3",
        question_text: "Fill in the blank with the correct possessive pronoun: 'That blue folder on the desk is _____ (belonging to me).'",
        question_type: "fill_in_blank",
        correct_answer: "mine",
        explanation: "'Mine' is the standalone possessive pronoun, whereas 'my' is a possessive determiner."
      },
      {
        question_id: "pro-q4",
        question_text: "Which sentence correctly uses 'its' without apostrophe errors?",
        question_type: "multiple_choice",
        options: [
          "The university celebrated its centennial anniversary.",
          "The university celebrated it's centennial anniversary.",
          "The university celebrated its' centennial anniversary.",
          "The university celebrated it is centennial anniversary."
        ],
        correct_answer: "The university celebrated its centennial anniversary.",
        explanation: "'Its' is the possessive form. 'It's' is exclusively the contraction of 'it is' or 'it has'."
      },
      {
        question_id: "pro-q5",
        question_text: "Fill in the blank: 'Neither of the proposals received _____ approval from the board.'",
        question_type: "multiple_choice",
        options: ["its", "their", "them", "there"],
        correct_answer: "its",
        explanation: "'Neither' is grammatically singular and takes the singular possessive pronoun 'its'."
      }
    ]
  },

  {
    topic_id: "grammar-verbs",
    title: "Verbs",
    category: "Parts of Speech",
    track_order: 3,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "The engine of the sentence: action, linking, auxiliary, modal, transitive, irregular, and non-finite verbs.",
    lesson_text: "Verbs are the essential core of every English sentence. A sentence cannot exist without a verb. Verbs perform three distinct syntactic functions: expressing physical or mental actions ('run', 'ponder'), connecting a subject to a descriptive state of being as linking verbs ('seem', 'be', 'taste'), or assisting main verbs as auxiliaries ('have', 'do', 'must'). To master verbs completely, learners must understand all dimensions: Transitive vs. Intransitive, Regular vs. Irregular, Finite vs. Non-finite (Gerunds, Infinitives, Participles), Phrasal Verbs, Stative vs. Dynamic verbs, Active vs. Passive voice, and Grammatical Moods.",
    progressive_levels: {
      basic: {
        heading: "Basic: What is a Verb? Action, Linking & Helping",
        concept: "A verb tells us what someone does (Action: 'walk', 'write', 'think'), what someone is or feels (Linking/State: 'is', 'seems', 'feels'), or helps another verb build time (Helping/Auxiliary: 'is running', 'has eaten'). In the present tense, third-person singular (he, she, it) adds '-s' or '-es' (He works, she catches).",
        key_points: [
          "Action Verbs describe physical actions (run, build, write) or mental actions (imagine, believe, remember).",
          "Linking Verbs connect the subject to an adjective or noun that describes it: 'The soup smells delicious' (not 'deliciously').",
          "Third-person singular present rule: Add '-s' to the verb for he/she/it: 'She creates art' vs. 'They create art'."
        ],
        examples: [
          "The software architect codes every morning. (physical action verb with 3rd-person -s)",
          "The coffee smells wonderful. (linking verb connecting 'coffee' to adjective 'wonderful')",
          "They are preparing the lecture slides. (helping verb 'are' + main verb 'preparing')"
        ]
      },
      intermediate: {
        heading: "Intermediate: Transitive, Intransitive & Irregular Conjugation",
        concept: "Transitive verbs require a Direct Object to complete their meaning ('She sent [an email]'). Intransitive verbs do not take an object and make complete sense alone ('The baby slept', 'The sun rose'). Some verbs can be both (ergative/ambitransitive: 'He opened the door' vs. 'The door opened'). Furthermore, irregular verbs do not follow the standard '+ed' past tense rule and must be mastered across base form, past simple, and past participle.",
        rules_and_formulas: [
          "Transitive Formula: Subject + Transitive Verb + Direct Object ('Engineers deployed the update').",
          "Intransitive Formula: Subject + Intransitive Verb (+ optional adverbial modifier) ('The birds migrated south').",
          "Irregular V1-V2-V3 Patterns: All 3 different (sing-sang-sung, freeze-froze-frozen, drive-drove-driven), V2 and V3 same (bring-brought-brought, buy-bought-bought), all 3 identical (cut-cut-cut, put-put-put, burst-burst-burst)."
        ],
        examples: [
          "The committee rejected the proposal. (transitive: 'rejected' requires the object 'proposal')",
          "The negotiations collapsed yesterday afternoon. (intransitive: 'collapsed' cannot take an object)",
          "The water in the pipes froze overnight. (irregular past simple: freeze -> froze -> frozen)"
        ]
      },
      advanced: {
        heading: "Advanced: Finite vs. Non-Finite, Stative Verbs, Phrasal Verbs & Moods",
        concept: "Finite verbs show tense, person, and number ('She works'). Non-finite verbs do not show tense and act as nouns or modifiers: Infinitives ('to swim'), Gerunds ('Swimming is healthy'), and Participles ('The running water'). Stative verbs express permanent states, thoughts, senses, or possessions (know, belong, understand, consist) and are rarely used in continuous (-ing) forms. Phrasal verbs combine a verb with a particle (turn down, look forward to). Finally, grammatical moods (Indicative, Imperative, Subjunctive) express statements of fact, commands, or hypothetical/contrary-to-fact wishes.",
        nuances_and_exceptions: [
          "Stative vs. Dynamic Verbs: 'I have a car' (possession = stative, never 'I am having a car') vs. 'I am having lunch' (action = dynamic, continuous allowed).",
          "Separable vs. Inseparable Phrasal Verbs: 'Turn it off' (separable, pronoun MUST go in the middle) vs. 'Look into the problem' (inseparable prepositional verb).",
          "Subjunctive Mood: Uses bare base verb for demands/recommendations: 'I insist that he be present' (not 'is present'); 'The doctor recommended that she rest' (not 'rests')."
        ],
        examples: [
          "I recommend that he review the financial audit immediately. (present subjunctive: bare 'review')",
          "Having finalized the architecture, the team deployed the application. (participial non-finite clause)",
          "She turned down the prestigious offer. (phrasal verb meaning rejected)"
        ]
      }
    },
    taxonomy_types: [
      { name: "1. Action Verbs (Physical & Mental)", description: "Express actions that subjects perform physically or cognitively.", examples: ["sprint", "analyze", "construct", "contemplate", "design"] },
      { name: "2. Linking (Copular) Verbs", description: "Connect the subject directly to a predicate adjective or noun complement without expressing action.", examples: ["be", "seem", "appear", "become", "taste", "smell", "feel", "sound"] },
      { name: "3. Primary Auxiliary Verbs", description: "The three foundational helping verbs ('be', 'have', 'do') used to construct tenses, questions, and negations.", examples: ["is writing", "has finished", "did not agree"] },
      { name: "4. Modal Auxiliary Verbs", description: "Helping verbs expressing ability, permission, necessity, likelihood, or obligation.", examples: ["can", "could", "may", "might", "must", "shall", "should", "will", "would"] },
      { name: "5. Transitive Verbs", description: "Verbs that require one or more direct objects to complete their meaning.", examples: ["She purchased [a car]", "He sent [a letter]"] },
      { name: "6. Intransitive Verbs", description: "Verbs that do not take a direct object; the action terminates with the subject.", examples: ["The baby smiled", "The sun sets", "He sneezed"] },
      { name: "7. Regular vs. Irregular Verbs", description: "Regular verbs form past simple & past participle with '-ed'; irregular verbs undergo vowel shifts or idiosyncratic changes.", examples: ["walk-walked-walked (regular)", "write-wrote-written (irregular)", "hit-hit-hit (irregular identical)"] },
      { name: "8. Finite vs. Non-Finite Verbs", description: "Finite verbs indicate tense/person; Non-finite verbs (infinitives, gerunds, participles) have no tense markers.", examples: ["She writes daily (finite)", "She loves to write (infinitive)", "Writing is her passion (gerund)"] },
      { name: "9. Stative vs. Dynamic Verbs", description: "Dynamic verbs describe actions and take continuous forms; stative verbs describe conditions, emotions, and possession.", examples: ["run -> is running (dynamic)", "own, know, prefer (stative - rarely in -ing)"] },
      { name: "10. Phrasal Verbs", description: "Multi-word verbs consisting of a verb plus a preposition or adverb that form a new idiomatic meaning.", examples: ["give up (quit)", "put off (postpone)", "call off (cancel)", "look forward to (anticipate)"] },
      { name: "11. Voice (Active vs. Passive)", description: "Active voice has the subject performing the action; passive voice has the subject receiving the action.", examples: ["The chef cooked the dish (active)", "The dish was cooked by the chef (passive)"] },
      { name: "12. Grammatical Moods", description: "The attitude of the speaker: Indicative (facts), Imperative (commands), Subjunctive (hypotheticals, wishes, demands).", examples: ["The train arrives at six (indicative)", "Please close the door (imperative)", "I demand that he arrive on time (subjunctive)"] }
    ],
    rules_summary: [
      { rule_name: "Linking Verbs take Adjectives", explanation: "Linking verbs link the subject to an adjective, NOT an adverb.", example: "The perfume smells sweet (not sweetly)." },
      { rule_name: "Transitive Object Requirement", explanation: "Transitive verbs cannot stand alone without their direct object.", example: "They discussed the proposal (not just 'They discussed')." },
      { rule_name: "Mandatory Subjunctive Form", explanation: "Clauses following verbs of urgency (demand, insist, recommend) require the bare base verb.", example: "The director insists that everyone be on time." },
      { rule_name: "Modal Auxiliary Invariance", explanation: "Modal verbs never take '-s' in the third person or '-ed' in the past; they are always followed by the bare infinitive.", example: "She must complete the assignment (not 'musts' or 'must to complete')." }
    ],
    example_sentences: [
      "The lead architect designed an innovative aerodynamic structure. (transitive action verb + direct object)",
      "The freshly baked sourdough bread tastes exquisite. (linking verb connecting subject to adjective)",
      "We have examined twenty clinical trial candidates this week. (auxiliary 'have' + past participle 'examined')",
      "The professor insisted that the graduate student submit the dissertation before midnight. (subjunctive bare verb)",
      "She turned down the invitation because she was recovering from pneumonia. (separable phrasal verb)"
    ],
    common_mistakes: [
      "Using adverbs after sensory linking verbs: Saying 'The soup tastes deliciously' instead of 'The soup tastes delicious'.",
      "Using continuous tense with stative verbs: Saying 'I am knowing the answer' instead of 'I know the answer'.",
      "Putting pronouns after phrasal verb particles: Saying 'Turn off it' instead of 'Turn it off' (separable phrasal verbs must split for pronouns).",
      "Incorrect third-person subjunctive: Saying 'The manager insists that he leaves' instead of 'The manager insists that he leave'."
    ],
    questions: [
      {
        question_id: "verb-q1",
        question_text: "In the sentence 'The music sounds magnificent', what grammatical classification is the verb 'sounds'?",
        question_type: "multiple_choice",
        options: ["Linking verb", "Transitive action verb", "Modal auxiliary verb", "Passive verb"],
        correct_answer: "Linking verb",
        explanation: "'Sounds' links the subject 'music' with the predicate adjective 'magnificent', describing sensory state rather than action."
      },
      {
        question_id: "verb-q2",
        question_text: "Which sentence features a STATIVE verb that should NOT typically be used in the continuous (-ing) aspect?",
        question_type: "multiple_choice",
        options: [
          "This rare antique belongs to the national museum.",
          "The children are playing tennis in the park.",
          "She is studying environmental science in college.",
          "The engine is running smoothly after repairs."
        ],
        correct_answer: "This rare antique belongs to the national museum.",
        explanation: "'Belong' is a stative verb of ownership and is not used in continuous forms ('is belonging' is ungrammatical)."
      },
      {
        question_id: "verb-q3",
        question_text: "Fill in the blank with the correct subjunctive verb form: 'The committee recommended that the CEO _____ (resign) immediately.'",
        question_type: "fill_in_blank",
        correct_answer: "resign",
        explanation: "The English subjunctive mood following 'recommended that' requires the bare base form of the verb ('resign', not 'resigns')."
      },
      {
        question_id: "verb-q4",
        question_text: "What is the past participle of the irregular verb 'forbid'?",
        question_type: "multiple_choice",
        options: ["forbidden", "forbidded", "forbade", "forbid"],
        correct_answer: "forbidden",
        explanation: "The principal parts of 'forbid' are: base 'forbid', past simple 'forbade', and past participle 'forbidden'."
      },
      {
        question_id: "verb-q5",
        question_text: "Select the sentence with a separable phrasal verb correctly splitting around a pronoun object:",
        question_type: "multiple_choice",
        options: [
          "The noise was deafening, so she turned it off.",
          "The noise was deafening, so she turned off it.",
          "The noise was deafening, so she turned down it.",
          "The noise was deafening, so she turned out it."
        ],
        correct_answer: "The noise was deafening, so she turned it off.",
        explanation: "When the object of a separable phrasal verb is a pronoun ('it', 'them', 'him'), it MUST sit between the verb and particle."
      }
    ]
  },

  {
    topic_id: "grammar-adjectives",
    title: "Adjectives",
    category: "Parts of Speech",
    track_order: 4,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Words that describe, quantify, and qualify nouns, following the natural OSASCOMP order.",
    lesson_text: "Adjectives provide vivid detail and precision by modifying nouns and pronouns. In English, adjectives can appear before the noun (attributive: 'a modern facility') or after linking verbs (predicative: 'the facility is modern'). When multiple adjectives describe one noun, native English adheres strictly to the cumulative OSASCOMP order: Opinion, Size, Age, Shape, Color, Origin, Material, Purpose. Additionally, adjectives take comparative ('-er' or 'more') and superlative ('-est' or 'most') forms to express degrees of comparison.",
    progressive_levels: {
      basic: {
        heading: "Basic: Attributive vs. Predicative Adjectives",
        concept: "Adjectives describe qualities like color, size, and appearance. They either sit directly in front of the noun ('a red apple') or follow linking verbs like be, seem, smell ('the apple is red'). Unlike many other languages, English adjectives never change for plural nouns (e.g. 'two blue cars', not 'two blues cars').",
        key_points: [
          "English adjectives are invariable; they never add '-s' for plural nouns.",
          "Adjectives answer questions like 'Which one?', 'What kind?', or 'How many?'.",
          "Comparative forms compare 2 things (taller); Superlative forms compare 3 or more (tallest)."
        ],
        examples: [
          "The ambitious young engineer submitted three innovative proposals. (attributive adjectives)",
          "The experimental results seemed consistent throughout the trial. (predicative adjective after 'seemed')"
        ]
      },
      intermediate: {
        heading: "Intermediate: Natural Adjective Order (OSASCOMP)",
        concept: "When two or more adjectives precede a single noun, native English requires a specific sequence: Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose + NOUN. Deviating from this order sounds unnatural to native speakers.",
        rules_and_formulas: [
          "OSASCOMP Formula: Opinion (lovely), Size (large), Age (ancient), Shape (round), Color (blue), Origin (Italian), Material (leather), Purpose (riding) + boots.",
          "Coordinate Adjectives: Separate with commas if you could reverse them or insert 'and' between them: 'a smart, dedicated leader'.",
          "Cumulative Adjectives: Do NOT separate with commas if they build on each other: 'an antique wooden dining table'."
        ],
        examples: [
          "She bought a beautiful antique Italian marble sculpture. (Opinion -> Age -> Origin -> Material)",
          "He carried an enormous heavy black canvas backpack. (Size -> Quality -> Color -> Material)"
        ]
      },
      advanced: {
        heading: "Advanced: Participle Adjectives (-ed vs. -ing) & Compound Modifiers",
        concept: "Participle adjectives ending in '-ed' describe the person experiencing a feeling ('I am bored'), while '-ing' adjectives describe the cause of the feeling ('The lecture is boring'). Compound adjectives acting as a single unit before a noun require a hyphen ('state-of-the-art laboratory', 'well-known author'); however, omit the hyphen when the modifier follows the noun ('the author is well known') or includes an '-ly' adverb ('highly qualified candidate').",
        nuances_and_exceptions: [
          "Never double comparative or superlative: 'more easier' is incorrect; use 'easier'. 'Most highest' is incorrect; use 'highest'.",
          "Irregular Adjectives: good -> better -> best; bad -> worse -> worst; far -> farther/further -> farthest/furthest; little -> less -> least.",
          "Post-positive Adjectives: Some adjectives sit AFTER the noun with indefinite pronouns: 'something interesting', 'someone special'."
        ],
        examples: [
          "The exhausted travelers found the mountain expedition invigorating. ('exhausted' = feeling; 'invigorating' = cause)",
          "She developed a cutting-edge, user-friendly mobile application. (hyphenated compound modifiers before noun)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Descriptive Adjectives", description: "Express quality, trait, or state of a noun.", examples: ["brilliant", "fragile", "innovative", "spacious"] },
      { name: "Quantitative Adjectives", description: "Indicate quantity, amount, or number.", examples: ["several", "numerous", "many", "three", "half"] },
      { name: "Demonstrative Adjectives", description: "Point directly to specific nouns in proximity.", examples: ["this laptop", "that building", "these guidelines", "those archives"] },
      { name: "Possessive Adjectives (Determiners)", description: "Show ownership or association.", examples: ["my", "your", "his", "her", "its", "our", "their"] },
      { name: "Comparative & Superlative Adjectives", description: "Express relative degrees of quality between two (comparative) or three+ entities (superlative).", examples: ["faster / fastest", "more accurate / most accurate", "better / best"] },
      { name: "Participle Adjectives (-ed / -ing)", description: "Derived from verbs to describe feelings (-ed) or characteristics (-ing).", examples: ["interested vs. interesting", "confused vs. confusing", "tired vs. tiring"] },
      { name: "Proper Adjectives", description: "Derived from proper nouns; always capitalized.", examples: ["Victorian architecture", "Japanese cuisine", "Shakespearean sonnet"] },
      { name: "Compound Adjectives", description: "Two or more words hyphenated together to form a unified descriptive modifier before a noun.", examples: ["state-of-the-art", "ten-minute break", "eco-friendly"] }
    ],
    rules_summary: [
      { rule_name: "The OSASCOMP Sequence", explanation: "Opinion -> Size -> Age -> Shape -> Color -> Origin -> Material -> Purpose.", example: "A gorgeous small antique round wooden table." },
      { rule_name: "-ed vs. -ing Participles", explanation: "Use -ed for how one feels; use -ing for the stimulus that creates the feeling.", example: "The fascinated audience listened to the fascinating lecture." },
      { rule_name: "Hyphenation in Compound Adjectives", explanation: "Hyphenate compound adjectives before nouns, but never with adverbs ending in -ly.", example: "A well-written article, but a highly regarded author." }
    ],
    example_sentences: [
      "She acquired a charming antique French clock at the local auction. (Natural order: Opinion -> Age -> Origin)",
      "The newly renovated conference hall is exceptionally bright and spacious. (predicative adjectives following 'is')",
      "Students were amazed by the surprising scientific discoveries. (-ed feeling vs. -ing cause)",
      "We took a fifteen-minute recess before resuming the presentation. (hyphenated singular compound adjective)"
    ],
    common_mistakes: [
      "Using double comparatives: Saying 'This approach is more easier' instead of 'This approach is easier'.",
      "Scrambling the adjective order: Saying 'wooden round table' instead of 'round wooden table'.",
      "Confusing -ed and -ing participles: Saying 'I am very boring in this meeting' instead of 'I am very bored'."
    ],
    questions: [
      {
        question_id: "adj-q1",
        question_text: "Choose the sentence containing the correct natural adjective order:",
        question_type: "multiple_choice",
        options: [
          "She wore a stunning long Italian silk evening gown.",
          "She wore an Italian stunning silk long evening gown.",
          "She wore a silk long stunning Italian evening gown.",
          "She wore a long Italian silk stunning evening gown."
        ],
        correct_answer: "She wore a stunning long Italian silk evening gown.",
        explanation: "Natural order follows: Opinion (stunning) -> Length/Size (long) -> Origin (Italian) -> Material (silk) -> Purpose (evening)."
      },
      {
        question_id: "adj-q2",
        question_text: "Choose the correct participle adjective: 'The instructions were so _____ that all the participants felt completely _____.'",
        question_type: "multiple_choice",
        options: [
          "confusing / confused",
          "confused / confusing",
          "confused / confused",
          "confusing / confusing"
        ],
        correct_answer: "confusing / confused",
        explanation: "The instructions caused the state ('confusing'), while the participants experienced the feeling ('confused')."
      },
      {
        question_id: "adj-q3",
        question_text: "What is the comparative form of the irregular adjective 'bad'?",
        question_type: "fill_in_blank",
        correct_answer: "worse",
        explanation: "The comparative of 'bad' is 'worse', and the superlative is 'worst'."
      },
      {
        question_id: "adj-q4",
        question_text: "Which of the following phrases is correctly hyphenated as a compound modifier?",
        question_type: "multiple_choice",
        options: [
          "a three-year-old child",
          "a highly-regarded scientist",
          "a recently-discovered artifact",
          "a three years old child"
        ],
        correct_answer: "a three-year-old child",
        explanation: "Age modifiers before nouns are hyphenated and use singular nouns ('three-year-old'). Modifiers with '-ly' adverbs are never hyphenated."
      },
      {
        question_id: "adj-q5",
        question_text: "Fill in the blank with the comparative form of 'heavy': 'Titanium is significantly _____ (comparative) than steel.'",
        question_type: "fill_in_blank",
        correct_answer: "lighter",
        explanation: "Depending on comparative perspective, 'lighter' or 'heavier' applies; here titanium is lighter than steel."
      }
    ]
  },

  {
    topic_id: "grammar-adverbs",
    title: "Adverbs",
    category: "Parts of Speech",
    track_order: 5,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Modifiers of verbs, adjectives, and other adverbs showing manner, place, time, frequency, and degree.",
    lesson_text: "Adverbs enrich language by describing how, when, where, how often, or to what extent an action takes place. They can modify verbs ('speaks eloquently'), adjectives ('exceptionally talented'), or other adverbs ('quite easily'). Although many adverbs end in '-ly', several common adverbs do not (e.g., 'fast', 'well', 'hard', 'never'). Understanding correct adverb placement—especially frequency adverbs and sentence adverbs—is essential for natural, idiomatic fluency.",
    progressive_levels: {
      basic: {
        heading: "Basic: What is an Adverb? (Manner, Time, Place)",
        concept: "Adverbs tell us about verbs. Adverbs of manner answer 'How?' (She walked slowly). Adverbs of time answer 'When?' (He arrived yesterday). Adverbs of place answer 'Where?' (We waited outside). Many adverbs are formed by adding '-ly' to an adjective (quick -> quickly, quiet -> quietly).",
        key_points: [
          "Adverbs modify verbs, adjectives, or other adverbs (NOT nouns).",
          "Adverbs of manner often end in '-ly' (careful -> carefully).",
          "Irregular adverb: The adverb of 'good' is 'well' (e.g. 'He plays well', not 'He plays good')."
        ],
        examples: [
          "The musician performed brilliantly on stage. ('brilliantly' describes how he performed)",
          "We will submit the final project tomorrow. ('tomorrow' is an adverb of time)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Frequency Adverbs & Sentence Placement",
        concept: "Adverbs of frequency (always, usually, often, sometimes, rarely, never) show how often something happens. Their position depends on the verb: they sit BEFORE main verbs, but AFTER the verb 'to be' and AFTER the first auxiliary verb.",
        rules_and_formulas: [
          "Before Main Verb: Subject + Frequency Adverb + Main Verb ('She always arrives on time').",
          "After 'Be': Subject + Be + Frequency Adverb ('He is always punctual').",
          "Between Auxiliaries: Subject + Aux 1 + Frequency Adverb + Main Verb ('They have rarely encountered such resilience').",
          "Flat Adverbs (no -ly): 'drive fast' (fast is both adjective and adverb), 'work hard', 'wake up early'."
        ],
        examples: [
          "The security system is constantly monitoring all server traffic. (placed after auxiliary 'is')",
          "He worked hard all weekend to meet the critical launch deadline. ('hard' is a flat adverb; 'hardly' means barely)"
        ]
      },
      advanced: {
        heading: "Advanced: Adverbial Inversion & Conjunctive Adverbs",
        concept: "When negative or restrictive adverbs (seldom, rarely, hardly, scarcely, little, no sooner) begin a sentence for dramatic emphasis, the subject and auxiliary verb invert ('Seldom have I seen...'). Conjunctive adverbs (however, therefore, furthermore, nevertheless) connect independent clauses and must be preceded by a semicolon and followed by a comma.",
        nuances_and_exceptions: [
          "Words ending in '-ly' that are adjectives: 'friendly', 'lonely', 'lovely', 'silly', 'ugly'. To turn them into adverbs, use a phrase: 'in a friendly manner'.",
          "Hard vs. Hardly: 'He works hard' (with dedication) vs. 'He hardly works' (he barely works at all).",
          "Late vs. Lately: 'Arrived late' (not on time) vs. 'Lately' (recently)."
        ],
        examples: [
          "Rarely have we witnessed such remarkable scientific progress. (negative inversion: auxiliary 'have' precedes subject 'we')",
          "The hypothesis seemed plausible; however, empirical evidence refuted it. (conjunctive adverb with semicolon and comma)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Adverbs of Manner", description: "Describe how an action is performed.", examples: ["fluently", "gracefully", "meticulously", "quietly"] },
      { name: "Adverbs of Time", description: "Specify when or for how long an action occurs.", examples: ["yesterday", "subsequently", "now", "soon", "already"] },
      { name: "Adverbs of Place", description: "Indicate where an action occurs.", examples: ["abroad", "downstairs", "nearby", "everywhere"] },
      { name: "Adverbs of Frequency", description: "Indicate how frequently an action happens.", examples: ["always", "frequently", "occasionally", "rarely", "never"] },
      { name: "Adverbs of Degree", description: "Express the intensity, extent, or scale of a quality.", examples: ["extremely", "quite", "scarcely", "thoroughly", "partially"] },
      { name: "Sentence Adverbs", description: "Modify an entire sentence or clause, expressing the speaker's stance.", examples: ["Fortunately,", "Undoubtedly,", "Clearly,", "Regrettably,"] },
      { name: "Conjunctive Adverbs", description: "Transition between independent clauses.", examples: ["therefore", "however", "furthermore", "consequently"] }
    ],
    rules_summary: [
      { rule_name: "Adverb vs. Adjective Modification", explanation: "Use adverbs to modify verbs, adjectives, and other adverbs; use adjectives for nouns.", example: "She speaks English fluently (adverb modifying speaks)." },
      { rule_name: "Frequency Adverb Placement", explanation: "Place adverbs of frequency before main verbs, but after auxiliary verbs and 'to be'.", example: "He has never forgotten her advice." },
      { rule_name: "Negative Adverb Inversion", explanation: "Fronting a negative adverb causes subject-auxiliary inversion.", example: "Scarcely had we entered the building when the alarm sounded." }
    ],
    example_sentences: [
      "The surgeon carefully analyzed the diagnostic scans before entering the operating room. (manner adverb)",
      "Dr. Foster has frequently published research in top-tier medical journals. (frequency adverb between auxiliary and participle)",
      "The lecture was extraordinarily captivating from beginning to end. (adverb of degree modifying adjective)",
      "Seldom does an invention revolutionize an entire global industry so rapidly. (negative inversion + manner adverb)"
    ],
    common_mistakes: [
      "Confusing 'good' and 'well': Saying 'He did good on the examination' instead of 'He did well'.",
      "Misusing 'hardly': Saying 'He worked hardly' instead of 'He worked hard' ('hardly' means almost not at all).",
      "Treating '-ly' adjectives as adverbs: Saying 'He spoke friendly' instead of 'He spoke in a friendly way'."
    ],
    questions: [
      {
        question_id: "adv-q1",
        question_text: "Identify the adverb of manner in: 'The inspector reviewed the legal documents thoroughly.'",
        question_type: "multiple_choice",
        options: ["thoroughly", "inspector", "reviewed", "documents"],
        correct_answer: "thoroughly",
        explanation: "'Thoroughly' describes how the inspector reviewed the documents, making it an adverb of manner."
      },
      {
        question_id: "adv-q2",
        question_text: "Which sentence features correct adverbial inversion?",
        question_type: "multiple_choice",
        options: [
          "Seldom have I seen such dedication to public service.",
          "Seldom I have seen such dedication to public service.",
          "Seldom seen I have such dedication to public service.",
          "Seldom I saw such dedication to public service."
        ],
        correct_answer: "Seldom have I seen such dedication to public service.",
        explanation: "Fronting 'seldom' requires auxiliary inversion where auxiliary 'have' precedes the subject 'I'."
      },
      {
        question_id: "adv-q3",
        question_text: "Fill in the blank with the correct adverb form of 'good': 'She speaks three languages _____.'",
        question_type: "fill_in_blank",
        correct_answer: "well",
        explanation: "The adverb form modifying the verb 'speaks' is 'well', whereas 'good' is an adjective."
      },
      {
        question_id: "adv-q4",
        question_text: "Where does the frequency adverb 'always' properly belong in this sentence? 'He [1] has [2] been [3] supportive [4].'",
        question_type: "multiple_choice",
        options: ["Position [2] (He has always been supportive)", "Position [1] (He always has been supportive)", "Position [3] (He has been always supportive)", "Position [4] (He has been supportive always)"],
        correct_answer: "Position [2] (He has always been supportive)",
        explanation: "Frequency adverbs sit directly after the first auxiliary verb ('has always been')."
      },
      {
        question_id: "adv-q5",
        question_text: "Which word ending in '-ly' is actually an ADJECTIVE rather than an adverb?",
        question_type: "multiple_choice",
        options: ["Friendly", "Quickly", "Quietly", "Carefully"],
        correct_answer: "Friendly",
        explanation: "'Friendly' describes a noun ('a friendly host') and is an adjective, not an adverb."
      }
    ]
  },

  {
    topic_id: "grammar-prepositions",
    title: "Prepositions",
    category: "Parts of Speech",
    track_order: 6,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Words establishing spatial, temporal, and logical relationships between nouns/pronouns and sentences.",
    lesson_text: "Prepositions are linking words that position nouns and pronouns in time ('at 5 PM', 'in July'), place ('on the desk', 'in Tokyo'), and direction ('into the room', 'through the tunnel'). They combine with nouns to form prepositional phrases ('under the bridge', 'with great care'). In addition to spatial and temporal rules, English features hundreds of dependent prepositions—fixed verb, noun, and adjective collocations that must be learned as idioms ('depend on', 'interested in', 'proficient at').",
    progressive_levels: {
      basic: {
        heading: "Basic: Time and Place (In, On, At)",
        concept: "The pyramid of IN, ON, AT: 'IN' is the broadest (centuries, years, months, countries, enclosed spaces). 'ON' is narrower (days, dates, streets, flat surfaces). 'AT' is the most specific (exact clock times, precise addresses, specific locations).",
        key_points: [
          "Time: IN 2026, IN October; ON Monday, ON May 4th; AT 3:30 PM, AT midnight.",
          "Place: IN France, IN the kitchen; ON Oxford Street, ON the table; AT 42 Wallaby Way, AT the station.",
          "Prepositions are always followed by a noun, noun phrase, or pronoun (the object of preposition)."
        ],
        examples: [
          "The symposium starts at 9:00 AM on Monday in London. (At = exact time, On = day, In = city)",
          "Her keys are lying on the kitchen counter. (On = flat surface)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Prepositions of Movement & Dependent Prepositions",
        concept: "Prepositions of movement describe dynamic trajectory: 'into' (entering an enclosed area), 'onto' (moving to a surface), 'through' (passing from one end to another of a 3D space), 'towards' (moving in the direction of). Furthermore, dependent prepositions form essential fixed pairs with adjectives and verbs.",
        rules_and_formulas: [
          "Movement vs. Position: 'Jumped into the pool' (movement) vs. 'Swimming in the pool' (location).",
          "Adjective + Preposition: interested IN, good AT, capable OF, proud OF, accustomed TO, familiar WITH.",
          "Verb + Preposition: depend ON, apologize FOR, insist ON, apply FOR, prevent FROM."
        ],
        examples: [
          "She stepped into the conference hall and walked towards the podium. (movement prepositions)",
          "Our overall success depends on effective interdepartmental collaboration. ('depend on' fixed collocation)"
        ]
      },
      advanced: {
        heading: "Advanced: Complex Prepositions & Dangling Prepositions",
        concept: "Complex prepositions consist of two or more words acting as a single unit ('in accordance with', 'by means of', 'with regard to', 'on behalf of'). In modern English, ending a sentence with a preposition (stranded/dangling preposition) is completely natural in informal and semi-formal contexts ('What are you looking at?'), though formal writing often rephrases ('At what are you looking?').",
        nuances_and_exceptions: [
          "Between vs. Among: 'Between' is used for distinct individual entities (even if more than two: 'negotiations between Canada, the US, and Mexico'); 'Among' is used for undefined groups or collective masses ('honored among peers').",
          "Beside vs. Besides: 'Beside' means next to ('Sit beside me'); 'Besides' means in addition to ('Besides German, she speaks Italian').",
          "Gerunds after Prepositions: Prepositions are ALWAYS followed by gerunds (-ing), never bare verbs: 'interested in learning', 'thank you for helping'."
        ],
        examples: [
          "In accordance with company policy, all expense reports must be submitted on Friday. (complex preposition)",
          "She was recognized among her colleagues for exceptional scientific breakthroughs. (among = collective group)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Prepositions of Time", description: "Locate events chronologically.", examples: ["at (time)", "on (day/date)", "in (month/year)", "during", "since", "until"] },
      { name: "Prepositions of Place & Position", description: "Indicate location in physical or abstract space.", examples: ["in (enclosed)", "on (surface)", "at (point)", "under", "above", "between", "adjacent to"] },
      { name: "Prepositions of Direction & Movement", description: "Indicate orientation, vector, and path.", examples: ["into", "onto", "through", "towards", "across", "past", "along"] },
      { name: "Dependent Prepositions", description: "Fixed prepositions governed by specific verbs, nouns, or adjectives.", examples: ["rely on", "fond of", "congratulate on", "participate in"] },
      { name: "Complex (Multi-Word) Prepositions", description: "Phrases of two or three words functioning as a single preposition.", examples: ["in spite of", "due to", "in front of", "with respect to", "as well as"] }
    ],
    rules_summary: [
      { rule_name: "The In/On/At Pyramid", explanation: "In = general (year/city); On = specific (day/street); At = precise (clock time/address).", example: "At 10:00 AM on Friday in Tokyo." },
      { rule_name: "Prepositions govern Gerunds", explanation: "Any verb following a preposition must take the '-ing' gerund form.", example: "She apologized for arriving late." },
      { rule_name: "Beside vs. Besides", explanation: "Beside = next to; Besides = in addition to.", example: "Besides teaching, he writes textbooks." }
    ],
    example_sentences: [
      "The clinical trials commenced in September 2024 at our Zurich laboratory. (in month/year, at facility)",
      "He walked briskly into the boardroom and placed the confidential documents on the table. (movement 'into', surface 'on')",
      "The engineering department is highly capable of delivering the automated prototype. (dependent 'capable of' + gerund)",
      "Besides managing the regional office, she directs the global sustainability initiative. ('besides' = in addition to)"
    ],
    common_mistakes: [
      "Using 'in' for specific days: Saying 'The exam is in Monday' instead of 'The exam is on Monday'.",
      "Using wrong dependent prepositions: Saying 'I am good in English' instead of 'I am good at English'.",
      "Confusing beside and besides: Saying 'Sit besides me' instead of 'Sit beside me'."
    ],
    questions: [
      {
        question_id: "prep-q1",
        question_text: "Choose the correct preposition: 'The flight departs _____ 7:45 AM tomorrow.'",
        question_type: "multiple_choice",
        options: ["at", "on", "in", "by"],
        correct_answer: "at",
        explanation: "'At' is strictly required for exact clock times."
      },
      {
        question_id: "prep-q2",
        question_text: "Select the correct dependent preposition: 'She is remarkably proficient _____ developing scalable cloud architectures.'",
        question_type: "multiple_choice",
        options: ["at", "in", "on", "for"],
        correct_answer: "at",
        explanation: "The standard collocation for skills and competence is 'proficient at' (or 'in', with 'at' standard for tasks)."
      },
      {
        question_id: "prep-q3",
        question_text: "Fill in the blank: 'The university was established _____ 1892.'",
        question_type: "fill_in_blank",
        correct_answer: "in",
        explanation: "'In' is required for calendar years, decades, and centuries."
      },
      {
        question_id: "prep-q4",
        question_text: "Which sentence correctly distinguishes 'beside' and 'besides'?",
        question_type: "multiple_choice",
        options: [
          "Besides French, she is fluent in Mandarin and Japanese.",
          "Beside French, she is fluent in Mandarin and Japanese.",
          "She sat besides her mentor during the banquet.",
          "Besides the desk sat an antique armchair."
        ],
        correct_answer: "Besides French, she is fluent in Mandarin and Japanese.",
        explanation: "'Besides' means 'in addition to'. 'Beside' means 'next to'."
      },
      {
        question_id: "prep-q5",
        question_text: "Choose the correct preposition: 'The cat leaped _____ the high garden wall.'",
        question_type: "multiple_choice",
        options: ["onto", "in", "at", "during"],
        correct_answer: "onto",
        explanation: "'Onto' expresses movement toward and settling upon an elevated surface."
      }
    ]
  },

  {
    topic_id: "grammar-conjunctions",
    title: "Conjunctions",
    category: "Parts of Speech",
    track_order: 7,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Connectors that link words, phrases, and clauses: Coordinating, Subordinating, and Correlative.",
    lesson_text: "Conjunctions are the glue of English syntax, joining words, phrases, and clauses to create cohesive, logical sentences. They are divided into three primary families: Coordinating Conjunctions (FANBOYS: For, And, Nor, But, Or, Yet, So) that connect grammatically equal elements; Subordinating Conjunctions ('because', 'although', 'since', 'unless') that connect dependent clauses to independent clauses; and Correlative Conjunctions ('either...or', 'neither...nor', 'not only...but also') that work in pairs to balance ideas.",
    progressive_levels: {
      basic: {
        heading: "Basic: Coordinating Conjunctions (FANBOYS)",
        concept: "The 7 coordinating conjunctions can be remembered with the acronym FANBOYS: For (reason), And (addition), Nor (negative choice), But (contrast), Or (alternative), Yet (unexpected contrast), So (result). When connecting two complete independent sentences, always put a comma before the conjunction.",
        key_points: [
          "FANBOYS connect equal grammatical units: word + word, phrase + phrase, or clause + clause.",
          "Comma Rule: Use a comma before the FANBOYS conjunction when joining two full independent sentences ('I wanted to go, but it rained').",
          "No Comma when joining two verbs with the same subject: 'She studied hard and passed the exam'."
        ],
        examples: [
          "She wanted to attend the conference, but she missed the morning flight. (independent clause + but + independent clause)",
          "You can pay by credit card or bank transfer. (joining two noun phrases)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Subordinating Conjunctions & Clauses",
        concept: "Subordinating conjunctions introduce dependent clauses that cannot stand alone. Common categories include Cause ('because', 'since', 'as'), Concession/Contrast ('although', 'even though', 'whereas'), Condition ('if', 'unless', 'provided that'), and Time ('while', 'after', 'before', 'until').",
        rules_and_formulas: [
          "Dependent Clause First: Subordinating Conjunction + Dependent Clause + COMMA + Independent Clause ('Although it was late, we continued working').",
          "Independent Clause First: Independent Clause + Subordinating Conjunction + Dependent Clause (NO COMMA: 'We continued working although it was late').",
          "'Unless' means 'if not': 'Unless you submit your credentials, your application will be void'."
        ],
        examples: [
          "Because the data was inconclusive, the scientists repeated the trial. (introductory clause with comma)",
          "The project proceeded smoothly although several team members were absent. (main clause first, no comma)"
        ]
      },
      advanced: {
        heading: "Advanced: Correlative Conjunctions & Parallel Structure",
        concept: "Correlative conjunctions come in balanced pairs: 'either...or', 'neither...nor', 'not only...but also', 'both...and', 'whether...or'. The elements joined by correlative conjunctions MUST follow strict parallel grammatical structure (e.g. noun with noun, infinitive with infinitive). Furthermore, the verb agrees with the subject closest to it.",
        nuances_and_exceptions: [
          "Proximity Agreement Rule: With 'either...or' and 'neither...nor', the verb agrees with the nearest subject: 'Neither the manager nor the employees WERE notified' vs. 'Neither the employees nor the manager WAS notified'.",
          "Parallelism: Incorrect: 'She is not only intelligent, but also likes to read'. Correct: 'She is not only intelligent, but also well-read' (adjective balanced with adjective).",
          "Negative Inversion with 'Not only': When 'Not only' begins a sentence, invert subject and auxiliary: 'Not only did she win the award, but she also delivered the keynote'."
        ],
        examples: [
          "Not only did they exceed their quarterly targets, but they also expanded into three new markets. (fronted negative correlative)",
          "Neither the lead architect nor the project managers were available for comment. (verb agrees with plural managers)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Coordinating Conjunctions (FANBOYS)", description: "Join grammatically equal words, phrases, or independent clauses.", examples: ["For", "And", "Nor", "But", "Or", "Yet", "So"] },
      { name: "Subordinating Conjunctions", description: "Introduce dependent adverbial clauses indicating cause, contrast, time, or condition.", examples: ["because", "although", "since", "while", "unless", "whereas", "as soon as"] },
      { name: "Correlative Conjunctions", description: "Paired conjunctions that connect parallel syntactic elements.", examples: ["either...or", "neither...nor", "not only...but also", "both...and", "whether...or"] },
      { name: "Conjunctive Adverbs", description: "Adverbs functioning as connectors between independent clauses, requiring specific punctuation.", examples: ["however", "therefore", "consequently", "furthermore", "nonetheless"] }
    ],
    rules_summary: [
      { rule_name: "FANBOYS Comma Rule", explanation: "Use a comma before FANBOYS only when connecting two complete clauses with their own subjects.", example: "He finished his paper, and she submitted the grant." },
      { rule_name: "Subordinate Clause Punctuation", explanation: "Place a comma after an introductory dependent clause; omit the comma if the dependent clause follows the main clause.", example: "Although she was tired, she attended the lecture." },
      { rule_name: "Correlative Proximity Rule", explanation: "With 'neither...nor' and 'either...or', the verb matches the number of the noun closest to it.", example: "Neither the teacher nor the students were present." }
    ],
    example_sentences: [
      "The experiment yielded promising results, yet further empirical verification is mandatory. (coordinating 'yet')",
      "Although economic forecasts were pessimistic, consumer spending remained robust. (subordinating concession)",
      "The enterprise will either acquire the emerging startup or develop an internal solution. (correlative 'either...or')",
      "Not only did the software pass the security audit, but it also improved system latency by forty percent. (advanced correlative inversion)"
    ],
    common_mistakes: [
      "Comma splices: Joining two independent clauses with only a comma: 'The report is ready, I will send it' (correct: 'The report is ready, so I will send it' or use a semicolon).",
      "Faulty parallelism with correlative conjunctions: Saying 'He wants either to sleep or eating' instead of 'He wants either to sleep or to eat'.",
      "Double contrast words: Saying 'Although it was raining, but we went out' (never use 'although' and 'but' together in one sentence)."
    ],
    questions: [
      {
        question_id: "conj-q1",
        question_text: "Fill in the blank with the correct coordinating conjunction: 'We planned to hike in the mountains, _____ severe thunderstorms forced us to cancel.'",
        question_type: "multiple_choice",
        options: ["but", "so", "and", "or"],
        correct_answer: "but",
        explanation: "'But' is the coordinating conjunction used to contrast the plan with the contradictory reality."
      },
      {
        question_id: "conj-q2",
        question_text: "Choose the sentence that demonstrates strict parallel structure with correlative conjunctions:",
        question_type: "multiple_choice",
        options: [
          "She is not only an accomplished violinist, but also an acclaimed mathematician.",
          "She is not only an accomplished violinist, but also excels at mathematics.",
          "She not only is an accomplished violinist, but also a mathematician.",
          "Not only she is an accomplished violinist, but also an acclaimed mathematician."
        ],
        correct_answer: "She is not only an accomplished violinist, but also an acclaimed mathematician.",
        explanation: "Both branches balance 'noun phrase' with 'noun phrase' ('an accomplished violinist' // 'an acclaimed mathematician')."
      },
      {
        question_id: "conj-q3",
        question_text: "Which subordinating conjunction means 'if not'?",
        question_type: "fill_in_blank",
        correct_answer: "unless",
        explanation: "'Unless' introduces a conditional exception meaning 'if not' (e.g. 'Unless you study' = 'If you do not study')."
      },
      {
        question_id: "conj-q4",
        question_text: "Select the sentence with correct subject-verb agreement following 'neither...nor':",
        question_type: "multiple_choice",
        options: [
          "Neither the director nor the actors were satisfied with the screening.",
          "Neither the director nor the actors was satisfied with the screening.",
          "Neither the actors nor the director were satisfied with the screening.",
          "Neither the director nor the actors has been satisfied with the screening."
        ],
        correct_answer: "Neither the director nor the actors were satisfied with the screening.",
        explanation: "The verb harmonizes with the closer subject 'actors' (plural), requiring 'were satisfied'."
      },
      {
        question_id: "conj-q5",
        question_text: "What punctuation is required when an independent clause is followed by a conjunctive adverb like 'however' connecting to another independent clause?",
        question_type: "multiple_choice",
        options: [
          "Semicolon before 'however', comma after",
          "Comma before 'however', period after",
          "No punctuation before or after",
          "Colon before 'however', comma after"
        ],
        correct_answer: "Semicolon before 'however', comma after",
        explanation: "The standard punctuation pattern is: Clause A; however, Clause B."
      }
    ]
  },

  {
    topic_id: "grammar-articles",
    title: "Articles & Determiners",
    category: "Parts of Speech",
    track_order: 8,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Definite ('the'), Indefinite ('a'/'an'), and Zero Article rules governing noun specificity.",
    lesson_text: "Articles are determiners that tell the listener whether a noun refers to a specific, unique entity or a non-specific, general member of a class. English has two Indefinite articles: 'a' (before consonant sounds: 'a university', 'a European') and 'an' (before vowel sounds: 'an hour', 'an MBA'). The Definite article 'the' is used when the entity is identifiable to both speaker and listener, unique, or superlative. Finally, the Zero Article (no article at all) applies to uncountable nouns and plural countable nouns used in a general, universal sense.",
    progressive_levels: {
      basic: {
        heading: "Basic: A vs. An & Specific 'The'",
        concept: "Use 'A' or 'AN' only with singular countable nouns mentioned for the first time. The choice between 'a' and 'an' depends on the first SOUND of the following word, NOT the letter. Use 'THE' when both people know exactly which specific item is being discussed.",
        key_points: [
          "Use 'A' before consonant sounds: a cat, a doctor, a university (/j/ sound), a one-day trip (/w/ sound).",
          "Use 'AN' before vowel sounds: an apple, an elephant, an hour (silent 'h'), an MBA (/ɛm/ sound).",
          "First mention vs. Second mention: 'I saw a dog in the park. The dog was chasing a frisbee'."
        ],
        examples: [
          "She will graduate from a university in an hour. ('a' before consonant glide /j/, 'an' before silent 'h')",
          "Please close the window. (Both speaker and listener know which specific window)"
        ]
      },
      intermediate: {
        heading: "Intermediate: The Definite Article & Zero Article",
        concept: "Use 'THE' with: superlative adjectives ('the highest peak'), unique celestial and geographical entities ('the moon', 'the internet'), and specific historical periods ('the Renaissance'). Use ZERO ARTICLE (no article) when talking about things in general with plural or mass nouns: 'Dogs are loyal animals' (not 'The dogs are loyal animals').",
        rules_and_formulas: [
          "Zero Article Generalization: 'Children need love' (general), 'Water boils at 100°C' (scientific fact).",
          "Specific Mass Noun with 'The': 'The water in this bottle is contaminated' (specific water).",
          "Quantifiers: 'a few' (positive: some) vs. 'few' (negative: almost none); 'a little' (positive) vs. 'little' (negative: almost none)."
        ],
        examples: [
          "The moon exerts gravitational pull on the Earth's oceans. (unique celestial bodies take 'the')",
          "Students across the globe are studying artificial intelligence. (zero article for general students and abstract field)"
        ]
      },
      advanced: {
        heading: "Advanced: Geographic Rules & Institutional Nouns",
        concept: "Geographical rules for 'the': Use 'the' with oceans, rivers, mountain ranges (plural), island chains (plural), deserts, and countries with plural/political words ('the United States', 'the Netherlands', 'the United Kingdom'). Omit 'the' with individual mountains (Mount Everest), individual lakes (Lake Michigan), individual islands, continents (Asia), and single countries (Spain, Japan). Furthermore, institutional nouns (school, hospital, prison, university) drop 'the' when used for their primary institutional purpose ('He is in hospital' as a patient), but take 'the' when referring to the physical building ('She visited the hospital').",
        nuances_and_exceptions: [
          "Acronyms vs. Initialisms: Use 'the' if individual letters are spoken ('the FBI', 'the BBC', 'the UN'); omit 'the' for acronyms pronounced as words ('NASA', 'UNESCO', 'NATO').",
          "Musical Instruments: Use 'the' when playing instruments generally: 'She plays the cello' (skill) vs. 'She bought a cello' (object).",
          "National Groups: 'The French', 'The Japanese', 'The British' refer to the entire population as a plural collective."
        ],
        examples: [
          "The Amazon River flows into the Atlantic Ocean. (rivers and oceans mandate 'the')",
          "Mount Everest is situated in the Himalayas. (individual mountain = zero article; mountain range = 'the')"
        ]
      }
    },
    taxonomy_types: [
      { name: "Indefinite Articles ('a', 'an')", description: "Introduces non-specific singular countable nouns; choice determined by initial phonetic sound.", examples: ["a laptop", "an honor", "a European", "an honest mistake"] },
      { name: "Definite Article ('the')", description: "Designates unique, previously mentioned, superlative, or mutually known entities.", examples: ["the CEO", "the sun", "the finest architect", "the proposal we submitted"] },
      { name: "Zero Article (Ø)", description: "Omission of any article before general plurals, uncountable mass nouns, proper nouns, and languages.", examples: ["Ø Education is essential", "Ø Lions live in prides", "He speaks Ø German"] },
      { name: "Determiners & Quantifiers", description: "Quantifying determiners establishing proportion and availability.", examples: ["every", "each", "all", "few vs. a few", "little vs. a little"] }
    ],
    rules_summary: [
      { rule_name: "Sound over Spelling Rule", explanation: "Use 'an' before vowel sounds (/æ/, /ɛ/, /ɪ/, /ɒ/, /ʌ/) and 'a' before consonant sounds (including /j/ and /w/).", example: "An hour, but a unique opportunity." },
      { rule_name: "Generalization Zero Article", explanation: "Plural and uncountable nouns discussed in general take zero article.", example: "Technology changes society rapidly." },
      { rule_name: "Geographic 'The' Rule", explanation: "Use 'the' with mountain chains and rivers, but never with individual peaks or lakes.", example: "The Alps, but Mount Blanc." }
    ],
    example_sentences: [
      "Dr. Vance earned an MBA from a European university. ('an' before vowel sound /ɛm/, 'a' before glide /j/)",
      "The Pacific Ocean is the deepest oceanic basin on Earth. (definite article with oceans and superlatives)",
      "Creativity and perseverance are indispensable traits in scientific discovery. (zero article with abstract nouns)",
      "He was admitted to hospital for observation after the accident. (institutional noun without article)"
    ],
    common_mistakes: [
      "Deciding 'a' vs. 'an' by spelling instead of sound: Saying 'a honest answer' instead of 'an honest answer' (silent 'h').",
      "Using 'the' with general plural nouns: Saying 'The doctors work long hours' when discussing doctors as an entire profession.",
      "Adding 'the' to individual countries: Saying 'the Japan' or 'the Germany' instead of 'Japan' or 'Germany'."
    ],
    questions: [
      {
        question_id: "art-q1",
        question_text: "Choose the correct article: 'It is _____ profound honor to deliver the keynote address.'",
        question_type: "multiple_choice",
        options: ["a", "an", "the", "no article"],
        correct_answer: "a",
        explanation: "'Profound' begins with a consonant sound (/p/), requiring 'a' (even though 'honor' alone takes 'an')."
      },
      {
        question_id: "art-q2",
        question_text: "Fill in the blank with the correct article: 'She has been studying at _____ European institute for six months.'",
        question_type: "multiple_choice",
        options: ["a", "an", "the", "no article"],
        correct_answer: "a",
        explanation: "'European' begins phonetically with a consonant glide /j/ (as in 'yellow'), mandating 'a'."
      },
      {
        question_id: "art-q3",
        question_text: "Fill in the blank with 'the' or 'none': '_____ Mount Kilimanjaro is the highest free-standing peak in Africa.'",
        question_type: "fill_in_blank",
        correct_answer: "none",
        explanation: "Individual mountain peaks take zero article ('none'). Mountain ranges (like 'the Alps') take 'the'."
      },
      {
        question_id: "art-q4",
        question_text: "Which sentence correctly illustrates the difference between 'few' and 'a few'?",
        question_type: "multiple_choice",
        options: [
          "He has a few friends, so he rarely feels lonely.",
          "He has a few friends, so he is very lonely.",
          "He has few friends, so he is quite popular.",
          "He has few friends, but they visit him every hour."
        ],
        correct_answer: "He has a few friends, so he rarely feels lonely.",
        explanation: "'A few' has a positive connotation meaning 'some', whereas 'few' has a negative connotation meaning 'almost none'."
      },
      {
        question_id: "art-q5",
        question_text: "Select the sentence with correct article usage for geographical features:",
        question_type: "multiple_choice",
        options: [
          "The Nile River flows through Egypt into the Mediterranean Sea.",
          "Nile River flows through the Egypt into Mediterranean Sea.",
          "The Nile River flows through Egypt into a Mediterranean Sea.",
          "A Nile River flows through Egypt into the Mediterranean Sea."
        ],
        correct_answer: "The Nile River flows through Egypt into the Mediterranean Sea.",
        explanation: "Rivers ('the Nile River') and seas ('the Mediterranean Sea') take 'the', while single countries like 'Egypt' take zero article."
      }
    ]
  },

  {
    topic_id: "grammar-interjections",
    title: "Interjections",
    category: "Parts of Speech",
    track_order: 9,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Expressive words conveying immediate emotion, hesitation, greeting, or emphasis, punctuated accordingly.",
    lesson_text: "Interjections are spontaneous words or short vocalizations used to convey sudden emotion, surprise, agreement, hesitation, or greeting. Unlike other parts of speech, interjections are grammatically independent—they do not modify or connect to the main clause's syntactic structure. They range from strong emotional outbursts punctuated with exclamation marks ('Ouch!', 'Hooray!') to mild discourse markers set off with commas ('Well, let me consider that').",
    progressive_levels: {
      basic: {
        heading: "Basic: What is an Interjection?",
        concept: "Interjections express feelings like joy, pain, surprise, or relief. When the emotion is strong, use an exclamation mark ('Wow! That was incredible'). When the emotion is mild, use a comma ('Oh, I didn't see you there').",
        key_points: [
          "Interjections stand outside the sentence's grammatical structure.",
          "Strong emotion = Exclamation mark (Ouch! That hurt!).",
          "Mild emotion = Comma (Well, we should get started)."
        ],
        examples: [
          "Bravo! That was an exceptional violin performance. (strong praise)",
          "Hey, do you know what time the library closes? (casual greeting)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Discourse Markers & Punctuation Rules",
        concept: "In spoken and written dialogue, interjections often function as discourse markers that manage conversational flow: stalling for thinking time ('um', 'er'), expressing polite hesitation ('well'), or signaling agreement ('indeed', 'aha'). Proper punctuation separates these words from the rest of the sentence.",
        rules_and_formulas: [
          "Introductory Mild Interjection: Interjection + COMMA + Sentence ('Well, that changes everything').",
          "Parenthetical Mid-Sentence: Sentence + COMMA + Interjection + COMMA + Rest of Sentence ('The results were, alas, completely negative').",
          "Capitalization: Capitalize the first word following an exclamation mark ('Ouch! My ankle hurts')."
        ],
        examples: [
          "Well, after reviewing the parameters, we agree with your assessment. (introductory conversational marker)",
          "Indeed, the secondary analysis corroborated our initial findings. (affirmation marker)"
        ]
      },
      advanced: {
        heading: "Advanced: Literary Interjections & Formal Register",
        concept: "In formal and academic prose, colloquial interjections are replaced with sophisticated adverbs or formal parentheticals. However, classical and literary English employs archaic interjections ('alas', 'hark', 'lo') to convey dramatic pathos. Understanding when and how to utilize or suppress interjections is critical for mastering register.",
        nuances_and_exceptions: [
          "Register Awareness: Avoid colloquial interjections ('Yeah', 'Oh well', 'Oops') in academic or legal writing.",
          "Formal Substitutes: Replace 'Well,' with 'Upon reflection,'; replace 'Wow!' with 'Remarkably,'.",
          "Literary Pathos: 'Alas, the historic library was lost to the blaze' conveys formal sorrow."
        ],
        examples: [
          "Alas, the diplomatic summit concluded without a signed treaty. (formal literary interjection)",
          "Remarkably, the experimental battery retained ninety percent of its charge. (formal academic equivalent)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Emotional Interjections", description: "Express sudden spontaneous joy, distress, pain, or surprise.", examples: ["Ouch!", "Hooray!", "Alas!", "Phew!", "Yikes!"] },
      { name: "Cognitive / Hesitation Markers", description: "Signal thinking, realization, or conversational pauses.", examples: ["Aha!", "Um,", "Well,", "Hmm,"] },
      { name: "Social & Greeting Interjections", description: "Direct attention or manage polite interactions.", examples: ["Hello,", "Hey!", "Goodbye,", "Cheers!"] },
      { name: "Agreement / Dissent Interjections", description: "Convey instantaneous affirmation or rejection.", examples: ["Indeed,", "Yes,", "No,", "Certainly,"] }
    ],
    rules_summary: [
      { rule_name: "Exclamation vs. Comma", explanation: "Use exclamation marks for acute emotion; use commas for mild conversational markers.", example: "Ouch! You stepped on my foot. vs. Well, let us begin." },
      { rule_name: "Syntactic Independence", explanation: "Interjections do not function as subject, verb, or modifier in a clause.", example: "Oh, I completely forgot about the deadline." },
      { rule_name: "Formal Register Constraint", explanation: "Exclude informal emotional interjections from academic and professional discourse.", example: "Substitute 'Surprisingly,' for 'Wow!'." }
    ],
    example_sentences: [
      "Eureka! We have successfully synthesized the stable compound. (interjection of triumph)",
      "Well, if there are no further objections, let us finalize the agenda. (conversational discourse marker)",
      "Alas, the endangered species suffered severe habitat destruction this winter. (literary sorrow)",
      "Phew, that was the most rigorous examination I have ever undertaken. (relief)"
    ],
    common_mistakes: [
      "Overusing interjections in formal writing: Writing 'Wow, the data showed great growth' in an academic research paper.",
      "Improper punctuation: Writing 'Ouch you hurt me' without punctuation separating the interjection.",
      "Failing to capitalize after exclamation marks: Writing 'Oh no! we missed the train'."
    ],
    questions: [
      {
        question_id: "int-q1",
        question_text: "What punctuation mark is used after an interjection expressing acute, intense emotion?",
        question_type: "multiple_choice",
        options: ["Exclamation mark", "Comma", "Semicolon", "Colon"],
        correct_answer: "Exclamation mark",
        explanation: "Strong emotions are punctuated with an exclamation mark (e.g. 'Ouch!')."
      },
      {
        question_id: "int-q2",
        question_text: "Which literary interjection conveys sorrow, grief, or regret?",
        question_type: "multiple_choice",
        options: ["Alas", "Eureka", "Bravo", "Hooray"],
        correct_answer: "Alas",
        explanation: "'Alas' is the classical English interjection expressing grief, disappointment, or pity."
      },
      {
        question_id: "int-q3",
        question_text: "Select the correctly punctuated sentence featuring a mild introductory interjection:",
        question_type: "multiple_choice",
        options: [
          "Well, that was certainly an enlightening presentation.",
          "Well! that was certainly an enlightening presentation.",
          "Well that was certainly an enlightening presentation.",
          "Well; that was certainly an enlightening presentation."
        ],
        correct_answer: "Well, that was certainly an enlightening presentation.",
        explanation: "Mild interjections are set off with a simple comma."
      },
      {
        question_id: "int-q4",
        question_text: "Fill in the blank with an interjection expressing sudden discovery or triumph: '_____! I finally solved the equation.'",
        question_type: "fill_in_blank",
        correct_answer: "Eureka",
        explanation: "'Eureka' (from Greek for 'I have found it') expresses sudden triumphant discovery."
      },
      {
        question_id: "int-q5",
        question_text: "True or False: Interjections function as the grammatical subject of a sentence.",
        question_type: "multiple_choice",
        options: ["False", "True"],
        correct_answer: "False",
        explanation: "Interjections are syntactically independent and do not perform functional grammatical roles like subject or predicate."
      }
    ]
  },

  // =========================================================================
  // TRACK 2: TENSES & VERB CONJUGATION (MASTERING TIME & ASPECT)
  // =========================================================================
  {
    topic_id: "grammar-present-simple",
    title: "Present Simple Tense",
    category: "Tenses & Conjugation",
    track_order: 10,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Expresses habitual actions, universal scientific truths, permanent states, and fixed future timetables.",
    lesson_text: "The Present Simple tense situates events in general reality rather than right this second. It expresses repeated habits ('She meditates daily'), universal scientific laws ('Water boils at 100°C'), permanent situations ('He lives in Oslo'), and scheduled future timetables ('The flight departs at 8:00 AM'). In positive statements, third-person singular (he, she, it) mandates an '-s' or '-es' suffix. Questions and negative statements employ the auxiliary 'do' or 'does' + bare infinitive.",
    progressive_levels: {
      basic: {
        heading: "Basic: Habits, Routines & Third-Person '-s'",
        concept: "Use the Present Simple for things you do regularly or things that are always true. The most critical rule: when the subject is He, She, or It, add '-s' or '-es' to the verb (I work, but She works; They watch, but He watches).",
        key_points: [
          "Third-person singular spelling rules: add '-s' (runs), add '-es' for verbs ending in -ch, -sh, -ss, -x, -o (watches, fixes, goes), change '-y' to '-ies' after consonants (studies).",
          "Negative sentences use 'do not' (don't) or 'does not' (doesn't) + base verb (He doesn't work, NOT He doesn't works).",
          "Questions use 'Do' or 'Does' + Subject + Base verb ('Does she live here?')."
        ],
        examples: [
          "The train departs from platform 3 every thirty minutes. (routine schedule with -s)",
          "She does not eat meat because she is a vegetarian. ('does not' + base verb)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Stative Verbs & Time Clauses",
        concept: "Stative verbs (know, believe, belong, love, remember, understand) do not take continuous tenses and are almost always conjugated in the Present Simple ('I understand the lesson', NOT 'I am understanding'). Furthermore, in future time clauses introduced by when, as soon as, before, after, or until, use the Present Simple instead of 'will'.",
        rules_and_formulas: [
          "Future Time Clauses Formula: When / As soon as + Present Simple, Main Clause with 'will' ('When you arrive, I will call you').",
          "Permanent vs. Temporary: 'He lives in Chicago' (permanent = simple) vs. 'He is living in Chicago this month' (temporary = continuous).",
          "Adverbs of frequency position: Always placed before the main verb: 'She rarely drinks coffee'."
        ],
        examples: [
          "As soon as the director approves the budget, we will initiate development. (Present Simple 'approves' in time clause)",
          "This historic mansion belongs to a charitable trust. ('belong' is stative and takes simple present)"
        ]
      },
      advanced: {
        heading: "Advanced: Dramatic Present, Headlines & Performative Verbs",
        concept: "The Present Simple is employed in advanced contexts: the Dramatic Present (narrating historical events or jokes to create immediacy), newspaper headlines ('Summit Concludes in Geneva'), sports commentary ('Messi intercepts the pass and shoots!'), and performative verbs where the utterance performs the action itself ('I declare this meeting adjourned', 'I apologize', 'I resign').",
        nuances_and_exceptions: [
          "Zero Conditional: Present Simple in both condition and result clauses: 'If heat is applied to ice, it melts'.",
          "Fixed Timetables for Future: Even though the action is tomorrow, fixed schedules take Present Simple: 'The term begins on Monday'.",
          "Performative Verbs: Must be simple present, never continuous: 'I promise to assist you' (not 'I am promising')."
        ],
        examples: [
          "In Hamlet, the protagonist confronts his deepest psychological dilemmas. (literary present)",
          "I hereby appoint you as the lead investigator for the case. (performative present simple)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Habits & Routines", description: "Regular, recurring actions accompanied by frequency adverbs.", examples: ["I read for thirty minutes before sleeping.", "They commute by bicycle."] },
      { name: "Universal Truths & Scientific Laws", description: "Permanent, unchanging facts about nature and reality.", examples: ["Light travels faster than sound.", "The Earth revolves around the Sun."] },
      { name: "Stative Declarations", description: "Expression of mental states, perceptions, desires, and ownership.", examples: ["She prefers classical music.", "We understand your concerns."] },
      { name: "Scheduled Future Events", description: "Official timetables, transportation schedules, and public itineraries.", examples: ["The conference starts tomorrow at 9:00 AM.", "The flight lands at midnight."] },
      { name: "Performative Speech Acts", description: "Verbs where speaking the word executes the legal or social action.", examples: ["I apologize for the delay.", "The committee declares the vote valid."] }
    ],
    rules_summary: [
      { rule_name: "Third-Person Singular Rule", explanation: "Add -s or -es to the base verb when the subject is he, she, it, or a singular noun.", example: "She analyzes data with meticulous precision." },
      { rule_name: "Auxiliary Reversion Rule", explanation: "After does/doesn't in questions and negatives, the main verb always reverts to bare infinitive.", example: "Does he know the answer? (not 'Does he knows?')" },
      { rule_name: "Subordinate Time Clause Rule", explanation: "Never use 'will' in time clauses starting with when, as soon as, or until; use Present Simple.", example: "When the package arrives, please notify me." }
    ],
    example_sentences: [
      "The planetary research institute monitors satellite telemetry around the clock. (third-person singular -s)",
      "Sound waves do not propagate through the vacuum of outer space. (negative scientific fact)",
      "When the delegation arrives in Brussels, the treaty will be ratified. (present simple in future time clause)",
      "The international symposium convenes every year in late October. (regular recurring event)"
    ],
    common_mistakes: [
      "Omitting '-s' on third-person verbs: Saying 'He work in London' instead of 'He works in London'.",
      "Keeping '-s' with 'does/doesn't': Saying 'She doesn't understands' instead of 'She doesn't understand'.",
      "Using 'will' in time clauses: Saying 'When you will call me, I will answer' instead of 'When you call me, I will answer'."
    ],
    questions: [
      {
        question_id: "ps-q1",
        question_text: "Fill in the blank with the correct verb form: 'When the train _____ (arrive), please board immediately.'",
        question_type: "fill_in_blank",
        correct_answer: "arrives",
        explanation: "Subordinate time clauses with 'when' require Present Simple ('arrives'), not future 'will arrive'."
      },
      {
        question_id: "ps-q2",
        question_text: "Choose the grammatically correct negative question:",
        question_type: "multiple_choice",
        options: [
          "Why doesn't she attend the weekly seminars?",
          "Why doesn't she attends the weekly seminars?",
          "Why don't she attend the weekly seminars?",
          "Why not she attend the weekly seminars?"
        ],
        correct_answer: "Why doesn't she attend the weekly seminars?",
        explanation: "'She' requires 'doesn't', followed by the base infinitive verb 'attend'."
      },
      {
        question_id: "ps-q3",
        question_text: "Which of the following sentences expresses a permanent scientific truth?",
        question_type: "multiple_choice",
        options: [
          "Water boils at one hundred degrees Celsius at sea level.",
          "Water is boiling right now on the kitchen stove.",
          "Water will boil when you turn up the burner.",
          "Water was boiling when the timer chimed."
        ],
        correct_answer: "Water boils at one hundred degrees Celsius at sea level.",
        explanation: "Present Simple is the dedicated aspect for universal scientific truths."
      },
      {
        question_id: "ps-q4",
        question_text: "What is the third-person singular present form of the verb 'carry'?",
        question_type: "fill_in_blank",
        correct_answer: "carries",
        explanation: "Verbs ending in consonant + y change 'y' to 'i' and add '-es' (carry -> carries)."
      },
      {
        question_id: "ps-q5",
        question_text: "Which sentence correctly uses Present Simple for a scheduled future event?",
        question_type: "multiple_choice",
        options: [
          "The international flight departs at 6:30 tomorrow morning.",
          "The international flight is departing when it will arrive.",
          "The international flight will has departed at 6:30.",
          "The international flight depart at 6:30 tomorrow morning."
        ],
        correct_answer: "The international flight departs at 6:30 tomorrow morning.",
        explanation: "Present Simple expresses official timetables and fixed schedules even for future events."
      }
    ]
  },

  {
    topic_id: "grammar-present-continuous",
    title: "Present Continuous Tense",
    category: "Tenses & Conjugation",
    track_order: 11,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Actions currently happening now, temporary trends, annoying habits, and confirmed future arrangements.",
    lesson_text: "The Present Continuous (Progressive) tense focuses on ongoing, uncompleted action happening around the present moment. Built with the auxiliary 'be' (am, is, are) + the present participle (verb-ing), it emphasizes duration and temporariness. In addition to immediate actions ('She is speaking on the phone right now'), it conveys temporary current trends ('Electric vehicle adoption is accelerating rapidly') and confirmed personal plans in the near future ('We are flying to Tokyo next Tuesday').",
    progressive_levels: {
      basic: {
        heading: "Basic: Happening Right Now",
        concept: "Use Present Continuous when an action is in progress at the exact moment of speaking. Formula: Subject + am/is/are + verb-ing. Negative: am/is/are + not + verb-ing. Question: Am/Is/Are + Subject + verb-ing?",
        key_points: [
          "I am working; He/She/It is working; We/You/They are working.",
          "Spelling rules for -ing: add '-ing' (read -> reading); drop final silent 'e' (write -> writing); double final consonant for single-syllable consonant-vowel-consonant (run -> running, sit -> sitting).",
          "Common time signals: now, right now, at the moment, currently, today."
        ],
        examples: [
          "The software engineer is testing the new security patch right now. (action in progress)",
          "Are they discussing the quarterly marketing strategy? (question form)"
        ]
      },
      intermediate: {
        heading: "Intermediate: Temporary Situations & Near Future Arrangements",
        concept: "The Present Continuous is also used for temporary situations that are true around now, even if not happening at this precise second ('I am reading an insightful biography this week'). It also expresses confirmed, arranged future plans with other people ('We are meeting the architects tomorrow at noon').",
        rules_and_formulas: [
          "Temporary Trend: 'More professionals are working remotely these days.'",
          "Future Arrangement: Subject + be + verb-ing + future time marker ('She is defending her thesis on Thursday').",
          "Stative Exception: Stative verbs (understand, belong, own, seem) do NOT take the continuous form."
        ],
        examples: [
          "The company is testing a four-day workweek during the summer months. (temporary experiment)",
          "Dr. Patel is hosting a workshop on machine learning tomorrow morning. (confirmed future arrangement)"
        ]
      },
      advanced: {
        heading: "Advanced: Annoying Habits with 'Always' & Dual Stative/Dynamic Verbs",
        concept: "When combined with adverbs like 'always', 'constantly', or 'forever', the Present Continuous expresses an irritating, repetitive habit that exceeds reasonable expectation ('He is always interrupting me during meetings'). Furthermore, some verbs have both stative and dynamic meanings: 'think' (stative: have an opinion vs. dynamic: mental process); 'have' (stative: possess vs. dynamic: partake/experience).",
        nuances_and_exceptions: [
          "Stative vs. Dynamic 'Think': 'I think this is true' (opinion = simple) vs. 'I am thinking about moving abroad' (mental reflection = continuous).",
          "Stative vs. Dynamic 'Have': 'She has three cars' (possession = simple) vs. 'She is having lunch' (eating = continuous).",
          "Stative vs. Dynamic 'Be': 'He is stubborn' (personality trait) vs. 'He is being stubborn' (temporary abnormal behavior)."
        ],
        examples: [
          "Why is he always leaving his security pass on his desk? (annoying habit with 'always')",
          "The physician is feeling the patient's pulse to detect irregularities. (dynamic physical action of feeling)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Actions at the Moment of Speaking", description: "Real-time ongoing physical or digital actions.", examples: ["The servers are compiling the build right now.", "She is speaking with the client."] },
      { name: "Temporary Trends & Situations", description: "Activities taking place around the present timeframe, though not necessarily this exact second.", examples: ["Global temperatures are rising.", "He is staying at a hotel until his lease starts."] },
      { name: "Confirmed Future Arrangements", description: "Pre-arranged personal plans involving a specific time, place, or collaborator.", examples: ["We are flying to Vancouver on Friday.", "The committee is meeting at 2:00 PM."] },
      { name: "Repetitive Irritations with 'Always'", description: "Expresses frustration or amusement at an habitual, exaggerated behavior.", examples: ["She is constantly misplacing her keys.", "He is always interrupting colleagues."] }
    ],
    rules_summary: [
      { rule_name: "Be + Present Participle Formula", explanation: "Always pair the appropriate form of 'to be' (am/is/are) with the '-ing' participle.", example: "They are developing an enterprise dashboard." },
      { rule_name: "Stative Verb Prohibition", explanation: "Do not use continuous aspect with verbs of perception, emotion, or possession.", example: "I know the answer (never 'I am knowing')." },
      { rule_name: "CVC Consonant Doubling", explanation: "Double the final consonant before -ing when a one-syllable verb ends in consonant-vowel-consonant.", example: "swim -> swimming, plan -> planning." }
    ],
    example_sentences: [
      "The algorithmic trading model is currently executing several arbitrage trades. (action in progress)",
      "They are staying in temporary housing while their home is being renovated. (temporary situation)",
      "The keynote speaker is arriving on the morning express train. (confirmed future arrangement)",
      "He is being unusually cooperative during today's negotiation. (temporary behavior contrast with 'is being')"
    ],
    common_mistakes: [
      "Omitting the auxiliary 'be': Saying 'She working on the project' instead of 'She is working on the project'.",
      "Using with stative verbs: Saying 'I am understanding this theorem now' instead of 'I understand this theorem now'.",
      "Using for permanent facts: Saying 'The sun is setting in the west' instead of 'The sun sets in the west'."
    ],
    questions: [
      {
        question_id: "pc-q1",
        question_text: "Which sentence demonstrates the Present Continuous used for an annoying repetitive habit?",
        question_type: "multiple_choice",
        options: [
          "He is always interrupting when someone else is presenting.",
          "He is working on the project at the moment.",
          "He always arrives punctually for morning standups.",
          "He will be presenting his findings next Tuesday."
        ],
        correct_answer: "He is always interrupting when someone else is presenting.",
        explanation: "Present Continuous with 'always' conveys an irritating, repetitive behavior."
      },
      {
        question_id: "pc-q2",
        question_text: "Fill in the blank with the correct form of the verb 'have': 'She cannot take the call because she _____ (have) lunch with a partner.'",
        question_type: "fill_in_blank",
        correct_answer: "is having",
        explanation: "Here 'have' means 'eating' (dynamic action), which takes the Present Continuous 'is having'."
      },
      {
        question_id: "pc-q3",
        question_text: "Why is 'I am knowing your brother' grammatically incorrect in standard English?",
        question_type: "multiple_choice",
        options: [
          "'Know' is a stative verb of cognition and cannot take the continuous aspect.",
          "'Know' is an irregular verb that cannot take '-ing'.",
          "The auxiliary 'am' requires a past participle.",
          "The sentence lacks an adverb of frequency."
        ],
        correct_answer: "'Know' is a stative verb of cognition and cannot take the continuous aspect.",
        explanation: "'Know' represents an ongoing mental state, making continuous form ungrammatical."
      },
      {
        question_id: "pc-q4",
        question_text: "What is the correct spelling of the present participle for 'commit'?",
        question_type: "fill_in_blank",
        correct_answer: "committing",
        explanation: "Two-syllable verbs with stress on the second syllable ending in CVC double the consonant (commit -> committing)."
      },
      {
        question_id: "pc-q5",
        question_text: "Choose the sentence that expresses a confirmed future arrangement:",
        question_type: "multiple_choice",
        options: [
          "We are dining with the overseas delegates tomorrow evening.",
          "It is raining heavily outside right now.",
          "The weather is gradually warming up this season.",
          "He is always forgetting his computer password."
        ],
        correct_answer: "We are dining with the overseas delegates tomorrow evening.",
        explanation: "Using Present Continuous with a specific future time ('tomorrow evening') denotes a pre-arranged schedule."
      }
    ]
  },

  {
    topic_id: "grammar-present-perfect",
    title: "Present Perfect Tense",
    category: "Tenses & Conjugation",
    track_order: 12,
    level: "all",
    difficulty_range: "Basic to Advanced",
    quick_summary: "Bridges the past and present: life experiences, ongoing states, and past events with present impact.",
    lesson_text: "The Present Perfect tense (have/has + past participle) is the crucial grammatical bridge between the past and the present. Unlike the Past Simple, which locks an event in a completed historical moment, the Present Perfect connects a past occurrence directly to the current situation. It expresses: 1) Life experiences at an unspecified time ('I have visited Japan'); 2) Actions starting in the past that continue into the present ('She has worked here for five years'); and 3) Very recent events with direct present evidence ('I have just finished the report').",
    progressive_levels: {
      basic: {
        heading: "Basic: Have/Has + Past Participle & Experiences",
        concept: "Formula: Subject + have/has + Past Participle (V3). Use 'has' with He, She, It; use 'have' with I, You, We, They. Use this tense when the exact time doesn't matter, but the experience does.",
        key_points: [
          "Regular verbs add '-ed' (worked, finished); irregular verbs use V3 (seen, done, written, eaten).",
          "Negative: have/has not (haven't/hasn't) + past participle.",
          "Question: Have/Has + Subject + Past Participle ('Have you ever seen an eclipse?')."
        ],
        examples: [
          "She has traveled to twenty-five different countries. (life experience at unspecified times)",
          "Have you completed the security verification process? (question form)"
        ]
      },
      intermediate: {
        heading: "Intermediate: For vs. Since & Time Markers (Already, Yet, Just)",
        concept: "Use 'FOR' with a duration of time (for three years, for six hours, for a long time). Use 'SINCE' with a specific starting point in the past (since 2020, since Monday, since 8:00 AM). Place 'already' in positive sentences, 'yet' at the end of negatives and questions, and 'just' for events that concluded seconds ago.",
        rules_and_formulas: [
          "For + Period of time: 'I have known him for a decade.'",
          "Since + Point in time: 'I have known him since 2014.'",
          "Just / Already: Between auxiliary and V3 ('I have already submitted it', 'She has just arrived').",
          "Yet: End of negative/interrogative ('I haven't received it yet', 'Have you eaten yet?')."
        ],
        examples: [
          "The company has developed renewable energy software since 2018. ('since' marks starting point)",
          "We have already verified the integrity of the database backup. ('already' shows completion before expected)"
        ]
      },
      advanced: {
        heading: "Advanced: Present Perfect vs. Past Simple & 'Gone to' vs. 'Been to'",
        concept: "The golden rule of English grammar: NEVER use Present Perfect with a finished past time marker (yesterday, last year, in 2015, two hours ago). Finished time = Past Simple. Unfinished time / open period = Present Perfect. Additionally, distinguish 'has gone to' (is still there or traveling there) from 'has been to' (went and returned).",
        nuances_and_exceptions: [
          "Finished vs. Unfinished Time: 'I drank two cups of coffee this morning' (said in the afternoon = finished time) vs. 'I have drunk two cups this morning' (said at 10 AM = morning still ongoing).",
          "Gone vs. Been: 'Marcus has gone to Berlin' (he is currently in Berlin) vs. 'Marcus has been to Berlin' (he visited and came back).",
          "Superlative + Present Perfect: 'This is the most intricate algorithm I have ever designed'."
        ],
        examples: [
          "She has lived in Seoul for three years and still lives there today. (Present Perfect = continuing)",
          "She lived in Seoul for three years, but now resides in Toronto. (Past Simple = completed duration in the past)"
        ]
      }
    },
    taxonomy_types: [
      { name: "Life Experiences", description: "Events that happened at unspecified times in an individual's lifetime.", examples: ["I have read that novel.", "Have you ever managed a distributed team?"] },
      { name: "Unfinished State (Duration to Present)", description: "Situations commencing in the past and continuing unbroken into the present moment.", examples: ["He has worked at the hospital since 2016.", "We have lived here for a decade."] },
      { name: "Recent Actions with Present Consequence", description: "Past events completed moments ago whose tangible result is visible right now.", examples: ["The flight has just landed.", "I have lost my badge (so I cannot enter)."] },
      { name: "Unfinished Time Periods", description: "Events happening in time frames that have not yet concluded (today, this week, this year).", examples: ["I have answered fifty emails today.", "Our team has published two papers this year."] }
    ],
    rules_summary: [
      { rule_name: "No Finished Time Markers Rule", explanation: "Never pair Present Perfect with yesterday, last week, ago, or specific calendar years.", example: "I visited London in 2021 (Past Simple, NOT 'I have visited in 2021')." },
      { rule_name: "For vs. Since Distinction", explanation: "Use 'for' with duration spans; use 'since' with starting moments.", example: "For ten days vs. Since last Wednesday." },
      { rule_name: "Been vs. Gone Distinction", explanation: "'Been' implies a completed round trip; 'gone' implies the person is still away.", example: "She has been to Paris (she is back home)." }
    ],
    example_sentences: [
      "The biomedical laboratory has discovered an antibody that inhibits cellular degradation. (recent achievement)",
      "Dr. Vance has supervised seventy graduate theses since joining the faculty. (started past, continuing to now)",
      "They have already finalized the quarterly earnings report ahead of schedule. ('already' completion)",
      "I have seen that prominent documentary twice this month. (unfinished time period 'this month')"
    ],
    common_mistakes: [
      "Using with specific past time: Saying 'I have seen him yesterday' instead of 'I saw him yesterday'.",
      "Confusing for and since: Saying 'I have lived here since five years' instead of 'for five years'.",
      "Confusing been and gone: Saying 'He has been to the store, call him on his cell' instead of 'He has gone to the store'."
    ],
    questions: [
      {
        question_id: "pp-q1",
        question_text: "Which sentence is grammatically correct?",
        question_type: "multiple_choice",
        options: [
          "She submitted the final report yesterday afternoon.",
          "She has submitted the final report yesterday afternoon.",
          "She had submitted the final report yesterday afternoon when finished.",
          "She has been submitting the final report yesterday afternoon."
        ],
        correct_answer: "She submitted the final report yesterday afternoon.",
        explanation: "A finished time marker ('yesterday afternoon') mandates Past Simple ('submitted'), not Present Perfect."
      },
      {
        question_id: "pp-q2",
        question_text: "Fill in the blank with 'for' or 'since': 'The university has conducted medical research _____ over two centuries.'",
        question_type: "fill_in_blank",
        correct_answer: "for",
        explanation: "'Over two centuries' is a duration span, requiring 'for'."
      },
      {
        question_id: "pp-q3",
        question_text: "Choose the correct sentence to indicate that Sarah is currently in Rome right now:",
        question_type: "multiple_choice",
        options: [
          "Sarah has gone to Rome.",
          "Sarah has been to Rome.",
          "Sarah was going to Rome.",
          "Sarah had been in Rome."
        ],
        correct_answer: "Sarah has gone to Rome.",
        explanation: "'Has gone to' means the subject traveled to the destination and is still there."
      },
      {
        question_id: "pp-q4",
        question_text: "What is the past participle of the irregular verb 'undertake'?",
        question_type: "fill_in_blank",
        correct_answer: "undertaken",
        explanation: "The principal parts are: undertake, undertook, undertaken."
      },
      {
        question_id: "pp-q5",
        question_text: "Fill in the blank: 'We haven't received official confirmation from the embassy _____.'",
        question_type: "multiple_choice",
        options: ["yet", "already", "since", "just"],
        correct_answer: "yet",
        explanation: "'Yet' is positioned at the end of negative sentences and questions in Present Perfect."
      }
    ]
  },

  {
    "topic_id": "grammar-present-perfect-continuous",
    "title": "Present Perfect Continuous",
    "category": "Tenses & Conjugation",
    "track_order": 13,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Emphasizes the duration of an ongoing action starting in the past and continuing into the present, or recent activity with visible evidence.",
    "lesson_text": "The Present Perfect Continuous tense (have/has been + verb-ing) highlights the duration, continuity, or process of an activity that began in the past and either continues right now or finished seconds ago with visible physical evidence. Unlike the Present Perfect Simple, which focuses on the completed result ('I have painted the room'), the Continuous aspect focuses on the activity itself and its duration ('I have been painting the room all morning').",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Have/Has Been + '-ing' & Duration",
        "concept": "Formula: Subject + have/has been + verb-ing. Use it to answer 'How long have you been doing that?'. Use 'for' with time lengths ('for three hours') and 'since' with starting points ('since 9 AM').",
        "key_points": [
          "He/She/It has been working; I/You/We/They have been working.",
          "Shows that an action has been happening continuously up to now.",
          "Emphasizes the ongoing effort or time spent on the activity."
        ],
        "examples": [
          "She has been studying organic chemistry for four hours without a break.",
          "They have been working on the autonomous vehicle project since January."
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Present Perfect Simple vs. Continuous",
        "concept": "Present Perfect Simple answers 'How much?' or 'How many times?' and emphasizes completion (achievement). Present Perfect Continuous answers 'How long?' and emphasizes the process, regardless of whether it is finished.",
        "rules_and_formulas": [
          "Result vs. Activity: 'He has written three reports' (achievement) vs. 'He has been writing reports all day' (activity).",
          "Permanent vs. Temporary: 'He has lived in London all his life' (permanent) vs. 'He has been living with his brother temporarily' (temporary continuous).",
          "Stative Restriction: Stative verbs NEVER take continuous (Say 'I have known him for years', never 'I have been knowing him')."
        ],
        "examples": [
          "The researchers have been analyzing the data, but they haven't drawn a definitive conclusion yet.",
          "I have read 150 pages of the book (Simple: how much) vs. I have been reading all afternoon (Continuous: how long)."
        ]
      },
      "advanced": {
        "heading": "Advanced: Recent Visible Evidence & Subtle Nuances",
        "concept": "Present Perfect Continuous can describe actions that recently ceased but leave clear, undeniable physical evidence in the present moment ('The grass is wet because it has been raining; her eyes are red because she has been crying'). It can also express subtle frustration or irritation at recent activities ('Who has been using my computer without permission?').",
        "nuances_and_exceptions": [
          "Live and Work: Both simple and continuous can be used with little difference for long-term situations with for/since ('has worked' / 'has been working').",
          "No time expression: 'I have been thinking about your proposal' implies recent recurring contemplation.",
          "Interrogative irritation: 'Have you been listening to a word I said?'"
        ],
        "examples": [
          "The streets are glistening because it has been snowing heavily. (recent physical evidence)",
          "Someone has been tampering with the network configuration files. (ongoing or recent unauthorized activity)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Duration from Past to Present",
        "description": "Actions continuing unbroken over a stated span of time.",
        "examples": [
          "We have been coding since dawn.",
          "She has been teaching for fifteen years."
        ]
      },
      {
        "name": "Recent Cessation with Visible Evidence",
        "description": "Activities that stopped immediately before the present with observable signs.",
        "examples": [
          "The ground is wet; it has been raining.",
          "He is out of breath because he has been running."
        ]
      },
      {
        "name": "Repeated Habitual Actions",
        "description": "Activities repeated regularly over a recent period.",
        "examples": [
          "I have been taking guitar lessons lately.",
          "She has been visiting the clinic regularly."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Formula Harmony",
        "explanation": "Subject + have/has + been + V-ing.",
        "example": "They have been testing the prototype."
      },
      {
        "rule_name": "How Long vs. How Many",
        "explanation": "Use Continuous for 'how long'; use Simple for 'how many times/items'.",
        "example": "She has been emailing clients (how long); she has sent twelve emails (how many)."
      },
      {
        "rule_name": "Stative Exclusion",
        "explanation": "Stative verbs (like, believe, know) take Present Perfect Simple even with 'how long'.",
        "example": "I have known her for ten years (not 'have been knowing')."
      }
    ],
    "example_sentences": [
      "The engineering team has been debugging the kernel crash for eighteen consecutive hours. (duration)",
      "His hands are covered in grease because he has been repairing the generator. (recent tangible evidence)",
      "How long have you been investigating this anomaly? (interrogative duration with 'How long')",
      "They have been collaborating on quantum algorithms since the grant was awarded. (unbroken duration from past milestone)"
    ],
    "common_mistakes": [
      "Using with stative verbs: Saying 'I have been knowing him for five years' instead of 'I have known him'.",
      "Using Present Continuous instead of Perfect Continuous: Saying 'I am waiting for two hours' instead of 'I have been waiting for two hours'.",
      "Omitting 'been': Saying 'He has working all morning' instead of 'He has been working'."
    ],
    "questions": [
      {
        "question_id": "ppc-q1",
        "question_text": "Choose the correct tense to emphasize that an action started in the past and is still ongoing right now: 'We _____ (wait) in this queue for forty minutes.'",
        "question_type": "multiple_choice",
        "options": [
          "have been waiting",
          "are waiting",
          "waited",
          "were waiting"
        ],
        "correct_answer": "have been waiting",
        "explanation": "Actions that began in the past and continue into the present with a duration span ('for forty minutes') require Present Perfect Continuous."
      },
      {
        "question_id": "ppc-q2",
        "question_text": "Fill in the blank with the correct form of the verb 'rain': 'The pavement is soaked because it _____ (rain) heavily.'",
        "question_type": "fill_in_blank",
        "correct_answer": "has been raining",
        "explanation": "Recent physical evidence in the present ('pavement is soaked') calls for Present Perfect Continuous."
      },
      {
        "question_id": "ppc-q3",
        "question_text": "Which sentence correctly demonstrates the contrast between Simple and Continuous?",
        "question_type": "multiple_choice",
        "options": [
          "She has written three research proposals, and she has been writing since morning.",
          "She has been writing three research proposals, and she has written since morning.",
          "She is writing three research proposals, and she wrote since morning.",
          "She has been written three research proposals this morning."
        ],
        "correct_answer": "She has written three research proposals, and she has been writing since morning.",
        "explanation": "'How many' completed units takes Present Perfect Simple ('has written three'), while 'since when' takes Continuous ('has been writing')."
      },
      {
        "question_id": "ppc-q4",
        "question_text": "True or False: The sentence 'I have been believing in justice all my life' is standard grammatical English.",
        "question_type": "multiple_choice",
        "options": [
          "False",
          "True"
        ],
        "correct_answer": "False",
        "explanation": "'Believe' is a stative verb of mental conviction and cannot be used in continuous aspect; it should be 'I have believed'."
      },
      {
        "question_id": "ppc-q5",
        "question_text": "Fill in the blank: 'How long _____ they _____ (negotiate) the terms of the merger?'",
        "question_type": "multiple_choice",
        "options": [
          "have / been negotiating",
          "are / negotiating",
          "did / negotiate",
          "had / negotiated"
        ],
        "correct_answer": "have / been negotiating",
        "explanation": "Questions about duration continuing up to the present use 'have/has + subject + been + V-ing'."
      }
    ]
  },
  {
    "topic_id": "grammar-past-simple",
    "title": "Past Simple Tense",
    "category": "Tenses & Conjugation",
    "track_order": 14,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Completed past actions, events, and historical narratives situated at a definite, finished time in the past.",
    "lesson_text": "The Past Simple tense is the fundamental vehicle for storytelling, historical narration, and reporting completed actions at specific points in past time. Regular verbs add '-ed' (or '-d'), while hundreds of essential irregular verbs take unique past simple forms (go -> went, take -> took, buy -> bought). In questions and negative statements, the auxiliary 'did' or 'didn't' is used, and the main verb reverts to its bare base form.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Regular (-ed) & Common Irregular Verbs",
        "concept": "Use the Past Simple for actions that began and ended in the past at a specific time. Formula: Subject + Past Verb (V2). Negative: did not (didn't) + base verb. Question: Did + Subject + base verb?",
        "key_points": [
          "Regular verbs add '-ed' (work -> worked, finish -> finished).",
          "Irregular verbs must be memorized: went, ate, saw, had, spoke, bought.",
          "CRITICAL: When you use 'did' or 'didn't', the main verb MUST be in base form: 'She didn't call' (NOT 'She didn't called')."
        ],
        "examples": [
          "Alexander Graham Bell patented the telephone in 1876. (historical completed fact)",
          "Did you attend yesterday's project review meeting? (question with 'Did' + base verb)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Finished Time Markers & Sequential Narratives",
        "concept": "The Past Simple is accompanied by finished time adverbials: yesterday, last night, two years ago, in 1999, when I was young. It is also the primary tense for sequential storytelling, where events are narrated in the chronological order they took place.",
        "rules_and_formulas": [
          "Chronological Chain: 'He arrived at the office, opened his laptop, and checked his messages' (series of consecutive completed past events).",
          "Pronunciation of -ed: /t/ after voiceless sounds (worked, laughed), /d/ after voiced sounds (lived, played), /ɪd/ after 't' and 'd' (started, decided).",
          "'Used to' vs. Past Simple: 'Used to' emphasizes a discontinued past habit ('I used to live there, but now I live here')."
        ],
        "examples": [
          "The company launched its flagship product three years ago and captured market leadership. (chronological actions)",
          "When the alarm sounded, the staff evacuated the building calmly. (past time clause + past action)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Unreal Past (Subjunctive & Conditionals)",
        "concept": "The Past Simple is frequently used to refer to the hypothetical PRESENT or FUTURE (the 'Unreal Past'). This occurs after 'wish' ('I wish I knew the answer'), in Second Conditionals ('If I won the lottery...'), and after expressions like 'It's time' ('It's time we left') and 'would rather' ('I would rather you didn't smoke'). In formal English, the subjunctive 'were' replaces 'was' for all persons ('If I were you').",
        "nuances_and_exceptions": [
          "'It's time' + Past Simple: 'It's high time you took your career seriously' (refers to the urgent present, not the past).",
          "Subjunctive 'Were': 'If he were present today, he would support our motion' (hypothetical present).",
          "Polite Past Requests: 'I wondered if you had a few minutes' (softens the request, making it more polite than 'I wonder')."
        ],
        "examples": [
          "It is high time the committee addressed the underlying security vulnerabilities. (unreal past expressing urgent present necessity)",
          "I would rather we postponed the announcement until next week. (unreal past following 'would rather')"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Single Completed Events",
        "description": "Actions occurring at a specific point in finished past time.",
        "examples": [
          "We signed the agreement yesterday.",
          "The plane landed at dawn."
        ]
      },
      {
        "name": "Chronological Sequence of Events",
        "description": "Narratives listing events step by step as they happened in historical order.",
        "examples": [
          "She closed her folder, stood up, and left the room."
        ]
      },
      {
        "name": "Past Habits & States (Duration in Past)",
        "description": "Habits or states that lasted for a duration in the past but are now finished.",
        "examples": [
          "He worked at IBM for thirty years (now retired).",
          "In university, she played rugby."
        ]
      },
      {
        "name": "Hypothetical / Unreal Past",
        "description": "Past tense used to express counterfactual present wishes, advice, or conditionals.",
        "examples": [
          "If I were you, I would accept.",
          "I wish I had more free time."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Base Reversion with Did",
        "explanation": "Always use the bare infinitive after did or didn't in past questions and negations.",
        "example": "Did you go? (never 'Did you went?')."
      },
      {
        "rule_name": "Specific Time Marker Mandate",
        "explanation": "Use Past Simple whenever an exact past time is mentioned or implied.",
        "example": "She graduated in 2022."
      },
      {
        "rule_name": "Subjunctive 'Were' Preference",
        "explanation": "In formal hypothetical clauses, use 'were' for all singular subjects.",
        "example": "If she were available, she would lead the team."
      }
    ],
    "example_sentences": [
      "The spacecraft entered lunar orbit yesterday after a five-day voyage. (completed event with 'yesterday')",
      "He did not disclose the proprietary algorithms during the deposition. (negative did not + base verb)",
      "She unlocked the safe, retrieved the ledger, and examined the financial entries. (sequential past actions)",
      "It is high time the board ratified the updated governance charter. (unreal past after 'it is high time')"
    ],
    "common_mistakes": [
      "Double past marking: Saying 'I didn't saw him' instead of 'I didn't see him'.",
      "Using Present Perfect with past time markers: Saying 'I have met him yesterday' instead of 'I met him yesterday'.",
      "Confusing regular and irregular forms: Saying 'He buyed a car' instead of 'He bought a car'."
    ],
    "questions": [
      {
        "question_id": "past-q1",
        "question_text": "Choose the correct negative sentence in the Simple Past:",
        "question_type": "multiple_choice",
        "options": [
          "He didn't receive the encrypted document yesterday.",
          "He didn't received the encrypted document yesterday.",
          "He wasn't receive the encrypted document yesterday.",
          "He not received the encrypted document yesterday."
        ],
        "correct_answer": "He didn't receive the encrypted document yesterday.",
        "explanation": "'Didn't' must be followed by the base infinitive 'receive'."
      },
      {
        "question_id": "past-q2",
        "question_text": "What is the past simple of the irregular verb 'shrink'?",
        "question_type": "fill_in_blank",
        "correct_answer": "shrank",
        "explanation": "The principal parts are: shrink, shrank (past simple), shrunk (past participle)."
      },
      {
        "question_id": "past-q3",
        "question_text": "Fill in the blank with the appropriate unreal past form: 'It is high time we _____ (start) the quarterly review.'",
        "question_type": "fill_in_blank",
        "correct_answer": "started",
        "explanation": "The idiom 'It is high time...' takes the Past Simple ('started') to express urgent present necessity."
      },
      {
        "question_id": "past-q4",
        "question_text": "Which of the following irregular verbs has IDENTICAL forms across base, past simple, and past participle?",
        "question_type": "multiple_choice",
        "options": [
          "broadcast",
          "break",
          "bring",
          "bend"
        ],
        "correct_answer": "broadcast",
        "explanation": "'Broadcast' remains identical across all three forms: broadcast, broadcast, broadcast (similarly: cut, cost, hurt, shut)."
      },
      {
        "question_id": "past-q5",
        "question_text": "In formal English, which subjunctive form completes: 'If she _____ (be) in my position, she would take the risk.'",
        "question_type": "multiple_choice",
        "options": [
          "were",
          "was",
          "is",
          "would be"
        ],
        "correct_answer": "were",
        "explanation": "Standard formal English requires the subjunctive 'were' for all persons in counterfactual conditionals."
      }
    ]
  },
  {
    "topic_id": "grammar-past-continuous",
    "title": "Past Continuous Tense",
    "category": "Tenses & Conjugation",
    "track_order": 15,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Actions in progress at a specific past moment, parallel ongoing past actions, and background atmosphere in narratives.",
    "lesson_text": "The Past Continuous (Progressive) tense (was/were + verb-ing) describes actions that were in progress at a specific moment in the past. It sets the background scenery in storytelling ('The wind was howling and the rain was pounding against the glass') and frequently interacts with the Past Simple to show an ongoing action interrupted by a sudden completed event ('I was driving home when the tire burst').",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Was/Were + '-ing' & Background Actions",
        "concept": "Formula: Subject + was/were + verb-ing. Use 'was' with I, He, She, It; use 'were' with You, We, They. Use this tense to describe what someone was doing at a specific past clock time.",
        "key_points": [
          "He was studying at 8:00 PM last night.",
          "Negative: was not (wasn't) / were not (weren't) + verb-ing.",
          "Question: Was/Were + Subject + verb-ing? ('Were you sleeping when I called?')."
        ],
        "examples": [
          "At 3:00 PM yesterday, the scientists were calibrating the electron microscope.",
          "They were analyzing the survey responses all afternoon."
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Interrupted Actions (While vs. When)",
        "concept": "The most frequent use of Past Continuous is paired with Past Simple: a long background action is interrupted by a shorter action. Use 'WHILE' with the continuous action, and 'WHEN' with the interrupting simple past event.",
        "rules_and_formulas": [
          "Interruption Pattern: While + Past Continuous, Past Simple ('While I was cycling to work, I witnessed an accident').",
          "Reverse Pattern: Past Continuous + when + Past Simple ('We were conducting the test when the server crashed').",
          "Parallel Actions: While + Past Continuous, Past Continuous ('While the doctor was examining the patient, the nurse was recording vitals')."
        ],
        "examples": [
          "While the programmers were deploying the code, a database connection failure occurred. (ongoing action interrupted)",
          "She was drafting the executive summary while her colleague was compiling the balance sheets. (parallel actions)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Polite Inquiries & Narrative Scene Setting",
        "concept": "In advanced literature and storytelling, Past Continuous establishes atmosphere before the plot kicks off with Past Simple. In conversational English, it softens requests and inquiries into ultra-polite invitations ('I was wondering if you could review my draft', 'I was hoping to speak with Dr. Miller').",
        "nuances_and_exceptions": [
          "Polite Tentativeness: 'I was wondering if...' is more polite and less demanding than 'I wonder...'.",
          "Stative Restriction: Stative verbs cannot be past continuous: 'I knew the answer' (not 'I was knowing').",
          "Repeated Past Habits with 'Always': Expresses annoying habits in the past: 'He was always losing his keycard'."
        ],
        "examples": [
          "The stars were shining dimly and a gentle breeze was whispering through the pines when the traveler reached the lodge. (literary scene setting)",
          "I was hoping you might have an hour to discuss the patent filing today. (polite tentative request)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Interrupted Actions in the Past",
        "description": "Ongoing background activity interrupted by a sudden event in Simple Past.",
        "examples": [
          "I was sleeping when the alarm sounded.",
          "While she was presenting, the power failed."
        ]
      },
      {
        "name": "Parallel Past Actions",
        "description": "Two or more continuous actions happening simultaneously in the past.",
        "examples": [
          "While Marcus was cooking, Elena was reading.",
          "The orchestra was tuning while the audience was entering."
        ]
      },
      {
        "name": "Action in Progress at Specific Past Time",
        "description": "Depicting the ongoing middle of an action at a designated moment.",
        "examples": [
          "At 10:00 AM yesterday, the CEO was testifying before the committee."
        ]
      },
      {
        "name": "Narrative Atmosphere / Scene Setting",
        "description": "Establishing background sensory details in stories.",
        "examples": [
          "Snow was falling softly over the valley."
        ]
      },
      {
        "name": "Tentative Polite Inquiries",
        "description": "Softening requests to show deference and politeness.",
        "examples": [
          "I was wondering if you could look over this memo."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Was/Were Concordance",
        "explanation": "Use 'was' for singular subjects (I, he, she, it); use 'were' for you, we, they.",
        "example": "She was speaking while they were listening."
      },
      {
        "rule_name": "While vs. When Rule",
        "explanation": "Use 'while' with past continuous; use 'when' before past simple interruptions.",
        "example": "While we were eating, the phone rang."
      },
      {
        "rule_name": "Stative Prohibition",
        "explanation": "Never put stative verbs into past continuous.",
        "example": "He seemed surprised (never 'He was seeming')."
      }
    ],
    "example_sentences": [
      "The engineering team was troubleshooting the telemetry system when the satellite transmitted its signal. (interrupted action)",
      "While the forensic analyst was examining the hard drive, detectives were interviewing the key witnesses. (parallel simultaneous actions)",
      "At midday, heavy rain was lashing against the laboratory windows. (action in progress at specific time)",
      "I was wondering whether you had finalized the quarterly budget figures. (polite tentative phrasing)"
    ],
    "common_mistakes": [
      "Using continuous for both clauses during a sequence: Saying 'When he was arriving, we were starting the meeting' instead of 'When he arrived, we started the meeting'.",
      "Using with stative verbs: Saying 'I was wanting to leave' instead of 'I wanted to leave'.",
      "Confusing while and when: Saying 'When I was reading' vs. 'When the bell rang'."
    ],
    "questions": [
      {
        "question_id": "pastc-q1",
        "question_text": "Fill in the blank with the correct verb form: 'While the surgeons _____ (perform) the operation, the power backup automatically activated.'",
        "question_type": "fill_in_blank",
        "correct_answer": "were performing",
        "explanation": "Plural subject ('surgeons') in a continuous background clause introduced by 'while' requires 'were performing'."
      },
      {
        "question_id": "pastc-q2",
        "question_text": "Which sentence illustrates two PARALLEL past continuous actions occurring simultaneously?",
        "question_type": "multiple_choice",
        "options": [
          "While David was compiling the survey data, Lisa was designing the graphical charts.",
          "David compiled the survey data and then Lisa designed the graphical charts.",
          "David was compiling the survey data when Lisa designed the charts.",
          "David had compiled the survey data while Lisa designed the charts."
        ],
        "correct_answer": "While David was compiling the survey data, Lisa was designing the graphical charts.",
        "explanation": "Both actions were in continuous progress at the same time in the past."
      },
      {
        "question_id": "pastc-q3",
        "question_text": "Select the sentence with the correct polite request using the Past Continuous:",
        "question_type": "multiple_choice",
        "options": [
          "I was wondering if you might have ten minutes to review my thesis draft.",
          "I am wondering if you will have review my thesis draft.",
          "I was wondered if you might have review my thesis draft.",
          "I were wondering if you might have reviewed my thesis draft."
        ],
        "correct_answer": "I was wondering if you might have ten minutes to review my thesis draft.",
        "explanation": "'I was wondering if...' is the standard idiomatic polite request."
      },
      {
        "question_id": "pastc-q4",
        "question_text": "Choose the correct auxiliary: 'Neither the manager nor the technicians _____ working on the server yesterday.'",
        "question_type": "multiple_choice",
        "options": [
          "were",
          "was",
          "are",
          "have been"
        ],
        "correct_answer": "were",
        "explanation": "With 'neither... nor', the verb agrees with the closest subject ('technicians', plural), requiring 'were'."
      },
      {
        "question_id": "pastc-q5",
        "question_text": "Fill in the blank with the simple past of 'burst': 'While we were driving down the highway, our right front tire suddenly _____.'",
        "question_type": "fill_in_blank",
        "correct_answer": "burst",
        "explanation": "The past simple of 'burst' is identical: 'burst' (interrupted action)."
      }
    ]
  },

  {
    "topic_id": "grammar-past-perfect",
    "title": "Past Perfect & Past Perfect Continuous",
    "category": "Tenses & Conjugation",
    "track_order": 16,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "The 'past before the past': sequences past events showing which action happened first, with continuous duration forms.",
    "lesson_text": "The Past Perfect tense (had + past participle) expresses an action that was completed before another past event took place. It clarifies chronological order when events are not narrated in simple sequence: 'When we arrived at the cinema, the movie had already begun' (the movie began first, then we arrived). The Past Perfect Continuous (had been + verb-ing) emphasizes the duration of an ongoing action leading up to a specific past milestone ('She had been researching for five years before she made her breakthrough').",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: The 'Past Before the Past' (Had + V3)",
        "concept": "When speaking about the past, if you want to look further back to an earlier event, use 'had' + past participle. Formula: Subject + had + V3.",
        "key_points": [
          "Action 1 (happened first) = Past Perfect ('had left').",
          "Action 2 (happened second) = Past Simple ('arrived').",
          "Example: 'By the time I arrived, she had already left'."
        ],
        "examples": [
          "When the police arrived at the gallery, the thieves had already vanished. (thieves vanished first)",
          "She had never seen snow until she moved to Montreal. (experience before a past milestone)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Past Perfect Continuous & Time Linkers",
        "concept": "Use Past Perfect Continuous (had been + V-ing) to show that an action was ongoing up to a moment in the past, often explaining the cause of a past condition ('His eyes were tired because he had been reading for six hours'). Common linkers include: by the time, before, after, by 2010.",
        "rules_and_formulas": [
          "Duration formula: Subject + had been + V-ing + for/since + past simple clause ('They had been negotiating for weeks before reaching an accord').",
          "Before / After: 'After she had completed her doctorate, she accepted a fellowship' (clarifies sequence).",
          "No need for Past Perfect if 'before/after' makes the order 100% obvious and events are immediate, but standard in formal English."
        ],
        "examples": [
          "The engine overheated because it had been running at maximum capacity for twelve hours.",
          "By the time the paramedics reached the scene, bystanders had administered first aid."
        ]
      },
      "advanced": {
        "heading": "Advanced: Third Conditional & Negative Inversion",
        "concept": "The Past Perfect is the backbone of the Third Conditional for counterfactual past regrets ('If I had known, I would have acted differently'). In formal literature, inversion replaces 'if' by fronting 'Had': 'Had I known the risks, I would never have agreed'. Furthermore, 'Hardly... when' and 'No sooner... than' structures require inverted Past Perfect.",
        "nuances_and_exceptions": [
          "Inverted Third Conditional: 'Had they warned us, we would have evacuated' (= If they had warned us).",
          "No sooner / Hardly: 'No sooner had she entered the office than the phone rang' (auxiliary 'had' precedes subject).",
          "Unfulfilled past intentions: 'I had hoped to see you before you left, but time ran out'."
        ],
        "examples": [
          "Had the engineering team spotted the defect earlier, the recall would have been averted. (advanced conditional inversion)",
          "No sooner had the keynote finished than dozens of journalists approached the stage. (negative time inversion)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Prior Completed Action",
        "description": "An event occurring before another stated past moment or action.",
        "examples": [
          "By 2015, she had published four monographs.",
          "He had already eaten when we invited him."
        ]
      },
      {
        "name": "Continuous Duration before Past Point",
        "description": "An ongoing activity leading directly up to a past event.",
        "examples": [
          "They had been driving for eight hours before they found a motel."
        ]
      },
      {
        "name": "Cause of a Past State",
        "description": "Explains the underlying reason for a past physical or emotional condition.",
        "examples": [
          "The ground was covered in mud because it had rained all night."
        ]
      },
      {
        "name": "Unreal Counterfactual Past (Conditionals)",
        "description": "Hypothetical past conditions that never actually occurred.",
        "examples": [
          "If we had invested earlier, the returns would have doubled."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Two-Event Sequencing",
        "explanation": "Use Past Perfect for the earlier event; use Past Simple for the later event.",
        "example": "When I woke up, the sun had already risen."
      },
      {
        "rule_name": "Had Inversion Formula",
        "explanation": "In formal conditional clauses, omit 'if' and invert 'had' with the subject.",
        "example": "Had we known the parameters, we would have adjusted our calculations."
      },
      {
        "rule_name": "No Sooner ... Than Pairing",
        "explanation": "'No sooner' pairs with 'than' (never 'when'); 'Hardly/Scarcely' pairs with 'when'.",
        "example": "No sooner had he spoken than he regretted his words."
      }
    ],
    "example_sentences": [
      "The board discovered that the CFO had resigned three days before the audit commenced. (earlier action)",
      "She had been practicing neurosurgery for twenty years when she received the international distinction. (continuous duration to past point)",
      "Had we known the environmental implications, we would have decommissioned the plant sooner. (conditional inversion)",
      "Hardly had the shuttle entered the stratosphere when ground control detected a thermal anomaly. (advanced literary structure)"
    ],
    "common_mistakes": [
      "Using Past Perfect when events are in simple chronological order: Saying 'I woke up and I had brushed my teeth' instead of 'I woke up and brushed my teeth'.",
      "Using 'would have' in the if-clause: Saying 'If I would have known' instead of 'If I had known'.",
      "Pairing 'no sooner' with 'when': Saying 'No sooner had he left when it rained' instead of 'than it rained'."
    ],
    "questions": [
      {
        "question_id": "ppf-q1",
        "question_text": "Fill in the blank with the correct verb form: 'By the time the rescue team arrived, local villagers _____ (extinguish) the blaze.'",
        "question_type": "fill_in_blank",
        "correct_answer": "had extinguished",
        "explanation": "The extinguishing happened before the arrival of the rescue team, requiring the Past Perfect 'had extinguished'."
      },
      {
        "question_id": "ppf-q2",
        "question_text": "Which sentence correctly demonstrates formal conditional inversion without 'if'?",
        "question_type": "multiple_choice",
        "options": [
          "Had the architect anticipated the load constraints, the beam would not have fractured.",
          "Had the architect would anticipate the load constraints, the beam had not fractured.",
          "If had the architect anticipated the load constraints, the beam would not have fractured.",
          "The architect had anticipated the constraints, the beam would not fracture."
        ],
        "correct_answer": "Had the architect anticipated the load constraints, the beam would not have fractured.",
        "explanation": "Inverting 'Had' and the subject eliminates 'if' in formal Third Conditional structures."
      },
      {
        "question_id": "ppf-q3",
        "question_text": "Choose the correct conjunction pair: 'No sooner had the verdict been announced _____ protests erupted outside.'",
        "question_type": "multiple_choice",
        "options": [
          "than",
          "when",
          "then",
          "that"
        ],
        "correct_answer": "than",
        "explanation": "'No sooner' is strictly correlated with 'than' in standard English ('No sooner had... than...')."
      },
      {
        "question_id": "ppf-q4",
        "question_text": "Fill in the blank: 'Her fingers were stiff because she _____ (type) in the cold office for four hours.'",
        "question_type": "fill_in_blank",
        "correct_answer": "had been typing",
        "explanation": "Past Perfect Continuous expresses the duration of the past action that caused the past condition ('fingers were stiff')."
      },
      {
        "question_id": "ppf-q5",
        "question_text": "Identify the grammatical error in: 'If we would have booked earlier, we could have secured discounted airfare.'",
        "question_type": "multiple_choice",
        "options": [
          "'would have booked' should be 'had booked'",
          "'could have secured' should be 'can secure'",
          "'discounted' should be 'discounting'",
          "There is no grammatical error"
        ],
        "correct_answer": "'would have booked' should be 'had booked'",
        "explanation": "'Would have' never belongs in the conditional 'if' clause; Third Conditionals require the Past Perfect ('had booked')."
      }
    ]
  },
  {
    "topic_id": "grammar-future-forms",
    "title": "Future Forms & Tenses",
    "category": "Tenses & Conjugation",
    "track_order": 17,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Comprehensive guide to expressing future time: Will, Be Going To, Present tenses for future, Future Continuous, and Future Perfect.",
    "lesson_text": "English has no single inflected future verb ending; instead, it expresses future time through multiple nuanced structures depending on intention, evidence, and aspect. 'Will' expresses spontaneous decisions, promises, and objective predictions ('I will help you'). 'Be going to' expresses prior intentions, plans, and predictions based on present physical evidence ('Look at those dark clouds; it is going to rain'). Present Continuous conveys fixed personal arrangements ('We are meeting tomorrow'), while Present Simple expresses scheduled timetables ('The train leaves at 6 PM'). Advanced aspects include the Future Continuous (will be + V-ing) and Future Perfect (will have + V3).",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Will vs. Be Going To",
        "concept": "'Will' is for decisions made at the moment of speaking (Spontaneous: 'The phone is ringing; I'll answer it') and offers/promises ('I will send you the file'). 'Be going to' is for plans made BEFORE speaking (Premeditated: 'I am going to study medicine next year') or immediate physical evidence ('Watch out! That vase is going to fall!').",
        "key_points": [
          "Spontaneous decision = Will ('I think I will have the salmon').",
          "Pre-existing plan = Be going to ('We are going to remodel our kitchen this summer').",
          "Predictions: 'Will' is based on opinion/belief ('I think it will be sunny'); 'Be going to' is based on visible present evidence ('Look at those clouds; it's going to rain')."
        ],
        "examples": [
          "I will email you the updated NDA right now. (spontaneous decision/promise)",
          "We are going to launch the beta release in November. (prior premeditated plan)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Future Continuous & Present Tenses for Future",
        "concept": "The Future Continuous (will be + verb-ing) describes actions that will be in progress at a specific moment in the future ('This time tomorrow, I will be flying over the Atlantic'). Present Continuous expresses fixed future appointments with people ('I am having lunch with Dr. Lee on Friday'). Present Simple expresses fixed calendar timetables ('The semester ends on June 15th').",
        "rules_and_formulas": [
          "Future Continuous Formula: Subject + will be + verb-ing ('At 8 PM, we will be watching the keynote').",
          "Polite Inquiries into Plans: 'Will you be using your vehicle tonight?' (polite, asking about plans without exerting pressure).",
          "Timetable Present Simple: 'The ferry departs at 07:15 tomorrow morning'."
        ],
        "examples": [
          "Don't call between 2 and 4 PM because the committee will be conducting interviews. (action in progress in future)",
          "She is defending her doctoral dissertation on Friday morning. (confirmed personal arrangement)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Future Perfect & Future Perfect Continuous",
        "concept": "The Future Perfect (will have + past participle) looks back from a future milestone and declares that an action will already be completed before that deadline ('By next December, we will have finished the skyscraper'). The Future Perfect Continuous (will have been + verb-ing) emphasizes the duration of an ongoing action up to a future point ('By 2028, she will have been teaching here for twenty-five years').",
        "nuances_and_exceptions": [
          "Time Marker 'By': The classic trigger for Future Perfect: 'By the end of this quarter, we will have onboarded 100 enterprise clients'.",
          "Future Time Clauses: In subordinate time clauses (when, as soon as, by the time), use Present tenses, NEVER 'will': 'By the time you arrive, we will have set up the equipment'.",
          "Was/Were going to: Expresses unfulfilled past plans: 'I was going to call you, but my battery died'."
        ],
        "examples": [
          "By the conclusion of this fiscal year, the company will have doubled its research expenditures. (Future Perfect)",
          "By next June, the aerospace engineers will have been developing this propulsion module for a decade. (Future Perfect Continuous)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Will (Spontaneous & Promises)",
        "description": "Decisions made at the moment of speaking, unconditional forecasts, and promises.",
        "examples": [
          "I will carry that box for you.",
          "Scientists predict sea levels will rise."
        ]
      },
      {
        "name": "Be Going To (Intentions & Evidence)",
        "description": "Pre-existing intentions or predictions supported by tangible present signs.",
        "examples": [
          "We are going to purchase a house.",
          "Look at the dark sky; it is going to snow."
        ]
      },
      {
        "name": "Present Continuous for Future",
        "description": "Definite, arranged personal appointments involving other parties or reservations.",
        "examples": [
          "I am meeting the client at 2 PM.",
          "We are flying to Tokyo next week."
        ]
      },
      {
        "name": "Present Simple for Future Timetables",
        "description": "Public schedules, itineraries, and official timetables.",
        "examples": [
          "The flight arrives at 10:45 AM.",
          "School starts on September 1st."
        ]
      },
      {
        "name": "Future Continuous (will be + V-ing)",
        "description": "Action in progress at a specific future moment, or polite questions about plans.",
        "examples": [
          "This time next week, I will be skiing in the Alps."
        ]
      },
      {
        "name": "Future Perfect (will have + V3)",
        "description": "Action completed prior to a designated future time boundary.",
        "examples": [
          "By Friday, I will have submitted all deliverables."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "By + Time Marker = Future Perfect",
        "explanation": "Expressions starting with 'By [future point]' mandate the Future Perfect.",
        "example": "By 2030, electric vehicles will have transformed transportation."
      },
      {
        "rule_name": "No Will in Subordinate Time Clauses",
        "explanation": "Subordinate clauses starting with 'by the time', 'when', or 'as soon as' use Present Simple, not 'will'.",
        "example": "By the time he arrives, we will have eaten."
      },
      {
        "rule_name": "Evidence vs. Speculation",
        "explanation": "Use 'be going to' when physical evidence is present; use 'will' for personal hunches.",
        "example": "He is stumbling; he is going to fall."
      }
    ],
    "example_sentences": [
      "I think artificial general intelligence will fundamentally reshape human productivity. (speculative prediction with 'will')",
      "Careful! That unstable chemical compound is going to react violently. (evidence-based prediction with 'going to')",
      "By the time the diplomatic summit concludes tomorrow, delegates will have signed three bilateral treaties. (Future Perfect)",
      "At 10:00 AM on Monday, our engineering leads will be presenting the live cloud migration demo. (Future Continuous)"
    ],
    "common_mistakes": [
      "Using 'will' for prior intentions: Saying 'I will visit my grandmother this weekend' when you planned it weeks ago (should be 'I am going to visit').",
      "Using 'will' in time clauses: Saying 'By the time you will get here, I will have left' instead of 'By the time you get here'.",
      "Confusing Future Perfect and Simple: Saying 'By next year I will finish' instead of 'By next year I will have finished'."
    ],
    "questions": [
      {
        "question_id": "fut-q1",
        "question_text": "Fill in the blank with the appropriate future aspect: 'By December 2027, the consortium _____ (construct) the entire high-speed rail corridor.'",
        "question_type": "fill_in_blank",
        "correct_answer": "will have constructed",
        "explanation": "'By [future date]' signals that the action will be finished before that deadline, requiring Future Perfect."
      },
      {
        "question_id": "fut-q2",
        "question_text": "Choose the correct sentence to express an instant decision made at the moment of speaking:",
        "question_type": "multiple_choice",
        "options": [
          "The doorbell is ringing; I'll get it.",
          "The doorbell is ringing; I am going to get it.",
          "The doorbell is ringing; I get it.",
          "The doorbell is ringing; I will have gotten it."
        ],
        "correct_answer": "The doorbell is ringing; I'll get it.",
        "explanation": "Spontaneous decisions made right at the moment of speaking use 'will'."
      },
      {
        "question_id": "fut-q3",
        "question_text": "Select the sentence with a prediction based on clear, observable PRESENT physical evidence:",
        "question_type": "multiple_choice",
        "options": [
          "Look at those ominous black storm clouds; it is going to pour.",
          "I believe humanity will establish a permanent colony on Mars.",
          "Perhaps the stock market will rebound next quarter.",
          "I think our team will win the championship."
        ],
        "correct_answer": "Look at those ominous black storm clouds; it is going to pour.",
        "explanation": "'Be going to' is strictly used for predictions supported by direct sensory evidence in the present."
      },
      {
        "question_id": "fut-q4",
        "question_text": "Fill in the blank: 'Please do not call at 3:00 PM tomorrow because I _____ (conduct) an executive briefing.'",
        "question_type": "multiple_choice",
        "options": [
          "will be conducting",
          "will have conducted",
          "conduct",
          "am conducted"
        ],
        "correct_answer": "will be conducting",
        "explanation": "An action that will be in ongoing progress at a specific future clock time uses the Future Continuous."
      },
      {
        "question_id": "fut-q5",
        "question_text": "Which tense correctly completes the time clause: 'By the time she _____ (defend) her thesis next month, she will have written four papers.'",
        "question_type": "fill_in_blank",
        "correct_answer": "defends",
        "explanation": "In subordinate time clauses ('by the time...'), the Present Simple ('defends') is required instead of 'will defend'."
      }
    ]
  },
  {
    "topic_id": "grammar-sva",
    "title": "Subject-Verb Agreement",
    "category": "Sentence Structure & Voice",
    "track_order": 18,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Harmonizing subjects and verbs in person and number across complex, intervening, and inverted structures.",
    "lesson_text": "Subject-Verb Agreement is the foundational syntax rule requiring that a finite verb agree in grammatical number (singular or plural) and person with its subject. Singular subjects take singular verbs ('The scientist analyzes data'); plural subjects take plural verbs ('The scientists analyze data'). While straightforward in simple clauses, agreement becomes intricate when prepositional phrases intervene between subject and verb, with compound subjects, collective nouns, inverted clauses, and indefinite pronouns.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Singular vs. Plural Harmony",
        "concept": "Singular nouns take verbs ending in '-s' in the present tense (The dog barks). Plural nouns take verbs without '-s' (The dogs bark). The subject is the entity executing the action, not the words that happen to sit next to the verb.",
        "key_points": [
          "Singular subject -> Singular verb (has, is, was, writes).",
          "Plural subject -> Plural verb (have, are, were, write).",
          "Do not be distracted by prepositional phrases in between: 'The box [of chocolates] IS on the table' ('box' is singular, chocolates is not the subject)."
        ],
        "examples": [
          "The quality of these organic ingredients is exceptional. ('quality' is singular, not 'ingredients')",
          "Both researchers have published extensively on astrophysics. (plural subject takes 'have')"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Compound Subjects & Indefinite Pronouns",
        "concept": "Compound subjects joined by 'AND' generally take plural verbs ('Bread and butter are on the shopping list'). However, when joined by 'OR' or 'NOR', the verb agrees with the subject closest to it. Furthermore, indefinite pronouns like 'everyone', 'each', 'neither', and 'somebody' are grammatically singular.",
        "rules_and_formulas": [
          "And = Plural: 'The CEO and the CFO are attending the summit.' (Exception: unified concept like 'peanut butter and jelly is my favorite sandwich').",
          "Or / Nor Proximity Rule: 'Neither the manager nor the employees WERE informed' vs. 'Neither the employees nor the manager WAS informed'.",
          "Singular Indefinite Pronouns: Each, either, neither, everyone, somebody, nobody, anything -> ALWAYS TAKE SINGULAR VERBS ('Everyone is ready')."
        ],
        "examples": [
          "Each of the clinical trial participants receives a detailed consent waiver. ('Each' is singular)",
          "Neither the design lead nor the software developers were satisfied with the initial latency metrics. (agrees with closest 'developers')"
        ]
      },
      "advanced": {
        "heading": "Advanced: Collective Nouns, Inverted Sentences & Proportional Expressions",
        "concept": "In inverted sentences (where the verb precedes the subject, such as 'There is/are' or negative adverbial inversion), identify the true delayed subject ('There ARE three primary reasons'). With fractions and percentages ('fifty percent of the students'), the verb agrees with the noun inside the prepositional phrase ('fifty percent of the WATER IS clean' vs. 'fifty percent of the STUDENTS ARE present').",
        "nuances_and_exceptions": [
          "A number of vs. The number of: 'A number of students ARE absent' (plural meaning 'many') vs. 'The number of students IS fifty' (singular statistical figure).",
          "Inverted 'There': 'There is a book and two pens' (informal colloquial) vs. 'There are a book and two pens' (strict plural).",
          "Plural form, singular meaning: 'Physics', 'Mathematics', 'Economics', 'News' end in '-s' but are strictly singular: 'Economics is a fascinating discipline'."
        ],
        "examples": [
          "A majority of the board members have voted in favor of the international acquisition. (proportional 'majority of' plural noun)",
          "The number of endangered species has increased over the past decade. ('The number' takes singular verb)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Basic Number Harmony",
        "description": "Direct concord between singular/plural noun and finite verb.",
        "examples": [
          "The analyst calculates risk.",
          "The analysts calculate risk."
        ]
      },
      {
        "name": "Intervening Prepositional Phrases",
        "description": "Modifiers sitting between subject and verb that must be mentally ignored.",
        "examples": [
          "The bundle of confidential documents was recovered.",
          "The colors of the rainbow are vivid."
        ]
      },
      {
        "name": "Compound Subjects (And / Or / Nor)",
        "description": "Multiple subjects joined by coordinating or correlative connectors.",
        "examples": [
          "Mark and David are co-founders.",
          "Neither the coach nor the players were dismayed."
        ]
      },
      {
        "name": "Indefinite Pronoun Concord",
        "description": "Agreement with pronouns like each, everyone, and neither.",
        "examples": [
          "Everyone has submitted their proposal.",
          "Neither of the engines is functional."
        ]
      },
      {
        "name": "Proportional & Fractional Concord",
        "description": "Quantifiers whose number is determined by the object of the preposition (percent, majority, all).",
        "examples": [
          "All of the pie was eaten.",
          "All of the participants were notified."
        ]
      },
      {
        "name": "Delayed / Inverted Concord",
        "description": "Sentences where the verb appears before the subject ('There is/are', fronted adverbs).",
        "examples": [
          "Under the archway stood two stone sentinels.",
          "There are several discrepancies in the audit."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "The Intervening Phrase Ignore Rule",
        "explanation": "Strip away all prepositional phrases between the subject and verb to identify the true head noun.",
        "example": "The bouquet of roses smells sweet (not smell)."
      },
      {
        "rule_name": "Proximity Rule for Or/Nor",
        "explanation": "When subjects are linked by or/nor, match the verb to the subject closest to it.",
        "example": "Either the director or his assistants are presenting."
      },
      {
        "rule_name": "A Number of vs. The Number of",
        "explanation": "'A number of' takes plural verbs; 'The number of' takes singular verbs.",
        "example": "A number of flaws were discovered, but the number of flaws was minor."
      }
    ],
    "example_sentences": [
      "The collection of rare Mesoamerican artifacts is housed in temperature-controlled vaults. (singular 'collection')",
      "Neither the chief legal officer nor the external auditors were aware of the off-balance-sheet transaction. (plural proximity with 'auditors')",
      "The news regarding global semiconductor shortages was discussed at the executive briefing. (singular 'news')",
      "A number of researchers have replicated the superconducting experiment successfully. (plural 'a number of')"
    ],
    "common_mistakes": [
      "Agreeing with the nearest noun in a prepositional phrase: Saying 'The quality of these laptops are poor' instead of 'is poor'.",
      "Treating 'everyone' as plural: Saying 'Everyone are invited' instead of 'Everyone is invited'.",
      "Confusing 'a number of' and 'the number of': Saying 'The number of applicants are high' instead of 'is high'."
    ],
    "questions": [
      {
        "question_id": "sva-q1",
        "question_text": "Choose the correct verb: 'The list of registered patent attorneys _____ available on the public registry.'",
        "question_type": "multiple_choice",
        "options": [
          "is",
          "are",
          "were",
          "have been"
        ],
        "correct_answer": "is",
        "explanation": "The true subject is the singular noun 'list' (not the plural 'attorneys' inside the prepositional phrase), requiring singular 'is'."
      },
      {
        "question_id": "sva-q2",
        "question_text": "Fill in the blank with the correct verb: 'Neither the principal nor the teachers _____ (be) informed about the schedule change.'",
        "question_type": "fill_in_blank",
        "correct_answer": "were",
        "explanation": "With 'neither... nor', the verb agrees with the nearer subject ('teachers', plural), mandating 'were'."
      },
      {
        "question_id": "sva-q3",
        "question_text": "Which sentence features correct subject-verb agreement?",
        "question_type": "multiple_choice",
        "options": [
          "The number of applicants has exceeded expectations this year.",
          "The number of applicants have exceeded expectations this year.",
          "A number of applicants has failed the preliminary screening.",
          "Every applicant are required to submit two references."
        ],
        "correct_answer": "The number of applicants has exceeded expectations this year.",
        "explanation": "'The number of...' represents a singular metric and takes the singular verb 'has exceeded'."
      },
      {
        "question_id": "sva-q4",
        "question_text": "Fill in the blank: 'Economics _____ (be) a compulsory course for all first-year business undergraduates.'",
        "question_type": "fill_in_blank",
        "correct_answer": "is",
        "explanation": "Academic disciplines ending in '-s' (Economics, Physics, Mathematics) are singular concepts and take 'is'."
      },
      {
        "question_id": "sva-q5",
        "question_text": "Choose the correct option: 'Eighty percent of the contaminated soil _____ (was / were) successfully remediated.'",
        "question_type": "multiple_choice",
        "options": [
          "was",
          "were",
          "are",
          "have been"
        ],
        "correct_answer": "was",
        "explanation": "With percentages, the verb agrees with the noun in the of-phrase: 'soil' is uncountable, requiring singular 'was'."
      }
    ]
  },
  {
    "topic_id": "grammar-active-passive",
    "title": "Active & Passive Voice",
    "category": "Sentence Structure & Voice",
    "track_order": 19,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Transforming agent and patient across all tenses, impersonal passive constructions, and when to use passive voice.",
    "lesson_text": "Voice describes the relationship between the verb and its participants. In the Active Voice, the subject performs the action ('The government enacted the legislation'). In the Passive Voice, the subject receives the action ('The legislation was enacted by the government'). The passive is formed using the appropriate tense of 'to be' + past participle (V3). Only TRANSITIVE verbs can be made passive. Passive voice is essential in scientific, journalistic, and formal writing when the actor is unknown, obvious, irrelevant, or when we want to emphasize the result rather than the agent.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: How to Form the Passive (Be + V3)",
        "concept": "To change an active sentence into passive: 1) Move the object to the subject position; 2) Add the verb 'to be' in the same tense as the original verb; 3) Change the main verb into its Past Participle (V3); 4) (Optional) Add 'by' + original subject.",
        "key_points": [
          "Active: 'Alexander Fleming discovered penicillin in 1928.'",
          "Passive: 'Penicillin was discovered by Alexander Fleming in 1928.'",
          "The 'by' phrase is omitted if the agent is unknown, obvious, or unimportant ('My bicycle was stolen')."
        ],
        "examples": [
          "The bridge was built in 1883. (agent omitted because the structure is the focus)",
          "All incoming emails are scanned for malicious attachments. (present simple passive)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Passive Across All 12 Tenses & Modals",
        "concept": "The passive voice can be constructed across tenses by altering the auxiliary 'be': Present Continuous ('is being repaired'), Present Perfect ('has been evaluated'), Past Continuous ('was being tracked'), Future Simple ('will be launched'), and Modal Auxiliaries ('must be completed', 'can be verified').",
        "rules_and_formulas": [
          "Continuous Passive Formula: Subject + be + BEING + V3 ('The servers are being upgraded right now').",
          "Perfect Passive Formula: Subject + have/has/had + BEEN + V3 ('The contract has been signed').",
          "Modal Passive Formula: Modal + BE + V3 ('Safety goggles must be worn in the laboratory').",
          "Verbs with Two Objects: 'They gave Sarah an award' -> 'Sarah was given an award' (preferred) OR 'An award was given to Sarah'."
        ],
        "examples": [
          "The new high-speed transit line is being constructed ahead of schedule. (continuous passive)",
          "The vulnerability has already been patched by the security team. (perfect passive)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Impersonal Passive & Ergative Verbs",
        "concept": "In academic journalism and formal discourse, the Impersonal Passive reports beliefs and opinions neutrally: 'It is believed that the treaty will hold' or 'The treaty is believed to hold'. Verbs like report, claim, allege, think, and consider frequently utilize this structure. Furthermore, ergative verbs (open, drop, break, melt) can express change of state actively without an explicit agent ('The door opened').",
        "nuances_and_exceptions": [
          "Impersonal Formula 1: It + is/was + V3 (said, believed, reported) + that-clause ('It is estimated that global GDP grew by three percent').",
          "Impersonal Formula 2: Subject + is/was + V3 + to-infinitive ('The CEO is rumored to step down').",
          "Get-Passive: Informal spoken English uses 'get' instead of 'be' for sudden, accidental events ('He got promoted', 'She got caught')."
        ],
        "examples": [
          "The ancient fortress is believed to have been constructed during the third century BCE. (advanced impersonal passive with perfect infinitive)",
          "It has been reported that diplomatic talks reached an unexpected breakthrough. (impersonal passive with that-clause)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Standard Agentive Passive (with 'by')",
        "description": "Passive highlighting the receiver while keeping the actor in a by-phrase.",
        "examples": [
          "The theory of relativity was formulated by Albert Einstein."
        ]
      },
      {
        "name": "Agentless Passive",
        "description": "Passive where the doer is omitted because they are unknown, irrelevant, or confidential.",
        "examples": [
          "The confidential files were deleted.",
          "Gold is mined in South Africa."
        ]
      },
      {
        "name": "Continuous / Progressive Passive",
        "description": "Emphasizes action in progress receiving treatment.",
        "examples": [
          "The vehicle is being serviced.",
          "The building was being monitored."
        ]
      },
      {
        "name": "Modal Passive",
        "description": "Conveys obligation, ability, or possibility in passive voice.",
        "examples": [
          "The protocol must be obeyed.",
          "This error can be resolved easily."
        ]
      },
      {
        "name": "Impersonal / Reporting Passive",
        "description": "Neutral attribution of public opinions, rumors, and scientific estimates.",
        "examples": [
          "It is acknowledged that...",
          "She is thought to be the prime candidate."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Transitive Only Rule",
        "explanation": "Only transitive verbs taking direct objects can be transformed into the passive voice.",
        "example": "Intransitive verbs like 'die', 'arrive', 'sleep' have no passive form."
      },
      {
        "rule_name": "Be + V3 Concordance",
        "explanation": "Ensure the auxiliary 'be' matches the number of the new passive subject and original tense.",
        "example": "The results (plural) were analyzed (past)."
      },
      {
        "rule_name": "By vs. With Preposition",
        "explanation": "Use 'by' for the conscious agent; use 'with' for the instrument or tool.",
        "example": "The lock was picked by the burglar with a hairpin."
      }
    ],
    "example_sentences": [
      "The planetary rover was successfully deployed onto the Martian surface by ground engineers. (agentive passive)",
      "Strict data protection safeguards must be maintained at all stages of transmission. (modal passive)",
      "The legendary explorer was believed to have perished in the polar blizzard. (impersonal passive with perfect infinitive)",
      "The critical server nodes were being updated when the power outage struck. (past continuous passive)"
    ],
    "common_mistakes": [
      "Attempting to make intransitive verbs passive: Saying 'An accident was happened yesterday' instead of 'An accident happened'.",
      "Omitting 'being' in continuous passives: Saying 'The house is renovating' instead of 'The house is being renovated'.",
      "Using 'by' for instruments: Saying 'He was hit by a rock' vs. 'He was hit with a rock' (if rock was the tool used)."
    ],
    "questions": [
      {
        "question_id": "pass-q1",
        "question_text": "Convert to passive: 'The international committee has approved the revised climate accord.'",
        "question_type": "multiple_choice",
        "options": [
          "The revised climate accord has been approved by the international committee.",
          "The revised climate accord was approved by the international committee.",
          "The revised climate accord had been approved by the international committee.",
          "The revised climate accord is being approved by the international committee."
        ],
        "correct_answer": "The revised climate accord has been approved by the international committee.",
        "explanation": "Present Perfect Active ('has approved') converts to Present Perfect Passive ('has been approved')."
      },
      {
        "question_id": "pass-q2",
        "question_text": "Which of the following verbs CANNOT be converted into the passive voice because it is intransitive?",
        "question_type": "multiple_choice",
        "options": [
          "arrive",
          "construct",
          "discover",
          "examine"
        ],
        "correct_answer": "arrive",
        "explanation": "'Arrive' is an intransitive verb that cannot take a direct object and therefore has no passive form."
      },
      {
        "question_id": "pass-q3",
        "question_text": "Fill in the blank with the correct continuous passive form: 'Please be patient; the software update _____ (install) on your system.'",
        "question_type": "fill_in_blank",
        "correct_answer": "is being installed",
        "explanation": "Present Continuous Passive requires: is/are + being + V3 ('is being installed')."
      },
      {
        "question_id": "pass-q4",
        "question_text": "Transform into impersonal reporting structure: 'People believe that the artifact dates back to 500 BCE.' -> 'The artifact _____ to date back to 500 BCE.'",
        "question_type": "fill_in_blank",
        "correct_answer": "is believed",
        "explanation": "Subject + is/are believed + to-infinitive is the standard impersonal reporting transformation."
      },
      {
        "question_id": "pass-q5",
        "question_text": "Choose the correct preposition: 'The document was signed _____ the president _____ an antique fountain pen.'",
        "question_type": "multiple_choice",
        "options": [
          "by / with",
          "with / by",
          "by / by",
          "from / with"
        ],
        "correct_answer": "by / with",
        "explanation": "Use 'by' for the human agent ('the president') and 'with' for the instrument ('an antique fountain pen')."
      }
    ]
  },
  {
    "topic_id": "grammar-reported-speech",
    "title": "Direct & Indirect Speech",
    "category": "Sentence Structure & Voice",
    "track_order": 20,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Mastering reported speech, tense backshifting rules, pronoun transformations, and reported questions and orders.",
    "lesson_text": "Direct Speech quotes the exact words spoken, enclosed in quotation marks ('She said, \"I am ready\"'). Indirect (Reported) Speech relates the meaning of what someone said without exact quotation ('She said that she was ready'). When converting direct speech into reported speech with a past reporting verb ('said', 'explained', 'stated'), English applies systematic transformations: tense backshifting (present tenses shift into past tenses), pronoun shifts (matching new speaker perspectives), and adverbial adjustments of time and place ('here' -> 'there', 'tomorrow' -> 'the following day').",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Said vs. Told & Pronoun Shifts",
        "concept": "'Say' does NOT require a personal object ('She said that she was happy'). 'Tell' MUST have a personal object ('She told ME that she was happy'). When reporting, pronouns shift to reflect the reporter's point of view: 'I' becomes 'he' or 'she'; 'we' becomes 'they'.",
        "key_points": [
          "Say: 'He said (that)...' (no personal object).",
          "Tell: 'He told me / told Sarah (that)...' (requires a personal object).",
          "Quotation marks and capital letters disappear in reported speech."
        ],
        "examples": [
          "Direct: Liam said, \"I work at a software startup.\" -> Reported: Liam said that he worked at a software startup.",
          "Direct: \"I will call you later,\" Elena told Marcus. -> Reported: Elena told Marcus that she would call him later."
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Tense Backshifting & Time Adjustments",
        "concept": "When the reporting verb is in the past ('said', 'told', 'reported'), verbs shift one step back in time: Present Simple -> Past Simple; Present Continuous -> Past Continuous; Present Perfect / Past Simple -> Past Perfect; Will -> Would; Can -> Could; Must -> Had to.",
        "rules_and_formulas": [
          "Backshifting Matrix: am/is -> was; are -> were; has/have -> had; will -> would; can -> could; may -> might.",
          "Time/Place Shifts: now -> then; today -> that day; yesterday -> the day before; tomorrow -> the next/following day; here -> there; this -> that.",
          "Past Perfect & Modals: 'had done', 'would', 'could', 'should', 'might' do NOT backshift further."
        ],
        "examples": [
          "Direct: \"We have achieved our targets,\" the CEO said. -> Reported: The CEO stated that they had achieved their targets.",
          "Direct: \"I can finish this tomorrow,\" he noted. -> Reported: He noted that he could finish it the following day."
        ]
      },
      "advanced": {
        "heading": "Advanced: Reported Questions, Imperatives & Universal Truth Exceptions",
        "concept": "Reported questions do NOT use inversion or question marks; they revert to standard statement word order (Subject + Verb). Wh- questions keep the question word; Yes/No questions introduce 'if' or 'whether'. Reported commands and requests employ 'told / asked + object + to-infinitive' ('He told me to wait'). Crucially, DO NOT backshift if the statement is an eternal universal truth ('The teacher said that the Earth orbits the Sun').",
        "nuances_and_exceptions": [
          "Reported Question Word Order: 'Where do you live?' -> 'She asked me where I lived' (NOT 'where did I live').",
          "Yes/No Question Formula: Asked + if/whether + subject + verb: 'Are you ready?' -> 'He asked if I was ready'.",
          "Universal Truth Exception: 'Galileo proved that planets revolve around the Sun' (retains present tense because it is an unchanging fact).",
          "Subjunctive & Suggestions: 'He suggested that we leave' (suggest + that + subjunctive bare verb OR suggest + V-ing)."
        ],
        "examples": [
          "Direct: \"Why did you decline the offer?\" -> Reported: She asked why I had declined the offer. (statement word order)",
          "Direct: \"Please submit your credentials,\" the dean instructed. -> Reported: The dean instructed us to submit our credentials."
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Reported Statements",
        "description": "Reporting facts, declarations, and opinions with 'that' clauses and backshifted verbs.",
        "examples": [
          "He said that he was relocating to Sydney."
        ]
      },
      {
        "name": "Reported Wh- Questions",
        "description": "Reporting open questions maintaining normal Subject-Verb syntax.",
        "examples": [
          "She asked what time the seminar commenced."
        ]
      },
      {
        "name": "Reported Yes/No Questions",
        "description": "Reporting binary questions using 'if' or 'whether'.",
        "examples": [
          "They inquired whether the flight had been rescheduled."
        ]
      },
      {
        "name": "Reported Commands & Requests",
        "description": "Transforming imperatives into 'verb + object + to-infinitive'.",
        "examples": [
          "The officer ordered them to halt.",
          "She asked him to open the window."
        ]
      },
      {
        "name": "Reporting Verbs with Special Structures",
        "description": "Verbs taking gerunds or subjunctives (apologize for, suggest, deny, recommend).",
        "examples": [
          "He denied leaking the documents.",
          "She suggested taking the train."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Tense Backshift Rule",
        "explanation": "Step verb tenses back one stage into the past when introduced by a past reporting verb.",
        "example": "I am tired -> He said he was tired."
      },
      {
        "rule_name": "Reported Question Syntax",
        "explanation": "Revert from question order (auxiliary-subject) to statement order (subject-verb); drop auxiliary do/does/did.",
        "example": "Where is the station? -> He asked where the station was."
      },
      {
        "rule_name": "Say vs. Tell Rule",
        "explanation": "'Tell' requires an indirect personal object; 'say' cannot take a direct personal object without 'to'.",
        "example": "He told me the news (never 'He said me')."
      }
    ],
    "example_sentences": [
      "The lead researcher announced that the laboratory had synthesized a stable room-temperature superconductor. (Present Perfect backshifted to Past Perfect)",
      "The immigration officer inquired whether we were traveling on diplomatic passports. (reported yes/no question)",
      "She asked why the deployment team had bypassed standard security protocols. (reported wh- question with statement order)",
      "The magistrate ordered the defendant to surrender all foreign travel documents immediately. (reported imperative with to-infinitive)"
    ],
    "common_mistakes": [
      "Keeping question word order in reported questions: Saying 'She asked me where was the hotel' instead of 'where the hotel was'.",
      "Using 'said me': Saying 'She said me that she was leaving' instead of 'She told me' or 'She said to me'.",
      "Backshifting universal facts: Saying 'The teacher said that water boiled at 100°C' instead of 'boils'."
    ],
    "questions": [
      {
        "question_id": "rep-q1",
        "question_text": "Convert to reported speech: '\"I will finish the design tomorrow,\" Julian promised.'",
        "question_type": "multiple_choice",
        "options": [
          "Julian promised that he would finish the design the following day.",
          "Julian promised that he will finish the design tomorrow.",
          "Julian promised that he would finish the design tomorrow.",
          "Julian promised that he can finish the design the next day."
        ],
        "correct_answer": "Julian promised that he would finish the design the following day.",
        "explanation": "'Will' backshifts to 'would', and 'tomorrow' shifts to 'the following day' or 'the next day'."
      },
      {
        "question_id": "rep-q2",
        "question_text": "Which sentence features the CORRECT word order for a reported question?",
        "question_type": "multiple_choice",
        "options": [
          "The investigator asked where the suspect had hidden the ledger.",
          "The investigator asked where had the suspect hidden the ledger.",
          "The investigator asked where did the suspect hide the ledger.",
          "The investigator asked where the suspect hid did the ledger."
        ],
        "correct_answer": "The investigator asked where the suspect had hidden the ledger.",
        "explanation": "Reported questions take normal affirmative statement order (Subject 'the suspect' + Verb 'had hidden')."
      },
      {
        "question_id": "rep-q3",
        "question_text": "Fill in the blank with 'said' or 'told': 'The supervisor _____ the team that the inspection was postponed.'",
        "question_type": "fill_in_blank",
        "correct_answer": "told",
        "explanation": "The presence of a direct personal object ('the team') requires 'told'."
      },
      {
        "question_id": "rep-q4",
        "question_text": "How is the imperative '\"Please turn off your mobile devices,\" the flight attendant said' correctly reported?",
        "question_type": "multiple_choice",
        "options": [
          "The flight attendant asked the passengers to turn off their mobile devices.",
          "The flight attendant asked the passengers that they turn off their mobile devices.",
          "The flight attendant said the passengers to turn off their mobile devices.",
          "The flight attendant asked the passengers would they turn off their mobile devices."
        ],
        "correct_answer": "The flight attendant asked the passengers to turn off their mobile devices.",
        "explanation": "Reported requests/commands use: asked/told + object + to-infinitive."
      },
      {
        "question_id": "rep-q5",
        "question_text": "True or False: In reported speech, 'can' backshifts to 'could', and 'may' backshifts to 'might'.",
        "question_type": "multiple_choice",
        "options": [
          "True",
          "False"
        ],
        "correct_answer": "True",
        "explanation": "The standard modal backshift rules are: can -> could, may -> might, will -> would, shall -> should."
      }
    ]
  },
  {
    "topic_id": "grammar-conditionals",
    "title": "Conditionals & Hypotheticals",
    "category": "Sentence Structure & Voice",
    "track_order": 21,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Mastering Zero, First, Second, Third, and Mixed Conditionals, plus advanced inversion without 'if'.",
    "lesson_text": "Conditionals describe cause-and-effect relationships and hypothetical scenarios based on specific preconditions. English features four canonical types: Zero Conditional (scientific and universal facts: If + Present, Present), First Conditional (realistic future possibilities: If + Present, will + Base), Second Conditional (hypothetical or counterfactual present/future: If + Past Simple, would + Base), and Third Conditional (counterfactual past regrets: If + Past Perfect, would have + V3). Advanced mastery extends to Mixed Conditionals (connecting past causes with present results) and elegant formal inversion structures ('Had I known', 'Were they to agree').",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Zero (Facts) & First (Future Possibilities)",
        "concept": "Zero Conditional is for 100% universal truths: If + Present Simple, Present Simple ('If you heat water to 100°C, it boils'). First Conditional is for realistic, likely future situations: If + Present Simple, will + Base Verb ('If it rains tomorrow, we will stay indoors').",
        "key_points": [
          "Zero Conditional = Guaranteed fact (If + present, present).",
          "First Conditional = Real future condition (If + present, WILL + base).",
          "NEVER put 'will' inside the 'if' clause ('If it will rain' is incorrect; say 'If it rains')."
        ],
        "examples": [
          "If metal is subjected to intense heat, it expands. (Zero Conditional: scientific law)",
          "If the client approves the wireframes, we will initiate frontend development on Monday. (First Conditional: realistic future)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Second (Hypothetical) & Third (Past Regret)",
        "concept": "Second Conditional describes imaginary, unlikely, or counterfactual present/future scenarios: If + Past Simple, would + Base Verb ('If I had a million dollars, I would travel the globe'). In formal English, use 'were' for all persons ('If I were you'). Third Conditional reflects on past events that cannot be changed: If + Past Perfect, would have + Past Participle ('If I had studied harder, I would have passed the exam').",
        "rules_and_formulas": [
          "Second Conditional: If + Simple Past (or subjunctive were), WOULD + base verb ('If she knew the code, she would unlock the safe').",
          "Third Conditional: If + had + V3, WOULD HAVE + V3 ('If we had caught the early train, we wouldn't have missed the keynote').",
          "Never put 'would' or 'would have' inside the 'if' clause."
        ],
        "examples": [
          "If he spoke fluent German, he would apply for the position in Zurich. (Second: hypothetical present ability)",
          "If the cybersecurity team had audited the port earlier, the data breach would have been averted. (Third: past counterfactual)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Mixed Conditionals & Formal Inversion",
        "concept": "Mixed Conditionals connect different temporal dimensions: 1) Past action affecting present result: If + Past Perfect, WOULD + base verb ('If I had taken the job last year, I would live in London today'); 2) Permanent present trait affecting past result: If + Simple Past, WOULD HAVE + V3 ('If she were not so stubborn, she would have accepted their apology yesterday'). Formal inversion drops 'if' and fronts the auxiliary: 'Had I known', 'Were you to inspect', 'Should you require assistance'.",
        "nuances_and_exceptions": [
          "Mixed Type A (Past cause -> Present state): If + had + V3, would + base verb ('If he hadn't missed the flight, he would be here right now').",
          "Mixed Type B (Present trait -> Past result): If + past simple, would have + V3 ('If I spoke Mandarin, I would have translated the contract yesterday').",
          "Inversion 1st Conditional: 'Should you have any questions, please contact me' (= If you have).",
          "Inversion 2nd Conditional: 'Were we to accept the offer, risks would escalate' (= If we accepted).",
          "Inversion 3rd Conditional: 'Had they warned us, we would have prepared' (= If they had warned us)."
        ],
        "examples": [
          "If he had not invested in clean energy ten years ago, he would not be an industry titan today. (Mixed Conditional: past action to present reality)",
          "Should the board require further documentation, the executive summary will be provided. (formal inverted first conditional)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Zero Conditional (Universal Truths)",
        "description": "If + Present Simple, Present Simple. Expresses immutable scientific facts and mechanical laws.",
        "examples": [
          "If ice melts, it becomes water."
        ]
      },
      {
        "name": "First Conditional (Real Future)",
        "description": "If + Present Simple, will + Base Verb. Real, probable future outcomes contingent upon an event.",
        "examples": [
          "If we secure the grant, we will hire three postdocs."
        ]
      },
      {
        "name": "Second Conditional (Hypothetical Present)",
        "description": "If + Past Simple (were), would + Base Verb. Imaginary, improbable, or counterfactual present states.",
        "examples": [
          "If I were the CEO, I would implement remote work."
        ]
      },
      {
        "name": "Third Conditional (Unreal Past)",
        "description": "If + Past Perfect, would have + V3. Unchangeable counterfactual past actions and regrets.",
        "examples": [
          "If we had left earlier, we would have caught the flight."
        ]
      },
      {
        "name": "Mixed Conditionals",
        "description": "Blends past condition with present consequence or present trait with past outcome.",
        "examples": [
          "If I had studied medicine, I would be a doctor now."
        ]
      },
      {
        "name": "Inverted Conditionals (Without 'If')",
        "description": "Formal stylistic inversion fronting Should, Were, or Had.",
        "examples": [
          "Had I known the truth, I would have acted differently."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "The 'No Would in If' Rule",
        "explanation": "Never place 'will', 'would', or 'would have' directly inside the 'if' condition clause.",
        "example": "If I had known (never 'If I would have known')."
      },
      {
        "rule_name": "Subjunctive Were Concordance",
        "explanation": "In formal Second Conditionals, 'were' is preferred over 'was' for all singular subjects.",
        "example": "If she were available, she would attend."
      },
      {
        "rule_name": "Inversion Auxiliary Concordance",
        "explanation": "Front 'Should' for 1st conditional, 'Were' for 2nd conditional, 'Had' for 3rd conditional.",
        "example": "Should you need help... // Were I to accept... // Had they known..."
      }
    ],
    "example_sentences": [
      "If atmospheric pressure drops precipitously, a barometric storm ensues. (Zero Conditional: scientific law)",
      "If the consortium ratifies the climate accord, emissions targets will become legally binding. (First Conditional: realistic future)",
      "If Dr. Sterling were present today, he would clarify the quantum mechanical paradox. (Second Conditional with subjunctive 'were')",
      "Had the seismic sensors been calibrated accurately, the evacuation would have commenced earlier. (Inverted Third Conditional)",
      "If she had completed her residency last year, she would be practicing as an attending surgeon now. (Mixed Conditional)"
    ],
    "common_mistakes": [
      "Using 'would have' in the if-clause: Saying 'If we would have arrived sooner, we would have seen him' instead of 'If we had arrived sooner'.",
      "Using 'will' in the if-clause of first conditionals: Saying 'If it will rain, I will stay home' instead of 'If it rains'.",
      "Confusing Zero and First conditional: Saying 'If you heat water, it will boil' when expressing a permanent natural law ('it boils')."
    ],
    "questions": [
      {
        "question_id": "cond-q1",
        "question_text": "Fill in the blank with the correct verb forms: 'If the software engineers _____ (patch) the exploit yesterday, the servers _____ (not be) compromised right now.'",
        "question_type": "multiple_choice",
        "options": [
          "had patched / would not be",
          "patched / would not be",
          "had patched / would not have been",
          "would have patched / were not"
        ],
        "correct_answer": "had patched / would not be",
        "explanation": "This is a Mixed Conditional: past condition ('had patched yesterday') leading to present result ('would not be compromised right now')."
      },
      {
        "question_id": "cond-q2",
        "question_text": "Choose the correct formal inversion for 'If you should require additional legal counsel, please notify our department':",
        "question_type": "multiple_choice",
        "options": [
          "Should you require additional legal counsel, please notify our department.",
          "Were you require additional legal counsel, please notify our department.",
          "Had you required additional legal counsel, please notify our department.",
          "If should you require additional legal counsel, please notify our department."
        ],
        "correct_answer": "Should you require additional legal counsel, please notify our department.",
        "explanation": "First conditional inversion fronts 'Should' and drops 'if'."
      },
      {
        "question_id": "cond-q3",
        "question_text": "What is the correct form: 'If I _____ (be) in his position, I would renegotiate the contract terms.'",
        "question_type": "fill_in_blank",
        "correct_answer": "were",
        "explanation": "Standard formal English requires the subjunctive 'were' in hypothetical Second Conditionals."
      },
      {
        "question_id": "cond-q4",
        "question_text": "Identify the error in: 'If we would have anticipated the market volatility, we could have hedged our portfolio.'",
        "question_type": "multiple_choice",
        "options": [
          "'would have anticipated' should be 'had anticipated'",
          "'could have hedged' should be 'can hedge'",
          "'volatility' should be 'volatile'",
          "There is no grammatical error"
        ],
        "correct_answer": "'would have anticipated' should be 'had anticipated'",
        "explanation": "'Would have' cannot appear in the conditional if-clause; the Third Conditional mandates the Past Perfect ('had anticipated')."
      },
      {
        "question_id": "cond-q5",
        "question_text": "Which sentence exemplifies the Zero Conditional for universal scientific fact?",
        "question_type": "multiple_choice",
        "options": [
          "If temperature decreases below zero degrees Celsius, water freezes.",
          "If temperature decreases below zero tomorrow, water will freeze.",
          "If temperature decreased below zero, water would freeze.",
          "If temperature had decreased below zero, water would have frozen."
        ],
        "correct_answer": "If temperature decreases below zero degrees Celsius, water freezes.",
        "explanation": "Zero Conditional pairs Present Simple in both clauses to state unchanging physical facts."
      }
    ]
  },

  {
    "topic_id": "grammar-modals",
    "title": "Modals & Semi-Modals",
    "category": "Sentence Structure & Voice",
    "track_order": 22,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Expressing ability, permission, necessity, advice, deduction, and past modal counterfactuals.",
    "lesson_text": "Modal auxiliary verbs (can, could, may, might, must, shall, should, will, would) and semi-modals (have to, ought to, need to, be able to) alter the attitude, mood, or reality of a main verb. Modals do NOT take third-person '-s', have no infinitive or participle forms, and are followed directly by the bare infinitive without 'to'. They serve six primary communicative functions: Ability, Permission, Obligation/Necessity, Prohibition, Advice, and Epistemic Probability / Deduction.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Ability, Permission & Basic Obligation",
        "concept": "'Can' expresses physical/mental ability ('She can code') or casual permission ('Can I leave?'). 'May' expresses formal permission ('May I speak?'). 'Must' expresses mandatory personal necessity ('I must finish this'). 'Should' offers advice or recommendation ('You should rest').",
        "key_points": [
          "Modals never add '-s': He can, she must, it should (NEVER 'he cans').",
          "Modals are followed by the bare base verb: 'She can swim' (NEVER 'She can to swim').",
          "Negatives: cannot (can't), must not (mustn't), should not (shouldn't)."
        ],
        "examples": [
          "All visitors must sign in at the reception desk. (mandatory obligation)",
          "She can speak four European languages fluently. (present ability)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Must vs. Have To & Deduction (Must / Can't / Might)",
        "concept": "'Must' reflects the speaker's internal authority/necessity; 'Have to' reflects external rules or laws ('In the UK, drivers have to drive on the left'). In deduction, 'MUST' expresses near-certainty based on evidence ('His car is in the driveway; he must be home'), while 'CAN'T' expresses impossibility ('That can't be true'). 'MIGHT / COULD / MAY' express 50% possibility.",
        "rules_and_formulas": [
          "Deduction Scale: 95% True = Must be; 50% Possible = Might / May / Could be; 95% Impossible = Can't be (NOT mustn't be).",
          "Prohibition vs. Lack of Obligation: 'You MUST NOT' = forbidden (illegal). 'You DON'T HAVE TO' = optional (not necessary).",
          "Past of 'have to' is 'had to': 'Yesterday I had to work late' ('must' has no past tense form)."
        ],
        "examples": [
          "The lights are off and nobody answers the door; they must be out. (deduction of certainty)",
          "You don't have to wear formal attire, but you must not wear athletic sandals. (lack of obligation vs. prohibition)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Past Modals of Deduction & Counterfactuals",
        "concept": "To express deduction or counterfactual regret about past events, pair the modal with 'HAVE' + past participle (V3): 1) Past deduction: 'He must have forgotten his phone' / 'She can't have committed the crime'; 2) Unfulfilled advice / criticism: 'You should have reviewed the contract'; 3) Past possibility: 'We could have won if we had prepared better'.",
        "nuances_and_exceptions": [
          "Must have + V3: Logical certainty about past: 'The streets are wet; it must have rained overnight'.",
          "Can't have / Couldn't have + V3: Impossibility about past: 'She can't have boarded the plane; her passport is here'.",
          "Should have + V3: Past regret or unfulfilled obligation: 'We should have backed up the database'.",
          "Needn't have vs. Didn't need to: 'We needn't have rushed' (we rushed, but it was unnecessary) vs. 'We didn't need to rush' (we knew it wasn't necessary, so we took our time)."
        ],
        "examples": [
          "The forensic investigators concluded that the breach must have originated from an internal credential leak. (past logical deduction)",
          "You should have informed the legal department before signing that nondisclosure agreement. (past unfulfilled duty/criticism)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Ability & Capacity",
        "description": "Can (present), Could (past general ability), Be able to (all tenses).",
        "examples": [
          "She can analyze genomic sequences.",
          "He was able to escape."
        ]
      },
      {
        "name": "Permission & Requests",
        "description": "Can (informal), Could (polite), May (formal).",
        "examples": [
          "May I examine the evidence?",
          "Could you open the vault?"
        ]
      },
      {
        "name": "Obligation & Necessity",
        "description": "Must (internal), Have to (external rule/law), Need to.",
        "examples": [
          "We have to submit tax forms by midnight."
        ]
      },
      {
        "name": "Prohibition",
        "description": "Must not / Cannot. Strictly forbidden by rule or law.",
        "examples": [
          "Employees must not disclose classified data."
        ]
      },
      {
        "name": "Advice & Moral Expectation",
        "description": "Should, Ought to, Had better (strong warning of negative consequence).",
        "examples": [
          "You had better arrive on time, or the interview will be cancelled."
        ]
      },
      {
        "name": "Present Deduction & Probability",
        "description": "Must (certainly true), Might/Could (possibly true), Can't (impossible).",
        "examples": [
          "That must be the new CEO.",
          "It can't be five o'clock already."
        ]
      },
      {
        "name": "Past Modals of Deduction & Regret",
        "description": "Modal + have + V3. Post-facto deductions, lost opportunities, and regrets.",
        "examples": [
          "They must have arrived by now.",
          "I should have double-checked the calculations."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Bare Infinitive Mandate",
        "explanation": "Modals are followed directly by the base verb without 'to' (except ought to, have to).",
        "example": "He must leave (never 'must to leave')."
      },
      {
        "rule_name": "Negative Deduction Can't Rule",
        "explanation": "For negative certainty in deduction, always use 'can't', never 'mustn't'.",
        "example": "He can't be at work; it's Sunday."
      },
      {
        "rule_name": "Past Modal Formula",
        "explanation": "Modal + have + Past Participle (V3) evaluates past actions retrospectively.",
        "example": "She should have called us."
      }
    ],
    "example_sentences": [
      "The clinical researchers must adhere to stringent international bioethics guidelines. (mandatory obligation)",
      "The aircraft had to make an unscheduled emergency landing due to volcanic ash. (past necessity of 'have to')",
      "The archaeological team must have excavated the artifact during the late nineteenth century. (past modal deduction)",
      "We needn't have expedited the shipment because the recipient was out of the country. (unnecessary past action performed)"
    ],
    "common_mistakes": [
      "Adding 'to' after modal verbs: Saying 'I must to go' instead of 'I must go'.",
      "Using 'mustn't' for negative deduction: Saying 'He mustn't be American, his accent is French' instead of 'He can't be American'.",
      "Adding third-person '-s' to modals: Saying 'She cans speak Spanish' instead of 'She can speak Spanish'."
    ],
    "questions": [
      {
        "question_id": "mod-q1",
        "question_text": "Which modal expresses that a past action was performed, but was completely UNNECESSARY?",
        "question_type": "multiple_choice",
        "options": [
          "We needn't have booked the tickets in advance.",
          "We didn't need to book the tickets in advance.",
          "We shouldn't book the tickets in advance.",
          "We couldn't have booked the tickets in advance."
        ],
        "correct_answer": "We needn't have booked the tickets in advance.",
        "explanation": "'Needn't have + V3' means the action took place, but in retrospect was unnecessary."
      },
      {
        "question_id": "mod-q2",
        "question_text": "Select the sentence expressing strong negative deduction (logical impossibility) in the present:",
        "question_type": "multiple_choice",
        "options": [
          "He can't be forty years old; he looks twenty-five.",
          "He mustn't be forty years old; he looks twenty-five.",
          "He doesn't have to be forty years old.",
          "He might not be forty years old."
        ],
        "correct_answer": "He can't be forty years old; he looks twenty-five.",
        "explanation": "'Can't be' is the dedicated modal form expressing logical impossibility in present deduction."
      },
      {
        "question_id": "mod-q3",
        "question_text": "Fill in the blank with the appropriate past modal of regret: 'You _____ (should / listen) to the engineer's safety warning before testing the turbine.'",
        "question_type": "fill_in_blank",
        "correct_answer": "should have listened",
        "explanation": "'Should have + V3' ('should have listened') expresses criticism or regret about an unfulfilled past duty."
      },
      {
        "question_id": "mod-q4",
        "question_text": "What is the past tense form of the obligation modal 'must'?",
        "question_type": "fill_in_blank",
        "correct_answer": "had to",
        "explanation": "'Must' has no inflected past tense form; its past equivalent is 'had to' (e.g. 'Yesterday I had to work')."
      },
      {
        "question_id": "mod-q5",
        "question_text": "Choose the sentence that conveys a strict formal prohibition:",
        "question_type": "multiple_choice",
        "options": [
          "Passengers must not disembark until the aircraft comes to a complete standstill.",
          "Passengers do not have to disembark until the aircraft stops.",
          "Passengers should not disembark if they don't want to.",
          "Passengers might not disembark until the aircraft stops."
        ],
        "correct_answer": "Passengers must not disembark until the aircraft comes to a complete standstill.",
        "explanation": "'Must not' expresses mandatory, legally binding prohibition."
      }
    ]
  },
  {
    "topic_id": "grammar-gerunds-infinitives",
    "title": "Gerunds & Infinitives",
    "category": "Sentence Structure & Voice",
    "track_order": 23,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Non-finite verbals functioning as nouns or modifiers, verbs that take gerunds vs. infinitives, and verbs that change meaning.",
    "lesson_text": "Gerunds (verb-ing functioning as nouns) and Infinitives ('to' + base verb) are non-finite verbal forms that allow actions to act as subjects, direct objects, or complements in sentences. While both can follow verbs, English verbs govern whether they take a gerund ('I enjoy swimming'), an infinitive ('I hope to travel'), or either ('I love to read' / 'I love reading'). Critically, a specific group of verbs (remember, forget, stop, try, regret) undergo radical shifts in meaning depending on whether they are paired with a gerund or an infinitive.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Gerunds as Nouns & Basic Infinitives",
        "concept": "A Gerund is a verb ending in '-ing' that functions as a NOUN (e.g. 'Reading expands your vocabulary' -> 'Reading' is the subject). An Infinitive is 'to' + base verb ('She wants to learn'). Prepositions are ALWAYS followed by gerunds ('Thank you for coming').",
        "key_points": [
          "Gerund as Subject: 'Swimming is great cardiovascular exercise.'",
          "Prepositions ALWAYS require Gerunds: 'fond of painting', 'interested in studying', 'before leaving'.",
          "Common verbs followed ONLY by infinitives: want, decide, hope, plan, promise, agree, refuse."
        ],
        "examples": [
          "Investing in index funds requires long-term patience. (gerund as sentence subject)",
          "She decided to accept the tenure-track faculty position. (verb followed by to-infinitive)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Verb Categorization & Verbs Changing Meaning",
        "concept": "Mastering which verbs take gerunds vs. infinitives is essential. Verbs followed by Gerunds: enjoy, avoid, consider, suggest, admit, deny, postpone, risk. Verbs changing meaning: 'Stop doing' (quit the habit) vs. 'Stop to do' (pause an action in order to perform another); 'Remember doing' (recall past memory) vs. 'Remember to do' (don't forget a future duty).",
        "rules_and_formulas": [
          "Stop + Gerund: 'He stopped smoking' (quit). Stop + Infinitive: 'He stopped to smoke' (paused walking to have a cigarette).",
          "Remember + Gerund: 'I remember meeting him in Paris' (past memory). Remember + Infinitive: 'Remember to lock the door' (future task).",
          "Try + Gerund: 'Try restarting the router' (experiment with a method). Try + Infinitive: 'Try to reach the top shelf' (make a physical effort).",
          "Regret + Gerund: 'I regret saying that' (sorry for past action). Regret + Infinitive: 'We regret to inform you' (formal delivery of bad news)."
        ],
        "examples": [
          "She avoided answering the reporter's controversial inquiry. (avoid + gerund)",
          "He remembered to submit the grant application before the 5 PM cutoff. (remember + infinitive = fulfilled duty)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Bare Infinitives & Causative Structures",
        "concept": "Bare infinitives omit 'to'. They occur after modal auxiliaries, perception verbs (see, hear, feel, watch: 'I saw him enter'), and causative verbs (make, let, have: 'She made him apologize'). However, in the PASSIVE voice, causative 'make' requires the full infinitive ('He was made TO apologize'). Furthermore, possessive nouns with gerunds are formal: 'I appreciate your taking the time' (formal) vs. 'you taking' (informal).",
        "nuances_and_exceptions": [
          "Causative Active: Make / Let / Have + Object + BARE INFINITIVE: 'They let us leave early'.",
          "Causative Passive: Be made + TO-INFINITIVE: 'We were made to rewrite the report'.",
          "Help: Can take bare or full infinitive: 'Help me clean' or 'Help me to clean' (both standard).",
          "Formal Possessive with Gerund: 'Do you mind my opening the window?' ('my' possessive modifying gerund 'opening')."
        ],
        "examples": [
          "The executive made the engineering leads re-evaluate the deployment schedule. (causative 'made' + bare infinitive)",
          "The board appreciated her taking swift accountability for the operational defect. (formal possessive with gerund)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Gerunds as Sentence Subjects/Objects",
        "description": "Verbal nouns functioning as syntactic subjects or predicate complements.",
        "examples": [
          "Developing algorithms is intellectually demanding.",
          "His favorite pastime is sailing."
        ]
      },
      {
        "name": "Verbs Governed Exclusively by Gerunds",
        "description": "Verbs that cannot take to-infinitives (admit, avoid, consider, deny, enjoy, risk).",
        "examples": [
          "She admitted taking the documents.",
          "They avoided discussing the topic."
        ]
      },
      {
        "name": "Verbs Governed Exclusively by Infinitives",
        "description": "Verbs mandating to-infinitives (afford, agree, decide, hope, manage, refuse).",
        "examples": [
          "We cannot afford to delay the launch.",
          "He refused to cooperate."
        ]
      },
      {
        "name": "Verbs with Contrastive Meaning Shift",
        "description": "Verbs altering semantics based on non-finite verbal complement (stop, remember, forget, regret, try).",
        "examples": [
          "I forgot locking the door (memory) vs. I forgot to lock the door (omission)."
        ]
      },
      {
        "name": "Bare Infinitives (Causatives & Perception)",
        "description": "Infinitives without 'to' following make, let, hear, see, watch.",
        "examples": [
          "Let him speak.",
          "I heard the thunder roll."
        ]
      },
      {
        "name": "Prepositional Gerund Mandate",
        "description": "All prepositions must take gerunds when followed by verbal expressions.",
        "examples": [
          "Interested in learning.",
          "He succeeded by working diligently."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Preposition + Gerund Rule",
        "explanation": "Any verb following a preposition must be in the '-ing' gerund form.",
        "example": "She is skilled at solving complex proofs."
      },
      {
        "rule_name": "Meaning Shift Matrix",
        "explanation": "Gerund = past memory / experimentation; Infinitive = future obligation / intentional pause / effort.",
        "example": "Remember to call (obligation); Remember calling (memory)."
      },
      {
        "rule_name": "Active vs. Passive Causative",
        "explanation": "Use bare infinitive in active causative ('She made him leave'); use full infinitive in passive ('He was made to leave').",
        "example": "They were made to wait."
      }
    ],
    "example_sentences": [
      "Conducting longitudinal epidemiological studies requires substantial international funding. (gerund subject)",
      "The board resolved to postpone the initial public offering until market volatility subsided. (resolve + to-infinitive)",
      "The scientist stopped conducting the trial when anomalies surfaced. (stop + gerund = ceased activity)",
      "The director made the entire delegation wait in the diplomatic antechamber. (causative 'made' + bare infinitive)"
    ],
    "common_mistakes": [
      "Using an infinitive after a preposition: Saying 'I am looking forward to meet you' instead of 'I am looking forward to meeting you' ('to' is a preposition here).",
      "Using the wrong non-finite form: Saying 'She avoided to talk to him' instead of 'She avoided talking to him'.",
      "Confusing 'stop to do' and 'stop doing': Saying 'He stopped to smoke' when you mean he quit smoking cigarettes entirely."
    ],
    "questions": [
      {
        "question_id": "ger-q1",
        "question_text": "Which sentence indicates that the speaker CEASED the habit permanently?",
        "question_type": "multiple_choice",
        "options": [
          "He stopped consuming refined sugar three years ago.",
          "He stopped to consume refined sugar three years ago.",
          "He was stopping to consume sugar three years ago.",
          "He stopped for consuming refined sugar three years ago."
        ],
        "correct_answer": "He stopped consuming refined sugar three years ago.",
        "explanation": "'Stop + gerund' means to quit or terminate an activity."
      },
      {
        "question_id": "ger-q2",
        "question_text": "Fill in the blank with the correct verbal form of 'meet': 'We are genuinely looking forward to _____ (meet) the delegation.'",
        "question_type": "fill_in_blank",
        "correct_answer": "meeting",
        "explanation": "In 'look forward to', 'to' is a preposition, which grammatically mandates the gerund ('meeting')."
      },
      {
        "question_id": "ger-q3",
        "question_text": "Choose the correct causative passive structure:",
        "question_type": "multiple_choice",
        "options": [
          "The soldiers were made to surrender their weapons.",
          "The soldiers were made surrender their weapons.",
          "The soldiers were made surrendered their weapons.",
          "The soldiers made to surrender their weapons."
        ],
        "correct_answer": "The soldiers were made to surrender their weapons.",
        "explanation": "While active 'make' takes a bare infinitive, passive 'be made' requires the full to-infinitive ('were made to surrender')."
      },
      {
        "question_id": "ger-q4",
        "question_text": "Which of the following verbs is followed EXCLUSIVELY by a gerund?",
        "question_type": "multiple_choice",
        "options": [
          "avoid",
          "decide",
          "hope",
          "refuse"
        ],
        "correct_answer": "avoid",
        "explanation": "'Avoid' can only be followed by a gerund ('avoid doing', never 'avoid to do')."
      },
      {
        "question_id": "ger-q5",
        "question_text": "Fill in the blank: 'Did you remember _____ (lock) the laboratory vault before departing?'",
        "question_type": "fill_in_blank",
        "correct_answer": "to lock",
        "explanation": "'Remember + to-infinitive' refers to fulfilling a duty or obligation."
      }
    ]
  },
  {
    "topic_id": "grammar-clauses",
    "title": "Clauses & Complex Sentences",
    "category": "Syntax & Mechanics",
    "track_order": 24,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Independent vs. dependent clauses, defining and non-defining relative clauses, noun clauses, and adverbial clauses.",
    "lesson_text": "A clause is a syntactic unit containing both a subject and a predicate. Clauses are divided into Independent Clauses (which express a complete thought and can stand alone as complete sentences) and Dependent (Subordinate) Clauses (which cannot stand alone and rely on an independent clause). Dependent clauses are categorized by grammatical function into: Relative (Adjective) Clauses that modify nouns, Adverbial Clauses that modify verbs/predicates, and Noun Clauses that act as subjects or objects.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Independent vs. Dependent Clauses",
        "concept": "An independent clause has a subject and a verb and makes complete sense by itself ('The sun set'). A dependent clause starts with a subordinator (because, although, when, if) and leaves the listener waiting ('Because the sun set...'). Join them together with a comma if the dependent clause comes first.",
        "key_points": [
          "Independent clause: Can stand alone as a sentence.",
          "Dependent clause: Fragment by itself; must attach to an independent clause.",
          "Punctuation: Dependent clause first -> use a comma. Independent clause first -> usually no comma."
        ],
        "examples": [
          "Although the methodology was complex, the results were definitive. (dependent clause first with comma)",
          "The results were definitive although the methodology was complex. (independent clause first without comma)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Defining vs. Non-Defining Relative Clauses",
        "concept": "Defining (restrictive) relative clauses provide essential information that identifies which person or thing is meant; do NOT use commas, and 'that' can replace 'which'. Non-defining (non-restrictive) relative clauses provide bonus background information about an already identified noun; ALWAYS set off with commas, and NEVER use 'that'.",
        "rules_and_formulas": [
          "Defining (Essential): 'The laptop that has the cracked screen is mine.' (No commas; specifies which laptop).",
          "Non-Defining (Extra info): 'My laptop, which I bought in Tokyo, has a cracked screen.' (Surrounded by commas; 'which' required).",
          "Relative Pronoun Omission: You can omit who/which/that only when it is the OBJECT of the relative clause: 'The book [that] I read' (object -> can omit) vs. 'The author who wrote it' (subject -> cannot omit)."
        ],
        "examples": [
          "The engineers who designed the cooling system received an award. (defining: specifies which engineers)",
          "Dr. Aris, whose research revolutionized oncology, delivered the keynote. (non-defining: extra biographical info set off with commas)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Noun Clauses & Reduced Participial Clauses",
        "concept": "Noun clauses function as subjects, direct objects, or predicate nominatives within a larger sentence, introduced by that, whether, or question words ('What you just described is unprecedented'). Reduced clauses condense relative or adverbial clauses into concise participial phrases ('The man standing near the door' instead of 'The man who is standing near the door'; 'Having completed the survey, we analyzed the responses').",
        "nuances_and_exceptions": [
          "Noun Clause as Subject: 'Whatever decision the committee reaches will be binding' (the entire clause is the subject).",
          "Dangling Participle Warning: The implied subject of a reduced participial clause MUST match the subject of the main clause. Incorrect: 'Walking into the lab, the microscope fell'. Correct: 'Walking into the lab, I dropped the microscope'.",
          "Wh-ever Clauses: Wh-ever words introduce noun clauses of concession: 'Whoever submitted this report deserves commendation'."
        ],
        "examples": [
          "Whether the experiment succeeds depends upon maintaining a strict cryogenic temperature. (noun clause as subject)",
          "Having analyzed the telemetry data, the astrophysicist submitted her research paper. (reduced perfect participial clause)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Independent Clauses",
        "description": "Syntactically complete thoughts capable of standing alone as a sentence.",
        "examples": [
          "The treaty was signed in Paris."
        ]
      },
      {
        "name": "Defining (Restrictive) Relative Clauses",
        "description": "Essential clauses identifying the specific antecedent; no commas.",
        "examples": [
          "The candidate who scored highest was selected."
        ]
      },
      {
        "name": "Non-Defining (Non-Restrictive) Relative Clauses",
        "description": "Parenthetical clauses adding bonus descriptive detail; enclosed in commas.",
        "examples": [
          "Zurich, which is Switzerland's financial hub, attracts global capital."
        ]
      },
      {
        "name": "Adverbial Clauses (Time, Cause, Concession, Condition)",
        "description": "Subordinate clauses modifying when, why, how, or under what conditions an action occurs.",
        "examples": [
          "Because the deadline expired,",
          "Unless regulations change,"
        ]
      },
      {
        "name": "Noun Clauses",
        "description": "Dependent clauses functioning as subjects, objects, or predicate complements.",
        "examples": [
          "What they discovered shocked the community.",
          "I know that she is competent."
        ]
      },
      {
        "name": "Reduced Participial Clauses",
        "description": "Economical participle phrases replacing relative or adverbial clauses.",
        "examples": [
          "Having reviewed the data, we adjourned.",
          "The documents signed yesterday are valid."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Which vs. That with Commas",
        "explanation": "Use 'which' with commas for non-essential extra info; use 'that' without commas for essential identification.",
        "example": "The car, which is red, is fast. vs. The car that has the flat tire is mine."
      },
      {
        "rule_name": "Dangling Modifier Avoidance",
        "explanation": "Ensure the noun directly following an introductory participle phrase is the actual entity performing the action.",
        "example": "While reading the report, I noticed an error (not 'While reading the report, an error was noticed')."
      },
      {
        "rule_name": "Noun Clause Word Order",
        "explanation": "Noun clauses introduced by question words retain statement order (Subject + Verb), never question inversion.",
        "example": "I don't know where he went (never 'where did he go')."
      }
    ],
    "example_sentences": [
      "The neuroscientist who isolated the neurotransmitter receptor was awarded the Nobel Prize. (defining relative clause)",
      "Mount Fuji, which is an active stratovolcano, is located southwest of Tokyo. (non-defining relative clause with commas)",
      "Whether the international coalition will intervene remains uncertain. (noun clause functioning as subject)",
      "Having verified the algorithmic integrity, the software team initiated global deployment. (reduced participial clause)"
    ],
    "common_mistakes": [
      "Using 'that' in non-defining clauses: Saying 'My mother, that lives in Seattle, is visiting' instead of 'who lives in Seattle'.",
      "Dangling participles: Saying 'Driving down the road, a deer hit the car' instead of 'While I was driving down the road, a deer hit my car'.",
      "Using commas with defining clauses: Writing 'The students, who failed, must retake the test' when only some students failed."
    ],
    "questions": [
      {
        "question_id": "cl-q1",
        "question_text": "Choose the correctly punctuated sentence featuring a non-defining relative clause:",
        "question_type": "multiple_choice",
        "options": [
          "The Louvre, which houses the Mona Lisa, attracts millions of visitors annually.",
          "The Louvre that houses the Mona Lisa attracts millions of visitors annually.",
          "The Louvre which houses the Mona Lisa attracts millions of visitors annually.",
          "The Louvre, that houses the Mona Lisa, attracts millions of visitors annually."
        ],
        "correct_answer": "The Louvre, which houses the Mona Lisa, attracts millions of visitors annually.",
        "explanation": "Non-defining relative clauses provide extra information about a unique proper noun, requiring commas and 'which' (never 'that')."
      },
      {
        "question_id": "cl-q2",
        "question_text": "Identify the sentence that contains a dangling participial modifier error:",
        "question_type": "multiple_choice",
        "options": [
          "Walking into the conference hall, the fire alarm suddenly sounded.",
          "Walking into the conference hall, the delegate heard the fire alarm sound.",
          "While the delegate was walking into the conference hall, the fire alarm sounded.",
          "The delegate heard the fire alarm sound while walking into the conference hall."
        ],
        "correct_answer": "Walking into the conference hall, the fire alarm suddenly sounded.",
        "explanation": "The fire alarm cannot 'walk into the hall'; the introductory modifier dangles because its implied subject doesn't match the main subject."
      },
      {
        "question_id": "cl-q3",
        "question_text": "In the sentence 'What the committee decided yesterday surprised the shareholders', what syntactic role does 'What the committee decided yesterday' perform?",
        "question_type": "multiple_choice",
        "options": [
          "Subject of the sentence",
          "Direct object of surprised",
          "Adverbial modifier",
          "Relative adjective clause"
        ],
        "correct_answer": "Subject of the sentence",
        "explanation": "The entire noun clause functions as the grammatical subject of the main verb 'surprised'."
      },
      {
        "question_id": "cl-q4",
        "question_text": "In which of the following sentences can the relative pronoun be safely OMITTED because it functions as an object?",
        "question_type": "multiple_choice",
        "options": [
          "The software that the engineer developed resolved the latency bottleneck.",
          "The engineer who developed the software received a promotion.",
          "The laboratory which contains the electron microscope is locked.",
          "The candidate who won the election gave a victory speech."
        ],
        "correct_answer": "The software that the engineer developed resolved the latency bottleneck.",
        "explanation": "In 'The software [that] the engineer developed', 'that' is the object of 'developed', so it can be omitted ('The software the engineer developed')."
      },
      {
        "question_id": "cl-q5",
        "question_text": "True or False: Dependent clauses can stand alone as complete grammatical sentences if capitalized.",
        "question_type": "multiple_choice",
        "options": [
          "False",
          "True"
        ],
        "correct_answer": "False",
        "explanation": "A dependent clause left by itself is an incomplete sentence fragment."
      }
    ]
  },
  {
    "topic_id": "grammar-question-tags-inversion",
    "title": "Question Tags & Inversion",
    "category": "Syntax & Mechanics",
    "track_order": 25,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Tag questions for confirmation, polite indirect inquiries, and stylistic negative inversion for rhetorical power.",
    "lesson_text": "Question tags and inversion are two sophisticated structural devices in English syntax. Question tags are mini-questions appended to the end of statements to solicit confirmation or agreement ('You're an engineer, aren't you?'). The golden rule of question tags is polarity reversal: affirmative statements take negative tags, and negative statements take affirmative tags. Inversion reverses the standard subject-auxiliary word order, either for polite indirect questions ('Could you tell me where...') or for rhetorical emphasis following negative and restrictive adverbial fronting ('Never have I witnessed...').",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Opposites Attract (Positive/Negative Tags)",
        "concept": "Formula: Statement + COMMA + Auxiliary Verb + Subject Pronoun + '?'. If the statement is positive, the tag is negative. If the statement is negative, the tag is positive. The tag matches the auxiliary verb of the statement (or uses do/does/did if no auxiliary exists).",
        "key_points": [
          "Positive statement -> Negative tag: 'She is working, isn't she?'",
          "Negative statement -> Positive tag: 'They haven't arrived, have they?'",
          "No auxiliary in statement -> use do/does/did: 'You speak French, don't you?' / 'He visited, didn't he?'."
        ],
        "examples": [
          "The contract is legally binding, isn't it? (positive statement -> negative tag)",
          "You didn't download the unauthorized software, did you? (negative statement -> positive tag)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Tag Exceptions & Polite Indirect Questions",
        "concept": "Key tag exceptions: 1) 'I am' takes 'aren't I?'; 2) Imperatives take 'will you?' ('Close the door, will you?'); 3) 'Let's' takes 'shall we?'; 4) Negative words like 'never', 'rarely', 'hardly' make the statement negative, requiring a positive tag ('He never complains, does he?'). Furthermore, Indirect Questions embed inquiries politely into introductory stems ('Could you tell me where the station is?').",
        "rules_and_formulas": [
          "Tag Exceptions: 'I am right, aren't I?' // 'Let's begin, shall we?' // 'Nobody called, did they?'.",
          "Indirect Question Stems: 'Do you know...', 'Could you tell me...', 'I wonder if...'.",
          "Indirect Question Order: Introductory stem + question word + SUBJECT + VERB (No question inversion: 'Do you know what time it is?', NOT 'what time is it')."
        ],
        "examples": [
          "I am included in the symposium agenda, aren't I? (special tag for 'I am')",
          "Could you tell me where the conference hall is located? (indirect question retaining statement order)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Rhetorical Negative & Restrictive Inversion",
        "concept": "Stylistic Inversion occurs when negative or restrictive adverbs are placed at the beginning of a sentence for formal dramatic emphasis. The subject and auxiliary verb invert, exactly mimicking a question pattern. Key triggers: Never, Rarely, Seldom, Scarcely, Hardly, Little, Not only, Under no circumstances, On no account, Only after, Only when.",
        "nuances_and_exceptions": [
          "Inversion Trigger Formula: Negative Adverbial + Auxiliary Verb + Subject + Main Verb: 'Never had she felt so inspired'.",
          "'Under no circumstances': 'Under no circumstances should you disclose the encryption keys'.",
          "'Little did they know': Expresses complete unawareness: 'Little did they know that the system was compromised'.",
          "'Only after / Only when': The inversion occurs in the MAIN clause, not the 'only' clause: 'Only after the audit was complete did they discover the fraud'."
        ],
        "examples": [
          "Under no circumstances should classified credentials be transmitted over unencrypted networks. (advanced formal inversion)",
          "Only when the treaty was officially ratified did foreign direct investment rebound. (inversion in main clause after 'Only when')"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Standard Polarity Question Tags",
        "description": "Affirmative statements with negative tags and negative statements with affirmative tags.",
        "examples": [
          "You have the keys, haven't you?",
          "He isn't coming, is he?"
        ]
      },
      {
        "name": "Irregular & Idiomatic Question Tags",
        "description": "Specialized tags for 'I am' (aren't I), 'Let's' (shall we), and imperatives (will you).",
        "examples": [
          "I am doing well, aren't I?",
          "Let's review the figures, shall we?"
        ]
      },
      {
        "name": "Indirect Embedded Questions",
        "description": "Polite inquiries embedding questions with standard Subject-Verb syntax.",
        "examples": [
          "Could you clarify what this metric indicates?"
        ]
      },
      {
        "name": "Negative Adverbial Inversion",
        "description": "Fronted negative adverbs requiring subject-auxiliary inversion (Never, Seldom, Rarely).",
        "examples": [
          "Seldom have we witnessed such astronomical growth."
        ]
      },
      {
        "name": "Conditional Restrictive Inversion",
        "description": "Inversion triggered by phrases like 'On no account', 'In no way', 'Only after'.",
        "examples": [
          "On no account may visitors enter the cleanroom."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Polarity Reversal Rule",
        "explanation": "Positive statements require negative tags; negative statements require positive tags.",
        "example": "She works here, doesn't she? // She doesn't work here, does she?"
      },
      {
        "rule_name": "Indirect Question Statement Order",
        "explanation": "Embedded indirect questions must follow Subject + Verb word order, never question inversion.",
        "example": "Could you tell me where the exit is? (not 'where is the exit')."
      },
      {
        "rule_name": "Fronted Negative Auxiliary Inversion",
        "explanation": "Fronting a negative adverbial forces the auxiliary verb to precede the subject.",
        "example": "Rarely does an opportunity arise so unexpectedly."
      }
    ],
    "example_sentences": [
      "The chief executive delivered an inspiring keynote, didn't she? (standard polarity tag)",
      "She rarely participates in informal department gatherings, does she? ('rarely' creates a negative statement requiring positive tag)",
      "Could you please explain how the neural network generates predictive analytics? (polite indirect question)",
      "Under no circumstances will the administration compromise on academic integrity standards. (advanced negative inversion)"
    ],
    "common_mistakes": [
      "Using question order in indirect questions: Saying 'Do you know where is the museum?' instead of 'Do you know where the museum is?'.",
      "Using 'am I not' incorrectly or saying 'amn't I': The standard contraction is 'aren't I?'.",
      "Failing to invert after negative adverbs: Saying 'Never I have seen such dedication' instead of 'Never have I seen'."
    ],
    "questions": [
      {
        "question_id": "qti-q1",
        "question_text": "Fill in the correct question tag: 'I am authorized to access these confidential archives, _____?'",
        "question_type": "multiple_choice",
        "options": [
          "aren't I",
          "am I not",
          "amn't I",
          "isn't it"
        ],
        "correct_answer": "aren't I",
        "explanation": "The standard English tag question for 'I am' is 'aren't I?'."
      },
      {
        "question_id": "qti-q2",
        "question_text": "Select the sentence with the CORRECT word order for an indirect question:",
        "question_type": "multiple_choice",
        "options": [
          "Could you inform me when the international symposium commences?",
          "Could you inform me when does the international symposium commence?",
          "Could you inform me when commences the international symposium?",
          "Could you inform me does when the international symposium commence?"
        ],
        "correct_answer": "Could you inform me when the international symposium commences?",
        "explanation": "Indirect questions drop the auxiliary 'does' and retain standard affirmative Subject-Verb order ('symposium commences')."
      },
      {
        "question_id": "qti-q3",
        "question_text": "Fill in the blank with the correct tag: 'He rarely attends the optional morning standup, _____ he?'",
        "question_type": "fill_in_blank",
        "correct_answer": "does",
        "explanation": "'Rarely' has a negative semantic meaning, so the statement is grammatically negative and requires the positive tag 'does he?'."
      },
      {
        "question_id": "qti-q4",
        "question_text": "Choose the correct inverted sentence:",
        "question_type": "multiple_choice",
        "options": [
          "Seldom have scientists observed such rapid glacier retreat.",
          "Seldom scientists have observed such rapid glacier retreat.",
          "Seldom observed have scientists such rapid glacier retreat.",
          "Seldom scientists observed have such rapid glacier retreat."
        ],
        "correct_answer": "Seldom have scientists observed such rapid glacier retreat.",
        "explanation": "Fronting 'Seldom' requires the auxiliary 'have' to precede the subject 'scientists'."
      },
      {
        "question_id": "qti-q5",
        "question_text": "What is the standard question tag for invitations beginning with 'Let's': 'Let's finalize the agenda, _____?'",
        "question_type": "fill_in_blank",
        "correct_answer": "shall we",
        "explanation": "Suggestions starting with 'Let's' universally take the question tag 'shall we?'."
      }
    ]
  },
  {
    "topic_id": "grammar-sentence-types",
    "title": "Sentence Types & Structure",
    "category": "Syntax & Mechanics",
    "track_order": 26,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "Architectural mastery: Simple, Compound, Complex, and Compound-Complex sentences; Declarative, Imperative, and Exclamatory moods.",
    "lesson_text": "Sentence structure is the architecture of thought in written communication. Based on their internal clause composition, English sentences are classified into four architectural types: Simple Sentences (one independent clause), Compound Sentences (two or more independent clauses joined by coordinating conjunctions or semicolons), Complex Sentences (one independent clause plus one or more dependent clauses), and Compound-Complex Sentences (two or more independent clauses plus at least one dependent clause). Functionally, sentences also divide into Declarative (statements), Interrogative (questions), Imperative (commands/requests), and Exclamatory (outbursts).",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Simple vs. Compound Sentences",
        "concept": "A Simple Sentence consists of one independent clause with a subject and predicate ('The train arrived on time'). A Compound Sentence joins two independent clauses using a comma and a FANBOYS coordinating conjunction (For, And, Nor, But, Or, Yet, So) or a semicolon.",
        "key_points": [
          "Simple: One complete thought (Subject + Verb).",
          "Compound: Independent Clause + COMMA + FANBOYS + Independent Clause.",
          "Alternative Compound: Independent Clause + SEMICOLON + Independent Clause ('I arrived early; the office was empty')."
        ],
        "examples": [
          "The robotic rover navigated the Martian crater with precision. (Simple sentence: one independent clause)",
          "The laboratory conducted the trial, and the analysts recorded the telemetry. (Compound sentence with 'and')"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Complex Sentences & Clause Transitions",
        "concept": "A Complex Sentence contains one independent clause and at least one dependent clause introduced by a subordinating conjunction (because, although, since, while, if). If the dependent clause comes first, use a comma; if the independent clause comes first, omit the comma.",
        "rules_and_formulas": [
          "Complex Formula: Subordinate Clause + COMMA + Independent Clause ('Although the data was preliminary, the implications were vast').",
          "Inverted Complex: Independent Clause + Subordinate Clause (NO COMMA: 'The implications were vast although the data was preliminary').",
          "Run-on Sentences & Comma Splices: Never fuse two independent clauses without a conjunction or semicolon."
        ],
        "examples": [
          "Because the chemical compound was unstable, the chemists stored it in cryogenic refrigeration. (Complex sentence)",
          "We will launch the service next Tuesday unless security audits reveal critical vulnerabilities. (Complex sentence)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Compound-Complex Sentences & Rhetorical Cadence",
        "concept": "Compound-Complex sentences represent the highest echelon of syntactic sophistication, uniting two or more independent clauses with one or more dependent clauses. Skilled writers alternate between short simple sentences for punchy emphasis and compound-complex sentences for nuanced, multi-dimensional argumentation.",
        "nuances_and_exceptions": [
          "Compound-Complex Formula: [Independent Clause 1] + coordinating conjunction + [Independent Clause 2] + [Dependent Clause] ('The director resigned, and the stock plummeted because investors feared insolvency').",
          "Loose vs. Periodic Sentences: Loose sentences place the main point first ('We reached our goal despite obstacles'); Periodic sentences withhold the main clause until the end for dramatic impact ('Despite severe budget cuts and logistical hurdles, we reached our goal').",
          "Sentence Synthesis: Combining multiple simple sentences into a single elegant structure using appositives, relative clauses, or participles."
        ],
        "examples": [
          "Although market volatility created apprehension, the venture partners finalized the term sheet, and the startup secured fifteen million dollars in growth capital. (Compound-Complex sentence)",
          "Overcoming unprecedented engineering hurdles, the subterranean drill penetrated the granite bedrock, and the tunnel was completed ahead of schedule. (Synthesized compound-complex structure)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Simple Sentences",
        "description": "Contains a single independent clause with a subject and finite verb.",
        "examples": [
          "The astrophysicist discovered a novel exoplanet."
        ]
      },
      {
        "name": "Compound Sentences",
        "description": "Contains two or more independent clauses joined by coordinating conjunctions or semicolons.",
        "examples": [
          "The budget was approved, but implementation was postponed."
        ]
      },
      {
        "name": "Complex Sentences",
        "description": "Contains one independent clause and one or more dependent clauses.",
        "examples": [
          "While the team was testing the engine, the pressure gauge malfunctioned."
        ]
      },
      {
        "name": "Compound-Complex Sentences",
        "description": "Contains at least two independent clauses and at least one dependent clause.",
        "examples": [
          "Because the deadline was imminent, we worked through the night, and our manager submitted the proposal."
        ]
      },
      {
        "name": "Functional Mood Classification",
        "description": "Declarative (statement), Interrogative (question), Imperative (command), Exclamatory (exclamation).",
        "examples": [
          "Declarative: The meeting is at three. Imperative: Please be seated."
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Avoiding Comma Splices",
        "explanation": "Never connect two independent clauses with only a comma; use a semicolon or a comma + FANBOYS.",
        "example": "The alarm sounded, so we evacuated (not 'The alarm sounded, we evacuated')."
      },
      {
        "rule_name": "Introductory Clause Comma",
        "explanation": "Always place a comma after an introductory dependent clause preceding the main clause.",
        "example": "When the trial ended, jurors deliberated."
      },
      {
        "rule_name": "Compound-Complex Balance",
        "explanation": "Ensure each independent clause maintains complete syntactic independence with its own subject and finite verb.",
        "example": "Although she was tired, Maria completed the audit, and David drafted the memo."
      }
    ],
    "example_sentences": [
      "The international consortium ratified the semiconductor trade agreement. (Simple Sentence)",
      "The clinical trial demonstrated high efficacy, but regulatory authorization required additional documentation. (Compound Sentence)",
      "Since the atmospheric carbon levels exceeded safety benchmarks, municipal authorities issued an air quality alert. (Complex Sentence)",
      "Although global oil prices fluctuated unpredictably, consumer spending remained robust, and airline revenues exceeded projections. (Compound-Complex Sentence)"
    ],
    "common_mistakes": [
      "Comma splice: Writing 'The experiments failed, they will try again tomorrow' without a coordinating conjunction.",
      "Sentence fragment: Treating a dependent clause as a complete sentence: 'Because he was late.'",
      "Overly convoluted compounding: Chaining four independent clauses together with 'and', producing a rambling, breathless run-on."
    ],
    "questions": [
      {
        "question_id": "st-q1",
        "question_text": "Classify this sentence: 'Although the weather was turbulent, the pilot landed the aircraft safely, and the passengers cheered.'",
        "question_type": "multiple_choice",
        "options": [
          "Compound-Complex Sentence",
          "Complex Sentence",
          "Compound Sentence",
          "Simple Sentence"
        ],
        "correct_answer": "Compound-Complex Sentence",
        "explanation": "It contains one dependent clause ('Although the weather was turbulent') and two independent clauses joined by 'and'."
      },
      {
        "question_id": "st-q2",
        "question_text": "How can the comma splice 'The servers crashed, the backup systems failed to activate' be grammatically corrected?",
        "question_type": "multiple_choice",
        "options": [
          "The servers crashed, and the backup systems failed to activate.",
          "The servers crashed; the backup systems failed to activate.",
          "When the servers crashed, the backup systems failed to activate.",
          "All of the above are grammatically valid corrections."
        ],
        "correct_answer": "All of the above are grammatically valid corrections.",
        "explanation": "All three methods (comma + coordinating conjunction, semicolon, or converting one clause into dependent) resolve comma splices."
      },
      {
        "question_id": "st-q3",
        "question_text": "What type of sentence is: 'Please submit your comprehensive quarterly report before five o'clock.'?",
        "question_type": "multiple_choice",
        "options": [
          "Imperative",
          "Declarative",
          "Interrogative",
          "Exclamatory"
        ],
        "correct_answer": "Imperative",
        "explanation": "It gives a direct instruction or command with an implied subject '(You)'."
      },
      {
        "question_id": "st-q4",
        "question_text": "True or False: A simple sentence can contain compound subjects and compound verbs while remaining a simple sentence.",
        "question_type": "multiple_choice",
        "options": [
          "True",
          "False"
        ],
        "correct_answer": "True",
        "explanation": "'Sarah and Liam designed and deployed the application' has compound subjects and verbs, but is still a single independent clause (Simple Sentence)."
      },
      {
        "question_id": "st-q5",
        "question_text": "Which of the following is a sentence fragment that CANNOT stand alone?",
        "question_type": "multiple_choice",
        "options": [
          "Because the diplomatic envoy arrived without credentials.",
          "The diplomatic envoy arrived without credentials.",
          "Wait here until the envoy arrives.",
          "The envoy had no credentials."
        ],
        "correct_answer": "Because the diplomatic envoy arrived without credentials.",
        "explanation": "Starting with the subordinator 'Because' turns this into a dependent clause fragment."
      }
    ]
  },
  {
    "topic_id": "grammar-punctuation",
    "title": "Punctuation & Mechanics",
    "category": "Syntax & Mechanics",
    "track_order": 27,
    "level": "all",
    "difficulty_range": "Basic to Advanced",
    "quick_summary": "The definitive guide to commas, semicolons, colons, dashes, hyphens, apostrophes, and capitalization.",
    "lesson_text": "Punctuation and mechanics are the typographical road signs of written English, dictating pacing, grouping, subordination, and grammatical relationships. Misplaced punctuation can alter the entire meaning of a sentence (e.g. 'Let's eat, grandma!' vs. 'Let's eat grandma!'). Mastering the precise functions of semicolons (linking related independent clauses), colons (introducing explanations, lists, or amplifications), em-dashes (dramatic emphasis or parentheticals), hyphens (compound modifiers), and apostrophes (possession vs. contraction) is the hallmark of elite professional writing.",
    "progressive_levels": {
      "basic": {
        "heading": "Basic: Commas, Periods & Apostrophes",
        "concept": "Use periods to terminate complete statements. Use commas to: 1) Separate items in a series ('apples, bananas, and cherries'); 2) Separate introductory words/clauses ('However, we agreed'); 3) Enclose direct address ('Hello, David'). Use apostrophes for contractions (don't = do not) and singular possession (the doctor's coat).",
        "key_points": [
          "The Oxford (serial) Comma sits before the final conjunction in a list: 'milk, bread, and eggs'.",
          "Never use apostrophes to make regular nouns plural: 'two pizza's' is INCORRECT; write 'two pizzas'.",
          "It's = It is / It has. Its = Possessive (belonging to it)."
        ],
        "examples": [
          "The research team purchased pipettes, centrifuges, and test tubes. (Oxford comma in a series)",
          "The committee's recommendation was approved unanimously. (singular possessive apostrophe)"
        ]
      },
      "intermediate": {
        "heading": "Intermediate: Semicolons vs. Colons",
        "concept": "A SEMICOLON (;) connects two closely related independent clauses without a coordinating conjunction ('The test was rigorous; everyone passed'). It also separates items in a complex list containing internal commas. A COLON (:) introduces an amplification, explanation, formal quote, or list that follows a COMPLETE independent clause ('She had one primary objective: to revolutionize solar storage').",
        "rules_and_formulas": [
          "Semicolon Formula: Independent Clause + ; + Independent Clause ('He loved literature; she preferred physics').",
          "Semicolon with Conjunctive Adverb: Independent Clause + ; however, + Independent Clause.",
          "Colon Golden Rule: The clause BEFORE the colon MUST be an independent complete sentence ('We need three items: A, B, and C', NEVER 'We need: A, B, and C')."
        ],
        "examples": [
          "The survey yielded alarming findings; consequently, leadership initiated an internal review. (semicolon + conjunctive adverb)",
          "The university has campuses in London, England; Paris, France; and Berlin, Germany. (semicolon in complex series)"
        ]
      },
      "advanced": {
        "heading": "Advanced: Em-Dashes, En-Dashes, Hyphens & Parentheses",
        "concept": "Dashes and hyphens serve distinct typographical purposes: 1) The Hyphen (-) connects compound modifiers before a noun ('state-of-the-art facility'); 2) The En-Dash (–) indicates ranges of numbers or dates ('1939–1945', 'pages 12–25'); 3) The Em-Dash (—) creates a dramatic pause, abrupt break in thought, or emphatic parenthetical interruption ('The results—unexpected though they were—changed the trajectory of physics').",
        "nuances_and_exceptions": [
          "Em-Dash vs. Parentheses: Parentheses de-emphasize extra information; Em-dashes dramatically highlight and draw attention to it.",
          "Quotations with Periods and Commas: In American English, commas and periods ALWAYS sit INSIDE quotation marks (\"The treaty is signed,\" he said). In British English, punctuation sits inside only if it was part of the original quotation.",
          "Apostrophe with Joint vs. Separate Possession: 'Watson and Crick's discovery' (joint = one apostrophe on the last name) vs. 'Mozart's and Beethoven's symphonies' (separate = apostrophe on both names)."
        ],
        "examples": [
          "Only one candidate possessed the required geopolitical acumen—Dr. Evelyn Foster. (em-dash introducing emphatic revelation)",
          "The Cold War (1947–1991) shaped modern diplomatic alliances across the Western hemisphere. (en-dash for chronological span inside parentheses)"
        ]
      }
    },
    "taxonomy_types": [
      {
        "name": "Terminal Punctuation",
        "description": "Marks concluding complete sentences: Periods, Question Marks, Exclamation Points.",
        "examples": [
          "The seminar concluded.",
          "Who attended?"
        ]
      },
      {
        "name": "Commas (Series, Introductory, Parenthetical)",
        "description": "Separates clause elements, coordinate adjectives, items in a list, and direct address.",
        "examples": [
          "Yes, we can.",
          "A dedicated, brilliant scholar."
        ]
      },
      {
        "name": "Semicolons",
        "description": "Links closely related independent clauses or separates items in complex series with internal commas.",
        "examples": [
          "He studied medicine; his brother pursued law."
        ]
      },
      {
        "name": "Colons",
        "description": "Introduces lists, explanations, or quotes following a syntactically complete independent clause.",
        "examples": [
          "Remember this rule: never compromise on quality."
        ]
      },
      {
        "name": "Dashes (Em-Dash & En-Dash)",
        "description": "Em-dash (—) for dramatic interruption/emphasis; En-dash (–) for numerical spans and ranges.",
        "examples": [
          "Pages 45–60",
          "She arrived—late as usual—with an armful of files."
        ]
      },
      {
        "name": "Hyphens",
        "description": "Joins compound words and multi-word modifiers preceding a noun.",
        "examples": [
          "user-friendly interface",
          "well-established protocol"
        ]
      },
      {
        "name": "Apostrophes (Possession & Contraction)",
        "description": "Indicates missing letters in contractions and grammatical possession.",
        "examples": [
          "it's (it is)",
          "the children's hospital",
          "the directors' meeting"
        ]
      }
    ],
    "rules_summary": [
      {
        "rule_name": "Pre-Colon Completeness Rule",
        "explanation": "The clause preceding a colon must always be capable of standing alone as a complete sentence.",
        "example": "She brought three tools: a wrench, a drill, and a hammer."
      },
      {
        "rule_name": "Semicolon Independence Rule",
        "explanation": "Both sides of a semicolon connecting clauses must be complete independent sentences.",
        "example": "The hypothesis was proven; the theorem was published."
      },
      {
        "rule_name": "Plural vs. Possessive Apostrophe",
        "explanation": "Never use an apostrophe simply to form a plural noun.",
        "example": "Two cats (plural) vs. The cat's bowl (possessive)."
      }
    ],
    "example_sentences": [
      "The clinical trial succeeded beyond all projections; furthermore, no adverse events were recorded. (semicolon with conjunctive adverb)",
      "The architect faced an unprecedented constraint: the historical building could not be modified externally. (colon introducing explanation)",
      "The expedition members—exhausted, hungry, and shivering—finally glimpsed the mountain refuge. (em-dashes enclosing emphatic parenthetical)",
      "The symposium dates are scheduled for October 12–15 in Zurich. (en-dash for calendar range)"
    ],
    "common_mistakes": [
      "Greengrocer's apostrophe: Putting apostrophes in plurals: 'Fresh apple's for sale' instead of 'Fresh apples'.",
      "Using a colon after incomplete verbs: Saying 'We need: pencils, paper, and pens' instead of 'We need pencils, paper, and pens' or 'We need the following items: pencils...'.",
      "Confusing hyphens and dashes: Using a short hyphen (-) where an emphatic em-dash (—) or en-dash (–) belongs."
    ],
    "questions": [
      {
        "question_id": "punc-q1",
        "question_text": "Which sentence features the CORRECT use of a colon?",
        "question_type": "multiple_choice",
        "options": [
          "The company had one primary objective: to achieve carbon neutrality by 2030.",
          "The company's primary objectives are: carbon neutrality, efficiency, and growth.",
          "We must purchase: laptops, monitors, and ergonomic keyboards.",
          "Because of: the storm, the flight was delayed."
        ],
        "correct_answer": "The company had one primary objective: to achieve carbon neutrality by 2030.",
        "explanation": "The clause before the colon ('The company had one primary objective') is a complete independent sentence."
      },
      {
        "question_id": "punc-q2",
        "question_text": "Choose the sentence that correctly uses a semicolon to separate complex list items containing internal commas:",
        "question_type": "multiple_choice",
        "options": [
          "The delegation included Dr. Foster, an astrophysicist; Dr. Vance, a biochemist; and Dr. Lee, a roboticist.",
          "The delegation included Dr. Foster, an astrophysicist, Dr. Vance, a biochemist, and Dr. Lee, a roboticist.",
          "The delegation included Dr. Foster; an astrophysicist, Dr. Vance; a biochemist, and Dr. Lee; a roboticist.",
          "The delegation included: Dr. Foster; an astrophysicist; Dr. Vance; a biochemist; and Dr. Lee."
        ],
        "correct_answer": "The delegation included Dr. Foster, an astrophysicist; Dr. Vance, a biochemist; and Dr. Lee, a roboticist.",
        "explanation": "Semicolons prevent confusion when list items already contain their own descriptive internal commas."
      },
      {
        "question_id": "punc-q3",
        "question_text": "What punctuation mark is used to represent a span or range of dates or pages (e.g. 1914–1918)?",
        "question_type": "multiple_choice",
        "options": [
          "En-dash",
          "Em-dash",
          "Hyphen",
          "Underscore"
        ],
        "correct_answer": "En-dash",
        "explanation": "An En-dash (–) is the typographic mark designed specifically for numerical ranges and date spans."
      },
      {
        "question_id": "punc-q4",
        "question_text": "Select the sentence with correct joint ownership apostrophe usage:",
        "question_type": "multiple_choice",
        "options": [
          "Watson and Crick's discovery transformed molecular biology.",
          "Watson's and Crick's discovery transformed molecular biology (referring to their single joint discovery).",
          "Watson and Cricks discovery transformed molecular biology.",
          "Watson and Cricks' discovery transformed molecular biology."
        ],
        "correct_answer": "Watson and Crick's discovery transformed molecular biology.",
        "explanation": "When two or more individuals share joint ownership of a single discovery or entity, the apostrophe attaches only to the final name."
      },
      {
        "question_id": "punc-q5",
        "question_text": "True or False: In standard formal English, you should never place an apostrophe in the possessive pronoun 'its'.",
        "question_type": "multiple_choice",
        "options": [
          "True",
          "False"
        ],
        "correct_answer": "True",
        "explanation": "'Its' is a possessive pronoun and never takes an apostrophe. 'It's' is exclusively the contraction of 'it is' or 'it has'."
      }
    ]
  }
];
