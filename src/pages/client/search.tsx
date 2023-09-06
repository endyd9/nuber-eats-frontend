import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { useHistory, useLocation } from "react-router-dom";
import { RESTAURANT_FRAGMENT } from "../../fragments";

const SERACH_RESTAURANT = gql`
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
  const loaction = useLocation();
  const history = useHistory();
  const [queryFetch, { loading, data }] = useLazyQuery(SERACH_RESTAURANT);

  useEffect(() => {
    const [_, query] = loaction.search.split("?term=");
    if (!query) {
      history.replace("/");
    }
    queryFetch({
      variables: {
        input: {
          page: 1,
          query,
        },
      },
    });
  }, []);
  console.log(loading, data);

  return (
    <div>
      <Helmet>
        <title>Nuber-Eats | Search</title>
      </Helmet>
      <h1>히힣ㅎ힣</h1>
    </div>
  );
};
