module.exports = {
    // Autres configurations Jest...
    clearMocks: true,
    preset: "ts-jest",
    testEnvironment: "node",
    bail: 1,
    testMatch: ["<rootDir>/__tests__/**/*.spec.ts", "<rootDir>/__tests__/**/*.test.ts"],
    moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json", "node"],
    verbose: true,
    setupFiles: ['dotenv/config'], // Permet d'utiliser le module dotenv pour charger les variables d'environnement
    setupFilesAfterEnv: ['./jest.setup.ts'], // Fichier de configuration Jest après l'environnement de test
};
