import React from "react";

const TableComp = ({
  player,
}: {
  player: {
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
}) => {
  return (
    <tr className="odd:bg-white even:bg-blue-50 border-b">
      <th
        scope="row"
        className="px-6 py-4 text-gray-900 whitespace-nowrap text-left font-bold"
      >
        {player.web_name}
      </th>
      <td className="px-6 py-4">&pound;{player.now_cost / 10}</td>
      <td className="px-6 py-4">{player.starts}</td>
      <td className="px-6 py-4">{player.minutes}</td>
      <td className="px-6 py-4">{player.expected_goals}</td>
      <td className="px-6 py-4 font-medium">{player.goals_scored}</td>
      <td className="px-6 py-4">{player.expected_assists}</td>
      <td className="px-6 py-4 font-medium">{player.assists}</td>
      <td className="px-6 py-4">{player.expected_goal_involvements_per_90}</td>
      <td className="px-6 py-4">
        {player.minutes > 0
          ? Math.round(
              ((Number(player.assists) + Number(player.goals_scored)) /
                player.minutes) *
                9000
            ) / 100
          : 0}
      </td>
      <td className="px-6 py-4">{player.expected_goal_involvements}</td>
      <td className="px-6 py-4 font-medium">
        {Number(player.assists) + Number(player.goals_scored)}
      </td>
      <td className="px-6 py-4">{player.bps}</td>
      <td className="px-6 py-4">{player.bonus}</td>
      <td className="px-6 py-4 font-extrabold">{player.total_points}</td>
    </tr>
  );
};

export default TableComp;
