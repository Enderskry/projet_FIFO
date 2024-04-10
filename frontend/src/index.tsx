import React from 'react';
import ReactDOM from 'react-dom';
import { createRoot } from 'react-dom/client';
import "./style/index.scss";
import App from "./App";

// Récupération de l'élément DOM cible
const rootElement = document.getElementById('root');

if (rootElement) {
    // Création d'une racine React pour le rendu de l'application
    const root = createRoot(rootElement);
    // Rendu de l'application dans le mode StrictMode pour détecter les problèmes potentiels
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
} else {
    // Affichage d'une erreur si l'élément DOM avec l'ID 'root' est introuvable
    console.error("L'élément DOM avec l'ID 'root' est introuvable.");
}
