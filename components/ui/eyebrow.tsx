import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

// Sur-titre : petites capitales dorees precedees d'un tiret. Marqueur de section
// recurrent, une des signatures visuelles de la marque.
export function Eyebrow({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <p className={cn("flex items-center gap-3 text-eyebrow uppercase text-accent", className)}>
      <span aria-hidden className="h-px w-8 bg-accent" />
      {children}
    </p>
  );
}
