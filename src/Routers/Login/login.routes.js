import {Router} from "express"
import {postLogin} from "../../Controllers/Login/login.Controller.js"

const router = Router()

router.post("/login", postLogin);

export default router;