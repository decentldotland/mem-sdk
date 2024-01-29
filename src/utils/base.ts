import {
  generateFunctionFormat,
  resolveMemName,
  TXS_BROADCASTER_URL,
} from "./utils";
import { Inputs, MEMResponseObject, state } from "../types";

interface deployValues {
  id: string;
}

export abstract class Base {
  network: string;

  constructor(options: { network: string }) {
    this.network = options.network;
  }

  async readFunction(id: string): Promise<any> {
    if (id.endsWith(".mem")) {
      id = await resolveMemName(id);
    }

    if (this.network === "mainnet") {
      const url = `https://api.mem.tech/api/state/${id}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        return data as any;
      }
      throw new Error(response.statusText);
    }

    if (this.network === "testnet") {
      const url = `https://mem-testnet.xyz/state/${id}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        return data as any;
      }
      throw new Error(response.statusText);
    }
  }

  async writeFunction(
    id: string,
    inputs: Inputs,
  ): Promise<MEMResponseObject | any> {
    if (id.endsWith(".mem")) {
      id = await resolveMemName(id);
    }

    if (this.network === "mainnet") {
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
        return data as MEMResponseObject;
      }

      throw new Error(response.statusText);
    }

    if (this.network === "testnet") {
      const url = `https://mem-testnet.xyz/write`;
      // Set the headers for the request
      const headers = {
        "Content-Type": "application/json",
      };

      const options = {
        method: "POST",
        headers: headers,
        body: JSON.stringify({
          function_id: id,
          input: JSON.stringify(inputs),
        }),
      };

      const response = await fetch(url, options);

      if (response.ok) {
        const data = await response.json();
        return data as MEMResponseObject;
      }

      throw new Error(response.statusText);
    }
  }

  async deployFunction(
    src: string,
    initState: string,
  ): Promise<deployValues | string | any> {
    if (this.network === "mainnet") {
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
        return { id: data.txid } as deployValues;
      }

      throw new Error(response.statusText);
    }

    if (this.network === "testnet") {
      const options = {
        method: "post",
        url: "https://mem-testnet.xyz/deploy",
        body: JSON.stringify({
          src: src,
          state: initState,
        }),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        maxContentLength: 100000000,
        maxBodyLength: 1000000000,
      };

      const response = await fetch("https://mem-testnet.xyz/deploy", options);

      if (response.ok) {
        const data = await response.json();
        return { id: data.function_id } as any;
      }

      throw new Error(response.statusText);
    }
  }

  async forkFunction(id: string, net: string, state?: string): Promise<any> {
    if (this.network === "mainnet") {
      const url = state
        ? `https://molext1.com/mem/fork/${id}/${net}/${state}`
        : `https://molext1.com/mem/fork/${id}/${net}`;

      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        return data as any;
      }

      throw new Error(response.statusText);
    }
  }

  async kvFunction(id: string): Promise<any> {
    if (this.network === "mainnet") {
      const url = `https://mem-api.com/kv/${id}`;
      
      const headers = {
        "Content-Type": "application/json",
      };

      const response = await fetch(url, { headers });

      if (response.ok) {
        const data = await response.json();
        return data as any;
      }

      throw new Error(response.statusText);
    }
  }

}
