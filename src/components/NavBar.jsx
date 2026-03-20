import React from "react";
import { NAVBAR_MENU } from "../layout/MenuItems";
import { NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <div className="border px-4 py-2 w-fit flex mx-auto">
      <div className="flex flex-row gap-6">
        {NAVBAR_MENU.map((item, index) => (
          <NavLink key={item.key} to={item.url} className="text-xl">
            {item.label}
          </NavLink>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
