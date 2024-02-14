import axios from "axios";
import { useQueryClient, useMutation } from "react-query";
import getCookiesData from "../../functions/getCookiesData";
import ComponentProps from "../../types/ComponentProps";
import { ExtendedPostProps } from "../../types/PostProps";
import LikeComponent from "../LikeComponent";
import StyledLink from "../StyledLink";
import PostContainer from "./PostContainer";
import Button from "../Form/Button";
import { Link } from "react-router-dom";
import useApiContext from "../../context/useApiContext";
type PostComponentProps = {
  post: ExtendedPostProps;
  removeAbility: boolean;
};
function Post({
  post,
  classNames,
  removeAbility = false,
}: PostComponentProps & ComponentProps) {
  const { title, author, content, likes, url } = post;
  const { userId, token } = getCookiesData();
  const { handlePostLikes } = useApiContext()

  const handleDelete = async() => {
    const response = await axios.delete(`http://localhost:5000/blog/posts/${post._id}`,{
      headers: {
        Authorization: `Bearer ${token}`,
        userId: userId
      },
    })
    return response
  }

  const handleDeleteButton = () => {
    manageDelete()
  };
  const queryClient = useQueryClient();
  const { mutateAsync: manageDelete } = useMutation({
    mutationFn: handleDelete,
    onSuccess: () =>{
      queryClient.invalidateQueries(["posts"]);
    }
  })
  const {mutateAsync: handleEdit} = useMutation({
    mutationFn: async() => {
      const response = await axios.put(`http://localhost:5000/blog/posts/${post._id}`,{
        is_published: !post.is_published
      },{
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId
        },
      })
      return response
    },
    onSuccess: () =>{
      queryClient.invalidateQueries(["posts"]);
    }
  })
  const { mutateAsync: manageLike } = useMutation({
    mutationFn: () => handlePostLikes(post),
    onSuccess: () => {
      queryClient.invalidateQueries(["posts"]);
    },
  });
  const handleLikeClick = () => {
    manageLike();
  };
  const handlePublishedButton = () =>{
    handleEdit()
  }
  return (
    <PostContainer classNames={classNames}>
      <div className="text-lg grow">
        <span className="font-bold">
          {title} - {author.username}
        </span>
      </div>
      <div>{content}</div>
      <div className="flex gap-1">
        {removeAbility ? (
          <>
            <Button classNames="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600" onClick={handleDeleteButton}>
              Delete post
            </Button>
            <Link to={`/panel/${post._id}`}>
              <Button classNames="bg-blue-500 border-blue-500 hover:bg-blue-600 hover:border-blue-600">
                Edit Post
              </Button>
            </Link>
            <Link to={`/panel/${post._id}/comments`}>
              <Button>Show Comments</Button>
            </Link>
            {post.is_published ? <Button onClick={handlePublishedButton} classNames="bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600">Published</Button> : <Button onClick={handlePublishedButton} classNames="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600">Not Published</Button>}
          </>
        ) : (
          <>
            <LikeComponent
              onClick={handleLikeClick}
              isLiked={userId && post.likes.includes(userId) ? true : false}
            />
            <div>{likes.length}</div>
            <StyledLink to={`${url}`}>Show More</StyledLink>
          </>
        )}
      </div>
    </PostContainer>
  );
}
export default Post;
