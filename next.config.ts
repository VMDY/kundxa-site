import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Un package-lock.json traine dans C:\Users\mendy\ : sans cette ligne, Turbopack
  // deduit ce dossier comme racine du workspace et trace les fichiers depuis la
  // maison de l'utilisateur (build lent, traces fausses, deploiement Netlify casse).
  turbopack: { root: path.resolve(__dirname) },
  outputFileTracingRoot: path.resolve(__dirname),

  // En-tetes de securite. Le site n'a pas de zone authentifiee : ces trois-la
  // suffisent, et aucune ne casse l'iframe Cal.com (qui est sortante, pas entrante).
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
        ],
      },
    ];
  },
};

export default nextConfig;
