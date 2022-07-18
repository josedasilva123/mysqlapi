const router = require("express").Router();

const connection = require("../database/connection");

router.post('/', async (req, res) => {
    const { title, pageqty } = req.body;

    if(!title || !pageqty){
        res.status(400).json({ error: "Está faltando um parâmetro no body"});
        return;
    }

    const sql = `INSERT INTO books (title, pageqty) VALUES ('${title}', '${pageqty}')`;

    connection.query(sql, (err, data) => {
        if(err){
            console.log(err);
            res.status(400).json({ error: "Ocorreu um erro ao tentar cadastrar no banco."});
            return;
        } else {
            res.status(200).json({ message: "Livro cadastrado com sucesso!", data: data})
        }
    })
})

router.get('/:title', async(req, res) => {
    const { title } = req.params;
    const sql = `SELECT * FROM books 
    WHERE title LIKE '${title}%'`

    connection.query(sql, (err, data) => {
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