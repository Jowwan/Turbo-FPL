"use client";

import { useState } from "react";
import MenuIcon from "./MenuIcon";
import Logo from "./Logo";
import NavMain from "./NavMain";
import NavEl from "./NavEl";

function NavBar() {
  const [navbar, setNavbar] = useState<boolean>(false);
  return (
    <div>
      <nav
        className={`w-full bg-black fixed top-0 left-0 right-0 z-10 py-2 ${
          navbar ? "" : "h-22"
        }`}
      >
        <div className="justify-between px-4 ml-auto mr-auto lg:max-w-7xl md:items-center md:flex md:px-8">
          <div>
            <div className="flex items-center justify-between py-3 md:py-5 md:block">
              <Logo />
              <MenuIcon setNavbar={setNavbar} navbar={navbar} />
            </div>
          </div>
          <div>
            <NavMain navbar={navbar}>
              <NavEl setNavbar={setNavbar} path="my-team">
                My Team
              </NavEl>
              <NavEl setNavbar={setNavbar} path="opta-stats">
                Opta Stats
              </NavEl>
              <NavEl setNavbar={setNavbar} path="price-changes">
                Price Changes
              </NavEl>
              <NavEl setNavbar={setNavbar} path="predicted-points">
                Predicted Points
              </NavEl>
            </NavMain>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default NavBar;
