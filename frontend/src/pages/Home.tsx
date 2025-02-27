import React from "react";
import "../styles/Home.css";
import { Link, useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="home-container">
      <h1>Bienvenue sur notre réseau social de test</h1>
      <p className="home-description">
        Ce site a été construit dans le cadre d'un projet scolaire. Il simule un réseau social où les utilisateurs peuvent s'inscrire, publier des articles, commenter les publications d'autres utilisateurs, et "liker" des articles.
      </p>

      <div className="articles-gallery">
        <div className="article-card article-width">
          <img src="https://i.pinimg.com/736x/d7/8d/19/d78d19cd85fc8fe02c9e4c3878459c86.jpg" alt="Article 1" />
          <h3>Article 1</h3>
          <p>La Chute la Plus Drôle du Moment !
          Une vidéo hilarante circule sur les réseaux : une chute si imprévisible qu’elle a fait exploser de rire des milliers d’internautes. Vous ne devinerez jamais ce qui s’est passé après !</p>
          <button onClick={() => navigate("/articles")}>Aller voir</button>
        </div>

        <div className="article-card article-width">
          <img src="https://www.shutterstock.com/image-photo/cute-cat-tilting-head-baby-600nw-2492403467.jpg" height="280px" alt="Article 2" />
          <h3>Article 2</h3>
          <p>Pourquoi On Ne Peut Pas Leur Résister ?
          Les chats envahissent nos fils d’actualité et font craquer des millions de personnes chaque jour. Qu'est-ce qui rend ces boules de poils si irrésistibles ? Découvrez les secrets de leur charme !</p>
          <button onClick={() => navigate("/articles")}>Aller voir</button>
        </div>

        <div className="article-card article-width2">
          <img src="https://s2.dmcdn.net/v/GRE7p1Zf2y_fqAoqh/x1080" width="600px" alt="Article 3" />
          <h3>Article 3</h3>
          <p>LE BURGER FAIT LA TAILLE DE MA TABLE !
          Un restaurant a créé un burger si énorme qu’il rivalise avec une table ! Qui osera le manger en entier ? Découvrez ce défi culinaire hors du commun !</p>
          <button onClick={() => navigate("/articles")}>Aller voir</button>
        </div>
      </div>
    </div>
  );
};

export default Home;
