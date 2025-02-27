import { MutationResolvers } from "../../types.js";

export const addComment: MutationResolvers["addComment"] = async (_, { articleId, content }, { dataSources: { db }, user }) => {
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "You must be logged in to comment on an article",
      comment: null,
    };
  }

  try {
    // Vérifier si l'article existe
    const article = await db.article.findUnique({
      where: { id: articleId },
    });

    if (!article) {
      return {
        code: 404,
        success: false,
        message: "Article not found",
        comment: null,
      };
    }

    // Ajouter le commentaire
    const newComment = await db.comment.create({
      data: {
        content,
        userId: user.id,
        articleId,
      },
      include: {
        user: true, // Inclure l'utilisateur qui commente
      },
    });

    return {
      code: 201,
      success: true,
      message: "Comment added successfully",
      comment: {
        id: newComment.id,
        content: newComment.content,
        createdAt: newComment.createdAt.toISOString(),
        user: newComment.user,
      },
    };
  } catch (error) {
    console.error("Error adding comment:", error);
    return {
      code: 500,
      success: false,
      message: "Failed to add comment",
      comment: null,
    };
  }
};
