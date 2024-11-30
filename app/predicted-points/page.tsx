"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import ErrorScreen from "../components/ErrorScreen";
import TablePredict from "../components/TablePredict";

const PredictedPoints = () => {
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
        points_per_game: "",
        clean_sheets: 0,
        saves: 0,
        yellow_cards: 0,
        expected_goals_conceded: "",
        selected_by_percent: "",
        photo: "",
      },
    ],

    events: [
      {
        is_current: false,
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
    <div className="mt-24 py-40 bg-gradient-to-t from-sky-300  to-cyan-800 px-10 min-h-300">
      <h1 className="sm:text-3xl text-xl font-gothic text-center mb-10 text-black md:text-5xl">
        Points Predictor: Project FPL Player Points
      </h1>
      <p className="max-w-150 text-center mx-auto  text-xs md:text-lg font-medium mb-28 text-gray-900">
        Welcome to Points Predictor, your ultimate tool for forecasting player
        performance in FPL.{" "}
        <span className="font-bold">
          Powered by a machine learning model trained on Premier League data
        </span>
        , our tool analyzes performance trends and key metrics to provide
        per-match point predictions for each player. Whether you&apos;re
        strategizing transfers or choosing your captain, Points Predictor offers
        data-driven insights to help you make smarter decisions. Please note
        that the predictions indicate{" "}
        <span className="font-bold">average points per match</span> — so for
        double gameweeks, the points reflect individual match performances.
      </p>
      <TablePredict Data={data} />
    </div>
  );
};

export default PredictedPoints;
