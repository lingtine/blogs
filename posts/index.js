const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { randomBytes } = require("crypto");
const axios = require("axios"); // node
const app = express();

app.use(bodyParser.json());
app.use(cors());

const posts = {};
app.get("/posts", (req, res) => {
  res.send(posts).status(200);
});

app.post("/posts", async (req, res) => {
  const id = randomBytes(4).toString("HEX");

  const { title } = req.body;

  posts[id] = {
    id,
    title,
  };
  await axios.post("http://localhost:4005/events", {
    type: "PostCreated",
    data: {
      id: id,
      title: title,
    },
  });
  res.status(201).send(posts[id]);
});

app.post("/events", (req, res) => {
  console.log(req.body);
  res.send({});
});

app.listen(4000, () => {
  console.log("Listening on 4000");
});
