import "./App.css";
import PostCreate from "./components/post-create";
import PostList from "./components/post-list";

function App() {
  return (
    <div className="container">
      <PostCreate />
      <hr></hr>
      <PostList />
    </div>
  );
}

export default App;
