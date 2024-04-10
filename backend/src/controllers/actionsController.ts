import { Request, Response } from 'express';
import { Action } from "../models/actionModel";
import { QueueService } from "../services/queueService";

const queueService = new QueueService();

/**
 * Récupère toutes les actions disponibles.
 * @param req La requête HTTP.
 * @param res La réponse HTTP.
 */
export const getActions = (req: Request, res: Response): void => {
    const allActions = queueService.getAllActions();
    if (allActions.length > 0) {
        res.status(200).json(allActions);
    } else {
        res.status(404).json({ message: "Les actions n'ont pas été trouvées" });
    }
};

/**
 * Ajoute une action à la file d'attente.
 * @param req La requête HTTP.
 * @param res La réponse HTTP.
 */
export const pushActionToQueue = (req: Request, res: Response): void => {
    const action = req.body;
    if (action) {
        if (action.typeAction && action.credits && action.img && action.name) {
            const newQueue = queueService.addActionToQueue(action);
            res.status(201).json(newQueue);
        } else {
            res.status(400).json({ message: 'Action invalide' });
        }
    } else {
        res.status(400).json({ message: 'Action invalide' });
    }
};

/**
 * Récupère toutes les actions dans la file d'attente.
 * @param req La requête HTTP.
 * @param res La réponse HTTP.
 */
export const getActionToQueue = (req: Request, res: Response): void => {
    const allAction = queueService.allActionToQueue();
    res.status(200).json(allAction);
};
