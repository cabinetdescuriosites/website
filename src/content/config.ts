import { defineCollection, z } from "astro:content";

const produits = defineCollection({
  type: "content",
  schema: z.object({
    titre: z.string(),
    prix: z.number(),
    // .catch : une catégorie inconnue (ancienne fiche, faute de frappe) ne casse
    // jamais le build — l'objet bascule en « Curiosités ».
    categorie: z.enum(["Arts de la table", "Luminaires", "Petit mobilier", "Décoration", "Curiosités", "Pièces d’exception"]).catch("Curiosités"),
    statut: z.enum(["Disponible", "Réservé", "Vendu"]).default("Disponible"),
    // L'admin exige au moins 1 photo, mais une fiche incomplète ne doit
    // jamais faire tomber le build : le site affiche alors un placeholder.
    photos: z.array(z.string()).default([]),
    etat: z.string().optional(),
    dimensions: z.string().optional(),
    epoque: z.string().optional(),
    livraison: z.string().default("Emballage soigné · France 8–12 € · Retrait Lyon possible"),
    date: z.coerce.date(),
  }),
});

export const collections = { produits };
