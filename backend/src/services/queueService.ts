import {Action} from "../models/actionModel";

/**
 * Service gérant la file d'attente des actions et les crédits associés.
 */
export class QueueService {
    private queue: Action[] = [];
    private intervalId: NodeJS.Timeout | undefined;
    private isTimerCredit: boolean = true;
    private firstUpdate: boolean = true;
    private actions: Action[] = [
        {typeAction: '1', name: "Faire Une Passe", credits: 25, img: "pass"},
        {typeAction: '2', name: "Faire Une Réception", credits: 31, img: "reception"},
        {typeAction: '3', name: "Faire Une Attaque", credits: 64, img: "attack"}
    ];
    constructor() {
    }

    /**
     * Ajoute une action à la file d'attente.
     * @param action L'action à ajouter à la file d'attente.
     * @returns La file d'attente mise à jour.
     */
    public addActionToQueue(action: Action): Action[] {
        this.queue.push(action);
        if (this.queue.length === 1) {
            this.intervalId = setInterval(() => {
                this.getNextActionToExecute();
            }, 15000) // 150000 ms = 15 secondes
        }
        return this.queue;
    }

    /**
     * Récupère et exécute la prochaine action dans la file d'attente.
     */
    public getNextActionToExecute(): void {
        if (this.queue.length > 0) {
            // On récupère le typeAction pour savoir quelle action on réduit le crédit
            const typeAction = this.queue[0].typeAction;
            this.actions.map(action => {
                if (typeAction === action.typeAction && action.credits > 0) {
                    // On réduit de un 1 le crédit
                    action.credits -= 1;
                }
            });
            // On retire l'action de la liste après l'avoir trouvée
            this.queue.shift()
        }
        if (this.queue.length === 0) {
            clearInterval(this.intervalId);
        }
        // return {queue: this.queue, actions: this.actions};
    }

    /**
     * Récupère toutes les actions dans la file d'attente.
     * @returns La file d'attente des actions.
     */
    public allActionToQueue(): Action[] {
        return this.queue
    }

    /**
     * Récupère toutes les actions disponibles.
     * @returns La liste des actions disponibles.
     */
    public getAllActions(): Action[] {
        if (this.firstUpdate) {
            setInterval(() => {
                this.updateCredits();
            }, 900000); // 900000 ms = 15 minutes
            this.firstUpdate = false;
        }
        return this.actions;
    }

    /**
     * Met à jour les crédits de toutes les actions.
     */
    public updateCredits(): void {
        this.actions.forEach(action => {
            // Générer des nouveaux crédits aléatoires entre 80% et 100% de la valeur maximale
            action.credits = this.generateRandomPercentage(action.credits);
        });
    }

    /**
     * Génère un nombre aléatoire entre 80% et 100% de la valeur donnée.
     * @param value La valeur initiale.
     * @returns La valeur mise à jour.
     */
    private generateRandomPercentage = (value: number): number => {
        // Générer un nombre aléatoire entre 0 et 1
        const random = Math.random();

        // Calculer la plage de pourcentage (100% - 80% = 20%)
        const percentageRange = 0.20;

        // Calculer le nombre aléatoire dans la plage de pourcentage
        const randomPercentage = random * percentageRange;

        // Ajouter ce résultat au minimum de la plage (80%)
        const result = 0.80 + randomPercentage;

        // Multiplier la valeur par le résultat pour obtenir la valeur finale
        const finalValue = value * result;

        return Math.round(finalValue);
    };
}
