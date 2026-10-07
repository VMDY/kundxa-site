import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Tons de section. Le site est sombre a ~60 % (midnight, deep, nuit) ; `light` et
// `raised` donnent les ~30 % de blanc. Sur ces deux tons, le dore est interdit :
// les composants passent `light` a Kicker et Accent pour basculer sur dusk.
export type Tone = "midnight" | "deep" | "night" | "light" | "raised";

const tones: Record<Tone, string> = {
  midnight: "bg-midnight text-paper",
  deep: "bg-deep text-paper",
  night: "bg-gradient-night text-paper",
  light: "bg-paper text-ink",
  raised: "bg-raised text-ink",
};

export function Section({
  id,
  tone = "midnight",
  className,
  children,
}: {
  id?: string;
  tone?: Tone;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-[var(--section-py)]", tones[tone], className)}>
      {children}
    </section>
  );
}

export const isLight = (tone: Tone) => tone === "light" || tone === "raised";
