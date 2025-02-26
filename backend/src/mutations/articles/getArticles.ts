import { QueryResolvers } from "../../types.js";

export const getArticles: QueryResolvers["getArticles"] = async (_, __, { dataSources: { db } }) => {
  try {
    const articles = await db.article.findMany({
      include: {
        author: true, // ✅ Récupérer l’auteur de l’article
      },
    });

    return articles.map((article) => ({
      ...article,
      createdAt: article.createdAt.toISOString(), // ✅ Convertir la date en string
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    console.log ("done")
    return [];
  }
};
