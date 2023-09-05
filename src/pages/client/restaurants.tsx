import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../gql/graphql";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Category } from "../../components/category";
import { Restaurant } from "../../components/restaurant";

const RESTAURANTS_QUERY = gql`
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        id
        name
        coverImg
        restaurantCount
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResult
      results {
        id
        name
        coverImg
        category {
          name
        }
        address
        isPromoted
      }
    }
  }
`;

export const Restaurants: React.FC = () => {
  const [page, setPage] = useState(1);
  const { data, loading } = useQuery<
    RestaurantsPageQuery,
    RestaurantsPageQueryVariables
  >(RESTAURANTS_QUERY, {
    variables: {
      input: {
        page,
      },
    },
  });

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | Home</title>
      </Helmet>
      <form className="bg-gray-800 w-full py-32 flex items-center justify-center">
        <input
          type="search"
          placeholder="검색어를 입력하세요."
          className="input rounded-md border-0 w-[25%]"
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto my-5">
          <div className="flex justify-around max-w-screen-lg mx-auto">
            {data?.allCategories.categories?.map((category) => (
              <Category
                id={category.id}
                coverImg={
                  typeof category.coverImg === "string" ? category.coverImg : ""
                }
                name={category.name}
                key={category.id}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-x-5 gap-y-10 my-10">
            {data?.restaurants.results?.map((restaurant) => (
              <Restaurant
                id={restaurant.id}
                name={restaurant.name}
                coverImg={restaurant.coverImg}
                categoryName={restaurant.category!.name}
                key={restaurant.id}
              />
            ))}
          </div>
          <div className="grid grid-cols-3 text-center max-w-xs items-center mx-auto mt-10">
            {page > 1 ? (
              <button
                onClick={onPrevPageClick}
                className="text-2xl font-medium bg-gray-100 rounded-full w-10 h-10 hover:bg-gray-300 mx-auto"
              >
                &larr;
              </button>
            ) : (
              <div></div>
            )}
            <span className="mx-3">
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
              <button
                onClick={onNextPageClick}
                className="text-2xl font-medium bg-gray-100 rounded-full w-10 h-10 hover:bg-gray-300 mx-auto"
              >
                &rarr;
              </button>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
