import { ChangeEvent, FormEvent, useState } from "react";
import FormContainer from "./FormContainer";
import FormHeader from "./FormHeader";
import InputField from "./InputField";
import SubmitButton from "./SubmitButton";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { AxiosError, AxiosResponse } from "axios";
import LoadingCircle from "../StateShowing/LoadingCircle";
import ErrorMessage from "../StateShowing/ErrorMessage";
import setProperError from "../../functions/setProperError";
import { formDataType } from "../../types/LoginTypes";
import useApiContext from "../../context/useApiContext";

const emptyFormData: formDataType = {
  first_name: "",
  last_name: "",
  username: "",
  password: "",
  confirm_password: "",
};
function RegisterForm() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<formDataType>(emptyFormData);
  const { handleRegister } = useApiContext();
  const {
    mutateAsync: performRegister,
    error,
    isLoading,
  } = useMutation<AxiosResponse, AxiosError>({
    mutationFn: () => handleRegister(formData),
    onSuccess: () => {
      setFormData(emptyFormData);
      navigate("/");
    },
    onError: (error) => {
      error.message = setProperError(error);
    },
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prevFormData) => {
      return {
        ...prevFormData,
        [e.target.id]: e.target.value,
      };
    });
  };
  const handleSubmit = (e: FormEvent) => {
    console.log(formData);
    e.preventDefault();
    performRegister();
  };
  return (
    <FormContainer onSubmit={handleSubmit}>
      <FormHeader>Give me your data!</FormHeader>
      <InputField
        id="first_name"
        value={formData.first_name}
        onChange={handleChange}
      />
      <InputField
        id="last_name"
        value={formData.last_name}
        onChange={handleChange}
      />
      <InputField
        id="username"
        value={formData.username}
        onChange={handleChange}
      />
      <InputField
        type="password"
        id="password"
        value={formData.password}
        onChange={handleChange}
      />
      <InputField
        type="password"
        id="confirm_password"
        value={formData.confirm_password}
        onChange={handleChange}
      />
      {isLoading ? <LoadingCircle /> : <SubmitButton classNames="w-full">Register</SubmitButton>}
      {error && <ErrorMessage />}
    </FormContainer>
  );
}
export default RegisterForm;
