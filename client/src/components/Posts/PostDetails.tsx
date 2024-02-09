import { useParams } from "react-router-dom";
import { ExtendedPostProps, like } from "../../types/PostProps";
import PostContainer from "./PostContainer";
import { useMutation, useQuery, useQueryClient } from "react-query";
import axios, { AxiosError } from "axios";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
import LikeComponent from "../LikeComponent";
import CommentsSection from "../Comments/CommentsSection";
import getCookiesData from "../../functions/getCookiesData";
function PostDetails() {
  const { token, userId } = getCookiesData()
  const { id } = useParams();
  const {
    data: post,
    isLoading,
    error,
  } = useQuery<ExtendedPostProps, AxiosError>({
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/blog/posts/${id}`
      );
      return response.data.post;
    },
    queryKey: [`posts/${id}`]
  });

  const handleLikes = async () => {
    let newLikesList: like[] = [];
    if(post === undefined){
      throw new Error("Could not get this post data.")
    }
    else{
      if (userId && post.likes.includes(userId)) {
        newLikesList = post.likes.filter((like) => {
          return like !== userId;
        });
      } else if (userId) {
        newLikesList = [...post.likes, userId];
      }
      const response = await axios.put(
        `http://localhost:5000/blog/posts/${post._id}`,
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
    }
  };

  const queryClient = useQueryClient();
  const { mutateAsync: manageLike } = useMutation({
    mutationFn: handleLikes,
    onSuccess: () => {
      queryClient.invalidateQueries([`posts/${id}`]);
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
        <LikeComponent onClick={handleLikeClick} isLiked={userId && post.likes.includes(userId) ? true : false} />
        <div>{post.likes.length}</div>
      </div>
      {isLoading && <LoadingCircle />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      <CommentsSection postId={post._id} />
    </PostContainer>
  );
}
export default PostDetails;