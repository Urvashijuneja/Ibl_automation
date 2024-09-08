
import { Logger } from "winston";
import { getEnv } from '../setup/types/env';


export const commonContext = {
    // @ts-ignore
    logger: undefined as Logger
}
getEnv();
