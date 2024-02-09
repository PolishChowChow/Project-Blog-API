import { ChangeEvent, FormEvent, useState } from "react";
import FormContainer from "./FormContainer";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";
import FormHeader from "./FormHeader";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import getCookiesData from "../../functions/getCookiesData";

function CommentForm() {
  const { id, commentId } = useParams();
  const { token, userId } = getCookiesData()
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const query = useQuery({
    queryFn: async() => {
        const response = await axios.get(`http://localhost:5000/blog/posts/${id}/comments/${commentId}`)
        return response.data.comment
    },
    queryKey: ["comment", commentId],
    onSuccess: (data) => {
        setComment(() =>{
            if(data === undefined){
                return ""
            }
            return data.content;
        })
    }
  });

  const {mutateAsync: handleCommentEdit} = useMutation({
    mutationFn: async() => {
        const response = await axios.put(`http://localhost:5000/blog/posts/${id}/comments/${commentId}`,{
            content: comment
        },
        {
            headers: {
                Authorization: `Bearer ${token}`,
                userId: userId
              },
        })
        return response
    },
    onSuccess: () => {
        navigate(`/panel/${id}/comments`)
    }
  })
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommentEdit()
  };
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>Edit Comment</FormHeader>
      <TextAreaField
        id="comment"
        value={comment}
        onChange={handleCommentChange}
      />
      <SubmitButton>Save changes</SubmitButton>
    </FormContainer>
  );
}
export default CommentForm;
