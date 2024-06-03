import { DataTypes, Model } from "sequelize";
import database from '../database/index.js';

// This class is used for client users of the application that's why it is simple
// Login use phone number
// And to create a new user we need to use the phone number and name
// The phone number is unique
export default class Client extends Model {
  static async findByPhone(phone: string) {
    return await this.findOne({ where: { phoneNumber: phone } });
  }
}

Client.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 30],
          msg: 'Name must be between 3 and 30 characters',
        },
      },
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true,
      unique: true,
      validate: {
        isNumeric: {
          msg: 'Phone number must contain only numbers',
        },
        len: {
          args: [10, 15],
          msg: 'Phone number must be between 10 and 15 digits',
        },
      },
    },
  },
  {
    sequelize: database,
    modelName: 'Client',
    tableName: 'Users',
    underscored: false,
    timestamps: true,
  }
);
