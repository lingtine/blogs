import { useState } from "react";
import axios from "axios";

const PostCreate = () => {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:4000/posts", {
      title: value,
    });
    setValue("");
  };

  return (
    <div>
      <h1>Create Post</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group my-2">
          <label className="pb-2">Title</label>
          <input
            className="form-control"
            placeholder="Enter a new post"
            value={value}
            onChange={handleChange}
          />
        </div>
        <button className="btn btn-primary" type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default PostCreate;
