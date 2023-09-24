import { gql, useApolloClient, useMutation, useQuery } from "@apollo/client";
import {
  AllCategoriesQuery,
  AllCategoriesQueryVariables,
  CreateAccountMutationVariables,
  CreateRestaurantMutation,
} from "../../gql/graphql";
import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { Helmet } from "react-helmet-async";
import { useState } from "react";
import { MY_RESTAURANTS_QUERY } from "./my-restaurants";
import { useHistory } from "react-router-dom";

const CREATE_RESTAURANT_MUTATION = gql`
  mutation createRestaurant($input: CreateRestaurantInput!) {
    createRestaurant(input: $input) {
      ok
      error
      restaurantId
    }
  }
`;

const CREATE_RESTAURANT_QUERY = gql`
  query allCategories {
    allCategories {
      ok
      error
      categories {
        id
        name
      }
    }
  }
`;

interface FormProps {
  name: string;
  address: string;
  categoryName: string;
  file: FileList;
}

export const CreateRestaurant = () => {
  const { data: categoryData } = useQuery<
    AllCategoriesQuery,
    AllCategoriesQueryVariables
  >(CREATE_RESTAURANT_QUERY);

  const client = useApolloClient();
  const history = useHistory();
  const [imgUrl, setImgUrl] = useState("");
  const onCompleted = (data: CreateRestaurantMutation) => {
    const { name, address, categoryName } = getValues();
    const {
      createRestaurant: { ok },
    } = data;
    if (ok) {
      setUploading(false);
      const queryResult = client.readQuery({
        query: MY_RESTAURANTS_QUERY,
        variables: {
          input: {
            page: 1,
          },
        },
      });
      client.writeQuery({
        query: MY_RESTAURANTS_QUERY,
        variables: {
          input: {
            page: 1,
          },
        },
        data: {
          myRestaurants: {
            ...queryResult.myRestaurants,
            results: [
              {
                name,
                address,
                category: {
                  name: categoryName,
                  __typename: "Category",
                  __proto__: Object,
                },
                coverImg: imgUrl,
                id: 11,
                isPromoted: false,
                __typename: "Restaurant",
              },
              ...queryResult.myRestaurants.results,
            ],
          },
        },
      });
      history.push("/");
    }
  };

  const [createRestaurantMutation] = useMutation<
    CreateRestaurantMutation,
    CreateAccountMutationVariables
  >(CREATE_RESTAURANT_MUTATION, {
    onCompleted,
  });

  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid },
  } = useForm<FormProps>({
    defaultValues: {
      categoryName: "분식",
    },
  });

  const [uploading, setUploading] = useState(false);

  const onSubmit = async ({ name, categoryName, address, file }: FormProps) => {
    try {
      setUploading(true);
      const formBody = new FormData();
      formBody.append("file", file[0]);
      const { url: coverImg } = await (
        await fetch(`${process.env.REACT_APP_SERVER_URL}/uploads`, {
          method: "POST",
          body: formBody,
        })
      ).json();

      setImgUrl(coverImg);

      createRestaurantMutation({
        variables: {
          //@ts-ignore
          input: {
            name,
            categoryName,
            address,
            coverImg,
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container">
      <Helmet>
        <title>Nuber-Eats | CreateRestaurant</title>
      </Helmet>
      <h1 className="font-semibold text-2xl mb-3 text-center mt-36">
        매장 등록
      </h1>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5 mx-auto"
      >
        <input
          type="text"
          placeholder="매장명"
          className="input"
          {...register("name", { required: "이름은 필수 필드입니다." })}
        />
        <input
          type="text"
          placeholder="매장 주소"
          className="input"
          {...register("address", { required: "주소는 필수 필드입니다." })}
        />
        <select className="input" {...register("categoryName")}>
          {categoryData?.allCategories.categories?.map((category: any) => (
            <option key={category.id}>{category.name}</option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          {...register("file", { required: "이미지를 선택하세요." })}
        />
        <Button
          loading={uploading}
          canClick={isValid}
          acttionText="매장 등록"
        />
      </form>
    </div>
  );
};
