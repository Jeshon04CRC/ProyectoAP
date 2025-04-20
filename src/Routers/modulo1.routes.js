import {Router} from "express"
import {informacionEscuela, 
        actualizarInfoEscuela, 
        informacionCursosEscuela,
        historialAsistencias,
        informacionOfertas,
        publicarOfertas,
        actualizarInfoOferta,
        historialOfertas,
        informacionPostulantes,
        informacionEstudiante,
        informacionPagoAsisActivos,
        obtenerDatosCrearOferta,
        crearPagoOferta,
        estudiantesPostulados,
        historialBeneficiarios
} 
from "../Controllers/modulo1.Controller.js"

const router = Router()

router.get("/escuelas/infoEscuela", informacionEscuela);
router.put("/escuelas/actualizarInfoEscuela", actualizarInfoEscuela); // Cambia el controlador según lo que necesites hacer

router.get("/escuelas/cursosEscuela", informacionCursosEscuela);

router.get("/escuelas/historialAsistencias", historialAsistencias)

router.get("/escuelas/historialOfertasActivas", informacionOfertas)
router.post("/escuelas/publiOferta", publicarOfertas)
router.put("/escuelas/actualizarOferta", actualizarInfoOferta) // Cambia el controlador según lo que necesites hacer

router.get("/escuelas/historialOfertas", historialOfertas)

router.get("/escuelas/historialPostulantes", informacionPostulantes)
router.get("/escuelas/perfilEstudiantes", informacionEstudiante)

router.get("/escuelas/historialPagoAsisActivos", informacionPagoAsisActivos)

router.get("/escuelas/obtenerDatosCrearOferta", obtenerDatosCrearOferta)
router.post("/escuelas/crearPagoOferta", crearPagoOferta)
router.get("/escuelas/estudiantesPostulados", estudiantesPostulados)

router.get("/escuelas/historialBeneficiarios", historialBeneficiarios)

export default router;