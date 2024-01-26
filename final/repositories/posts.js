const { knex } = require("../utils/database");

const getPostById = async (id) => {
  return knex("posts").where("id", id).select();
};

const getPostByUserId = async (user_id) => {
  return knex("posts").where("user_id", user_id).select();
};

const insertPost = async (user_id, content) => {
  return knex("posts").insert({ user_id, content });
};

const updatePost = async (id, content) => {
  return knex("posts")
    .update({
      content: content,
      updated_at: new Date(),
    })
    .where("id", id);
};

module.exports = { getPostById, getPostByUserId, insertPost, updatePost };
