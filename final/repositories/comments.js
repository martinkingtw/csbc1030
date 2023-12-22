const { knex } = require("../utils/database");

const getCommentById = async (id) => {
  return knex("comments").where("id", id).select();
};

const getCommentByPostId = async (post_id) => {
  return knex("comments").where("post_id", post_id).select();
};

const insertComment = async (user_id, post_id, content) => {
  return knex("comments").insert({ user_id, post_id, content });
};

const updateComment = async (id, content) => {
  return knex("comments")
    .update({
      content: content,
      updated_at: new Date(),
    })
    .where("id", id);
};

const deleteComment = async (id) => {
  return knex("comments").where("id", id).del();
};

module.exports = {
  getCommentByPostId,
  getCommentById,
  insertComment,
  updateComment,
  deleteComment,
};
