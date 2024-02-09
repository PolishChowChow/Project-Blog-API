import Cookies from "js-cookie";
function setCookies(token: string, userId: string){
    Cookies.set("token", token, {
        sameSite: "None",
        expires: 1,
        secure: true,
      });
      Cookies.set("userId", userId, {
        sameSite: "None",
        expires: 1,
        secure: true,
      })
}
export default setCookies