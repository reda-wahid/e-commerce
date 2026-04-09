import React, { useContext } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaRegHeart,
  FaRegStarHalfStroke,
  FaShare,
  FaStar,
} from "react-icons/fa6";
import { FaCartArrowDown } from "react-icons/fa";
import { CartContext } from "../../context/CartContext";

export default function infoProduct({ data }) {
  const showToastMessage = (cat) => {
    toast.success(`added ${data.title} ${cat}`, {
      position: "bottom-right",
    });
  };
  const showToasterror = (cat) => {
    toast.error(`removed ${data.title} ${cat}`, {
      position: "bottom-right",
    });
  };
  const {
    addToCart,
    cartItems,
    addToFavorite,
    favoriteItems,
    handleRemoveFavorite,
  } = useContext(CartContext);
  const existingFavoriteItem = favoriteItems.some(
    (favoriteItem) => favoriteItem.id === data.id,
  );
  const existingCartItem = cartItems.some(
    (cartItem) => cartItem.id === data.id,
  );
  const handleFavItem = () => {
    existingFavoriteItem
      ? (handleRemoveFavorite(data.id), showToasterror("from favorites"))
      : (addToFavorite(data), showToastMessage("to favorites"));
  };
  const handleCart = () => {
    addToCart(data);
    showToastMessage("to cart");
  };
  return (
    <>
      <div className="px-4 grid  pt-9">
        <h1 className="text-4xl font-bold text-main_color">{data.title}</h1>
        <div className="stars flex gap-6 text-amber-400">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaRegStarHalfStroke />
        </div>
        <span className="text-p_color">${data.price}</span>
        <div>
          Availability: <span>{data.availabilityStatus}</span>
        </div>
        <div>
          Brand: <span>{data.brand}</span>
        </div>
        <div>
          Availability: <span>{data.availabilityStatus}</span>
        </div>
        <p className="text-p_color">{data.description}</p>
        <h4 className=" text-main_color">
          Hurry Up! Only <span>{data.stock}</span> products left in stock
        </h4>
        <button
          onClick={handleCart}
          className={`bg-main_color px-5 ${existingCartItem ? "disabled opacity-55" : " cursor-pointer  hover:scale-105 duration-300 transition-all hover:text-red-600"} text-white w-52 rounded-4xl`}
        
        >
          Add To Cart
        </button>
        <div className="icon  flex gap-6 mt-5">
          <span
            className={` btnIcon ${existingCartItem ? "disable" : "hover:text-red-500"}`}
            onClick={handleCart}
          >
            <FaCartArrowDown />
          </span>
          <span
            className={`btnIcon ${existingFavoriteItem ? "favRemoved " : "hover:text-red-500"}`}
            onClick={handleFavItem}
          >
            <FaRegHeart />
          </span>
          <span className="btnIcon">
            <FaShare />
          </span>
        </div>
      </div>
    </>
  );
}
