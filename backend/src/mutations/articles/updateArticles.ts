import { MutationResolvers } from "../../types.js";

export const updateArticle: MutationResolvers["updateArticle"] = async (
  _,
  { id, title, content },
  { dataSources: { db }, user }
) => {
  

  if (!user) {
   
    throw new Error("You must be logged in to update an article");
  }

  // Vérifie si l'article existe
  const article = await db.article.findUnique({
    where: { id },
  });

  

  if (!article) {
   
    throw new Error("Article not found");
  }

  // Vérifie si l'utilisateur est l'auteur
  if (article.authorId !== user.id) {
    
    throw new Error("You are not authorized to update this article");
  }

  // Met à jour l'article
  try {
    const updatedArticle = await db.article.update({
      where: { id },
      data: {
        title: title ?? article.title,
        content: content ?? article.content,
      },
    });

    

    return updatedArticle;
  } catch (error) {
    
    throw new Error("Failed to update article");
  }
};



