import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Article } from "../generated/graphql";
import { Link } from "react-router-dom";
import "../styles/Articles.css";


const GET_ARTICLES = gql`
  query GetArticles {
  getArticles {
    id
    title
    likesCount
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
      <div className="articles-container">
      <h1>Articles</h1>
      {data?.getArticles.map((article: Article) => (
        <div key={article.id} className="article-card">
          <Link to={`/article/${article.id}`} className="article-link">
            <h2>{article.title}</h2>
            <p>{article.content}</p>
            <p>Auteur: {article.author.username}</p>
            <p>Likes: {article.likesCount}</p>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default Articles;
