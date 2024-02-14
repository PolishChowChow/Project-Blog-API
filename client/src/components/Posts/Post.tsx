
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
  const { _id, title, author, content, likes, url } = post;
  const { userId } = getCookiesData();
  const { handlePostLikes, deletePost, handlePublishedPosts } = useApiContext()
  const queryClient = useQueryClient();
  const { mutateAsync: manageDelete } = useMutation({
    mutationFn: () => deletePost(_id),
    onSuccess: () =>{
      queryClient.invalidateQueries(["posts"]);
    }
  })
  const {mutateAsync: handleEdit} = useMutation({
    mutationFn: () => handlePublishedPosts(post),
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
            <Button classNames="bg-red-500 border-red-500 hover:bg-red-600 hover:border-red-600" onClick={manageDelete}>
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
            {post.is_published ? <Button onClick={handleEdit} classNames="bg-green-500 border-green-500 hover:bg-green-600 hover:border-green-600">Published</Button> : <Button onClick={handleEdit} classNames="bg-yellow-500 border-yellow-500 hover:bg-yellow-600 hover:border-yellow-600">Not Published</Button>}
          </>
        ) : (
          <>
            <LikeComponent
              onClick={manageLike}
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
