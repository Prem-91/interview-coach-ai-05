import { useState, useCallback, useEffect } from "react";
import { SessionEntry, QuestionAnalysis, HintLevel } from "@/lib/mock-reasoning";

const STORAGE_KEY = "ripis-session-v1";

export interface SessionSummary {
  totalQuestions: number;
  totalAnswers: number;
  averageScore: number;
  topicsPracticed: string[];
  hintLevelsUsed: Record<string, number>;
  conceptualGaps: string[];
  suggestedRevision: string[];
  duration: number; // in minutes
}

export function useSession() {
  const [entries, setEntries] = useState<SessionEntry[]>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return parsed.entries.map((e: any) => ({
          ...e,
          timestamp: new Date(e.timestamp),
        }));
      } catch (e) {
        return [];
      }
    }
    return [];
  });

  const [sessionStart] = useState<Date>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        return new Date(parsed.sessionStart);
      } catch (e) {
        return new Date();
      }
    }
    return new Date();
  });

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({
        entries,
        sessionStart: sessionStart.toISOString(),
      })
    );
  }, [entries, sessionStart]);

  const addEntry = useCallback(
    (question: string, analysis: QuestionAnalysis) => {
      setEntries((prev) => [
        ...prev,
        { question, analysis, hintsUsed: [], timestamp: new Date() },
      ]);
    },
    []
  );

  const recordEvaluation = useCallback(
    (questionIndex: number, userAnswer: string, evaluation: any) => {
      setEntries((prev) =>
        prev.map((entry, i) =>
          i === questionIndex
            ? { ...entry, userAnswer, evaluation }
            : entry
        )
      );
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

    const evaluatedEntries = entries.filter((e) => e.evaluation);
    const averageScore = evaluatedEntries.length > 0
      ? Math.round(evaluatedEntries.reduce((acc, e) => acc + (e.evaluation?.score || 0), 0) / evaluatedEntries.length)
      : 0;

    const duration = Math.round(
      (new Date().getTime() - sessionStart.getTime()) / 60000
    );

    return {
      totalQuestions: entries.length,
      totalAnswers: evaluatedEntries.length,
      averageScore,
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
    recordEvaluation,
    getSummary,
    resetSession,
    currentIndex: entries.length - 1,
  };
}
