import React from "react";
import { useQuery } from "@apollo/client";
import { gql } from "@apollo/client";
import { Article } from "../generated/graphql";
import { Link } from "react-router-dom";
import "../styles/Articles.css";

const GET_USER_ARTICLES = gql`
  query GetUserArticles {
    getUserArticles {
      code
      success
      message
      articles {
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
  }
`;

const UserArticles: React.FC = () => {
  const { data, loading, error } = useQuery(GET_USER_ARTICLES);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  return (
    <div className="articles-container">
      <h1>Mes Articles</h1>
      {data?.getUserArticles.articles.length === 0 ? (
        <p>Aucun article trouvé.</p>
      ) : (
        data?.getUserArticles.articles.map((article: Article) => (
          <div key={article.id} className="article-card">
            <Link to={`/article/${article.id}`} className="article-link">
                <h2>{article.title}</h2>
                <p>{article.content}</p>
                <p>Auteur: {article.author.username}</p>
                <p>Likes: {article.likesCount}</p>
            </Link>
          </div>
        ))
      )}
    </div>
  );
};

export default UserArticles;