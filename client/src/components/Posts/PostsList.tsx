import { useQuery } from "react-query";
import Post from "./Post";
import axios, { AxiosResponse, AxiosError } from "axios";
import { PostListType } from "../../types/PostProps";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
type PostListProps = {
  admin?: boolean
}
function PostsList({admin = false}:PostListProps) {
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<AxiosResponse<unknown, unknown>, AxiosError, PostListType>({
    queryFn: async () => {
      const url = admin ? "http://localhost:5000/blog/posts_all" : "http://localhost:5000/blog/posts"
      const response = await axios.get(url);
      return response.data.posts;
    },
    queryKey: ["posts"],
    onError: (error) => {
      if (error.isAxiosError && error.response) {
        const status = error.response.status;
        switch (status) {
          case 401:
            error.message = "Unauthorized. Please Log in.";
            break;
          case 404:
            error.message = "404 problem with resource. Please try again later";
            break;
          case 500:
            error.message = "Internal Server Error. Please try again later";
            break;
          default:
            error.message ==
              `unexpected error with status code ${status}. Try again later`;
        }
      }
    },
  });

  return (
    <div className="flex flex-col gap-3 my-5">
      {isLoading && <LoadingCircle />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {posts &&
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              post={post}
              classNames="hover:bg-neutral-950"
              removeAbility={admin}
            />
          );
        })}
    </div>
  );
}
export default PostsList;
