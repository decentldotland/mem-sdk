const { Mem } = require("mem-sdk");

const haikuContract = "ucmuajHVQF4-3jr4f0VIxeJuZ-YSaY23d9PDMQAjJwk";

async function runExampleMem() {
  const mem = new Mem({
    network: "mainnet"
  });
  const result = (await mem.read(haikuContract));
  if (!result?.haikus) return console.log("Something went wrong...");
  const latestHaiku = result.haikus[result.haikus.length - 1]?.haiku;
  return console.log("haiku of the day: " + latestHaiku);
}

runExampleMem();
