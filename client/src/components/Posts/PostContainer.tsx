import ComponentProps from "../../types/ComponentProps";

function PostContainer({ children, classNames }: ComponentProps) {
  return (
    <div
      className={`border-neutral-500 border-b-2 bg-neutral-900 p-7 rounded-md flex flex-col gap-2 ${classNames}`}
    >
      {children}
    </div>
  );
}
export default PostContainer;
