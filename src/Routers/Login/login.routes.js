import {Router} from "express"
import {getLogin} from "../../Controllers/Login/login.Controller.js"

const router = Router()

router.get("/login", getLogin);

export default router;