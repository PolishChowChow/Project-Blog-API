import ComponentProps from "../../types/ComponentProps"

function MainContainer({children, classNames}:ComponentProps){
    return <main className={`grow mx-auto w-4/5 ${classNames}`}>{children}</main>
}
export default MainContainer