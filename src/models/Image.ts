import { DataTypes, Model } from 'sequelize';
import database from '../database/index.js';
import fs from 'fs';

export default class Image extends Model {
  declare id: string;
  declare referenceId: string;
  declare path: string;
  declare createdAt: Date;
  declare updatedAt: Date;

  static async deleteImages(referenceId: string, prefix: string) {
    const images = await Image.findAll({
      where: {
        referenceId: `${prefix}_${referenceId}`,
      },
    });

    images.forEach(async image => {
      fs.unlinkSync(image.path);
      await image.destroy();
    });
  }

  static async updateImage(path: string, referenceId: string, prefix: string) {
    const images = await Image.findAll({
      where: {
        referenceId: `${prefix}_${referenceId}`,
      },
    });

    images.forEach(async image => {
      fs.unlinkSync(image.path);
      await image.destroy();
    });

    await Image.create({
      referenceId: `PRODUCT_${referenceId}`,
      path,
    });
  }
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
    modelName: 'Image',
    tableName: 'Images',
    underscored: false,
    timestamps: true,
  },
);
