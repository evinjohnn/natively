// Data source for programmatic /interview-questions/<role> pages.
//
// Each entry is rendered by src/pages/programmatic/InterviewQuestionsPage.tsx via
// SEOTemplate. Quality gate (see SEO plan): every entry must carry a substantial,
// UNIQUE intro and 8+ real questions with genuine approach notes — never thin
// boilerplate. Do NOT mass-generate role pages from a template string; each role's
// questions and guidance are hand-written. To add a role: append an entry here AND
// register the route in routes.tsx, App.tsx, scripts/prerender.js, and sitemap.xml.

export interface InterviewQuestion {
  q: string;
  approach: string;
}

export interface RoleQuestionSet {
  /** Locale-agnostic canonical path, e.g. "/interview-questions/software-engineer". */
  path: string;
  role: string;
  title: string;
  description: string;
  h1: string;
  /** 2–3 paragraph unique intro (HTML-free plain strings, one per paragraph). */
  intro: string[];
  /** Short note on how Natively helps for this role specifically. */
  nativelyAngle: string;
  questions: InterviewQuestion[];
  /** Related internal links (locale-agnostic paths handled by RelatedLinks too). */
  related: { to: string; label: string }[];
}

export const ROLE_QUESTION_SETS: RoleQuestionSet[] = [
  {
    path: "/interview-questions/software-engineer",
    role: "Software Engineer",
    title: "Software Engineer Interview Questions (2026) | Natively",
    description:
      "Common software engineer interview questions for 2026 — coding, system design, and behavioral — each with a clear approach to structuring a strong answer.",
    h1: "Software Engineer Interview Questions (2026)",
    intro: [
      "A software engineer interview is rarely a single test. Most loops mix a coding round (data structures and algorithms), one or more system design discussions, and a behavioral interview about how you work with others. Strong candidates prepare for all three, because a brilliant algorithm score won't offset a behavioral round where you can't describe a single concrete accomplishment.",
      "The questions below are representative of what you'll actually face at companies ranging from startups to large tech firms. For each one, the value isn't a memorized answer — it's the approach: how to scope the problem, what to say out loud, and which trade-offs to surface. Interviewers are evaluating your reasoning, not just your final output.",
      "Practice answering these the way you would in a real interview: talk through your thinking, state your assumptions, and narrate trade-offs. That habit is what separates candidates who freeze under pressure from those who stay structured.",
    ],
    nativelyAngle:
      "During a live software engineering interview, Natively transcribes the question, reads on-screen code via OCR, and suggests a structured answer in under 500 ms — locally, with nothing leaving your device. Use it to stay on track across the coding, system design, and behavioral rounds.",
    questions: [
      {
        q: "Reverse a linked list — iteratively and recursively.",
        approach:
          "State the pointer-rewiring invariant first (prev, curr, next). Walk the iterative O(n) time / O(1) space version, then contrast the recursive version's O(n) stack cost. Mention the edge cases interviewers probe: empty list and single node.",
      },
      {
        q: "Find the first non-repeating character in a string.",
        approach:
          "Clarify character set and case sensitivity. Two-pass hash map (count, then scan) is O(n). Note that an ordered structure or a 26-slot array beats a generic map when the alphabet is fixed.",
      },
      {
        q: "Detect a cycle in a linked list.",
        approach:
          "Lead with Floyd's tortoise-and-hare for O(1) space, and explain why the fast pointer must eventually meet the slow one inside a cycle. Offer the hash-set alternative and compare space.",
      },
      {
        q: "Design a function to validate balanced parentheses.",
        approach:
          "Stack-based, O(n). The insight to verbalize: every closing bracket must match the most recent unmatched opener — that 'most recent' is exactly a stack. Cover the early-exit and end-of-string-nonempty failure cases.",
      },
      {
        q: "Merge two sorted arrays / lists.",
        approach:
          "Two-pointer merge in O(n+m). If asked to merge in place into the first array, explain why filling from the back avoids overwriting unprocessed elements.",
      },
      {
        q: "How would you find the kth largest element in an array?",
        approach:
          "Offer three: sort O(n log n), a size-k min-heap O(n log k), and quickselect average O(n). State when each wins, and that quickselect's worst case is O(n²) without good pivot selection.",
      },
      {
        q: "Tell me about a time you disagreed with a teammate on a technical decision.",
        approach:
          "Use STAR. Pick a real disagreement with a constructive resolution. Emphasize how you made the call objective (data, a spike, a prototype) rather than who 'won'. End with the outcome and what you learned.",
      },
      {
        q: "Describe a project you're proud of and your specific contribution.",
        approach:
          "Scope to YOUR work, not the team's. Quantify impact (latency, revenue, adoption). Interviewers want to separate your contribution from the group's, so use 'I' more than 'we'.",
      },
      {
        q: "How do you approach debugging a production issue you can't reproduce locally?",
        approach:
          "Walk a method: reproduce conditions (logs, traces, feature flags), form a hypothesis, add targeted observability, bisect. Mention rollback as a parallel mitigation while you investigate.",
      },
      {
        q: "Why do you want to work here, and why are you leaving your current role?",
        approach:
          "Be specific about the company (a product, a value, a technical challenge) — generic answers read as low effort. Frame the departure around what you're moving toward, never as complaints about the past.",
      },
    ],
    related: [
      { to: "/interview-questions/google-software-engineer", label: "Google Software Engineer Interview Questions" },
      { to: "/interview-questions/meta-software-engineer", label: "Meta Software Engineer Interview Questions" },
      { to: "/interview-questions/amazon-software-engineer", label: "Amazon SDE Interview Questions" },
      { to: "/interview-questions/microsoft-software-engineer", label: "Microsoft Software Engineer Interview Questions" },
      { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper" },
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
    ],
  },
  {
    path: "/interview-questions/product-manager",
    role: "Product Manager",
    title: "Product Manager Interview Questions (2026) | Natively",
    description:
      "Common product manager interview questions for 2026 — product sense, execution, strategy, and behavioral — each with a framework for structuring a strong answer.",
    h1: "Product Manager Interview Questions (2026)",
    intro: [
      "Product manager interviews test judgment more than knowledge. A typical loop covers product sense (design and improve a product), execution and analytics (metrics, prioritization, trade-offs), strategy (market and business reasoning), and behavioral (leadership and influence without authority). There's rarely one right answer — interviewers want to see a structured, user-centered thought process.",
      "The questions below are the patterns you'll see repeatedly. For each, the approach matters more than the conclusion: define the user and goal, structure your answer with a visible framework, prioritize explicitly, and tie recommendations back to a metric. Rambling without structure is the most common way strong candidates lose PM rounds.",
      "Practice saying your framework out loud before you dive into specifics. 'Let me start by clarifying the goal and the target user, then I'll brainstorm solutions and prioritize' signals exactly the structured thinking interviewers are scoring.",
    ],
    nativelyAngle:
      "In a live PM interview, Natively transcribes the prompt and can surface a relevant framework or a metric you might forget — in real time, on your device. It helps you stay structured under pressure without reading from a script.",
    questions: [
      {
        q: "How would you improve [a product you use daily, e.g. Google Maps]?",
        approach:
          "Clarify which goal you're optimizing (engagement, retention, a segment). Pick a user persona, list their pain points, brainstorm solutions, then prioritize by impact vs effort. Close with how you'd measure success.",
      },
      {
        q: "Design a product for [a specific user group, e.g. elderly users].",
        approach:
          "Start with user needs and constraints, not features. Build personas, map the jobs-to-be-done, then propose an MVP. Explicitly state what you're cutting and why — scoping discipline is the signal.",
      },
      {
        q: "Our key metric dropped 15% last week. How do you investigate?",
        approach:
          "Segment before theorizing: is it a real drop or instrumentation? Slice by platform, geography, cohort, and time. Distinguish internal causes (a release) from external (seasonality, a competitor). Form a hypothesis, then validate.",
      },
      {
        q: "How would you decide which of three features to build next?",
        approach:
          "Name a prioritization framework (RICE, impact/effort, weighted scoring) and apply it transparently. Tie each option to the company goal and the user. The point is a defensible, explicit decision, not a gut call.",
      },
      {
        q: "What metrics would you track for [a feature, e.g. a referral program]?",
        approach:
          "Separate the primary success metric from guardrail metrics (don't let virality tank quality). Define the funnel and counter-metrics. Show you'd watch for gaming and unintended consequences.",
      },
      {
        q: "Estimate the market size for [a product or category].",
        approach:
          "Pick top-down or bottom-up and state assumptions explicitly. Bottom-up (users × frequency × price) is usually more defensible. Sanity-check the final number against something you know.",
      },
      {
        q: "How would you launch [a product] in a new market?",
        approach:
          "Cover localization, go-to-market, regulatory and competitive landscape, and a phased rollout with success criteria. Define what 'win' looks like before scaling.",
      },
      {
        q: "Tell me about a time you influenced a team without formal authority.",
        approach:
          "STAR. Show how you built alignment — data, a prototype, stakeholder one-on-ones — rather than escalating. Quantify the outcome and reflect on what made the influence stick.",
      },
      {
        q: "Describe a product decision you got wrong.",
        approach:
          "Pick a real miss with a clear lesson. Own the decision, explain what data you misread, and describe the process change you made so it wouldn't recur. Self-awareness is the signal.",
      },
      {
        q: "How do you say no to a senior stakeholder's feature request?",
        approach:
          "Anchor on the user and the roadmap goal, not on personal preference. Show the trade-off explicitly (what you'd give up), offer an alternative or a later slot, and keep the relationship intact.",
      },
    ],
    related: [
      { to: "/ai-interview-assistant", label: "AI Interview Assistant" },
      { to: "/behavioral-interview-assistant", label: "Behavioral Interview Assistant" },
      { to: "/interview-answer-generator", label: "Interview Answer Generator" },
      { to: "/interview-questions/data-scientist", label: "Data Scientist Interview Questions" },
    ],
  },
  {
    path: "/interview-questions/data-scientist",
    role: "Data Scientist",
    title: "Data Scientist Interview Questions (2026) | Natively",
    description:
      "Common data scientist interview questions for 2026 — statistics, machine learning, SQL, and case studies — each with a clear approach to answering well.",
    h1: "Data Scientist Interview Questions (2026)",
    intro: [
      "Data scientist interviews span a wide surface: probability and statistics, machine learning fundamentals, SQL and data manipulation, a product/analytics case study, and behavioral questions. The exact mix depends on whether the role leans toward analytics, ML engineering, or research, so clarifying the role's focus early is itself a good signal.",
      "For the questions below, interviewers care about rigor and communication. Can you reason about a statistical concept precisely, choose the right model for a problem and justify it, write correct SQL, and translate an ambiguous business question into a measurable analysis? Stating assumptions and explaining trade-offs matters as much as the final number.",
      "Practice explaining technical concepts simply, as if to a non-technical stakeholder. Much of the job — and much of the interview — is making a sound analysis legible to people who will act on it.",
    ],
    nativelyAngle:
      "During a live data science interview, Natively transcribes the question and can surface the definition, formula, or SQL pattern you need in real time, on your device — useful when nerves make a familiar concept momentarily slip.",
    questions: [
      {
        q: "Explain the bias-variance trade-off.",
        approach:
          "Define both error sources, then connect to model complexity: simple models underfit (high bias), complex models overfit (high variance). Tie to concrete levers — regularization, more data, cross-validation — and total error decomposition.",
      },
      {
        q: "What is p-value, and what does it not tell you?",
        approach:
          "Define it as P(data this extreme | null true). The 'not' is key: it is not the probability the hypothesis is true, and significance ≠ practical importance. Mentioning common misinterpretations is the signal.",
      },
      {
        q: "How would you handle an imbalanced classification dataset?",
        approach:
          "Start with the metric (accuracy is misleading; use precision/recall, F1, AUC-PR). Then techniques: resampling (SMOTE, undersampling), class weights, threshold tuning. Stress evaluating on the real distribution.",
      },
      {
        q: "When would you use random forest vs gradient boosting?",
        approach:
          "Contrast bagging (parallel, variance reduction, robust to overfitting) with boosting (sequential, bias reduction, higher accuracy but more tuning-sensitive). Mention training cost and interpretability trade-offs.",
      },
      {
        q: "Write a SQL query to find the second-highest salary per department.",
        approach:
          "Use a window function: DENSE_RANK() OVER (PARTITION BY dept ORDER BY salary DESC), filter rank = 2. Discuss the tie-handling difference between RANK, DENSE_RANK, and ROW_NUMBER.",
      },
      {
        q: "How do you detect and handle outliers?",
        approach:
          "Distinguish data errors from genuine extremes. Methods: IQR, z-score, domain thresholds, visualization. The judgment call to verbalize — removing real signal can bias the model; investigate before deleting.",
      },
      {
        q: "Design an A/B test for a new recommendation algorithm.",
        approach:
          "Define hypothesis, primary metric, and guardrails. Compute sample size from MDE and power. Address randomization unit, novelty effects, and when to stop. Pre-register the success criterion.",
      },
      {
        q: "Explain how you'd evaluate a model that's performing well offline but poorly in production.",
        approach:
          "Investigate distribution shift, train/serve skew, leakage in offline data, and feedback loops. Propose monitoring and a shadow deployment. The systems thinking is what's being tested.",
      },
      {
        q: "What's the difference between L1 and L2 regularization?",
        approach:
          "L1 (Lasso) induces sparsity and does feature selection; L2 (Ridge) shrinks coefficients smoothly. Explain geometrically why L1's corners zero out weights, and when each is preferable.",
      },
      {
        q: "Tell me about a time your analysis changed a business decision.",
        approach:
          "STAR. Show the question, your method, and crucially the communication that drove action. Quantify the outcome. Data scientists who can't influence decisions don't get hired.",
      },
    ],
    related: [
      { to: "/ai-interview-assistant", label: "AI Interview Assistant" },
      { to: "/interview-questions/ai-engineer", label: "AI Engineer Interview Questions" },
      { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper" },
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
    ],
  },
  {
    path: "/interview-questions/ai-engineer",
    role: "AI Engineer",
    title: "AI Engineer Interview Questions (2026) — LLMs, RAG & MLOps",
    description:
      "Common AI engineer interview questions for 2026 — LLMs, RAG, prompt engineering, evaluation, and ML systems — each with a clear approach to answering well.",
    h1: "AI Engineer Interview Questions (2026)",
    intro: [
      "The AI engineer role is newer and less standardized than software or data science, which means interviews vary widely — but a 2026 loop usually probes LLM fundamentals, retrieval-augmented generation (RAG), prompt and context engineering, evaluation, and the systems work of shipping AI features reliably. Many loops also keep a classic coding round, so don't neglect data structures.",
      "Interviewers are looking for someone who understands both the models and the engineering around them: how transformers and attention work at a conceptual level, how to ground a model with retrieval, how to evaluate non-deterministic systems, and how to control latency and cost in production. Hand-waving about 'just calling the API' is a fast way to fail.",
      "Because the field moves quickly, demonstrating that you reason from first principles — and that you ship and measure, not just prototype — matters more than reciting yesterday's benchmark numbers.",
    ],
    nativelyAngle:
      "Natively is itself a local-first AI application — on-device LLMs, local RAG with sqlite-vec, and a bring-your-own-key architecture. In a live AI engineering interview it can transcribe the question and surface a precise definition or trade-off in real time, on your device.",
    questions: [
      {
        q: "Explain how attention works in a transformer, at a high level.",
        approach:
          "Describe query/key/value, scaled dot-product attention, and why self-attention lets every token attend to every other — capturing long-range dependencies that RNNs struggle with. Mention multi-head attention's role and the quadratic cost.",
      },
      {
        q: "How would you design a RAG system for a company knowledge base?",
        approach:
          "Walk the pipeline: chunking strategy, embedding model choice, a vector store, retrieval (top-k, hybrid with keyword), reranking, and prompt assembly. Discuss chunk overlap, stale-data refresh, and citation of sources.",
      },
      {
        q: "How do you reduce hallucinations in an LLM application?",
        approach:
          "Ground with retrieval, constrain with structured outputs, lower temperature for factual tasks, add citation requirements, and verify with a second pass or rules. Stress evaluation: you can't reduce what you don't measure.",
      },
      {
        q: "How would you evaluate a non-deterministic LLM feature?",
        approach:
          "Build a labeled eval set, use rubric-based or LLM-as-judge scoring, track regression across prompt/model changes, and combine offline evals with online metrics. Mention the cost and bias caveats of LLM-as-judge.",
      },
      {
        q: "When would you fine-tune vs use RAG vs prompt engineering?",
        approach:
          "Prompt engineering first (cheapest, fastest). RAG for knowledge/freshness. Fine-tuning for behavior, format, or domain style that prompting can't reliably hit. Often a combination; justify by cost, latency, and maintainability.",
      },
      {
        q: "How do you control latency and cost in an LLM product?",
        approach:
          "Model selection by task (small models for easy turns), prompt/context trimming, caching, streaming for perceived latency, batching, and routing. Quantify: smaller context and a cheaper model can cut cost an order of magnitude.",
      },
      {
        q: "What are the trade-offs of running a model locally vs via a cloud API?",
        approach:
          "Local: privacy, no per-token cost, offline, but limited by hardware and model size. Cloud: top-tier models and scale, but cost, latency, and data leaving your device. Tie to the use case — exactly the trade-off Natively is built around.",
      },
      {
        q: "How would you choose an embedding model for retrieval?",
        approach:
          "Match the domain and language, check MTEB-style benchmarks, weigh dimension size vs storage/latency, and validate on YOUR data with a retrieval eval. Don't trust a leaderboard over a domain-specific test.",
      },
      {
        q: "Implement a simple semantic search over a set of documents.",
        approach:
          "Embed documents and the query, store vectors, compute cosine similarity (or use a vector index like sqlite-vec/FAISS), return top-k. Discuss normalization and the speed/accuracy trade-off of approximate nearest neighbor.",
      },
      {
        q: "Tell me about an AI feature you shipped and how you measured its success.",
        approach:
          "STAR. Emphasize the eval methodology and the production metric, not just the demo. AI engineers who ship and measure — rather than endlessly prototype — are what's being screened for.",
      },
    ],
    related: [
      { to: "/interview-questions/data-scientist", label: "Data Scientist Interview Questions" },
      { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper" },
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
    ],
  },

  // ---- Company-specific software engineer pages ----
  {
    path: "/interview-questions/google-software-engineer",
    role: "Google Software Engineer",
    title: "Google Software Engineer Interview Questions (2026) | Natively",
    description:
      "Google software engineer interview questions for 2026 — algorithms, data structures, system design, and Googleyness behavioral rounds — with how to approach each.",
    h1: "Google Software Engineer Interview Questions (2026)",
    intro: [
      "Google's software engineer loop is famous for its emphasis on data structures and algorithms. Most candidates face two or three coding rounds, at least one system design round (for L4 and above), and a behavioral round Google internally frames as \"Googleyness and Leadership.\" The bar is less about exotic tricks and more about clean, correct, well-communicated solutions with tight complexity analysis.",
      "Interviewers are trained to probe how you think, not whether you've memorized a specific problem. They want to hear you clarify the problem, state assumptions, reason about time and space out loud, and handle follow-ups that tighten constraints. A working brute force you then optimize beats a half-remembered optimal solution you can't explain.",
      "The questions below reflect the categories Google leans on. Practice narrating your approach: the difference between an L3 and an L4 signal is often communication and the ability to discuss trade-offs, not raw problem-solving speed.",
    ],
    nativelyAngle:
      "In a live Google interview, Natively transcribes the question, reads the shared coding doc via on-screen OCR, and suggests a structured approach with complexity analysis in under 500 ms — fully on-device. Use it to stay structured across the algorithm and Googleyness rounds.",
    questions: [
      {
        q: "Given a list of intervals, merge all overlapping intervals.",
        approach:
          "Sort by start time, then sweep once merging when the current start ≤ previous end. O(n log n) for the sort dominates. State the sorted invariant out loud — Google interviewers reward a clearly-stated approach before you code.",
      },
      {
        q: "Find the k-th largest element in an unsorted array.",
        approach:
          "Offer a min-heap of size k (O(n log k)) and quickselect (O(n) average). Discuss the trade-off: quickselect is faster on average but O(n²) worst case; the heap is steadier and streams. Naming both signals depth.",
      },
      {
        q: "Serialize and deserialize a binary tree.",
        approach:
          "Pick a traversal (preorder with null markers is clean) and show both directions are consistent. Discuss the delimiter and how you reconstruct. Google likes seeing you handle the null-node edge case explicitly.",
      },
      {
        q: "Word ladder: shortest transformation sequence between two words.",
        approach:
          "Model as BFS over a graph where edges connect words differing by one letter. Discuss building adjacency efficiently (wildcard buckets) and why BFS guarantees the shortest path. Bidirectional BFS is a strong follow-up.",
      },
      {
        q: "Design an LRU cache.",
        approach:
          "Hash map + doubly linked list for O(1) get/put. Walk the eviction path explicitly. This is a classic Google warm-up that tests whether you can combine two structures cleanly under time pressure.",
      },
      {
        q: "Number of islands in a 2D grid.",
        approach:
          "DFS or BFS flood fill from each unvisited land cell, counting components. O(rows×cols). Mention in-place marking vs a visited set as a space trade-off — a common Google follow-up.",
      },
      {
        q: "Design a system to return the top-k most frequent search queries.",
        approach:
          "Scope read vs write rate first. Discuss a count-min sketch or a heap over a hash map for approximate top-k at scale, and how you'd shard. This bridges into the system design round many Google loops include.",
      },
      {
        q: "Tell me about a time you had to make a decision without complete data.",
        approach:
          "STAR. Google's 'Googleyness' round looks for comfort with ambiguity, bias to action balanced with judgment, and learning from the outcome. Pick a real example with a concrete result and what you'd do differently.",
      },
    ],
    related: [
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
      { to: "/interview-questions/meta-software-engineer", label: "Meta Software Engineer Interview Questions" },
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
      { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper" },
    ],
  },
  {
    path: "/interview-questions/meta-software-engineer",
    role: "Meta Software Engineer",
    title: "Meta Software Engineer Interview Questions (2026) | Natively",
    description:
      "Meta (Facebook) software engineer interview questions for 2026 — coding speed, system design, and behavioral rounds — with the approach interviewers reward.",
    h1: "Meta Software Engineer Interview Questions (2026)",
    intro: [
      "Meta's software engineer loop is known for its pace: coding rounds typically expect you to solve two medium problems in 35–40 minutes with clean, working code. The loop also includes a system design round (\"Ninja\"/product architecture for senior levels) and a behavioral round Meta calls \"Jedi,\" focused on conflict, impact, and how you operate.",
      "Speed matters at Meta, but not at the cost of correctness — interviewers want you to talk and type at the same time, get to a working solution quickly, then optimize. Edge cases and clean code are explicitly scored. Practicing for throughput, not just difficulty, is the differentiator.",
      "The questions below reflect Meta's coding and behavioral patterns. The behavioral round is weighted heavily for level calibration, so prepare concrete stories about driving impact and navigating disagreement, not just technical wins.",
    ],
    nativelyAngle:
      "Meta's two-problems-in-40-minutes format rewards speed. In a live interview, Natively reads the on-screen problem, suggests an approach with complexity in under 500 ms, and helps you stay structured under time pressure — locally, with nothing leaving your device.",
    questions: [
      {
        q: "Validate a binary search tree.",
        approach:
          "Recurse with min/max bounds rather than just comparing parent-child. State why the naive parent-child check fails. Meta rewards getting the correct invariant fast and stating the edge cases (duplicates, single node).",
      },
      {
        q: "Merge k sorted lists.",
        approach:
          "Min-heap of k heads (O(N log k)) or divide-and-conquer pairwise merge. Code it cleanly and quickly — this is a common first problem and interviewers watch how fast you reach working code.",
      },
      {
        q: "Subarray sum equals k.",
        approach:
          "Prefix-sum + hash map of counts in O(n). Explain why the running-sum-difference trick works. A frequent Meta problem that separates candidates who pattern-match prefix sums from those who brute force.",
      },
      {
        q: "Right side view of a binary tree.",
        approach:
          "Level-order BFS taking the last node per level, or DFS tracking depth. Both O(n). Narrate while coding — Meta explicitly values talking through the solution as you type.",
      },
      {
        q: "Random pick with weight.",
        approach:
          "Prefix sums + binary search on a random draw. Walk the probability reasoning. A Meta favorite because it tests whether you can map a probability requirement onto a clean data structure.",
      },
      {
        q: "Design Facebook's News Feed.",
        approach:
          "Clarify scale and ranking scope. Discuss fan-out-on-write vs fan-out-on-read, the celebrity problem, caching, and ranking as a separable service. Meta's design round wants product-aware architecture, not just plumbing.",
      },
      {
        q: "Add two numbers represented as linked lists.",
        approach:
          "Walk both lists with a carry, build the result node by node. O(max(m,n)). Handle the trailing carry edge case — interviewers check it deliberately.",
      },
      {
        q: "Tell me about a time you disagreed with your manager or a teammate.",
        approach:
          "STAR. Meta's behavioral round screens for handling conflict directly and constructively, plus the impact of the resolution. Choose a story where you disagreed, engaged respectfully, and drove a concrete outcome.",
      },
    ],
    related: [
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
      { to: "/interview-questions/google-software-engineer", label: "Google Software Engineer Interview Questions" },
      { to: "/behavioral-interview-assistant", label: "Behavioral Interview Assistant" },
      { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper" },
    ],
  },
  {
    path: "/interview-questions/amazon-software-engineer",
    role: "Amazon SDE",
    title: "Amazon SDE Interview Questions (2026) — Leadership Principles | Natively",
    description:
      "Amazon SDE interview questions for 2026 — coding, system design, and Leadership Principles behavioral rounds — with how to structure answers Amazon rewards.",
    h1: "Amazon SDE Interview Questions (2026)",
    intro: [
      "Amazon's SDE loop is distinctive because the behavioral component is woven through almost every round, anchored to the 16 Leadership Principles (LPs). Expect coding rounds (data structures, algorithms), one or two system design discussions, and LP-based behavioral questions in nearly every interview — each interviewer is typically assigned specific principles to assess.",
      "The coding bar is solid but rarely the hardest part for prepared candidates; the LP behavioral questions are where many loops are won or lost. Amazon uses the STAR method explicitly and looks for data-backed, first-person stories (\"I,\" not \"we\") with measurable results. Vague or team-credit answers score poorly.",
      "The questions below mix Amazon's common coding patterns with the LP prompts you should have rehearsed stories for. Prepare two distinct stories per major principle, because interviewers will ask follow-ups that drill into your specific actions and the outcome.",
    ],
    nativelyAngle:
      "Amazon weaves Leadership Principles through every round. Natively's behavioral mode helps you structure STAR answers grounded in your real experience in real time, and its coding support reads on-screen problems and suggests an approach — all on-device, under 500 ms.",
    questions: [
      {
        q: "Two sum / find pairs summing to a target.",
        approach:
          "Hash map in one pass, O(n). State the space-for-time trade-off vs sorting + two pointers. A standard Amazon warm-up; get to optimal cleanly and discuss duplicates.",
      },
      {
        q: "Find the most common word / top-k frequent elements.",
        approach:
          "Hash map counts + heap (O(n log k)) or bucket sort (O(n)). Amazon likes this because it scales into a discussion of doing it over a massive log stream.",
      },
      {
        q: "Copy a linked list with random pointers.",
        approach:
          "Interleave copied nodes, then split — O(1) extra space — or a hash map from original to copy. Walk the pointer bookkeeping carefully; it's an Amazon favorite for testing precision.",
      },
      {
        q: "Course schedule (detect a cycle / topological sort).",
        approach:
          "Model prerequisites as a directed graph; use Kahn's algorithm or DFS with a recursion stack to detect cycles. Explain why a cycle means the schedule is impossible.",
      },
      {
        q: "Design a system like Amazon's order-fulfillment / a URL shortener.",
        approach:
          "Clarify requirements and scale, define the API, choose storage and an ID scheme, then discuss caching and consistency. Tie choices back to availability — an Amazon design value.",
      },
      {
        q: "Tell me about a time you took ownership of a problem outside your scope. (Ownership)",
        approach:
          "STAR, first person, with data. Ownership is one of the most-tested LPs: show you saw a gap, acted beyond your role, and drove a measurable result you can quantify.",
      },
      {
        q: "Describe a time you disagreed and committed. (Have Backbone; Disagree and Commit)",
        approach:
          "Pick a real disagreement where you voiced your view with data, then fully committed once a decision was made. Amazon wants both the backbone and the follow-through, with the outcome.",
      },
      {
        q: "Tell me about a time you delivered results under a tight deadline. (Deliver Results)",
        approach:
          "STAR with metrics. Emphasize prioritization, what you cut, and the quantified outcome. Amazon screens hard for candidates who ship under constraint, not just plan.",
      },
    ],
    related: [
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
      { to: "/behavioral-interview-assistant", label: "Behavioral Interview Assistant" },
      { to: "/interview-questions/microsoft-software-engineer", label: "Microsoft Software Engineer Interview Questions" },
      { to: "/system-design-interview-assistant", label: "System Design Interview Assistant" },
    ],
  },
  {
    path: "/interview-questions/microsoft-software-engineer",
    role: "Microsoft Software Engineer",
    title: "Microsoft Software Engineer Interview Questions (2026) | Natively",
    description:
      "Microsoft software engineer interview questions for 2026 — coding, problem-solving, design, and behavioral rounds — with how to approach each effectively.",
    h1: "Microsoft Software Engineer Interview Questions (2026)",
    intro: [
      "Microsoft's software engineer loop tends to be collaborative and discussion-oriented. Coding rounds favor solid data-structure and problem-solving fundamentals over competition-grade tricks, and interviewers often engage with your thinking as you go rather than watching silently. Senior loops add a design round and deeper behavioral discussion aligned with Microsoft's growth-mindset culture.",
      "Interviewers reward clear communication and genuine collaboration — asking good clarifying questions and responding to hints well is a positive signal, not a weakness. Edge cases, testing your own code, and explaining trade-offs matter as much as reaching the optimal solution.",
      "The questions below reflect Microsoft's common patterns across coding and behavioral rounds. Practice thinking out loud and treating the interviewer as a collaborator; Microsoft's culture question often probes how you learn and work with others.",
    ],
    nativelyAngle:
      "Microsoft's rounds are collaborative and discussion-heavy. Natively transcribes the conversation, reads on-screen code, and suggests a structured approach in real time — helping you stay clear and collaborative while keeping everything on your device.",
    questions: [
      {
        q: "Reverse words in a sentence in place.",
        approach:
          "Reverse the whole string, then reverse each word — O(n) time, O(1) extra space for a mutable buffer. Walk the two-step trick clearly; Microsoft values a clean, well-explained in-place solution.",
      },
      {
        q: "Find the middle of a linked list in one pass.",
        approach:
          "Fast/slow pointers. State the invariant (fast moves twice per slow step) and the even-length edge case. A classic Microsoft fundamentals check.",
      },
      {
        q: "Check whether two strings are anagrams.",
        approach:
          "Frequency count (26-array or hash map), O(n). Clarify case and Unicode handling first — asking that clarifying question is itself a positive Microsoft signal.",
      },
      {
        q: "Lowest common ancestor in a binary (search) tree.",
        approach:
          "For a BST, walk down comparing values, O(h). For a general binary tree, recurse and return where left and right subtrees both report a target. Distinguish the two cases explicitly.",
      },
      {
        q: "Implement a function to compute sqrt(x) without the library call.",
        approach:
          "Binary search on the answer, or Newton's method; discuss precision and integer vs float versions. Microsoft likes seeing you reason about convergence and edge cases (0, 1, negatives).",
      },
      {
        q: "Design a parking lot / an elevator system (OO design).",
        approach:
          "Identify entities, responsibilities, and interfaces; discuss how classes interact and where to extend. Microsoft's design rounds often probe object-oriented modeling and clean abstractions, not just scale.",
      },
      {
        q: "Detect if a string has all unique characters.",
        approach:
          "Hash set or a bitmask for a fixed alphabet (O(1) space). Mention the no-extra-data-structure follow-up. Quick to solve, so spend the time on clean code and tests.",
      },
      {
        q: "Tell me about a time you learned a new technology quickly to ship something.",
        approach:
          "STAR with a growth-mindset framing — Microsoft's culture explicitly values learning. Show how you ramped, what you delivered, and what the experience taught you.",
      },
    ],
    related: [
      { to: "/interview-questions/software-engineer", label: "Software Engineer Interview Questions" },
      { to: "/interview-questions/amazon-software-engineer", label: "Amazon SDE Interview Questions" },
      { to: "/interview-questions/google-software-engineer", label: "Google Software Engineer Interview Questions" },
      { to: "/ai-coding-interview-helper", label: "AI Coding Interview Helper" },
    ],
  },
];

export const ROLE_BY_PATH: Record<string, RoleQuestionSet> = Object.fromEntries(
  ROLE_QUESTION_SETS.map((r) => [r.path, r]),
);
