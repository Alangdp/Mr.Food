'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    queryInterface.createTable("Users", {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [3, 30],
            msg: "Name must be between 3 and 30 characters",
          },
        },
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
        allowNull: true,
        validate: {
          isEmail: {
            msg: "Invalid Email",
          },
        },
      },

      password: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          checkPassword(value) {
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

      birthdate: {
        type: Sequelize.DATEONLY,
        allowNull: true,
        validate: {
          isDate: {
            msg: "Invalid birthdate format",
          },
          isBefore: {
            args: [new Date().toISOString().split('T')[0]],
            msg: "Birthdate must be in the past",
          },
        },
      },

      phoneNumber: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          isNumeric: {
            msg: "Phone number must contain only numbers",
          },
          len: {
            args: [10, 15],
            msg: "Phone number must be between 10 and 15 digits",
          },
        },
      },

      address: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [10, 100],
            msg: "Address must be between 10 and 100 characters",
          },
        },
      },

      createdAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },

      updatedAt: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      }
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
