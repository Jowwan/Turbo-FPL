import React from "react";

const PriceComp = ({
  name,
  cost,
  progress,
}: {
  name: string;
  cost: number;
  progress: number;
}) => {
  return (
    <tr className="odd:bg-white even:bg-blue-50">
      <th
        scope="row"
        className="px-6 py-4 text-gray-800 whitespace-nowrap font-bold"
      >
        {name}
      </th>
      <td className="px-6 py-4">{cost}</td>
      <td className="px-6 py-4">
        <div
          className={`w-full  bg-gray-200 rounded-full h-5 dark:bg-gray-700  ${
            progress < 0 ? "flex flex-row-reverse" : ""
          }`}
        >
          <div
            className={` h-5 rounded-full ${
              progress < 0 ? "bg-red-600" : "bg-blue-600"
            }`}
            style={{
              width: `${Math.abs(progress) < 100 ? Math.abs(progress) : 100}%`,
            }}
          ></div>
        </div>
      </td>
      <td className="px-6 py-4">
        {Math.abs(progress) > 90
          ? "Today"
          : Math.abs(progress) < 50
          ? "> Week"
          : "This Week"}
      </td>
    </tr>
  );
};

export default PriceComp;
