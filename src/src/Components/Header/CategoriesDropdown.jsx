import { FiAlignJustify } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
import useCategories from "../../Hooks/useCategories";
import { AnimatePresence , motion } from "motion/react";

export default function CategoriesDropdown({ open, toggle }) {
  const categories = useCategories();

  return (
    <div className="relative">
      <div onClick={toggle} className="flex items-center gap-2 cursor-pointer">
        <FiAlignJustify />
        <p className="text-lg">Browser Category</p>
        <IoIosArrowDown />
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.3 }}
            key="box"
          >
            <div className="absolute top-13 left-0 bg-white ease-in-out duration-100  z-10 transition-all transition-discrete  border overflow-x-hidden h-96 text-color_heading py-0.5 border-border_color   max-w-full w-56 text-center ">
              {categories.map((item) => (
                <div
                  key={item.name}
                  className="border-b-2 border-border_color py-2 h-12"
                >
                  <Link to={`categourys/${item.slug}`}>
                    {item.name.replace("-", " ")}
                    <br />
                  </Link>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
