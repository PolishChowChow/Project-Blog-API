import { IoHeart } from "react-icons/io5";
import { IoMdHeartEmpty } from "react-icons/io";
type LikeComponentProps = {
  isLiked?: boolean;
  onClick: () => void;
};
function LikeComponent({ isLiked = false, onClick }: LikeComponentProps) {
  return (
    <button
      className="flex justify-center items-center hover:cursor-pointer"
      onClick={onClick}
    >
      {isLiked ? <IoHeart className="text-red-500" /> : <IoMdHeartEmpty />}
    </button>
  );
}
export default LikeComponent;
