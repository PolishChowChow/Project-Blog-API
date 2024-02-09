import Cookies from "js-cookie"
function removeCookiesData(){
    Cookies.remove("token")
    Cookies.remove("userId")
}
export default removeCookiesData