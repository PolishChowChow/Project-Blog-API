import Cookies from "js-cookie"
function getCookiesData(){
    const token = Cookies.get("token")
    const userId = Cookies.get("userId")
    return { token, userId }
}
export default getCookiesData