import { DataTypes, Model } from 'sequelize';
import database from '../database/index.js';

export default class CategorySuplement extends Model {
  declare id: number; // ! Auto
  declare companyId: number; // ! Auto
  declare name: string;
  declare type: string; // ! Auto - Default: 'PRODUCT'
  declare min: number;
  declare max: number;
  declare obrigatory: boolean; // ? Auto - Default: false
  declare active: boolean; // ! Auto
  declare createdAt: Date; // ! Auto
  declare updatedAt: Date; // ! Auto
}

CategorySuplement.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    min: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    max: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    obrigatory: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    type: {
      type: DataTypes.STRING(50),
      validate: {
        isIn: { args: [['PRODUCT', 'CATEGORY']], msg: 'Invalid type' },
      },
      allowNull: false,
      defaultValue: 'PRODUCT',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    companyId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'company_id',
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'created_at',
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
      field: 'updated_at',
    },
  },
  {
    sequelize: database,
    modelName: 'Category',
    tableName: 'Categories',
    underscored: false,
    timestamps: true,
  },
);
