import axios from "axios";
import { useEffect, useState } from "react";
import CommentCreate from "./comment-create";
import CommentList from "./comment-list";

const PostList = () => {
  const [posts, setPosts] = useState({});
  const fetchData = async () => {
    setPosts((await axios.get("http://localhost:4002/posts")).data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const renderPorts = Object.values(posts).map((post) => (
    <li
      key={post.id}
      className="card"
      style={{ width: "30%", marginBottom: "20px" }}
    >
      <div className="card-body">
        <h3>{post.title}</h3>
        <CommentList post={post} />
        <CommentCreate post={post} />
      </div>
    </li>
  ));
  return (
    <div>
      <h1>List Post</h1>
      <ul className="d-flex flex-row flew-wrap justify-content-between">
        {renderPorts}
      </ul>
    </div>
  );
};

export default PostList;
