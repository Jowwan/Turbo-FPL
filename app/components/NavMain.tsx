import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  navbar: boolean;
}

const NavMain: React.FC<Props> = ({ children, navbar }) => {
  return (
    <div
      className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
        navbar ? "p-12 md:p-0 block" : "hidden"
      }`}
    >
      <ul className="h-screen md:h-auto items-center justify-center md:flex gap-4">
        {children}
      </ul>
    </div>
  );
};

export default NavMain;
