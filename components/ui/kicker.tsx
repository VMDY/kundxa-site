import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Surtitre de section : IBM Plex Mono, capitales espacees. Dore sur fond sombre,
// dusk sur fond clair (le dore sur blanc est illisible).
export function Kicker({
  light = false,
  className,
  children,
}: {
  light?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <p
      className={cn(
        "font-mono text-label font-medium uppercase",
        light ? "text-dusk" : "text-gold",
        className,
      )}
    >
      {children}
    </p>
  );
}
