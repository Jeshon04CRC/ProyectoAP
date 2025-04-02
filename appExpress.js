import express from 'express';
import loginRoutes from './src/Routers/Login/login.routes.js';

const app = express();

app.use(loginRoutes);

export default app;