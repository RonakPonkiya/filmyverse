import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import {Appstate} from '../App'

const Header = () => {
  const useAppstate = useContext(Appstate)

  return (
    <div className="sticky top-0 z-10 bg-black text-3xl flex items-center justify-between text-red-500 font-bold p-3 px-8 border-b-2 border-gray-500">
     <Link to={"/"}> <span>
        Filmy <span className="text-white">Verse</span>
      </span></Link>
      {useAppstate.login ?
        <Link to={"/addmovie"}>
        <h1 className="text-lg cursor-pointer text-white flex items-center">
          <Button>
            <AddIcon className="mr-1" />{" "}
            <span className="text-white font-bold">Add New</span>
          </Button>
        </h1>
      </Link>
      :
       <Link to={"/login"}>
        <h1 className="text-lg bg-slate-500 cursor-pointer text-white flex items-center">
          <Button>
            <span className="text-white text-xl font-bold">Log in</span>
          </Button>
        </h1>
      </Link>
      }
    </div>
  );
}

export default Header;
