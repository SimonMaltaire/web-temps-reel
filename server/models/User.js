import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./db.js";
import bcryptjs from "bcryptjs";

class User extends Model {}

User.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 6,
                    max: 255,
                },
            },
        },
        isAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false,
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: {
                    min: 2,
                },
            },
        }
    },
    {
        sequelize,
        modelName: "user",
        freezeTableName: true
    }
);

User.addHook("beforeCreate", async (user) => {
    user.password = await bcryptjs.hash(user.password, await bcryptjs.genSalt());
});

User.addHook("beforeUpdate", async (user, { fields }) => {
    if (fields.includes("password")) {
        user.password = await bcryptjs.hash(
            user.password,
            await bcryptjs.genSalt()
        );
    }
});

export default User;
