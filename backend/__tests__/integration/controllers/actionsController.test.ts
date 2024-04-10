import {getActions, getActionToQueue, pushActionToQueue} from '../../../src/controllers/actionsController';
import { Request, Response } from 'express';
import { QueueService } from '../../../src/services/queueService';
import { Action } from '../../../src/models/actionModel';
import clearAllMocks = jest.clearAllMocks;

// Crée un mock pour le service de file d'attente
jest.mock('../../../src/services/queueService', () => {
    const mQueueService = {
        getAllActions: jest.fn(),
        addActionToQueue: jest.fn(),
        allActionToQueue: jest.fn()
    };
    return {QueueService: jest.fn(() => mQueueService)};
});

describe('getActions', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    })

    it("devrait renvoyer toutes les actions avec le code d'état 200", () => {
        // Arrange
        const queueService = new QueueService() as jest.Mocked<QueueService>; // Convertit en type simulé
        const mockActions: Action[] = [
            { typeAction: '1', name: 'Test Action 1', credits: 25, img: 'attack' },
            { typeAction: '2', name: 'Test Action 2', credits: 30, img: 'pass' },
            { typeAction: '3', name: 'Test Action 3', credits: 40, img: 'reception' },
        ];
        (queueService.getAllActions as jest.Mock).mockReturnValueOnce(mockActions); // Utilise le mockReturnValueOnce pour simuler la méthode getAllActions

        const mReq: Partial<Request> = {};
        const mRes: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        getActions(mReq as Request, mRes as Response);

        // Assert
        expect(queueService.getAllActions).toHaveBeenCalledTimes(1); // Vérifie si la méthode getAllActions est appelée une fois
        expect(mRes.status).toHaveBeenCalledWith(200); // Vérifie si la méthode status est appelée avec le code 200
        expect(mRes.json).toHaveBeenCalledWith(mockActions); // Vérifie si la méthode json est appelée avec les actions simulées
    });

    it("devrait renvoyer le code d'état 404 si aucune action n'est trouvée", () => {
        const queueService = new QueueService() as jest.Mocked<QueueService>; // Convertit en type simulé

        // Arrange
        (queueService.getAllActions as jest.Mock).mockReturnValueOnce([]);

        const mReq: Partial<Request> = {};
        const mRes: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        getActions(mReq as Request, mRes as Response);

        // Assert
        expect(queueService.getAllActions).toHaveBeenCalledTimes(1); // Vérifie si la méthode getAllActions est appelée une fois
        expect(mRes.status).toHaveBeenCalledWith(404);
        expect(mRes.json).toHaveBeenCalledWith({ message: "Les actions n'ont pas été trouvées" });
    });
});

describe('pushActionToQueue', () => {
    afterEach(() => {
        jest.clearAllMocks();
    });

    it("devrait ajouter une action à la file d'attente et renvoyer le code d'état 201", () => {
        // Arrange
        const queueService = new QueueService() as jest.Mocked<QueueService>; // Convertit en type simulé
        const mockAction: Action = { typeAction: '1', name: 'Test Action', credits: 25, img: 'attack' };
        const mockNewQueue: Action[] = [mockAction];
        (queueService.addActionToQueue as jest.Mock).mockReturnValueOnce(mockNewQueue); // Utilise le mockReturnValueOnce pour simuler la méthode addActionToQueue

        const mReq: Partial<Request> = { body: mockAction };
        const mRes: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        pushActionToQueue(mReq as Request, mRes as Response);

        // Assert
        expect(queueService.addActionToQueue).toHaveBeenCalledTimes(1); // Vérifie si la méthode addActionToQueue est appelée une fois avec les bonnes données
        expect(queueService.addActionToQueue).toHaveBeenCalledWith(mockAction); // Vérifie si la méthode addActionToQueue est appelée avec les bonnes données
        expect(mRes.status).toHaveBeenCalledWith(201); // Vérifie si la méthode status est appelée avec le code 201
        expect(mRes.json).toHaveBeenCalledWith(mockNewQueue); // Vérifie si la méthode json est appelée avec la nouvelle file d'attente simulée
    });

    it("devrait renvoyer le code d'état 400 si l'action est invalide", () => {
        // Arrange
        const queueService = new QueueService() as jest.Mocked<QueueService>; // Convertit en type simulé
        const mockAction = undefined;

        const mReq: Partial<Request> = { body: mockAction };
        const mRes: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        pushActionToQueue(mReq as Request, mRes as Response);

        // Assert
        expect(queueService.addActionToQueue).not.toHaveBeenCalled(); // Vérifie si la méthode addActionToQueue est appelée une fois avec les bonnes données
        expect(mRes.status).toHaveBeenCalledWith(400); // Vérifie si la méthode status est appelée avec le code 404
        expect(mRes.json).toHaveBeenCalledWith({ message: 'Action invalide' }); // Vérifie si la méthode json est appelée avec le message d'erreur approprié
    });
});

describe('getActionToQueue', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    it("devrait renvoyer toutes les actions avec le code d'état 200", () => {
        // Arrange
        const queueService = new QueueService() as jest.Mocked<QueueService>; // Convertit en type simulé
        const mockActions: Action[] = [
            { typeAction: '1', name: 'Test Action 1', credits: 25, img: 'attack' },
            { typeAction: '2', name: 'Test Action 2', credits: 30, img: 'pass' },
            { typeAction: '3', name: 'Test Action 3', credits: 40, img: 'reception' },
        ];
        (queueService.allActionToQueue as jest.Mock).mockReturnValueOnce(mockActions); // Utilise le mockReturnValueOnce pour simuler la méthode allActionToQueue

        const mReq: Partial<Request> = {};
        const mRes: Partial<Response> = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        // Act
        getActionToQueue(mReq as Request, mRes as Response);

        // Assert
        expect(queueService.allActionToQueue).toHaveBeenCalledTimes(1); // Vérifie si la méthode allActionToQueue est appelée une fois
        expect(mRes.status).toHaveBeenCalledWith(200); // Vérifie si la méthode status est appelée avec le code 200
        expect(mRes.json).toHaveBeenCalledWith(mockActions); // Vérifie si la méthode json est appelée avec les actions simulées
    });
});
