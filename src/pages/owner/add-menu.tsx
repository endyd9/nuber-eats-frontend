import { gql, useMutation } from "@apollo/client";
import { Helmet } from "react-helmet-async";
import { useForm } from "react-hook-form";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/button";
import { MY_RESTAURANT } from "./my-restaurant";
import {
  CreateDishMutation,
  CreateDishMutationVariables,
} from "../../gql/graphql";
import { useState } from "react";

interface Parmas {
  id: string;
}

interface Form {
  name: string;
  price: string;
  description: string;
  [key: string]: string;
}

const CREATE_DISH_MUTATION = gql`
  mutation createDish($input: CreateDishInput!) {
    createDish(input: $input) {
      ok
      error
    }
  }
`;

export const AddMenu = () => {
  const { id: restaurantId } = useParams<Parmas>();
  const history = useHistory();
  const [createDishMutation, { loading }] = useMutation<
    CreateDishMutation,
    CreateDishMutationVariables
  >(CREATE_DISH_MUTATION, {
    refetchQueries: [
      { query: MY_RESTAURANT, variables: { input: { id: +restaurantId } } },
    ],
  });

  const [options, setOptions] = useState<number[]>([]);
  const onAddOptionClick = () => {
    setOptions((current) => [...current, Date.now()]);
  };
  const onDeleteClick = (deleteId: number) => {
    setOptions((current) => current.filter((id) => id !== deleteId));
    setValue(`${deleteId}-OptionName`, "");
    setValue(`${deleteId}-OptionExtra`, "");
  };

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<Form>();

  const onSubmit = ({ name, price, description, ...rest }: Form) => {
    const optionObj = options.map((id) => ({
      name: rest[`${id}-OptionName`],
      extra: +rest[`${id}-OptionExtra`],
    }));
    createDishMutation({
      variables: {
        input: {
          name,
          price: +price,
          description,
          restaurantId: +restaurantId,
          options: optionObj,
        },
      },
    });
    history.goBack();
  };
  return (
    <div className="container">
      <Helmet>
        <title>Nuber-Eats | Add Menu</title>
      </Helmet>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid max-w-screen-sm gap-3 mt-[15%] w-full mx-auto"
      >
        <h2 className="text-xl font-semibold text-center">메뉴 추가</h2>
        <input
          className="input"
          type="text"
          placeholder="Name"
          {...register("name", { required: true })}
        />
        <input
          className="input"
          type="number"
          placeholder="Price"
          defaultValue={0}
          {...register("price", { required: true, minLength: 5 })}
        />
        <input
          className="input"
          type="text"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <h3 className="font-bold">옵션</h3>
        <button
          onClick={onAddOptionClick}
          type="button"
          className="text-sm text-white bg-gray-900 py-1 px-2 w-36"
        >
          옵션 추가하기
        </button>
        {options.length !== 0 && (
          <div className="mt-3">
            {options.map((id) => (
              <div key={id}>
                <input
                  className="py-2 px-4 mr-2 w-[47%] focus:outline-none focus:border-gray-600 border-2"
                  type="text"
                  placeholder="Option Name"
                  {...register(`${id}-OptionName`)}
                />
                <input
                  className="py-2 px-4 w-[47%] focus:outline-none focus:border-gray-600 border-2"
                  type="number"
                  placeholder="Extra Price"
                  defaultValue={0}
                  {...register(`${id}-OptionExtra`)}
                />
                <label htmlFor="file">이미지</label>
                <input type="file" {...register("file")} />
                <button
                  onClick={() => onDeleteClick(id)}
                  type="button"
                  className="mx-1 text-xl"
                >
                  ❌
                </button>
              </div>
            ))}
          </div>
        )}
        <Button
          canClick={isValid}
          loading={loading}
          acttionText={"메뉴 추가"}
        />
      </form>
    </div>
  );
};
