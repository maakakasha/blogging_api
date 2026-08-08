import { Sequelize } from "sequelize";
import { Blog } from "./ORM/model/blog.ts";

async function runSequelizeDemo() {
  try {
    // Sync Database (Creates table if it doesn't exist)

    // =========================================================================
    // CREATE
    // =========================================================================
    const newPost = await Blog.create({
      title: "Sample Post",
      content: "This is a sample post content.",
      category: "Sample Category",
      tags: [],
    });
    console.log(`[CREATE] Saved Post ID: ${newPost.id}`);

    // =========================================================================
    // READ
    // =========================================================================
    // Read Single Row
    const singlePost = await Blog.findByPk(newPost.id);
    console.log("[READ ONE]", singlePost.toJSON());

    // Read All Rows
    const allPosts = await Blog.findAll();
    console.log(`[READ ALL] Total Posts found: ${allPosts.length}`);

    // =========================================================================
    // UPDATE
    // =========================================================================
    newPost.name = "Alice Jones";
    await newPost.save(); // Persists changes to SQLite
    console.log("[UPDATE] Saved new name to database.");

    // =========================================================================
    // DELETE
    // =========================================================================
    await newPost.destroy();
    console.log("[DELETE] Removed Post from database.");
  } catch (error) {
    console.error("Sequelize Error:", error);
  } finally {
    // Close the connection gracefully
    await sequelize.close();
    console.log("Connection closed.");
  }
}

runSequelizeDemo();
