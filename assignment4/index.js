const fs = require('fs');
const express = require('express');
const app = express();

const rootRoutes = express.Router();

rootRoutes.get('/', (_, res) => {
  return res.send("Try /users and /users/:id endpoint");
})

app.use('/', rootRoutes);

const userRoutes = express.Router();

userRoutes.get('/', (_, res) => {
  fs.readFile('./users.json', 'utf-8', (err, users) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    return res.send(JSON.parse(users));
  });
})

userRoutes.get('/:id', (req, res) => {
  fs.readFile('./users.json', 'utf-8', (err, users) => {
    if (err) {
      res.status(500).send("Internal Server Error");
    }
    const user = JSON.parse(users).filter((i) => i.id === req.params.id);
    if (user.length === 0) { return res.status(404).send("Record not found"); }
    return res.send(user);
  });
});

app.use('/users', userRoutes);

app.listen(3000, () => {
    console.log('Express started on port 3000');
});