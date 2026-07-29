import { useEffect, useState } from "react";

export default function useCategories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => res.json())
      .then(setCategories);
  }, []);

  return categories;
}