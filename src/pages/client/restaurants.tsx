import { gql, useQuery } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { Link, useHistory } from "react-router-dom";

import { Restaurant } from "../../components/restaurant";
import { useForm } from "react-hook-form";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { Categories } from "../../components/categories";
import {
  RestaurantsPageQuery,
  RestaurantsPageQueryVariables,
} from "../../gql/graphql";

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

interface SearchForm {
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

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);
  const { register, handleSubmit } = useForm<SearchForm>();
  const history = useHistory();
  const onSearchSubmit = ({ search }: SearchForm) => {
    history.push({
      pathname: "/search",
      search: `term=${search}`,
    });
  };

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | Home</title>
      </Helmet>
      <form
        onSubmit={handleSubmit(onSearchSubmit)}
        className="bg-gray-800 w-full py-32 flex items-center justify-center"
      >
        <input
          type="search"
          placeholder="검색어를 입력하세요."
          className="input rounded-md border-0 lg:w-[30%] w-2/3"
          {...register("search", {
            required: true,
            min: 1,
          })}
        />
      </form>
      {!loading && (
        <div className="max-w-screen-2xl mx-auto my-5">
          {/* 카테고리 */}
          <div className="flex justify-around lg:max-w-screen-lg mx-auto overflow-x-scroll">
            {data?.allCategories.categories?.map((category) => (
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
          {/* 페이지 */}
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
