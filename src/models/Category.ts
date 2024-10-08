import { Model, DataTypes } from 'sequelize';
import database from '../database/index.js';

export default class Category extends Model {
  declare id: number;
  declare companyId: number;
  declare name: string;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare type: string;
  declare active: boolean;
  declare min: number;
  declare maxnumber: number;
  declare obrigatory: boolean;

  static async findByName(name: string) {
    return await this.findOne({ where: { name } });
  }

  static async findByCompanyId(company_id: number) {
    return await this.findAll({ where: { company_id } });
  }

  static async findByNameAndCompanyId(name: string, company_id: number) {
    return await this.findOne({ where: { name, company_id } });
  }

  static async categoryBelongsToCompany(categoryId: number, companyId: number) {
    const category = await this.findOne({ where: { id: categoryId } });
    if (!category) return false;
    return category.companyId === companyId;
  }
}

Category.init(
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
