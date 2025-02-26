import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import { ApolloProvider } from "@apollo/client";
import client from "./apolloClient";
import Articles from "./pages/Articles";
import NewArticle from "./pages/NewArticle";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Register from "./pages/Register";

const Main: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem("token")
  );

  const [username, setUsername] = useState("John Doe"); // ⚡ Exemple d'utilisateur

  // Fonction de déconnexion
  const handleLogout = () => {
    localStorage.removeItem("token"); // Supprimer le token (ou autre méthode)
    setIsAuthenticated(false);
    setUsername("");
  };

  return (
    <React.StrictMode>
    <ApolloProvider client={client}>
      <BrowserRouter>
      <Menu onLogout={handleLogout} username={username}/>
        <Routes>
          {/* Route publique */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login onLogin={() => setIsAuthenticated(true)} />} />
          <Route path="/Articles" element={<Articles />} />
          <Route path="/NewArticle" element={<NewArticle />} />
          <Route path="/register" element={<Register onRegister={() => setIsAuthenticated(true)} />} />

          {/* Route protégée */}
          <Route path="/dashboard" element={ <ProtectedRoute isAuthenticated={isAuthenticated}> <Dashboard /> </ProtectedRoute> }/>

          {/* Redirection conditionnelle */}
          <Route path="/old-route" element={<Navigate to="/" />} />

          {/* Route 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ApolloProvider>
    </React.StrictMode>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Main />
  </React.StrictMode>
);
