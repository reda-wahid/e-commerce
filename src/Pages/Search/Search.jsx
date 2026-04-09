import React, { useEffect, useState } from "react";
import LoadingProduct from "../../Components/LoadingProduct/LoadingProduct";
import { useLocation } from "react-router-dom";
import { lazy, Suspense } from "react";

const Product = lazy(() => import("../../Components/SlideProducts/Product"));

export default function Search() {
  const queryParams = new URLSearchParams(useLocation().search);
  const searchQuery = queryParams.get("query");
  const [loading, setLoading] = useState(true);
  const [searchResults, setsearchResults] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/search?q=${searchQuery}`)
      .then((res) => res.json())
      .then((data) => setsearchResults(data.products || []))
      .catch((error) => console.error("Error fetching search results:", error))
      .finally(()=> setLoading(false));
  }, [searchQuery]);

  return (
    <>
      {loading ? (
        <LoadingProduct />
      ) : (
        <div className="container mx-auto ">
          {searchResults.length > 0 ? (
            <div className="mt-6">
              <h2>Results for : {searchQuery}</h2>
              <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
                {searchResults.map((item) => (
                  <Suspense key={item.id} fallback={<LoadingProduct />}>
                    <Product  item={item} />
                  </Suspense>
                ))}
              </div>
            </div>
          ) : (
            <p className="text-center text-gray-500 col-span-full">
              No products found for "{searchQuery}"
            </p>
          )}
        </div>
      )}
    </>
  );
}
