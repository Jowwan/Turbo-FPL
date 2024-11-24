"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

const FormTeam = () => {
  const [id, setId] = useState();
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  const handleOnChange = (e: any) => {
    setId(e.target.value);
  };

  const handleOnSubmit = (e: any) => {
    e.preventDefault();

    if (id && id < 10512520 && id > 1) router.push(`my-team/${id}`);
    else setErrorMsg("Team Not Found !");
  };

  return (
    <>
      <form className="max-w-md mx-auto text-center" onSubmit={handleOnSubmit}>
        <div className="mb-5">
          <label className="block mb-12 text-xl sm:text-3xl font-bold text-stone-100">
            Enter your FPL ID
          </label>
        </div>
        <div className="flex justify-center sm:justify-between flex-wrap">
          <input
            type="number"
            className="shadow-sm mt-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-60 p-2.5"
            required
            value={id}
            onChange={handleOnChange}
          />
          <button
            type="submit"
            className="text-white mt-6 bg-blue-950 hover:bg-blue-900 font-bold transition-all duration-700 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-lg px-5 py-2.5 text-center"
          >
            View your team
          </button>
        </div>
      </form>
      <h1 className="text-center text-xl text-red-900 mt-10 font-extrabold ">
        {errorMsg}
      </h1>
    </>
  );
};

export default FormTeam;
