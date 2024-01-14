import * as fetchImport from "isomorphic-unfetch";
const fetch = (fetchImport.default ||
  fetchImport) as typeof fetchImport.default;

import { generateFunctionFormat, TXS_BROADCASTER_URL } from "./utils";
import { Inputs } from "../types";

export abstract class Base {
  async readFunction(id: string): Promise<any> {
    const url = `https://api.mem.tech/api/state/${id}`;

    const headers = {
      "Content-Type": "application/json",
    };

    const response = await fetch(url);

    if (response.ok) {
      const data = await response.json();
      return data as any;
    }
    throw new Error(response.statusText);
  }

  async writeFunction(id: string, inputs: Inputs): Promise<any> {
    const url = `https://api.mem.tech/api/transactions`;
    // Set the headers for the request
    const headers = {
      "Content-Type": "application/json",
    };

    const writeInputs = [
      {
        input: inputs,
      },
    ];

    const options = {
      method: "POST",
      headers: headers,
      body: JSON.stringify({
        functionId: id,
        inputs: writeInputs,
      }),
    };

    const response = await fetch(url, options);

    if (response.ok) {
      const data = await response.json();
      return data as any;
    }

    throw new Error(response.statusText);
  }

  async deployFunction(src: string, initState: string): Promise<any> {
    const data = JSON.stringify(generateFunctionFormat(src, initState));

    const options = {
      method: "post",
      url: TXS_BROADCASTER_URL,
      body: data,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      maxContentLength: 100000000,
      maxBodyLength: 1000000000,
    };

    const response = await fetch(TXS_BROADCASTER_URL, options);

    if (response.ok) {
      const data = await response.json();
      return { id: data.txid } as any;
    }

    throw new Error(response.statusText);
  }
}
