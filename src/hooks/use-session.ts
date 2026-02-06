import { useState, useCallback } from "react";
import { SessionEntry, QuestionAnalysis, HintLevel } from "@/lib/mock-reasoning";

export interface SessionSummary {
  totalQuestions: number;
  topicsPracticed: string[];
  hintLevelsUsed: Record<string, number>;
  conceptualGaps: string[];
  suggestedRevision: string[];
  duration: number; // in minutes
}

export function useSession() {
  const [entries, setEntries] = useState<SessionEntry[]>([]);
  const [sessionStart] = useState<Date>(new Date());

  const addEntry = useCallback(
    (question: string, analysis: QuestionAnalysis) => {
      setEntries((prev) => [
        ...prev,
        { question, analysis, hintsUsed: [], timestamp: new Date() },
      ]);
    },
    []
  );

  const recordHintUsed = useCallback(
    (questionIndex: number, level: HintLevel) => {
      setEntries((prev) =>
        prev.map((entry, i) =>
          i === questionIndex && !entry.hintsUsed.includes(level)
            ? { ...entry, hintsUsed: [...entry.hintsUsed, level] }
            : entry
        )
      );
    },
    []
  );

  const getSummary = useCallback((): SessionSummary => {
    const topicSet = new Set(entries.map((e) => e.analysis.topic));
    const hintCounts: Record<string, number> = {};

    entries.forEach((entry) => {
      entry.hintsUsed.forEach((level) => {
        const key = `Level ${level}`;
        hintCounts[key] = (hintCounts[key] || 0) + 1;
      });
    });

    const heavyHintEntries = entries.filter(
      (e) => e.hintsUsed.includes(3) || e.hintsUsed.includes("final")
    );
    const conceptualGaps = heavyHintEntries.map(
      (e) => `${e.analysis.topic}: ${e.analysis.subtopic}`
    );

    const suggestedRevision = [...new Set(conceptualGaps)];
    if (entries.some((e) => e.analysis.confidence < 0.5)) {
      suggestedRevision.push("Practice clearer problem statement formulation");
    }

    const duration = Math.round(
      (new Date().getTime() - sessionStart.getTime()) / 60000
    );

    return {
      totalQuestions: entries.length,
      topicsPracticed: [...topicSet],
      hintLevelsUsed: hintCounts,
      conceptualGaps,
      suggestedRevision,
      duration,
    };
  }, [entries, sessionStart]);

  const resetSession = useCallback(() => {
    setEntries([]);
  }, []);

  return {
    entries,
    addEntry,
    recordHintUsed,
    getSummary,
    resetSession,
    currentIndex: entries.length - 1,
  };
}
