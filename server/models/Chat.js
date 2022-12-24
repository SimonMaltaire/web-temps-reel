import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

class Chat extends Model {}

Chat.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true
        },
    },
    {
        sequelize,
        modelName: "chat",
        freezeTableName: true
    }
);

export default Chat;