const express = require("express");
const { getAllUsers, insertUser } = require("../repositories/users");

const userRoutes = express.Router();

userRoutes.get("/", async (_, res) => {
  try {
    const users = await getAllUsers();
    return res.send(users);
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

userRoutes.post("/", async (req, res) => {
  try {
    await insertUser(req.body);
    return res.status(201).send("Success");
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = userRoutes;
