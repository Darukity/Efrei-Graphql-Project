import React from "react";
import { Link } from "react-router-dom";

const NotFound: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold text-red-600">404 - Page non trouvée</h1>
      <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
        Retour à l'accueil
      </Link>
    </div>
  );
};

export default NotFound;
