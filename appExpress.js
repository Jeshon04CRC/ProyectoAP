import express from 'express';
import loginRoutes from './src/Routers/Login/login.routes.js';

const app = express();

app.use(express.json()); // Esto permite recibir JSON del body en POST
app.use(loginRoutes);

export default app;