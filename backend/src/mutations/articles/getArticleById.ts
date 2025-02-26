import { QueryResolvers } from "../../types.js";

export const getArticleById: QueryResolvers["getArticleById"] = async (_, { id }, { dataSources: { db } }) => {
  console.log("📌 Recherche de l'article ID :", id);

  try {
    const article = await db.article.findUnique({
      where: { id },
      include: {
        author: true, // ✅ Inclure l'auteur de l'article
        comments: {
          include: {
            user: true, // ✅ Inclure l'utilisateur ayant écrit le commentaire
          },
        },
        likes: true, // ✅ Récupérer les likes
      },
    });

    if (!article) {
      console.log("❌ Article non trouvé :", id);
      return null;
    }

    return {
      ...article,
      createdAt: article.createdAt.toISOString(), // ✅ Convertir la date en string
      likesCount: article.likes.length, // ✅ Nombre total de likes
    };
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'article :", error);
    return null;
  }
};
