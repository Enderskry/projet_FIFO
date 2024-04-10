import React, {ReactElement} from 'react';
import { Action } from "../models/actionModel";

/**
 * Composant représentant une action dans l'interface utilisateur.
 * @param {Action} props - Les propriétés de l'action.
 * @returns {ReactElement} - Le composant d'action.
 */
const ActionComponent: React.FC<Action> = ({ name, img }: Action): ReactElement => {
    return (
        <div className="action">
            {/* Utilisation de l'image correspondant à l'action */}
            <img src={require(`../assets/images/${img}.png`)} alt={name} className={"action-image"}/>
        </div>
    );
}

export default ActionComponent;
