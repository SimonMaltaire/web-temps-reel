import { sequelize } from "./models/index.js";

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced");
  sequelize.close();
});
