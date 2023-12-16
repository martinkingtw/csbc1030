const fs = require("fs");

const getAllUsers = () =>
  new Promise((resolve, reject) => {
    fs.readFile("./users.json", "utf-8", (err, users) => {
      if (err) {
        reject(err);
      }
      resolve(JSON.parse(users));
    });
  });

const getUser = (id) =>
  new Promise((resolve, reject) => {
    fs.readFile("./users.json", "utf-8", (err, users) => {
      if (err) {
        reject(err);
      }
      const user = JSON.parse(users).filter((i) => i.id === id);
      resolve(user);
    });
  });

const insertUser = (name) =>
  new Promise((resolve, reject) => {
    fs.readFile("./users.json", "utf-8", (err, users) => {
      if (err) {
        reject(err);
      }
      const usersJson = JSON.parse(users);
      usersJson.unshift({ id: String(usersJson.length + 1), name: name });
      fs.writeFile("./users.json", JSON.stringify(usersJson), (err) => {
        if (err) {
          reject(err);
        }
        resolve(0);
      });
    });
  });

module.exports = { getAllUsers, getUser, insertUser };
