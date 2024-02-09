import axios, { AxiosError, AxiosResponse } from "axios";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { CommentType } from "../../types/CommentProps";
import setProperError from "../../functions/setProperError";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
import CommentsList from "./CommentsList";
import { FormEvent, useState } from "react";
import SubmitButton from "../Form/SubmitButton";
import TextAreaField from "../Form/TextAreaField";
import getCookiesData from "../../functions/getCookiesData";

type CommentsListProps = {
  postId: string;
};

function CommentsSection({ postId }: CommentsListProps) {
  const queryClient = useQueryClient();
  const [content, setContent] = useState("");
  const { token, userId } = getCookiesData();

  const createNewComment = async () => {
    console.log(content);
    const response = await axios.post(
      `http://localhost:5000/blog/posts/${postId}/comments`,
      {
        content: content,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId,
        },
      }
    );
    return response;
  };

  const {
    data: comments,
    error,
    isLoading,
  } = useQuery<CommentType[], AxiosError>({
    queryFn: async () => {
      const response = await axios.get(
        `http://localhost:5000/blog/posts/${postId}/comments`
      );
      return response.data.comments;
    },
    queryKey: [`post/${postId}/comments`],
    onError: (error) => {
      error.message = setProperError(error);
    },
  });

  const { mutateAsync: addComment, error: addCommentError } = useMutation<
    AxiosResponse,
    AxiosError
  >({
    mutationFn: createNewComment,
    onSuccess: () => {
      queryClient.invalidateQueries([`post/${postId}/comments`]);
    },
    onError: (addCommentError) => {
      addCommentError.message = setProperError(addCommentError);
    },
  });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addComment();
    console.log("after adding");
    setContent("");
  };

  if (!token) {
    return (
      <ErrorMessage>
        Access denied, login in order to create comments.
      </ErrorMessage>
    );
  }
  if (error || comments === undefined) {
    return <ErrorMessage>{error?.message}</ErrorMessage>;
  }

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <TextAreaField
          id="Add a comment"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          classNames="w-full"
        ></TextAreaField>
        <div>
          <ErrorMessage>{addCommentError?.message}</ErrorMessage>
          <SubmitButton>Add a comment</SubmitButton>
        </div>
      </form>
      <CommentsList comments={comments} />
      {isLoading && <LoadingCircle />}
    </div>
  );
}

export default CommentsSection;
