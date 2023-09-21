import { gql, useMutation, useQuery } from "@apollo/client";
import { useParams } from "react-router-dom";
import {
  EditOrderMutation,
  EditOrderMutationVariables,
  GetOrderQuery,
  GetOrderQueryVariables,
  OrderStatus,
  OrderUpdatesSubscription,
  UserRole,
} from "../gql/graphql";
import { Helmet } from "react-helmet-async";
import { useEffect } from "react";
import { useMe } from "../hooks/useMe";

const GET_ORDER = gql`
  query getOrder($input: GetOrderInput!) {
    getOrder(input: $input) {
      ok
      error
      order {
        id
        status
        total
        driver {
          email
        }
        customer {
          email
        }
        restaurant {
          name
        }
      }
    }
  }
`;

const ORDER_SUBSCRIPTION = gql`
  subscription orderUpdates($input: OrderUpdatesInput!) {
    orderUpdates(input: $input) {
      id
      status
      total
      driver {
        email
      }
      customer {
        email
      }
      restaurant {
        name
      }
    }
  }
`;

const EDIT_ORDER = gql`
  mutation editOrder($input: EditOrderInput!) {
    editOrder(input: $input) {
      ok
      error
    }
  }
`;

interface Params {
  id: string;
}

export const Order = () => {
  const { id } = useParams<Params>();
  const { data: userData } = useMe();
  const { data, subscribeToMore } = useQuery<
    GetOrderQuery,
    GetOrderQueryVariables
  >(GET_ORDER, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const [editOrderMutation] = useMutation<
    EditOrderMutation,
    EditOrderMutationVariables
  >(EDIT_ORDER);

  // const { data: subscriptonData } = useSubscription<
  //   OrderUpdatesSubscription,
  //   OrderUpdatesSubscriptionVariables
  // >(ORDER_SUBSCRIPTION, {
  //   variables: {
  //     input: {
  //       id: +id,
  //     },
  //   },
  // });

  useEffect(() => {
    if (data?.getOrder.ok) {
      subscribeToMore({
        document: ORDER_SUBSCRIPTION,
        variables: {
          input: {
            id: +id,
          },
        },
        updateQuery: (
          prev,
          {
            subscriptionData: { data },
          }: { subscriptionData: { data: OrderUpdatesSubscription } }
        ) => {
          if (!data) return prev;
          return {
            getOrder: {
              ...prev.getOrder,
              order: {
                ...data.orderUpdates,
              },
            },
          };
        },
      });
    }
  }, [data]);

  const onButtonClick = (newStatus: OrderStatus) => {
    editOrderMutation({
      variables: {
        input: {
          id: +id,
          status: newStatus,
        },
      },
    });
  };
  return (
    <div className="mt-32 container flex justify-center">
      <Helmet>
        <title>Nuber-Eats | Order {id}</title>
      </Helmet>
      <div className="border border-gray-800 w-full max-w-screen-sm flex flex-col justify-center">
        <h4 className="bg-gray-800 w-full py-5 text-white text-center text-xl">
          주문번호 : {id}
        </h4>
        <h5 className="p-5 pt-10 text-2xl text-center">
          주문금액 : {data?.getOrder.order?.total} 원
        </h5>
        <div className="p-5 text-xl grid gap-6">
          <div className="border-t pt-5 border-gray-700">
            매장명 : {data?.getOrder.order?.restaurant?.name}
          </div>
          <div className="border-t pt-5 border-gray-700">
            주문자 : {data?.getOrder.order?.customer?.email}
          </div>
          <div className="border-t border-b py-5 border-gray-700">
            배달원 :{" "}
            {data?.getOrder.order?.driver?.email ??
              "기사가 배정되지 않았습니다."}
          </div>
        </div>
        <div className="pt-5 pb-10 flex items-center justify-center">
          {userData?.me.role === UserRole.Client && (
            <h4 className="text-xl text-lime-600">
              주문 상태 : {data?.getOrder.order?.status}
            </h4>
          )}
          {userData?.me.role === UserRole.Owner && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Pending && (
                <button
                  onClick={() => onButtonClick(OrderStatus.Cooking)}
                  className="btn w-1/3 rounded-md"
                >
                  주문 수락하기
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.Cooking && (
                <button
                  onClick={() => onButtonClick(OrderStatus.Cooked)}
                  className="btn w-1/3 rounded-md"
                >
                  조리 완료
                </button>
              )}
              {data?.getOrder.order?.status !== OrderStatus.Cooking &&
                data?.getOrder.order?.status !== OrderStatus.Pending && (
                  <h4 className="text-xl text-lime-600">
                    주문 상태 : {data?.getOrder.order?.status}
                  </h4>
                )}
            </>
          )}
          {userData?.me.role === UserRole.Delivery && (
            <>
              {data?.getOrder.order?.status === OrderStatus.Cooked && (
                <button
                  onClick={() => onButtonClick(OrderStatus.PickUp)}
                  className="btn w-1/3 rounded-md"
                >
                  픽업하기
                </button>
              )}
              {data?.getOrder.order?.status === OrderStatus.PickUp && (
                <button
                  onClick={() => onButtonClick(OrderStatus.Delivered)}
                  className="btn w-1/3 rounded-md"
                >
                  전달 완료
                </button>
              )}

              {data?.getOrder.order?.status === OrderStatus.Delivered && (
                <h4 className="text-xl text-lime-600">
                  주문 상태 : {data?.getOrder.order?.status}
                </h4>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
