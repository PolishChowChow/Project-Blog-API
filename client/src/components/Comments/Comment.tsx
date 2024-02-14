import { useMutation, useQueryClient } from "react-query";
import { CommentType } from "../../types/CommentProps";
import LikeComponent from "../LikeComponent";
import getCookiesData from "../../functions/getCookiesData";
import { Link } from "react-router-dom";
import Button from "../Form/Button";
import useApiContext from "../../context/useApiContext";
type CommentComponentType = {
  comment: CommentType;
  removeAbility?: boolean;
};
function Comment({ comment, removeAbility = false }: CommentComponentType) {
  const { userId } = getCookiesData();
  const { deleteComment, handleCommentLikes } = useApiContext()
  const queryClient = useQueryClient();

  
  const { mutateAsync: manageLike } = useMutation({
    mutationFn: () => handleCommentLikes(comment),
    onSuccess: () => {
      queryClient.invalidateQueries([`post/${comment.post}/comments`]);
    },
  });
  const { mutateAsync: manageDelete } = useMutation({
    mutationFn: () => deleteComment(comment.post._id, comment._id),
    onSuccess: () => {
      queryClient.invalidateQueries([`post/${comment.post}/comments`]);
    },
  });
  const handleLikeClick = async() => {
    await manageLike();
  };
  
  const handleDeleteButton = async() => {
    await manageDelete()
  }
  return (
    <div className="border-b-gray-100 border-b-2 py-2 px-2">
      <div className="font-bold">{comment.author.username}</div>
      <div>{comment.content}</div>
      <div className="flex gap-1">
        {!removeAbility ? (
          <>
            <LikeComponent
              onClick={handleLikeClick}
              isLiked={userId && comment.likes.includes(userId) ? true : false}
            />
            {comment.likes.length}
          </>
        ) : (
          <>
            <Button
              classNames="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600"
              onClick={handleDeleteButton}
            >
              Delete Comment
            </Button>
            <Link to={`/panel/${comment.post}/comments/${comment._id}`}>
              <Button classNames="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600">
                Edit Comment
              </Button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}
export default Comment;
