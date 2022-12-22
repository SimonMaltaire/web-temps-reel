import { Model, DataTypes, Sequelize } from "sequelize";
import { sequelize, User } from './index.js';

class Request extends Model {}

Request.REQUEST_STATUS = {
    pending: 'PENDING',
    refused: 'REFUSED',
    accepted: 'ACCEPTED'
}


Request.init(
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
        status: {
            type: DataTypes.STRING,
            defaultValue: Request.REQUEST_STATUS.pending,
            allowNull: false
        }
    },
    {
        sequelize,
        modelName: "request",
        freezeTableName: true
    }
);

export default Request;