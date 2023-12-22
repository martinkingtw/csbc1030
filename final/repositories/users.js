const bcrypt = require("bcrypt");
const { knex } = require("../utils/database");

const SALT_ROUNDS = 10;

const getAllUsers = async () => {
  return knex("users").select("id", "username", "created_at", "updated_at");
};

const getUserByUsername = async (username) => {
  return knex("users").where("username", username).select();
};

const insertUser = async (user) => {
  const usernameCheck = await knex("users")
    .where("username", user.username)
    .select();
  if (usernameCheck.length > 0) {
    throw new Error("username used");
  }
  const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
  return knex("users").insert({ username: user.username, hash });
};

module.exports = { getAllUsers, getUserByUsername, insertUser };
