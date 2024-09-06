
import { Logger } from "winston";
import https from 'https'
import { AxiosRequestConfig } from 'axios';
import { getEnv } from '../setup/types/env';


export const commonContext = {
    // @ts-ignore
    logger: undefined as Logger
}
getEnv();
