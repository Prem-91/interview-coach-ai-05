import { useState } from "react";
import { QuestionAnalysis, HintLevel, Topic } from "@/lib/mock-reasoning";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  Lightbulb,
  AlertTriangle,
  ArrowRight,
  Gauge,
  BookOpen,
  Scale,
  ChevronRight,
  Zap,
  Target,
  Brain,
} from "lucide-react";

interface AnalysisOutputProps {
  analysis: QuestionAnalysis | null;
  isAnalyzing: boolean;
  onHintUsed?: (level: HintLevel) => void;
}

const topicColorMap: Record<Topic, string> = {
  DSA: "bg-topic-dsa/15 text-topic-dsa border-topic-dsa/30",
  OS: "bg-topic-os/15 text-topic-os border-topic-os/30",
  DBMS: "bg-topic-dbms/15 text-topic-dbms border-topic-dbms/30",
  OOP: "bg-topic-oop/15 text-topic-oop border-topic-oop/30",
  "System Design": "bg-topic-sd/15 text-topic-sd border-topic-sd/30",
  Unknown: "bg-muted text-muted-foreground border-border",
};

const hintConfig: Record<
  HintLevel,
  { label: string; color: string; icon: typeof Lightbulb }
> = {
  1: { label: "Conceptual", color: "bg-hint-1/15 text-hint-1 border-hint-1/30 hover:bg-hint-1/25", icon: Lightbulb },
  2: { label: "Structural", color: "bg-hint-2/15 text-hint-2 border-hint-2/30 hover:bg-hint-2/25", icon: Target },
  3: { label: "Pseudocode", color: "bg-hint-3/15 text-hint-3 border-hint-3/30 hover:bg-hint-3/25", icon: Zap },
  final: { label: "Full Explanation", color: "bg-hint-final/15 text-hint-final border-hint-final/30 hover:bg-hint-final/25", icon: Brain },
};

function LoadingState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
      <div className="flex gap-1">
        <div className="h-3 w-3 animate-typing rounded-full bg-primary" style={{ animationDelay: "0s" }} />
        <div className="h-3 w-3 animate-typing rounded-full bg-primary" style={{ animationDelay: "0.3s" }} />
        <div className="h-3 w-3 animate-typing rounded-full bg-primary" style={{ animationDelay: "0.6s" }} />
      </div>
      <p className="text-sm text-muted-foreground">Analyzing question structure...</p>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex h-full flex-col items-center justify-center gap-4 p-8 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
        <Brain className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-1">
        <h3 className="text-lg font-medium text-foreground">
          Ready to Analyze
        </h3>
        <p className="max-w-sm text-sm text-muted-foreground">
          Enter a technical interview question and click "Analyze" to receive
          structured reasoning guidance with progressive hints.
        </p>
      </div>
    </div>
  );
}

export function AnalysisOutput({ analysis, isAnalyzing, onHintUsed }: AnalysisOutputProps) {
  const [visibleHints, setVisibleHints] = useState<Set<HintLevel>>(new Set());

  const revealHint = (level: HintLevel) => {
    setVisibleHints((prev) => new Set([...prev, level]));
    onHintUsed?.(level);
  };

  // Reset hints when analysis changes
  const [prevAnalysis, setPrevAnalysis] = useState<QuestionAnalysis | null>(null);
  if (analysis !== prevAnalysis) {
    setPrevAnalysis(analysis);
    if (analysis !== prevAnalysis) {
      setVisibleHints(new Set());
    }
  }

  if (isAnalyzing) return <Card className="flex h-full flex-col border-border bg-card"><LoadingState /></Card>;
  if (!analysis) return <Card className="flex h-full flex-col border-border bg-card"><EmptyState /></Card>;

  return (
    <Card className="flex h-full flex-col border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center justify-between text-base">
          <span className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            Structured Analysis
          </span>
          <div className="flex items-center gap-2">
            <Badge className={`border ${topicColorMap[analysis.topic]}`}>
              {analysis.topic}
            </Badge>
            <Badge variant="outline" className="gap-1 border-border">
              <Gauge className="h-3 w-3" />
              {Math.round(analysis.confidence * 100)}% confident
            </Badge>
          </div>
        </CardTitle>
      </CardHeader>

      <ScrollArea className="flex-1">
        <CardContent className="space-y-5">
          {/* Topic Detection */}
          <section className="space-y-2">
            <div className="grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-md border border-border bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">Subtopic</p>
                <p className="mt-1 font-medium text-foreground">{analysis.subtopic}</p>
              </div>
              <div className="rounded-md border border-border bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">Intent</p>
                <p className="mt-1 font-medium text-foreground">{analysis.intent}</p>
              </div>
              <div className="rounded-md border border-border bg-secondary/30 p-3">
                <p className="text-xs text-muted-foreground">Problem Type</p>
                <p className="mt-1 font-medium text-foreground">{analysis.problemType}</p>
              </div>
            </div>
          </section>

          <Separator className="bg-border" />

          {/* Key Concepts */}
          <section className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <Lightbulb className="h-4 w-4 text-hint-1" />
              Key Concepts
            </h4>
            <ul className="space-y-1.5">
              {analysis.keyConcepts.map((concept, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <ChevronRight className="mt-0.5 h-3 w-3 flex-shrink-0 text-primary" />
                  {concept}
                </li>
              ))}
            </ul>
          </section>

          {/* Step-by-Step Approach */}
          <section className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <ArrowRight className="h-4 w-4 text-primary" />
              Step-by-Step Approach
            </h4>
            <ol className="space-y-2">
              {analysis.approach.map((step, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-secondary-foreground">
                  <span className="flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-semibold text-primary">
                    {i + 1}
                  </span>
                  {step}
                </li>
              ))}
            </ol>
          </section>

          {/* Common Mistakes */}
          <section className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <AlertTriangle className="h-4 w-4 text-hint-3" />
              Common Mistakes
            </h4>
            <ul className="space-y-1.5">
              {analysis.commonMistakes.map((mistake, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                  {mistake}
                </li>
              ))}
            </ul>
          </section>

          {/* Tradeoffs */}
          {analysis.tradeoffs.length > 0 && (
            <section className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Scale className="h-4 w-4 text-accent" />
                Trade-offs
              </h4>
              <ul className="space-y-1.5">
                {analysis.tradeoffs.map((tradeoff, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {tradeoff}
                  </li>
                ))}
              </ul>
            </section>
          )}

          <Separator className="bg-border" />

          {/* Progressive Hints */}
          <section className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground">
              Progressive Hints
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {(Object.entries(hintConfig) as [string, typeof hintConfig[1]][]).map(
                ([level, config]) => {
                  const hintLevel = (level === "final" ? "final" : Number(level)) as HintLevel;
                  const isRevealed = visibleHints.has(hintLevel);
                  const Icon = config.icon;

                  return (
                    <Button
                      key={level}
                      variant="outline"
                      onClick={() => revealHint(hintLevel)}
                      disabled={isRevealed}
                      className={`gap-2 border ${isRevealed ? "opacity-60" : ""} ${config.color}`}
                    >
                      <Icon className="h-4 w-4" />
                      {config.label}
                      {isRevealed && " ✓"}
                    </Button>
                  );
                }
              )}
            </div>

            {/* Revealed Hints */}
            {Array.from(visibleHints)
              .sort((a, b) => {
                const order = { 1: 0, 2: 1, 3: 2, final: 3 };
                return order[a] - order[b];
              })
              .map((level) => {
                const config = hintConfig[level];
                return (
                  <div
                    key={String(level)}
                    className={`rounded-lg border p-4 ${config.color.split(" hover:")[0]}`}
                  >
                    <p className="mb-1 text-xs font-semibold uppercase tracking-wider opacity-80">
                      Hint {level === "final" ? "– Full Explanation" : `Level ${level}`}
                    </p>
                    <p className="whitespace-pre-wrap font-mono text-sm leading-relaxed">
                      {analysis.hints[level]}
                    </p>
                  </div>
                );
              })}
          </section>
        </CardContent>
      </ScrollArea>
    </Card>
  );
}
