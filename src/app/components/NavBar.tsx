import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import Logo from "../assets/logo.png";
import { logout } from "../redux/slices/authSlice";
import { remove } from "../redux/slices/userSlice";

const NavBar = () => {
  const dispatch = useDispatch();
  const history = useHistory();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(remove());
    history.push("/login");
  };

  return (
    <header className="container mx-auto flex justify-between items-center p-5">
      <div className="text-3xl font-bold">
        <img className="w-[150px]" src={Logo} alt="Banner" />
      </div>
      <div className="flex gap-3">
        <button className="btn btn-primary" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default NavBar;
