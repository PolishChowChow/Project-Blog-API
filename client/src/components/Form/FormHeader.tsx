import ComponentProps from "../../types/ComponentProps"
function FormHeader({children, classNames}:ComponentProps){
    return <h2 className={`text-2xl text-center ${classNames}`}>{children}</h2>
}
export default FormHeader