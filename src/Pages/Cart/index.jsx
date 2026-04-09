import React, { useContext } from "react";
import { CartContext } from "../../context/CartContext";
import { FaMinus } from "react-icons/fa";
import { FaPlus } from "react-icons/fa";
import { RiDeleteBin5Fill } from "react-icons/ri";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Cart() {
  const { cartItems, DecreaseQuantity, IncreaseQuantity, handleRemoveCart } =
    useContext(CartContext);
  AOS.init({
    offset: 200,
    duration: 600,
    easing: "ease-in-sine",
    delay: 100,
  });
  return (
    <>
      <div className="md:container mx-auto px-2 mb-4" data-aos="zoom-in-up">
        <div className="flex justify-between items-center mt-4">
          <h1 className="text-main_color text-3xl  font-bold">Order Summary</h1>
          <div className="text-blue-600">
            Total: $
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}
          </div>
        </div>
        {cartItems.length === 0 ? (
          <p>Your Cart Is Empty</p>
        ) : (
          <table className="md:w-full overflow-y-auto max:h-dvh border-collapse border border-border_color mt-4">
            <thead>
              <tr className="border-b-2 border-border_color py-4">
                <th className="py-4">product</th>

                <th>Quantity</th>
              </tr>
            </thead>
            <tbody className="  ">
              {cartItems.map((item) => (
                <tr
                  key={item.id}
                  className="border m-2 border-border_color relative"
                >
                  <td>
                    <div className="flex items-center justify-items-start text-start gap-4 py-2">
                      <img
                        src={item.thumbnail}
                        loading="lazy"
                        width="72"
                        height="64"
                        className="object-cover p-2 bg-bg_color object-center rounded-xl mx-4"
                      />

                      <div>
                        {item.title}
                        <div>{item.price.toFixed(2)}</div>
                      </div>
                    </div>
                  </td>

                  <td>
                    <div className="flex items-center justify-center gap-3 py-2 text-2xl">
                      <div
                        onClick={() => DecreaseQuantity(item.id)}
                        className="rounded-4xl text-white  text-2xl p-2 bg-main_color "
                      >
                        <FaMinus />
                      </div>
                      {item.quantity}
                      <div
                        onClick={() => IncreaseQuantity(item.id)}
                        className="rounded-4xl text-white  text-2xl p-2 bg-main_color "
                      >
                        <FaPlus />
                      </div>
                    </div>
                  </td>
                  <td>
                    <RiDeleteBin5Fill
                      onClick={() => handleRemoveCart(item.id)}
                      className=" cursor-pointer text-3xl text-red-600 "
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
