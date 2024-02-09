import { CommentType } from "../../types/CommentProps";
import Comment from "./Comment";

type CommentsListProps = {
  comments: CommentType[];
  role?: string,
};
function CommentsList({ comments, role="create"}: CommentsListProps) {
  return (
    <div className="flex flex-col m-5 gap-2">
      {comments.map((comment) => {
        return <Comment key={comment._id} comment={comment} removeAbility={role==="edit"}/>;
      })}
    </div>
  );
}
export default CommentsList;
