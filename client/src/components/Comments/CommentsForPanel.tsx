import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import { CommentType } from "../../types/CommentProps";
import ErrorMessage from "../StateShowing/ErrorMessage";
import useApiContext from "../../context/useApiContext";
import { AxiosError } from "axios";
import setProperError from "../../functions/setProperError";
import LoadingCircle from "../StateShowing/LoadingCircle";
function CommentsForPanel() {
  const { postId } = useParams();
  const { getAllComments } = useApiContext();
  const { data: comments, error, isLoading } = useQuery<CommentType[], AxiosError>({
    queryFn: () => getAllComments(postId),
    queryKey: [`post/${postId}/comments`],
    onError: (error) => {
        error.message = setProperError(error)
    }
  });
  if(isLoading) return <LoadingCircle />
  if(error) return <ErrorMessage>{error.message}</ErrorMessage>
  return comments === undefined || comments.length === 0 ? (
    <ErrorMessage>No comments founded</ErrorMessage>
  ) : (
    <CommentsList comments={comments} role="edit" />
  );
}
export default CommentsForPanel;
