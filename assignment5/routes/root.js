const express = require("express");

const rootRoutes = express.Router();

rootRoutes.get("/", (_, res) => {
  return res.send("Try /users and /users/:id endpoint");
});

module.exports = rootRoutes;
