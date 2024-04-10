import { QueueService } from '../../../src/services/queueService';
import { Action } from '../../../src/models/actionModel';

describe('Test de QueueService', () => {
    let queueService: QueueService;

    beforeEach(() => {
        queueService = new QueueService();
    });

    it("Ajoute une action à la file d'attente", () => {
        const action: Action = { typeAction: '1', name: 'Test Action', credits: 25, img: 'attack' };
        const newQueue = queueService.addActionToQueue(action);
        expect(newQueue.length).toBeGreaterThan(0);
    });

    it("Récupère toutes les actions dans la file d'attente", () => {
        const allActions = queueService.allActionToQueue();
        expect(allActions.length).toBeGreaterThanOrEqual(0);
    });

    it("Récupère toutes les actions disponibles", () => {
        const allActions = queueService.getAllActions();
        expect(allActions.length).toBeGreaterThan(0);
    });

    it("Met à jour les crédits de toutes les actions", () => {
        queueService.updateCredits();
        const allActions = queueService.getAllActions();
        expect(allActions.every(action => action.credits >= 0)).toBeTruthy();
    });
});
