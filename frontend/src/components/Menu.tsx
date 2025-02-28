import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Assurez-vous que react-router-dom est installé pour la navigation
import "../styles//Menu.css";


interface MenuProps {
  onLogout: () => void;  // Fonction pour gérer la déconnexion
  username: string;       // Nom de l'utilisateur
}

const Menu: React.FC<MenuProps> = ({ onLogout, username }) => {
  const navigate = useNavigate();
  return (
    <header className="menu-container">
      <div className="logo-title">
        <img src="https://thumbs.dreamstime.com/b/cercle-d-entrelacs-circulaire-icône-géométrique-logo-illustration-du-vecteur-brut-graphiques-clipart-245536748.jpg" alt="Logo" className="logo" />
        <h1 className="site-title">LinkSphere</h1>
      </div>
      
      <nav className="nav-links">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/articles" className="nav-link">Articles</Link>
        <Link to="/NewArticle" className="nav-link">New Article</Link>
        {username && <Link to="/my-articles" className="nav-link">Mes Articles</Link>}
      </nav>

      <div className="auth-section">
        {username ? (
          <div className="profile-section">
            <span className="username">{username}</span>
            <button onClick={onLogout} className="logout-button">Se déconnecter</button>
          </div>
        ) : (
          <div className="login-register">
            <button onClick={() => navigate("/login")} className="auth-button">Se connecter</button>
            <button onClick={() => navigate("/register")} className="auth-button repousse">S'inscrire</button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Menu;