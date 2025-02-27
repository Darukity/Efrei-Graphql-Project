import { QueryResolvers } from "../../types.js";

export const getUserArticles: QueryResolvers["getUserArticles"] = async (
  _,
  __,
  { dataSources: { db }, user }
) => {
  if (!user) {
    return {
      code: 401,
      success: false,
      message: "You must be logged in to view your articles",
      articles: [],
    };
  }

  try {
    const articles = await db.article.findMany({
      where: {
        authorId: user.id,
      },
    });

    return {
      code: 200,
      success: true,
      message: "Articles retrieved successfully",
      articles,
    };
  } catch (error) {
    console.error("Error retrieving articles:", error);
    return {
      code: 500,
      success: false,
      message: "Failed to retrieve articles",
      articles: [],
    };
  }
};
