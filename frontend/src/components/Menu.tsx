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
        <img src="https://files.oaiusercontent.com/file-V2QFSRueX4urbczqjP2sz6?se=2025-02-26T14%3A26%3A18Z&sp=r&sv=2024-08-04&sr=b&rscc=max-age%3D604800%2C%20immutable%2C%20private&rscd=attachment%3B%20filename%3D8e4c1068-5b3e-4234-b145-26c5db32651e.webp&sig=lrTj8eVlpTq7JdDWiNoNdtSaMEQs6RpoRm16ov9nnbw%3D" alt="Logo" className="logo" />
        <h1 className="site-title">LinkSphere</h1>
      </div>
      
      <nav className="nav-links">
        <Link to="/" className="nav-link">Accueil</Link>
        <Link to="/articles" className="nav-link">Articles</Link>
        <Link to="/NewArticle" className="nav-link">New Article</Link>
        <Link to="/contact" className="nav-link">Contact</Link>
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
