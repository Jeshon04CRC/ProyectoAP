import {Router} from "express"
import {informacionEscuela, actualizarInfoEscuela} from "../Controllers/modulo1.Controller.js"

const router = Router()

router.post("/escuelas/infoEscuela", informacionEscuela);
router.post("/escuelas/actualizarInfoEscuela", actualizarInfoEscuela); // Cambia el controlador según lo que necesites hacer

export default router;