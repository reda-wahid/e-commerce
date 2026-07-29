import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { lazy, Suspense } from "react";
import LoadingProduct from "../../Components/LoadingProduct/LoadingProduct";

const Product = lazy(() => import("../../Components/SlideProducts/Product"));
import AOS from "aos";
import "aos/dist/aos.css";

export default function Favorts() {
  const { favoriteItems } = useContext(CartContext);
  AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  return (
    <>
      <div className="w-full container mx-auto" data-aos="zoom-in-up">
        {
          favoriteItems.length > 0 ? (
              <div className="grid justify-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  px-4 mx-auto  gap-5 mt-6">
          {favoriteItems.map((item) => (
            <Suspense key={item.id} fallback={<LoadingProduct />}>
              <Product className="w-dvw md:max-w-80 " item={item} />
            </Suspense>
          ))}
        </div>
          ): (

          <div className="m-4">
           <h1 className="text-main_color text-3xl  font-bold">Favourites </h1>
              <div className="flex flex-col items-center justify-center gap-4 mt-16">
            <img height={"30%"} width={"30%"} className=" object-cover h-1/3 " src="./fav_padge.jpg" alt="empty fav"/>
            <p className="text-xl font-semibold text-black/80">Your Favourites Is Empty...</p>
          </div>
          </div>
          )
        }
      </div>
    </>
  );
}
