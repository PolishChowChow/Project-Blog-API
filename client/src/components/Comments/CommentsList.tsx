import { CommentType } from "../../types/CommentProps";
import FormHeader from "../Form/FormHeader";
import Comment from "./Comment";

type CommentsListProps = {
  comments: CommentType[];
  role?: string;
};
function CommentsList({ comments, role = "create" }: CommentsListProps) {
  return (
    <div className="flex flex-col m-5 gap-2">
      {comments.length === 0 ? (
        <FormHeader classNames="m-5">No Comments Founded</FormHeader>
      ) : (
        comments.map((comment) => {
          return (
            <Comment
              key={comment._id}
              comment={comment}
              removeAbility={role === "edit"}
            />
          );
        })
      )}
    </div>
  );
}
export default CommentsList;
