const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");

const app = express();
app.use(bodyParser.json());
const commentsByPostsId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.status(200).send(commentsByPostsId[id] || []);
});

app.post("/posts/:id/comments", (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostsId[id] || [];
  comments.push({
    id: commentId,
    content,
  });

  commentsByPostsId[id] = comments;

  res.status(201).send(commentsByPostsId[id]);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
