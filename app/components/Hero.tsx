import Link from "next/link";
import React from "react";

const Hero = () => {
  return (
    <div className="bg-kdbLanding bg-cover h-120 bg-center">
      <div className="text-center">
        <p className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl text-slate-200 mb-120 text-center pt-14 font-gothic mx-10">
          Winning FPL Has Never Been Easier
        </p>
        <p className="-mt-56">
          <Link
            href="/my-team"
            className="text-xl cursor-pointer text-teal-100 bg-black px-6 py-4 rounded-full hover:underline font-gothic"
          >
            Start Now &#8594;
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Hero;
