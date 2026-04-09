import { useEffect, useState } from "react";
import CategouryProducts from "./CategouryProducts";
import CartProduct from "./CartProduct";
import LoadingProduct from "../LoadingProduct/LoadingProduct";
import AOS from "aos";
import "aos/dist/aos.css";

const categoury = [
  "smartphones",
  "mobile-accessories",
  "laptops",
  "tablets",
  "sunglasses",
  "sports-accessories",
];
export default function SlideProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    AOS.init({
      offset: 200,
      duration: 600,
      easing: 'ease-in-sine',
      delay: 100,
    });
  },[products])
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const results = await Promise.all(
          categoury.map(async (category) => {
            const res = await fetch(
              `https://dummyjson.com/products/category/${category}`,
            );
            const data = await res.json();
            return { [category]: data.products };
          }),
        );

        const productsData = Object.assign({}, ...results);
        setProducts(productsData);
      } catch (error) {
        console.error("Erorr Fetching", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div><LoadingProduct/></div>;

  return (
    <>
      <div className="  px-3 w-[91.5lvw]  mb-6 mx-auto" >
        {categoury?.map((item) => (
          <div key={item} className="w-11/12 grid gap-3" data-aos="zoom-in-up">
            <h1 className="text-main_color text-4xl font-bold capitalize">
              {item.replace("-", " ")}
            </h1>
            <p className="text-p_color">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. ?
            </p>
            <hr className="bg-mauve-300 h-px  border-none w-11/12" />

            <div color="p-4">
              <CartProduct
                products={products[item] || []}
                categoury={categoury}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
