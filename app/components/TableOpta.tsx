"use client";
import React, { useMemo, useState } from "react";
import TableComp from "./TableComp";

type Player = {
  web_name: string;
  now_cost: number;
  starts: number;
  minutes: number;
  bps: number;
  bonus: number;
  assists: number;
  goals_scored: number;
  expected_assists: string;
  expected_assists_per_90: number;
  expected_goal_involvements: string;
  expected_goal_involvements_per_90: number;
  expected_goals: string;
  total_points: number;
  id: number;
};

const TableOpta = ({
  Data,
}: {
  Data: {
    elements: Player[];
  };
}) => {
  const [sortAttribute, setSortAttribute] = useState<string>("total_points");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [num, setNum] = useState(20);

  const handleChange = (e: any) => {
    e.preventDefault();

    if (e.target.value === "All") setNum(1000);
    else setNum(Number(e.target.value));
  };

  const handleSort = (attribute: string) => {
    if (sortAttribute === attribute) {
      setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
    } else {
      setSortAttribute(attribute);
      setSortOrder("asc");
    }
  };

  const sortedPlayers = useMemo(() => {
    return [...Data.elements].sort((a, b) => {
      if (sortAttribute === "goal_involvements") {
        return sortOrder === "desc"
          ? +(a.assists + a.goals_scored) - +(b.assists + b.goals_scored)
          : +(b.assists + b.goals_scored) - +(a.assists + a.goals_scored);
      }

      if (sortAttribute === "goal_involvements_per_90") {
        if (a.minutes == 0) {
          return sortOrder === "desc" ? -1 : 1;
        }
        if (b.minutes == 0) {
          return sortOrder === "desc" ? 1 : -1;
        }
        return sortOrder === "desc"
          ? (a.assists + a.goals_scored) / a.minutes -
              (b.assists + b.goals_scored) / b.minutes
          : (b.assists + b.goals_scored) / b.minutes -
              (a.assists + a.goals_scored) / a.minutes;
      }
      const valueA = a[sortAttribute as keyof Player];
      const valueB = b[sortAttribute as keyof Player];

      if (typeof valueA === "string" && typeof valueB === "string") {
        return sortOrder === "desc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      } else {
        return sortOrder === "desc" ? +valueA - +valueB : +valueB - +valueA;
      }
    });
  }, [sortAttribute, sortOrder, Data.elements]);

  return (
    <>
      <form className="max-w-sm mx-auto mb-22">
        <label className="block mb-2 text-lg font-bold text-gray-900">
          Results
        </label>
        <select
          id="results"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          value={num === 1000 ? "All" : num}
          onChange={handleChange}
        >
          <option value={20}>20</option>
          <option value={50}>50</option>
          <option value={100}>100</option>
          <option value="All">All</option>
        </select>
      </form>
      <div className="max-w-110 overflow-y-auto max-h-120 mx-auto rounded-lg shadow-2xl">
        <table className="text-sm mx-auto text-center rtl:text-right text-gray-700 table-fixed border-collapse">
          <thead className="text-sm text-black font-bold bg-slate-100 sticky top-0 ">
            <tr>
              <th
                onClick={() => handleSort("web_name")}
                scope="col"
                className={`px-6 py-3 text-left cursor-pointer w-44 ${
                  sortAttribute === "web_name"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Name"
              >
                NAME
              </th>
              <th
                onClick={() => handleSort("now_cost")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-22 ${
                  sortAttribute === "now_cost"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Cost"
              >
                &pound;M
              </th>
              <th
                onClick={() => handleSort("starts")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-22 ${
                  sortAttribute === "starts"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Games Started"
              >
                STARTS
              </th>
              <th
                onClick={() => handleSort("minutes")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "minutes"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Minutes Played"
              >
                MINS
              </th>
              <th
                onClick={() => handleSort("expected_goals")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "expected_goals"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Expected Goals"
              >
                xG
              </th>
              <th
                onClick={() => handleSort("goals_scored")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-16 ${
                  sortAttribute === "goals_scored"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Goals Scored"
              >
                G
              </th>
              <th
                onClick={() => handleSort("expected_assists")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "expected_assists"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Expected Assists"
              >
                xA
              </th>
              <th
                onClick={() => handleSort("assists")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "assists"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Assists"
              >
                A
              </th>
              <th
                onClick={() => handleSort("expected_goal_involvements_per_90")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "expected_goal_involvements_per_90"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Expected Goal Involvement per 90"
              >
                xGIp90
              </th>
              <th
                onClick={() => handleSort("goal_involvements_per_90")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "goal_involvements_per_90"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Goal Involvement per 90"
              >
                GIp90
              </th>
              <th
                onClick={() => handleSort("expected_goal_involvements")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "expected_goal_involvements"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Expected Goal Involvement"
              >
                xGI
              </th>
              <th
                onClick={() => handleSort("goal_involvements")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "goal_involvements"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Goal Involvement"
              >
                GI
              </th>
              <th
                onClick={() => handleSort("bps")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-22 ${
                  sortAttribute === "bps"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Bonus Points System (FPL)"
              >
                BPS
              </th>
              <th
                onClick={() => handleSort("bonus")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-20 ${
                  sortAttribute === "bonus"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Bonus Points"
              >
                B
              </th>
              <th
                onClick={() => handleSort("total_points")}
                scope="col"
                className={`px-6 py-3 cursor-pointer w-22 ${
                  sortAttribute === "total_points"
                    ? "border-b-4 border-sky-900"
                    : "border-b-4 border-slate-100"
                }`}
                title="Points Scored"
              >
                Pts
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedPlayers.slice(0, num).map((player) => (
              <TableComp player={player} key={player.id} />
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableOpta;
