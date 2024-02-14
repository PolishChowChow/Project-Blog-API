import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import { CommentType } from "../../types/CommentProps";
import ErrorMessage from "../StateShowing/ErrorMessage";
import FormHeader from "../Form/FormHeader";
import useApiContext from "../../context/useApiContext";
function CommentsForPanel(){
    const { postId } = useParams();
    const { getAllComments } = useApiContext()
    const {data: comments} = useQuery<CommentType[]>({
        queryFn: () => getAllComments(postId),
        queryKey:[`post/${postId}/comments`]
    })
    if(comments === undefined) return <ErrorMessage>No comments founded</ErrorMessage>
    if(comments.length === 0) return <FormHeader classNames="m-5">No Comments Founded</FormHeader>
    return <CommentsList comments={comments} role="edit"/>
}
export default CommentsForPanel