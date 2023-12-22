const express = require("express");
const bcrypt = require("bcrypt");
const jwtSigner = require("jsonwebtoken");
const { getUserByUsername } = require("../repositories/users");

const loginRoutes = express.Router();

loginRoutes.post("/", async (req, res) => {
  try {
    const users = await getUserByUsername(req.body.username);
    if (users[0].length === 0) {
      return res.status(401).send({ error: "Invalid credentials" });
    }
    const user = users[0];
    const same = bcrypt.compareSync(req.body.password, user.hash);
    if (same) {
      const token = jwtSigner.sign(
        { id: user.id, username: user.username },
        process.env.SECRET_KEY,
        {
          expiresIn: "1h",
        },
      );
      return res.send({ token });
    } else {
      return res.status(401).send({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error(err);
    return res.status(500).send(`Error: ${err.message}`);
  }
});

module.exports = loginRoutes;
