import express, { Request, Response } from 'express';
import { pushActionToQueue, getActionToQueue, getActions } from "../controllers/actionsController";

// Initialisation du routeur Express
const router = express();

/**
 * Route POST pour ajouter une action à la file d'attente.
 * @param {Request} req - Requête HTTP entrante.
 * @param {Response} res - Réponse HTTP à renvoyer.
 * @returns {void}
 */
router.post('/queue', (req: Request, res: Response) => {
    return pushActionToQueue(req, res);
    /*  #swagger.parameters['body'] = {
            in: 'body',
            description: 'Add new action to the queue.',
            $ref: "#/components/schemas/Queue
    } */
    /*  #swagger.responses[200] = {
            description: 'Action added successfully.'
    } */
    /*  #swagger.responses[400] = {
            description: 'Bad request. Action not added to the queue.'
    } */
});

/**
 * Route GET pour récupérer toutes les actions dans la file d'attente.
 * @param {Request} req - Requête HTTP entrante.
 * @param {Response} res - Réponse HTTP à renvoyer.
 * @returns {void}
 */
router.get('/queue', (req: Request, res: Response) => {
    return getActionToQueue(req , res );
    /*  #swagger.responses[200] = {
            description: 'Get all actions from the queue.',
            schema: {
                type: 'array',
                items: {
                    $ref: '#/definitions/Queue'
                }
            }
    } */
    /*  #swagger.responses[404] = {
            description: 'No actions found in the queue.'
    } */
});

/**
 * Route GET pour récupérer toutes les actions disponibles.
 * @param {Request} req - Requête HTTP entrante.
 * @param {Response} res - Réponse HTTP à renvoyer.
 * @returns {void}
 */
router.get('/actions', (req: Request, res: Response) => {
    return getActions(req, res);
    /*  #swagger.responses[200] = {
            description: 'Get all available actions.',
            schema: {
                type: 'array',
                items: {
                    $ref: '#/definitions/Action'
                }
            }
    } */
    /*  #swagger.responses[404] = {
            description: 'No actions found.'
    } */
});

// Export du routeur pour être utilisé dans d'autres parties de l'application
export default router;

