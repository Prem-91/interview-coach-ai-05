import { Shield } from "lucide-react";

export function AIBadge() {
  return (
    <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 glow-badge">
      <div className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
      </div>
      <Shield className="h-3.5 w-3.5 text-primary" />
      <span className="text-xs font-medium text-primary">
        AI Assistance Active – Practice Mode Only
      </span>
    </div>
  );
}
