import { useMutation, useQueryClient } from "react-query";
import { CommentType } from "../../types/CommentProps";
import LikeComponent from "../LikeComponent";
import axios from "axios";
import { like } from "../../types/PostProps";
import getCookiesData from "../../functions/getCookiesData";
import { Link } from "react-router-dom";
import Button from "../Form/Button";
type CommentComponentType = {
  comment: CommentType;
  removeAbility?: boolean;
};
function Comment({ comment, removeAbility = false }: CommentComponentType) {
  const { userId, token } = getCookiesData();
  const queryClient = useQueryClient();
  const handleLikes = async () => {
    let newLikesList: like[] = [];
    if (userId && comment.likes.includes(userId)) {
      newLikesList = comment.likes.filter((like) => {
        return like !== userId;
      });
    } else if (userId) {
      newLikesList = [...comment.likes, userId];
    }
    const response = await axios.put(
      `http://localhost:5000/blog/posts/${comment.post}/comments/${comment._id}`,
      {
        likes: newLikesList,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      }
    );
    return response;
  };
  const handleDelete = async() => {
    const response = await axios.delete(`http://localhost:5000/blog/posts/${comment.post}/comments/${comment._id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        userId: userId
      },
    })
    return response
  }
  
  const { mutateAsync: manageLike } = useMutation({
    mutationFn: handleLikes,
    onSuccess: () => {
      queryClient.invalidateQueries([`post/${comment.post}/comments`]);
    },
  });
  const { mutateAsync: manageDelete } = useMutation({
    mutationFn: handleDelete,
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
