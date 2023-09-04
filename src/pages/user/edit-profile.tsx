import { useForm } from "react-hook-form";
import { Button } from "../../components/button";
import { useMe } from "../../hooks/useMe";
import { Helmet } from "react-helmet-async";
import { gql, useApolloClient, useMutation } from "@apollo/client";
import {
  EditProfileMutation,
  EditProfileMutationVariables,
} from "../../gql/graphql";

const EDIT_PROFILE_MUTATION = gql`
  mutation editProfile($input: EditProfileInput!) {
    editProfile(input: $input) {
      ok
      error
    }
  }
`;

interface EditProfile {
  email?: string;
  pass?: string;
}

export const EditProfile = () => {
  const { data: userData, refetch } = useMe();

  const client = useApolloClient();
  const onCompleted = async (data: EditProfileMutation) => {
    const {
      editProfile: { ok },
    } = data;
    if (ok && userData) {
      await refetch();
    }
  };
  const [editProfile, { loading }] = useMutation<
    EditProfileMutation,
    EditProfileMutationVariables
  >(EDIT_PROFILE_MUTATION, {
    onCompleted,
  });
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors, isValid },
  } = useForm<EditProfile>({
    mode: "onChange",
    defaultValues: {
      email: userData?.me.email,
    },
  });

  const onSubmit = ({ email, pass: password }: EditProfile) => {
    editProfile({
      variables: {
        input: {
          email,
          ...(password !== "" && { password }),
        },
      },
    });
  };
  return (
    <>
      <Helmet>
        <title>Nuber-Eats | Edit-Profile</title>
      </Helmet>
      <div className="mt-52 flex flex-col justify-center items-center">
        <h1 className="text-xl font-semibold">회원정보 수정</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid max-w-screen-sm gap-3 mt-5 w-full mb-5"
        >
          <input
            type="email"
            placeholder="Email"
            className="input"
            {...register("email", {
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          <input
            type="password"
            placeholder="******"
            className="input"
            {...register("pass")}
          />
          <Button canClick={isValid} loading={loading} acttionText="저장" />
        </form>
      </div>
    </>
  );
};
