import express from "express";
import cors from "cors";
import actionsRouter from "./routes/actionsRouter";
import swaggerUi from "swagger-ui-express";
import swaggerOutput from "./swagger_output.json";
import * as path from "path";

export function initApp() {
    const app = express();

// Middleware pour analyser le corps des requêtes en JSON
    app.use(express.json());
// Activer CORS pour toutes les requêtes
    app.use(cors());
// Utilisation des routes
    app.use('/api', actionsRouter);

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerOutput));
    app.use('/docs', express.static(path.join(__dirname, 'out')));
    return app;
}
