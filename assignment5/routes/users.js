const express = require("express");
const { getAllUsers, getUser, insertUser } = require("../services/users");

const userRoutes = express.Router();

userRoutes.get("/", (_, res) => {
  const usersPromise = getAllUsers();
  Promise.all([usersPromise])
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      throw err;
    });
});

userRoutes.post("/", (req, res) => {
  const userPromise = insertUser(String(req.body.name));
  Promise.all([userPromise])
    .then(() => {
      return res.status(201).send("Success");
    })
    .catch((err) => {
      throw err;
    });
});

userRoutes.get("/:id", (req, res) => {
  const userPromise = getUser(req.params.id);
  Promise.all([userPromise])
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      throw err;
    });
});

module.exports = userRoutes;
