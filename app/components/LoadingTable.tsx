import React from "react";

const LoadingTable = () => {
  return (
    <div className="max-w-110 overflow-y-auto max-h-120 mx-auto rounded-lg shadow-2xl">
      <table className="text-sm mx-auto text-center rtl:text-right text-gray-700 table-fixed border-collapse w-full blur-md">
        <thead className="text-sm text-black uppercase bg-gray-50 font-xl sticky top-0 font-extrabold">
          <tr>
            <th scope="col" className="px-6 py-3">
              Player Name
            </th>
            <th scope="col" className="px-6 py-3">
              Current Cost
            </th>
            <th scope="col" className="px-6 py-3">
              Progress
            </th>
            <th scope="col" className="px-6 py-3">
              Change time
            </th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 15 }).map((_, index) => (
            <tr key={index} className="odd:bg-white even:bg-blue-50">
              <th
                scope="row"
                className="px-6 py-4 text-gray-800 whitespace-nowrap font-bold"
              >
                Haaland
              </th>
              <td className="px-6 py-4">15.6</td>
              <td className="px-6 py-4">12.23</td>
              <td className="px-6 py-4">213</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LoadingTable;
