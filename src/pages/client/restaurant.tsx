import { gql, useQuery } from "@apollo/client";
import { Link, useParams } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { RestaurantQuery, RestaurantQueryVariables } from "../../gql/graphql";

const RESTAURANT_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  query restaurant($input: RestaurantInput!) {
    restaurant(input: $input) {
      ok
      error
      restaurant {
        ...RestaurantParts
      }
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

  return (
    <div>
      {!loading && (
        <div
          className="bg-gray-600 py-32 bg-center bg-cover xl:bg-fixed bg-no-repeat"
          style={{
            //@ts-ignore
            backgroundImage: `url(${data?.restaurant.restaurant.coverImg})`,
          }}
        >
          <div className="bg-white min-w-fit w-1/4 py-8 pl-16 pr-10 rounded-r-lg">
            <h4 className="text-3xl mb-2">
              {data?.restaurant.restaurant?.name}
            </h4>
            <Link
              to={`/category/${data?.restaurant.restaurant?.category?.name}`}
            >
              <h5 className="text-sm text-gray-400 font-semibold mb-1">
                {data?.restaurant.restaurant?.category?.name}
              </h5>
              <h6 className="text-sm text-gray-400 font-semibold">
                {data?.restaurant.restaurant?.address}
              </h6>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};
