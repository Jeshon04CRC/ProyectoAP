import {Router} from "express"
import {informacionEstudiante,registrarPerfilAcademico,obtenerOportunidades,obtenerCarreras,registrarSolicitud,seguimientoSolicitudes, oportunidadesFavoritas, selecionarFavoritas, eliminarFavoritas, seguimientoPDF, evaluacionPDF} 
from "../Controllers/estudiantes.Controller.js"

const router = Router()

router.get("/estudiantes/infoEstudiantes", informacionEstudiante);
router.post("/estudiantes/registrarPerfil", registrarPerfilAcademico);
router.get('/asistencias/oportunidades', obtenerOportunidades); // nueva ruta
router.post("/solicitudes/registrar", registrarSolicitud);
router.get('/estudiantes/carreras', obtenerCarreras);
router.get('/solicitudes/seguimiento', seguimientoSolicitudes);

router.get('/favoritos', oportunidadesFavoritas);
router.post('/selecionarFavoritas', selecionarFavoritas);
router.delete('/eliminarFavoritas', eliminarFavoritas);

router.get('/seguimiento/pdf', seguimientoPDF);
router.get('/evaluacion/pdf', evaluacionPDF);


export default router;
