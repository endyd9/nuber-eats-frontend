interface MenuProps {
  description: string;
  name: string;
  price: number;
  photo: string;
}

export const Menu: React.FC<MenuProps> = ({
  name,
  description,
  price,
  photo,
}) => {
  console.log(photo);

  return (
    <div className="cursor-default pt-5 pb-3 px-8 border hover:border-gray-800 transition-all flex justify-between relative">
      <div>
        <div className="mb-5 w-[90%]">
          <h2 className="text-lg font-bold">{name}</h2>
          <p className="font-light">{description}</p>
        </div>
        <span>₩ {price}</span>
      </div>
      {photo !== null && (
        <img src={photo} alt="음식사진" className="w-24 h-24" />
      )}
    </div>
  );
};
