import type { SVGProps } from "react";

/**
 * Icones ecrites a la main plutot qu'une librairie : moves.md #7 impose un trait
 * de 2px avec des caps arrondis et un poids visuel constant. Les huit dont le site
 * a besoin pesent moins qu'un import, et le trait reste exactement sous controle.
 */

type Props = SVGProps<SVGSVGElement>;

function Line({ children, ...props }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      {...props}
    >
      {children}
    </svg>
  );
}

function Solid({ children, ...props }: Props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      {children}
    </svg>
  );
}

/* ------------------------------------------------------------- interface */

export const IconArrowRight = (p: Props) => (
  <Line {...p}>
    <path d="M5 12h14M13 6l6 6-6 6" />
  </Line>
);

export const IconArrowDown = (p: Props) => (
  <Line {...p}>
    <path d="M12 5v14M6 13l6 6 6-6" />
  </Line>
);

export const IconCheck = (p: Props) => (
  <Line {...p}>
    <path d="M4 12.5l5 5L20 6.5" />
  </Line>
);

export const IconShield = (p: Props) => (
  <Line {...p}>
    <path d="M12 3l7 3v5.5c0 4.3-2.9 8.2-7 9.5-4.1-1.3-7-5.2-7-9.5V6l7-3Z" />
    <path d="M9 12l2 2 4-4" />
  </Line>
);

/* ---------------------------------------------------------------- reseaux */
/* Marques : glyphes pleins, seul cas ou l'on deroge au trait (illisibles en line) */

export const IconYoutube = (p: Props) => (
  <Solid {...p}>
    <path d="M21.6 7.2a2.5 2.5 0 0 0-1.8-1.8C18.2 5 12 5 12 5s-6.2 0-7.8.4A2.5 2.5 0 0 0 2.4 7.2C2 8.8 2 12 2 12s0 3.2.4 4.8a2.5 2.5 0 0 0 1.8 1.8C5.8 19 12 19 12 19s6.2 0 7.8-.4a2.5 2.5 0 0 0 1.8-1.8C22 15.2 22 12 22 12s0-3.2-.4-4.8ZM10 15.2V8.8l5.2 3.2L10 15.2Z" />
  </Solid>
);

export const IconX = (p: Props) => (
  <Solid {...p}>
    <path d="M17.5 3h3.2l-7 8 8.2 10h-6.4l-5-6.1L4.7 21H1.5l7.5-8.6L1.1 3h6.6l4.5 5.6L17.5 3Zm-1.1 16.1h1.8L7.7 4.8H5.8l10.6 14.3Z" />
  </Solid>
);

export const IconLinkedin = (p: Props) => (
  <Solid {...p}>
    <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-.95 1.83-1.95 3.76-1.95 4.02 0 4.76 2.5 4.76 5.76V21h-4v-5.6c0-1.34-.03-3.07-1.9-3.07-1.9 0-2.19 1.46-2.19 2.97V21h-4V9Z" />
  </Solid>
);

export const IconMail = (p: Props) => (
  <Line {...p}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3.5 7 8.5 6 8.5-6" />
  </Line>
);
