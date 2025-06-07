import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Appstate } from "../App";
import swal from "sweetalert";

const Header = () => {
  const useAppstate = useContext(Appstate);
  const navigate = useNavigate();

  const handleLogout = () => {
    useAppstate.setLogin(false);
    useAppstate.setUserName("");
    localStorage.removeItem("login");
    localStorage.removeItem("userName");
    swal({
      title: "Logged out successfully",
      icon: "success",
      buttons: false,
      timer: 2000,
    });
    navigate("/login");
  };

  return (
    <div className="sticky top-0 z-10 header  text-sm md:text-3xl flex items-center justify-between text-red-500 font-bold p-3 px-8 border-b-2 border-gray-500">
      <Link to={"/"}>        <span>
          Filmy <span className="text-white">Verse</span>
        </span>
      </Link>

      {useAppstate.login ? (
        <div className="flex items-center gap-4">
          <Link to={"/addmovie"}>
            <h1 className="text-lg cursor-pointer bg-gray-700 rounded-md text-white flex items-center">
              <Button>
                <AddIcon className="mr-1 text-white" />
                <span className="text-white font-bold text-xs sm:inline-block md:text-xl ">Add New</span>
              </Button>
            </h1>
          </Link>

          <Button onClick={handleLogout}>
            <span className="text-white font-semibold text-lg rounded-md">Logout</span>
          </Button>
        </div>
      ) : (
        <Link to={"/login"}>
          <h1 className="cursor-pointer p-1 text-white flex items-center">
            <Button>
              <span className="text-white text-2xl font-bold">Log in</span>
            </Button>
          </h1>
        </Link>
      )}
    </div>
  );
};

export default Header;
