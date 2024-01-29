import { Base } from "./utils/base";
import { Inputs, tags, input, MEMResponseObject, state, validity, requests, errors } from "./types";
declare class Actions extends Base {
    read<T>(id: string): Promise<T>;
    write<T>(id: string, inputs: Inputs): Promise<T>;
    deploy<T>(src: string, initState: string): Promise<T>;
    fork<T>(id: string, net: string, state?: string): Promise<T>;
    kvGet<T>(id: string): Promise<T>;
}
declare class Mem extends Actions {
}
export { Mem, Actions };
export type { MEMResponseObject, state, validity, requests, errors, tags, input, Inputs, };
