import { Base } from "./utils/base";

import {
  Inputs,
  tags,
  input,
  MEMResponseObject,
  state,
  validity,
  requests,
  errors,
} from "./types";

class Actions extends Base {
  async read<T>(id: string): Promise<T> {
    const state = await this.readFunction(id);
    return state;
  }

  async write<T>(id: string, inputs: Inputs): Promise<T> {
    const res = await this.writeFunction(id, inputs);
    return res;
  }

  async deploy<T>(src: string, initState: string): Promise<T> {
    const res = await this.deployFunction(src, initState);
    return res;
  }
}

class Mem extends Actions {}

export { Mem, Actions };
export type {
  MEMResponseObject,
  state,
  validity,
  requests,
  errors,
  tags,
  input,
  Inputs,
};
