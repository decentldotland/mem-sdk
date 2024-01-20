import { Inputs, state } from "../types";
interface deployValues {
    id: string;
}
export declare abstract class Base {
    readFunction(id: string): Promise<state | string | any>;
    writeFunction(id: string, inputs: Inputs): Promise<any>;
    deployFunction(src: string, initState: string): Promise<deployValues | string | any>;
}
export {};
