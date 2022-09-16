import { DataTypes } from "sequelize";

import sequelize from "../database/pool";

export const Books = sequelize.define('Books', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    pageqty: {
        type: DataTypes.NUMBER,
        allowNull: false,
    }
})