import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken"

export function Authenticate(req: Request, res: Response, next: NextFunction){
    try{
        const { Auth } = req.headers;

        if(!Auth){
           throw new Error("Está rota precisa de autorização.") 
        }

        if(process.env.AUTH_KEY){
            jwt.verify(String(Auth), process.env.AUTH_KEY , (err, decoded: any) => {
                if(err){
                    res.status(400).json({ error: "Token inválida"})
                } else {
                    req.body.id = decoded?.id;
                    next();
                }            
            })
        } else {
            throw new Error("Erro de autenticação, contate o responsável pela aplicação.")  
        }
    } catch (error: any) {
        res.status(400).json({ error: error.message})
    }    
}

