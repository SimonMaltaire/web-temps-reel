import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./db.js";
import User from "./User.js";
import Chat from "./Chat.js";

class UserChats extends Model {}

UserChats.init(
    {
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            },
            onDelete: 'cascade'
        },
        chatId: {
            type: DataTypes.UUID,
            references: {
                model: Chat,
                key: 'id'
            },
            onDelete: 'cascade'
        }
    },
    {
        sequelize,
        modelName: "user_chats",
        freezeTableName: true
    }
);

export default UserChats;
