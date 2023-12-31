//@ts-nocheck

import { gql, useMutation, useQuery, useSubscription } from "@apollo/client";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  DISH_FARGMENT,
  ORDERS_FRAGMENT,
  RESTAURANT_FRAGMENT,
} from "../../fragments";
import {
  CreatePaymentMutation,
  CreatePaymentMutationVariables,
  MyRestaurantQuery,
  MyRestaurantQueryVariables,
  PendingOrdersSubscription,
  PendingOrdersSubscriptionVariables,
} from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { Menu } from "../../components/menu";
import {
  VictoryAxis,
  VictoryChart,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
  VictoryVoronoiContainer,
} from "victory";
import { useEffect } from "react";

interface Params {
  id: string;
}

export const MY_RESTAURANT = gql`
  ${RESTAURANT_FRAGMENT}
  ${DISH_FARGMENT}
  ${ORDERS_FRAGMENT}
  query myRestaurant($input: MyRestaurantInput!) {
    myRestaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
        menu {
          ...MenuParts
        }
        orders {
          ...OrderParts
        }
      }
    }
  }
`;

export const CREATE_PAYMENT_MUTATION = gql`
  mutation createPayment($input: CreatePaymentInput!) {
    createPayment(input: $input) {
      ok
      error
    }
  }
`;

export const PENDING_ORDER = gql`
  subscription pendingOrders {
    pendingOrders {
      id
    }
  }
`;

export const MyRestaurant = () => {
  const { id } = useParams<Params>();

  const onCompleted = (data: CreatePaymentMutation) => {
    if (data.createPayment.ok) {
      alert("프로모션이 적용되었습니다.");
    }
  };
  const [createPaymentMutation] = useMutation<
    CreatePaymentMutation,
    CreatePaymentMutationVariables
  >(CREATE_PAYMENT_MUTATION, {
    onCompleted,
  });

  const { data, loading } = useQuery<
    MyRestaurantQuery,
    MyRestaurantQueryVariables
  >(MY_RESTAURANT, {
    variables: {
      input: {
        id: +id,
      },
    },
  });

  const { data: subData } = useSubscription<
    PendingOrdersSubscription,
    PendingOrdersSubscriptionVariables
  >(PENDING_ORDER);

  const triggerPaddle = () => {
    // I Hate Paddle
    // if (userData?.me.email) {
    //   window.Paddle.Setup({
    //     vender: 177572,
    //   });
    //   window.Paddle.Checkout.open({
    //     product: pro_01ha6vhtt1m0ev789mjpd1dm8j,
    //     email: userData.me.email,
    //   });
    // }

    if (window.confirm("결제 하시겠습니까?")) {
      createPaymentMutation({
        variables: {
          input: {
            transactionId: "iDontHaveTransactionId",
            restaurantId: +id,
          },
        },
      });
    }
  };

  const history = useHistory();

  useEffect(() => {
    if (subData?.pendingOrders.id) {
      history.push(`/orders/${subData.pendingOrders.id}`);
    }
  }, [subData]);
  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | My Restaurant</title>
        <script src="https://cdn.paddle.com/paddle/paddle.js"></script>
      </Helmet>
      <div>
        {!loading && (
          <>
            <div
              className="bg-gray-600 py-24 bg-center bg-cover xl:bg-inherit bg-no-repeat "
              style={{
                backgroundImage: `url(${data?.myRestaurant.restaurant?.coverImg})`,
              }}
            />
            <div className="container">
              <h2 className="text-2xl font-semibold mb-10">
                {data?.myRestaurant.restaurant.name}
              </h2>
              <Link
                to={`/restaurant/${id}/add-menu`}
                className="mr-8 bg-gray-800 text-white py-3 px-10 hover:bg-gray-900"
              >
                메뉴추가
              </Link>
              <span
                onClick={triggerPaddle}
                className="bg-lime-700 text-white py-3 px-10 hover:bg-lime-800"
              >
                프로모션 등록
              </span>
            </div>
          </>
        )}
        <div className="container">
          {data?.myRestaurant.restaurant?.menu?.length === 0 ? (
            <h3 className="text-2xl text-center mt-[10%]">메뉴가 없습니다.</h3>
          ) : (
            <>
              <h4 className="text-2xl font-semibold text-center">메뉴</h4>
              <div className="grid mt-10 md:grid-cols-3 gap-x-5 gap-y-10">
                {data?.myRestaurant.restaurant.menu.map((dish) => (
                  <Menu
                    key={dish.id}
                    name={dish.name}
                    description={dish.description}
                    price={dish.price}
                    photo={dish.photo}
                  />
                ))}
              </div>
            </>
          )}
          {data?.myRestaurant.restaurant?.orders?.length === 0 ? (
            <h3 className="text-2xl text-center mt-[10%]">
              최근 주문내역이 없습니다.
            </h3>
          ) : (
            <div className="my-10">
              <h4 className="text-2xl font-semibold text-center">매출현황</h4>
              <div className="px-10">
                <VictoryChart
                  theme={VictoryTheme.material}
                  height={500}
                  width={window.innerWidth}
                  containerComponent={<VictoryVoronoiContainer />}
                  domainPadding={50}
                  padding={100}
                >
                  <VictoryLine
                    labels={({ datum }) => `₩ ${datum.y}원`}
                    labelComponent={<VictoryTooltip renderInPortal dy={-20} />}
                    data={data?.myRestaurant.restaurant?.orders?.map(
                      (order) => ({
                        x: order.createdAt,
                        y: order.total,
                      })
                    )}
                    interpolation={"monotoneX"}
                    style={{
                      data: {
                        stroke: "#4D7C0F",
                        strokeWidth: 5,
                      },
                    }}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(tick) => `₩ ${tick / 10000}만원`}
                    style={{ tickLabels: { fontSize: 18, fill: "#4D7C0F" } }}
                  />
                  <VictoryAxis
                    tickFormat={(tick) =>
                      new Date(tick).toLocaleDateString("ko")
                    }
                    style={{ tickLabels: { fontSize: 18, fill: "#4D7C0F" } }}
                  />
                </VictoryChart>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
