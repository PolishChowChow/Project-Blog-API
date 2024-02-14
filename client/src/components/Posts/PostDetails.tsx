import { useParams } from "react-router-dom";
import { ExtendedPostProps } from "../../types/PostProps";
import PostContainer from "./PostContainer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { AxiosError } from "axios";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
import LikeComponent from "../LikeComponent";
import CommentsSection from "../Comments/CommentsSection";
import useApiContext from "../../context/useApiContext";
import getCookiesData from "../../functions/getCookiesData";
function PostDetails() {
  const { postId } = useParams();
  const { getSpecificPost, handlePostLikes } = useApiContext();
  const { userId } = getCookiesData()
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<ExtendedPostProps, AxiosError>({
    queryFn: () => getSpecificPost(postId),
    queryKey: [`posts/${postId}`],
  });

  const queryClient = useQueryClient();
  const { mutateAsync: manageLike } = useMutation({
    mutationFn: () => handlePostLikes(post),
    onSuccess: () => {
      queryClient.invalidateQueries([`posts/${postId}`]);
    },
  });
  const handleLikeClick = () => {
    manageLike();
  };

  if (post === undefined) {
    return <ErrorMessage>Post not founded</ErrorMessage>;
  }
  return (
    <PostContainer classNames="mt-9">
      <div className="flex">
        <div>
          {post.title} - {post.author.username}
        </div>
        <div className="grow text-left">{post.createdAt.toLocaleString()}</div>
      </div>
      <div>{post.content}</div>
      <div className="flex gap-1">
        <LikeComponent
          onClick={handleLikeClick}
          isLiked={userId && post.likes.includes(userId) ? true : false}
        />
        <div>{post.likes.length}</div>
      </div>
      {isLoading && <LoadingCircle />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <CommentsSection postId={post._id} />
    </PostContainer>
  );
}
export default PostDetails;
