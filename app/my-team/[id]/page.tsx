"use client";
import ChipTable from "@/app/components/ChipTable";
import NotFounde from "@/app/components/NotFound";
import ErrorScreen from "@/app/components/ErrorScreen";
import PlayerCard from "@/app/components/PlayerCard";
import React, { useEffect, useState } from "react";

const TeamView = ({ params }: { params: { id: string } }) => {
  const TeamId = params.id;

  const [data, setData] = useState({
    name: "",
    player_first_name: "",
    player_last_name: "",
    current_event: 0,
    summary_event_points: 0,
  });

  const [dataCurr, setDataCurr] = useState({
    picks: [{ element: 1, multiplier: 1, position: 1 }],
    active_chip: "",
    automatic_subs: [],
    entry_history: {
      total_points: 0,
      value: 0,
      overall_rank: 0,
      rank: 0,
      bank: 0,
    },
  });
  const [dataPrev, setDataPrev] = useState({
    picks: [{ element: 1, multiplier: 1, position: 1 }],
    active_chip: "",
    automatic_subs: [],
    entry_history: { total_points: 0, value: 0, overall_rank: 0, rank: 0 },
  });

  const [dataLive, setDataLive] = useState([
    { stats: { total_points: 0 }, id: 0 },
  ]);
  const [error, setError] = useState(false);

  const [players, setPlayers] = useState({
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
        photo: "",
        element_type: 0,
      },
    ],
  });

  const [totalPoints, setTotalPoints] = useState(0);
  const [num, setNum] = useState(12);

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

  useEffect(() => {
    const getData = async () => {
      try {
        const timeStamp = new Date().getTime();
        const res = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${TeamId}/?_=${timeStamp}`
        );

        if (!res.ok) {
          throw new Error(`Error fetching team data: ${res.status}`);
        }

        const data = await res.json();
        setData(data);

        const res1 = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${TeamId}/event/${data.current_event}/picks/?_=${timeStamp}`
        );

        if (!res1.ok) {
          throw new Error(`Error fetching event picks: ${res1.status}`);
        }

        const data1 = await res1.json();
        if (data1.active_chip == "bboost") {
          setNum(16);
        }
        setDataCurr(data1);

        const res2 = await fetch(
          `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${TeamId}/event/${
            data.current_event - 1
          }/picks/?_=${timeStamp}`
        );

        if (!res2.ok) {
          throw new Error(`Error fetching event picks: ${res2.status}`);
        }

        const data2 = await res2.json();

        setDataPrev(data2);
      } catch (error) {
        setError(true);
      }
    };

    if (TeamId) {
      getData();
    }
  }, [TeamId]);

  useEffect(() => {
    const getData = async () => {
      if (data.current_event == 0) return;
      const timeStamp = new Date().getTime();
      const res = await fetch(
        `https://corsproxy.io/?https://fantasy.premierleague.com/api/event/${data.current_event}/live/?_=${timeStamp}`
      );
      const data1 = await res.json();
      setDataLive(data1.elements);
    };

    getData();
  }, [data]);

  useEffect(() => {
    const pickedPlayerIds = dataCurr.picks
      .map((pick) =>
        pick.position < num ? Array(pick.multiplier).fill(pick.element) : null
      )
      .flat();

    const TotalPoints = dataLive
      .filter((player) => pickedPlayerIds.includes(player.id))
      .reduce((sum, player) => {
        const playerCount = pickedPlayerIds.filter(
          (id) => id === player.id
        ).length;

        return sum + player.stats.total_points * playerCount;
      }, 0);

    setTotalPoints(TotalPoints);
  }, [dataCurr, dataLive, num]);

  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  if (Number(TeamId) > 10512520) return <NotFounde />;

  if (error) {
    return <ErrorScreen />;
  }

  return (
    <div className="bg-gradient-to-t from-sky-300  to-cyan-800  pt-56 py-32 sm:px-10 px-3">
      <div className="text-center mb-24">
        <h1 className="md:text-5xl text-xl font-gothic mb-8 text-stone-950 border-b-4 border-black inline-block pb-4">
          {data.name}
        </h1>
        <p className="md:text-2xl text-lg text-gray-800 font-bold">
          Manager: {data.player_first_name} {data.player_last_name}
        </p>
      </div>
      <div className="2xl:grid-cols-2 grid-cols-1 grid gap-10">
        <div className="text-center">
          <h1 className="sm:text-3xl text-xl font-gothic text-slate-950 bg-cyan-50 inline-block px-8 py-5 rounded-3xl">
            GW{data.current_event} Points&nbsp;:&nbsp;&nbsp;&nbsp;
            <span className="font-extrabold border-b-4 border-black">
              {totalPoints}
            </span>
          </h1>
          <div className="w-122 bg-pitch bg-cover bg-top bg-no-repeat mt-20 sm:px-10 px-3 pt-7 py-16">
            <div className="flex justify-center w-122 mb-10">
              {dataCurr.picks.map((player) => (
                <>
                  {players.elements.map((el) =>
                    el.id == player.element &&
                    el.element_type == 1 &&
                    player.position < 12 ? (
                      <PlayerCard
                        key={el.id}
                        name={el.web_name}
                        photo={el.photo}
                        score={
                          dataLive?.at(el.id - 1)?.stats.total_points
                            ? Number(
                                dataLive.at(el.id - 1)?.stats.total_points
                              ) * player.multiplier
                            : 0
                        }
                        multiplier={player.multiplier}
                      />
                    ) : (
                      ""
                    )
                  )}
                </>
              ))}
            </div>
            <div className="flex justify-around w-122 mb-12">
              {dataCurr.picks.map((player) => (
                <>
                  {players.elements.map((el) =>
                    el.id == player.element &&
                    el.element_type == 2 &&
                    player.position < 12 ? (
                      <PlayerCard
                        key={el.id}
                        name={el.web_name}
                        photo={el.photo}
                        score={
                          dataLive?.at(el.id - 1)?.stats.total_points
                            ? Number(
                                dataLive.at(el.id - 1)?.stats.total_points
                              ) * player.multiplier
                            : 0
                        }
                        multiplier={player.multiplier}
                      />
                    ) : (
                      ""
                    )
                  )}
                </>
              ))}
            </div>
            <div className="flex justify-around w-122 mb-12">
              {dataCurr.picks.map((player) => (
                <>
                  {players.elements.map((el) =>
                    el.id == player.element &&
                    el.element_type == 3 &&
                    player.position < 12 ? (
                      <PlayerCard
                        key={el.id}
                        name={el.web_name}
                        photo={el.photo}
                        score={
                          dataLive?.at(el.id - 1)?.stats.total_points
                            ? Number(
                                dataLive.at(el.id - 1)?.stats.total_points
                              ) * player.multiplier
                            : 0
                        }
                        multiplier={player.multiplier}
                      />
                    ) : (
                      ""
                    )
                  )}
                </>
              ))}
            </div>
            <div
              className={`flex justify-center md:gap-24 sm:gap-12 gap-8 w-122`}
            >
              {dataCurr.picks.map((player) => (
                <>
                  {players.elements.map((el) =>
                    el.id == player.element &&
                    el.element_type == 4 &&
                    player.position < 12 ? (
                      <PlayerCard
                        key={el.id}
                        name={el.web_name}
                        photo={el.photo}
                        score={
                          dataLive?.at(el.id - 1)?.stats.total_points
                            ? Number(
                                dataLive.at(el.id - 1)?.stats.total_points
                              ) * player.multiplier
                            : 0
                        }
                        multiplier={player.multiplier}
                      />
                    ) : (
                      ""
                    )
                  )}
                </>
              ))}
            </div>
          </div>
          <div className="w-122 flex justify-between sm:px-10 px-3 py-10 border-4 border-white mt-5 bg-teal-900 bg-opacity-35">
            {dataCurr.picks.map((player) => (
              <>
                {players.elements.map((el) =>
                  el.id == player.element && player.position > 11 ? (
                    <PlayerCard
                      key={el.id}
                      name={el.web_name}
                      photo={el.photo}
                      score={
                        dataLive?.at(el.id - 1)?.stats.total_points
                          ? Number(dataLive.at(el.id - 1)?.stats.total_points)
                          : 0
                      }
                      multiplier={player.multiplier}
                    />
                  ) : (
                    ""
                  )
                )}
              </>
            ))}
          </div>
        </div>
        <div className="">
          <ChipTable
            active_chip={dataCurr.active_chip}
            id={Number(params.id)}
          />
          <div className="bg-sky-100 md:max-w-100 max-w-96 mx-auto px-12 py-10 rounded-lg font-bold mb-28">
            <h1 className="font-bold sm:text-3xl text-xl text-center mb-12 font-gothic">
              STATISTICS
            </h1>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Overall Rank: </p>
              <p
                className={`font-extrabold ${
                  dataCurr.entry_history.overall_rank >
                  dataPrev.entry_history.overall_rank
                    ? "text-red-600"
                    : "text-green-600"
                }`}
              >
                {dataCurr.entry_history.overall_rank >
                dataPrev.entry_history.overall_rank ? (
                  <span>&#8595;&nbsp;</span>
                ) : (
                  <span>&#8593;&nbsp;</span>
                )}

                {formatNumber(dataCurr.entry_history.overall_rank)}
              </p>
            </div>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Previous Rank : </p>
              <p className="font-extrabold">
                {formatNumber(dataPrev.entry_history.overall_rank)}
              </p>
            </div>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Gameweek Rank : </p>
              <p className="font-extrabold">
                {formatNumber(dataCurr.entry_history.rank)}
              </p>
            </div>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Overall Points : </p>
              <p className="font-extrabold">
                {formatNumber(dataCurr.entry_history.total_points)}
              </p>
            </div>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Gameweek Points : </p>
              <p className="font-extrabold">{formatNumber(totalPoints)}</p>
            </div>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Team Value : </p>
              <p className="font-extrabold text-emerald-600">
                &pound;&nbsp;{formatNumber(dataCurr.entry_history.value / 10)}
              </p>
            </div>
            <div className="flex flex-row justify-between mb-4 sm:text-xl text-md">
              <p>Money In The Bank : </p>
              <p className="font-extrabold text-emerald-600">
                &pound;&nbsp;{formatNumber(dataCurr.entry_history.bank / 10)}
              </p>
            </div>
          </div>
          <div className="bg-sky-100 md:max-w-100 max-w-96 mx-auto px-12 py-10 rounded-lg font-bold relative">
            <h1 className="font-bold sm:text-3xl text-xl text-center mb-12 font-gothic">
              LIVE STATISTICS
            </h1>
            <p className="absolute -top-8 left-50 text-md text-white bg-red-800 px-10 py-5 rounded-full  font-gothic">
              COMMING SOON
            </p>
            <div className="blur-md">
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Overall Rank: </p>
                <p
                  className={`font-extrabold ${
                    dataCurr.entry_history.overall_rank >
                    dataPrev.entry_history.overall_rank
                      ? "text-red-600"
                      : "text-green-600"
                  }`}
                >
                  {dataCurr.entry_history.overall_rank >
                  dataPrev.entry_history.overall_rank ? (
                    <span>&#8595;&nbsp;</span>
                  ) : (
                    <span>&#8593;&nbsp;</span>
                  )}

                  {formatNumber(dataCurr.entry_history.overall_rank)}
                </p>
              </div>
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Previous Rank : </p>
                <p className="font-extrabold">
                  {formatNumber(dataPrev.entry_history.overall_rank)}
                </p>
              </div>
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Gameweek Rank : </p>
                <p className="font-extrabold">
                  {formatNumber(dataCurr.entry_history.rank)}
                </p>
              </div>
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Overall Points : </p>
                <p className="font-extrabold">
                  {formatNumber(dataCurr.entry_history.total_points)}
                </p>
              </div>
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Gameweek Points : </p>
                <p className="font-extrabold">{formatNumber(totalPoints)}</p>
              </div>
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Team Value : </p>
                <p className="font-extrabold text-emerald-600">
                  &pound;&nbsp;{formatNumber(dataCurr.entry_history.value / 10)}
                </p>
              </div>
              <div className="flex flex-row justify-between mb-4 text-md sm:text-xl">
                <p>Money In The Bank : </p>
                <p className="font-extrabold text-emerald-600">
                  &pound;&nbsp;{formatNumber(dataCurr.entry_history.bank / 10)}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeamView;
