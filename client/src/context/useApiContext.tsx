import { useContext } from "react"
import { ApiContext } from "./apiContext"

export default function useApiContext(){
    const context = useContext(ApiContext)
    if(!context){
        throw new Error("Context useApiContext must be used in a Provider called ApiContextProvider")
    }
    return context  
}
