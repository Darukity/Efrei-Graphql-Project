import { Article } from "@prisma/client";
import { MutationResolvers } from "../../types.js";

export const deleteArticle: MutationResolvers["deleteArticle"] = async (
  _,
  { id },
  { dataSources: { db }, user }
) => {
  

  if (!user) {
   
    return {
      code: 401,
      success: false,
      message: "You must be logged in to delete an article",
    };
  }

  // Vérifie si l'article existe
  const article: Article = await db.article.findUnique({
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
      message: "You are not authorized to delete this article",
    };
  }

  // Supprime l'article
  try {
    await db.article.delete({
      where: { id },
    });

    

    return {
      code: 200,
      success: true,
      message: "Article deleted successfully",
    };
  } catch (error) {
    
    return {
      code: 500,
      success: false,
      message: "Failed to delete article",
    };
  }
};
