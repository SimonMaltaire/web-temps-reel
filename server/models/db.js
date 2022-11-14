import Sequelize from "sequelize";
import * as dotenv from 'dotenv';
dotenv.config();

const connection = new Sequelize(process.env.DB_URL, {
    useNewUrlParser: true,
    dialect: "postgres"
});

connection.authenticate().then(() => {
    console.log("Connection has been established successfully.");
});

export default connection;
