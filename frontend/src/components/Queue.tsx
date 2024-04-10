import React, {ReactElement, ReactNode} from 'react';
import { Action } from "../models/actionModel";
import { Alert } from "@mui/material";

// Props du composant Queue
interface QueueProps {
    children: ReactNode; // Contenu enfant
    actions: Action[]; // Liste des actions disponibles
    queue: Action[]; // File d'attente d'actions
    handleActionClick: (action: Action) => void; // Fonction de gestion du clic sur une action
}

// Variables pour la gestion des alertes
let showAlertLimit: boolean = false; // Indique si l'alerte de limite d'actions doit être affichée
let closeAlertLimit: boolean = false; // Indique si l'alerte de limite d'actions a été fermée

/**
 * Composant représentant l'affichage de la queue.
 * @param {QueueProps} props - Les propriétés des crédits.
 * @returns {ReactElement} - Le composant d'affichage des crédits.
 */
const Queue: React.FC<QueueProps> = ({ children, actions, queue, handleActionClick }: QueueProps): ReactElement => {
    // Vérifier si l'alerte de limite d'actions doit être affichée
    showAlertLimit = queue.length === 10;

    return (
        <div className="queue">
            {/* Titre de la file d'attente */}
            <h2>Queue d'actions (max: 10) 🔄</h2>

            {/* Afficher l'alerte de limite d'actions si nécessaire */}
            {showAlertLimit && !closeAlertLimit ? (
                <Alert className={"alert-full-action"} severity="warning" onClose={() => { closeAlertLimit = true }}>
                    Il y a trop d'actions, la queue est limitée à 10 actions
                </Alert>
            ) : undefined}

            {/* Contenu enfant */}
            <div className="actions-list">
                {children}
            </div>

            {/* Boutons d'actions */}
            <div className="action-buttons-content">
                {actions.map((action, index) => (
                    <a className={"action-button"} key={action.typeAction}
                       onClick={() => {
                           handleActionClick(action);
                           // Mettre à jour l'état de l'alerte
                           showAlertLimit = queue.length === 10;
                           closeAlertLimit = false;
                       }}>
                        {action.name}
                    </a>
                ))}
            </div>
        </div>
    );
}

export default Queue;
