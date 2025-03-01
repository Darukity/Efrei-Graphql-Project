import { MutationResolvers } from "../../types.js";

export const addLike: MutationResolvers["addLike"] = async (_, { articleId }, { dataSources: { db }, user }) => {
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "You must be logged in to like an article",
      likesCount: 0,
    };
  }

  try {
    // Vérifier si l'utilisateur a déjà liké cet article
    const existingLike = await db.like.findUnique({
      where: {
        userId_articleId: {
          userId: user.id,
          articleId: articleId,
        },
      },
    });

    if (existingLike) {
      // Supprimer le like existant (unlike)
      await db.like.delete({
        where: {
          userId_articleId: {
            userId: user.id,
            articleId: articleId,
          },
        },
      });

      return {
        code: 200,
        success: true,
        message: "Like removed successfully",
        likesCount: await db.like.count({ where: { articleId } }),
      };
    }

    // Ajouter le like s'il n'existe pas encore
    await db.like.create({
      data: {
        userId: user.id,
        articleId: articleId,
      },
    });

    // Retourner le nombre total de likes après l'ajout
    const likesCount: number = await db.like.count({ where: { articleId } });

    return {
      code: 201,
      success: true,
      message: "Article liked successfully",
      likesCount,
    };
  } catch (error) {
    console.error("Error adding like:", error);
    return {
      code: 500,
      success: false,
      message: "Failed to like article",
      likesCount: 0,
    };
  }
};