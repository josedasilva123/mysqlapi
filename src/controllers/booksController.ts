import { Request, Response } from "express";
import { Books } from "../models/Books";

export default class BooksControllers{
    static async Create(req: Request, res: Response) {
        try {
            const { title, pageqty } = req.body;
        
            await Books.create({ title, pageqty });

            res.status(200).json({ message: "Livro criado com sucesso!"})
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }  
    }

    static async GetAll(req: Request, res: Response) { 
        try {
            const response = await Books.findAll({ raw: true });

            res.status(200).json({ data: response })
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        } 
    }

    static async GetById(req: Request, res: Response) {
        try {
            const { id } = req.params;

            const response = await Books.findOne({ raw: true, where: { id: id }});

            res.status(200).json({ data: response })
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        } 
    }

    static async GetByTitle(req: Request, res: Response) {
        try {
            const { title } = req.params;

            const response = await Books.findOne({ raw: true, where: { title: title }});

            res.status(200).json({ data: response })
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        } 
    }

    static async Update(req: Request, res: Response) {
        try{
            const { id } = req.params;
            const { title, pageqty } = req.body; 

            const response = await Books.update({ title, pageqty }, { where: { id: id }});

            res.status(200).json({ data: response });
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        } 
    }

    static async Delete(req: Request, res: Response) {
        try {
            const { id } = req.params;

            await Books.destroy({ where: { id: id }})

            res.status(200).json({ message: "Livro excluído com sucesso!" })
        } catch (error) {
            res.status(400).json({ error: (error as Error).message });
        }        
    }
}