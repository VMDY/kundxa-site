import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Container({
  size = "default",
  className,
  children,
}: {
  size?: "default" | "narrow";
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-[var(--container-px)]",
        size === "narrow" ? "max-w-3xl" : "max-w-6xl",
        className,
      )}
    >
      {children}
    </div>
  );
}
