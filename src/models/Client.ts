import { DataTypes, Model } from "sequelize";
import database from '../database/index.js';
import bcrypt from "bcrypt";

// This class is used for client users of the application that's why it is simple
// Login use phone number
// And to create a new user we need to use the phone number and name
// The phone number is unique
export default class Client extends Model {
  declare id: number;
  declare name: string;
  declare phoneNumber: string;
  declare password: string;

  static async findByPhone(phone: string) {
    return await this.findOne({ where: { phoneNumber: phone } });
  }

  async login(password: string) {
    if(!this.dataValues.password || !password) return false;
    return await bcrypt.compare(password, this.dataValues.password);
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
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        checkPassword(value: string) {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/.test(
              value
            )
          ) {
            throw new Error('Invalid Password');
          }
        },
        is: {
          args: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/,
          msg: 'The password must contain at least 8 characters including at least 1 uppercase, 1 lowercase, and one digit.',
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

Client.addHook('beforeSave', (client: Client) => {
  if(!client.changed('password')) return;
  const password = bcrypt.hashSync(client.password, 10);
  client.password = password;
});
