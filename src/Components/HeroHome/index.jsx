// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

import { EffectFade, Autoplay, Pagination } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

import ContentSwiper from "./ContentSwiper";
import AOS from "aos";
import "aos/dist/aos.css";

export default function HeroHome() {
  AOS.init({
    offset: 200,
    duration: 600,
    easing: "ease-in-sine",
    delay: 100,
  });
  return (
    <Swiper
      spaceBetween={30}
      loop={true}
      effect={"fade"}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
      modules={[EffectFade, Pagination, Autoplay]}
      className="w-full  container  mx-auto mt-8 max-sm:h-svw md:h-full mb-12 "
      data-aos="zoom-in-up"
    >
      <SwiperSlide className="relative  ">
        <ContentSwiper />

        <img
          loading="lazy"
         
          className={" md:object-cover h-full"}
          src={"./banner_Hero1.jpg"}
          alt="slider hero 1"
        />
      </SwiperSlide>
      <SwiperSlide className="relative ">
        <ContentSwiper />
        <img
          loading="lazy"
          src={"./banner_Hero2.jpg"}
          alt="slider hero 1"
    
          className={" md:object-cover h-full"}
        />
      </SwiperSlide>
      <SwiperSlide className="relative">
        <ContentSwiper />
        <img
          loading="lazy"
          src={"./banner_Hero3.jpg"}
          alt="slider hero 1"
    
          className={" md:object-cover h-full"}
        />
      </SwiperSlide>
    </Swiper>
  );
}
