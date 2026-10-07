import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/icons";
import type { cas as tousLesCas } from "@/content/site";

type Cas = (typeof tousLesCas)[number];

// Carte de cas pour l'accueil : image 3D, secteur, resultat. Mene a la fiche complete.
export function CaseCard({ cas }: { cas: Cas }) {
  return (
    <Link
      href={`/realisations#${cas.slug}`}
      className="group flex h-full flex-col overflow-hidden rounded-lg border border-white/10 bg-panel transition-colors hover:border-gold/45 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold"
    >
      <div className="relative h-60 overflow-hidden">
        <Image
          src={cas.image}
          alt=""
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex flex-1 flex-col p-7">
        <p className="font-mono text-label uppercase text-muted">{cas.surtitre}</p>
        <h3 className="mt-3 text-h3">{cas.titre}</h3>
        <span className="mt-auto inline-flex items-center gap-2 pt-6 text-small font-semibold text-gold">
          Lire le cas
          <IconArrowRight className="h-[1.1em] w-[1.1em] transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
