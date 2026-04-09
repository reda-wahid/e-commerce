import React, { useEffect, useRef, useState } from "react";
import { FiAlignJustify } from "react-icons/fi";
import { IoIosArrowDown, IoMdSearch } from "react-icons/io";
import { NavLink, Link } from "react-router-dom";
import { PiSignInBold } from "react-icons/pi";
import { FaUserPlus } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaRegHeart } from "react-icons/fa";
import { TiShoppingCart } from "react-icons/ti";

const navItem = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

export default function Header() {
  const { cartItems, favoriteItems } = useContext(CartContext);
  const select = useRef();
  const [activeCat, setActiveCat] = useState(false);
  const [active, setActive] = useState(false);
  const [categourys, setcategourys] = useState([]);
  function HandleCategoury() {
    setActiveCat(!activeCat);
    select.current.classList.toggle("hidden");
  }

  const HandleNav = () => {
    setActive(!active);
  };

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then((data) => setcategourys(data));
  }, []);
  return (
    <>
      <div className="bg-main_color   p-4 text-white text-3xl">
        {active ? (
          <div className="flex-nowrap py-8 md:hidden gap-3 justify-center items-start h-screen">
            <IoCloseSharp onClick={HandleNav} />
            <div className="flex-nowrap justify-between items-center">
              <div className="grid grid-cols-[1fr_60px] items-center justify-center my-4 w-full rounded-3xl border-2 border-border_color overflow-hidden">
                <input
                  type="search"
                  placeholder="search for product"
                  name="search"
                  className="h-full w-full px-4 outline-none "
                />
                <div className="p-2 px-4 text-2xl bg-main_color text-white h-full w-full cursor-pointer">
                  <IoMdSearch />
                </div>
              </div>
            </div>

            <div
              onClick={HandleCategoury}
              className="flex items-center justify-center w-full gap-4 cursor-pointer relative"
            >
              <FiAlignJustify />
              <p className="text-lg">Browser Categoury</p>
              <IoIosArrowDown />
              <div
                ref={select}
                className="hidden bg-white w-full ease-in-out duration-100  z-10 transition-all transition-discrete  border overflow-y-auto h-96 text-color_heading py-0.5 border-border_color absolute top-9 left-0  text-center  grid grid-cols-1 "
              >
                {categourys.map((item) => (
                  <NavLink
                    onClick={HandleNav}
                    to={`categourys/${item.slug}`}
                    key={item.slug}
                    className="border-b-2 border-border_color py-2 h-14"
                  >
                    <span>{item.name}</span>
                  </NavLink>
                ))}
              </div>
            </div>
            <div className=" flex-wrap justify-center  gap-8">
              {navItem.map((item) => (
                <div
                  key={item.title}
                  className="border-b-2 border-b-red-500"
                  onClick={HandleNav}
                >
                  <NavLink to={`${item.link.toLocaleLowerCase()}`}>
                    {item.title}
                  </NavLink>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="md:hidden flex justify-between">
            <FiAlignJustify onClick={HandleNav} />

            <div className="flex items-center text-3xl gap-4">
              <div className="relative cursor-pointer">
                <Link to="/favorts">
                  <FaRegHeart />
                  <span className=" absolute -top-2.5 -right-2.5 text-sm text-white text-center p-.5 w-6 h-6 bg-red-400 rounded-full">
                    {favoriteItems.length}
                  </span>
                </Link>
              </div>
              <div className="relative cursor-pointer">
                <Link to="/cart">
                  <TiShoppingCart />
                  <span className=" absolute -top-2.5 -right-2.5 text-sm text-white text-center p-.5 w-6 h-6 bg-red-400 rounded-full">
                    {cartItems.length}
                  </span>
                </Link>
              </div>
            </div>
          </div>
        )}

        {active ? (
          <div className="res"></div>
        ) : (
          <div className=" container mx-auto  max-md:hidden   text-white  py-2 text-xl flex gap-12 justify-between">
            <div className="flex gap-14 ">
              <div
                onClick={HandleCategoury}
                className="flex items-center gap-4 cursor-pointer relative"
              >
                <FiAlignJustify />
                <p className="text-lg">Browser Categoury</p>
                <IoIosArrowDown />
                <div
                  ref={select}
                  className="hidden bg-white ease-in-out duration-100  z-10 transition-all transition-discrete  border overflow-y-auto h-96 text-color_heading py-0.5 border-border_color absolute top-13.5 left-0 max-w-full w-56 text-center  grid grid-cols-1 "
                >
                  {categourys?.map((item) => (
                    <NavLink
                      to={`categourys/${item.slug}`}
                      key={item.name}
                      className="border-b-2 border-border_color py-2 h-14"
                    >
                      <span>{item.name.replace("-", " ")}</span>
                    </NavLink>
                  ))}
                </div>
              </div>
              <div className="flex gap-8">
                {navItem.map((item) => (
                  <div key={item.title}>
                    <NavLink to={`${item.link.toLocaleLowerCase()}`}>
                      {item.title}
                    </NavLink>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex gap-8">
              <Link to="/">
                <PiSignInBold />
              </Link>
              <Link to="/">
                <FaUserPlus />
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
