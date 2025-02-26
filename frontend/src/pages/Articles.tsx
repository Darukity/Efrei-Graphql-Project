import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Article } from "../generated/graphql";

const GET_ARTICLES = gql`
  query GetArticles {
    articles {
      id
      title
      content
      likes
      comments {
        id
        content
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
        {data?.articles.map((article: Article) => (
          <div key={article.id}>
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Auteur: {article.author.name}</p>
            <p>Likes: {article.likes}</p>
          </div>
        ))}
      </div>
    );
  };

export default Articles;
