import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "../styles/Register.css"; // Assurez-vous de créer ce fichier CSS

// Mutation pour enregistrer un utilisateur
const REGISTER_MUTATION = gql`
mutation CreateUser($username: String!, $password: String!) {
  createUser(username: $username, password: $password) {
    success
  }
}
`;

interface RegisterProps {
  onRegister: (username: string) => void;
}

const Register: React.FC<RegisterProps> = ({ onRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [register, { loading, error }] = useMutation(REGISTER_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await register({ variables: { username, password } });
      if (data.createUser.success) {
        navigate("/login");
      } else {
        console.error("Échec de l'inscription :", data.createUser.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="register-form-container">
      <h2>Créer un compte</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? "Création du compte..." : "Créer un compte"}
        </button>
        {error && <p className="error-message">Erreur: {error.message}</p>}
      </form>
    </div>
  );
};

export default Register;
