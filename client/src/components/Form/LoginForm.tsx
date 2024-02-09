import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import axios, { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import FormHeader from "./FormHeader";
import { useMutation } from "react-query";
import LoadingCircle from "../StateShowing/LoadingCircle";
import ErrorMessage from "../StateShowing/ErrorMessage";
import SubmitButton from "./SubmitButton";
import setProperError from "../../functions/setProperError";
import setCookies from "../../functions/setCookies";
type LoginData = {
  username: string;
  password: string;
};

const defaultData: LoginData = {
  username: "",
  password: "",
};



function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>(defaultData);
  const navigate = useNavigate()
  const {mutateAsync: handleLoginAction, error, isLoading} = useMutation<AxiosResponse,AxiosError>({
    mutationFn: async () => {
        const response = await axios.post("http://localhost:5000/login", loginData);
        const { token, userId }  = response.data;
        setCookies(token, userId)
        return response;
    },
    onSuccess: () =>{
      setLoginData(defaultData);
      navigate('/')
    },
    onError: (error) =>{
      error.message = setProperError(error)
    }
  })
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    handleLoginAction()
  };
  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prevLoginData) => {
      return {
        ...prevLoginData,
        [e.target.id]: e.target.value,
      };
    });
  };

  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>Login form</FormHeader>
      <InputField
        id="username"
        value={loginData.username}
        onChange={onChange}
      />
      <InputField
        id="password"
        value={loginData.password}
        onChange={onChange}
        type="password"
      />
      <SubmitButton classNames="w-full">Login</SubmitButton>
      {isLoading &&  <LoadingCircle />}
      {error &&  <ErrorMessage>{error.message}</ErrorMessage>}
    </FormContainer>
    
  );
}
export default LoginForm;
