import { Article } from "@prisma/client";
import { QueryResolvers } from "../../types.js";

export const getArticleById: QueryResolvers["getArticleById"] = async (_, { id }, { dataSources: { db } }) => {
  console.log("Recherche de l'article ID :", id);

  try {
    const article: Article = await db.article.findUnique({
      where: { id },
    });

    if (!article) {
      console.log("Article non trouvé :", id);
      return null;
    }

    return {
      ...article,
    };
  } catch (error) {
    console.error(" Erreur lors de la récupération de l'article :", error);
    return null;
  }
};
