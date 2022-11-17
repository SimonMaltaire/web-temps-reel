import { Model, DataTypes, Sequelize } from "sequelize";

class Chat extends Model {}

Chat.init({
    id: {
        type: DataTypes.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
        allowNull: false
    },
});

export default Chat;