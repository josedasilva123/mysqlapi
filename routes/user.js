const router = require("express").Router();

const pool = require("../database/pool");

const bcrypt = require("bcryptjs");

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    res.status(400).json({ error: "Está faltando um parâmetro no body" });
    return;
  }

  const sql = `SELECT * FROM users WHERE ?? = ?`;
  const data = ["email", email];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Ocorreu um erro ao tentar registrar dados no banco." });
      return;
    } else {
      if (data?.length === 0) {
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

        pool.query(registerSql, registerData, (err, data) => {
          if (err) {
            console.log(err);
            res.status(400).json({ error: "Ocorreu um erro ao tentar cadastrar no banco." });
            return;
          } else {
            res.status(200).json({ message: "Usuário cadastrado com sucesso!", data: data });
          }
        });
      } else {
        res.status(400).json({ error: "O e-mail fornecido já está associoado a outro usuário." });
        return;
      }
    }
  });
});

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(400).json({ error: "Está faltando um parâmetro no body" });
    return;
  }

  const sql = `SELECT * FROM users WHERE ?? = ?`;
  const data = ["email", email];

  pool.query(sql, data, (err, data) => {
    if (err) {
      console.log(err);
      res.status(400).json({ error: "Ocorreu um erro ao tentar cadastrar no banco." });
      return;
    } else {
      if(data[0]){
        const verifyPassword = bcrypt.compareSync(password, data[0].password);

        if (!verifyPassword) {
            res.status(400).json({ error: "Sua senha está incorreta." });
            return;
        }

        const userData = {
            name: data[0].name,
            email: data[0].email,
            createdAt: data[0].createdAt,
            updatedAt: data[0].updatedAt,
        }

        res.status(200).json({ message: "Login realizado com sucesso!", data: userData });
      } else {
        res.status(400).json({ error: 'Usuário não cadastrado.'});
        return;
      }       
    }
  });
});

module.exports = router;
