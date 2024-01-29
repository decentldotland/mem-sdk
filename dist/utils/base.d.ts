import { Inputs, MEMResponseObject } from "../types";
interface deployValues {
    id: string;
}
export declare abstract class Base {
    network: string;
    constructor(options: {
        network: string;
    });
    readFunction(id: string): Promise<any>;
    writeFunction(id: string, inputs: Inputs): Promise<MEMResponseObject | any>;
    deployFunction(src: string, initState: string): Promise<deployValues | string | any>;
    forkFunction(id: string, net: string, state?: string): Promise<any>;
    kvFunction(id: string): Promise<any>;
}
export {};
