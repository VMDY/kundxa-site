import { cn } from "@/lib/cn";
import { accueil } from "@/content/site";

const { schema } = accueil.systeme;
const noeud = (id: string) => schema.noeuds.find((n) => n.id === id)!;

/**
 * Le circuit de relance, dessine comme une fenetre d'outil : la lecture du matin,
 * les cinq paliers sur un rail, et les deux regles qui le gardent. Les paliers 4
 * et 5 sont ceux ou le systeme rend la main au dirigeant : ils sont marques en dore.
 * Pur HTML/CSS (aucune image) : net a toutes les tailles, et lisible au lecteur d'ecran.
 */
export function Workflow() {
  const paliers = ["p1", "p2", "p3", "p4", "p5"].map(noeud);
  const lecture = noeud("lecture");
  const regles = [noeud("stop"), noeud("garde")];

  return (
    <figure className="overflow-hidden rounded-lg border border-white/12 bg-[#0b1628] shadow-[0_40px_80px_rgba(0,0,0,0.4)]">
      <div className="flex h-10 items-center gap-2 border-b border-white/8 px-4">
        <i className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <i className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <i className="h-2.5 w-2.5 rounded-full bg-white/18" />
        <figcaption className="ml-3 truncate font-mono text-[0.72rem] text-muted">
          {schema.fenetre}
        </figcaption>
      </div>

      <div className="bg-dots grid gap-6 p-5 sm:grid-cols-[1.25fr_0.75fr] sm:p-7">
        <ol className="relative">
          <Noeud cle={lecture.cle} texte={lecture.texte} className="mb-5" />
          {/* rail vertical qui relie les paliers */}
          <span
            aria-hidden
            className="absolute top-[4.6rem] bottom-6 left-[0.9rem] w-px bg-gradient-to-b from-gold/70 to-gold/20"
          />
          {paliers.map((p, i) => {
            const rendu = i >= 3; // paliers 4 et 5 : la main revient au dirigeant
            return (
              <li key={p.id} className="relative mt-3 flex items-start gap-4">
                <span
                  aria-hidden
                  className={cn(
                    "relative z-10 mt-4 grid h-[1.85rem] w-[1.85rem] shrink-0 place-items-center rounded-full border-2 bg-[#0b1628] font-mono text-[0.68rem]",
                    rendu ? "border-gold text-gold" : "border-white/30 text-muted",
                  )}
                >
                  {i + 1}
                </span>
                <Noeud cle={p.cle} texte={p.texte} or={rendu} className="flex-1" />
              </li>
            );
          })}
        </ol>

        <div className="flex flex-col justify-center gap-4 sm:border-l sm:border-dashed sm:border-white/15 sm:pl-6">
          {regles.map((r) => (
            <Noeud key={r.cle} cle={r.cle} texte={r.texte} regle />
          ))}
        </div>
      </div>
    </figure>
  );
}

function Noeud({
  cle,
  texte,
  or = false,
  regle = false,
  className,
}: {
  cle: string;
  texte: string;
  or?: boolean;
  regle?: boolean;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-md border bg-midnight px-3.5 py-3",
        or ? "border-gold/70" : regle ? "border-white/25" : "border-white/14",
        className,
      )}
    >
      <p
        className={cn(
          "font-mono text-[0.66rem] tracking-[0.1em] uppercase",
          or ? "text-gold" : "text-muted",
        )}
      >
        {cle}
      </p>
      <p className="mt-1 text-[0.86rem] leading-snug text-paper">{texte}</p>
    </div>
  );
}
