import { Sequelize } from "sequelize";
import { initBlogTable } from "./blog.ts";

export async function initializeTables(sequelize: Sequelize) {
  try {
    initBlogTable(sequelize);
  } catch (error) {
    // TODO: Centralize Error handling to be caught by the system
  }
}
