import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = "display" | "h1" | "h2" | "h3";

// Niveau visuel -> utilitaire de l'echelle typo. La graisse est posee explicitement
// (le companion --text-*--font-weight n'est pas toujours applique par Tailwind 4.x).
const levelClass: Record<Level, string> = {
  display: "text-display font-extrabold",
  h1: "text-h1 font-extrabold",
  h2: "text-h2 font-bold",
  h3: "text-h3 font-semibold",
};

// Balise semantique par defaut ; `as` decouple la semantique du niveau visuel (a11y).
const defaultTag: Record<Level, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
};

export function Heading({
  level = "h2",
  as,
  className,
  children,
}: {
  level?: Level;
  as?: ElementType;
  className?: string;
  children: ReactNode;
}) {
  const Tag = as ?? defaultTag[level];
  return <Tag className={cn(levelClass[level], "text-balance", className)}>{children}</Tag>;
}
