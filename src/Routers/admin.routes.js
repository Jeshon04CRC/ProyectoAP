import {Router} from "express"
import { obtenerUsuarios,
        actualizarRol,
        actualizarUsuario, 
        eliminarUsuario,
        obtenerCarreras
        } from "../Controllers/admin.Controller.js"

const router = Router()

router.get("/admin/obtenerDatosUsuarios", obtenerUsuarios);
router.put("/admin/ActualizarRol", actualizarRol)
router.put("/admin/ActualizarUsuario", actualizarUsuario)
router.delete("/admin/EliminarUsuario", eliminarUsuario);
router.get('/admin/carreras', obtenerCarreras);


export default router;