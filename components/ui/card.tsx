import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Surface charcoal, bordure blanche a 8% qui vire au dore au survol.
// Pas de scale : l'elevation se joue sur la bordure et le fond (moves.md #3, sobriete).
export function Card({
  as: Tag = "div",
  interactive = true,
  className,
  children,
}: {
  as?: "div" | "article" | "li";
  interactive?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <Tag
      className={cn(
        "rounded-lg border border-border bg-surface p-6 sm:p-8",
        interactive &&
          "transition-[border-color,background-color] duration-150 hover:border-accent/45 hover:bg-white/[0.03]",
        className,
      )}
    >
      {children}
    </Tag>
  );
}
