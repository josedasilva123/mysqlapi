import { Router } from "express";
import UserControllers from "../controllers/userControllers";

const router = Router();

router.post("/register", UserControllers.Register);

router.post("/login", UserControllers.Login);

export default router;
