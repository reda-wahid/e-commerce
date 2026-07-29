import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import LoadingProduct from "../../Components/LoadingProduct/LoadingProduct";
import ImageProduct from "./imageProduct";
import InfoProduct from "./infoProduct";
import Product from "../../Components/SlideProducts/Product";

export default function ProdectDetails() {
  const { id } = useParams();

  const [data, setdata] = useState([]);
  const [loading, setloading] = useState(true);

  const [catdata, setcatdata] = useState([]);

  useEffect(() => {
    fetch(`https://dummyjson.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => setdata(data))
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  }, [id]);

  useEffect(() => {
    if (!data) return;
    fetch(`https://dummyjson.com/products/category/${data.category}`)
      .then((res) => res.json())
      .then((data) => {
        setcatdata(data.products);
      })
      .catch((error) => console.error(error))
      .finally(() => setloading(false));
  }, [data?.category]);

  return (
    <>
      <div className="container mx-auto">
        {loading ? (
          <LoadingProduct />
        ) : (
          <div className="w-full">
            <div className="grid grid-cols-1 md:grid-cols-[auto_1fr]   mt-12">
              <ImageProduct data={data || []} />
              <InfoProduct data={data || []} />
            </div>
            <div className="  mx-auto px-3 mt-8">
              <div className="grid gap-3">
                <h1 className="text-main_color text-4xl font-bold capitalize">
                  {data.category?.replace("-", " ")}
                </h1>
                <p className="text-p_color">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. ?
                </p>
                <hr className="bg-mauve-300 h-px  border-none" />
                {loading ? (
                  <LoadingProduct />
                ) : (
                  <div className=" grid justify-center mx-auto grid-cols-1 lg:grid-cols-2 md:grid-cols-3 xl:grid-cols-5 gap-5">
                    {catdata.map((item) => (
                      <Product key={item.id} item={item} />
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
