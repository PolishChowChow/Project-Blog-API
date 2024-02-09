import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
function useCheckForToken() {
  const navigate = useNavigate();
  useEffect(() => {
    const url = window.location.href;
    const urlProvidesToLoginOrRegister =
      url.endsWith("login") || url.endsWith("register");
    if (Cookies.get("token") !== undefined && urlProvidesToLoginOrRegister) {
      navigate("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
export default useCheckForToken;
