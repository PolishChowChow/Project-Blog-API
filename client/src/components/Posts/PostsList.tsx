import { useQuery } from "react-query";
import Post from "./Post";
import { AxiosError } from "axios";
import { ExtendedPostProps } from "../../types/PostProps";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
import useApiContext from "../../context/useApiContext";
import setProperError from "../../functions/setProperError";
import FormHeader from "../Form/FormHeader";
type PostListProps = {
  admin?: boolean;
};
function PostsList({ admin = false }: PostListProps) {
  const { getPostsBasedOnAccess } = useApiContext();
  const {
    data: posts,
    error,
    isLoading,
  } = useQuery<ExtendedPostProps[], AxiosError, ExtendedPostProps[]>({
    queryFn: () => getPostsBasedOnAccess(admin),
    queryKey: ["posts"],
    onError: (error) => {
      error.message = setProperError(error);
    },
  });

  return (
    <div className="flex flex-col gap-3 my-5">
      {isLoading && <LoadingCircle />}
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {posts === undefined || posts.length === 0 ? (
        <FormHeader classNames="m-5">
          There are no posts right here. Maybe it's time to create some?
        </FormHeader>
      ) : (
        posts.map((post) => {
          return (
            <Post
              key={post._id}
              post={post}
              classNames="hover:bg-neutral-950"
              removeAbility={admin}
            />
          );
        })
      )}
    </div>
  );
}
export default PostsList;
