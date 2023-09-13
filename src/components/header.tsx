import { faSignOut, faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link, useHistory } from "react-router-dom";
import { useApolloClient } from "@apollo/client";
import { isLoggedInVar } from "../apollo";

export const Header: React.FC = () => {
  const { data } = useMe();
  const history = useHistory();
  const client = useApolloClient();

  const onLogOutClick = async () => {
    alert("로그아웃 되었습니다.");
    localStorage.removeItem("nuber-token");
    await client.clearStore();
    isLoggedInVar(false);
    history.push("/");
  };

  return (
    <>
      {!data?.me.verified && (
        <div className="bg-red-600 p-3 text-center text-sm font-light text-white">
          <span>이메일 인증을 완료해 주세요.</span>
        </div>
      )}
      <header className=" py-4">
        <div className="px-7 2xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
          <Link to="/">
            <img src={`${process.env.PUBLIC_URL}/images/logo.svg`} alt="logo" />
          </Link>
          <span>
            <Link to="/edit-profile/">
              <FontAwesomeIcon icon={faUser} className="text-2xl mr-5" />
            </Link>
            <button onClick={onLogOutClick}>
              <FontAwesomeIcon icon={faSignOut} className="text-2xl" />
            </button>
          </span>
        </div>
      </header>
    </>
  );
};
