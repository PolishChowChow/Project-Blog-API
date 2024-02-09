import { ChangeEvent, FormEvent, useState } from "react";
import FormContainer from "../Form/FormContainer";
import FormHeader from "../Form/FormHeader";
import InputField from "../Form/InputField";
import TextAreaField from "../Form/TextAreaField";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate, useParams } from "react-router-dom";
import SubmitButton from "../Form/SubmitButton";
import {  useMutation, useQuery } from "react-query";
import ErrorMessage from "../StateShowing/ErrorMessage";
import LoadingCircle from "../StateShowing/LoadingCircle";
import {  PostProps } from "../../types/PostProps";
import setProperError from "../../functions/setProperError";
import getCookiesData from "../../functions/getCookiesData";
type postFormProps = {
  role?: string
}
const emptyFormData:PostProps = {
  title:"",
  content:""
}
const handlePostCreateFn = async (formData: PostProps) => {
  const {token, userId} = getCookiesData()
  if (!token) {
    throw new Error("access denied, no token");
  } else {
    const response = await axios.post(
      "http://localhost:5000/blog/posts",
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          userId: userId
        },
      }
    );
    return response;
  }
};




function PostForm({role="create"}:postFormProps) {



  
  const { id:postId } = useParams()
  const navigate = useNavigate();

  const prefetchEditedPost = async() => {
    const response = await axios.get(`http://localhost:5000/blog/posts/${postId}`)
    const returnedPost:PostProps = {
        title: response.data.post.title,
        content: response.data.post.content
      }
    return returnedPost
  }



  const { error: fetchError } = useQuery<PostProps, AxiosError>({
    queryKey: ["post", postId],
    queryFn: prefetchEditedPost,
    enabled: role === "edit", 
    onSuccess: (data) => {
      setFormData(data || emptyFormData); 
    },
    onError: (error) => {
      error.message = setProperError(error);
    },
  });


  const handlePostEditFn = async (formData: PostProps) => {
    const {token, userId} = getCookiesData()
    if (!token) {
      throw new Error("access denied, no token");
    } else {
      const response = await axios.put(
        `http://localhost:5000/blog/posts/${postId}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId
          },
        }
      );
      return response;
    }
  }

  const {
    mutateAsync: handlePostCreate,
    isLoading,
    error,
  } = useMutation<AxiosResponse<unknown, unknown>, AxiosError, PostProps, PostProps>({
    mutationFn: handlePostCreateFn,
    onSuccess: () => {
      navigate("/");
    },
    onError: (error) =>{
        error.message = setProperError(error)
    }
  });
  const { mutateAsync: handleEditPost, isLoading: isEditLoading, error: editError } = useMutation<AxiosResponse<PostProps, string>, AxiosError, PostProps>(
    {
      mutationFn: handlePostEditFn, 
      onSuccess: () => {
        navigate("/panel");
      },
      onError: (error: AxiosError) => {
        error.message = setProperError(error);
      }
    }
  );
  

  const [formData, setFormData] = useState(emptyFormData);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if(role === "edit"){
      await handleEditPost(formData)
      navigate("/panel")
    }
    else{
      await handlePostCreate(formData);
      navigate("/")
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
      <SubmitButton classNames="w-full">{role === "edit" ? "Save Changes" : "Add a post"}</SubmitButton>
      {error && <ErrorMessage>{error.message}</ErrorMessage>}
      {isLoading && <LoadingCircle />}
      {editError && <ErrorMessage>{editError.message}</ErrorMessage>}
      {isEditLoading && <LoadingCircle />}
      {fetchError && <ErrorMessage>{fetchError.message}</ErrorMessage>}
    </FormContainer>
  );
}
export default PostForm;
