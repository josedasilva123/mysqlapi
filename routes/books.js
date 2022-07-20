const router = require("express").Router();

const pool = require("../database/pool");

router.post('/', (req, res) => {
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

router.get('/', (req, res) => {
    const sql = `SELECT * FROM books`

    pool.query(sql, (err, data) => {
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
router.get('/book/:id', (req, res) => {
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
router.get('/search/:title', (req, res) => {
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
router.put('/book/:id', (req, res) => {
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
router.delete('/book/:id', (req, res) => {
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


module.exports = router;