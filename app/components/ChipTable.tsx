"use client";
import React, { useEffect, useState } from "react";
import Chip from "./Chip";

const ChipTable = ({
  active_chip,
  id,
}: {
  active_chip: string;
  id: number;
}) => {
  const [data, setData] = useState([{ name: "" }]);
  useEffect(() => {
    const getData = async () => {
      const timeStamp = new Date().getTime();
      const res = await fetch(
        `https://corsproxy.io/?https://fantasy.premierleague.com/api/entry/${id}/history/?_=${timeStamp}`
      );

      if (!res.ok) {
        throw new Error(`Error fetching team data: ${res.status}`);
      }

      const data = await res.json();
      setData(data.chips);
    };

    getData();
  }, [id]);

  const isAvailable = (code: string) => data.some((item) => item.name === code);
  return (
    <div className="flex flex-row justify-around mb-20 mt-24 md:flex-nowrap flex-wrap gap-8">
      <Chip
        name="Bench Boost"
        code="bboost"
        status={isAvailable("bboost") ? "Used" : "Available"}
      />
      <Chip
        name="Triple Captain"
        code="3xc"
        status={isAvailable("3xc") ? "Used" : "Available"}
      />
      <Chip
        name="Free Hit"
        code="freehit"
        status={isAvailable("freehit") ? "Used" : "Available"}
      />
      <Chip name="Mystery" code="mystery" status={"Unavailable"} />
    </div>
  );
};

export default ChipTable;
