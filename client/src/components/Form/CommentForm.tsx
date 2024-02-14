import { ChangeEvent, FormEvent, useState } from "react";
import FormContainer from "./FormContainer";
import TextAreaField from "./TextAreaField";
import SubmitButton from "./SubmitButton";
import FormHeader from "./FormHeader";
import { useMutation, useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import useApiContext from "../../context/useApiContext";
import LoadingCircle from "../StateShowing/LoadingCircle";
import setProperError from "../../functions/setProperError";
import ErrorMessage from "../StateShowing/ErrorMessage";
import { CommentType } from "../../types/CommentProps";

function CommentForm() {
  const { postId, commentId } = useParams();
  const { getSpecificComment, editComment } = useApiContext();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const { error: getRequestError, isLoading: isLoadingGetRequest } = useQuery<CommentType,AxiosError>({
    queryFn: () => getSpecificComment(postId, commentId),
    queryKey: ["comment", commentId],
    onSuccess: (data) => {
      setComment(() => {
        if (data === undefined) {
          return "";
        }
        return data.content;
      });
    },
    onError: (error) => {
      error.message = setProperError(error)
    }
  });

  const { mutateAsync: handleCommentEdit, isLoading: isLoadingPutRequest, error: putRequestError } =
    useMutation<AxiosResponse, AxiosError>({
      mutationFn: () => editComment(postId, commentId, comment),
      onSuccess: () => {
        navigate(`/panel/${postId}/comments`);
      },
      onError: (error) => {
        error.message = setProperError(error)
      }
    });
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleCommentEdit();
  };
  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      {isLoadingGetRequest ? (
        <LoadingCircle />
      ) : (
        <>
          <FormHeader>Edit Comment</FormHeader>
          <TextAreaField
            id="comment"
            value={comment}
            onChange={handleCommentChange}
          />
        </>
      )}
      {isLoadingPutRequest ? (
        <LoadingCircle />
      ) : (
        <SubmitButton>Save changes</SubmitButton>
      )}
      {getRequestError && <ErrorMessage>{getRequestError.message}</ErrorMessage>}
      {putRequestError && <ErrorMessage>{putRequestError.message}</ErrorMessage>}
    </FormContainer>
  );
}
export default CommentForm;
