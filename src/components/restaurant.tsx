import { Link } from "react-router-dom";

interface ReastaurantProps {
  id: number;
  coverImg?: string | undefined;
  name: string;
  categoryName: string;
  isPromoted?: boolean | undefined;
  isSearch?: boolean | undefined;
}

export const Restaurant: React.FC<ReastaurantProps> = ({
  id,
  coverImg,
  name,
  categoryName,
  isPromoted,
  isSearch,
}) => {
  if (isSearch === true) {
    return (
      <Link to={`/restaurant/${id}`}>
        <div className="" role="restaurant">
          <div className="h-56 w-full mb-3 bg-red-100 overflow-hidden flex items-start">
            <img
              src={coverImg}
              className="mb-24 hover:scale-110 transition-transform min-w-full min-h-full"
            />
          </div>
          <h3 className="text-lg font-medium">{name}</h3>
          <hr className="my-2 border-gray-300" />
          <span className="text-sm text-gray-400">{categoryName}</span>
        </div>
      </Link>
    );
  } else {
    return isPromoted === true ? (
      <Link to={`/restaurant/${id}`}>
        <div className="" role="restaurant">
          <div className="h-56 w-full mb-3 bg-red-100 overflow-hidden flex items-start">
            <img
              src={coverImg}
              className="mb-24 hover:scale-110 transition-transform min-w-full min-h-full"
            />
          </div>
          <h3 className="text-lg font-medium">{name}</h3>
          <hr className="my-2 border-gray-300" />
          <span className="text-sm text-gray-400">{categoryName}</span>
        </div>
      </Link>
    ) : null;
  }
};
