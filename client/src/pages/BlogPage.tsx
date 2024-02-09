import Header from "../components/Header"
import Footer from "../components/Footer"
import { Outlet } from "react-router-dom"
import useCheckForToken from "../hooks/useCheckForToken"

function BlogPage(){
    useCheckForToken()
    return <>
        <Header />
        <main className="grow mx-auto w-4/5"> 
            <Outlet />
        </main>
        <Footer />
    </>
}
export default BlogPage