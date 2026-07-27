import { defineCollection, z } from "astro:content";

const produits = defineCollection({
  type: "content",
  schema: z.object({
    titre: z.string(),
    prix: z.number(),
    categorie: z.enum(["Céramique", "Verrerie", "Mobilier", "Luminaire", "Curiosité"]),
    statut: z.enum(["Disponible", "Réservé", "Vendu"]).default("Disponible"),
    photos: z.array(z.string()).min(1),
    etat: z.string().optional(),
    dimensions: z.string().optional(),
    epoque: z.string().optional(),
    livraison: z.string().default("Emballage soigné · France 8–12 € · Retrait Lyon possible"),
    date: z.coerce.date(),
  }),
});

export const collections = { produits };
