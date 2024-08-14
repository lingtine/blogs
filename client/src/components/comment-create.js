import axios from "axios";
import { useState } from "react";

const CommentCreate = ({ post }) => {
  const [content, setContent] = useState("");

  const handleChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://localhost:4001/posts/${post.id}/comments`, {
      content,
    });
    setContent("");
  };

  return (
    <div>
      <h5>Conmment</h5>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="my-2">New Comment</label>
          <input
            className="form-control"
            onChange={handleChange}
            value={content}
            placeholder="Enter a comment"
          />
        </div>
        <button className="btn btn-primary mt-2">Submit</button>
      </form>
    </div>
  );
};

export default CommentCreate;
