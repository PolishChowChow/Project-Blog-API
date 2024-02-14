import axios, { AxiosResponse } from "axios";
import { ReactNode, createContext } from "react";
import { ExtendedPostProps, PostProps, like } from "../types/PostProps";
import getCookiesData from "../functions/getCookiesData";
import setCookies from "../functions/setCookies";
import { LoginData, formDataType } from "../types/LoginTypes";
import { CommentType } from "../types/CommentProps";
type ApiContextProps = {
  children: ReactNode;
};
type ApiContext = {
  getPostsBasedOnAccess: (admin: boolean) => Promise<ExtendedPostProps[]>;
  getPostDataToModify: (postId: undefined | string) => Promise<PostProps>;
  createPost: (formData: PostProps) => Promise<AxiosResponse>;
  editPost: (formData: PostProps, postId: string|undefined) => Promise<AxiosResponse>
  getSpecificPost: (postId: string | undefined) => Promise<ExtendedPostProps>
  handlePostLikes: (post: ExtendedPostProps | undefined) => Promise<AxiosResponse>
  handleLogin: (loginData: LoginData) => Promise<AxiosResponse>
  handleRegister: (formData: formDataType) => Promise<AxiosResponse>
  getSpecificComment: (postId: string|undefined, commentId: string|undefined) => Promise<CommentType>
  editComment: (postId: string|undefined, commentId:string|undefined, comment: string) => Promise<AxiosResponse>
};
export const ApiContext = createContext<ApiContext | null>(null);

export default function ApiContextProvider({ children }: ApiContextProps) {

  const handleLogin = async (loginData:LoginData) => {
    const response = await axios.post("http://localhost:5000/login", loginData);
    const { token, userId }  = response.data;
    setCookies(token, userId)
    return response;
}
  const handleRegister =  async(formData: formDataType) => {
    const response = await axios.post("http://localhost:5000/signup",{
        ...formData
    })
    const {token, userId} = response.data;
    setCookies(token, userId)
    return response;
}
  const getPostsBasedOnAccess = async (admin: boolean) => {
    const url = admin
      ? "http://localhost:5000/blog/posts_all"
      : "http://localhost:5000/blog/posts";
    const response = await axios.get(url);
    return response.data.posts;
  };

  const getPostDataToModify = async (postId: undefined | string) => {
    const response = await axios.get(
      `http://localhost:5000/blog/posts/${postId}`
    );
    const returnedPost: PostProps = {
      title: response.data.post.title,
      content: response.data.post.content,
    };
    return returnedPost;
  };
  const createPost = async (formData: PostProps) => {
  const { token, userId } = getCookiesData();

    if (!token) {
      throw new Error("access denied, no token");
    } else {
      console.log("passed if check")

      const response = await axios.post(
        "http://localhost:5000/blog/posts",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );
      console.log(response)
      return response;
    }
  };

  const editPost = async (formData: PostProps, postId: string|undefined) => {
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
  const getSpecificPost = async (postId: string|undefined) => {
    const response = await axios.get(
      `http://localhost:5000/blog/posts/${postId}`
    );
    return response.data.post;
  }
  const handlePostLikes = async (post:ExtendedPostProps|undefined) => {
  const { token, userId } = getCookiesData();
    let newLikesList: like[] = [];
    if(post === undefined){
      throw new Error("Could not get this post data.")
    }
    else{
      if (userId && post.likes.includes(userId)) {
        newLikesList = post.likes.filter((like) => {
          return like !== userId;
        });
      } else if (userId) {
        newLikesList = [...post.likes, userId];
      }
      const response = await axios.put(
        `http://localhost:5000/blog/posts/${post._id}`,
        {
          likes: newLikesList,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            userId: userId,
          },
        }
      );
      return response;
    }
  };
  const getSpecificComment = async(postId: string|undefined, commentId:string|undefined) => {
    if(postId === undefined || commentId === undefined){
      throw Error("cannot get comment with undefined id either post or comment")
    }
    else{
      const response = await axios.get(`http://localhost:5000/blog/posts/${postId}/comments/${commentId}`)
      return response.data.comment
    }
  }
  const editComment = async(postId:string|undefined, commentId:string|undefined, comment:string) => {
    const { token, userId } = getCookiesData()
    const response = await axios.put(`http://localhost:5000/blog/posts/${postId}/comments/${commentId}`,{
        content: comment
    },
    {
        headers: {
            Authorization: `Bearer ${token}`,
            userId: userId
          },
    })
    return response
}

  return (
    <ApiContext.Provider
      value={{
        getPostsBasedOnAccess,
        getPostDataToModify,
        createPost,
        editPost,
        getSpecificPost,
        handlePostLikes,
        handleLogin,
        handleRegister,
        getSpecificComment,
        editComment,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
}
