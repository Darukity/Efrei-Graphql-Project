import { Article } from "@prisma/client";
import { QueryResolvers } from "../../types.js";

export const getArticles: QueryResolvers["getArticles"] = async (_, __, { dataSources: { db } }) => {
  try {
    const articles: Article[] = await db.article.findMany({});

    return articles.map((article: Article) => ({
      ...article,
    }));
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
};

