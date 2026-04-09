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
        <div className="grid justify-center  grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5  px-4 mx-auto  gap-5 mt-6">
          {favoriteItems.map((item) => (
            <Suspense key={item.id} fallback={<LoadingProduct />}>
              <Product className="w-dvw md:max-w-80 " item={item} />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
}
