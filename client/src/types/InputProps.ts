import { ChangeEvent } from "react";
export type InputTypeTextProps = InputProps &  {
    onChange: (e:ChangeEvent<HTMLInputElement>) => void,
    type?: string,
}
export type TextAreaProps = InputProps &  {
    onChange: (e:ChangeEvent<HTMLTextAreaElement>) => void,
}
type InputProps = {
    id: string,
    value: string,
    classNames?: string,
}
