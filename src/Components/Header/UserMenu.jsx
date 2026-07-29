import { Link } from "react-router-dom";
import { FaUserPlus } from "react-icons/fa6";
import { PiSignInBold } from "react-icons/pi";

export default function UserMenu({ user, logout }) {
  if (user) {
    return (
      <div className="flex items-center gap-3">
        <button
          onClick={logout}
          className="flex items-center gap-2 bg-white p-2 rounded-full text-main_color cursor-pointer"
        >
          <PiSignInBold />
        </button>
        <img src="./user.jfif" className="w-9 h-9 rounded-full" />
      </div>
    );
  }

  return (
    <Link to="/auth/login" className="flex items-center gap-2 bg-white/20 p-2 rounded-xl backdrop-blur-md">
     LogIn <FaUserPlus /> 
    </Link>
  );
}
