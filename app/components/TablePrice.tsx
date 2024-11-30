import React from "react";
import PriceComp from "./PriceComp";

const TablePrice = ({
  sortedPlayers,
}: {
  sortedPlayers: {
    progress: number;
    cost_change_start: number;
    cost_change_event: number;
    transfers_in_event: number;
    transfers_out_event: number;
    transfers_in: number;
    transfers_out: number;
    selected_by_percent: string;
    web_name: string;
    now_cost: number;
    id: number;
  }[];
}) => {
  return (
    <div className="max-w-110 overflow-y-auto max-h-120 mx-auto rounded-lg shadow-2xl">
      <table className="text-sm mx-auto text-center rtl:text-right text-gray-700 table-fixed border-collapse w-110">
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
          {sortedPlayers
            .sort((a: any, b: any) => b.progress - a.progress)
            .map((player: any) =>
              player.selected_by_percent > 10 ? (
                <PriceComp
                  name={player.web_name}
                  cost={player.now_cost / 10}
                  key={player.id}
                  progress={player.progress}
                />
              ) : null
            )}
        </tbody>
      </table>
    </div>
  );
};

export default TablePrice;
