import { QueryResolvers } from "../../types.js";

export const getArticles: QueryResolvers["getArticles"] = async (_, __, { dataSources: { db } }) => {
  try {
    const articles = await db.article.findMany({
      include: {
        author: true, 
        likes: true, 
      },
    });

    return articles.map((article) => ({
      ...article,
      createdAt: article.createdAt.toISOString(),
      likesCount: article.likes.length,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

