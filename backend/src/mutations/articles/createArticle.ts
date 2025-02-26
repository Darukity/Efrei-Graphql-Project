import { MutationResolvers } from "../../types.js";

export const createArticle: MutationResolvers["createArticle"] = async (
  _,
  { title, content },
  { dataSources: { db }, user }
) => {
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "You must be logged in to create an article",
      article: null,
    };
  }

  try {
    console.log("Database tables:", Object.keys(db)); // ✅ Vérifie si 'article' existe

    const article = await db.article.create({
      data: {
        title,
        content,
        authorId: user.id,
      },
      include: {
        author: true,
      },
    });

    return {
      code: 201,
      success: true,
      message: "Article created successfully",
      article,
    };
  } catch (error) {
    console.error("Error creating article:", error);
    return {
      code: 500,
      success: false,
      message: "Failed to create article",
      article: null,
    };
  }
};
