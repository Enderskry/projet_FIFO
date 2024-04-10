"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
// Route pour récupérer toutes les actions
router.get('/api/actions', (req, res) => {
    // Logique pour récupérer toutes les actions
    res.send('Liste des actions');
});
// Route pour récupérer une action spécifique par son identifiant
router.get('/api/actions/:id', (req, res) => {
    const actionId = req.params.id;
    res.send(`Action avec l'ID ${actionId}`);
});
// Route pour ajouter une nouvelle action à la file d'attente
router.post('/api/actions', (req, res) => {
    res.send('Nouvelle action ajoutée à la file d\'attente');
});
// Route pour mettre à jour une action existante par son identifiant
router.put('/api/actions/:id', (req, res) => {
    const actionId = req.params.id;
    res.send(`Action avec l'ID ${actionId} mise à jour`);
});
// Route pour supprimer une action de la file d'attente par son identifiant
router.delete('/api/actions/:id', (req, res) => {
    const actionId = req.params.id;
    res.send(`Action avec l'ID ${actionId} supprimée de la file d'attente`);
});
exports.default = router;
