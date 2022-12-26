import { Model, DataTypes, Sequelize } from "sequelize";
import { Chat, sequelize, User } from './index.js';

class Request extends Model {}

Request.REQUEST_STATUS = {
    PENDING: 'PENDING',
    REFUSED: 'REFUSED',
    ACCEPTED: 'ACCEPTED',
    COMPLETED: 'COMPLETED'
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
        chatId: {
            type: DataTypes.UUID,
            references: {
                model: Chat,
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