import Header from "../components/Header"
import Footer from "../components/Footer"
import useCheckForToken from "../hooks/useCheckForToken"
import MainContainer from "../components/PageLayout/MainContainer"
import FormHeader from "../components/Form/FormHeader"

function ErrorPage(){
    useCheckForToken()
    return <>
        <Header />
        <MainContainer>
            <FormHeader classNames="mt-9">Some error occured, it happeds., check links in the navbar in order to escape this page.</FormHeader>
        </MainContainer>
        <Footer />
    </>
}
export default ErrorPage