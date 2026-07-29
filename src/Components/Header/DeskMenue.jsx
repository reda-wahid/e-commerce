import NavLinks from "./NavLinks";
import CategoriesDropdown from "./CategoriesDropdown";
import Actions from "./Actions";
import UserMenu from "./UserMenu";

export default function DesktopMenu({
  categories,
  navItem,
  openCat,
  setOpenCat,
  user,
  logout,
}) {
  return (
    <div className="hidden md:flex grid justify-between container mx-auto ">
      <div className="flex gap-10">
        <CategoriesDropdown 
          categories={categories}
          open={openCat}
          toggle={() => setOpenCat(!openCat)}
        />
        <NavLinks links={navItem} />
      </div>

      <UserMenu user={user} logout={logout} />
    </div>
  );
}
