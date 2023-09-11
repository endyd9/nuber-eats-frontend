import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  MyRestaurantsQuery,
  MyRestaurantsQueryVariables,
} from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { useMe } from "../../hooks/useMe";
import { Restaurant } from "../../components/restaurant";

export const MY_RESTAURANTS_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  query myRestaurants($input: MyRestaurantsInput!) {
    myRestaurants(input: $input) {
      ok
      error
      results {
        ...RestaurantParts
      }
      totalResult
      totalPages
    }
  }
`;

export const MyRestaurants = () => {
  const { data } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(
    MY_RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page: 1,
        },
      },
    }
  );

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | MyRestaurants </title>
      </Helmet>
      <div className="container">
        <h2 className="text-3xl font-medium mb-10">매장 관리</h2>
        {data?.myRestaurants.ok && data.myRestaurants.results?.length === 0 ? (
          <div className="max-w-2xl mx-auto mt-[20%] flex flex-col justify-center items-center">
            <h3 className="text-2xl">매장이 없습니다.</h3>
            <Link to={"/create-restaurant"} className="link">
              매장 등록하기 &rarr;
            </Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10 my-10 mx-10 xl:mx-3">
            {data?.myRestaurants.results?.map((restaurant: any) => (
              <Restaurant
                id={restaurant.id}
                name={restaurant.name}
                coverImg={restaurant.coverImg}
                categoryName={restaurant.category!.name}
                isPromoted
                key={restaurant.id}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
