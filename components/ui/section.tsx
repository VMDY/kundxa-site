import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Tons de section. Le site est sombre a ~60 % (midnight, deep, nuit) ; `light` et
// `raised` donnent les ~30 % de blanc. Sur ces deux tons, le dore est interdit :
// les composants passent `light` a Kicker et Accent pour basculer sur dusk.
export type Tone = "midnight" | "deep" | "night" | "light" | "raised";

const tones: Record<Tone, string> = {
  // Site en fond clair (18/11/2026) : les anciens tons sombres pointent vers le clair.
  midnight: "bg-bg text-ink",
  deep: "bg-white text-ink",
  night: "bg-bg text-ink",
  light: "bg-white text-ink",
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

