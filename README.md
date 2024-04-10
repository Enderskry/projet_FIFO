# Mon Projet Queue FIFO 🏐

## Description
Le système de queue FIFO (First In, First Out) est un mécanisme permettant de gérer une liste d'actions en attente d'exécution. Chaque action est ajoutée à la fin de la file d'attente et est exécutée dans l'ordre de son arrivée. Ce système est souvent utilisé dans les applications où l'ordre d'exécution des tâches est important.

### Fonctionnalités Principales
- **Types d'Actions Définis par le Développeur :** Les développeurs peuvent définir différents types d'actions à ajouter à la queue. Chaque type d'action a un nombre de crédits d'exécution et une valeur maximale de crédits.
- **Génération Aléatoire des Crédits d'Exécution :** Les crédits d'exécution sont générés de manière aléatoire entre 80% et 100% de leur valeur maximale. Cette génération est effectuée lors de l'ajout d'une action à la queue et est recalculée si au moins 15 minutes se sont écoulées depuis le dernier calcul.
- **Ajout d'Actions à la Queue :** Les utilisateurs peuvent ajouter  jusqu'à 10 actions  à leur queue, même s'ils n'ont plus de crédits d'exécution disponibles.
- **Exécution des Actions :** Toutes les 15 secondes, la première action disponible dans la queue est exécutée et consomme un crédit d'exécution.

### Exemple d'Utilisation
Supposons que nous ayons un système avec 3 types d'actions : A, B et C, ayant respectivement 10, 10 et 15 comme valeur maximale de crédits d'exécution.

Après le premier calcul, l'utilisateur possède les crédits suivants pour les types d'actions A, B et C : 9, 10, 13 respectivement.

Il ajoute ensuite à la queue :
- 2 actions de type A
- 3 actions de type B
- 1 action de type A
- 2 actions de type C

La queue devient : [A, A, B, B, B, A, C, C] dans l'ordre d'arrivée.

Après l'exécution de la première action de type A, la queue devient : [A, B, B, B, A, C, C] et les crédits sont réduits à 8, 10 et 13 respectivement (pour les types d'actions A, B et C).

## Installation

### Prérequis

Avant de commencer l'installation, assurez-vous d'avoir installé Node.js et npm sur votre système. Vous pouvez les télécharger et les installer à partir du site officiel [Node.js](https://nodejs.org/).

### Étapes d'installation

1. Clonez le dépôt depuis GitHub :

    ```bash
    git clone <lien-du-repo>
    ```

2. Accédez au répertoire du projet :

    ```bash
    cd projet_FIFO
    ```
   
3. Installez les dépendances du backend :

    ```bash
    npm install
    ```
## OU

### Installation des dépendances du backend

1. Accédez au répertoire backend :

    ```bash
    cd backend
    ```

2. Installez les dépendances du backend :

    ```bash
    npm install
    ```

### Installation des dépendances du frontend

1. Accédez au répertoire frontend :

    ```bash
    cd ../frontend
    ```

2. Installez les dépendances du frontend :

    ```bash
    npm install
    ```
___
### Lancer le projet

Maintenant que les dépendances sont installées, vous pouvez lancer le projet en utilisant la commande suivante :

```bash
npm run start
```
___

## Tests

Pour exécuter les tests du projet, vous pouvez utiliser la commande suivante à partir de la racine du projet :

### Prérequis

Avant d'exécuter les tests, assurez-vous d'avoir démarré le serveur backend. Les tests dépendent du fonctionnement correct du serveur pour interagir avec l'application et vérifier son comportement. Si le serveur backend n'est pas démarré, les tests échoueront.

## Exécution des tests

Pour exécuter les tests du projet, vous devez suivre les étapes suivantes :

1. Démarrer le serveur backend en utilisant la commande `npm start` à partir du dossier `backend` ou de la racine du projet.
2. Une fois que le serveur backend est en cours d'exécution, vous pouvez exécuter les tests en utilisant la commande `npm run test` à partir de la racine du projet.

Assurez-vous de suivre ces étapes dans cet ordre pour garantir que les tests fonctionnent correctement et que toutes les fonctionnalités de l'application sont correctement testées.

```bash
npm run test
```
## Documentation de l'API avec Swagger

Swagger est utilisé pour fournir une documentation interactive de l'API de ce projet.

### Accéder à la documentation de l'API via Swagger

1. Assurez-vous que le serveur est en cours d'exécution en exécutant la commande `npm start`.
2. Ouvrez votre navigateur web et accédez à l'URL suivante : [http://localhost:8080/api-docs](http://localhost:8080/api-docs).

Vous devriez voir l'interface Swagger, qui fournit une documentation interactive de l'API, y compris les endpoints, les paramètres, les réponses et les exemples d'utilisation.

## Documentation JSDoc

La documentation JSDoc est générée automatiquement à partir du code source de ce projet.

### Accéder à la documentation JSDoc

1. Assurez-vous que le serveur est en cours d'exécution en exécutant la commande `npm start`.
2. Ouvrez votre navigateur web et accédez à l'URL suivante : [http://localhost:8080/docs](http://localhost:8080/docs).

Vous devriez voir la documentation JSDoc, qui fournit une documentation détaillée du code source du projet, y compris des descriptions de classe, de fonction, de paramètres et de types de retour.
