import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Navigation } from "swiper/modules";

import { lazy, Suspense } from "react";
import LoadingProduct from "../../Components/LoadingProduct/LoadingProduct";

const Product = lazy(() => import("./Product"));

function CartProduct({ products = [] }) {
  return (
    <>
      <div className=" w-[90.5lvw]  mb-6 mx-auto  overflow-x-hidden">
        <Swiper
          loop={products.length > 4}
          spaceBetween={20}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          breakpoints={{
            640: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1280: { slidesPerView: 5 },
          }}
          navigation={true}
          modules={[Navigation]}
          className="mySwiper  w-[80lvw] md:w-[90.5lvw]  "
        >
          {products?.map((item) => {
            return (
              <SwiperSlide key={item.id} className="p-4">
                <Suspense fallback={<LoadingProduct />}>
                  <Product item={item} />
                </Suspense>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </>
  );
}
export default React.memo(CartProduct);
