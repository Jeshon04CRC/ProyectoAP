import {Router} from "express"
import {informacionEscuela, 
        actualizarInfoEscuela, 
        informacionCursosEscuela} 
from "../Controllers/modulo1.Controller.js"

const router = Router()

router.get("/escuelas/infoEscuela", informacionEscuela);
router.put("/escuelas/actualizarInfoEscuela", actualizarInfoEscuela); // Cambia el controlador según lo que necesites hacer

router.get("/escuelas/cursosEscuela", informacionCursosEscuela);

export default router;