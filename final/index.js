const express = require("express");
const bodyParser = require("body-parser");
const { expressjwt: jwt } = require("express-jwt");
const loginRoutes = require("./routes/login");
const userRoutes = require("./routes/users");
const postRoutes = require("./routes/posts");
const commentRoutes = require("./routes/comments");
const errorMiddleware = require("./middlewares/error");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(
  jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: [
      { url: "/users", methods: ["GET"] },
      { url: "/login", methods: ["POST"] },
    ],
  }),
);

app.use(bodyParser.json());

app.use("/login", loginRoutes);

app.use("/posts", postRoutes);

app.use("/users", userRoutes);

app.use("/posts", commentRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
