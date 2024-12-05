"use client";
import React, { useEffect, useState } from "react";
import * as ort from "onnxruntime-web";
import Image from "next/image";
import CountUp from "react-countup";

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
  points_per_game: string;
  clean_sheets: number;
  saves: number;
  yellow_cards: number;
  expected_goals_conceded: string;
  selected_by_percent: string;
  photo: string;
};

const TablePredict = ({
  Data,
}: {
  Data: { elements: Player[]; events: { is_current: boolean; id: number }[] };
}) => {
  const [num, setNum] = useState(20);
  const [playersWithPredictions, setPlayersWithPredictions] = useState<
    Player[]
  >([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gw, setGw] = useState(0);

  useEffect(() => {
    if (!Data) return;
    const temp = Data.events.find((el) => el.is_current)?.id || null;

    console.log(temp);
    setGw(Number(temp));
  }, [Data]);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    e.preventDefault();
    if (e.target.value === "All") setNum(1000);
    else setNum(Number(e.target.value));
  };

  const runModelForAllPlayers = async (players: Player[]) => {
    try {
      const session = await ort.InferenceSession.create("/fpl_predictor.onnx");

      const inputs = players.map((player) => {
        const gp = Math.max(
          1,
          Math.round(player.total_points / Number(player.points_per_game))
        );
        return [
          player.minutes / gp,
          player.goals_scored / gp,
          player.assists / gp,
          player.clean_sheets / gp,
          player.yellow_cards / gp,
          player.saves / gp,
          Number(player.expected_goals) / gp,
          Number(player.expected_assists) / gp,
          Number(player.expected_goals_conceded) / gp,
        ];
      });

      const inputTensor = new ort.Tensor(
        "float32",
        Float32Array.from(inputs.flat()),
        [players.length, 9]
      );

      const feeds = { float_input: inputTensor };
      const results = await session.run(feeds);

      const predictions = (results.variable as any).data as Float32Array;

      return players.map((player, index) => {
        const prediction = predictions[index];
        return { ...player, predicted_points: prediction };
      });
    } catch (error) {
      console.error("Error running the ONNX model:", error);
      return players.map((player) => ({ ...player, predicted_points: null }));
    }
  };

  useEffect(() => {
    const fetchPredictions = async () => {
      setIsLoading(true); // Show loader
      const sortedTopPlayers = Data.elements
        .sort(
          (a, b) =>
            Number(b.selected_by_percent) - Number(a.selected_by_percent)
        )
        .slice(0, num);

      const playersWithPredictions = await runModelForAllPlayers(
        sortedTopPlayers
      );

      setPlayersWithPredictions(playersWithPredictions);
      setIsLoading(false); // Hide loader
    };

    fetchPredictions();
  }, [Data.elements, num]);

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
      {isLoading ? (
        <div className="flex justify-center items-center h-32">
          <div className="loader border-t-4 border-blue-500 border-solid rounded-full w-12 h-12 animate-spin"></div>
          <p className="ml-4 text-xl font-semibold text-white ">Loading...</p>
        </div>
      ) : (
        <div className="max-w-110 overflow-y-auto max-h-120 mx-auto rounded-lg shadow-2xl">
          <table className="text-sm mx-auto text-center rtl:text-right text-gray-700 table-fixed border-collapse">
            <thead className="text-sm text-black font-bold bg-slate-100 sticky top-0">
              <tr>
                <th
                  scope="col"
                  className={`px-6 py-6 cursor-pointer w-96 text-center`}
                  title="Player"
                >
                  PLAYER
                </th>
                <th
                  scope="col"
                  className={`px-6 py-6 cursor-pointer w-72 text-center`}
                  title="Selected by %"
                >
                  SELECTED BY %
                </th>
                <th
                  scope="col"
                  className={`px-6 py-6 cursor-pointer w-120 text-center flex gap-20 justify-center`}
                  title="Predicted Points"
                >
                  <p className="px-3 py-1">PREDICTED POINTS</p>
                  <p className="bg-cyan-500 px-3 py-1 rounded-lg">
                    GW {gw > 37 ? "" : gw + 1}
                  </p>
                </th>
              </tr>
            </thead>
            <tbody>
              {playersWithPredictions.map((player, index) => (
                <tr className="odd:bg-white even:bg-blue-50" key={index}>
                  <td className="px-6 py-12 text-lg font-bold">
                    <div className="flex flex-col items-center justify-center">
                      <Image
                        className="px-2 w-24 pb-3"
                        unoptimized
                        width={77}
                        height={98}
                        alt="player-image"
                        src={`https://corsproxy.io/?https://resources.premierleague.com/premierleague/photos/players/110x140/p${player.photo.slice(
                          0,
                          -3
                        )}png`}
                      />
                      <p>{player.web_name}</p>
                    </div>
                  </td>
                  <td className="px-6 py-12 font-semibold text-lg">
                    {player.selected_by_percent}
                  </td>
                  <td className="px-6 py-12 text-lg font-medium font-gothic text-blue-950">
                    <CountUp
                      start={0.0}
                      end={Number(
                        Number((player as any).predicted_points).toFixed(2)
                      )}
                      duration={2}
                      decimals={2}
                      className="px-10 py-4 bg-cyan-400 rounded-xl"
                    ></CountUp>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

export default TablePredict;
