import { Model, DataTypes, Sequelize } from "sequelize";
import sequelize from "./db.js";

class Reservation extends Model {}

Reservation.init(
    {
        id: {
            type: DataTypes.UUID,
            defaultValue: Sequelize.UUIDV4,
            primaryKey: true,
            allowNull: false
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