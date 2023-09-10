import { gql, useQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables } from "../../gql/graphql";
import { Helmet } from "react-helmet-async";
import { SearchBar } from "../../components/search-bar";
import { Categories } from "../../components/categories";
import { Restaurant } from "../../components/restaurant";

export const CATEGORY_QUERY = gql`
  ${RESTAURANT_FRAGMENT}
  ${CATEGORY_FRAGMENT}
  query category($input: CategoryInput!) {
    category(input: $input) {
      ok
      error
      totalPages
      totalResult
      restaruants {
        ...RestaurantParts
      }
      category {
        ...CategoryParts
      }
    }
  }
`;

interface categoryParams {
  slug: string;
}

export const Category = () => {
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);

  const { slug } = useParams<categoryParams>();
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page,
          slug,
        },
      },
    }
  );
  const onNextPageClick = () => setPage((current) => current + 1);
  const onPrevPageClick = () => setPage((current) => current - 1);

  const history = useHistory();
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
        <title>Nuber-Eats | Category</title>
      </Helmet>
      <SearchBar />
      <div className="max-w-screen-2xl mx-auto my-5">
        <div className="flex justify-around lg:max-w-screen-lg mx-auto overflow-x-scroll">
          {categories.map((category: any) => (
            <Categories
              id={category.id}
              coverImg={category.coverImg}
              name={category.name}
              slug={category.slug}
              key={category.id}
            />
          ))}
        </div>
        {!loading && (
          <div className="grid lg:grid-cols-3 gap-x-5 gap-y-10 my-10 mx-10 xl:mx-3">
            {data?.category.restaruants?.map((restaurant: any) => (
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
        {typeof data?.category.totalResult === "number" &&
        data.category.totalResult > 0 ? (
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
              Page {page} of {data?.category.totalPages}
            </span>
            {page !== data?.category.totalPages ? (
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
      </div>
    </div>
  );
};
