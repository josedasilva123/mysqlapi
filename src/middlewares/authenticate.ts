import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

export function Authenticate(req: Request, res: Response, next: NextFunction) {
  try {
    const { Auth } = req.headers;

    if (!Auth) {
      throw new Error("Está rota precisa de autorização.");
    }

    jwt.verify(
      String(Auth),
      process.env.AUTH_KEY as string,
      (err, decoded: any) => {
        if (err) {
          res.status(400).json({ error: "Token inválida" });
        } else {
          req.body.id = decoded?.id;
          next();
        }
      }
    );
  } catch (error) {
    res.status(400).json({ error: "Está rota precisa de autorização." });
  }
}
