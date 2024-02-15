import { ChangeEvent, FormEvent, useState } from "react";
import InputField from "./InputField";
import { AxiosError, AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
import FormContainer from "./FormContainer";
import FormHeader from "./FormHeader";
import { useMutation } from "react-query";
import LoadingCircle from "../StateShowing/LoadingCircle";
import ErrorMessage from "../StateShowing/ErrorMessage";
import SubmitButton from "./SubmitButton";
import setProperError from "../../functions/setProperError";
import { LoginData } from "../../types/LoginTypes";
import useApiContext from "../../context/useApiContext";


const defaultData: LoginData = {
  username: "",
  password: "",
};



function LoginForm() {
  const [loginData, setLoginData] = useState<LoginData>(defaultData);
  const navigate = useNavigate()
  const {handleLogin} = useApiContext()
  const {mutateAsync: handleLoginAction, error, isLoading} = useMutation<AxiosResponse,AxiosError>({
    mutationFn: () => handleLogin(loginData),
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
    await handleLoginAction()
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
      {isLoading ? <LoadingCircle /> : <SubmitButton classNames="w-full">Login</SubmitButton>}
      {error &&  <ErrorMessage>{error.message}</ErrorMessage>}
    </FormContainer>
    
  );
}
export default LoginForm;
