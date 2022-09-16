import { Request, Response } from "express";
import {
  LoginBody,
  LoginErrorResponse,
  LoginSucessResponse,
  RegisterBody,
} from "../../interfaces/users";
import UserServices from "./userServices";

export default class UserControllers {
  static async Register(req: Request<{}, {}, RegisterBody, {}>, res: Response) {
    try {
      const response = await UserServices.Register(req.body);

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async Login(
    req: Request<{}, {}, LoginBody, {}>,
    res: Response<LoginSucessResponse | LoginErrorResponse>
  ) {
    try {
      const response = await UserServices.Login(req.body);

      res.status(200).json(response);
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
