import { Inputs, MEMResponseObject } from "../types";
interface deployValues {
    id: string;
}
export declare abstract class Base {
    readFunction(id: string): Promise<any>;
    writeFunction(id: string, inputs: Inputs): Promise<MEMResponseObject | any>;
    deployFunction(src: string, initState: string): Promise<deployValues | string | any>;
}
export {};
