const CommentList = ({ post }) => {
  const renderedComments = post.comments.map((comment) => {
    let content = "";
    if (comment.status === "pending") {
      content = "this comment is awaiting moderation";
    } else if (comment.status === "rejected") {
      content = "this comment has been rejected";
    } else if (comment.status === "approved") {
      content = comment.content;
    }
    return <li key={comment.id}>{content}</li>;
  });

  return (
    <div>
      Comment list
      <ul>{renderedComments}</ul>
    </div>
  );
};

export default CommentList;
