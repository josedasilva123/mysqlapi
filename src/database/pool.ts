import { Sequelize } from "sequelize";

const sequelize = new Sequelize('nodemysql', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default sequelize;
/*
import mysql from "mysql";

const pool = mysql.createPool({
    connectionLimit: 10,
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'nodemysql'
})

export default pool;
*/