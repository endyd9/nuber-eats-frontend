import { gql, useQuery } from "@apollo/client";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import {
  MyRestaurantsQuery,
  MyRestaurantsQueryVariables,
} from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Restaurant } from "../../components/restaurant";
import { useState } from "react";

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
  const [page, setPage] = useState(1);

  const { data } = useQuery<MyRestaurantsQuery, MyRestaurantsQueryVariables>(
    MY_RESTAURANTS_QUERY,
    {
      variables: {
        input: {
          page,
        },
      },
    }
  );

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | Home </title>
      </Helmet>
      <div className="container">
        {data?.myRestaurants.ok && data.myRestaurants.results?.length === 0 ? (
          <>
            <h2 className="text-3xl font-medium mb-10">매장 관리</h2>
            <div className="max-w-2xl mx-auto mt-[20%] flex flex-col justify-center items-center">
              <h3 className="text-2xl">매장이 없습니다.</h3>
              <Link to={"/create-restaurant"} className="link">
                매장 등록하기 &rarr;
              </Link>
            </div>
          </>
        ) : (
          <>
            <div className="flex justify-between">
              <h2 className="text-3xl font-medium mb-10">매장 관리</h2>
              <Link to={"/create-restaurant"} className="link text-xl">
                매장 등록하기 &rarr;
              </Link>
            </div>
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
            {/* 페이지 */}
            <div className="grid grid-cols-3 text-center max-w-xs items-center mx-auto mt-10">
              {page > 1 ? (
                <button
                  role="prevPage"
                  onClick={onPrevPageClick}
                  className="text-2xl font-medium bg-gray-100 rounded-full w-10 h-10 hover:bg-gray-300 mx-auto"
                >
                  &larr;
                </button>
              ) : (
                <div></div>
              )}
              <span className="mx-3" role="page">
                Page {page} of {data?.myRestaurants.totalPages}
              </span>
              {page !== data?.myRestaurants.totalPages ? (
                <button
                  role="nextPage"
                  onClick={onNextPageClick}
                  className="text-2xl font-medium bg-gray-100 rounded-full w-10 h-10 hover:bg-gray-300 mx-auto"
                >
                  &rarr;
                </button>
              ) : (
                <div></div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};
