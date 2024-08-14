const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

const post = {};

app.use(bodyParser.json());
app.use(cors());

const handleEvent = (type, data) => {
  switch (type) {
    case "CommentCreated":
      post[data.postId].comments.push({
        id: data.id,
        content: data.content,
        status: data.status,
      });
      break;
    case "PostCreated":
      post[data.id] = {
        id: data.id,
        title: data.title,
        comments: [],
      };
      break;

    case "CommentUpdated":
      const comments = post[data.postId].comments;
      const comment = comments.find((comment) => {
        return comment.id === data.id;
      });
      comment.status = data.status;
      break;
  }
};

app.get("/posts", (req, res) => {
  res.send(post).status(200);
});

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  handleEvent(type, data);
  res.send({ status: "ok" }).status(201);
});

app.listen(4002, async () => {
  console.log("Listen to 4002");
  const res = await axios.get("http://localhost/4005/events");
  for (let event of res.data) {
    handleEvent(event.type, event.data);
  }
});
