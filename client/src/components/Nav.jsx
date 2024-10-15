import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setUser } from "../store/slices/userSlice";

import {
  UserCircleIcon,
  BookmarkIcon,
  ArrowRightStartOnRectangleIcon,
} from "@heroicons/react/24/solid";

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.reducer.user.user);

  const logout = () => {
    localStorage.removeItem("token");
    dispatch(setUser(null));
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-transparent backdrop-blur-sm z-50 flex items-center justify-between text-blue-600 px-4 py-2">
      <Link to={"/"} className="font-bold text-2xl">
        TRADE HUB
      </Link>
      <div className="hidden sm:flex items-center gap-3">
        <Link to={"about"} className=" hover:font-bold transition-all">
          About
        </Link>
        <Link to={"contact"} className=" hover:font-bold transition-all">
          Contact
        </Link>
        <Link to={"q&a"} className=" hover:font-bold transition-all">
          Q&A
        </Link>
      </div>
      {user && (
        <div className="flex items-center gap-2">
          {user.role === "user" ? (
            <Link to={"/profile"} className="  px-2 py-1 flex items-end gap-1">
              <UserCircleIcon width={26} />
            </Link>
          ) : (
            <Link to={"/admin"} className="  px-2 py-1 flex items-end gap-1">
              <UserCircleIcon width={26} />
            </Link>
          )}
          <Link
            to={"/saved-products"}
            className="px-2 py-1 flex items-end gap-1"
            title="Save Products"
          >
            <BookmarkIcon width={26} />
          </Link>
          <ArrowRightStartOnRectangleIcon
            width={26}
            onClick={logout}
            className="text-red-600 cursor-pointer"
          />
        </div>
      )}
      {!user && (
        <div className="flex items-center justify-center gap-3 text-base font-medium text-blue-">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
