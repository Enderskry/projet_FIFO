import React, { ReactElement } from 'react';
import { Action } from "../models/actionModel";

interface CreditsProps {
    actions: Action[];
}

/**
 * Composant représentant l'affichage des crédits.
 * @param {CreditsProps} props - Les propriétés des crédits.
 * @returns {ReactElement} - Le composant d'affichage des crédits.
 */
const Credits: React.FC<CreditsProps> = ({ actions }: CreditsProps): ReactElement => {
    return (
        <div className={"credits-container"}>
            <h2>Crédits 🤑 :</h2>
            <div className="credits-action">
                {/* Affichage des crédits pour chaque action */}
                {actions.map((action, index) => (
                    <div className="action" key={index}>
                        {/* Affichage de l'image et du nombre de crédits */}
                        <img src={require(`../assets/images/${action.img}.png`)} alt={action.name} className={"action-image"} />
                        <p>{action.credits} 💰</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Credits;
