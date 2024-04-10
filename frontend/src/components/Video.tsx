import React, {ReactElement} from 'react';
import { Action } from "../models/actionModel";
import { Alert } from "@mui/material";

interface VideoProps {
    queueAction: Action[]; // Liste des actions en file d'attente
    allActions: Action[]; // Liste de toutes les actions disponibles
}

let action: Action; // Action en cours d'exécution
let creditAction: number; // Crédit de l'action en cours d'exécution
let oldQueue: Action[] = []; // Ancienne liste des actions en file d'attente
let oldAllAction: Action[] = []; // Ancienne liste de toutes les actions disponibles
let isEqual: boolean = false; // Indique si une action est en cours d'exécution
let noCredit: boolean = false; // Indique si l'action en cours n'a plus de crédits

/**
 * Composant VideoComponent pour afficher la vidéo de l'action en cours d'exécution.
 * @param {VideoProps} props - Les propriétés des crédits.
 * @returns {ReactElement} - Le composant d'affichage des crédits.
 */
const VideoComponent: React.FC<VideoProps> = ({ queueAction, allActions }: VideoProps): ReactElement => {
    // Vérifie les changements dans la file d'attente des actions
    if (queueAction.length > oldQueue.length ){
        // Copie la liste de toutes les actions à chaque changement dans la file d'attente
        oldAllAction = allActions.slice();
    }
    if (oldQueue.length > queueAction.length) {
        // Récupère la dernière action de la file d'attente
        action = oldQueue.slice(-1)[0];
        // Parcourt les actions pour obtenir le crédit de l'action en cours
        oldAllAction.map((act) => {
            if (action.typeAction === act.typeAction) {
                creditAction = act.credits;
            }
        })
        oldQueue = [];
        if (creditAction > 0) {
            isEqual = true; // Indique qu'une action est en cours d'exécution
            noCredit = false;
        } else {
            noCredit = true; // Indique que l'action en cours n'a plus de crédits
        }
    } else if (oldQueue.length < queueAction.length) {
        oldQueue = queueAction.slice();
    }

    // Réinitialise isEqual à false lorsque la vidéo se termine
    const handleVideoEnd = () => {
        isEqual = false;
    };

    return (
        <div className={"video-container"}>
            {
                isEqual ? (
                    <div className={"play-video"}>
                        <h2>Action en cours d'exécution ⚡</h2>
                        <video controls width="600" onEnded={handleVideoEnd} autoPlay muted>
                            <source src={require(`../assets/videos/${action.img}.mp4`)} type="video/mp4"/>
                            Votre navigateur ne supporte pas la lecture de vidéos HTML5.
                        </video>
                    </div>
                ) : (
                    <div className={"no-video"}>
                        <h1>Aucune action en cours d'exécution ⏸️</h1>
                        {
                            noCredit ? (
                                <Alert severity="warning" onClose={() => {noCredit = false}}>Crédit insuffisant pour exécuter cette action.</Alert>
                            ) : undefined
                        }
                    </div>
                )
            }
        </div>
    );
};

export default VideoComponent;
