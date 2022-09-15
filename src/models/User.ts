import { DataTypes } from "sequelize";

import sequelize from "../database/pool";

export const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING, 
        allowNull: false,       
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})