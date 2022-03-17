const { randomBytes } = require("crypto");
const express = require("express");
const app = express();

const commentsByPostId = {};

app.use(express.json());

app.get("/posts/:id/comments", function (req, res) {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", function (req, res) {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const id = req.params.id;

  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  res.status(201).send(comments);
});

app.listen(4001, function () {
  console.log("listening on port 4001");
});
