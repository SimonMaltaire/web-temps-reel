import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";
import Topic from "./Topic.js";
import Chat from "./Chat.js";
import User from "./User.js";

class Message extends Model {}

Message.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        topicId: {
            type: DataTypes.UUID,
            references: {
                model: Topic,
                key: "id"
            },
            onDelete: 'cascade'
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: "id"
            },
        },
        chatId: {
            type: DataTypes.UUID,
            references: {
                model: Chat,
                key: "id"
            },
            onDelete: 'cascade'
        },
        senderId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        createdBy: {
            type: DataTypes.STRING,
            allowNull: false
        },
        content: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "message",
        freezeTableName: true
    }
);

export default Message;