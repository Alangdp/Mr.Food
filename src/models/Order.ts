import { DataTypes, Model } from 'sequelize';
import database from '../database/index.js';
import { randomUUID } from 'crypto';
import { ItemOrder } from '../../types/product.type.js';

export default class Order extends Model {
  declare id: string;
  declare clientId: number;
  declare companyId: number;
  declare items: ItemOrder[];
  declare status: string;
  declare total: number;
  declare observation: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  public static async hasActiveOrder(clientId: number) {
    const order = await Order.findAll({ where: { clientId } });
    const filteredOrders = order.filter(
      order => order.status !== 'CANCELED' && order.status !== 'DELIVERED',
    );
    if (filteredOrders.length > 0) return true;
    return false;
  }
}

Order.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: randomUUID(),
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    items: {
      type: DataTypes.JSONB,
      allowNull: false,
      field: 'itens',
    },
    status: {
      type: DataTypes.ENUM(
        'PENDING',
        'PREPARING',
        'READY',
        'DELIVERED',
        'CANCELED',
      ),
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
      defaultValue: DataTypes.NOW,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: database,
    modelName: 'Order',
    tableName: 'Orders',
    underscored: false,
    timestamps: true,
  },
);
