const express = require("express");
const app = express();
const axios = require("axios");

app.use(express.json());

app.post("/events", async function (req, res) {
  const event = req.body;

  await axios.post("http://localhost:4000/events", event);
  await axios.post("http://localhost:4001/events", event);
  await axios.post("http://localhost:4002/events", event);

  res.send({ status: "OK" });
});

app.listen(4005, function () {
  console.log("listening on port 4005");
});
