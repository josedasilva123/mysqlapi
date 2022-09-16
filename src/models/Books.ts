import { DataTypes, Model, Optional } from "sequelize";

import sequelize from "../database/pool";

interface iBook {
  id: number;
  title: string;
  pageqty: number;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

interface iBookInput extends Optional<iBook, "id"> {}
interface iBookOutput extends Required<iBook> {}

export class Books extends Model<iBook, iBookInput> implements iBook {
  public id!: number;
  public title!: string;
  public pageqty!: number;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly deletedAt!: Date;
}

Books.init(
  {
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
    },
  },
  { timestamps: true, sequelize }
);
