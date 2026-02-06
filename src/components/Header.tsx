import { Brain, BookOpen, FileText } from "lucide-react";
import { AIBadge } from "./AIBadge";
import { Button } from "@/components/ui/button";
import { useNavigate, useLocation } from "react-router-dom";

export function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-6 py-3">
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/15">
          <Brain className="h-5 w-5 text-primary" />
        </div>
        <div>
          <h1 className="text-lg font-semibold tracking-tight text-foreground">
            RIPIS
          </h1>
          <p className="text-xs text-muted-foreground">
            Practice Intelligence System
          </p>
        </div>
      </div>

      <AIBadge />

      <nav className="flex items-center gap-1">
        <Button
          variant={location.pathname === "/" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => navigate("/")}
          className="gap-2"
        >
          <BookOpen className="h-4 w-4" />
          Practice
        </Button>
        <Button
          variant={location.pathname === "/docs" ? "secondary" : "ghost"}
          size="sm"
          onClick={() => navigate("/docs")}
          className="gap-2"
        >
          <FileText className="h-4 w-4" />
          Documentation
        </Button>
      </nav>
    </header>
  );
}
