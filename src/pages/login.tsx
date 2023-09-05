import { useForm } from "react-hook-form";
import { FormError } from "../components/form-error";
import { gql, useMutation } from "@apollo/client";
import { LoginMutation, LoginMutationVariables } from "../gql/graphql";
import { Button } from "../components/button";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { authTokenVar, isLoggedInVar } from "../apollo";
import { LOCLASROTAGE_TOKEN } from "../constants";

const LOGIN_MUTATION = gql`
  mutation Login($loginInput: LoginInput!) {
    login(input: $loginInput) {
      ok
      token
      error
    }
  }
`;

interface LoginForm {
  email: string;
  pass: string;
}

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginForm>({
    mode: "onChange",
  });

  const onCompleted = (data: LoginMutation) => {
    const {
      login: { ok, token },
    } = data;
    if (ok && token) {
      localStorage.setItem(LOCLASROTAGE_TOKEN, token);
      authTokenVar(token);
      isLoggedInVar(true);
    }
  };

  const [loginMutation, { data: loginResult, loading }] = useMutation<
    LoginMutation,
    LoginMutationVariables
  >(LOGIN_MUTATION, {
    onCompleted,
  });

  const onSubmit = (form: LoginForm) => {
    if (!loading) {
      const { email, pass: password } = form;
      loginMutation({
        variables: {
          loginInput: {
            email,
            password,
          },
        },
      });
    }
  };
  return (
    <div className="h-screen flex flex-col items-center xl:mt-32 mt-10 ">
      <Helmet>
        <title>Nuber-Eats | Login</title>
      </Helmet>
      <div className="w-full max-w-screen-sm flex flex-col items-center px-5">
        <img
          src={`${process.env.PUBLIC_URL}/images/logo.svg`}
          alt="logo"
          className="w-56 mb-5"
        />
        {loginResult?.login.error ? (
          <span className="font-medium text-sm text-start w-full mt-3 text-red-500">
            {loginResult.login.error}
          </span>
        ) : (
          <h4 className="w-full font-medium text-start text-2xl">
            Welcom back
          </h4>
        )}

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
            <FormError errorMessage={"비밀번호는 10자 이상입니다."} />
          )}
          <Button canClick={isValid} loading={loading} acttionText="Login" />
        </form>
        <div>
          New to Nuber?{" "}
          <Link to="/join" className="text-lime-600 hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
};
