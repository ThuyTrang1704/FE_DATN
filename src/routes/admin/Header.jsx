import React from "react";
import { navBar } from "../../lib/utils";
import { Link, useNavigate } from "react-router-dom";
import { useStateContext } from "../../lib/context/StateContextProvider";

const Header = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStateContext();
  const { onOpen1 } = useStateContext();
  return (
    <div className="w-full h-[100px] flex items-center justify-around bg-[#252b2d]">
      <div className="navbar-header">
        <h1 className="title-header text-[36px] font-bold text-white">
        WEBSITE ADMINISTRATOR
        </h1> 
      </div>
      <nav>
        <ul className="flex flex-col md:flex-row text-white font-medium space-y-4 md:space-y-0 md:space-x-10 cursor-pointer">
          <li className="hover:text-black hover:bg-gray-200 border rounded p-2">
            {token !== null ? (
              <Link
                className="p-2"
                to={"/"}
                onClick={() => {
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Link>
            ) : (
              ""
            )}
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
