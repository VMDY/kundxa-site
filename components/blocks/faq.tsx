import { Reveal } from "@/components/reveal";
import { Container } from "@/components/ui/container";
import { Heading, Titre } from "@/components/ui/heading";
import { IconPlus } from "@/components/ui/icons";
import { Kicker } from "@/components/ui/kicker";
import { Section } from "@/components/ui/section";
import { accueil, faq } from "@/content/site";

// details/summary natifs : accessibles au clavier et au lecteur d'ecran sans JS.
// Le JSON-LD FAQPage expose les memes questions aux moteurs de reponse.
export function Faq() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map(({ q, r }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: r },
    })),
  };

  return (
    <Section tone="light">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Container size="narrow">
        <Reveal className="text-center">
          <Kicker light>{accueil.faq.surtitre}</Kicker>
          <Heading className="mt-5 text-ink">
            <Titre parts={accueil.faq.titre} light />
          </Heading>
        </Reveal>

        <div className="mt-14 border-t border-line-light">
          {faq.map(({ q, r }, i) => (
            <details key={q} open={i === 0} className="group border-b border-line-light">
              <summary className="flex cursor-pointer items-center justify-between gap-6 py-6 font-serif text-h3 text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-dusk">
                {q}
                <IconPlus className="h-5 w-5 shrink-0 text-dusk transition-transform duration-200 group-open:rotate-45" />
              </summary>
              <p className="-mt-1 pb-7 text-ink-muted">{r}</p>
            </details>
          ))}
        </div>
      </Container>
    </Section>
  );
}
