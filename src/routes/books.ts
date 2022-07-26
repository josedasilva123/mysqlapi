import { Router, Request, Response } from "express";
import { MysqlError } from "mysql";
import pool from "../database/pool";

const router = Router();

router.post('/', (req: Request, res: Response) => {
    const { title, pageqty } = req.body;

    if(!title || !pageqty){
        res.status(400).json({ error: "Está faltando um parâmetro no body"});
        return;
    }

    const sql = `INSERT INTO books (??, ??) VALUES (?, ?)`;
    const data = ['title', 'pageqty', title, pageqty];

    pool.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu um erro ao tentar cadastrar no banco."});
            return;
        } else {
            res.status(200).json({ message: "Livro cadastrado com sucesso!", data: data})
        }
    })
})

router.get('/', (req: Request, res: Response) => {
    const sql = `SELECT * FROM books`

    pool.query(sql, (err: MysqlError, data: any) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu ao tentar recuperar dados do banco."});
            return;
        } else {
            res.status(200).json({ data: data })
        } 
    })
})

/* Get by id */
router.get('/book/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const sql = `SELECT * FROM books 
    WHERE ?? = ?`
    const data = ['id', id];

    pool.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu ao tentar recuperar dados do banco."});
            return;
        } else {
            res.status(200).json({ data: data })
        } 
    })
})

module.exports = router;

/* Search by title */
router.get('/search/:title', (req: Request, res: Response) => {
    const { title } = req.params;
    const sql = `SELECT * FROM books 
    WHERE ?? LIKE ?`
    const data = ['title', title];
    

    pool.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu ao tentar recuperar dados do banco."});
            return;
        } else {
            res.status(200).json({ data: data })
        } 
    })
})

/* Update */
router.put('/book/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, pageqty } = req.body;   

    if(!title || !pageqty){
        res.status(400).json({ error: "Está faltando um parâmetro no body"});
        return;
    }

    const sql = `UPDATE books SET ?? = ?, ?? = ? WHERE ?? = ?'`

    const data = ['title', title, 'pageqty', pageqty, 'id', id];

    pool.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu ao tentar atualizar os dados no banco."});
            return;
        } else {
            res.status(200).json({ data: data })
        } 
    })
})

/* Delete */
router.delete('/book/:id', (req: Request, res: Response) => {
    const { id } = req.params;

    const sql = `DELETE FROM books WHERE ?? = ?`
    
    const data = ['id', id];

    pool.query(sql, data, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu ao tentar remover os itens do banco."});
            return;
        } else {
            res.status(200).json({ data: data })
        } 
    })
})

export default router;