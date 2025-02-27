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
    const article = await db.article.create({
      data: {
        title,
        content,
        authorId: user.id,
      }
    });

    return {
      code: 201,
      success: true,
      message: "Article created successfully",
      article: {
        ...article,
      },
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



