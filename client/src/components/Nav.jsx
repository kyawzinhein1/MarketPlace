import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserCircleIcon } from "@heroicons/react/24/solid";

const Nav = () => {
  const user = useSelector((state) => state.reducer.user.user);

  return (
    <nav className="text-blue-600 flex items-center justify-between p-4">
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
        <>
          {user.role === "user" ? (
            <Link to={"/profile"} className="  px-2 py-1 flex items-end gap-1">
              <UserCircleIcon width={26} />
              Profile
            </Link>
          ):
          (
            <Link to={"/admin"} className="  px-2 py-1 flex items-end gap-1">
              <UserCircleIcon width={26} />
              Admin Pannel
            </Link>
          )}
        </>
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
