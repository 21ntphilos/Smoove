"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserInstance = void 0;
const sequelize_1 = require("sequelize");
const db_1 = require("../config/db");
class UserInstance extends sequelize_1.Model {
}
exports.UserInstance = UserInstance;
UserInstance.init({
    id: {
        type: sequelize_1.DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notNull: {
                msg: "Email is required",
            },
            isEmail: {
                msg: "Email is invalid",
            },
        },
    },
    userName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Username is required",
            },
        },
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Password is required",
            },
            notEmpty: {
                msg: "Password is required",
            },
        },
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    salt: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    gender: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Gender is required",
            },
            notEmpty: {
                msg: "Gender is required",
            },
        },
    },
    date_birth: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
        validate: {
            notNull: {
                msg: "date of birth is required",
            },
            notEmpty: {
                msg: "date of birth is required",
            },
        },
    },
    isAceptedPrivacy: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    otp: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    otp_expiry: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true,
    },
    country: {
        type: sequelize_1.DataTypes.STRING,
    },
    lng: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lat: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    verified: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        validate: {
            notNull: {
                msg: "Verification status is required",
            },
            notEmpty: {
                msg: "user not verified",
            },
        },
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    profileImage: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    lan: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    currency: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    isAceptedTerms: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: true,
    },
    socials: {
        type: sequelize_1.DataTypes.ARRAY(sequelize_1.DataTypes.STRING),
    },
}, {
    sequelize: db_1.db,
    tableName: "user",
});
//# sourceMappingURL=userModel.js.map