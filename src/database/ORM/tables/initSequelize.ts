import { Sequelize } from "sequelize";
import { initializeTables } from "./defineSequelizeTables.ts";

export default async function initialiseSequelize(): Promise<Sequelize> {
  const sequelize = new Sequelize({
    dialect: "sqlite",
    storage: "../database.sqlite", // File path or use ':memory:'
    logging: true, // Set to true to see raw SQL logs
  });

  await initializeTables(sequelize);

  await sequelize.sync({ force: true });

  console.log("Database synced successfully.");

  return sequelize;
}
