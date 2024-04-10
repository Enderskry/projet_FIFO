import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './style/app.scss';
import Queue from './components/Queue';
import { Action } from "./models/actionModel";
import ActionComponent from "./components/Actions";
import Credits from "./components/Crédits";
import VideoComponent from "./components/Video";
import { Alert } from "@mui/material";

// Composant principal de l'application
const App: React.FC = () => {
    // State pour stocker la file d'attente des actions
    const [queueAction, setQueueAction] = useState<Action[]>([]); // File d'attente des actions
    const [actions, setActions] = useState<Action[]>([]); // Liste de toutes les actions disponibles
    const [showAlertServer, setAlert] = useState<boolean>(false); // Affichage de l'alerte en cas de connexion au serveur impossible

    // Effet secondaire pour récupérer la file d'attente et les actions disponibles
    useEffect(() => {
        const fetchQueue = async () => {
            try {
                // Récupération de la file d'attente et des actions disponibles depuis l'API
                const allQueue = await axios.get('http://localhost:8080/api/queue');
                const allActions = await axios.get('http://localhost:8080/api/actions');
                // Réinitialisation de l'alerte en cas de succès
                setAlert(false);
                // Mise à jour de la file d'attente et des actions avec les données reçues
                setQueueAction(allQueue.data.reverse());
                setActions(allActions.data);
            } catch (error) {
                // Gestion des erreurs en cas de connexion au serveur impossible
                console.error('Erreur lors de la récupération de la file d\'attente :', error);
                setAlert(true); // Affichage de l'alerte en cas d'erreur
            }
        };
        fetchQueue(); // Appel initial de la fonction fetchQueue lors du montage du composant

        // Mise en place d'un intervalle pour rafraîchir la file d'attente à intervalles réguliers
        const intervalId = setInterval(fetchQueue, 1000);

        // Nettoyage de l'intervalle lorsque le composant est démonté ou que l'effet est réexécuté
        return () => clearInterval(intervalId);
    }, []); // Utilisation d'un tableau de dépendances vide pour n'exécuter l'effet qu'une seule fois

    return (
        <div className="App">
            <header className="App-header">
                <h1 className={"title"}>Projet Queue FIFO 🏐</h1>
                {showAlertServer ? (
                    // Affichage de l'alerte en cas de connexion au serveur impossible
                    <Alert severity="error" className={"serveur-alert"}>Connexion avec le serveur impossible.</Alert>
                ) : undefined}
                {/* Composant Queue pour afficher la file d'attente */}
                <Queue actions={actions} queue={queueAction} handleActionClick={(action) => {
                    // Gestion du clic sur une action pour l'ajouter à la file d'attente
                    if (queueAction.length < 10) {
                        axios.post('http://localhost:8080/api/queue', action)
                            .then(response => {
                                // Mise à jour de la file d'attente avec les données reçues
                                setQueueAction(response.data.reverse());
                            })
                            .catch(error => {
                                // Gestion des erreurs lors de la requête POST
                                console.error('Erreur lors de la récupération des données :', error);
                            });
                    }
                }}>
                    {/* Affichage des composants ActionComponent dans la file d'attente */}
                    {queueAction.map((action, index) => (
                        <ActionComponent key={index} img={action.img} credits={action.credits} name={action.name}
                                         typeAction={action.typeAction}/>
                    ))}
                </Queue>
                {/* Composant Credits pour afficher les crédits des actions */}
                <Credits actions={actions}></Credits>
                {/* Composant VideoComponent pour afficher la vidéo de l'action en cours d'exécution */}
                <VideoComponent queueAction={queueAction} allActions={actions} ></VideoComponent>
            </header>
        </div>
    );
}

export default App;
