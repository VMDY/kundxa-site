import { Reveal } from "@/components/reveal";
import { Card } from "@/components/ui/card";
import { Container } from "@/components/ui/container";
import { Eyebrow } from "@/components/ui/eyebrow";
import { GoldRule } from "@/components/ui/gold-rule";
import { Heading } from "@/components/ui/heading";
import { Section } from "@/components/ui/section";
import { probleme } from "@/content/site";

export function Probleme() {
  return (
    <Section id="probleme" bg="muted">
      <Container>
        <Reveal>
          <Eyebrow>{probleme.eyebrow}</Eyebrow>
          <Heading level="h2" className="mt-6 max-w-3xl">
            {probleme.titreDebut}
            <span className="text-accent">{probleme.titreAccent}</span>
            {probleme.titreFin}
          </Heading>
          <GoldRule className="mt-7" />
        </Reveal>

        {/* Le recit socle, resserre. Colonne etroite : on lit ca comme un texte,
            pas comme un bloc marketing. */}
        <Reveal delay={80} className="mt-10 max-w-2xl space-y-5">
          {probleme.recit.map((para, i) => (
            <p
              key={i}
              className={i === probleme.recit.length - 1 ? "text-body font-semibold" : "text-body text-muted"}
            >
              {para}
            </p>
          ))}
        </Reveal>

        <ul className="mt-16 grid gap-5 sm:grid-cols-2">
          {probleme.frictions.map((f, i) => (
            <Reveal key={f.titre} as="li" delay={i * 60}>
              <Card as="div" className="h-full">
                <h3 className="text-h3">{f.titre}</h3>
                <p className="mt-3 text-body text-muted">{f.texte}</p>
              </Card>
            </Reveal>
          ))}
        </ul>

        {/* « Ce que vous avez deja essaye » — desamorce la mefiance en nommant les
            alternatives et ce qui leur manque, sans jamais viser le lecteur. */}
        <Reveal delay={80} className="mt-16 max-w-3xl">
          <p className="text-body font-semibold">{probleme.essaye.intro}</p>
          <dl className="mt-8 divide-y divide-border border-y border-border">
            {probleme.essaye.lignes.map((l) => (
              <div key={l.quoi} className="grid gap-1 py-4 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <dt className="text-body font-semibold">{l.quoi}</dt>
                <dd className="text-body text-muted">{l.pourquoi}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <Reveal delay={120} className="mt-16 max-w-3xl">
          <p className="text-h2 font-bold tracking-[-0.02em]">
            {probleme.punchlineDebut}
            <span className="text-accent">{probleme.punchlineAccent}</span>.
          </p>
        </Reveal>
      </Container>
    </Section>
  );
}
