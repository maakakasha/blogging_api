import { response } from "express";
export function getAllPosts(req, res) {
    const posts = ["1", "2", "3"];
    res.send(posts);
}
export function getPostById(req, res) {
    res.json({});
}
//# sourceMappingURL=posts.js.map