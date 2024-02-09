import ComponentProps from "../../types/ComponentProps";

function SubmitButton({ classNames, children }: ComponentProps) {
  return (
    <button
      type="submit"
      className={`p-2 border-2 border-gray-100 rounded-md hover:bg-gray-100 hover:text-neutral-900 transition-colors ${classNames}`}
    >
      {children}
    </button>
  );
}
export default SubmitButton;
