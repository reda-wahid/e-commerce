import { useContext, useMemo } from "react";
import { FaCartArrowDown, FaRegHeart, FaShare } from "react-icons/fa";
import { FaStar, FaRegStarHalfStroke } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { CartContext } from "../../context/CartContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Product({ item }) {
  const handleproduct = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const showToastMessage = (cat) => {
    toast.success(`added ${item.title} ${cat}`, {
      position: "bottom-right",
    });
  };
  const showToasterror = (cat) => {
    toast.error(`removed ${item.title} ${cat}`, {
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

  const existingFavoriteItem = useMemo(() => {
    return favoriteItems.some((favoriteItem) => favoriteItem.id === item.id);
  });
  const existingCartItem = useMemo(() => {
    return cartItems.some((cartItem) => cartItem.id === item.id);
  });
  const handleFavItem = () => {
   if (existingFavoriteItem) {
  handleRemoveFavorite(item.id);
  showToasterror("from favorites");
} else {
  addToFavorite(item);
  showToastMessage("to favorites");
}
  };

const handleCart = () => {
  if (existingCartItem) return;

  addToCart(item);
  showToastMessage("to cart");
};
  return (
    <>
      <div className="cart relative border  hover:border-main_color rounded-xl border-border_color p-4 mb-4 sm:max-w-80 w-full">
        <span
          className={` ${existingCartItem ? "absolute top-2 left-[50%] transform translate-x-[-50%] text-main_color" : "hidden"}`}
        >
          incart
        </span>
        <div className=" grid gap-4 ">
          <Link to={`/product/${item.id}`} onClick={handleproduct}>
            <img
              src={item.thumbnail}
              alt={item.title}
              loading="lazy"
              className="max-w-72 bg-cover min-h-48 text-center w-full "
            />

            <div className="text-p_color line-clamp-1">{item.title}</div>
            <div className="starts flex gap-2 text-amber-300 ">
              <FaStar />
              <FaStar />
              <FaStar />
              <FaStar />
              <FaRegStarHalfStroke />
            </div>
            <div className="price text-main_color text-2xl">${item.price}</div>
          </Link>
        </div>

        <div className="icons ">
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
