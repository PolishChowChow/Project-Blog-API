import { InputTypeTextProps } from "../../types/InputProps";
import setTitleCase from "../../functions/setTitleCase";

function InputField({ value, onChange, id, classNames, type="text" }: InputTypeTextProps) {
    const placeholder = setTitleCase(id)
  return (
      <input
        type={type}
        id={id}
        className={`border-b-2 border-gray-300 bg-transparent p-3 text-gray-300 outline-none block w-full ${classNames}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
  );
}
export default InputField;
