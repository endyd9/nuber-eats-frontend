import { Link } from "react-router-dom";

interface ReastaurantProps {
  id: number;
  coverImg?: string | undefined;
  name: string;
  categoryName: string;
}

export const Restaurant: React.FC<ReastaurantProps> = ({
  coverImg,
  name,
  categoryName,
}) => (
  <Link to={"/"}>
    <div className="">
      <div className="h-56 w-full mb-3 bg-red-100 overflow-hidden flex items-start">
        <img src={coverImg} className="mb-24" />
      </div>
      <h3 className="text-lg font-medium">{name}</h3>
      <hr className="my-2 border-gray-300" />
      <span className="text-sm text-gray-400">{categoryName}</span>
    </div>
  </Link>
);
