import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center justify-center gap-2 rounded-md font-semibold " +
  "transition-[color,background-color,border-color,transform] duration-150 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2 " +
  "disabled:opacity-50 disabled:pointer-events-none";

// L'anneau de focus du bouton primaire passe en blanc : un anneau dore sur un fond
// dore serait invisible.
const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-bg hover:bg-accent-hover active:translate-y-px focus-visible:outline-fg",
  secondary:
    "bg-transparent text-fg border border-white/25 hover:border-accent hover:text-accent focus-visible:outline-accent",
  ghost: "bg-transparent text-muted hover:text-accent focus-visible:outline-accent",
};

const sizes: Record<Size, string> = {
  md: "px-6 py-3.5 text-body",
  sm: "px-4 py-2 text-caption",
};

type Common = { variant?: Variant; size?: Size; className?: string };

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & Common) {
  return <button className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}

// Meme apparence, semantique de lien : les CTA du site sont des ancres, pas des boutons.
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Common) {
  return <a className={cn(base, variants[variant], sizes[size], className)} {...props} />;
}
