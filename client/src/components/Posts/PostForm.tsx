import { ChangeEvent, FormEvent, useState } from "react";
import FormContainer from "../Form/FormContainer";
import FormHeader from "../Form/FormHeader";
import InputField from "../Form/InputField";
import TextAreaField from "../Form/TextAreaField";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../Form/SubmitButton";
import { useMutation, useQuery } from "react-query";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
import { PostProps } from "../../types/PostProps";
import setProperError from "../../functions/setProperError";
import useApiContext from "../../context/useApiContext";
type postFormProps = {
  role?: string;
};
const emptyFormData: PostProps = {
  title: "",
  content: "",
};

function PostForm({ role = "create" }: postFormProps) {
  const { postId } = useParams();
  const navigate = useNavigate();
  const {
    getPostDataToModify: prefetchEditedPost,
    createPost,
    editPost,
  } = useApiContext();

  const { error: fetchError, isLoading: fetchLoading } = useQuery<PostProps, AxiosError>({
    queryKey: ["post", postId],
    queryFn: () => prefetchEditedPost(postId),
    enabled: role === "edit",
    onSuccess: (data) => {
      setFormData(data || emptyFormData);
    },
    onError: (error) => {
      error.message = setProperError(error);
    },
  });

  const {
    mutateAsync: handlePostCreate,
    isLoading: isCreateLoading,
    error: createError,
  } = useMutation<AxiosResponse, AxiosError, PostProps, PostProps>({
    mutationFn: () => createPost(formData),
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) => {
      error.message = setProperError(error);
    },
  });
  const {
    mutateAsync: handleEditPost,
    isLoading: isEditLoading,
    error: editError,
  } = useMutation<AxiosResponse<PostProps, string>, AxiosError, PostProps>({
    mutationFn: () => editPost(formData, postId),
    onSuccess: () => {
      navigate("/panel");
    },
    onError: (error: AxiosError) => {
      error.message = setProperError(error);
    },
  });

  const [formData, setFormData] = useState(emptyFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log(role)
    if (role === "edit") {
      await handleEditPost(formData);
      navigate("/panel");
    } else {
      await handlePostCreate(formData);
      navigate("/");
    }
  };
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.id]: e.target.value,
      };
    });
  };
  if(fetchLoading) return <LoadingCircle />
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>Create a new Post</FormHeader>
      <InputField
        id="title"
        onChange={handleInputChange}
        value={formData.title}
      />
      <TextAreaField
        id="content"
        onChange={handleInputChange}
        value={formData.content}
      />
      {(isEditLoading || isCreateLoading) ? <LoadingCircle /> : <SubmitButton classNames="w-full">
        {role === "edit" ? "Save Changes" : "Add a post"}
      </SubmitButton>}

      {createError && <ErrorMessage>{createError.message}</ErrorMessage>}
      {editError && <ErrorMessage>{editError.message}</ErrorMessage>}
      {fetchError && <ErrorMessage>{fetchError.message}</ErrorMessage>}
    </FormContainer>
  );
}
export default PostForm;
