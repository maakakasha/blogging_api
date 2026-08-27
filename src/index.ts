import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import BlogORMOperationsImpl from "./database/ORM/BlogOperationImpl.ts";
import { constructBlogRouter } from "./routers/blogs.ts";
import errorHandlingMiddleware from "./middleware/errorHandler.ts";
import { BlogController } from "./controllers/blogs.ts";
import initialiseSequelize from "./database/ORM/tables/initSequelize.ts";

// Basic setup
const app = express();
const PORT = 4000;
app.use(express.json());

// Middleware
// app.use(authentication);

// Dependencies
export const sequelize = await initialiseSequelize();

const blogController = new BlogController(new BlogORMOperationsImpl(sequelize));

// Assigning routers
app.use("/api/posts", constructBlogRouter(blogController));

async function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to initialize database:", error);
    process.exit(1);
  }
}

// Error Handling middleware
app.use(errorHandlingMiddleware);

startServer();
