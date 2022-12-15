import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./db.js";
import User from "./User.js";
import Topic from "./Topic.js";

class UserTopics extends Model {}

UserTopics.init(
    {
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            },
            onDelete: 'cascade'
        },
        topicId: {
            type: DataTypes.UUID,
            references: {
                model: Topic,
                key: 'id'
            },
            onDelete: 'cascade'
        }
    },
    {
        sequelize,
        modelName: "user_topics",
        freezeTableName: true
    }
);

export default UserTopics;
