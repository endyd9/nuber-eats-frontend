interface DishOptionProps {
  isSelected: boolean;
  name: string;
  extra: number;
  addOptionToItem: (dishId: number, option: any) => void;
  dishId: number;
  removeOptionFromItem: (dishId: number, optionName: string) => void;
}

export const MenuOption: React.FC<DishOptionProps> = ({
  isSelected,
  name,
  extra = 0,
  addOptionToItem,
  dishId,
  removeOptionFromItem,
}) => {
  const onClick = () => {
    if (isSelected) {
      removeOptionFromItem(dishId, name);
    } else {
      addOptionToItem(dishId, {
        name,
        extra,
      });
    }
  };
  return (
    <span onClick={onClick} className="flex items-center justify-between">
      <h6 className={`${isSelected && "text-lime-400"} mr-2`}>{name}</h6>

      <h6 className={`${isSelected && "text-lime-400"} text-sm opacity-75`}>
        {extra} 원
      </h6>
    </span>
  );
};
