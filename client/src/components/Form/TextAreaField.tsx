import { TextAreaProps } from "../../types/InputProps";
import setTitleCase from "../../functions/setTitleCase";

function TextAreaField({ value, onChange, id }: TextAreaProps) {
    const placeholder = setTitleCase(id)
  return (
      <textarea
        id={id}
        className="border-b-2 border-gray-300 bg-transparent p-3 text-gray-300 outline-none block w-full resize-none"
        placeholder={placeholder}
        rows={1}
        value={value}
        onChange={onChange}
      />
  );
}
export default TextAreaField;
