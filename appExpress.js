import express from 'express';
import loginRoutes from './src/Routers/login.routes.js';
import modulo1Routes from './src/Routers/modulo1.routes.js';
import estudiantesRoutes from './src/Routers/estudiantes.routes.js';

const app = express();

app.use(express.json()); // Esto permite recibir JSON del body en POST
app.use(loginRoutes);
app.use(modulo1Routes);
app.use(estudiantesRoutes);

export default app;