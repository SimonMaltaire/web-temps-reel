import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

class Topic extends Model {}

Topic.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        size: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
    },
    {
        sequelize,
        modelName: "topic",
        freezeTableName: true
    }
);

export default Topic;