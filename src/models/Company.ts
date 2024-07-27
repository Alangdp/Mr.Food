import { DataTypes, Model } from 'sequelize';
import database from '../database/index.js';
import bcrypt from 'bcrypt';

export default class Company extends Model {
  public declare id: number;
  public declare name: string;
  public declare cnpj: string;
  public declare email: string;
  public declare phone: string;
  public declare orderMinimum: number;
  public declare paymentMethods: string[];
  public declare address: string;
  public declare openingHours: {
    monday: { open: string; close: string; closed?: boolean };
    tuesday: { open: string; close: string; closed?: boolean };
    wednesday: { open: string; close: string; closed?: boolean };
    thursday: { open: string; close: string; closed?: boolean };
    friday: { open: string; close: string; closed?: boolean };
    saturday: { open: string; close: string; closed?: boolean };
    sunday: { open?: string; close?: string; closed: boolean };
  };
  public declare deliveryOptions: string[];
  public declare website?: string;
  public declare description?: string;
  public declare password?: string;
  public declare createdAt: Date;
  public declare updatedAt: Date;

  static async findByPhone(phone: string) {
    return await this.findOne({ where: { phoneNumber: phone } });
  }

  validatePassword(password: string): boolean {
    return bcrypt.compareSync(password, this.dataValues.password);
  }
}

Company.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 255],
      },
    },
    cnpj: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[0-9]{14}$/,
        len: [14, 14],
      },
    },
    email: {
      unique: true,
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [5, 255],
      },
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        is: /^\+?[0-9\-()\s]+$/,
        len: [10, 20],
      },
    },
    orderMinimum: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
        min: 0,
      },
    },
    paymentMethods: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      defaultValue: [],
      validate: {
        isArrayOfStrings(value: string[] | undefined) {
          if (!Array.isArray(value)) {
            throw new Error('Payment methods must be an array');
          }
          value.forEach(method => {
            if (typeof method !== 'string') {
              throw new Error('Payment methods must be an array of strings');
            }
          });
        },
      },
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [5, 255],
      },
    },
    openingHours: {
      type: DataTypes.JSONB,
      allowNull: false,
      defaultValue: {
        monday: { open: '08:00', close: '18:00' },
        tuesday: { open: '08:00', close: '18:00' },
        wednesday: { open: '08:00', close: '18:00' },
        thursday: { open: '08:00', close: '18:00' },
        friday: { open: '08:00', close: '18:00' },
        saturday: { open: '09:00', close: '14:00' },
        sunday: { closed: true },
      },
      validate: {
        isValidOpeningHours(
          value:
            | {
                [key: string]: {
                  open: string;
                  close: string;
                  closed?: boolean;
                };
              }
            | undefined,
        ) {
          const days = [
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
            'sunday',
          ];
          days.forEach(day => {
            if (!value || !value[day]) {
              throw new Error(`Opening hours for ${day} are missing`);
            }
            if (!value[day].closed) {
              const { open, close } = value[day];
              const timeFormat = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;
              if (!timeFormat.test(open) || !timeFormat.test(close)) {
                throw new Error(
                  `Invalid opening or closing time format for ${day}`,
                );
              }
            }
          });
        },
      },
    },
    deliveryOptions: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        isArrayOfStrings(value: string[] | undefined) {
          if (!Array.isArray(value)) {
            throw new Error('Delivery options must be an array');
          }
          value.forEach(option => {
            if (typeof option !== 'string') {
              throw new Error('Delivery options must be an array of strings');
            }
          });
        },
      },
    },
    website: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        isUrl: true,
        len: [5, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [10, 1000],
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {},
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

Company.addHook('beforeSave', async (user: Company) => {
  const password = user.dataValues.password;
  if (!password) throw new Error('Password is required');
  const hash = await bcrypt.hash(password, 10);
  user.dataValues.password = hash;
});
