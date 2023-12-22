const express = require("express");
const {
  getPostByUserId,
  insertPost,
  updatePost,
  getPostById,
} = require("../repositories/posts");

const postRoutes = express.Router();

postRoutes.get("/", async (req, res) => {
  try {
    const posts = await getPostByUserId(req.auth.id);
    return res.send(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

postRoutes.get("/:id", async (req, res) => {
  try {
    const posts = await getPostById(req.params.id);
    if (posts.length === 0) {
      return res.status(404).send("Cannot find post");
    }
    return res.send(posts);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

postRoutes.post("/", async (req, res) => {
  try {
    await insertPost(req.auth.id, req.body.content);
    return res.status(201).send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

postRoutes.patch("/:id", async (req, res) => {
  try {
    const posts = await getPostById(req.params.id);
    if (posts.length === 0) {
      return res.status(404).send("Cannot find post");
    } else if (posts[0].user_id !== req.auth.id) {
      return res.status(403).send("Cannot patch post from another poster");
    }
    await updatePost(req.params.id, req.body.content);
    return res.send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = postRoutes;
