import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";
import { setLoader } from "../../store/slices/loaderSlice";
import { PowerIcon } from "@heroicons/react/24/outline";

const General = () => {
  const { name, email, role } = useSelector((state) => state.reducer.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate("/");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    dispatch(setLoader(false));
    navigate("/");
  };

  return (
    <section className="pl-4 max-w-lg">
      <div className="flex items-end justify-between mb-4">
        <h1 className="text-xl font-bold my-3">
          {role === "user" ? "User Profile" : "Admin Profile"}
        </h1>
      </div>
      <div className="flex items-center justify-between border-b border-blue-200 font-medium mb-3">
        <p className="font-semibold">Email</p>
        <p>{email}</p>
      </div>
      <div className="flex items-center justify-between border-b border-blue-200 font-medium mb-3">
        <p className="font-semibold">Name</p>
        <p>{name}</p>
      </div>
      <div className="flex items-center justify-between border-b border-blue-200 font-medium mb-3">
        <p className="font-semibold">Role</p>
        <p>{role}</p>
      </div>
      <button
        type="button"
        className=" text-white bg-red-500 font-medium px-3 py-2 rounded-md flex gap-2 items-center hover:bg-red-600 transition-colors"
        onClick={logoutHandler}
      >
        Logout
      </button>
    </section>
  );
};

export default General;
