import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  VerifyEmailMutation,
  VerifyEmailMutationVariables,
} from "../../gql/graphql";
import { useEffect } from "react";
import { useMe } from "../../hooks/useMe";
import { useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";

export const VERIFY_EMAIL_MUTATION = gql`
  mutation verifyEmail($input: VerifyEmailInput!) {
    verifyEmail(input: $input) {
      ok
      error
    }
  }
`;

export const ConfirmEmail = () => {
  const { data: userData, refetch } = useMe();
  const history = useHistory();
  const onCompleted = async (data: VerifyEmailMutation) => {
    const {
      verifyEmail: { ok },
    } = data;
    if (ok && userData?.me.id) {
      await refetch();
      history.push("/");
    }
  };
  const [verifyEmail] = useMutation<
    VerifyEmailMutation,
    VerifyEmailMutationVariables
  >(VERIFY_EMAIL_MUTATION, {
    onCompleted,
  });

  useEffect(() => {
    const [_, code] = window.location.href.split("code=");
    verifyEmail({
      variables: {
        input: {
          code,
        },
      },
    });
  }, [verifyEmail]);

  return (
    <>
      <Helmet>
        <title>Nuber-Eats | Confirm</title>
      </Helmet>
      <div className="mt-72 flex flex-col items-center justify-center">
        <h2 className="text-2xl font-semibold mb-3">이메일 인증중...</h2>
        <h4 className="text-base mb-5 text-gray-700">이 창을 닫지 마세요.</h4>
      </div>
    </>
  );
};
