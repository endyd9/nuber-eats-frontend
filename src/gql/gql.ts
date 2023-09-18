/* eslint-disable */
import * as types from './graphql';
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';

/**
 * Map of all GraphQL operations in the project.
 *
 * This map has several performance disadvantages:
 * 1. It is not tree-shakeable, so it will include all operations in the project.
 * 2. It is not minifiable, so the string of a GraphQL query will be multiple times inside the bundle.
 * 3. It does not support dead code elimination, so it will add unused operations.
 *
 * Therefore it is highly recommended to use the babel or swc plugin for production.
 */
const documents = {
    "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n": types.RestaurantPartsFragmentDoc,
    "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    restaurantCount\n    slug\n  }\n": types.CategoryPartsFragmentDoc,
    "\n  fragment MenuParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n": types.MenuPartsFragmentDoc,
    "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n": types.OrderPartsFragmentDoc,
    "\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n": types.MeDocument,
    "\n  \n  \n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      restaruants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n": types.CategoryDocument,
    "\n  \n  \n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...MenuParts\n        }\n      }\n    }\n  }\n": types.RestaurantDocument,
    "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    CreateOrder(input: $input) {\n      ok\n      error\n      orderId\n    }\n  }\n": types.CreateOrderDocument,
    "\n  \n  \n  query restaurantsPage($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.RestaurantsPageDocument,
    "\n  \n  query serachRestaurant($input: SearchRestaurantInput!) {\n    serachRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n": types.SerachRestaurantDocument,
    "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n": types.CreateAccountDocument,
    "\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n": types.LoginDocument,
    "\n  query getOrder($input: GetOrderInput!) {\n    getOrder(input: $input) {\n      ok\n      error\n      order {\n        id\n        status\n        total\n        driver {\n          email\n        }\n        customer {\n          email\n        }\n        restaurant {\n          name\n        }\n      }\n    }\n  }\n": types.GetOrderDocument,
    "\n  subscription orderUpdates($input: OrderUpdatesInput!) {\n    orderUpdates(input: $input) {\n      id\n      status\n      total\n      driver {\n        email\n      }\n      customer {\n        email\n      }\n      restaurant {\n        name\n      }\n    }\n  }\n": types.OrderUpdatesDocument,
    "\n  mutation createDish($input: CreateDishInput!) {\n    createDish(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreateDishDocument,
    "\n  mutation createRestaurant($input: CreateRestaurantInput!) {\n    createRestaurant(input: $input) {\n      ok\n      error\n      restaurantId\n    }\n  }\n": types.CreateRestaurantDocument,
    "\n  query allCategories {\n    allCategories {\n      ok\n      error\n      categories {\n        id\n        name\n      }\n    }\n  }\n": types.AllCategoriesDocument,
    "\n  \n  \n  \n  query myRestaurant($input: MyRestaurantInput!) {\n    myRestaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...MenuParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n": types.MyRestaurantDocument,
    "\n  mutation createPayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      ok\n      error\n    }\n  }\n": types.CreatePaymentDocument,
    "\n  \n  query myRestaurants($input: MyRestaurantsInput!) {\n    myRestaurants(input: $input) {\n      ok\n      error\n      results {\n        ...RestaurantParts\n      }\n      totalResult\n      totalPages\n    }\n  }\n": types.MyRestaurantsDocument,
    "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n": types.VerifyEmailDocument,
    "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n": types.EditProfileDocument,
};

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 *
 *
 * @example
 * ```ts
 * const query = gql(`query GetUser($id: ID!) { user(id: $id) { name } }`);
 * ```
 *
 * The query argument is unknown!
 * Please regenerate the types.
 */
export function gql(source: string): unknown;

/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"): (typeof documents)["\n  fragment RestaurantParts on Restaurant {\n    id\n    name\n    coverImg\n    category {\n      name\n    }\n    address\n    isPromoted\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    restaurantCount\n    slug\n  }\n"): (typeof documents)["\n  fragment CategoryParts on Category {\n    id\n    name\n    coverImg\n    restaurantCount\n    slug\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment MenuParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"): (typeof documents)["\n  fragment MenuParts on Dish {\n    id\n    name\n    price\n    photo\n    description\n    options {\n      name\n      extra\n      choices {\n        name\n        extra\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"): (typeof documents)["\n  fragment OrderParts on Order {\n    id\n    createdAt\n    total\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"): (typeof documents)["\n  query me {\n    me {\n      id\n      email\n      role\n      verified\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  \n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      restaruants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  query category($input: CategoryInput!) {\n    category(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      restaruants {\n        ...RestaurantParts\n      }\n      category {\n        ...CategoryParts\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  \n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...MenuParts\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  query restaurant($input: RestaurantInput!) {\n    restaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...MenuParts\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation CreateOrder($input: CreateOrderInput!) {\n    CreateOrder(input: $input) {\n      ok\n      error\n      orderId\n    }\n  }\n"): (typeof documents)["\n  mutation CreateOrder($input: CreateOrderInput!) {\n    CreateOrder(input: $input) {\n      ok\n      error\n      orderId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  \n  query restaurantsPage($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  query restaurantsPage($input: RestaurantsInput!) {\n    allCategories {\n      ok\n      error\n      categories {\n        ...CategoryParts\n      }\n    }\n    restaurants(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      results {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query serachRestaurant($input: SearchRestaurantInput!) {\n    serachRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  query serachRestaurant($input: SearchRestaurantInput!) {\n    serachRestaurant(input: $input) {\n      ok\n      error\n      totalPages\n      totalResult\n      restaurants {\n        ...RestaurantParts\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createAccount($createAccountInput: CreateAccountInput!) {\n    createAccount(input: $createAccountInput) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation Login($loginInput: LoginInput!) {\n    login(input: $loginInput) {\n      ok\n      token\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query getOrder($input: GetOrderInput!) {\n    getOrder(input: $input) {\n      ok\n      error\n      order {\n        id\n        status\n        total\n        driver {\n          email\n        }\n        customer {\n          email\n        }\n        restaurant {\n          name\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  query getOrder($input: GetOrderInput!) {\n    getOrder(input: $input) {\n      ok\n      error\n      order {\n        id\n        status\n        total\n        driver {\n          email\n        }\n        customer {\n          email\n        }\n        restaurant {\n          name\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  subscription orderUpdates($input: OrderUpdatesInput!) {\n    orderUpdates(input: $input) {\n      id\n      status\n      total\n      driver {\n        email\n      }\n      customer {\n        email\n      }\n      restaurant {\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  subscription orderUpdates($input: OrderUpdatesInput!) {\n    orderUpdates(input: $input) {\n      id\n      status\n      total\n      driver {\n        email\n      }\n      customer {\n        email\n      }\n      restaurant {\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createDish($input: CreateDishInput!) {\n    createDish(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createDish($input: CreateDishInput!) {\n    createDish(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createRestaurant($input: CreateRestaurantInput!) {\n    createRestaurant(input: $input) {\n      ok\n      error\n      restaurantId\n    }\n  }\n"): (typeof documents)["\n  mutation createRestaurant($input: CreateRestaurantInput!) {\n    createRestaurant(input: $input) {\n      ok\n      error\n      restaurantId\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  query allCategories {\n    allCategories {\n      ok\n      error\n      categories {\n        id\n        name\n      }\n    }\n  }\n"): (typeof documents)["\n  query allCategories {\n    allCategories {\n      ok\n      error\n      categories {\n        id\n        name\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  \n  \n  query myRestaurant($input: MyRestaurantInput!) {\n    myRestaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...MenuParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n"): (typeof documents)["\n  \n  \n  \n  query myRestaurant($input: MyRestaurantInput!) {\n    myRestaurant(input: $input) {\n      ok\n      error\n      restaurant {\n        ...RestaurantParts\n        menu {\n          ...MenuParts\n        }\n        orders {\n          ...OrderParts\n        }\n      }\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation createPayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation createPayment($input: CreatePaymentInput!) {\n    createPayment(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  \n  query myRestaurants($input: MyRestaurantsInput!) {\n    myRestaurants(input: $input) {\n      ok\n      error\n      results {\n        ...RestaurantParts\n      }\n      totalResult\n      totalPages\n    }\n  }\n"): (typeof documents)["\n  \n  query myRestaurants($input: MyRestaurantsInput!) {\n    myRestaurants(input: $input) {\n      ok\n      error\n      results {\n        ...RestaurantParts\n      }\n      totalResult\n      totalPages\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation verifyEmail($input: VerifyEmailInput!) {\n    verifyEmail(input: $input) {\n      ok\n      error\n    }\n  }\n"];
/**
 * The gql function is used to parse GraphQL queries into a document that can be used by GraphQL clients.
 */
export function gql(source: "\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"): (typeof documents)["\n  mutation editProfile($input: EditProfileInput!) {\n    editProfile(input: $input) {\n      ok\n      error\n    }\n  }\n"];

export function gql(source: string) {
  return (documents as any)[source] ?? {};
}

export type DocumentType<TDocumentNode extends DocumentNode<any, any>> = TDocumentNode extends DocumentNode<  infer TType,  any>  ? TType  : never;