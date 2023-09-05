import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import {
  CreateAccountMutation,
  CreateAccountMutationVariables,
  UserRole,
} from "../gql/graphql";
import { Button } from "../components/button";
import { Link, useHistory } from "react-router-dom";
import { Helmet } from "react-helmet-async";

const CREATE_ACCOUNT_MUTATION = gql`
  mutation createAccount($createAccountInput: CreateAccountInput!) {
    createAccount(input: $createAccountInput) {
      ok
      error
    }
  }
`;

interface JoinForm {
  email: string;
  pass: string;
  role: UserRole;
}

export const Join = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<JoinForm>({
    mode: "onChange",
    defaultValues: {
      role: UserRole.Client,
    },
  });

  const history = useHistory();
  const onCompleted = (data: CreateAccountMutation) => {
    const {
      createAccount: { ok },
    } = data;
    if (ok) {
      alert("회원가입이 완료 되었습니다.");
      history.push("/");
    }
  };
  const [
    createAccountMutation,
    { loading, data: createAccountMutationResult },
  ] = useMutation<CreateAccountMutation, CreateAccountMutationVariables>(
    CREATE_ACCOUNT_MUTATION,
    {
      onCompleted,
    }
  );

  const onSubmit = ({ email, pass: password, role }: JoinForm) => {
    if (!loading) {
      createAccountMutation({
        variables: {
          createAccountInput: {
            email,
            password,
            role,
          },
        },
      });
    }
  };

  return (
    <div className="h-screen flex flex-col items-center xl:mt-32 mt-10 ">
      <Helmet>
        <title>Nuber-Eats | Join</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          alt="logo"
          className="w-56 mb-5"
        />
        <h4 className="w-full font-medium text-start text-2xl">
          Let's get started
        </h4>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col my-5 w-full"
        >
          <input
            className="input"
            type="email"
            placeholder="Email"
            {...register("email", {
              required: "이메일을 입력해주세요.",
              pattern:
                /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            })}
          />
          {errors.email?.message && (
            <FormError errorMessage={errors.email.message} />
          )}
          {errors.email?.type === "pattern" && (
            <FormError errorMessage="유효하지 않은 이메일 형식입니다." />
          )}
          <input
            className="input mt-5"
            type="password"
            placeholder="Password"
            {...register("pass", {
              required: "비밀번호를 입력해주세요.",
              minLength: 10,
            })}
          />
          {errors.pass?.message && (
            <FormError errorMessage={errors.pass.message} />
          )}
          {errors.pass?.type === "minLength" && (
            <FormError errorMessage={"비밀번호는 10자 이상의 문자열입니다."} />
          )}
          <select className="input mt-5" {...register("role")}>
            {Object.keys(UserRole).map((role) => (
              <option key={role}>{role}</option>
            ))}
          </select>
          <Button canClick={isValid} loading={loading} acttionText="Join" />
          {createAccountMutationResult?.createAccount.error && (
            <FormError
              errorMessage={createAccountMutationResult.createAccount.error}
            />
          )}
        </form>
        <div>
          Already have an account?{" "}
          <Link to="/" className="text-lime-600 hover:underline">
            Login Now
          </Link>
        </div>
      </div>
    </div>
  );
};
