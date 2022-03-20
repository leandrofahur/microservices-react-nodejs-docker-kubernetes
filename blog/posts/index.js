const { randomBytes } = require("crypto");
const axios = require("axios");
const cors = require("cors");
const express = require("express");
const app = express();

const posts = {};

app.use(express.json());
app.use(cors());

app.get("/posts", function (req, res) {
  res.send(posts);
});

app.post("/posts", async function (req, res) {
  const id = randomBytes(4).toString("hex");
  const { title } = req.body;

  posts[id] = { id, title };

  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: { id, title },
  });

  res.status(201).send(posts[id]);
});

app.post("/events", function (req, res) {
  console.log("Received Event", req.body.type);
  res.send({});
});

app.listen(4000, function () {
  console.log("listening on port 4000");
});
