import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Badge({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-accent/40 bg-accent/10 px-3 py-1",
        "text-eyebrow uppercase text-accent",
        className,
      )}
    >
      {children}
    </span>
  );
}
