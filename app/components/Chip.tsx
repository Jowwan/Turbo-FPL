import Image from "next/image";
import React from "react";

const Chip = ({
  name,
  code,
  status,
}: {
  name: string;
  code: string;
  status: string;
}) => {
  return (
    <div className="text-center flex flex-col items-center">
      <Image
        className="md:w-28  w-16 mb-2 text-cyan-950 -hue-rotate-90 opacity-85"
        unoptimized
        width={30}
        height={30}
        alt={name}
        src={`https://corsproxy.io/?https://fantasy.premierleague.com/img/chips/${code}Inactive-120.png`}
      />
      <p className="md:text-xl text-md font-gothic mb-3 text-white">{name}</p>
      <p
        className={`font-extrabold md:text-lg text-sm px-4 py-2 rounded-xl ${
          status == "Used"
            ? "bg-red-500"
            : status == "Unavailable"
            ? "bg-slate-400"
            : "bg-blue-950 bg-opacity-70"
        }  text-teal-50`}
      >
        {status}
      </p>
    </div>
  );
};

export default Chip;
