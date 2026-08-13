// Tri « variété » : espace les éléments partageant la même clé pour éviter
// deux pièces semblables côte à côte (deux assiettes, deux réveils…).
// Déterministe : à contenu identique, ordre identique à chaque build.
function intercaler<T>(items: T[], cle: (item: T) => string): T[] {
  const groupes = new Map<string, T[]>();
  for (const it of items) {
    const k = cle(it);
    if (!groupes.has(k)) groupes.set(k, []);
    groupes.get(k)!.push(it);
  }
  const resultat: T[] = [];
  let derniere = "";
  while (resultat.length < items.length) {
    const candidats = [...groupes.entries()]
      .filter(([, v]) => v.length > 0)
      .sort((a, b) => b[1].length - a[1].length);
    const choix = candidats.find(([k]) => k !== derniere) ?? candidats[0];
    resultat.push(choix[1].shift()!);
    derniere = choix[0];
  }
  return resultat;
}

type Produit = { slug: string; data: { categorie: string; titre: string; date: Date } };

// Variété à deux niveaux : d'abord au sein de chaque catégorie (par type
// d'objet — premier mot du titre), puis entre catégories.
export function varier<T extends Produit>(produits: T[]): T[] {
  const parCategorie = new Map<string, T[]>();
  for (const p of produits) {
    const k = p.data.categorie;
    if (!parCategorie.has(k)) parCategorie.set(k, []);
    parCategorie.get(k)!.push(p);
  }
  const groupesVaries: T[] = [];
  for (const [, groupe] of parCategorie) {
    groupesVaries.push(...intercaler(groupe, (p) => p.data.titre.split(/\s+/)[0].toLowerCase()));
  }
  return intercaler(groupesVaries, (p) => p.data.categorie);
}
