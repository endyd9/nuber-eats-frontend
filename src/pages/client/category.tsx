import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { CATEGORY_FRAGMENT, RESTAURANT_FRAGMENT } from "../../fragments";
import { CategoryQuery, CategoryQueryVariables } from "../../gql/graphql";

const CATEGORY_QUERY = gql`
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
  const { slug } = useParams<categoryParams>();
  const { data, loading } = useQuery<CategoryQuery, CategoryQueryVariables>(
    CATEGORY_QUERY,
    {
      variables: {
        input: {
          page: 1,
          slug,
        },
      },
    }
  );
  console.log(data);

  return (
    <div>
      <h1>헤헤</h1>
    </div>
  );
};
