import {Router} from "express"
import {informacionEscuela, 
        actualizarInfoEscuela, 
        informacionCursosEscuela,
        historialAsistencias,
        informacionOfertas,
        publicarOfertas,
        actualizarInfoOferta,
        informacionPostulantes
} 
from "../Controllers/modulo1.Controller.js"

const router = Router()

router.get("/escuelas/infoEscuela", informacionEscuela);
router.put("/escuelas/actualizarInfoEscuela", actualizarInfoEscuela); // Cambia el controlador según lo que necesites hacer

router.get("/escuelas/cursosEscuela", informacionCursosEscuela);

router.get("/escuelas/historialAsistencias", historialAsistencias)

router.get("/escuelas/historialOfertas", informacionOfertas)
router.post("/escuelas/publiOferta", publicarOfertas)
router.put("/escuelas/actualizarOferta", actualizarInfoOferta) // Cambia el controlador según lo que necesites hacer

router.get("/escuelas/historialPostulantes", informacionPostulantes)
export default router;