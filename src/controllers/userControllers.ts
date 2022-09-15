import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import {
  LoginBody,
  LoginErrorResponse,
  LoginSucessResponse,
  RegisterBody,
} from "../interfaces/users";
import { User } from "../models/User";

export default class UserControllers {
  static async Register(req: Request<{}, {}, RegisterBody, {}>, res: Response) {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new Error("Está faltando um parâmetro no body");
      }

      const existingUser = await User.findOne({
        raw: true,
        where: { email: email },
      });
      console.log(existingUser);

      if (existingUser) {
        throw new Error(
          "O e-mail fornecido já está associado a um usuário cadastrado"
        );
      }

      const hashPassword = bcrypt.hashSync(password, 1);

      const registerData = {
        name,
        email,
        password: hashPassword,
      };

      await User.create(registerData);

      res.status(200).json({ message: "Usuário cadastrado com sucesso!" });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }

  static async Login(
    req: Request<{}, {}, LoginBody, {}>,
    res: Response<LoginSucessResponse | LoginErrorResponse>
  ) {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        throw new Error("Está faltando um parâmetro no body");
      }

      const currentUser = await User.findOne({
        raw: true,
        where: { email: email },
      });

      if (!currentUser) {
        throw new Error("Usuário não encontrado.");
      }

      let verifyPassword;
      if (currentUser.password) {
        verifyPassword = bcrypt.compareSync(password, currentUser.password);
      }

      if (!verifyPassword) {
        throw new Error("Sua senha está incorreta.");
      }

      const token = jwt.sign(
        {
          id: currentUser.id,
        },
        process.env.JWT_SECRET as string,
        { expiresIn: "12h" }
      );

      const userData = {
        name: currentUser.name,
        email: currentUser.email,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
      };

      res.status(200).json({
        message: "Login realizado com sucesso!",
        data: {
          user: userData,
          token: token,
        },
      });
    } catch (error) {
      res.status(400).json({ error: (error as Error).message });
    }
  }
}
