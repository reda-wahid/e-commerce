import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingProduct from "../../Components/LoadingProduct/LoadingProduct";
import { lazy, Suspense } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import Product from "../../Components/SlideProducts/Product";

const CartProduct = lazy(
  () => import("../../Components/SlideProducts/CartProduct"),
);

export default function Categourys() {
  const [data, setdata] = useState([]);
  const { cat } = useParams();

  useEffect(() => {
    AOS.init({
      offset: 200,
      duration: 600,
      easing: "ease-in-sine",
      delay: 100,
    });
  }, []);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/category/${cat}`)
      .then((res) => res.json())
      .then((data) => setdata(data.products))
      .catch((error) => console.error(error));
  }, [cat]);
  

  return (
    <>
      <div className="container mx-auto px-3 mt-8" data-aos="zoom-in-up">
        <div className="grid gap-3">
          <h1 className="text-main_color text-4xl font-bold capitalize">
            {cat.replace("-", " ")}
          </h1>
          <p className="text-p_color">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. ?
          </p>
          <hr className="bg-mauve-300 h-px  border-none" />
          {data.map((item) => (
            <Suspense key={item.id} fallback={<LoadingProduct />}>
              <Product item={item || []} />
            </Suspense>
          ))}
        </div>
      </div>
    </>
  );
}
