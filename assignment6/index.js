const express = require("express");
const bodyParser = require("body-parser");
const { expressjwt: jwt } = require("express-jwt");
const userRoutes = require("./routes/users");
const errorMiddleware = require("./middlewares/error");

require("dotenv").config();

const app = express();

app.use(bodyParser.json());

app.use(
  jwt({ secret: process.env.SECRET_KEY, algorithms: ["HS256"] }).unless({
    path: ["/users/login"],
  }),
);

app.use(bodyParser.json());

app.use("/users", userRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
