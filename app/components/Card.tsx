import React, { ReactNode } from "react";

interface Props {
  children: ReactNode;
  title: string;
  parag: string;
}

const Card = ({ children, title, parag }: Props) => {
  return (
    <div className="w-96 px-4 pt-5 pb-10 shadow-md shadow-teal-200 rounded-3xl mx-10 my-10 hover:-translate-y-2 transition-all duration-700">
      <div className="flex items-center justify-between mb-6 px-2">
        {children}
        <h1 className="text-teal-50 font-gothic text-center sm:text-3xl text-xl">
          {title}
        </h1>
      </div>
      <p className="text-white pl-3 tracking-wide text-left">{parag}</p>
    </div>
  );
};

export default Card;
