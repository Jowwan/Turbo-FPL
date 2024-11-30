"use client";
import Image from "next/image";
import React from "react";

const PlayerCard = ({
  photo,
  name,
  score,
  multiplier,
}: {
  photo: string;
  name: string;
  score: number;
  multiplier: number;
}) => {
  function transformString(inputString: string) {
    const index = inputString.indexOf("-");

    return index !== -1 ? inputString.substring(index + 1) : inputString;
  }

  function transformString2(inputString: string) {
    const index = inputString.indexOf(" ");

    return index !== -1 ? inputString.substring(index + 1) : inputString;
  }

  return (
    <div>
      <div
        className={`flex flex-col items-center md:w-32  sm:w-20  w-14 ${
          multiplier > 1 ? "bg-cyan-100" : "bg-rose-100"
        } rounded-3xl bg-opacity-35 pt-4 border-2 pb-5 border-sky-950`}
      >
        <Image
          className="px-2 md:w-24 sm:w-16 w-12"
          unoptimized
          width={77}
          height={98}
          alt="player-image"
          src={`https://corsproxy.io/?https://resources.premierleague.com/premierleague/photos/players/110x140/p${photo.slice(
            0,
            -3
          )}png`}
        />
        <h1 className="font-bold text-black md:text-lg sm:text-sm text-xs sm:px-2 w-full border-t-2 border-black mt-2">
          {multiplier > 1 ? (
            <span>
              {transformString2(transformString(name))}
              <span className="md:visible collapse">
                <span>&nbsp;&nbsp;</span>
                <span className="bg-white rounded-full px-1 ">C</span>
              </span>
            </span>
          ) : (
            <span>{transformString2(transformString(name))}</span>
          )}
        </h1>
      </div>
      <p className="md:text-md lg:text-lg sm:text-sm text-xs py-1 w-full bg-black  text-cyan-50 -mt-5">
        {score}
      </p>
    </div>
  );
};

export default PlayerCard;
