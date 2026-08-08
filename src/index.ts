import express, {
  type Request,
  type Response,
  type NextFunction,
} from "express";

import BlogOperationsImpl from "./database/ORM/BlogOperationImpl.ts";
import { createBlogRouter } from "./routers/blogs.ts";
import errorHandlingMiddleware from "./middleware/errorHandler.ts";
import { BlogController } from "./controllers/blogs.ts";
import initialiseSequelize from "./utils/initSequelize.ts";

// Basic setup
const app = express();
const PORT = 4000;
app.use(express.json());

// Middleware
// app.use(authentication);

// Dependencies
const sequelize = await initialiseSequelize();
const blogController = new BlogController(new BlogOperationsImpl(sequelize));

// Assigning routers
app.use("/api/posts", createBlogRouter(blogController));

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
