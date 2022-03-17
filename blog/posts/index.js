const { randomBytes } = require("crypto");
const express = require("express");
const app = express();

const posts = {};

app.use(express.json());

app.get("/posts", function (req, res) {
  res.send(posts);
});

app.post("/posts", function (req, res) {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  res.status(201).send(posts[id]);
});

app.listen(4000, function () {
  console.log("listening on port 4000");
});
