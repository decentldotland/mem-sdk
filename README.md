<p align="center">
  <a href="https://mem.tech">
    <img src="https://mem-home.vercel.app/icons/mem/mem-logo-v2.svg" height="180">
  </a>
  <h3 align="center"><code>@decentldotland/mem-sdk</code></h3>
  <p align="center">JS SDK for MEM Serverless Functions</p>
</p>

## Build Locally

```bash
git clone https://github.com/decentldotland/mem-sdk.git

cd mem-sdk

npm install && npm run build
```

#### Build size

- `dist/index.cjs.js` <span style="color:green;">3.20 kB │ gzip: 1.04 kB</span></br>
- `dist/index.umd.js` <span style="color:green;">3.40 kB │ gzip: 1.14 kB</span></br>
- `dist/index.es.js` <span style="color:green;">4.39 kB │ gzip: 1.14 kB</span>

## Install

```bash
npm install mem-sdk
```

## Usage Guide

### Import MEM SDK

#### React, and other frameworks (also check out [React Version](https://github.com/decentldotland/react-mem-api/)):

```ts
import Mem from "mem-sdk";

const mem : Mem = new Mem({
  network: "mainnet" || "testnet"
});
```

#### Node (TS)

```ts
const { Mem } = require("mem-sdk");
const mem: Mem = new Mem({
  network: "mainnet" || "testnet"
});
```

#### Node (ES6)

```ts
import { Mem } from "mem-sdk"
const mem = new Mem({
  network: "mainnet" || "testnet"
});
```

### Retrieve a function state

```ts
const FUNCTION_ID = "...";
const state = await mem.read(FUNCTION_ID);
```

### Send an interaction (only works on server-side)

```ts
const FUNCTION_ID = "...";
const inputs = { function: "test", inputA: "valueA" };

const txid = await mem.write(FUNCTION_ID, inputs);

```

### Deploy a function

```ts
const SRC = `export async function handle(state, action) {
  const input = action.input;


if (input.function === "save") {
    const { username, bio } = input;

    ContractAssert(username.trim().length, "ERROR_INVALID_INPUT");
    ContractAssert(typeof username === "string" && typeof bio === "string");
    state.logs.push ({ username, bio });
    return { state }
  }
}`;

const INIT_STATE = '{"logs": []}';

const id = await mem.deploy(SRC, INIT_STATE);
```

### Fork a function to mainnet or testnet
While the SDK should be initialized for `mainnet` using this method, the `fork` functionality allows forking ***mainnet*** deployed function to either mainnet or carbon testnet:

```ts
const MAINNET_FUNCTION_ID = "...";
const FORK_IT_TO = "mainnet" || "testnet";
const OVERWRITE_INIT_STATE = btoa('{"new": "state"}'); // optional

const id = await mem.fork(MAINNET_FUNCTION_ID, FORK_IT_TO, OVERWRITE_INIT_STATE?);
```

### Named functions resolving DX (only `mainnet`)

It is possible to assign a memorable name to a function ID using the [function registry tool](https://mem.tech/function-registry) (e.g., `ans.mem` instead of `Tih...I5M`). These `.mem` names are resolvable with the MEM SDK the same way you would pass a function ID:

```ts
await mem.read("ans.mem");
```

## License
This repository is licensed under the [MIT License](./LICENSE)
