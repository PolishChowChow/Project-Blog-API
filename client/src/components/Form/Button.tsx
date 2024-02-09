import ComponentProps from "../../types/ComponentProps";
type ButtonProps = {
  onClick?: () => void;
};
function Button({
  onClick = () => {},
  classNames,
  children,
}: ComponentProps & ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`text-sm text-gray-100 p-2 border-2 rounded-md transition-colors ${classNames}`}
    >
      {children}
    </button>
  );
}
export default Button;
