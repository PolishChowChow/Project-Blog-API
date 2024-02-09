import { AxiosError } from "axios";

function setProperError(error: AxiosError) {
  if (error.response) {
    const status = error.response.status;
    switch (status) {
      case 401:
        return "Unauthorized. Please Log in.";
      case 404:
        return "404 problem with resource. Please try again later";
      case 422:
        return "Invalid data, try again."
      case 500:
        return "Internal Server Error. Please try again later";
      default:
        return `unexpected error with status code ${status}. Try again later`;
    }
  }
  return error.message
}
export default setProperError;
