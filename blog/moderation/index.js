const axios = require("axios");
const express = require("express");
const app = express();

app.use(express.json());

app.post("/events", async function (req, res) {
  const { type, data } = req.body;

  if (type === "CommentCreated") {
    const status = data.content.includes("orange") ? "rejected" : "approved";
    await axios.post("http://localhost:4005/events", {
      type: "CommentModerated",
      data: {
        id: data.id,
        content: data.content,
        postId: data.postId,
        status,
      },
    });
  }

  res.send({});
});

app.listen(4003, function () {
  console.log("listening on port 4003");
});
