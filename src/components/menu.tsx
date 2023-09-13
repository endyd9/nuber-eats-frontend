interface MenuProps {
  description: string;
  name: string;
  price: number;
}

export const Menu: React.FC<MenuProps> = ({ name, description, price }) => {
  return (
    <div className="pt-5 pb-3 px-8 border hover:border-gray-800 transition-all">
      <div className="mb-5">
        <h2 className="text-lg font-bold">{name}</h2>
        <span className="font-light">{description}</span>
      </div>
      <span>₩ {price}</span>
    </div>
  );
};
