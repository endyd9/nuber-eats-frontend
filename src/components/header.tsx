import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();
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
              <FontAwesomeIcon icon={faUser} className="text-2xl" />
            </Link>
          </span>
        </div>
      </header>
    </>
  );
};
