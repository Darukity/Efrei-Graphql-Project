import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Article } from "../generated/graphql";

const GET_ARTICLES = gql`
  query GetArticles {
  getArticles {
    id
    title
    likesCount
    createdAt
    content
    author {
      username
    }
  }
}
`;

const Articles: React.FC = () => {
    const { data, loading, error } = useQuery(GET_ARTICLES);
  
    if (loading) return <p>Chargement...</p>;
    if (error) return <p>Erreur : {error.message}</p>;
  
    return (
      <div>
        <h1>Articles</h1>
        {data?.getArticles.map((article: Article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Auteur: {article.author.username}</p>
            <p>Likes: {article.likesCount}</p>
          </div>
        ))}
      </div>
    );
  };

export default Articles;
