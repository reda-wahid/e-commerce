import { useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import CategoriesDropdown from "./CategoriesDropdown";
import NavLinks from "./NavLinks";

import Actions from "./Actions";
import { FiAlignJustify } from "react-icons/fi";
import SearchItems from "./SearchItems";

export default function MobileMenu({
  cartItems,
  favoriteItems,
  user,
  logout,
  close
}) {
  const [activeCat, setActiveCat] = useState(false);
 

  function HandleCategoury() {
    setActiveCat(!activeCat);
    
  }


  return (

  
      <div
        className={`flex-nowrap justify-center  items-center h-screen  z-50 p-8 bg-linear-240 from-main_color  via-[#1e293b] to-[#0f172a] fixed  w-4/5 duration-2000 transition-all`}
      >
        <Actions
          cartItems={cartItems}
          favoriteItems={favoriteItems}
          user={user}
          logout={logout}
        
        />
        <div className="grid mt-8 grid-cols-[1fr_10px] shadow-sm shadow-white items-center justify-center my-4 w-full rounded-3xl border-2 border-border_color overflow-hidden">
          <SearchItems />
        </div>

        <div className="flex gap-14 justify-center items-center w-full h-24">
          <CategoriesDropdown open={activeCat} toggle={HandleCategoury} />
        </div>
        <NavLinks close={close}  />
      </div>

    
 
  );
}
