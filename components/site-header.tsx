"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { cn } from "@/lib/cn";
import { cta, nav, site } from "@/content/site";

// Header sticky : transparent en haut de page, il se condense en barre opaque
// floutee des 80px de scroll.
export function SiteHeader() {
  const [condense, setCondense] = useState(false);

  useEffect(() => {
    const onScroll = () => setCondense(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,backdrop-filter] duration-200",
        condense
          ? "border-b border-border bg-bg/85 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-[var(--header-h)] items-center justify-between gap-6">
        <a
          href="#haut"
          className="flex items-center rounded-sm focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          <Image
            src="/logos/kundxa-logo.png"
            alt={`${site.nom} — accueil`}
            width={560}
            height={178}
            priority
            className="h-9 w-auto sm:h-10"
          />
        </a>

        <nav aria-label="Navigation principale" className="hidden items-center gap-8 md:flex">
          {nav.map((item) => {
            // Seuls les liens absolus (newsletter) sont externes et s'ouvrent dans
            // un nouvel onglet. Les ancres (#...) scrollent sur place, et les
            // chemins internes (/contact) naviguent dans l'onglet courant —
            // tester `!startsWith("#")` les expedierait a tort dans un onglet neuf.
            const externe = item.href.startsWith("http");
            return (
              <a
                key={item.href}
                href={item.href}
                target={externe ? "_blank" : undefined}
                rel={externe ? "noopener noreferrer" : undefined}
                className="rounded-sm text-caption font-semibold text-muted transition-colors hover:text-accent focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
              >
                {item.libelle}
              </a>
            );
          })}
        </nav>

        <ButtonLink href="/contact" size="sm" className="shrink-0">
          {cta.principal}
        </ButtonLink>
      </Container>
    </header>
  );
}
