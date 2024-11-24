import Link from "next/link";
import React, { ReactNode } from "react";

interface Props {
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  children: ReactNode;
  path: string;
}

const NavEl: React.FC<Props> = ({ setNavbar, children, path }) => {
  return (
    <li className="text-xl text-white py-2 px-6 text-center  border-b-2 md:border-b-0   border-cyan-200  md:hover:text-black font-bold  md:hover:bg-cyan-200 hover:rounded-full transition-all duration-300">
      <Link href={`/${path}`} onClick={() => setNavbar((navbar) => !navbar)}>
        {children}
      </Link>
    </li>
  );
};

export default NavEl;
