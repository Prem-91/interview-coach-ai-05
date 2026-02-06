import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Sparkles, RotateCcw, ClipboardPaste } from "lucide-react";

interface QuestionInputProps {
  onAnalyze: (question: string) => void;
  isAnalyzing: boolean;
}

const sampleQuestions = [
  "Explain the difference between a stack and a queue with use cases",
  "What is deadlock in operating systems? How can it be prevented?",
  "Design a URL shortener system like bit.ly",
  "What are SOLID principles in OOP? Give examples",
  "Explain normalization in databases up to 3NF",
];

export function QuestionInput({ onAnalyze, isAnalyzing }: QuestionInputProps) {
  const [question, setQuestion] = useState("");

  const handleAnalyze = () => {
    if (question.trim()) {
      onAnalyze(question.trim());
    }
  };

  const handlePaste = async () => {
    try {
      const text = await navigator.clipboard.readText();
      setQuestion(text);
    } catch {
      // Clipboard access denied
    }
  };

  const handleSample = (sample: string) => {
    setQuestion(sample);
  };

  return (
    <Card className="flex h-full flex-col border-border bg-card">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Search className="h-4 w-4 text-primary" />
          Question Input
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        <div className="relative flex-1">
          <Textarea
            placeholder="Type or paste your interview question here...&#10;&#10;Example: What is the time complexity of binary search and why?"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="h-full min-h-[200px] resize-none border-border bg-secondary/50 font-mono text-sm placeholder:font-sans placeholder:text-muted-foreground"
            onKeyDown={(e) => {
              if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) {
                handleAnalyze();
              }
            }}
          />
        </div>

        <div className="flex gap-2">
          <Button
            onClick={handleAnalyze}
            disabled={!question.trim() || isAnalyzing}
            className="flex-1 gap-2 bg-primary font-medium text-primary-foreground hover:bg-primary/90"
          >
            <Sparkles className="h-4 w-4" />
            {isAnalyzing ? "Analyzing..." : "Analyze Question"}
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handlePaste}
            title="Paste from clipboard"
          >
            <ClipboardPaste className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuestion("")}
            title="Clear"
          >
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>

        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground">
            Try a sample question:
          </p>
          <div className="flex flex-wrap gap-1.5">
            {sampleQuestions.map((q, i) => (
              <Badge
                key={i}
                variant="outline"
                className="cursor-pointer text-xs transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                onClick={() => handleSample(q)}
              >
                {q.length > 40 ? q.slice(0, 40) + "…" : q}
              </Badge>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
