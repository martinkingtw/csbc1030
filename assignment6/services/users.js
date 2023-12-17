const fs = require("fs");
const bcrypt = require("bcrypt");

const SALT_ROUNDS = 10;

const getAllUsers = () =>
  new Promise((resolve, reject) => {
    fs.readFile("./users.json", "utf-8", (err, users) => {
      if (err) {
        return reject(err);
      }
      return resolve(JSON.parse(users));
    });
  });

const getUser = (id) =>
  new Promise((resolve, reject) => {
    fs.readFile("./users.json", "utf-8", (err, users) => {
      if (err) {
        return reject(err);
      }
      const user = JSON.parse(users).filter((i) => i.id === id);
      return resolve(user);
    });
  });

const insertUser = (user) =>
  new Promise((resolve, reject) => {
    fs.readFile("./users.json", "utf-8", (err, users) => {
      if (err) {
        return reject(err);
      }
      const usersJson = JSON.parse(users);
      if (usersJson.filter((u) => u.username === user.username).length > 0) {
        return reject("username used");
      }
      bcrypt.hash(user.password, SALT_ROUNDS, function (err, hash) {
        if (err) {
          throw err;
        }
        usersJson.unshift({
          id: String(usersJson.length + 1),
          username: user.username,
          hash: hash,
        });
        fs.writeFile("./users.json", JSON.stringify(usersJson), (err) => {
          if (err) {
            return reject(err);
          }
          return resolve(0);
        });
      });
    });
  });

module.exports = { getAllUsers, getUser, insertUser };
