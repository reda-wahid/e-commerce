import React, { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import { useNavigate, Link, useLocation } from "react-router-dom";

export default function SearchItems() {
  const navigation = useNavigate();

  const [searchItem, setsearchItem] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const location = useLocation();
  const handlechange = (e) => {
    const searchTerm = e.target.value.trim();
    setsearchItem(searchTerm);
  };
  const handleSearch = (e) => {
    e.preventDefault();

    if (searchItem) {
      navigation(`/search?query=${encodeURIComponent(searchItem)}`);
    }
  };

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (!searchItem.trim()) {
        setSuggestions([]);
        return;
      }

      try {
        const res = await fetch(
          `https://dummyjson.com/products/search?q=${searchItem}`,
        );
        const data = await res.json();
        setSuggestions(data.products.slice(0, 5) || []);
      } catch (error) {
        console.error("Search Error :", error);
        setSuggestions([]);
      }
    };

    const debonuce = setTimeout(() => {
      fetchSuggestions();
    }, 300);

    return () => clearTimeout(debonuce);
  }, [searchItem]);

  useEffect(() => {
    setSuggestions([]);
  }, [location]);

  return (
    <>
      <div className="relative w-full flex justify-center items-center">
        <div className="grid grid-cols-[1fr_60px] items-center w-full md:w-[35%] rounded-3xl border-2 border-main_color overflow-hidden ">
          <input
            type="search"
            placeholder="search for product"
            name="search"
            className="h-full w-full px-4 outline-none relative"
            onChange={handlechange}
          />
          <div
            onClick={handleSearch}
            className="p-2 px-4 text-2xl bg-main_color text-white h-full w-full cursor-pointer"
          >
            <IoMdSearch />
          </div>
        </div>
        {suggestions.length > 0 && (
          <ul className="suggestions md:w-[35%] flex flex-col rounded gap-2 absolute top-full   left-1/2 -translate-x-1/2 justify-center items-center bg-white border border-border_color rounded-b-lg p-2 z-10">
            {suggestions.map((item) => (
              <div
                key={item.id}
                className="flex justify-items-start border-b border-border_color w-full p-2 last:border-0"
              >
                <Link
                  to={`/product/${item.id}`}
                  className="flex items-center gap-2"
                >
                  <li>
                    <img className="w-8 h-8" src={item.images[0]} alt="" />
                  </li>
                  <div>{item.title}</div>
                </Link>
              </div>
            ))}
          </ul>
        )}
      </div>
    </>
  );
}
