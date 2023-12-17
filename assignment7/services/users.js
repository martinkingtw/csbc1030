const fs = require("fs");
const bcrypt = require("bcrypt");
const { knex } = require("../utils/database");

const SALT_ROUNDS = 10;

const getAllUsers = () =>
  new Promise((resolve) => {
    return resolve(knex("users").select());
  });

const getUser = (id) =>
  new Promise((resolve) => {
    return resolve(knex("users").where("id", id).select());
  });

const insertUser = (user) =>
  new Promise(async (resolve, reject) => {
    const usernameCheck = await knex("users").where("username", user.username).select();
    if (usernameCheck.length > 0) {
      return reject("username used");
    }
    const hash = await bcrypt.hash(user.password, SALT_ROUNDS);
    await knex("users").insert({ username: user.username, hash })
    return resolve(0);
  });

module.exports = { getAllUsers, getUser, insertUser };
