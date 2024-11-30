"use client";
import React, { useState, useEffect } from "react";
import TableOpta from "../components/TableOpta";
import ErrorScreen from "../components/ErrorScreen";

const OptaStats = () => {
  const [data, setData] = useState({
    elements: [
      {
        web_name: "",
        now_cost: 0,
        starts: 0,
        minutes: 0,
        bps: 0,
        bonus: 0,
        assists: 0,
        goals_scored: 0,
        expected_assists: "",
        expected_assists_per_90: 0,
        expected_goal_involvements: "",
        expected_goal_involvements_per_90: 0,
        expected_goals: "",
        total_points: 0,
        id: 0,
      },
    ],
  });

  const [error, setError] = useState(false);

  useEffect(() => {
    const getData = async () => {
      try {
        const timeStamp = new Date().getTime();
        const response = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/bootstrap-static/?_=${timeStamp}`
        );

        if (!response.ok) {
          throw new Error(`Error: ${response.status}`);
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(true);
      }
    };

    getData();
  }, []);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <div className="mt-24 py-40 bg-gradient-to-t from-sky-300  to-cyan-800 px-10 min-h-300">
        <h1 className="sm:text-3xl  text-xl font-gothic text-center mb-10 text-black md:text-5xl">
          Player Stats: Opta & FPL Performance Insights
        </h1>
        <p className="max-w-150 text-center mx-auto  text-xs md:text-lg font-medium mb-28 text-gray-900">
          Welcome to Player Stats, your one-stop source for detailed insights
          into player performance across the Premier League. Here, you&apos;ll
          find a comprehensive breakdown of each player&apos;s stats, powered by
          Opta. Whether you&apos;re looking for tactical insights, predicting
          future performance, or making critical transfer decisions, we have all
          the tools you need.
        </p>
        <TableOpta Data={data} />
      </div>
    </>
  );
};

export default OptaStats;

// max-h-80 overflow-y-auto max-w-12
