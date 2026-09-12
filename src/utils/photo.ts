// Les photos ajoutées depuis l'admin arrivent telles quelles depuis le téléphone (plusieurs Mo).
// En ligne, on les fait passer par le service d'images de Netlify : redimensionnées à la taille
// affichée et converties au meilleur format du navigateur. En local (astro dev), on garde le fichier.
const CDN = import.meta.env.PROD;

export function photo(src: string, largeur: number): string {
  if (!CDN || !src.startsWith("/assets/") || src.endsWith(".svg")) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=${largeur}&q=80`;
}

// Aperçu de partage (WhatsApp, Facebook…) au gabarit 1200×628, recadré depuis la première photo.
export function apercuPartage(src: string): string {
  if (!CDN || !src.startsWith("/assets/") || src.endsWith(".svg")) return src;
  return `/.netlify/images?url=${encodeURIComponent(src)}&w=1200&h=628&fit=cover&fm=jpg&q=82`;
}
