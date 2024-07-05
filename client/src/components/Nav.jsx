import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import { UserCircleIcon } from "@heroicons/react/24/solid";
const Nav = () => {
  const {user} = useSelector((state) => state.reducer.user);
  return (
    <nav className="bg-blue-500 flex items-center justify-between p-4">
      <Link to={"/"} className="font-bold text-2xl">
        POINT.IO
      </Link>

      {user ? (
        <Link
          to={"/profile"}
          className="flex items-center justify-center gap-1 text-white"
        >
          <UserCircleIcon width={20} />
          Profile
        </Link>
      ) : (
        <div className="flex items-center justify-center gap-3 text-base font-medium text-white">
          <Link to={"/login"}>Login</Link>
          <Link to={"/register"}>Register</Link>
        </div>
      )}
    </nav>
  );
};

export default Nav;
