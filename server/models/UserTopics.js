import { DataTypes, Model, Sequelize } from "sequelize";
import sequelize from "./db.js";
import bcryptjs from "bcryptjs";
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
              }
        },
        topicId: {
            type: DataTypes.UUID,
            references: {
                model: Topic,
                key: 'id'
              }
        }
    },
    {
        sequelize,
        modelName: "user_topics",
        freezeTableName: true
    }
);

export default UserTopics;
