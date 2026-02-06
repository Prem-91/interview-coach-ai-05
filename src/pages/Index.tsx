import { useState, useCallback } from "react";
import { Header } from "@/components/Header";
import { QuestionInput } from "@/components/QuestionInput";
import { AnalysisOutput } from "@/components/AnalysisOutput";
import { SessionSummaryDialog } from "@/components/SessionSummaryDialog";
import { analyzeQuestion, delay, QuestionAnalysis, HintLevel } from "@/lib/mock-reasoning";
import { useSession } from "@/hooks/use-session";
import { Button } from "@/components/ui/button";
import { BarChart3, RotateCcw } from "lucide-react";

const Index = () => {
  const [analysis, setAnalysis] = useState<QuestionAnalysis | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const { addEntry, recordHintUsed, getSummary, currentIndex, entries, resetSession } = useSession();

  const handleAnalyze = useCallback(
    async (question: string) => {
      setIsAnalyzing(true);
      setAnalysis(null);

      // Simulate processing delay for realism
      await delay(1200 + Math.random() * 800);

      const result = analyzeQuestion(question);
      setAnalysis(result);
      addEntry(question, result);
      setIsAnalyzing(false);
    },
    [addEntry]
  );

  const handleHintUsed = useCallback(
    (level: HintLevel) => {
      if (currentIndex >= 0) {
        recordHintUsed(currentIndex, level);
      }
    },
    [currentIndex, recordHintUsed]
  );

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      {/* Status Bar */}
      <div className="flex items-center justify-between border-b border-border bg-card/50 px-6 py-2">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            Questions analyzed:{" "}
            <span className="font-semibold text-foreground">
              {entries.length}
            </span>
          </span>
          {analysis && (
            <span>
              Current topic:{" "}
              <span className="font-semibold text-primary">
                {analysis.topic}
              </span>
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <SessionSummaryDialog summary={getSummary()}>
            <Button variant="ghost" size="sm" className="gap-2 text-xs">
              <BarChart3 className="h-3.5 w-3.5" />
              Session Summary
            </Button>
          </SessionSummaryDialog>
          <Button
            variant="ghost"
            size="sm"
            className="gap-2 text-xs"
            onClick={resetSession}
          >
            <RotateCcw className="h-3.5 w-3.5" />
            Reset
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex flex-1 gap-0">
        {/* Left Panel - Question Input */}
        <div className="flex w-[420px] flex-shrink-0 border-r border-border p-4">
          <QuestionInput onAnalyze={handleAnalyze} isAnalyzing={isAnalyzing} />
        </div>

        {/* Right Panel - Analysis Output */}
        <div className="flex flex-1 p-4">
          <AnalysisOutput
            analysis={analysis}
            isAnalyzing={isAnalyzing}
            onHintUsed={handleHintUsed}
          />
        </div>
      </main>
    </div>
  );
};

export default Index;
