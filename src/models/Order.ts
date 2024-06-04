import { DataTypes, Model } from "sequelize";
import database from "../database/index.js";
import { ProductProps } from "../../interfaces/product.interface.js";

export default class Order extends Model {
  declare id: number;
  declare clientId: number;
  declare itens: ProductProps[];
  declare status: string;
  declare total: number;
  declare observation: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Order.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  clientId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  itens: {
    type: DataTypes.JSONB,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM("PENDING", "PREPARING", "READY", "DELIVERED", "CANCELED"),
    allowNull: false,
  },
  total: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  observation: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  updatedAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
}, {
  sequelize: database,
  modelName: "Order",
  tableName: "Orders",
  underscored: false,
  timestamps: true,
});
