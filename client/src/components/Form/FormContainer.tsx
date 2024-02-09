import { FormEvent } from "react"
import ComponentProps from "../../types/ComponentProps"
type FormContainerProps = {
    onSubmit: (e:FormEvent) => void
}
function FormContainer({children, onSubmit, classNames}:ComponentProps & FormContainerProps){
    return <form
    onSubmit={onSubmit}
    className={`bg-neutral-900 py-8 px-10 max-w-fit mx-auto flex items-center flex-col gap-5 mt-32 rounded-lg ${classNames}`}
  >
    {children}
  </form>
}
export default FormContainer