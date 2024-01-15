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

npm install && npm run localbuild
```

## Install

```bash
npm install -g mem-sdk
```

## Usage Guide

### Import MEM SDK

```ts
import { Mem } from "mem-sdk";
const mem = new Mem();
```

### Retrieve a function state

```ts
const FUNCTION_ID = "...";
const state = await mem.read(FUNCTION_ID);
```

### Send an interaction

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

## License
This repositoy is licensed under the [MIT License](./LICENSE)