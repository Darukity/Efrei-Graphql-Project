import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { gql } from "@apollo/client";
import "../styles/Login.css";


const LOGIN_MUTATION = gql`
  mutation SignIn($username: String!, $password: String!) {
  signIn(username: $username, password: $password) {
    message
    success
    token
  }
}
`;

interface LoginProps {
  onLogin: (username: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [login, { loading, error }] = useMutation(LOGIN_MUTATION);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { data } = await login({ variables: { username, password } });
  
      if (data.signIn.success) {
        localStorage.setItem("token", data.signIn.token);
        localStorage.setItem("username", username); 
        onLogin(username); 
        navigate("/");
      } else {
        console.error("Échec de connexion :", data.signIn.message);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="login-form-container">
      <h2>Connexion</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit" disabled={loading}>
          {loading ? "Connexion..." : "Se connecter"}
        </button>
        {error && <p>Erreur: {error.message}</p>}
      </form>
    </div>
  );
};

export default Login;
