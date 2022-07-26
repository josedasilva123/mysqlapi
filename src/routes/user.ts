import { Router, Request, Response } from "express";
import pool from "../database/pool";
import bcrypt from "bcryptjs";
import { CurrentUser, LoginBody, RegisterBody } from "../interfaces/users";
import { PromiseReject } from "../interfaces/global";

const router = Router();

router.post(
  "/register",
  async (req: Request<{}, {}, RegisterBody, {}>, res: Response) => {
    try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
        throw new Error("Está faltando um parâmetro no body");
      }

      const sql = `SELECT * FROM users WHERE ?? = ?`;
      const data = ["email", email];

      const existingUser = await new Promise((resolve, reject) => {
        pool.query(sql, data, (err, data) => {
          if (err) {
            reject(err);
          } else {
            if (data?.length === 0) {
              resolve(false);
            } else {
              resolve(true);
            }
          }
        });
      });

      if (existingUser) {
        throw new Error(
          "O e-mail fornecido já está associado a um usuário cadastrado"
        );
      }

      const hashPassword = bcrypt.hashSync(password, 1);

      const currentDate = new Date();

      const registerSql = `INSERT INTO users (??, ??, ??, ??, ??) VALUES (?,?,?,?,?)`;

      const registerData = [
        "name",
        "email",
        "password",
        "createdAt",
        "updatedAt",
        name,
        email,
        hashPassword,
        currentDate,
        currentDate,
      ];

      const response = await new Promise((resolve, reject) => {
        pool.query(registerSql, registerData, (err, data) => {
          if (err) {
            reject(err);
          } else {
            resolve(data);
          }
        });
      });

      if (!response) {
        throw new Error("Ocorreu um erro no cadastramento de dados no banco.");
      }

      res
        .status(200)
        .json({ message: "Usuário cadastrado com sucesso!", data: data });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

router.post(
  "/login",
  async (req: Request<{}, {}, LoginBody, {}>, res: Response) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        res.status(400).json({ error: "Está faltando um parâmetro no body" });
        return;
      }

      const sql = `SELECT * FROM users WHERE ?? = ?`;
      const data = ["email", email];

      const currentUser = await new Promise<CurrentUser | false>((resolve, reject) => {
        pool.query(sql, data, (err, data) => {
          if (err) {
            reject(err);
          } else {
            if (data[0]) {
              resolve(data[0]);
            } else {
              resolve(false);
            }
          }
        });
      });

      if (!currentUser) {
        throw new Error("Usuário não encontrado.");
      }

      const verifyPassword = bcrypt.compareSync(password, currentUser.password);

      if (!verifyPassword) {
        res.status(400).json({ error: "Sua senha está incorreta." });
        return;
      }

      const userData = {
        name: currentUser.name,
        email: currentUser.email,
        createdAt: currentUser.createdAt,
        updatedAt: currentUser.updatedAt,
      };

      res.status(200).json({ message: "Login realizado com sucesso!", data: userData });
    } catch (error: any) {
      res.status(400).json({ error: error.message });
    }
  }
);

export default router;
