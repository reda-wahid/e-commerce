import { NavLink } from "react-router-dom";
const navItem = [
  { title: "Home", link: "/" },
  { title: "About", link: "/about" },
  { title: "Contact", link: "/contact" },
];

export default function NavLinks({close}) {
  return (
    <div className="grid items-center grid-cols-3 gap-4 max-md:grid-cols-1 text-center transition-all duration-300">
      {navItem.map((item) => (
        <NavLink key={item.title} to={item.link} onClick={close} className={"py-1 px-8"}>
          {item.title}
        </NavLink>
      ))}
    </div>
  );
}

