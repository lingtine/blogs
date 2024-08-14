const express = require("express");
const bodyParser = require("body-parser");
const { randomBytes } = require("crypto");
const cors = require("cors");
const axios = require("axios");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostsId = {};

app.get("/posts/:id/comments", (req, res) => {
  const { id } = req.params;
  res.status(200).send(commentsByPostsId[id] || []);
});

app.post("/posts/:id/comments", async (req, res) => {
  const { content } = req.body;
  const { id } = req.params;

  const commentId = randomBytes(4).toString("hex");

  const comments = commentsByPostsId[id] || [];
  comments.push({
    id: commentId,
    content,
    status: "pending",
  });

  commentsByPostsId[id] = comments;
  await axios.post("http://localhost:4005/events", {
    type: "CommentCreated",
    data: {
      id: commentId,
      postId: id,
      content,
      status: "pending",
    },
  });

  res.status(201).send(commentsByPostsId[id]);
});

app.post("/events", async (req, res) => {
  const { type, data } = req.body;
  if (type === "CommentModerated") {
    const comments = commentsByPostsId[data.postId];
    const comment = comments.find((comment) => {
      return comment.id === data.id;
    });
    comment.status = data.status;
    await axios.post("http://localhost:4005/events", {
      type: "CommentUpdated",
      data: {
        id: data.id,
        postId: data.postId,
        content: data.content,
        status: data.status,
      },
    });
  }
  res.send({}).status(201);
});

app.listen(4001, () => {
  console.log("Listening on 4001");
});
