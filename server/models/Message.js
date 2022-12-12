import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";
import Topic from "./Topic.js";

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