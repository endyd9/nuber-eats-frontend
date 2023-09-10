import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useState } from "react";

import { Restaurant } from "../../components/restaurant";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { Categories } from "../../components/categories";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../gql/graphql";
import { SearchBar } from "../../components/search-bar";

const RESTAURANTS_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query restaurantsPage($input: RestaurantsInput!) {
    allCategories {
      ok
      error
      categories {
        ...CategoryParts
      }
    }
    restaurants(input: $input) {
      ok
      error
      totalPages
      totalResult
      results {
        ...RestaurantParts
      }
    }
  }
`;

export interface SearchForm {
  search: string;
}

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

  if (data?.allCategories?.categories) {
    if (!localStorage.getItem("categories")) {
      localStorage.setItem(
        "categories",
        JSON.stringify(data.allCategories.categories)
      );
    }
  }

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | Home</title>
      </Helmet>
      <SearchBar />
      {!loading && (
        <div className="max-w-screen-2xl mx-auto my-5">
          {/* 카테고리 */}
          <div className="flex justify-around lg:max-w-screen-lg mx-auto overflow-x-scroll">
            {data?.allCategories?.categories?.map((category: any) => (
              <Categories
                id={category.id}
                coverImg={
                  typeof category.coverImg === "string" ? category.coverImg : ""
                }
                name={category.name}
                slug={category.slug}
                key={category.id}
              />
            ))}
          </div>
          {/* 레스토랑 */}
          <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10 my-10 mx-10 xl:mx-3">
            {data?.restaurants?.results?.map((restaurant: any) => (
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
              Page {page} of {data?.restaurants.totalPages}
            </span>
            {page !== data?.restaurants.totalPages ? (
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
        </div>
      )}
    </div>
  );
};
