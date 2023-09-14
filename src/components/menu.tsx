import { DishOption } from "../gql/graphql";

interface MenuProps {
  id: number;
  description: string;
  name: string;
  price: number;
  photo: string;
  isCustomer?: boolean;
  options?: DishOption[];
  orderStarted?: boolean;
  manageItemToOrder?: (dishId: number) => void;
  isSelected?: boolean;
  children: React.ReactElement;
}

export const Menu: React.FC<MenuProps> = ({
  id = 0,
  name,
  description,
  price,
  photo,
  isCustomer = false,
  options,
  orderStarted = false,
  manageItemToOrder,
  isSelected,
  children,
}) => {
  return (
    <div
      className={`cursor-pointer pt-5 pb-3 px-8 transition-all flex justify-between items-center relative ${
        isSelected ? "bg-gray-200" : "border hover:border-gray-800"
      }`}
    >
      <div className="w-[70%]">
        <div className="mb-5">
          <h2 className="text-lg font-bold">
            {name}{" "}
            {orderStarted && (
              <button
                className={`px-5 py-1 ${
                  !isSelected ? "bg-lime-400" : "bg-red-400"
                }`}
                onClick={() =>
                  orderStarted && manageItemToOrder
                    ? manageItemToOrder(id)
                    : null
                }
              >
                {isSelected ? "취소" : "담기"}
              </button>
            )}
          </h2>
          <p className="font-light">{description}</p>
        </div>
        <span>₩ {price}</span>
        {isCustomer && options && options?.length !== 0 && (
          <div className="w-32">{children}</div>
        )}
      </div>
      {photo !== null && (
        <img src={photo} alt="음식사진" className="w-24 h-24" />
      )}
    </div>
  );
};
