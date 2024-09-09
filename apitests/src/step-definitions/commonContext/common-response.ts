import { AxiosResponse } from 'axios';
let globalResponse: AxiosResponse;

export function setGlobalResponse(response: AxiosResponse) {
    globalResponse = response;
}

export function getGlobalResponse(response: AxiosResponse) {
    return globalResponse;
}

