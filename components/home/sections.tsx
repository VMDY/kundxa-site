import Image from "next/image";
import Link from "next/link";
import { CaseCard } from "@/components/blocks/case-card";
import { Workflow } from "@/components/blocks/workflow";
import { Reveal } from "@/components/reveal";
import { ButtonLink } from "@/components/ui/button";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import {
  IconArrowRight,
  IconCheck,
  IconClose,
  IconDecision,
  IconPlay,
  IconRepeat,
  IconSearch,
} from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { accueil, cas, cta, etapes, offres, preuves, site } from "@/content/site";

/* ----------------------------------------------------------------- preuves */

export function Preuves() {
  return (
    <div className="border-y border-white/10 bg-panel">
      <Container>
        <ul className="grid grid-cols-1 gap-x-8 gap-y-3 py-7 font-mono text-caption text-muted sm:grid-cols-2 lg:flex lg:justify-between">
          {preuves.map((p) => (
            <li key={p.fort}>
              {p.avant} <span className="font-medium text-paper">{p.fort}</span>
              {p.apres.startsWith(",") ? p.apres : ` ${p.apres}`}
            </li>
          ))}
        </ul>
      </Container>
    </div>
  );
}

/* --------------------------------------------------------------- ouverture */

const icones = { repeat: IconRepeat, search: IconSearch, decision: IconDecision } as const;

export function Ouverture() {
  const o = accueil.ouverture;
  return (
    <Section>
      <Container>
        <Reveal className="mx-auto max-w-3xl text-center">
          <Kicker>{o.surtitre}</Kicker>
          <Heading className="mt-5">
            <Titre parts={o.titre} />
          </Heading>
          <p className="mx-auto mt-6 max-w-2xl text-lead text-muted">{o.texte}</p>
        </Reveal>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {o.colonnes.map((c, i) => {
            const Icone = icones[c.icone];
            return (
              <Reveal as="li" key={c.surtitre} delay={i * 80} className="glass rounded-lg p-8 sm:p-9">
                <span className="grid h-12 w-12 place-items-center rounded-md border border-gold/40 text-gold">
                  <Icone className="h-[22px] w-[22px]" />
                </span>
                <Kicker className="mt-7">{c.surtitre}</Kicker>
                <h3 className="mt-3 text-h3">{c.titre}</h3>
                <p className="mt-3 text-muted">{c.texte}</p>
              </Reveal>
            );
          })}
        </ul>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------- système */

export function Systeme() {
  const s = accueil.systeme;
  return (
    <Section tone="deep">
      <Container className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
        <Reveal>
          <Workflow />
        </Reveal>

        <Reveal delay={120}>
          <Kicker>{s.surtitre}</Kicker>
          <Heading className="mt-5">
            <Titre parts={s.titre} />
          </Heading>
          <p className="mt-6 text-muted">{s.texte}</p>
          <p className="mt-2 font-mono text-caption text-muted/80">
            Source :{" "}
            <a
              href={s.source.href}
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-4 hover:text-paper"
            >
              {s.source.libelle}
            </a>
          </p>

          <dl className="mt-8 grid gap-3 sm:grid-cols-2">
            {s.faits.map((f) => (
              <div key={f.cle} className="rounded-md border border-white/10 bg-white/[0.04] p-5">
                <dt className="font-mono text-label uppercase text-gold">{f.cle}</dt>
                <dd className="mt-2 text-small text-paper/90">{f.texte}</dd>
              </div>
            ))}
          </dl>

          <a
            href={site.videoRelance}
            target="_blank"
            rel="noopener noreferrer"
            className="group mt-9 inline-flex items-center gap-3.5 rounded-sm font-semibold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
          >
            <span className="grid h-11 w-11 place-items-center rounded-full bg-gold text-midnight transition-transform group-hover:scale-105">
              <IconPlay className="ml-0.5 h-4 w-4" />
            </span>
            {s.video}
          </a>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------ réalisations */

export function RealisationsApercu() {
  const r = accueil.realisations;
  return (
    <Section>
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Kicker>{r.surtitre}</Kicker>
            <Heading className="mt-5">
              <Titre parts={r.titre} />
            </Heading>
            <p className="mt-5 text-lead text-muted">{r.texte}</p>
          </div>
          <LienFleche href="/realisations">{r.lien}</LienFleche>
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {cas.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 80}>
              <CaseCard cas={c} />
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------- méthode */

export function MethodeApercu() {
  const m = accueil.methode;
  return (
    <Section className="pt-0">
      <Container>
        <Reveal className="max-w-4xl">
          <Kicker>{m.surtitre}</Kicker>
          <Heading className="mt-5">
            <Titre parts={m.titre} />
          </Heading>
          <p className="mt-5 text-lead text-muted">{m.texte}</p>
        </Reveal>

        <ol className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {etapes.map((e, i) => (
            <Reveal
              as="li"
              key={e.numero}
              delay={i * 70}
              className="rounded-lg border border-white/10 bg-white/[0.04] p-7"
            >
              <span className="font-serif text-[2.75rem] leading-none text-gold">{e.numero}</span>
              <h3 className="mt-6 text-h3">{e.titre}</h3>
              <p className="mt-3 text-small text-muted">{e.court}</p>
            </Reveal>
          ))}
        </ol>

        <Reveal className="mt-10">
          <LienFleche href="/methode">{m.lien}</LienFleche>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ----------------------------------------------------------------- limites */

export function Limites() {
  const l = accueil.limites;
  return (
    <Section tone="light">
      <Container>
        <Reveal>
          <Kicker light>{l.surtitre}</Kicker>
          <Heading className="mt-5 max-w-4xl">
            <Titre parts={l.titre} light />
          </Heading>
        </Reveal>
        <ul className="mt-14 grid gap-5 md:grid-cols-3">
          {l.items.map((it, i) => (
            <Reveal as="li" key={it.titre} delay={i * 80} className="rounded-lg bg-raised p-8">
              <span className="grid h-9 w-9 place-items-center rounded-full border-[1.5px] border-dusk text-dusk">
                <IconClose className="h-4 w-4" />
              </span>
              <h3 className="mt-6 text-h3 text-ink">{it.titre}</h3>
              <p className="mt-3 text-ink-muted">{it.texte}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </Section>
  );
}

/* ------------------------------------------------------------------ offres */

export function OffresApercu() {
  const o = accueil.offres;
  const p = offres.principale;
  return (
    <Section>
      <Container>
        <Reveal className="text-center">
          <Kicker>{o.surtitre}</Kicker>
          <Heading className="mt-5">
            <Titre parts={o.titre} />
          </Heading>
        </Reveal>

        <div className="mt-14 grid gap-5 lg:grid-cols-[1.15fr_1fr]">
          <Reveal className="rounded-xl border border-gold/50 bg-gradient-to-br from-[#1b2e4c] to-dusk p-8 sm:p-11">
            <span className="inline-block rounded-sm bg-gold/15 px-3 py-1.5 font-mono text-label uppercase text-gold">
              {p.badge}
            </span>
            <h3 className="mt-6 text-h2">{p.titre}</h3>
            <p className="mt-4 text-muted">{p.accroche}</p>
            <ul className="mt-8 divide-y divide-white/10 border-y border-white/10">
              {p.livre.map((item) => (
                <li key={item} className="flex items-center gap-3 py-3 text-small">
                  <IconCheck className="h-4 w-4 shrink-0 text-gold" />
                  {item}
                </li>
              ))}
            </ul>
            <ButtonLink href="/contact#appeler" className="mt-9">
              {cta.principal}
              <IconArrowRight className="h-[1.1em] w-[1.1em]" />
            </ButtonLink>
          </Reveal>

          <ul className="grid gap-4">
            {offres.secondaires.map((s, i) => (
              <Reveal as="li" key={s.titre} delay={i * 80}>
                <Link
                  href="/offres"
                  className="glass group flex h-full flex-col justify-center rounded-lg p-7 transition-colors hover:border-gold/45 focus-visible:outline-2 focus-visible:outline-gold"
                >
                  <span className="flex items-center justify-between gap-4">
                    <span className="font-serif text-h3">{s.titre}</span>
                    <IconArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform group-hover:translate-x-1" />
                  </span>
                  <span className="mt-2 text-small text-muted">{s.texte}</span>
                </Link>
              </Reveal>
            ))}
          </ul>
        </div>

        <p className="mt-8 text-center text-small text-muted">{offres.mention}</p>
      </Container>
    </Section>
  );
}

/* --------------------------------------------------------------- fondateur */

export function Fondateur() {
  const f = accueil.fondateur;
  return (
    <Section tone="deep">
      <Container className="grid items-center gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
        <Reveal className="relative h-[28rem] overflow-hidden rounded-xl sm:h-[36rem]">
          <Image
            src={site.photo}
            alt="Valdo Mendy"
            fill
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="object-cover object-[center_18%]"
          />
          <div className="glass absolute inset-x-4 bottom-4 rounded-lg p-4 text-small">
            <span className="font-semibold">{f.badgeNom}</span>, {f.badgeRole}
            <span className="mt-1 block font-mono text-[0.72rem] text-muted">{f.badgeCertifs}</span>
          </div>
        </Reveal>

        <Reveal delay={120}>
          <Kicker>{f.surtitre}</Kicker>
          <Heading level="quote" className="mt-6">
            {f.citation[0]}
            <em className="font-serif italic text-gold">{f.citation[1]}</em>
            {f.citation[2]}
          </Heading>
          {f.texte.map((t) => (
            <p key={t} className="mt-5 max-w-xl text-muted">
              {t}
            </p>
          ))}
          <ButtonLink href="/a-propos" variant="ghost" className="mt-9">
            {f.lien}
            <IconArrowRight className="h-[1.1em] w-[1.1em]" />
          </ButtonLink>
        </Reveal>
      </Container>
    </Section>
  );
}

/* ---------------------------------------------------------------- partagé */

export function LienFleche({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-2 rounded-sm font-semibold text-gold focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      {children}
      <IconArrowRight className="h-[1.1em] w-[1.1em] transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
