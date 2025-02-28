import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import { useParams, useNavigate } from "react-router-dom";
import { Article } from "../generated/graphql";
import "../styles/ArticleDetail.css";

// Query pour récupérer l'article par ID
const GET_ARTICLE_BY_ID = gql`
  query GetArticleById($id: ID!) {
    getArticleById(id: $id) {
      id
      title
      content
      likesCount
      createdAt
      author {
        username
      }
      comments {
        content
        createdAt
        id
        user {
          id
          username
        }
      }
    }
  }
`;

// Mutation pour ajouter un commentaire
const ADD_COMMENT = gql`
  mutation AddComment($articleId: ID!, $content: String!) {
    addComment(articleId: $articleId, content: $content) {
      success
      message
    }
  }
`;

// Mutation pour ajouter un like
const ADD_LIKE = gql`
  mutation AddLike($articleId: ID!) {
    addLike(articleId: $articleId) {
      success
      message
    }
  }
`;

// Mutation pour supprimer un article
const DELETE_ARTICLE = gql`
  mutation DeleteArticle($deleteArticleId: ID!) {
    deleteArticle(id: $deleteArticleId) {
      success
      message
    }
  }
`;

// Mutation pour mettre à jour un article
const UPDATE_ARTICLE = gql`
  mutation UpdateArticle($title: String, $content: String, $updateArticleId: String!) {
    updateArticle(title: $title, content: $content, id: $updateArticleId) {
      success
      message
    }
  }
`;

const ArticleDetail: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data, loading, error } = useQuery(GET_ARTICLE_BY_ID, {
    variables: { id },
  });

  const [commentContent, setCommentContent] = useState("");
  const [addComment] = useMutation(ADD_COMMENT);
  const [addLike] = useMutation(ADD_LIKE);
  const [deleteArticle] = useMutation(DELETE_ARTICLE);
  const [updateArticle] = useMutation(UPDATE_ARTICLE);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  // useEffect(() => {
  //   if (data) {
  //     setTitle(data.getArticleById.title);
  //     setContent(data.getArticleById.content);
  //   }
  // }, [data]);

  const handleAddComment = async () => {
    if (commentContent) {
      try {
        const { data } = await addComment({ variables: { articleId: id, content: commentContent } });
        if (data.addComment.success) {
          setCommentContent(""); 
          window.location.reload();
        }
        else {
          window.alert(data.addComment.message)
          console.log(data.addComment)
        }
      } catch (error) {
        console.error("Error adding comment:", error);
      }
    }
  };

  const handleAddLike = async () => {
    try {
      const { data } = await addLike({ variables: { articleId: id } });
      if (data.addLike.success) {
        window.location.reload();
      }
      else {
        window.alert(data.addLike.message);
      }
    } catch (error) {
      console.error("Error adding like:", error);
    }
  };

  const handleDeleteArticle = async () => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer cet article ?")) {
      try {
        await deleteArticle({ variables: { deleteArticleId: id } });
        navigate("/articles");
      } catch (error) {
        console.error("Error deleting article:", error);
      }
    }
  };

  const handleUpdateArticle = async () => {
    try {
      const { data } = await updateArticle({
        variables: {
          title,
          content,
          updateArticleId: article.id,
        },
      });
      if (data.updateArticle.success) {
        setIsEditing(false); // Quitter le mode édition après la mise à jour
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'article", error);
    }
  };

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur : {error.message}</p>;

  const article: Article = data?.getArticleById;
  const isAuthor = localStorage.getItem('username') === article.author.username;
  
  return (
    <div className="article-detail-container">
      <h1>{article.title}</h1>
      <p><strong>Auteur:</strong> {article.author.username}</p>
      <p><strong>Publié le:</strong> {new Date(article.createdAt).toLocaleDateString()}</p>
      {isAuthor ? (
        <div className="edit-form">
          <div>
            <label>Titre</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label>Contenu</label>
            <textarea value={content} onChange={(e) => setContent(e.target.value)}/>
          </div>
          <button onClick={handleUpdateArticle}>Mettre à jour</button>
          <button onClick={() => setIsEditing(false)}>Annuler</button>
          <button onClick={handleDeleteArticle}>Delete</button>
        </div>
      ) : (
        <div className="article-content">
          <p>{article.content}</p>
          <p><strong>Likes:</strong> {article.likesCount}</p>
        </div>
      )}
      <button onClick={handleAddLike}>Like</button>

      <div className="comments-section">
        <h2>Commentaires</h2>

        {/* Liste des commentaires */}
        {article.comments && article.comments.length > 0 ? (
            article.comments.map((comment) => (
                <div key={comment?.id} className="comment">
                    <p>
                        <strong>{comment?.user.username}</strong> - 
                            {comment?.createdAt ? new Date(comment.createdAt).toLocaleDateString() : 'Date inconnue'}
                    </p>
                    <p>{comment?.content}</p>
                </div>
            ))
        ) : (
            <p>Aucun commentaire pour cet article.</p>
        )}

        {/* Formulaire pour ajouter un commentaire */}
        <textarea
          value={commentContent}
          onChange={(e) => setCommentContent(e.target.value)}
          placeholder="Ajouter un commentaire"
        />
        <button onClick={() => { 
          handleAddComment();
        }}>
          Ajouter un commentaire
        </button>

      </div>
    </div>
  );
};

export default ArticleDetail;
