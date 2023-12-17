const express = require("express");
const bcrypt = require("bcrypt");
const jwtSigner = require("jsonwebtoken");
const { getAllUsers, getUser, insertUser } = require("../services/users");

const userRoutes = express.Router();

userRoutes.get("/", (_, res) => {
  const usersPromise = getAllUsers();
  Promise.all([usersPromise])
    .then((users) => {
      return res.send(users);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ err: err.message });
    });
});

userRoutes.post("/", async (req, res) => {
  if (req.auth.id !== 1) {
    return res.status(403).send("Cannot append user if not user ID 1");
  }
  try {
    await insertUser(req.body);
    return res.status(201).send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send({ err: err.message });
  }
});

userRoutes.get("/:id", (req, res) => {
  if (req.auth.id !== Number(req.params.id)) {
    return res.status(403).send("Cannot fetch other user's profile");
  }
  const userPromise = getUser(req.params.id);
  Promise.all([userPromise])
    .then((user) => {
      return res.send(user);
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ err: err.message });
    });
});

userRoutes.post("/login", (req, res) => {
  const usersPromise = getAllUsers();
  Promise.all([usersPromise])
    .then((users) => {
      const user = users[0].filter((u) => u.username === req.body.username);
      if (user.length === 0) {
        return res.status(401).send({ error: "Invalid credentials" });
      }
      bcrypt.compare(req.body.password, user[0].hash, function (err, same) {
        if (err) {
          console.error(err);
          return res.status(500).send({ err: err.message });
        }
        if (same) {
          const token = jwtSigner.sign(
            { id: user[0].id, username: user[0].username },
            process.env.SECRET_KEY,
            {
              expiresIn: "1h",
            },
          );
          return res.send({ token });
        } else {
          return res.status(401).send({ error: "Invalid credentials" });
        }
      });
    })
    .catch((err) => {
      console.error(err);
      return res.status(500).send({ err: err.message });
    });
});

module.exports = userRoutes;
