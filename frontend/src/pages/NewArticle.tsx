import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "../styles/NewArticle.css";

const CREATE_ARTICLE = gql`
  mutation CreateArticle($title: String!, $content: String!) {
    createArticle(title: $title, content: $content) {
      id
      title
      content
    }
  }
`;

const NewArticle: React.FC = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const [createArticle, { loading }] = useMutation(CREATE_ARTICLE, {
    onCompleted: () => {
      setMessage({ type: "success", text: "Article créé avec succès !" });
      setTitle("");
      setContent("");
    },
    onError: (error) => {
      setMessage({ type: "error", text: error.message });
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) {
      setMessage({ type: "error", text: "Veuillez remplir tous les champs." });
      return;
    }
    await createArticle({ variables: { title, content } });
  };

  return (
    <div className="new-article-container">
      <div className="new-article-card">
        <h2 className="new-article-title">Créer un nouvel article</h2>

        {message && (
          <p className={`new-article-message ${message.type === "success" ? "success" : "error"}`}>
            {message.text}
          </p>
        )}

        <form onSubmit={handleSubmit} className="new-article-form">
          <input
            type="text"
            placeholder="Titre de l'article"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="new-article-input"
          />

          <textarea
            placeholder="Contenu de l'article"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="new-article-textarea"
          />

          <button type="submit" className="new-article-button" disabled={loading}>
            {loading ? "Publication..." : "Publier"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default NewArticle;
