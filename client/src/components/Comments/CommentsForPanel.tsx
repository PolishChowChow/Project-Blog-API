import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import axios from "axios";
import { CommentType } from "../../types/CommentProps";
import ErrorMessage from "../StateShowing/ErrorMessage";
import FormHeader from "../Form/FormHeader";
function CommentsForPanel(){
    const { postId } = useParams();
    const {data: comments} = useQuery<CommentType[]>({
        queryFn: async() => {
            const response = await axios.get(`http://localhost:5000/blog/posts/${postId}/comments`)
            return response.data.comments
        },
        queryKey:[`post/${postId}/comments`]
    })
    if(comments === undefined) return <ErrorMessage>No comments founded</ErrorMessage>
    if(comments.length === 0) return <FormHeader classNames="m-5">No Comments Founded</FormHeader>
    return <CommentsList comments={comments} role="edit"/>
}
export default CommentsForPanel