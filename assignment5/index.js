const express = require("express");
const bodyParser = require("body-parser");
const rootRoutes = require("./routes/root");
const userRoutes = require("./routes/users");
const errorMiddleware = require("./middlewares/error");

const app = express();

app.use(bodyParser.json());

app.use("/", rootRoutes);

app.use("/users", userRoutes);

app.use(errorMiddleware);

app.listen(3000, () => {
  console.log("Express started on port 3000");
});
