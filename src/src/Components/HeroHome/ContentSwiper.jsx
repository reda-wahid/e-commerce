import { NavLink } from "react-router-dom";

export default function ContentSwiper() {
  return (
    <>
      <div className="content absolute top-12 md:top-20 md:left-12 left-4 grid md:gap-8 gap-8">
        <h4 className="text-color_heading">Introducing the new</h4>
        <h3 className="text-main_color text-2xl md:text-4xl">
          Microsoft Xbox <br /> 360 Controller{" "}
        </h3>
        <p className="text-p_color">Windows Xp/10/7/8 Ps3, Tv Box</p>
        <button className="max-md:hidden btn w-fit text-white rounded-full px-8  p-3 mt-4 bg-linear-240 from-main_color  via-[#1e293b] to-[#0f172a] hover:scale-105 hover:text-color_heading transition-all duration-300">
          <NavLink to="/products">Shop Now</NavLink>
        </button>
      </div>
    </>
  );
}
