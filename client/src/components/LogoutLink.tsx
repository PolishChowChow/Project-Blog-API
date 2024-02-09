import { useNavigate } from "react-router-dom"
import removeCookiesData from "../functions/removeCookiesData"
import { useQueryClient } from "react-query"
function LogoutLink(){
    const client = useQueryClient()
    const navigate = useNavigate()
    const handleClick = async() =>{
        removeCookiesData()
        navigate("/")
        client.invalidateQueries(["posts"])
    }
    return <button onClick={handleClick} className="hover:text-gray-100 hover:underline">Logout</button>
}
export default LogoutLink