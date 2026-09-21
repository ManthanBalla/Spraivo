// Spraivo Vocabulary Bank
// Comprehensive, unconstrained lexicon spanning foundational to nuanced mastery
// Designed for active recall, sentence generation, and contextual vocabulary acquisition

export const VOCABULARY_CATEGORIES = [
  {
    set_id: "vocab-everyday",
    title: "Everyday & Conversational",
    tagline: "Daily Life & Casual Fluency",
    description: "Natural vocabulary for casual conversations, daily routines, social gatherings, and clear personal communication.",
    color: "#38bdf8",
    badge: "Core Communication",
    words: [
      {
        word: "reluctant",
        pronunciation: "ri-LUK-tuhnt",
        part_of_speech: "adjective",
        meaning: "Unwilling and hesitant; disinclined to take action.",
        example_sentence: "He was reluctant to admit that he had lost the house keys.",
        synonyms: ["hesitant", "unwilling", "cautious"],
        memory_tip: "Think of reluctance as 'pulling back' before jumping into cold water."
      },
      {
        word: "commute",
        pronunciation: "kuh-MYOOT",
        part_of_speech: "verb",
        meaning: "To travel regularly between one's home and place of work or study.",
        example_sentence: "She commutes thirty minutes by subway every weekday morning.",
        synonyms: ["travel", "transit", "journey"],
        memory_tip: "Related to 'community'—moving between your home and work community."
      },
      {
        word: "thrifty",
        pronunciation: "THRIF-tee",
        part_of_speech: "adjective",
        meaning: "Using money and resources carefully and avoiding unnecessary waste.",
        example_sentence: "By being thrifty with dining out, they saved enough to buy their first car.",
        synonyms: ["frugal", "economical", "prudent"],
        memory_tip: "To 'thrive' financially, you often need to be thrifty."
      },
      {
        word: "spontaneous",
        pronunciation: "spon-TAY-nee-uhs",
        part_of_speech: "adjective",
        meaning: "Performed or occurring as a result of sudden impulse without premeditation.",
        example_sentence: "We took a spontaneous weekend road trip to the mountain cabin.",
        synonyms: ["unplanned", "impulsive", "instinctive"],
        memory_tip: "Spontaneous sounds like 'spark'—an instant decision without planning."
      },
      {
        word: "clutter",
        pronunciation: "KLUH-ter",
        part_of_speech: "noun",
        meaning: "A crowded collection of things lying around in an untidy or disorganized state.",
        example_sentence: "Clearing the clutter from her study desk helped her concentrate on reading.",
        synonyms: ["disorder", "mess", "chaos"],
        memory_tip: "Clutter 'clusters' together and blocks your clean space."
      },
      {
        word: "punctual",
        pronunciation: "PUHNK-choo-uhl",
        part_of_speech: "adjective",
        meaning: "Doing something at the agreed or proper time; strictly on time.",
        example_sentence: "Marcus is remarkably punctual and always arrives five minutes ahead of schedule.",
        synonyms: ["prompt", "timely", "precise"],
        memory_tip: "Punctual shares roots with 'puncture'—arriving right on the exact point of time."
      },
      {
        word: "fatigue",
        pronunciation: "fuh-TEEG",
        part_of_speech: "noun",
        meaning: "Extreme tiredness or exhaustion resulting from physical exertion or mental strain.",
        example_sentence: "After driving through heavy rain for eight hours, driver fatigue began to set in.",
        synonyms: ["exhaustion", "weariness", "burnout"],
        memory_tip: "Fatigue makes your muscles feel 'flat' and unresponsive."
      },
      {
        word: "cherish",
        pronunciation: "CHER-ish",
        part_of_speech: "verb",
        meaning: "To protect and care for someone or something lovingly; to hold dear.",
        example_sentence: "They cherish the handwritten letters passed down across three generations.",
        synonyms: ["treasure", "value", "adore"],
        memory_tip: "Rhymes with 'perish'—we cherish things because time can cause them to perish."
      },
      {
        word: "candid",
        pronunciation: "KAN-did",
        part_of_speech: "adjective",
        meaning: "Truthful, straightforward, and sincere in expressing one's genuine thoughts.",
        example_sentence: "I appreciated her candid feedback regarding my presentation slides.",
        synonyms: ["frank", "honest", "forthright"],
        memory_tip: "A candid photo captures you as you truly are, without posing."
      },
      {
        word: "cozy",
        pronunciation: "KOH-zee",
        part_of_speech: "adjective",
        meaning: "Giving a feeling of comfort, warmth, and peaceful relaxation.",
        example_sentence: "The coffee shop has cozy armchairs and soft ambient lighting.",
        synonyms: ["snug", "comfortable", "restful"],
        memory_tip: "Wrap yourself in a warm blanket by the fire—that is the cozy feeling."
      },
      {
        word: "dwell",
        pronunciation: "DWEL",
        part_of_speech: "verb",
        meaning: "To linger on, obsess over, or think at length about a particular thought or past event.",
        example_sentence: "Try not to dwell on yesterday's mistakes; focus your attention on today's goals.",
        synonyms: ["ruminate", "brood", "linger"],
        memory_tip: "Dwelling means living in a place—don't live permanently inside negative memories."
      },
      {
        word: "versatile",
        pronunciation: "VUR-suh-tl",
        part_of_speech: "adjective",
        meaning: "Able to adapt or be adapted to many different functions, roles, or activities.",
        example_sentence: "A cast-iron skillet is one of the most versatile tools in any kitchen.",
        synonyms: ["adaptable", "flexible", "multipurpose"],
        memory_tip: "Versatile people can handle multiple 'versions' of different tasks."
      }
    ]
  },
  {
    set_id: "vocab-academic",
    title: "Academic & Scholarly",
    tagline: "Research, Analysis & Essays",
    description: "Rigorous vocabulary for university essays, scientific analysis, literary critique, and academic reasoning.",
    color: "#818cf8",
    badge: "Formal Scholarship",
    words: [
      {
        word: "substantiate",
        pronunciation: "suhb-STAN-shee-ayt",
        part_of_speech: "verb",
        meaning: "To provide evidence or factual proof to support or determine the truth of a claim.",
        example_sentence: "The researcher needed additional empirical data to substantiate her hypothesis.",
        synonyms: ["corroborate", "validate", "authenticate"],
        memory_tip: "Give substance to an idea by backing it up with solid facts."
      },
      {
        word: "paradigm",
        pronunciation: "PAIR-uh-dime",
        part_of_speech: "noun",
        meaning: "A typical example, model, or pattern; an overarching philosophical framework.",
        example_sentence: "The discovery of DNA created a complete paradigm shift in the field of biology.",
        synonyms: ["framework", "archetype", "model"],
        memory_tip: "A paradigm is a lens through which an entire scientific community views the world."
      },
      {
        word: "scrutinize",
        pronunciation: "SKROO-tuh-nyz",
        part_of_speech: "verb",
        meaning: "To examine, inspect, or investigate closely and critically with meticulous detail.",
        example_sentence: "Peer reviewers thoroughly scrutinize the methodology before any paper is published.",
        synonyms: ["inspect", "examine", "dissect"],
        memory_tip: "Hold something under a magnifying glass and scrutinize every fiber."
      },
      {
        word: "coherent",
        pronunciation: "koh-HEER-uhnt",
        part_of_speech: "adjective",
        meaning: "Logical, consistent, and cleanly integrated so that all parts connect smoothly.",
        example_sentence: "Her thesis developed a coherent argument tracing economic changes over four centuries.",
        synonyms: ["articulate", "lucid", "congruent"],
        memory_tip: "Cohesion means sticking together—a coherent essay sticks to its main thesis."
      },
      {
        word: "dichotomy",
        pronunciation: "dy-KOT-uh-mee",
        part_of_speech: "noun",
        meaning: "A division or contrast between two things that are represented as being opposed or entirely different.",
        example_sentence: "Scholars debated the classic dichotomy between nature and nurture.",
        synonyms: ["division", "split", "polarity"],
        memory_tip: "'Di-' means two; 'tomy' means cutting—cutting an issue into two distinct halves."
      },
      {
        word: "ubiquitous",
        pronunciation: "yoo-BIK-wuh-tuhs",
        part_of_speech: "adjective",
        meaning: "Present, appearing, or found everywhere simultaneously.",
        example_sentence: "Smartphones have become ubiquitous across modern urban society.",
        synonyms: ["omnipresent", "pervasive", "universal"],
        memory_tip: "Ubiquitous sounds like 'every bit of us'—found in every corner."
      },
      {
        word: "juxtapose",
        pronunciation: "JUK-stuh-pohz",
        part_of_speech: "verb",
        meaning: "To place two concepts, images, or ideas close together for contrasting effect.",
        example_sentence: "The exhibition juxtaposes ancient oil paintings with contemporary digital installations.",
        synonyms: ["contrast", "collocate", "compare"],
        memory_tip: "Position two distinct artifacts side by side to see how they contrast."
      },
      {
        word: "salient",
        pronunciation: "SAY-lee-uhnt",
        part_of_speech: "adjective",
        meaning: "Most notable, prominent, or significant.",
        example_sentence: "The summary highlighted the salient points of the lengthy government report.",
        synonyms: ["prominent", "crucial", "striking"],
        memory_tip: "A salient point leaps out at you immediately from the text."
      },
      {
        word: "empirical",
        pronunciation: "em-PEER-i-kuhl",
        part_of_speech: "adjective",
        meaning: "Based on, concerned with, or verifiable by observation or experiment rather than theory.",
        example_sentence: "Scientists demand empirical evidence rather than anecdotal assumptions.",
        synonyms: ["observational", "experimental", "factual"],
        memory_tip: "Empirical science relies on experiments you can record with your own senses."
      },
      {
        word: "elucidate",
        pronunciation: "i-LOO-si-dayt",
        part_of_speech: "verb",
        meaning: "To make something clear; to explain lucidly and remove ambiguity.",
        example_sentence: "The professor used real-world analogies to elucidate the principles of quantum mechanics.",
        synonyms: ["clarify", "illuminate", "explicate"],
        memory_tip: "'Lucid' means light and clear; elucidating shines a bright spotlight on darkness."
      },
      {
        word: "anomaly",
        pronunciation: "uh-NOM-uh-lee",
        part_of_speech: "noun",
        meaning: "Something that deviates from what is standard, normal, or expected.",
        example_sentence: "Astronomers detected a gravitational anomaly in the outer reaches of the solar system.",
        synonyms: ["irregularity", "aberration", "deviation"],
        memory_tip: "An anomaly is abnormal—an odd outlier that breaks the regular pattern."
      },
      {
        word: "rigorous",
        pronunciation: "RIG-er-uhs",
        part_of_speech: "adjective",
        meaning: "Extremely thorough, exhaustive, and strictly accurate.",
        example_sentence: "The vaccine underwent rigorous clinical trials across multiple continents.",
        synonyms: ["meticulous", "exacting", "stringent"],
        memory_tip: "Rigorous standards leave no room for carelessness or shortcuts."
      }
    ]
  },
  {
    set_id: "vocab-business",
    title: "Business & Leadership",
    tagline: "Strategy, Negotiations & Corporate Ops",
    description: "Professional terminology for strategic planning, stakeholder communications, negotiations, and enterprise growth.",
    color: "#10b981",
    badge: "Executive Fluency",
    words: [
      {
        word: "leverage",
        pronunciation: "LEV-er-ij",
        part_of_speech: "verb",
        meaning: "To use something to maximum advantage to achieve a greater outcome.",
        example_sentence: "The startup leveraged customer testimonials to secure angel investor backing.",
        synonyms: ["capitalize", "utilize", "exploit"],
        memory_tip: "Like using a physical lever to lift a heavy weight with small effort."
      },
      {
        word: "synergy",
        pronunciation: "SIN-er-jee",
        part_of_speech: "noun",
        meaning: "The combined interaction of entities producing an effect greater than the sum of their individual effects.",
        example_sentence: "The merger between both tech companies created powerful operational synergies.",
        synonyms: ["collaboration", "cooperation", "symbiosis"],
        memory_tip: "1 + 1 = 3; when two teams cooperate, their joint power multiplies."
      },
      {
        word: "streamline",
        pronunciation: "STREEM-lyne",
        part_of_speech: "verb",
        meaning: "To make an organization or system more efficient by employing faster or simpler working methods.",
        example_sentence: "Management introduced new cloud software to streamline customer onboarding.",
        synonyms: ["simplify", "optimize", "expedite"],
        memory_tip: "Make processes sleek and smooth like an aerodynamic jet stream."
      },
      {
        word: "benchmark",
        pronunciation: "BENCH-mahrk",
        part_of_speech: "noun",
        meaning: "A standard or reference point against which things may be compared or assessed.",
        example_sentence: "The European privacy regulations serve as the international benchmark for data protection.",
        synonyms: ["standard", "criterion", "gauge"],
        memory_tip: "A mark carved into a workbench to ensure every cut matches the exact standard."
      },
      {
        word: "lucrative",
        pronunciation: "LOO-kruh-tiv",
        part_of_speech: "adjective",
        meaning: "Producing a great deal of profit or financial gain.",
        example_sentence: "Securing the government defense contract proved to be an extremely lucrative venture.",
        synonyms: ["profitable", "rewarding", "remunerative"],
        memory_tip: "Think of 'lucre' (money)—lucrative deals bring in heavy cash flow."
      },
      {
        word: "stakeholder",
        pronunciation: "STAYK-hohl-der",
        part_of_speech: "noun",
        meaning: "A person, group, or organization with an active interest or stake in the outcome of an initiative.",
        example_sentence: "Before modifying our product roadmap, we consulted all major external stakeholders.",
        synonyms: ["shareholder", "participant", "investor"],
        memory_tip: "Holding a 'stake' in the tent—if the project falls, everyone feels it."
      },
      {
        word: "contingency",
        pronunciation: "kuhn-TIN-juhn-see",
        part_of_speech: "noun",
        meaning: "A future event or circumstance that is possible but cannot be predicted with absolute certainty; a backup plan.",
        example_sentence: "Our engineering department prepared a contingency budget in case supply chains were delayed.",
        synonyms: ["fallback", "proviso", "precaution"],
        memory_tip: "Always prepare Plan B as your emergency contingency."
      },
      {
        word: "feasibility",
        pronunciation: "fee-zuh-BIL-uh-tee",
        part_of_speech: "noun",
        meaning: "The state or degree of being easily or conveniently done; practical viability.",
        example_sentence: "We launched an initial six-month pilot to evaluate the feasibility of offshore manufacturing.",
        synonyms: ["viability", "practicability", "workability"],
        memory_tip: "Is it 'feasible' (doable)? A feasibility study answers that before spending millions."
      },
      {
        word: "bottleneck",
        pronunciation: "BOT-l-nek",
        part_of_speech: "noun",
        meaning: "A point of congestion in a system that stops or slows down overall progress.",
        example_sentence: "Slow quality assurance approvals formed the primary bottleneck in our release cycle.",
        synonyms: ["impasse", "blockage", "obstruction"],
        memory_tip: "Liquids pour slowly when constricted through the narrow neck of a bottle."
      },
      {
        word: "scalable",
        pronunciation: "SKAY-luh-buhl",
        part_of_speech: "adjective",
        meaning: "Able to grow or expand in capacity or size without sacrificing performance or efficiency.",
        example_sentence: "The cloud infrastructure is horizontally scalable, supporting millions of concurrent queries.",
        synonyms: ["expandable", "adaptable", "modular"],
        memory_tip: "Able to scale a mountain or scale up to global server demand."
      },
      {
        word: "fiscal",
        pronunciation: "FIS-kuhl",
        part_of_speech: "adjective",
        meaning: "Relating to government or corporate revenue, finances, and budgeting cycles.",
        example_sentence: "The company reported record earnings in the fourth quarter of the fiscal year.",
        synonyms: ["financial", "monetary", "budgetary"],
        memory_tip: "Fiscal policy dictates public spending and corporate tax quarters."
      },
      {
        word: "incentive",
        pronunciation: "in-SEN-tiv",
        part_of_speech: "noun",
        meaning: "A thing that motivates or encourages someone to take action or work toward a goal.",
        example_sentence: "Performance-based bonuses provide a direct financial incentive for team excellence.",
        synonyms: ["stimulus", "motivation", "inducement"],
        memory_tip: "An incentive lights the inner spark that pushes you forward."
      }
    ]
  },
  {
    set_id: "vocab-tech",
    title: "Technology & AI Innovation",
    tagline: "Algorithms, Cloud & Modern Systems",
    description: "Crucial vocabulary for artificial intelligence, software engineering, cyber resilience, and emerging tech.",
    color: "#06b6d4",
    badge: "Digital Frontier",
    words: [
      {
        word: "algorithm",
        pronunciation: "AL-guh-rith-uhm",
        part_of_speech: "noun",
        meaning: "A precise step-by-step procedure or set of rules followed in problem-solving or computer calculations.",
        example_sentence: "Search engines deploy sophisticated ranking algorithms to index web content.",
        synonyms: ["procedure", "protocol", "heuristic"],
        memory_tip: "Named after mathematician Al-Khwarizmi—a rigorous recipe for computational logic."
      },
      {
        word: "autonomous",
        pronunciation: "aw-TON-uh-muhs",
        part_of_speech: "adjective",
        meaning: "Operating, acting, or functioning independently without continuous human intervention.",
        example_sentence: "Autonomous delivery drones navigate congested streets using lidar and vision models.",
        synonyms: ["self-governing", "automated", "independent"],
        memory_tip: "'Auto-' means self; 'nomos' means law—governed by its own internal rules."
      },
      {
        word: "latency",
        pronunciation: "LAY-tuhn-see",
        part_of_speech: "noun",
        meaning: "The delay before a transfer of data begins following an instruction for its transfer.",
        example_sentence: "Edge computing architectures minimize network latency for real-time video streaming.",
        synonyms: ["delay", "lag", "dormancy"],
        memory_tip: "Latent means hidden or waiting—latency is time spent waiting for packets to arrive."
      },
      {
        word: "deprecated",
        pronunciation: "DEP-ruh-kay-tid",
        part_of_speech: "adjective",
        meaning: "Describing software features or APIs that are obsolete and slated for future removal.",
        example_sentence: "The old authentication endpoint was deprecated in favor of OAuth 2.1.",
        synonyms: ["obsolete", "phased-out", "superseded"],
        memory_tip: "Don't build on quicksand: avoid building new apps with deprecated libraries."
      },
      {
        word: "resilience",
        pronunciation: "ri-ZIL-yuhns",
        part_of_speech: "noun",
        meaning: "The capacity of a system or network to recover quickly from disruptions or hardware failures.",
        example_sentence: "Multi-region database replication enhances the system's operational resilience.",
        synonyms: ["durability", "robustness", "toughness"],
        memory_tip: "Resilient systems spring back into shape immediately after a crash."
      },
      {
        word: "deterministic",
        pronunciation: "di-tur-min-IS-tik",
        part_of_speech: "adjective",
        meaning: "Yielding the exact same output every single time given identical initial conditions and inputs.",
        example_sentence: "Cryptographic hash functions must be entirely deterministic to ensure integrity.",
        synonyms: ["predictable", "reproducible", "invariable"],
        memory_tip: "Determined from the start—no random chance involved."
      },
      {
        word: "heuristics",
        pronunciation: "hyoo-RIS-tiks",
        part_of_speech: "noun",
        meaning: "Practical problem-solving techniques or rules of thumb that find quick, satisfactory solutions.",
        example_sentence: "Antivirus software relies on behavioral heuristics to identify zero-day malware threats.",
        synonyms: ["rule of thumb", "shortcut", "practical method"],
        memory_tip: "From Greek 'heuriskein' (to discover)—the root of Archimedes' 'Eureka!'."
      },
      {
        word: "obfuscate",
        pronunciation: "OB-fuh-skayt",
        part_of_speech: "verb",
        meaning: "To make something obscure, unclear, or difficult to understand deliberately.",
        example_sentence: "The developers obfuscated the production JavaScript code to safeguard intellectual property.",
        synonyms: ["confuse", "blur", "obscure"],
        memory_tip: "Obfuscation throws thick fog over clean logic."
      },
      {
        word: "telemetry",
        pronunciation: "tuh-LEM-i-tree",
        part_of_speech: "noun",
        meaning: "The automated collection and transmission of operational measurements and metrics from remote devices.",
        example_sentence: "Real-time telemetry alerted the DevOps team to sudden server memory spikes.",
        synonyms: ["monitoring", "metrics", "instrumentation"],
        memory_tip: "'Tele-' (distant) + 'metry' (measuring)—measuring performance from afar."
      },
      {
        word: "concurrency",
        pronunciation: "kuhn-KUR-uhn-see",
        part_of_speech: "noun",
        meaning: "The ability of different parts of a program or task to execute out-of-order without affecting the final outcome.",
        example_sentence: "Go's lightweight goroutines make handling high concurrency straightforward.",
        synonyms: ["simultaneity", "parallelism", "co-occurrence"],
        memory_tip: "Running concurrent threads side by side like runners on adjacent track lanes."
      }
    ]
  },
  {
    set_id: "vocab-emotions",
    title: "Emotions & Psychology",
    tagline: "Feelings, Demeanor & Human Nature",
    description: "Deep, nuanced vocabulary for expressing subtle psychological states, empathy, temperament, and emotional resilience.",
    color: "#ec4899",
    badge: "Emotional Intelligence",
    words: [
      {
        word: "empathy",
        pronunciation: "EM-puh-thee",
        part_of_speech: "noun",
        meaning: "The ability to understand and share the feelings of another person.",
        example_sentence: "Practicing empathy allows leaders to resolve conflicts with warmth and mutual respect.",
        synonyms: ["compassion", "understanding", "sensitivity"],
        memory_tip: "Sympathy is feeling for someone; empathy is stepping into their exact shoes."
      },
      {
        word: "serene",
        pronunciation: "suh-REEN",
        part_of_speech: "adjective",
        meaning: "Calm, peaceful, and untroubled; completely tranquil.",
        example_sentence: "She sat by the quiet mountain lake with a serene expression on her face.",
        synonyms: ["tranquil", "placid", "peaceful"],
        memory_tip: "Serenity is a calm sky untouched by storms."
      },
      {
        word: "apprehensive",
        pronunciation: "ap-ri-HEN-siv",
        part_of_speech: "adjective",
        meaning: "Anxious or fearful that something unpleasant or bad will happen.",
        example_sentence: "He was apprehensive about stepping onto the stage for his opening speech.",
        synonyms: ["anxious", "uneasy", "nervous"],
        memory_tip: "Apprehensive people are bracing themselves for trouble."
      },
      {
        word: "stoic",
        pronunciation: "STOH-ik",
        part_of_speech: "adjective",
        meaning: "Enduring pain or hardship without showing feelings or complaining.",
        example_sentence: "Throughout the crisis, she maintained a stoic demeanor that comforted her team.",
        synonyms: ["impassive", "resigned", "unflinching"],
        memory_tip: "Like the ancient Stoic philosophers—remaining steady no matter how the wind blows."
      },
      {
        word: "euphoric",
        pronunciation: "yoo-FOR-ik",
        part_of_speech: "adjective",
        meaning: "Characterized by or feeling intense excitement, happiness, and elation.",
        example_sentence: "The team felt euphoric when the final whistle blew and they had won the championship.",
        synonyms: ["elated", "overjoyed", "ecstatic"],
        memory_tip: "Euphoria is peak joy—walking on air."
      },
      {
        word: "melancholy",
        pronunciation: "MEL-uhn-kol-ee",
        part_of_speech: "noun",
        meaning: "A deep, pensive, and long-lasting sadness, typically with no obvious cause.",
        example_sentence: "Listening to the slow piano melody filled the room with a gentle melancholy.",
        synonyms: ["wistfulness", "sorrow", "despondency"],
        memory_tip: "Melancholy is sweet, reflective sadness—like watching autumn leaves fall."
      },
      {
        word: "resilient",
        pronunciation: "ri-ZIL-yuhnt",
        part_of_speech: "adjective",
        meaning: "Able to withstand or recover quickly from difficult conditions, trauma, or setbacks.",
        example_sentence: "Children are often remarkably resilient when supported by caring communities.",
        synonyms: ["buoyant", "tough", "tenacious"],
        memory_tip: "Like a green bamboo stalk bending under heavy snow without snapping."
      },
      {
        word: "indifferent",
        pronunciation: "in-DIF-ruhnt",
        part_of_speech: "adjective",
        meaning: "Having no particular interest or sympathy; unconcerned and detached.",
        example_sentence: "He seemed entirely indifferent to whether the proposal was accepted or rejected.",
        synonyms: ["apathetic", "aloof", "unconcerned"],
        memory_tip: "To you, both outcomes make zero difference."
      },
      {
        word: "exuberant",
        pronunciation: "ig-ZOO-bur-uhnt",
        part_of_speech: "adjective",
        meaning: "Filled with or characterized by a lively energy and joyful excitement.",
        example_sentence: "The crowd gave an exuberant cheer as the festival fireworks erupted into the sky.",
        synonyms: ["buoyant", "effervescent", "vivacious"],
        memory_tip: "Exuberance overflows like sparkling water over the rim of a glass."
      },
      {
        word: "ambivalent",
        pronunciation: "am-BIV-uh-luhnt",
        part_of_speech: "adjective",
        meaning: "Having mixed feelings or contradictory ideas about something or someone.",
        example_sentence: "She was ambivalent about moving abroad—excited for adventure yet sad to leave family.",
        synonyms: ["conflicted", "undecided", "torn"],
        memory_tip: "'Ambi-' means both; pulling your heart in two directions at the exact same moment."
      }
    ]
  },
  {
    set_id: "vocab-science",
    title: "Science, Nature & Environment",
    tagline: "Ecology, Cosmos & Physical World",
    description: "Descriptive terms for ecological balance, cosmic exploration, biological organisms, and planetary stewardship.",
    color: "#14b8a6",
    badge: "Natural World",
    words: [
      {
        word: "biodiversity",
        pronunciation: "by-oh-dy-VUR-si-tee",
        part_of_speech: "noun",
        meaning: "The variety of plant and animal life in the world or in a particular habitat.",
        example_sentence: "Coral reefs support a magnificent biodiversity rivaling tropical rainforests.",
        synonyms: ["ecological variety", "species richness"],
        memory_tip: "'Bio' (life) + 'diversity' (variety)—the rich tapestry of earthly species."
      },
      {
        word: "sustainable",
        pronunciation: "suh-STAY-nuh-buhl",
        part_of_speech: "adjective",
        meaning: "Able to be maintained at a certain rate or level without depleting natural resources.",
        example_sentence: "Solar and geothermal energy provide sustainable alternatives to fossil fuels.",
        synonyms: ["renewable", "viable", "enduring"],
        memory_tip: "Can you sustain it for 100 years without destroying the environment?"
      },
      {
        word: "catalyst",
        pronunciation: "KAT-uh-list",
        part_of_speech: "noun",
        meaning: "A substance that speeds up a chemical reaction; a person or event that causes sudden change.",
        example_sentence: "The publication of the climate treatise served as a catalyst for global environmental policy.",
        synonyms: ["spark", "stimulus", "impulse"],
        memory_tip: "A catalyst accelerates transformation without being consumed itself."
      },
      {
        word: "equilibrium",
        pronunciation: "ee-kwuh-LIB-ree-uhm",
        part_of_speech: "noun",
        meaning: "A state in which opposing forces or influences are balanced.",
        example_sentence: "Predators and prey maintain a delicate ecological equilibrium within the forest.",
        synonyms: ["balance", "stability", "poise"],
        memory_tip: "'Equi-' means equal; keeping both pans of the scale in perfect balance."
      },
      {
        word: "celestial",
        pronunciation: "suh-LES-chuhl",
        part_of_speech: "adjective",
        meaning: "Positioned in or relating to the sky, or outer space as observed in astronomy.",
        example_sentence: "Ancient mariners navigated across oceans by tracking celestial bodies.",
        synonyms: ["astronomical", "stellar", "heavenly"],
        memory_tip: "Celestial phenomena take place up in the great expanse of space."
      },
      {
        word: "symbiotic",
        pronunciation: "sim-by-OT-ik",
        part_of_speech: "adjective",
        meaning: "Involving interaction between two different organisms living in close physical association, typically to mutual advantage.",
        example_sentence: "Bees and flowering plants share a deeply symbiotic relationship.",
        synonyms: ["mutualistic", "interdependent", "cooperative"],
        memory_tip: "Living together in mutual harmony and nourishment."
      },
      {
        word: "permeate",
        pronunciation: "PUR-mee-ayt",
        part_of_speech: "verb",
        meaning: "To spread throughout every part of something; to diffuse or penetrate thoroughly.",
        example_sentence: "Water began to slowly permeate through the porous limestone caves.",
        synonyms: ["penetrate", "saturate", "pervade"],
        memory_tip: "A strong aroma of roasted coffee will quickly permeate the entire house."
      },
      {
        word: "volatile",
        pronunciation: "VOL-uh-tuhl",
        part_of_speech: "adjective",
        meaning: "Evaporating rapidly; liable to change rapidly and unpredictably, especially for the worse.",
        example_sentence: "Ether is a highly volatile chemical compound that evaporates in seconds.",
        synonyms: ["unstable", "fickle", "evaporative"],
        memory_tip: "Volatile compounds vaporize into air; volatile markets swing up and down wildly."
      },
      {
        word: "deplete",
        pronunciation: "di-PLEET",
        part_of_speech: "verb",
        meaning: "To use up the supply or resources of something.",
        example_sentence: "Overfishing threatens to deplete marine populations across the Atlantic ocean.",
        synonyms: ["exhaust", "drain", "diminish"],
        memory_tip: "Opposite of 'complete'—drain the tank until nothing remains."
      },
      {
        word: "indigenous",
        pronunciation: "in-DIJ-uh-nuhs",
        part_of_speech: "adjective",
        meaning: "Originating or occurring naturally in a particular place; native.",
        example_sentence: "The redwood tree is indigenous to the coastal regions of Northern California.",
        synonyms: ["native", "aboriginal", "endemic"],
        memory_tip: "Growing natively right from the soil where it was originally born."
      }
    ]
  },
  {
    set_id: "vocab-culture",
    title: "Travel, Culture & Society",
    tagline: "Exploration, Heritage & Global Traditions",
    description: "Words for world cultures, wanderlust, architectural wonders, social customs, and cosmopolitan journeys.",
    color: "#f59e0b",
    badge: "Cosmopolitan World",
    words: [
      {
        word: "picturesque",
        pronunciation: "pik-chuh-RESK",
        part_of_speech: "adjective",
        meaning: "Visually attractive, especially in a quaint or charming, postcard-worthy style.",
        example_sentence: "The village is known for its picturesque stone cottages and blooming flower boxes.",
        synonyms: ["scenic", "charming", "idyllic"],
        memory_tip: "So beautiful that it belongs framed inside a picture."
      },
      {
        word: "cosmopolitan",
        pronunciation: "koz-muh-POL-i-tuhn",
        part_of_speech: "adjective",
        meaning: "Familiar with and at ease in many different countries and diverse cultures.",
        example_sentence: "London is a vibrant cosmopolitan metropolis where over three hundred languages are spoken.",
        synonyms: ["multicultural", "global", "sophisticated"],
        memory_tip: "A 'citizen of the cosmos' who feels at home in any world capital."
      },
      {
        word: "itinerary",
        pronunciation: "eye-TIN-uh-rer-ee",
        part_of_speech: "noun",
        meaning: "A planned route or journey; a detailed timetable of events and destinations.",
        example_sentence: "Our two-week itinerary through Japan included Tokyo, Kyoto, and Hiroshima.",
        synonyms: ["schedule", "route", "travel plan"],
        memory_tip: "Your step-by-step travel agenda from airport to museum."
      },
      {
        word: "hospitality",
        pronunciation: "hos-pi-TAL-i-tee",
        part_of_speech: "noun",
        meaning: "The friendly and generous reception and entertainment of guests, visitors, or strangers.",
        example_sentence: "We were overwhelmed by the warm hospitality of the local mountain villagers.",
        synonyms: ["cordiality", "welcoming", "generosity"],
        memory_tip: "Welcoming someone into your home like family."
      },
      {
        word: "monumental",
        pronunciation: "mon-yuh-MEN-tl",
        part_of_speech: "adjective",
        meaning: "Great in importance, extent, or size; comparable to a permanent monument.",
        example_sentence: "Constructing the ancient pyramids was a monumental feat of engineering.",
        synonyms: ["colossal", "historic", "mammoth"],
        memory_tip: "As grand and lasting as a stone monument."
      },
      {
        word: "heritage",
        pronunciation: "HER-i-tij",
        part_of_speech: "noun",
        meaning: "Property, traditions, or values that are or may be inherited from past generations.",
        example_sentence: "The festival celebrates the rich culinary and musical heritage of the Mediterranean.",
        synonyms: ["legacy", "ancestry", "tradition"],
        memory_tip: "What our ancestors built and handed down to us as an inheritance."
      },
      {
        word: "breathtaking",
        pronunciation: "BRETH-tay-king",
        part_of_speech: "adjective",
        meaning: "Astonishing or awe-inspiring in quality, scenery, or beauty.",
        example_sentence: "Reaching the summit rewarded the hikers with a breathtaking panoramic view of the sunrise.",
        synonyms: ["spectacular", "stunning", "awe-inspiring"],
        memory_tip: "So gorgeous that you literally gasp for breath."
      },
      {
        word: "sojourn",
        pronunciation: "SOH-jurn",
        part_of_speech: "noun",
        meaning: "A temporary stay at a particular place away from one's home.",
        example_sentence: "During her six-month sojourn in Florence, she studied Renaissance art history.",
        synonyms: ["stay", "visit", "stopover"],
        memory_tip: "A restful pause in another land before continuing your voyage."
      },
      {
        word: "bustling",
        pronunciation: "BUS-ling",
        part_of_speech: "adjective",
        meaning: "Full of energetic, noisy activity and moving people.",
        example_sentence: "We navigated through the bustling spice markets of Marrakech.",
        synonyms: ["lively", "vibrant", "swarming"],
        memory_tip: "Busy streets where crowds hustle and bustle."
      },
      {
        word: "immersed",
        pronunciation: "i-MURST",
        part_of_speech: "adjective",
        meaning: "Deeply involved or submerged in an activity, culture, or language.",
        example_sentence: "Spending a year living with a host family allowed him to become fully immersed in Spanish.",
        synonyms: ["absorbed", "submerged", "engrossed"],
        memory_tip: "Diving completely underwater so that you surround yourself in the language."
      }
    ]
  },
  {
    set_id: "vocab-arts",
    title: "Literature, Arts & Eloquence",
    tagline: "Creative Expression & Aesthetic Precision",
    description: "Expressive vocabulary for creative writing, narrative craft, poetic eloquence, and artistic appraisal.",
    color: "#a855f7",
    badge: "Aesthetic Mastery",
    words: [
      {
        word: "eloquent",
        pronunciation: "EL-uh-kwuhnt",
        part_of_speech: "adjective",
        meaning: "Fluent, persuasive, and beautifully expressive in speaking or writing.",
        example_sentence: "Her eloquent speech moved many in the audience to tears.",
        synonyms: ["articulate", "poetic", "silver-tongued"],
        memory_tip: "Words that flow like melodic music and reach the heart effortlessly."
      },
      {
        word: "evocative",
        pronunciation: "i-VOK-uh-tiv",
        part_of_speech: "adjective",
        meaning: "Bringing strong images, memories, or feelings to mind.",
        example_sentence: "The poet used evocative metaphors that captured the bitter chill of winter.",
        synonyms: ["reminiscent", "expressive", "vivid"],
        memory_tip: "It 'evokes' (calls forth) vivid sensations in the reader's imagination."
      },
      {
        word: "ephemeral",
        pronunciation: "i-FEM-er-uhl",
        part_of_speech: "adjective",
        meaning: "Lasting for a very short time; fleeting and transitory.",
        example_sentence: "Cherry blossoms offer an ephemeral beauty that disappears after a single rainstorm.",
        synonyms: ["fleeting", "transient", "momentary"],
        memory_tip: "A firefly flash—glowing brilliantly for a split second, then vanishing."
      },
      {
        word: "aesthetic",
        pronunciation: "es-THET-ik",
        part_of_speech: "noun",
        meaning: "A set of principles underlying and guiding the work of a particular artist or artistic movement.",
        example_sentence: "The minimalist architect maintained a clean aesthetic defined by concrete and natural wood.",
        synonyms: ["style", "artistry", "taste"],
        memory_tip: "How something looks, feels, and harmonizes with the senses."
      },
      {
        word: "nuance",
        pronunciation: "NOO-ahns",
        part_of_speech: "noun",
        meaning: "A subtle difference in or shade of meaning, expression, sound, or color.",
        example_sentence: "An experienced translator captures every cultural nuance of the original poetry.",
        synonyms: ["subtlety", "refinement", "gradation"],
        memory_tip: "Not just black and white, but every delicate shade in between."
      },
      {
        word: "mellifluous",
        pronunciation: "muh-LIF-loo-uhs",
        part_of_speech: "adjective",
        meaning: "Pleasingly smooth and musical to hear; sweet-sounding like flowing honey.",
        example_sentence: "The narrator possessed a calm, mellifluous voice that kept listeners enthralled.",
        synonyms: ["dulcet", "melodious", "harmonious"],
        memory_tip: "'Mel' is Latin for honey—words that pour like warm honey."
      },
      {
        word: "prolific",
        pronunciation: "pruh-LIF-ik",
        part_of_speech: "adjective",
        meaning: "Producing much fruit or foliage, or a large amount of creative work.",
        example_sentence: "Picasso was an astonishingly prolific artist who created thousands of sculptures and canvases.",
        synonyms: ["productive", "abundant", "copious"],
        memory_tip: "A mind that continually produces work like a bountiful orchard."
      },
      {
        word: "vivid",
        pronunciation: "VIV-id",
        part_of_speech: "adjective",
        meaning: "Producing powerful, bright, or clear feelings or images in the mind.",
        example_sentence: "She provided a vivid description of the bustling street market at twilight.",
        synonyms: ["graphic", "brilliant", "lifelike"],
        memory_tip: "From 'vivere' (to live)—scenes that feel thoroughly alive."
      },
      {
        word: "allusion",
        pronunciation: "uh-LOO-zhuhn",
        part_of_speech: "noun",
        meaning: "An expression designed to call something to mind without mentioning it explicitly; an indirect reference.",
        example_sentence: "The novel contains subtle allusions to Greek mythology throughout its chapters.",
        synonyms: ["reference", "intimation", "suggestion"],
        memory_tip: "A wink to the reader pointing at a classic story."
      },
      {
        word: "catharsis",
        pronunciation: "kuh-THAR-sis",
        part_of_speech: "noun",
        meaning: "The process of releasing and thereby providing relief from strong or repressed emotions.",
        example_sentence: "Writing the autobiographical memoir provided the author with emotional catharsis.",
        synonyms: ["purging", "cleansing", "release"],
        memory_tip: "The deep breath and relief after crying your heart out in a powerful theater drama."
      }
    ]
  },
  {
    set_id: "vocab-media",
    title: "Media, Rhetoric & Current Affairs",
    tagline: "Journalism, Public Discourse & Debates",
    description: "Analytical terminology for navigating modern news, rhetoric, public debates, and civic discussions.",
    color: "#e11d48",
    badge: "Public Discourse",
    words: [
      {
        word: "polarize",
        pronunciation: "POH-luh-ryz",
        part_of_speech: "verb",
        meaning: "To divide or cause to divide into two sharply contrasting groups or sets of opinions.",
        example_sentence: "The controversial tax legislation threatened to polarize the national electorate.",
        synonyms: ["divide", "split", "factionalize"],
        memory_tip: "Pushing people toward North and South poles with no middle ground."
      },
      {
        word: "sensationalize",
        pronunciation: "sen-SAY-shuh-nuh-lyz",
        part_of_speech: "verb",
        meaning: "To present information about something in a way that provokes public excitement at the expense of accuracy.",
        example_sentence: "Tabloid headlines frequently sensationalize minor celebrity disagreements.",
        synonyms: ["exaggerate", "dramatize", "overstate"],
        memory_tip: "Chasing sensational clicks rather than truthful reporting."
      },
      {
        word: "partisan",
        pronunciation: "PAHR-tuh-zuhn",
        part_of_speech: "adjective",
        meaning: "Prejudiced in favor of a particular political party, cause, or faction.",
        example_sentence: "Viewers sought independent analysis rather than partisan political commentary.",
        synonyms: ["biased", "one-sided", "sectarian"],
        memory_tip: "Fighting exclusively for your own 'party' regardless of the facts."
      },
      {
        word: "disinformation",
        pronunciation: "dis-in-fer-MAY-shuhn",
        part_of_speech: "noun",
        meaning: "False information deliberately created and spread to deceive people or manipulate opinion.",
        example_sentence: "Intelligence agencies warned against coordinated disinformation campaigns during elections.",
        synonyms: ["propaganda", "fabrication", "hoax"],
        memory_tip: "Misinformation is mistaken; disinformation is deliberate deception."
      },
      {
        word: "advocate",
        pronunciation: "AD-vuh-kayt",
        part_of_speech: "verb",
        meaning: "To publicly recommend or support a particular policy, cause, or social change.",
        example_sentence: "Environmentalists actively advocate for clean drinking water in rural townships.",
        synonyms: ["champion", "endorse", "promote"],
        memory_tip: "'Vocal' advocate—using your voice to defend a worthy cause."
      },
      {
        word: "rhetoric",
        pronunciation: "RET-er-ik",
        part_of_speech: "noun",
        meaning: "The art of effective or persuasive speaking or writing, especially the use of figures of speech.",
        example_sentence: "Beyond the heated campaign rhetoric, voters demanded concrete economic plans.",
        synonyms: ["oratory", "eloquence", "persuasion"],
        memory_tip: "The craft of shaping words to sway the hearts and minds of a crowd."
      },
      {
        word: "consensus",
        pronunciation: "kuhn-SEN-suhs",
        part_of_speech: "noun",
        meaning: "General agreement among a group of people.",
        example_sentence: "The committee reached a unanimous consensus on the proposed safety guidelines.",
        synonyms: ["agreement", "harmony", "unanimity"],
        memory_tip: "When everyone consents to the shared path forward."
      },
      {
        word: "transparency",
        pronunciation: "trans-PAIR-uhn-see",
        part_of_speech: "noun",
        meaning: "Openness and accountability in operating, allowing citizens to examine decisions clearly.",
        example_sentence: "Citizens demanded complete financial transparency from municipal officials.",
        synonyms: ["openness", "candor", "clarity"],
        memory_tip: "A clear glass window where nothing is hidden in dark backrooms."
      }
    ]
  },
  {
    set_id: "vocab-idioms",
    title: "Idioms & Natural Collocations",
    tagline: "Figurative Phrases & Native Nuances",
    description: "Rich figurative expressions and collocations native speakers use to convey meaning with color and flair.",
    color: "#0284c7",
    badge: "Natural Idioms",
    words: [
      {
        word: "bite the bullet",
        pronunciation: "byte thuh BOOL-it",
        part_of_speech: "phrase",
        meaning: "To face an inevitable grim situation with courage and fortitude.",
        example_sentence: "After postponing dental surgery for months, he decided to bite the bullet and book it.",
        synonyms: ["face the music", "brace oneself", "take the plunge"],
        memory_tip: "Soldiers in field medicine would bite a lead bullet to endure painful operations."
      },
      {
        word: "hit the ground running",
        pronunciation: "hit thuh grownd RUN-ing",
        part_of_speech: "phrase",
        meaning: "To begin an activity or job immediately with maximum energy, speed, and enthusiasm.",
        example_sentence: "The new project director hit the ground running, launching three campaigns in week one.",
        synonyms: ["start fast", "waste no time"],
        memory_tip: "Like paratroopers who land on their feet and sprint immediately."
      },
      {
        word: "burn the midnight oil",
        pronunciation: "burn thuh MID-nyte oyl",
        part_of_speech: "phrase",
        meaning: "To work, read, or study late into the night.",
        example_sentence: "Medical students frequently burn the midnight oil before national licensing exams.",
        synonyms: ["work late", "pull an all-nighter"],
        memory_tip: "Studying by the glow of an oil lamp long after dark."
      },
      {
        word: "on the fence",
        pronunciation: "on thuh fens",
        part_of_speech: "phrase",
        meaning: "Undecided between two choices; remaining neutral without committing.",
        example_sentence: "Many voters remained on the fence until the final presidential debate.",
        synonyms: ["undecided", "hesitant", "vacillating"],
        memory_tip: "Sitting atop the fence between two yards, unable to pick which side to jump down."
      },
      {
        word: "see eye to eye",
        pronunciation: "see eye too eye",
        part_of_speech: "phrase",
        meaning: "To agree with someone fully on a matter.",
        example_sentence: "Though they were close friends, they rarely saw eye to eye on modern architecture.",
        synonyms: ["concur", "agree", "harmonize"],
        memory_tip: "Looking straight into each other's eyes in complete mutual agreement."
      },
      {
        word: "the tip of the iceberg",
        pronunciation: "thuh tip ov thuh EYE-sburg",
        part_of_speech: "phrase",
        meaning: "A tiny discernible part of a much larger, unseen problem or reality.",
        example_sentence: "The initial complaints were just the tip of the iceberg regarding the software flaws.",
        synonyms: ["glimpse", "surface indicator"],
        memory_tip: "90% of a massive iceberg is hidden beneath the dark water."
      },
      {
        word: "break the ice",
        pronunciation: "brayk thuh ice",
        part_of_speech: "phrase",
        meaning: "To do or say something that relieves tension or social awkwardness at a first meeting.",
        example_sentence: "The facilitator played a lighthearted trivia game to break the ice among participants.",
        synonyms: ["warm up", "ease tension"],
        memory_tip: "Breaking the cold sheet of ice on a frozen river so ships can move freely."
      },
      {
        word: "cut corners",
        pronunciation: "kuht KOR-nerz",
        part_of_speech: "phrase",
        meaning: "To do something in the easiest, cheapest, or fastest way, often sacrificing safety or quality.",
        example_sentence: "The contractor cut corners on insulation, leading to freezing pipes in winter.",
        synonyms: ["skimp", "take shortcuts"],
        memory_tip: "Clipping the corner off a square path instead of walking the full perimeter."
      }
    ]
  },
  {
    set_id: "vocab-formal",
    title: "Formal, Legal & Official",
    tagline: "Contracts, Compliance & Official Agreements",
    description: "Precise terminology for legal contracts, institutional compliance, diplomacy, and administrative governance.",
    color: "#64748b",
    badge: "Official & Legal",
    words: [
      {
        word: "stipulate",
        pronunciation: "STIP-yuh-layt",
        part_of_speech: "verb",
        meaning: "To demand or specify a requirement typically as part of a formal bargain or legal contract.",
        example_sentence: "The lease agreement stipulates that rent must be paid on the first day of every month.",
        synonyms: ["specify", "prescribe", "require"],
        memory_tip: "Putting down an explicit rule on paper that both parties sign."
      },
      {
        word: "indemnify",
        pronunciation: "in-DEM-nuh-fy",
        part_of_speech: "verb",
        meaning: "To compensate someone for harm or loss; to secure someone against legal liability for their actions.",
        example_sentence: "The company agreed to indemnify the contractor against third-party lawsuits.",
        synonyms: ["compensate", "reimburse", "protect"],
        memory_tip: "'Damnify' meant to cause damage; 'in-damnify' removes the damage."
      },
      {
        word: "jurisdiction",
        pronunciation: "joor-is-DIK-shuhn",
        part_of_speech: "noun",
        meaning: "The official power to make legal decisions and judgments over a defined territory or domain.",
        example_sentence: "The state police had no legal jurisdiction outside municipal county borders.",
        synonyms: ["authority", "dominion", "purview"],
        memory_tip: "Where your legal words ('diction') hold lawful power ('juris')."
      },
      {
        word: "nonchalant",
        pronunciation: "non-shuh-LAHNT",
        part_of_speech: "adjective",
        meaning: "Feeling or appearing casually calm and relaxed; displaying no anxiety or enthusiasm.",
        example_sentence: "He gave a nonchalant shrug when asked about the strict deadline.",
        synonyms: ["unconcerned", "cool", "casual"],
        memory_tip: "Not breaking a sweat even when others are panicking."
      },
      {
        word: "compliance",
        pronunciation: "kuhm-PLY-uhns",
        part_of_speech: "noun",
        meaning: "The action or fact of complying with a wish, command, law, or corporate policy.",
        example_sentence: "The medical laboratory underwent an annual audit to certify environmental compliance.",
        synonyms: ["conformity", "adherence", "observance"],
        memory_tip: "Complying with the checklist from rule 1 to rule 100."
      },
      {
        word: "binding",
        pronunciation: "BYN-ding",
        part_of_speech: "adjective",
        meaning: "Imposing a legal or contractual obligation that cannot be broken without penalties.",
        example_sentence: "Once signed by both executives, the non-disclosure agreement became legally binding.",
        synonyms: ["obligatory", "mandatory", "enforceable"],
        memory_tip: "Ropes that tie both parties to their spoken promise."
      },
      {
        word: "remedy",
        pronunciation: "REM-uh-dee",
        part_of_speech: "noun",
        meaning: "A legal means of enforcing a right, preventing a wrong, or compensating for an injury.",
        example_sentence: "Financial damages were the plaintiff's primary legal remedy in the breach of contract suit.",
        synonyms: ["redress", "restitution", "cure"],
        memory_tip: "Medicine for a wound—in court, a remedy restores what was wrongfully taken."
      },
      {
        word: "precedent",
        pronunciation: "PRES-i-duhnt",
        part_of_speech: "noun",
        meaning: "An earlier event or judicial decision that serves as an example or rule for subsequent situations.",
        example_sentence: "The Supreme Court verdict set a monumental precedent for future digital privacy rulings.",
        synonyms: ["exemplar", "benchmark", "model"],
        memory_tip: "What went 'pre-' (before) guides what happens next."
      }
    ]
  },
  {
    set_id: "vocab-expressive",
    title: "Expressive Modifiers & Vivid Adjectives",
    tagline: "Sensory Detail, Intensity & Sophistication",
    description: "Evocative adjectives and adverbs that elevate your spoken and written expression with razor-sharp imagery.",
    color: "#8b5cf6",
    badge: "Stylistic Precision",
    words: [
      {
        word: "meticulous",
        pronunciation: "muh-TIK-yuh-luhs",
        part_of_speech: "adjective",
        meaning: "Showing great attention to detail; very careful and precise.",
        example_sentence: "The watchmaker assembled the mechanical clockwork with meticulous precision.",
        synonyms: ["painstaking", "scrupulous", "exacting"],
        memory_tip: "Checking every millimeter twice to ensure perfection."
      },
      {
        word: "pristine",
        pronunciation: "PRIS-teen",
        part_of_speech: "adjective",
        meaning: "In its original condition; unspoiled, fresh, and clean as if completely new.",
        example_sentence: "The deep mountain snow was completely pristine, untouched by human footsteps.",
        synonyms: ["immaculate", "flawless", "untarnished"],
        memory_tip: "Crisp, fresh, spotless white sheet of paper."
      },
      {
        word: "audacious",
        pronunciation: "aw-DAY-shuhs",
        part_of_speech: "adjective",
        meaning: "Showing a willingness to take surprisingly bold risks; fearless.",
        example_sentence: "The architect presented an audacious design featuring suspended glass bridges.",
        synonyms: ["bold", "daring", "intrepid"],
        memory_tip: "Audacity takes big risks that leave onlookers in awe."
      },
      {
        word: "resplendent",
        pronunciation: "ri-SPLEN-duhnt",
        part_of_speech: "adjective",
        meaning: "Attractive and impressive through being richly colorful or shining brilliantly.",
        example_sentence: "The ballroom looked resplendent under the glow of three golden chandeliers.",
        synonyms: ["splendid", "radiant", "glorious"],
        memory_tip: "'Splendor' in full bloom—shining with dazzling light."
      },
      {
        word: "tenacious",
        pronunciation: "tuh-NAY-shuhs",
        part_of_speech: "adjective",
        meaning: "Tending to keep a firm hold of something; persistent, determined, and stubborn in pursuing goals.",
        example_sentence: "Her tenacious investigative reporting uncovered the truth after eighteen months.",
        synonyms: ["persistent", "persevering", "resolute"],
        memory_tip: "Like an eagle with talons gripped firmly—never letting go."
      },
      {
        word: "ineffable",
        pronunciation: "in-EF-uh-buhl",
        part_of_speech: "adjective",
        meaning: "Too great or extreme to be expressed or described in mere words.",
        example_sentence: "Standing at the edge of the Grand Canyon filled them with ineffable wonder.",
        synonyms: ["indescribable", "unutterable", "transcendent"],
        memory_tip: "Words fail to capture its staggering majesty."
      },
      {
        word: "ubiquitous",
        pronunciation: "yoo-BIK-wuh-tuhs",
        part_of_speech: "adjective",
        meaning: "Present, appearing, or found everywhere simultaneously.",
        example_sentence: "Coffee culture has become ubiquitous across contemporary international capitals.",
        synonyms: ["omnipresent", "pervasive", "everywhere"],
        memory_tip: "Turn around any corner and there it is."
      },
      {
        word: "formidable",
        pronunciation: "FOR-mi-duh-buhl",
        part_of_speech: "adjective",
        meaning: "Inspiring fear, dread, or profound respect through being impressively large, powerful, or capable.",
        example_sentence: "The defending world champions proved to be a formidable opponent.",
        synonyms: ["daunting", "imposing", "intimidating"],
        memory_tip: "A mountain or opponent so tough that you pause in respect."
      }
    ]
  },
  {
    set_id: "vocab-science-thought",
    title: "Critical Thinking & Cognitive Clarity",
    tagline: "Logic, Biases & Mindset",
    description: "Sophisticated vocabulary for identifying mental fallacies, cognitive patterns, discernment, and intellectual clarity.",
    color: "#22c55e",
    badge: "Cognitive Mastery",
    words: [
      {
        word: "fallacy",
        pronunciation: "FAL-uh-see",
        part_of_speech: "noun",
        meaning: "A mistaken belief or a flaw in reasoning that invalidates an argument.",
        example_sentence: "Assuming correlation proves causation is a notorious logical fallacy.",
        synonyms: ["misconception", "delusion", "error in logic"],
        memory_tip: "A 'false' step in an argument's foundation."
      },
      {
        word: "cognizant",
        pronunciation: "KOG-ni-zuhnt",
        part_of_speech: "adjective",
        meaning: "Having knowledge, awareness, or being fully conscious of something.",
        example_sentence: "Engineers must remain cognizant of ethical risks when training machine learning algorithms.",
        synonyms: ["aware", "conscious", "mindful"],
        memory_tip: "Related to 'cognition'—having clear mental awareness."
      },
      {
        word: "discern",
        pronunciation: "di-SURN",
        part_of_speech: "verb",
        meaning: "To perceive, recognize, or distinguish something with careful perception.",
        example_sentence: "Through the thick fog, the lighthouse keeper could barely discern the distant ship.",
        synonyms: ["perceive", "detect", "distinguish"],
        memory_tip: "Sifting fine grain from chaff with your mind's eye."
      },
      {
        word: "nuanced",
        pronunciation: "NOO-ahnst",
        part_of_speech: "adjective",
        meaning: "Characterized by subtle distinctions and fine gradations in meaning or expression.",
        example_sentence: "The diplomat provided a nuanced assessment that acknowledged both sides' valid grievances.",
        synonyms: ["sophisticated", "subtle", "layered"],
        memory_tip: "Avoiding simplistic black-and-white generalizations."
      },
      {
        word: "pragmatic",
        pronunciation: "prag-MAT-ik",
        part_of_speech: "adjective",
        meaning: "Dealing with things sensibly and realistically based on practical considerations rather than theoretical ideals.",
        example_sentence: "In times of cash shortages, founders must adopt a pragmatic business strategy.",
        synonyms: ["practical", "down-to-earth", "realistic"],
        memory_tip: "Does it work in practice right now on the ground?"
      },
      {
        word: "rationalize",
        pronunciation: "RASH-uh-nuh-lyz",
        part_of_speech: "verb",
        meaning: "To attempt to explain or justify behavior or an attitude with logical reasons, even if they are not genuine.",
        example_sentence: "He tried to rationalize missing the team deadline by blaming his slow internet connection.",
        synonyms: ["justify", "excuse", "vindicate"],
        memory_tip: "Making up clever rational excuses after making a mistake."
      },
      {
        word: "skepticism",
        pronunciation: "SKEP-tuh-siz-uhm",
        part_of_speech: "noun",
        meaning: "An attitude of doubt or a disposition to incredulity either in general or toward a particular claim.",
        example_sentence: "The research community greeted the sensational claims with healthy scientific skepticism.",
        synonyms: ["doubt", "incredulity", "scrutiny"],
        memory_tip: "Demanding proof before blindly accepting extraordinary claims."
      },
      {
        word: "intuition",
        pronunciation: "in-too-ISH-uhn",
        part_of_speech: "noun",
        meaning: "The ability to understand something instinctively without the need for conscious reasoning.",
        example_sentence: "Her intuition told her that the mysterious contract offer was too good to be true.",
        synonyms: ["instinct", "gut feeling", "sixth sense"],
        memory_tip: "Your subconscious mind recognizing a pattern before your words can explain it."
      }
    ]
  }
];

// Flat list of all words for rapid local searching
export const ALL_VOCABULARY_WORDS = VOCABULARY_CATEGORIES.flatMap((cat) =>
  cat.words.map((w) => ({
    ...w,
    category_id: cat.set_id,
    category_title: cat.title,
    category_color: cat.color
  }))
);

// Helper to look up a word locally in the built-in bank (case-insensitive substring or exact match)
export function findWordInDictionary(query) {
  if (!query || typeof query !== "string") return null;
  const q = query.trim().toLowerCase();
  if (!q) return null;

  // 1. Exact match first
  const exact = ALL_VOCABULARY_WORDS.find((w) => w.word.toLowerCase() === q);
  if (exact) return exact;

  // 2. Starts with query
  const startsWith = ALL_VOCABULARY_WORDS.find((w) => w.word.toLowerCase().startsWith(q));
  if (startsWith) return startsWith;

  // 3. Substring match in word, meaning, or synonyms
  const match = ALL_VOCABULARY_WORDS.find(
    (w) =>
      w.word.toLowerCase().includes(q) ||
      w.meaning.toLowerCase().includes(q) ||
      (w.synonyms && w.synonyms.some((s) => s.toLowerCase().includes(q)))
  );
  return match || null;
}

// Backward-compatibility alias for legacy code expecting VOCABULARY_SETS
export const VOCABULARY_SETS = VOCABULARY_CATEGORIES;
