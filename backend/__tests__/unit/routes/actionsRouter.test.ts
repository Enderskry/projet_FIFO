import supertest from "supertest";
import {Action} from "../../../src/models/actionModel";

const path = "http://localhost:8080";

describe("Test des routes de actionsRouter", () => {

    it("POST /api/queue devrait renvoyer un code 200 et un message d'ajout d'action réussi", async () => {
        const action: Action = {
            typeAction: '1',
            name: 'Test Action',
            credits: 25,
            img: 'attack'
        };
        const newQueue: Action[] = [action]
        const response = await supertest(path).post('/api/queue').send(action)
        expect(response.status).toBe(201);
        expect(response.body).toEqual(newQueue);
        expect(response.body.length).toBeGreaterThan(0);
    });

    it("POST /api/queue devrait renvoyer un code 400 et un message de mauvaise requête si l'action n'est pas ajoutée à la file d'attente", async () => {
        const invalidAction = {}; // Action invalide

        const response = await supertest(path).post('/api/queue').send(invalidAction);

        expect(response.status).toBe(400);
        expect(response.body).toEqual({
            message: 'Action invalide'
        });
    });

    // Test de la route GET '/api/queue'
    it("GET /api/queue devrait récupérer toutes les actions dans la file d'attente", async () => {
        const response = await supertest(path).get('/api/queue');

        expect(response.status).toBe(200); // Vérifiez que le statut de la réponse est 200 (OK)
        expect(response.body).toBeDefined(); // Vérifiez que la réponse contient des données
    });

    // Test de la route GET '/api/actions'
    it('GET /api/actions devrait récupérer toutes les actions disponibles', async () => {
        const response = await  supertest(path).get('/api/actions');

        expect(response.status).toBe(200); // Vérifiez que le statut de la réponse est 200 (OK)
        expect(response.body).toBeDefined(); // Vérifiez que la réponse contient des données
        expect(response.body.length).toBeGreaterThan(0);
    });
});
