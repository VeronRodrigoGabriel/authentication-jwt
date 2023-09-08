import { Router } from "express";
import { ctrlLogin, ctrlValidacion, ctrlRegister } from "../controllers/auth.controllers.js";

const authRouter = Router();

authRouter.post('/register', ctrlRegister);

authRouter.post('/login', ctrlLogin);

authRouter.get('/user', ctrlValidacion)

export default authRouter;