import { cn } from "@/lib/cn";

// Le « fin filet dore » de moves.md #4 : souligne les titres, ferme les compositions.
export function GoldRule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("block h-px w-16 bg-accent", className)} />;
}
