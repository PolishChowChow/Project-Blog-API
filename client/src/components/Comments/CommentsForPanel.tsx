import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import CommentsList from "./CommentsList";
import axios from "axios";
import { CommentType } from "../../types/CommentProps";
import ErrorMessage from "../StateShowing/ErrorMessage";
function CommentsForPanel(){
    const { id } = useParams();
    const {data: comments} = useQuery<CommentType[]>({
        queryFn: async() => {
            const response = await axios.get(`http://localhost:5000/blog/posts/${id}/comments`)
            return response.data.comments
        },
        queryKey:[`post/${id}/comments`]
    })
    if(comments === undefined) return <ErrorMessage>No comments founded</ErrorMessage>
    return <CommentsList comments={comments} role="edit"/>
}
export default CommentsForPanel