import { MutationResolvers } from "../../types.js";

export const updateArticle: MutationResolvers["updateArticle"] = async (
  _,
  { id, title, content },
  { dataSources: { db }, user }
) => {
  

  if (!user) {
    return {
      code: 401,
      success: false,
      message: "You must be logged in to update an article",
    };
  }

  // Vérifie si l'article existe
  const article = await db.article.findUnique({
    where: { id },
  });

  

  if (!article) {
    return {
      code: 404,
      success: false,
      message: "Article not found",
    };
  }

  // Vérifie si l'utilisateur est l'auteur
  if (article.authorId !== user.id) {
    return {
      code: 403,
      success: false,
      message: "You are not authorized to edit this article",
    };
  }

  // Met à jour l'article
  try {
    await db.article.update({
      where: { id },
      data: {
        title: title ?? article.title,
        content: content ?? article.content,
      },
    });

    return {
      code: 200,
      success: true,
      message: "Article updated successfully",
    };
  } catch (error) {
    
    return {
      code: 500,
      success: false,
      message: "Failed to delete article",
    };
  }
};