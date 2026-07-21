import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Rythme vertical. Le site est dark-only : `dark` = fond de page, `muted` = charcoal,
// utilise en alternance pour rythmer le scroll sans poser de cloison visible.
export function Section({
  id,
  bg = "dark",
  className,
  children,
}: {
  id?: string;
  bg?: "dark" | "muted";
  className?: string;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      className={cn(
        "relative py-[var(--section-py)]",
        bg === "muted" ? "bg-surface" : "bg-bg",
        className,
      )}
    >
      {children}
    </section>
  );
}
