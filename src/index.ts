import { Base } from "./utils/base";
import { applyMixins } from "./utils/utils";
import { Inputs } from "./types";

class Mem extends Base {
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

class Actions extends Base {}
// interface Mem extends Actions {}

// applyMixins(Mem, [Actions]);

export { Mem, Actions };
