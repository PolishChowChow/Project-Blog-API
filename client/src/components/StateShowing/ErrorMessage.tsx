import ComponentProps from "../../types/ComponentProps";

function ErrorMessage({ children, classNames }: ComponentProps) {
  return <div className={`text-red-200 text-lg ${classNames}`}>{children}</div>;
}
export default ErrorMessage;
