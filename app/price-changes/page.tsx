"use client";
import React, { useEffect, useMemo, useState } from "react";
import TablePrice from "../components/TablePrice";
import ErrorScreen from "../components/ErrorScreen";

const PriceChanges = () => {
  const [players, setPlayers] = useState({
    elements: [
      {
        cost_change_start: 0,
        cost_change_event: 0,
        transfers_in_event: 0,
        transfers_out_event: 0,
        transfers_in: 0,
        transfers_out: 0,
        selected_by_percent: "",
        web_name: "",
        now_cost: 0,
        id: 0,
      },
    ],
    total_players: 0,
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
        setPlayers(result);
      } catch (error) {
        console.error("Failed to fetch data:", error);
        setError(true);
      }
    };

    getData();
  }, []);

  const sortedPlayers = useMemo(() => {
    return players.elements.map((player) => {
      const ownership =
        (players.total_players * Number(player.selected_by_percent)) / 100;
      const netGain = player.transfers_in - player.transfers_out;

      const defOwnership = ownership - netGain;

      const lastChange =
        defOwnership *
        Math.pow(
          player.cost_change_start >= 0 ? 1.1 : 0.9,
          Math.abs(player.cost_change_start)
        );

      let progress;

      if (lastChange - ownership <= 0) {
        progress = (ownership / (lastChange * 1.1)) * 100;

        if (progress > 65 && progress < 500) {
          progress = (progress / 500) * 100;
        } else if (progress > 500) {
          progress = (progress / 500) * 100;
          progress -= 100;
        } else {
          progress *= 0.7;
        }
      } else {
        progress = (ownership / (lastChange * 0.9)) * 100;

        if (progress > 65 && progress < 500) {
          progress = (progress / 500) * 100;
        } else if (progress > 500) {
          progress = (progress / 500) * 100;
          progress -= 100;
        } else {
          progress *= 0.7;
        }

        progress = -progress;
      }

      return {
        ...player,
        progress: progress,
      };
    });
  }, [players]);

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <>
      <div className="bg-gradient-to-t from-sky-300  to-cyan-800 pt-32 pb-32 min-h-300 px-10">
        <h1 className="sm:text-3xl  text-xl font-gothic text-center mb-10 text-black md:text-5xl mt-32">
          FPL Price Changes Predictor
        </h1>
        <p className="max-w-150 text-center mx-auto  text-xs md:text-lg font-medium mb-28 text-gray-900">
          In <span className="font-bold">Fantasy Premier League</span>, player
          prices fluctuate based on transfer activity, and these changes can
          impact your squads value and future transfer decisions. Our{" "}
          <span className="font-bold">Price Changes Predictor</span> provides
          live updates and projections on which players are likely to experience
          a price rise or fall during the current gameweek.
        </p>
        <TablePrice sortedPlayers={sortedPlayers} />
      </div>
    </>
  );
};

export default PriceChanges;
