import React from "react";

interface Props {
  setNavbar: React.Dispatch<React.SetStateAction<boolean>>;
  navbar: boolean;
}

const MenuIcon: React.FC<Props> = ({ navbar, setNavbar }) => {
  return (
    <div className="md:hidden">
      <button
        className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
        onClick={() => setNavbar(!navbar)}
      >
        {navbar ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 18 18 6M6 6l12 12"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-10 text-white"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default MenuIcon;
