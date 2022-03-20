const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();

const commentsByPostId = {};

app.use(express.json());
app.use(cors());

app.get("/posts/:id/comments", function (req, res) {
  res.send(commentsByPostId[req.params.id] || []);
});

app.post("/posts/:id/comments", async function (req, res) {
  const commentId = randomBytes(4).toString("hex");
  const { content } = req.body;
  const id = req.params.id;

  const comments = commentsByPostId[id] || [];
  comments.push({ id: commentId, content });
  commentsByPostId[id] = comments;

  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: { id, commentId, content, postId: id },
  });

  res.status(201).send(comments);
});

app.post("/events", function (req, res) {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4001, function () {
  console.log("listening on port 4001");
});
