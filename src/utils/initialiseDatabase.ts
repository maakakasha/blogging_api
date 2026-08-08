import { BlogOperationContract } from "../database/persistaece/blogOperationsContract.ts";


export async function initialiseDatabase(db: BlogOperationContract) {
  try {
    await db.initialiseDatabase();
  } catch (error) {
    console.error("Failed to initialise database:", error);
  }
}
