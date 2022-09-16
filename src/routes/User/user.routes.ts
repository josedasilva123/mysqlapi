import { Router } from "express";
import UserControllers from "../../controllers/userControllers";
import { Validate } from "../../middlewares/handleValidation";
import { userLoginValidation, userRegisterValidation } from "./userValidations";

const router = Router();

router.post("/register", Validate, userRegisterValidation(), UserControllers.Register);

router.post("/login", Validate, userLoginValidation(), UserControllers.Login);

export default router;
