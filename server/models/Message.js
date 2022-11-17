import { Model, DataTypes, Sequelize } from "sequelize";

class Message extends Model {}

Message.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
    recepientId: {
        type: DataTypes.NUMBER,
        allowNull: false
    },
    isRead: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    }
});

export default Message;