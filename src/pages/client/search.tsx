import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";
import { SearchBar } from "../../components/search-bar";
import { Categories } from "../../components/categories";
import { SerachRestaurantQuery } from "../../gql/graphql";
import { Restaurant } from "../../components/restaurant";

export const SERACH_RESTAURANT = gql`
  ${RESTAURANT_FRAGMENT}
  query serachRestaurant($input: SearchRestaurantInput!) {
    serachRestaurant(input: $input) {
      ok
      error
      totalPages
      totalResult
      restaurants {
        ...RestaurantParts
      }
    }
  }
`;

export const Search = () => {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const loaction = useLocation();
  const history = useHistory();

  const [queryFetch, { loading, data }] =
    useLazyQuery<SerachRestaurantQuery>(SERACH_RESTAURANT);

  useEffect(() => {
    const [_, query] = loaction.search.split("?term=");

    if (!query) {
      history.replace("/");
    }
    queryFetch({
      variables: {
        input: {
          page,
          query,
        },
      },
    });
  }, [loaction]);

  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  useEffect(() => {
    const loadCategory = JSON.parse(localStorage.getItem("categories") + "");
    if (!loadCategory) {
      history.push("/");
    } else {
      setCategories(loadCategory);
    }
  }, []);

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | Search</title>
      </Helmet>
      <SearchBar />
      <div className="max-w-screen-2xl mx-auto my-5">
        <div className="flex justify-around lg:max-w-screen-lg mx-auto overflow-x-scroll">
          {categories?.map((category: any) => (
            <Categories
              key={category.id}
              id={category.id}
              coverImg={category.coverImg}
              name={category.name}
              slug={category.slug}
            />
          ))}
        </div>
        {!loading && (
          <>
            <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10 my-10 mx-10 xl:mx-3">
              {data?.serachRestaurant.restaurants?.map((restaurant: any) => (
                <Restaurant
                  id={restaurant?.id}
                  name={restaurant?.name}
                  coverImg={restaurant?.coverImg}
                  categoryName={restaurant.category?.name}
                  isSearch
                  key={restaurant.id}
                />
              ))}
            </div>

            {typeof data?.serachRestaurant?.totalResult === "number" &&
            data?.serachRestaurant.totalResult > 0 ? (
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
                  Page {page} of {data?.serachRestaurant?.totalPages}
                </span>
                {page !== data?.serachRestaurant?.totalPages ? (
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
            ) : (
              <h1 className="mt-36 text-2xl text-center mx-auto">
                검색결과가 없습니다.
              </h1>
            )}
          </>
        )}
      </div>
    </div>
  );
};
