import { Link } from "react-router-dom";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import UserMenu from "./UserMenu";

export default function Actions({ cartItems, favoriteItems, user, logout }) {
  return (
    <div className="flex items-center justify-around gap-4">
      <Link to="/favorts" className="relative text-2xl">
        <FaRegHeart />
        <span className="absolute -top-2.5 -right-2.5 text-sm text-white text-center p-.5 w-6 h-6 bg-red-400 rounded-full">{favoriteItems.length}</span>
      </Link>

      <Link to="/cart" className="relative text-2xl">
        <TiShoppingCart />
        <span className="absolute -top-2.5 -right-2.5 text-sm text-white text-center p-.5 w-6 h-6 bg-red-400 rounded-full">{cartItems.length}</span>
      </Link>

      <UserMenu user={user} logout={logout} />
    </div>
  );
}