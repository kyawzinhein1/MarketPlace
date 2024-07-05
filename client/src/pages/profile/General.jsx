import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setUser } from "../../store/slices/userSlice";

const General = () => {
  const { name, email, role } = useSelector((state) => state.reducer.user.user);
  const dispatch = useDispatch();
  const navigate = useNavigate("/");

  const logoutHandler = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <section>
      <h1 className="font-bold text-xl my-3">Profile</h1>
      <div className="font-medium ">
        <p>Name - {name}</p>
        <p>Email - {email}</p>
        <p>Role - {role}</p>
        <button
          type="button"
          onClick={logoutHandler}
          className="bg-red-500 text-white font-medium px-2 py-1 rounded-md my-4"
        >
          Logout
        </button>
      </div>
    </section>
  );
};

export default General;
