import { DataTypes, Model, Sequelize } from 'sequelize';
import bcrypt from 'bcrypt';
import database from '../database/index.js';

export class User extends Model {
  public id!: number;
  public name?: string;
  public email?: string;
  public password?: string;
  public birthdate?: Date | null;
  public phoneNumber?: string | null;
  public address?: string | null;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  async validatePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.dataValues.password);
  }
}

User.init(
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
    },

    name: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [3, 30],
          msg: 'Name must be between 3 and 30 characters',
        },
      },
    },

    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: true,
      validate: {
        isEmail: {
          msg: 'Invalid Email',
        },
      },
    },

    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        checkPassword(value: string) {
          if(!value) return;
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$^+=!*()@%&]).{8,}$/.test(
              value,
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

    birthdate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
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

    address: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        len: {
          args: [10, 100],
          msg: 'Address must be between 10 and 100 characters',
        },
      },
    },

    createdAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },

    updatedAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
    },
  },
  {
    sequelize: database,
    modelName: 'User',
    tableName: 'Users',
    underscored: false,
    timestamps: true,
  },
);

User.addHook('beforeSave', async (user: User) => {
  const password = user.dataValues.password;
  if(!password) return;
  const hash = await bcrypt.hash(password, 10);
  user.dataValues.password = hash;
});
