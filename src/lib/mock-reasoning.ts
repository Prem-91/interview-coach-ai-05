export type Topic = "DSA" | "OS" | "DBMS" | "OOP" | "System Design" | "Unknown";
export type HintLevel = 1 | 2 | 3 | "final";

export interface QuestionAnalysis {
  topic: Topic;
  subtopic: string;
  intent: string;
  confidence: number;
  problemType: string;
  keyConcepts: string[];
  approach: string[];
  commonMistakes: string[];
  tradeoffs: string[];
  hints: Record<HintLevel, string>;
}

export interface SessionEntry {
  question: string;
  analysis: QuestionAnalysis;
  hintsUsed: HintLevel[];
  timestamp: Date;
}

const topicKeywords: Record<Topic, string[]> = {
  DSA: [
    "array", "linked list", "tree", "graph", "sort", "search", "hash", "stack",
    "queue", "heap", "binary", "traversal", "dynamic programming", "dp", "greedy",
    "backtracking", "recursion", "sliding window", "two pointer", "bfs", "dfs",
    "trie", "segment tree", "time complexity", "space complexity", "big o",
    "merge sort", "quick sort", "dijkstra", "shortest path", "topological",
  ],
  OS: [
    "process", "thread", "deadlock", "mutex", "semaphore", "scheduling",
    "memory management", "virtual memory", "paging", "segmentation", "cache",
    "interrupt", "system call", "kernel", "context switch", "race condition",
    "cpu scheduling", "page replacement", "thrashing", "fork", "ipc",
  ],
  DBMS: [
    "sql", "query", "normalization", "join", "index", "transaction", "acid",
    "primary key", "foreign key", "schema", "relational", "nosql", "aggregation",
    "subquery", "view", "trigger", "stored procedure", "denormalization",
    "b-tree", "database", "table", "er diagram", "functional dependency",
  ],
  OOP: [
    "class", "object", "inheritance", "polymorphism", "encapsulation", "abstraction",
    "interface", "abstract class", "design pattern", "solid", "singleton",
    "factory", "observer", "strategy", "composition", "aggregation",
    "overloading", "overriding", "constructor", "destructor", "virtual function",
  ],
  "System Design": [
    "scalability", "load balancer", "microservice", "api gateway", "caching",
    "cdn", "message queue", "database sharding", "replication", "consistency",
    "availability", "partition tolerance", "cap theorem", "rest api", "websocket",
    "rate limiting", "horizontal scaling", "vertical scaling", "distributed",
    "system design", "high level design", "low level design", "architecture",
  ],
  Unknown: [],
};

function detectTopic(question: string): { topic: Topic; confidence: number } {
  const lower = question.toLowerCase();
  const scores: Record<Topic, number> = {
    DSA: 0,
    OS: 0,
    DBMS: 0,
    OOP: 0,
    "System Design": 0,
    Unknown: 0,
  };

  for (const [topic, keywords] of Object.entries(topicKeywords)) {
    for (const keyword of keywords) {
      if (lower.includes(keyword)) {
        scores[topic as Topic] += keyword.split(" ").length;
      }
    }
  }

  const maxScore = Math.max(...Object.values(scores));
  if (maxScore === 0) return { topic: "Unknown", confidence: 0.2 };

  const detectedTopic = Object.entries(scores).find(([, s]) => s === maxScore)![0] as Topic;
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0);
  const confidence = Math.min(0.95, 0.4 + (maxScore / totalScore) * 0.55);

  return { topic: detectedTopic, confidence };
}

const mockResponses: Record<Topic, Omit<QuestionAnalysis, "topic" | "confidence" | "hints">> = {
  DSA: {
    subtopic: "Algorithm Design & Analysis",
    intent: "Understand algorithmic approach and optimize solution",
    problemType: "Algorithmic Problem Solving",
    keyConcepts: [
      "Time & space complexity analysis",
      "Data structure selection",
      "Edge case identification",
      "Optimization techniques",
    ],
    approach: [
      "Identify the problem pattern (sliding window, two pointers, divide & conquer, etc.)",
      "Consider brute force first to understand the problem",
      "Identify repeated work or overlapping subproblems",
      "Choose the appropriate data structure",
      "Optimize step by step, considering time-space tradeoffs",
    ],
    commonMistakes: [
      "Jumping to optimization without understanding the brute force",
      "Ignoring edge cases (empty input, single element, duplicates)",
      "Not considering integer overflow for large inputs",
      "Confusing similar patterns (e.g., sliding window vs two pointers)",
    ],
    tradeoffs: [
      "Time vs Space: Using extra memory (hash maps) to reduce time complexity",
      "Readability vs Performance: Recursive vs iterative approaches",
      "Preprocessing cost vs Query efficiency",
    ],
  },
  OS: {
    subtopic: "Operating System Concepts",
    intent: "Understand system-level concepts and process management",
    problemType: "System Concepts & Analysis",
    keyConcepts: [
      "Process lifecycle and states",
      "Concurrency and synchronization",
      "Memory hierarchy and management",
      "I/O and scheduling algorithms",
    ],
    approach: [
      "Identify the OS layer involved (kernel, user space, hardware interface)",
      "Map the concept to real-world analogies",
      "Trace through the execution flow step by step",
      "Consider concurrency implications",
      "Evaluate performance vs correctness tradeoffs",
    ],
    commonMistakes: [
      "Confusing process vs thread resource sharing",
      "Forgetting about race conditions in concurrent scenarios",
      "Mixing up preemptive vs non-preemptive scheduling",
      "Not considering the overhead of context switching",
    ],
    tradeoffs: [
      "Throughput vs Response Time in scheduling",
      "Internal vs External Fragmentation in memory management",
      "Safety vs Liveness in deadlock handling",
    ],
  },
  DBMS: {
    subtopic: "Database Management & Query Design",
    intent: "Design efficient database solutions and queries",
    problemType: "Database Design & Optimization",
    keyConcepts: [
      "Normalization and schema design",
      "Query optimization and indexing",
      "Transaction management and ACID properties",
      "Relational algebra and SQL operations",
    ],
    approach: [
      "Understand the data model and relationships",
      "Identify the functional dependencies",
      "Normalize to appropriate normal form",
      "Design efficient queries with proper joins",
      "Consider indexing strategy for read-heavy operations",
    ],
    commonMistakes: [
      "Over-normalization leading to excessive joins",
      "Not considering NULL handling in queries",
      "Ignoring index maintenance overhead for write-heavy workloads",
      "Confusing HAVING and WHERE clause usage",
    ],
    tradeoffs: [
      "Normalization vs Denormalization for read performance",
      "Consistency vs Availability in distributed databases",
      "Index count vs Write performance",
    ],
  },
  OOP: {
    subtopic: "Object-Oriented Design Principles",
    intent: "Apply OOP principles to design maintainable software",
    problemType: "Software Design & Architecture",
    keyConcepts: [
      "SOLID principles",
      "Design patterns (Creational, Structural, Behavioral)",
      "Abstraction and interface design",
      "Composition vs Inheritance",
    ],
    approach: [
      "Identify the entities and their relationships",
      "Define clear interfaces and abstractions",
      "Apply SOLID principles to guide design decisions",
      "Consider appropriate design patterns",
      "Ensure loose coupling and high cohesion",
    ],
    commonMistakes: [
      "Deep inheritance hierarchies instead of composition",
      "Violating Single Responsibility Principle with god classes",
      "Over-engineering with unnecessary patterns",
      "Tight coupling between concrete implementations",
    ],
    tradeoffs: [
      "Flexibility vs Simplicity in abstraction levels",
      "Inheritance vs Composition for code reuse",
      "Pattern complexity vs Problem requirements",
    ],
  },
  "System Design": {
    subtopic: "Distributed System Architecture",
    intent: "Design scalable and reliable system architectures",
    problemType: "Architecture & Scalability Design",
    keyConcepts: [
      "CAP theorem and consistency models",
      "Horizontal vs vertical scaling strategies",
      "Caching layers and CDN placement",
      "Message queues and async processing",
    ],
    approach: [
      "Clarify requirements: functional and non-functional",
      "Estimate scale: users, data volume, read/write ratio",
      "Design high-level architecture with core components",
      "Deep dive into critical components",
      "Address bottlenecks and failure modes",
    ],
    commonMistakes: [
      "Not clarifying requirements before designing",
      "Ignoring non-functional requirements (latency, availability)",
      "Over-engineering for scale that isn't needed yet",
      "Not considering failure modes and recovery strategies",
    ],
    tradeoffs: [
      "Consistency vs Availability (CAP theorem)",
      "Latency vs Throughput in system design",
      "Cost vs Performance in infrastructure choices",
    ],
  },
  Unknown: {
    subtopic: "General Technical Concept",
    intent: "Understand and analyze the technical concept",
    problemType: "General Analysis",
    keyConcepts: [
      "Problem decomposition",
      "First principles thinking",
      "Pattern recognition",
      "Systematic analysis",
    ],
    approach: [
      "Break the problem into smaller, manageable parts",
      "Identify what you know vs what you need to find out",
      "Look for similar problems you've solved before",
      "Build a solution incrementally",
      "Validate your approach with examples",
    ],
    commonMistakes: [
      "Making assumptions without validating them",
      "Not reading the problem statement carefully",
      "Overthinking simple problems",
      "Not considering edge cases",
    ],
    tradeoffs: [
      "Accuracy vs Speed of solution",
      "Generality vs Specificity of approach",
      "Complexity vs Maintainability",
    ],
  },
};

function generateHints(question: string, topic: Topic): Record<HintLevel, string> {
  const lower = question.toLowerCase();

  if (topic === "DSA") {
    return {
      1: `Think about what category this problem falls into. Consider whether you need to track elements, find patterns, or optimize a sequence. What data structure naturally fits the access pattern described?`,
      2: `Consider the constraints. If you need O(1) lookups, think hash maps. If ordering matters, consider sorted structures or heaps. Sketch out what information you need at each step and how to store it efficiently.`,
      3: `Here's a structural approach:\n\`\`\`\nfunction solve(input):\n  // Step 1: Parse and validate input\n  // Step 2: Initialize your chosen data structure\n  // Step 3: Process elements (single pass if possible)\n  // Step 4: Handle edge cases\n  // Step 5: Return result\n\`\`\`\nFill in each step thinking about what operations you need.`,
      final: `The key insight is choosing the right data structure and algorithm pattern. For most problems: start with brute force O(n²), identify repeated work, then optimize using appropriate data structures to achieve O(n) or O(n log n). Always verify with examples before coding.`,
    };
  }

  if (topic === "System Design") {
    return {
      1: `Start by asking clarifying questions. What's the expected scale? What are the most critical quality attributes — availability, consistency, or latency? Define the core entities and API endpoints first.`,
      2: `Think about the data flow: Client → Load Balancer → App Servers → Cache Layer → Database. Where are the bottlenecks? Consider read-heavy vs write-heavy patterns and choose your database and caching strategy accordingly.`,
      3: `Sketch this architecture:\n\`\`\`\nClients → CDN → Load Balancer\n  → API Gateway → Service Layer\n    → Cache (Redis) → Database (Primary)\n    → Message Queue → Workers\n    → Object Storage (for media)\n\`\`\`\nNow identify which components need replication and how they communicate.`,
      final: `System design is about tradeoffs. State your assumptions clearly, justify each component, and address: How does it scale? What happens when a component fails? How do you handle data consistency? Always tie decisions back to requirements.`,
    };
  }

  // Generic hints for other topics
  return {
    1: `Start by identifying the core concept being tested. What fundamental principle does this question relate to? Think about the "why" before the "how."`,
    2: `Break this down into smaller parts. Map out the relationships between concepts. Consider: What are the prerequisites? What are the constraints? What's the expected behavior?`,
    3: `Structure your answer:\n\`\`\`\n1. Define the concept clearly\n2. Explain the mechanism/process\n3. Provide a concrete example\n4. Discuss edge cases or variations\n5. Compare with alternatives\n\`\`\``,
    final: `The best answers demonstrate understanding of fundamentals, use precise terminology, provide examples, and discuss tradeoffs. Connect your answer to real-world applications where possible.`,
  };
}

export function analyzeQuestion(question: string): QuestionAnalysis {
  const { topic, confidence } = detectTopic(question);
  const response = mockResponses[topic];
  const hints = generateHints(question, topic);

  return {
    topic,
    confidence,
    hints,
    ...response,
  };
}

export function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
