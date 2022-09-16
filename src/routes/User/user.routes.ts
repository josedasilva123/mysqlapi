import { Router } from "express";
import UserControllers from "./userControllers";
import { Validate } from "../../middlewares/handleValidation";
import { userLoginValidation, userRegisterValidation } from "./userValidations";

const router = Router();

router.post("/register", userRegisterValidation(), Validate, UserControllers.Register);

router.post("/login", userLoginValidation(), Validate, UserControllers.Login);

export default router;
