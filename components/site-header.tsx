"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { IconClose, IconMenu } from "@/components/ui/icons";
import { cn } from "@/lib/cn";
import { cta, nav, site } from "@/content/site";

// Header fixe : transparent en haut de page, il se condense en barre opaque
// floutee des 40px de scroll. Sous 1024px, le menu passe dans un panneau.
export function SiteHeader() {
  const pathname = usePathname();
  const [condense, setCondense] = useState(false);
  const [ouvert, setOuvert] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondense(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Le panneau se ferme a chaque navigation, et Echap le ferme aussi.
  useEffect(() => setOuvert(false), [pathname]);
  useEffect(() => {
    if (!ouvert) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOuvert(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [ouvert]);

  const actif = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-200",
        condense || ouvert
          ? "border-b border-white/10 bg-deep/90 backdrop-blur-md"
          : "border-b border-transparent",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <Link
          href="/"
          className="flex shrink-0 items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
        >
          <Image
            src="/logos/kundxa-lockup-golden.png"
            alt={`${site.nom}, accueil`}
            width={871}
            height={269}
            priority
            className="h-8 w-auto"
          />
        </Link>

        <nav aria-label="Navigation principale" className="hidden items-center gap-9 lg:flex">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={actif(item.href) ? "page" : undefined}
              className={cn(
                "rounded-sm text-small transition-colors hover:text-paper focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
                actif(item.href) ? "text-paper" : "text-muted",
              )}
            >
              {item.libelle}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <ButtonLink href="/contact#appeler" size="sm" className="hidden sm:inline-flex">
            {cta.court}
          </ButtonLink>
          <button
            type="button"
            onClick={() => setOuvert((v) => !v)}
            aria-expanded={ouvert}
            aria-controls="menu-mobile"
            className="-mr-2 rounded-sm p-2 text-paper focus-visible:outline-2 focus-visible:outline-gold lg:hidden"
          >
            <span className="sr-only">{ouvert ? "Fermer le menu" : "Ouvrir le menu"}</span>
            {ouvert ? <IconClose className="h-6 w-6" /> : <IconMenu className="h-6 w-6" />}
          </button>
        </div>
      </Container>

      <div
        id="menu-mobile"
        hidden={!ouvert}
        className="border-t border-white/10 bg-deep lg:hidden"
      >
        <Container className="py-6">
          <ul className="divide-y divide-white/10">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={actif(item.href) ? "page" : undefined}
                  className="block py-4 font-serif text-h3 text-paper"
                >
                  {item.libelle}
                </Link>
              </li>
            ))}
          </ul>
          <ButtonLink href="/contact#appeler" className="mt-6 w-full">
            {cta.principal}
          </ButtonLink>
        </Container>
      </div>
    </header>
  );
}
