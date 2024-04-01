import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { removeUserData } from "../redux/slice/UserSlice";
import LinkButton from "./LinkButton";

export default function Header() {
  const auth = JSON.parse(localStorage.getItem("user"));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handelLogout() {
    dispatch(removeUserData());
    localStorage.removeItem("user");
    navigate("/login");
  }
  return (
    <div className=" border-b border-stone-200 bg-stone-50 px-10 py-5">
      <div className="flex justify-between">
        <div className="inline-block bg-gradient-to-tr from-yellow-500 to-yellow-700 bg-clip-text text-lg font-bold uppercase text-transparent">
          Admin Pannel
        </div>
        <button onClick={handelLogout}>
          <LinkButton color="darkyellow">Logout</LinkButton>
        </button>
      </div>
    </div>
  );
}
