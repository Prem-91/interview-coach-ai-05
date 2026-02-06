import { Header } from "@/components/Header";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Shield,
  Info,
  Clock,
  AlertTriangle,
  FileText,
  Server,
  Monitor,
  Brain,
} from "lucide-react";

const Documentation = () => {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {/* Title */}
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight text-foreground">
              Documentation
            </h1>
            <p className="text-muted-foreground">
              RIPIS – Real-Time Interview Practice Intelligence System
            </p>
          </div>

          {/* Ethical Statement */}
          <Card className="border-primary/30 bg-primary/5">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base text-primary">
                <Shield className="h-5 w-5" />
                Ethical Statement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm leading-relaxed text-secondary-foreground">
                This system is designed for <strong>learning and interview preparation only</strong>.
                AI assistance is explicitly visible and must not be used in real assessment
                environments. RIPIS is a practice tool that prioritizes reasoning development
                over answer generation. All AI activity is transparently displayed to ensure
                ethical usage.
              </p>
            </CardContent>
          </Card>

          {/* System Overview */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-5 w-5 text-primary" />
                System Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-secondary-foreground">
                RIPIS is an AI-powered mock interview practice assistant that provides
                structured reasoning guidance for technical interview questions. It
                identifies question topics, provides progressive hints, and tracks your
                practice sessions.
              </p>

              <div className="grid grid-cols-3 gap-4">
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <Monitor className="mb-2 h-5 w-5 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Context Understanding</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Accepts text input, detects topic/subtopic, handles ambiguous prompts
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <Brain className="mb-2 h-5 w-5 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Reasoning Engine</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Generates structured guidance with progressive hints at 4 levels
                  </p>
                </div>
                <div className="rounded-lg border border-border bg-secondary/30 p-4">
                  <FileText className="mb-2 h-5 w-5 text-primary" />
                  <h4 className="text-sm font-semibold text-foreground">Feedback Layer</h4>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Session tracking, gap detection, and revision suggestions
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* System Assumptions */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Info className="h-5 w-5 text-primary" />
                System Assumptions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-secondary-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  User manually inputs question text (typed or pasted)
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  Used only in mock interview / self-study settings
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  Internet connection required for API-based AI features
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
                  Topic detection accuracy depends on clarity of input
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Latency Constraints */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Clock className="h-5 w-5 text-primary" />
                Latency Constraints
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-3">
                <Badge className="bg-primary/15 text-primary border-primary/30">
                  Target: &lt; 3 seconds
                </Badge>
                <p className="text-sm text-muted-foreground">
                  Response time for question analysis and hint generation
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Known Limitations */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <AlertTriangle className="h-5 w-5 text-hint-3" />
                Known Limitations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-sm text-secondary-foreground">
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                  May misclassify abstract or cross-domain questions
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                  Cannot interpret complex diagrams or images
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                  Depends on clarity and completeness of user input
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                  Hint quality varies by topic coverage in the knowledge base
                </li>
                <li className="flex items-start gap-2">
                  <span className="mt-1 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-hint-3" />
                  Currently uses mock AI responses (no live LLM integration yet)
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Tech Stack */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="h-5 w-5 text-primary" />
                Technology Stack
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-semibold text-foreground">Frontend</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="border-border">React</Badge>
                    <Badge variant="outline" className="border-border">TypeScript</Badge>
                    <Badge variant="outline" className="border-border">Tailwind CSS</Badge>
                    <Badge variant="outline" className="border-border">Vite</Badge>
                    <Badge variant="outline" className="border-border">shadcn/ui</Badge>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-semibold text-foreground">AI Engine</h4>
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    <Badge variant="outline" className="border-border">Mock Reasoning (current)</Badge>
                    <Badge variant="outline" className="border-border">LLM-ready architecture</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Supported Topics */}
          <Card className="border-border bg-card">
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-base">
                <Brain className="h-5 w-5 text-primary" />
                Supported Technical Topics
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                <Badge className="bg-topic-dsa/15 text-topic-dsa border-topic-dsa/30">
                  DSA – Data Structures & Algorithms
                </Badge>
                <Badge className="bg-topic-os/15 text-topic-os border-topic-os/30">
                  OS – Operating Systems
                </Badge>
                <Badge className="bg-topic-dbms/15 text-topic-dbms border-topic-dbms/30">
                  DBMS – Database Management
                </Badge>
                <Badge className="bg-topic-oop/15 text-topic-oop border-topic-oop/30">
                  OOP – Object-Oriented Programming
                </Badge>
                <Badge className="bg-topic-sd/15 text-topic-sd border-topic-sd/30">
                  System Design
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default Documentation;
