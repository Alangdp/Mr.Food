import { DataTypes, Model } from 'sequelize';
import database from '../database/index.js';

export default class Image extends Model {
  declare id: string;
  declare referenceId: string;
  declare path: string;
  declare createdAt: Date;
  declare updatedAt: Date;
}

Image.init(
  {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
    },

    referenceId: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    path: {
      type: DataTypes.TEXT,
      allowNull: false,
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
    modelName: 'Company',
    tableName: 'Companies',
    underscored: false,
    timestamps: true,
  },
);
