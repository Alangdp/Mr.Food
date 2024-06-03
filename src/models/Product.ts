import { Model, DataTypes } from 'sequelize';
import database from '../database/index.js';
import { Extra } from '../../types/product.type.js';

export default class Product extends Model {
  declare id: number;
  declare name: string;
  declare companyId: number;
  declare categoryId: number;
  declare description: string;
  declare price: number;
  declare discountPercent: number;
  declare active: boolean;
  declare extras: Extra;

  static async findByDescription(description: string) {
    return await this.findOne({ where: { description } });
  }
}

Product.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'company_id',
    },
    categoryId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      field: 'category_id',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    discountPercent: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    extras: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "created_at"
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: "updated_at"
    }
  },
  {
    sequelize: database,
    modelName: 'Product',
    tableName: 'Products',
    underscored: false,
    timestamps: true,
  }
);
