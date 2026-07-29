import { useState, useContext, useEffect } from "react";
import { CartContext } from "../../context/CartContext";
import {
  getLoggedUser,
  getUsers,
  saveUsers,
} from "../../services/LocalStordge";
import useCategories from "../../Hooks/useCategories";

import DesktopMenu from "./DeskMenue";
import MobileMenu from "./MobileMenu";
import { FiAlignJustify } from "react-icons/fi";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";
import { IoCloseSharp } from "react-icons/io5";

export default function Header() {
  const { cartItems, favoriteItems } = useContext(CartContext);

  const [user, setUser] = useState(null);
  const [openCat, setOpenCat] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const categories = useCategories();

  useEffect(() => {
    setUser(getLoggedUser());
  }, []);

  const logout = () => {
    const updated = getUsers().map((u) => ({
      ...u,
      isLoggedIn: false,
    }));
    saveUsers(updated);
    setUser(null);
  };

  return (
    <div className="bg-main_color text-white p-4 sticky top-0 z-50 bg-linear-240 from-main_color  via-[#1e293b] to-[#0f172a]">
      <AnimatePresence>
        <div className="flex justify-between md:hidden ">
          <img
            width={80}
            height={40}
            loading="lazy"
            src={"./logo.png"}
            alt="logo"
            className=" object-cover cursor-pointer "
          />
          {mobileOpen ? (
            <IoCloseSharp
              onClick={() => setMobileOpen(false)}
              className="text-[28px] bg-white/30 p-1 rounded-full scroll-m-0"
            />
          ) : (
            <button className=" text-2xl " onClick={() => setMobileOpen(true)}>
              <FiAlignJustify />
            </button>
          )}
        </div>
        {mobileOpen ? (
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: "7%", opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{
              duration: 0.4,
              ease: "easeInOut",
            }}
            className="fixed inset-14 top-15 right-0 h-[calc(100%-60px)] w-full  backdrop-blur-sm z-40  "
          >
            <MobileMenu
              className="grid justify-end"
              cartItems={cartItems}
              favoriteItems={favoriteItems}
              user={user}
              logout={logout}
              close={() => setMobileOpen(false)}
            />
          </motion.div>
        ) : (
          <>
            <DesktopMenu
              categories={categories}
              openCat={openCat}
              setOpenCat={setOpenCat}
              cartItems={cartItems}
              favoriteItems={favoriteItems}
              user={user}
              logout={logout}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
