import type { ElementType, ReactNode } from "react";
import { cn } from "@/lib/cn";

type Level = "display" | "h1" | "h2" | "h3" | "quote";

// Fraunces partout (pose globalement sur h1-h3 dans globals.css) ; ici l'echelle.
const levelClass: Record<Level, string> = {
  display: "text-display font-medium",
  h1: "text-h1 font-medium",
  h2: "text-h2 font-medium",
  h3: "text-h3 font-medium",
  quote: "text-quote font-normal",
};

const defaultTag: Record<Level, ElementType> = {
  display: "h1",
  h1: "h1",
  h2: "h2",
  h3: "h3",
  quote: "blockquote",
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
  return (
    <Tag className={cn("font-serif text-balance", levelClass[level], className)}>{children}</Tag>
  );
}

/**
 * Un titre de marque : exactement un mot en italique (brand_context identity.md).
 * `parts` = [avant, motEnItalique, apres]. Dore sur fond sombre, dusk sur fond clair.
 */
export function Titre({
  parts,
  light = false,
}: {
  parts: readonly [string, string, string] | readonly string[];
  light?: boolean;
}) {
  const [avant, mot, apres] = parts;
  return (
    <>
      {avant}
      <Accent light={light}>{mot}</Accent>
      {apres}
    </>
  );
}

export function Accent({ light = false, children }: { light?: boolean; children: ReactNode }) {
  return (
    <em className={cn("font-serif italic", light ? "text-dusk" : "text-gold")}>{children}</em>
  );
}
