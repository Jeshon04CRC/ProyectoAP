import { Router } from "express";
import {getInfoProfesores } from "../Controllers/profesores.Controller.js";

const router = Router()

router.get('/infoProfesores/:id', getInfoProfesores); 

export default router;
