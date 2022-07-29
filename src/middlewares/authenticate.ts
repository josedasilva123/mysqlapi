import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken"

export function Authenticate(req: Request, res: Response, next: NextFunction){
    try{
        const { Auth } = req.headers;

        if(!Auth){
           throw new Error("Está rota precisa de autorização.") 
        }

        jwt.verify(String(Auth), "hD7gE1VWUsOR5NmRD7CaZ51U1RspgukR", (err, decoded: any) => {
            if(err){
                res.status(400).json({ error: "Token inválida"})
            } else {
                req.body.id = decoded?.id;
                next();
            }            
        })
    } catch (error: any) {
        res.status(400).json({ error: error.message})
    }    
}