"use client";

import { MEMResponseObject, Mem } from "mem-sdk";
import { useState } from "react";

import { haikuContract } from "./constants";

export default function Home() {
  const [data, setData] = useState<string>("");
  const [result, setResult] = useState<any>("");

  const queryData = async () => {
    try {
      const mem = new Mem();
      const result = (await mem.read(haikuContract)) as any;
      if (!result?.haikus)
        return setData("Error retrieving latest Haiku, try again later");
      const latestHaiku = result.haikus[result.haikus.length - 1]?.haiku;
      setData(latestHaiku);
      setResult("");
    } catch (e) {
      setData("Error: " + e);
    }
  };

  const generateHaiku = async () => {
    const response = await fetch("/api/contract");
    const result = (await response.json()) as MEMResponseObject;
    const haikus = result.data.execution.state.haikus;
    const latestHaiku = haikus[haikus.length - 1].haiku;
    setResult(latestHaiku);
    setData("");
  };

  return (
    <main className="flex min-h-screen flex-col items-center gap-y-12 p-24">
      <h1 className="text-3xl dark:text-white">Example App: Haiku</h1>
      <h2>{data ? `"${data}"` : ` `}</h2>
      <h2>{result ? `"${result}"` : ` `}</h2>
      <div className="flex flex-row gap-x-4">
        <button
          onClick={() => queryData()}
          className="border-2 border-black dark:border-white px-2 py-1"
        >
          Fetch Latest
        </button>
        <button
          onClick={() => generateHaiku()}
          className="border-2 border-black dark:border-white px-2 py-1"
        >
          Generate Haiku
        </button>
      </div>
    </main>
  );
}
