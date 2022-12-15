import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";
import User from "./User.js";

class Reservation extends Model {}

Reservation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
        },
        userId: {
            type: DataTypes.UUID,
            references: {
                model: User,
                key: 'id'
            }
        },
        type: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        date: {
            type: DataTypes.DATE,
            allowNull: false,
        }
    },
    {
        sequelize,
        modelName: "reservation",
        freezeTableName: true
    }
);

export default Reservation;