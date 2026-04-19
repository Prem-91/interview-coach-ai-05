import { SessionSummary } from "@/hooks/use-session";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  BarChart3,
  Clock,
  BookOpen,
  AlertCircle,
  Target,
  TrendingUp,
  Award,
} from "lucide-react";

interface SessionSummaryDialogProps {
  summary: SessionSummary;
  children?: React.ReactNode;
}

export function SessionSummaryDialog({
  summary,
  children,
}: SessionSummaryDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {children || (
          <Button variant="outline" className="gap-2">
            <BarChart3 className="h-4 w-4" />
            Session Summary
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-lg border-border bg-card">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-foreground">
            <BarChart3 className="h-5 w-5 text-primary" />
            Session Summary
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
              <BookOpen className="mx-auto mb-1 h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {summary.totalQuestions}
              </p>
              <p className="text-xs text-muted-foreground">Questions Analyzed</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
              <TrendingUp className="mx-auto mb-1 h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {summary.totalAnswers}
              </p>
              <p className="text-xs text-muted-foreground">Answers Evaluated</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
              <Award className="mx-auto mb-1 h-5 w-5 text-accent" />
              <p className="text-2xl font-bold text-foreground">
                {summary.averageScore}%
              </p>
              <p className="text-xs text-muted-foreground">Average Score</p>
            </div>
            <div className="rounded-lg border border-border bg-secondary/30 p-3 text-center">
              <Clock className="mx-auto mb-1 h-5 w-5 text-primary" />
              <p className="text-2xl font-bold text-foreground">
                {summary.duration}
              </p>
              <p className="text-xs text-muted-foreground">Minutes Spent</p>
            </div>
          </div>

          <Separator className="bg-border" />

          {/* Topics Practiced */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <BookOpen className="h-4 w-4 text-primary" />
              Topics Practiced
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {summary.topicsPracticed.length > 0 ? (
                summary.topicsPracticed.map((topic) => (
                  <Badge key={topic} className="bg-primary/15 text-primary border-primary/30">
                    {topic}
                  </Badge>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">No questions analyzed yet</p>
              )}
            </div>
          </div>

          {/* Hint Levels Used */}
          <div className="space-y-2">
            <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
              <TrendingUp className="h-4 w-4 text-primary" />
              Hint Usage
            </h4>
            {Object.keys(summary.hintLevelsUsed).length > 0 ? (
              <div className="space-y-1.5">
                {Object.entries(summary.hintLevelsUsed).map(([level, count]) => (
                  <div key={level} className="flex items-center justify-between text-sm">
                    <span className="text-secondary-foreground">{level}</span>
                    <Badge variant="outline" className="border-border">
                      {count}x
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">No hints used yet</p>
            )}
          </div>

          {/* Conceptual Gaps */}
          {summary.conceptualGaps.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <AlertCircle className="h-4 w-4 text-hint-3" />
                Conceptual Gaps Detected
              </h4>
              <ul className="space-y-1">
                {summary.conceptualGaps.map((gap, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                    {gap}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Suggested Revision */}
          {summary.suggestedRevision.length > 0 && (
            <div className="space-y-2">
              <h4 className="flex items-center gap-2 text-sm font-semibold text-foreground">
                <Target className="h-4 w-4 text-accent" />
                Suggested Revision Areas
              </h4>
              <ul className="space-y-1">
                {summary.suggestedRevision.map((area, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-secondary-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-accent" />
                    {area}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
