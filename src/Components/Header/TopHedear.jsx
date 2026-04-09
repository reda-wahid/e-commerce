import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import SearchItems from "./SearchItems";

export default function TopHedear() {
  const { cartItems, favoriteItems } = useContext(CartContext);

  return (
    <>
      <div className="top container max-h-24 hidden md:container md:flex justify-between  mx-auto my-5">
        <img
          width={120}
          height={60}
          loading="lazy"
          src={"./logo.png"}
          alt="logo"
          className=" object-cover cursor-pointer"
        />
        <SearchItems />
        <div className="flex items-center text-3xl gap-4">
          <div className="relative cursor-pointer">
            <Link to="/favorts">
              <FaRegHeart />
              <span className=" absolute -top-2.5 -right-2.5 text-sm text-white text-center p-.5 w-6 h-6 bg-main_color rounded-full">
                {favoriteItems.length}
              </span>
            </Link>
          </div>
          <div className="relative cursor-pointer">
            <Link to="/cart">
              <TiShoppingCart />
              <span className=" absolute -top-2.5 -right-2.5 text-sm text-white text-center p-.5 w-6 h-6 bg-main_color rounded-full">
                {cartItems.length}
              </span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
