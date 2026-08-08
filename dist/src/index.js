import express, {} from "express";
import postsRouter from "./routers/posts.js";
// Basic setup
const app = express();
const PORT = 4000;
// Assing routers
app.use("/api/posts", postsRouter);
app.listen(PORT, () => {
    console.log("Server is running on port 3000");
});
//# sourceMappingURL=index.js.map