import { Router } from "express";
import { loginController, registerController, verifyTokenController } from "../controllers/auth.controllers.ts";
import { checkTokenMiddleware } from "../middleware/checkAuth.ts";


const router = Router();

router.post('/register', registerController)
router.post('/login', loginController)
router.get('/verify', checkTokenMiddleware, verifyTokenController)


export default router;