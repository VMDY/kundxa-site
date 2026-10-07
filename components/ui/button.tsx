import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

// primary : dore, texte midnight (regle de marque : texte sur dore = midnight).
// ghost : contour sur fond sombre. ghostLight / dark : equivalents sur fond blanc,
// ou le dore est interdit (1,9:1).
type Variant = "primary" | "ghost" | "ghostLight" | "dark";
type Size = "md" | "sm" | "lg";

const base =
  "inline-flex items-center justify-center gap-2.5 rounded-sm text-center font-sans font-semibold " +
  "transition-[color,background-color,border-color,transform] duration-150 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-3 " +
  "disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  primary:
    "bg-gold text-midnight hover:bg-gold-hover active:translate-y-px focus-visible:outline-paper",
  ghost:
    "border border-white/25 text-paper hover:border-gold hover:text-gold focus-visible:outline-gold",
  ghostLight:
    "border border-midnight/30 text-midnight hover:border-dusk hover:text-dusk focus-visible:outline-dusk",
  dark: "bg-midnight text-paper hover:bg-dusk focus-visible:outline-dusk",
};

const sizes: Record<Size, string> = {
  sm: "px-4 py-2.5 text-small",
  md: "px-6 py-3.5 text-body",
  lg: "px-7 py-4 text-body",
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

// Meme apparence, semantique de lien. Les chemins internes passent par next/link
// (navigation sans rechargement), les liens absolus s'ouvrent dans un nouvel onglet.
export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  href = "/",
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & Common) {
  const classes = cn(base, variants[variant], sizes[size], className);
  if (href.startsWith("/") || href.startsWith("#")) {
    return <Link href={href} className={classes} {...props} />;
  }
  return <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...props} />;
}
