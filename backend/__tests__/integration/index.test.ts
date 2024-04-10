import supertest from "supertest";


describe('Test des routes principales', () => {
    it('GET /api-docs retourne le Swagger UI', async () => {
        const response = await supertest("http://localhost:8080").get('/api-docs').redirects(1);
        expect(response.status).toEqual(200);
    });

});
