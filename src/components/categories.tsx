import { Link } from "react-router-dom";

interface CategoryProps {
  id: number;
  coverImg: string;
  name: string;
  slug: string;
}

export const Categories: React.FC<CategoryProps> = ({
  coverImg,
  name,
  slug,
}) => {
  return (
    <Link to={`/category/${slug}`}>
      <div className="flex flex-col items-center group">
        <div className="w-20 h-20 rounded-full group-hover:bg-gray-200 flex items-center justify-center">
          <img src={coverImg} alt={name} className="w-14 h-14" />
        </div>
        <span className="text-sm mt-1 font-bold">{name}</span>
      </div>
    </Link>
  );
};
