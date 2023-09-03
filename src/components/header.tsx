import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useMe } from "../hooks/useMe";
import logo from "../images/logo.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";

export const Header: React.FC = () => {
  const { data } = useMe();
  return (
    <header className=" py-4">
      <div className="w-full px-7 2xl:px-0 max-w-screen-2xl mx-auto flex justify-between items-center">
        <img src={logo} alt="logo" />
        <span>
          <Link to="/my-profile/">
            <FontAwesomeIcon icon={faUser} className="text-2xl" />
          </Link>
        </span>
      </div>
    </header>
  );
};
