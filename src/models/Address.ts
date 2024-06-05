import sequelize from "sequelize";
import { DataTypes, Model } from "sequelize";
import database from "../database/index.js";

export class Address extends Model{
  declare id: string;
  declare clientId: number;
  declare cep: string;
  declare street: string;
  declare region: string;
  declare city: string;
  declare state: string;
  declare number: string;
  declare reference: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Address.init({
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
    defaultValue: DataTypes.UUIDV4,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  cep: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  street: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  number: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reference: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  sequelize: database,
  modelName: "Adresses",
  tableName: "Address",
  timestamps: true,
  underscored: false,
});
