// Static dataset for 3 Vocabulary Sets with 12 rich words each and dedicated quizzes
// Conforms strictly to VocabularySet and Word schemas

export const VOCABULARY_SETS = [
  {
    set_id: "vocab-everyday",
    title: "Everyday Vocabulary",
    level: "beginner",
    words: [
      {
        word: "reluctant",
        pronunciation: "ri-LUK-tuhnt",
        meaning: "Unwilling, hesitant, or disinclined to do something.",
        part_of_speech: "adjective",
        example_sentence: "He was reluctant to admit that he had lost the house keys.",
        synonyms: ["hesitant", "unwilling", "loath"]
      },
      {
        word: "commute",
        pronunciation: "kuh-MYOOT",
        meaning: "To travel regularly between one's home and place of work or study.",
        part_of_speech: "verb",
        example_sentence: "She commutes thirty minutes by subway every weekday.",
        synonyms: ["travel", "journey"]
      },
      {
        word: "thrifty",
        pronunciation: "THRIF-tee",
        meaning: "Using money and other resources carefully and not wastefully.",
        part_of_speech: "adjective",
        example_sentence: "By being thrifty with grocery expenses, they saved enough for a vacation.",
        synonyms: ["frugal", "economical", "prudent"]
      },
      {
        word: "spontaneous",
        pronunciation: "spon-TAY-nee-uhs",
        meaning: "Performed or occurring as a result of a sudden impulse without premeditation.",
        part_of_speech: "adjective",
        example_sentence: "We took a spontaneous weekend road trip to the coast.",
        synonyms: ["unplanned", "impulsive", "natural"]
      },
      {
        word: "clutter",
        pronunciation: "KLUH-ter",
        meaning: "A collection of things lying around in an untidy or disorganized state.",
        part_of_speech: "noun",
        example_sentence: "Clearing the clutter from her desk helped her concentrate on studying.",
        synonyms: ["disorder", "mess", "jumble"]
      },
      {
        word: "punctual",
        pronunciation: "PUHNK-choo-uhl",
        meaning: "Happening or doing something at the agreed or proper time; on time.",
        part_of_speech: "adjective",
        example_sentence: "Marcus is always punctual and arrives five minutes before any appointment.",
        synonyms: ["prompt", "timely", "on-time"]
      },
      {
        word: "fatigue",
        pronunciation: "fuh-TEEG",
        meaning: "Extreme tiredness resulting from mental or physical exertion or illness.",
        part_of_speech: "noun",
        example_sentence: "After running the half-marathon, she felt overwhelming muscle fatigue.",
        synonyms: ["exhaustion", "weariness", "tiredness"]
      },
      {
        word: "cherish",
        pronunciation: "CHER-ish",
        meaning: "To protect and care for someone or something lovingly; to hold dear.",
        part_of_speech: "verb",
        example_sentence: "They cherish the handwritten letters passed down by their grandparents.",
        synonyms: ["treasure", "value", "prize"]
      },
      {
        word: "candid",
        pronunciation: "KAN-did",
        meaning: "Truthful and straightforward; frank in expressing one's genuine thoughts.",
        part_of_speech: "adjective",
        example_sentence: "I appreciated her candid feedback regarding my presentation style.",
        synonyms: ["honest", "frank", "outspoken"]
      },
      {
        word: "dwell",
        pronunciation: "DWEL",
        meaning: "To think, speak, or write at length about a particular subject (often negative).",
        part_of_speech: "verb",
        example_sentence: "Try not to dwell on past mistakes; focus your energy on tomorrow's goals.",
        synonyms: ["linger", "ruminate", "brood"]
      },
      {
        word: "cozy",
        pronunciation: "KOH-zee",
        meaning: "Giving a feeling of comfort, warmth, and relaxation.",
        part_of_speech: "adjective",
        example_sentence: "The small cabin had a cozy fireplace and plush armchairs.",
        synonyms: ["snug", "comfortable", "warm"]
      },
      {
        word: "drizzle",
        pronunciation: "DRIZ-uhl",
        meaning: "Light rain falling in very fine, mist-like drops.",
        part_of_speech: "noun",
        example_sentence: "A gentle drizzle dampened the streets during our morning walk.",
        synonyms: ["mist", "light rain"]
      }
    ],
    quiz_questions: [
      {
        question_id: "vocab-ev-q1",
        question_text: "Which word means 'truthful and straightforward; frank'?",
        question_type: "multiple_choice",
        options: ["candid", "reluctant", "thrifty", "spontaneous"],
        correct_answer: "candid",
        explanation: "'Candid' means straightforward and frank without dissimulation."
      },
      {
        question_id: "vocab-ev-q2",
        question_text: "Choose the word that best completes: 'She was _____ to try the exotic dish because of its unusual smell.'",
        question_type: "multiple_choice",
        options: ["reluctant", "punctual", "cozy", "thrifty"],
        correct_answer: "reluctant",
        explanation: "'Reluctant' means hesitant or disinclined to act."
      },
      {
        question_id: "vocab-ev-q3",
        question_text: "What is the synonym of 'exhaustion' or extreme tiredness?",
        question_type: "multiple_choice",
        options: ["fatigue", "clutter", "commute", "drizzle"],
        correct_answer: "fatigue",
        explanation: "'Fatigue' describes deep physical or mental exhaustion."
      },
      {
        question_id: "vocab-ev-q4",
        question_text: "Which word describes someone who is always on time?",
        question_type: "multiple_choice",
        options: ["punctual", "thrifty", "spontaneous", "candid"],
        correct_answer: "punctual",
        explanation: "'Punctual' refers strictly to adhering to scheduled times."
      },
      {
        question_id: "vocab-ev-q5",
        question_text: "Fill in the blank with the word meaning 'to hold dear or treasure': 'They _____ the memories of their childhood summers.'",
        question_type: "fill_in_blank",
        correct_answer: "cherish",
        explanation: "'Cherish' means to hold dear or protect with affectionate regard."
      }
    ]
  },
  {
    set_id: "vocab-academic",
    title: "Academic Vocabulary",
    level: "intermediate",
    words: [
      {
        word: "scrutinize",
        pronunciation: "SKROO-tuh-nyz",
        meaning: "To examine or inspect closely and thoroughly.",
        part_of_speech: "verb",
        example_sentence: "Peer reviewers will scrutinize every data point before publication.",
        synonyms: ["inspect", "examine", "analyze"]
      },
      {
        word: "ambiguous",
        pronunciation: "am-BIG-yoo-uhs",
        meaning: "Open to more than one interpretation; having a double or unclear meaning.",
        part_of_speech: "adjective",
        example_sentence: "The survey question was ambiguous, resulting in conflicting responses.",
        synonyms: ["equivocal", "vague", "unclear"]
      },
      {
        word: "plausible",
        pronunciation: "PLAW-zuh-buhl",
        meaning: "Seeming reasonable or probable; likely to be true.",
        part_of_speech: "adjective",
        example_sentence: "The geologist offered a plausible hypothesis for the sudden seismic shift.",
        synonyms: ["credible", "feasible", "believable"]
      },
      {
        word: "paradigm",
        pronunciation: "PAIR-uh-dyme",
        meaning: "A typical example, pattern, or model of something in science or theory.",
        part_of_speech: "noun",
        example_sentence: "Quantum mechanics caused a fundamental paradigm shift in modern physics.",
        synonyms: ["model", "framework", "pattern"]
      },
      {
        word: "substantiate",
        pronunciation: "suhb-STAN-shee-ayt",
        meaning: "To provide evidence to support or prove the truth of a claim.",
        part_of_speech: "verb",
        example_sentence: "Researchers must substantiate their conclusions with verifiable empirical trials.",
        synonyms: ["validate", "corroborate", "verify"]
      },
      {
        word: "discrepancy",
        pronunciation: "dis-KREP-uhn-see",
        meaning: "A lack of compatibility or similarity between two or more facts or numbers.",
        part_of_speech: "noun",
        example_sentence: "Auditors uncovered a significant discrepancy between ledger records and bank statements.",
        synonyms: ["inconsistency", "divergence", "variance"]
      },
      {
        word: "ubiquitous",
        pronunciation: "yoo-BIK-wuh-tuhs",
        meaning: "Present, appearing, or found everywhere simultaneously.",
        part_of_speech: "adjective",
        example_sentence: "Mobile smartphones have become ubiquitous across global communities.",
        synonyms: ["omnipresent", "pervasive", "universal"]
      },
      {
        word: "coherent",
        pronunciation: "koh-HEER-uhnt",
        meaning: "Logical, orderly, and clearly articulated; forming a unified whole.",
        part_of_speech: "adjective",
        example_sentence: "The candidate presented a coherent argument that persuaded the academic panel.",
        synonyms: ["logical", "lucid", "articulate"]
      },
      {
        word: "corroborate",
        pronunciation: "kuh-ROB-uh-rayt",
        meaning: "To confirm or give support to a statement, theory, or finding.",
        part_of_speech: "verb",
        example_sentence: "Satellite imagery helped corroborate the archaeological team's findings.",
        synonyms: ["confirm", "authenticate", "back up"]
      },
      {
        word: "divergent",
        pronunciation: "dy-VUR-juhnt",
        meaning: "Tending to be different or develop in different directions.",
        part_of_speech: "adjective",
        example_sentence: "The two economists held divergent views regarding interest rate policy.",
        synonyms: ["differing", "contrasting", "deviant"]
      },
      {
        word: "empirical",
        pronunciation: "em-PEER-i-kuhl",
        meaning: "Based on, concerned with, or verifiable by observation or experience rather than theory.",
        part_of_speech: "adjective",
        example_sentence: "The thesis was rooted in empirical observation gathered over a five-year study.",
        synonyms: ["observational", "practical", "experimental"]
      },
      {
        word: "tentative",
        pronunciation: "TEN-tuh-tiv",
        meaning: "Not certain or fixed; provisional; done without confidence.",
        part_of_speech: "adjective",
        example_sentence: "The committee reached a tentative agreement pending final faculty approval.",
        synonyms: ["provisional", "unconfirmed", "hesitant"]
      }
    ],
    quiz_questions: [
      {
        question_id: "vocab-ac-q1",
        question_text: "Which term denotes 'a lack of compatibility or similarity between two facts'?",
        question_type: "multiple_choice",
        options: ["discrepancy", "paradigm", "consensus", "hypothesis"],
        correct_answer: "discrepancy",
        explanation: "'Discrepancy' denotes an illogical inconsistency or variance between data points."
      },
      {
        question_id: "vocab-ac-q2",
        question_text: "Select the word meaning 'present or found everywhere':",
        question_type: "multiple_choice",
        options: ["ubiquitous", "divergent", "tentative", "plausible"],
        correct_answer: "ubiquitous",
        explanation: "'Ubiquitous' means omnipresent or pervasive in all locations."
      },
      {
        question_id: "vocab-ac-q3",
        question_text: "Choose the verb that means 'to inspect or examine thoroughly':",
        question_type: "multiple_choice",
        options: ["scrutinize", "substantiate", "corroborate", "commute"],
        correct_answer: "scrutinize",
        explanation: "'Scrutinize' means to examine with critical, rigorous attention to detail."
      },
      {
        question_id: "vocab-ac-q4",
        question_text: "What is an antonym for 'clear and unambiguous'?",
        question_type: "multiple_choice",
        options: ["ambiguous", "coherent", "empirical", "plausible"],
        correct_answer: "ambiguous",
        explanation: "'Ambiguous' means open to multiple interpretations or vague."
      },
      {
        question_id: "vocab-ac-q5",
        question_text: "Fill in the blank with the adjective meaning 'provable through observation': 'The scientist presented _____ evidence rather than theoretical speculation.'",
        question_type: "fill_in_blank",
        correct_answer: "empirical",
        explanation: "'Empirical' refers to knowledge derived from direct sensory observation and experimentation."
      }
    ]
  },
  {
    set_id: "vocab-business",
    title: "Business Vocabulary",
    level: "advanced",
    words: [
      {
        word: "leverage",
        pronunciation: "LEV-rij",
        meaning: "To use something to maximum advantage; strategic power to influence.",
        part_of_speech: "verb",
        example_sentence: "The startup aims to leverage artificial intelligence to automate bookkeeping.",
        synonyms: ["utilize", "exploit", "capitalize on"]
      },
      {
        word: "lucrative",
        pronunciation: "LOO-kruh-tiv",
        meaning: "Producing a great deal of profit or wealth.",
        part_of_speech: "adjective",
        example_sentence: "The firm secured a lucrative contract with a renewable energy conglomerate.",
        synonyms: ["profitable", "remunerative", "gainful"]
      },
      {
        word: "streamline",
        pronunciation: "STREEM-lyne",
        meaning: "To make an organization or process simpler, more efficient, and effective.",
        part_of_speech: "verb",
        example_sentence: "We adopted cloud software to streamline customer onboarding workflows.",
        synonyms: ["optimize", "simplify", "rationalize"]
      },
      {
        word: "stakeholder",
        pronunciation: "STAYK-hohl-der",
        meaning: "A person or group with an interest or concern in the success of an enterprise.",
        part_of_speech: "noun",
        example_sentence: "The board must balance the interests of shareholders, employees, and community stakeholders.",
        synonyms: ["investor", "shareholder", "participant"]
      },
      {
        word: "benchmark",
        pronunciation: "BENCH-mahrk",
        meaning: "A standard or point of reference against which things may be compared or assessed.",
        part_of_speech: "noun",
        example_sentence: "Our 99.9% uptime metric is considered the industry benchmark for reliability.",
        synonyms: ["standard", "criterion", "gauge"]
      },
      {
        word: "synergy",
        pronunciation: "SIN-er-jee",
        meaning: "The interaction of elements that produces a combined effect greater than the sum of separate effects.",
        part_of_speech: "noun",
        example_sentence: "The merger generated cross-functional synergy that drastically cut distribution overhead.",
        synonyms: ["collaboration", "cooperation", "alliance"]
      },
      {
        word: "contingency",
        pronunciation: "kuhn-TIN-juhn-see",
        meaning: "A future event or circumstance that is possible but cannot be predicted with certainty.",
        part_of_speech: "noun",
        example_sentence: "The project budget includes a 15% reserve for unexpected contingencies.",
        synonyms: ["emergency", "eventuality", "backup plan"]
      },
      {
        word: "scalable",
        pronunciation: "SKAY-luh-buhl",
        meaning: "Able to grow or expand smoothly in capacity and revenue without being hampered by resource limits.",
        part_of_speech: "adjective",
        example_sentence: "Venture capitalists favor digital products with highly scalable business models.",
        synonyms: ["expandable", "adaptable", "modular"]
      },
      {
        word: "bottleneck",
        pronunciation: "BOT-l-nek",
        meaning: "A point of congestion or obstruction that slows down the progress of an entire system.",
        part_of_speech: "noun",
        example_sentence: "Delayed customs clearances proved to be the primary bottleneck in international shipping.",
        synonyms: ["obstacle", "impediment", "blockage"]
      },
      {
        word: "feasibility",
        pronunciation: "fee-zuh-BIL-uh-tee",
        meaning: "The state or degree of being easily or conveniently done; practical viability.",
        part_of_speech: "noun",
        example_sentence: "The consulting team conducted a feasibility study before breaking ground on the factory.",
        synonyms: ["viability", "practicability", "workability"]
      },
      {
        word: "fiscal",
        pronunciation: "FIS-kuhl",
        meaning: "Relating to government or corporate revenue, taxation, and financial budgeting.",
        part_of_speech: "adjective",
        example_sentence: "The company reported record earnings in the fourth quarter of the fiscal year.",
        synonyms: ["financial", "monetary", "economic"]
      },
      {
        word: "incentive",
        pronunciation: "in-SEN-tiv",
        meaning: "A thing that motivates or encourages someone to do something, especially financial gain.",
        part_of_speech: "noun",
        example_sentence: "Performance-based bonuses provide a strong incentive for the sales team.",
        synonyms: ["motivation", "stimulus", "inducement"]
      }
    ],
    quiz_questions: [
      {
        question_id: "vocab-biz-q1",
        question_text: "Which term describes 'a standard or reference against which quality or performance is measured'?",
        question_type: "multiple_choice",
        options: ["benchmark", "synergy", "contingency", "incentive"],
        correct_answer: "benchmark",
        explanation: "A 'benchmark' is a recognized reference point used to evaluate comparative performance."
      },
      {
        question_id: "vocab-biz-q2",
        question_text: "Select the word meaning 'producing high financial profit or gain':",
        question_type: "multiple_choice",
        options: ["lucrative", "scalable", "fiscal", "coherent"],
        correct_answer: "lucrative",
        explanation: "'Lucrative' means producing a significant amount of financial profit."
      },
      {
        question_id: "vocab-biz-q3",
        question_text: "What business noun describes a point of congestion that impedes overall progress?",
        question_type: "multiple_choice",
        options: ["bottleneck", "stakeholder", "feasibility", "leverage"],
        correct_answer: "bottleneck",
        explanation: "A 'bottleneck' is an operational constraint that chokes system flow and throughput."
      },
      {
        question_id: "vocab-biz-q4",
        question_text: "Choose the verb meaning 'to simplify and make more efficient':",
        question_type: "multiple_choice",
        options: ["streamline", "leverage", "scrutinize", "cherish"],
        correct_answer: "streamline",
        explanation: "'Streamline' means removing redundancies to make an operation lean and efficient."
      },
      {
        question_id: "vocab-biz-q5",
        question_text: "Fill in the blank with the noun meaning 'practical viability': 'Engineers conducted a _____ study to verify if the bridge design was realistic.'",
        question_type: "fill_in_blank",
        correct_answer: "feasibility",
        explanation: "'Feasibility' evaluates whether a plan or project is realistically achievable."
      }
    ]
  }
];
