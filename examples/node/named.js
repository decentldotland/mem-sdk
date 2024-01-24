const { Mem } = require("mem-sdk");

const ansFunctionAddress = "ans.mem";

async function runExampleMem() {
  const mem = new Mem();
  const result = (await mem.read(ansFunctionAddress));
  return console.log(result);
}

runExampleMem();
