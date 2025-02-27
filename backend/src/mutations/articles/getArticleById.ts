import { QueryResolvers } from "../../types.js";

export const getArticleById: QueryResolvers["getArticleById"] = async (_, { id }, { dataSources: { db } }) => {
  console.log("Recherche de l'article ID :", id);

  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        author: true, 
        comments: {
          include: {
            user: true,
          },
        },
        likes: true, 
      },
    });

    if (!article) {
      console.log("Article non trouvé :", id);
      return null;
    }

    return {
      ...article,
      createdAt: article.createdAt.toISOString(), 
      likesCount: article.likes.length, 
    };
  } catch (error) {
    console.error(" Erreur lors de la récupération de l'article :", error);
    return null;
  }
};
