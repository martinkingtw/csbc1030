const express = require("express");
const {
  getCommentByPostId,
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
} = require("../repositories/comments");
const { getPostById } = require("../repositories/posts");

const commentRoutes = express.Router();

commentRoutes.get("/:id/comments", async (req, res) => {
  try {
    const posts = await getPostById(req.params.id);
    if (posts.length === 0) {
      return res.status(404).send("Cannot find post");
    }
    const comments = await getCommentByPostId(req.params.id);
    return res.send(comments);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

commentRoutes.post("/:id/comments", async (req, res) => {
  try {
    const posts = await getPostById(req.params.id);
    if (posts.length === 0) {
      return res.status(404).send("Cannot find post");
    }
    await insertComment(req.auth.id, req.params.id, req.body.content);
    return res.status(201).send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

commentRoutes.patch("/:id/comments", async (req, res) => {
  try {
    const comments = await getCommentById(req.body.comment_id);
    if (comments.length === 0) {
      return res.status(404).send("Cannot find comment");
    } else if (comments[0].user_id !== req.auth.id) {
      return res
        .status(403)
        .send("Cannot patch comment from another commenter");
    }
    await updateComment(req.body.comment_id, req.body.content);
    return res.send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

commentRoutes.delete("/:id/comments", async (req, res) => {
  try {
    const comments = await getCommentById(req.body.comment_id);
    if (comments.length === 0) {
      return res.status(404).send("Cannot find comment");
    } else if (comments[0].post_id !== Number(req.params.id)) {
      return res.status(404).send("The comment does not belong to the post ID");
    } else if (comments[0].user_id !== req.auth.id) {
      return res
        .status(403)
        .send("Cannot delete comment from another commenter");
    }
    await deleteComment(req.body.comment_id);
    return res.send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = commentRoutes;
