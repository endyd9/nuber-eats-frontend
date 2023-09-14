//@ts-nocheck

import { gql, useMutation, useQuery } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import { DISH_FARGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import {
  CreateOrderItemInput,
  CreateOrderMutation,
  CreateOrderMutationVariables,
  DishOption,
  RestaurantQuery,
  RestaurantQueryVariables,
} from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { Menu } from "../../components/menu";
import { useState } from "react";
import { MenuOption } from "../../components/menu-option";

export const RESTAURANT_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  ${DISH_FARGMENT}
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...MenuParts
        }
      }
    }
  }
`;

export const CREATE_ORDER_MUTATION = gql`
  mutation CreateOrder($input: CreateOrderInput!) {
    CreateOrder(input: $input) {
      ok
      error
      orderId
    }
  }
`;

interface RestaurantParams {
  id: string;
}

export const Restaurant = () => {
  const { id } = useParams<RestaurantParams>();
  const { loading, data } = useQuery<RestaurantQuery, RestaurantQueryVariables>(
    RESTAURANT_QUERY,
    {
      variables: {
        input: {
          restaurantId: +id,
        },
      },
    }
  );

  const [orderStarted, setOrderStarted] = useState(false);
  const [orderItems, setOrderItems] = useState<CreateOrderItemInput[]>([]);
  const triggerStartOrder = () => setOrderStarted((prev) => !prev);

  const getItem = (dishId: number) => {
    return orderItems.find((order) => order.dishId === dishId);
  };

  const isSelected = (dishId: number) => Boolean(getItem(dishId));

  const getOptionFromItem = (
    item: CreateOrderItemInput,
    optionName: string
  ) => {
    return item.option.find((option) => option.name === optionName);
  };

  const isOptionSelected = (dishId: number, optionName: string) => {
    const item = getItem(dishId);
    if (item) {
      return Boolean(getOptionFromItem(item, optionName));
    }
    return false;
  };

  const manageItemToOrder = (dishId: number) => {
    if (isSelected(dishId)) {
      setOrderItems((current) =>
        current.filter((item) => item.dishId !== dishId)
      );
      return;
    }
    setOrderItems((current) => [...current, { dishId, option: [] }]);
  };

  const removeOptionFromItem = (dishId: number, optionName: string) => {
    if (!isSelected(dishId)) {
      return;
    }
    const oldItem = getItem(dishId);

    if (oldItem) {
      setOrderItems([]);
      setOrderItems((current) => [
        ...current,
        {
          dishId,
          option: oldItem.option?.filter(
            (option) => option.name !== optionName
          ),
        },
      ]);
      return;
    }
  };

  const addOptionToItem = (dishId: number, option: DishOption) => {
    if (!isSelected(dishId)) {
      return;
    }
    let hasOption = isOptionSelected(dishId, option.name);
    if (hasOption) {
      removeOptionFromItem(dishId, option.name);
      return;
    }

    setOrderItems((current) => [
      ...current.map((item) =>
        item.dishId === dishId
          ? { ...item, option: [...item.option, option] }
          : item
      ),
    ]);
  };
  const history = useHistory();
  const onCompleted = (data: CreateOrderMutation) => {
    if (data.CreateOrder.ok) {
      alert("주문이 완료 되었습니다.");
      history.push(`/orders/${data.CreateOrder.orderId}`);
    }
  };

  const triggerConfirmOrder = () => {
    if (orderItems.length === 0) {
      return alert("뭐라도 담으세요");
    }
    if (window.confirm("주문 하시겠습니까?")) {
      createOrderMutation({
        variables: {
          input: {
            restaurantId: +id,
            items: orderItems,
          },
        },
      });
    }
  };

  const [createOrderMutation, { loading: orderLoading }] = useMutation<
    CreateOrderMutation,
    CreateOrderMutationVariables
  >(CREATE_ORDER_MUTATION, {
    onCompleted,
  });

  return (
    <div>
      {!loading && (
        <>
          <Helmet>
            <title>Nuber-Eats | {data?.restaurant.restaurant?.name + ""}</title>
          </Helmet>
          <div
            className="bg-gray-600 py-32 bg-center bg-cover xl:bg-fixed bg-no-repeat"
            style={{
              backgroundImage: `url(${data?.restaurant.restaurant?.coverImg})`,
            }}
          >
            <div
              role="title"
              className="bg-white min-w-fit w-1/4 py-8 pl-16 pr-10 rounded-r-lg"
            >
              <h4 className="text-3xl mb-2">
                {data?.restaurant.restaurant?.name}
              </h4>
              <Link
                to={`/category/${data?.restaurant.restaurant?.category?.name}`}
              >
                <h5 className="text-sm text-gray-400 font-semibold mb-1">
                  {data?.restaurant.restaurant?.category?.name}
                </h5>
              </Link>
              <h6 className="text-sm text-gray-400 font-semibold">
                {data?.restaurant.restaurant?.address}
              </h6>
            </div>
          </div>
        </>
      )}
      <div className="container pb-36 flex flex-col items-end">
        {data?.restaurant.restaurant?.menu?.length === 0 ? (
          <h3 className="text-2xl text-center mt-[10%]">메뉴가 없습니다.</h3>
        ) : (
          <>
            <h4 className="text-2xl font-semibold text-center w-full">메뉴</h4>
            {!orderStarted && (
              <button onClick={triggerStartOrder} className="btn px-10">
                주문시작
              </button>
            )}
            {orderStarted && (
              <div className="flex items-center">
                <button
                  onClick={triggerConfirmOrder}
                  className="btn px-10 mr-3"
                >
                  주문하기
                </button>
                <button
                  onClick={triggerStartOrder}
                  className="btn px-10 bg-red-500 hover:bg-red-600"
                >
                  주문취소
                </button>
              </div>
            )}

            <div className="grid mt-10 md:grid-cols-3 gap-x-5 gap-y-10 w-full">
              {data?.restaurant.restaurant.menu.map((dish: any) => (
                <Menu
                  isSelected={isSelected(dish.id)}
                  key={dish.id}
                  id={dish.id}
                  name={dish.name}
                  description={dish.description}
                  price={dish.price}
                  isCustomer={true}
                  options={dish.options}
                  photo={dish.photo}
                  orderStarted={orderStarted}
                  manageItemToOrder={manageItemToOrder}
                >
                  <h5 className="my-1 font-medium">옵션</h5>
                  {dish.options?.map((option, index) => (
                    <MenuOption
                      isSelected={isOptionSelected(dish.id, option.name)}
                      name={option.name}
                      extra={option.extra}
                      dishId={dish.id}
                      key={index}
                      addOptionToItem={addOptionToItem}
                      removeOptionFromItem={removeOptionFromItem}
                    />
                  ))}
                </Menu>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
