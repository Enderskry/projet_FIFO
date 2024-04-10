import 'dotenv/config';
import {initApp} from "./app";

const app = initApp();

// Démarrage du serveur
const PORT = parseInt(process.env.PORT || '8080');
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

export default app;
