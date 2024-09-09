import { Then } from '@cucumber/cucumber';
import { getGlobalResponse } from "../../src/step-definitions/commonContext/common-response";
import { commonContext } from '../../src/setup/global';

let response: any;

Then('verify that the {string} date is before the {string} date', async function (transmission_start: string, transmission_end: string) {
    response = getGlobalResponse(response);
    const data = response.data.schedule.elements

    data.forEach(item => {
        const startDate = Date.UTC(
            new Date(item.transmission_start).getUTCFullYear(),
            new Date(item.transmission_start).getUTCMonth(),
            new Date(item.transmission_start).getUTCDate(),
            new Date(item.transmission_start).getUTCHours(),
            new Date(item.transmission_start).getUTCMinutes(),
            new Date(item.transmission_start).getUTCSeconds()
        );

        const endDate = Date.UTC(
            new Date(item.transmission_end).getUTCFullYear(),
            new Date(item.transmission_end).getUTCMonth(),
            new Date(item.transmission_end).getUTCDate(),
            new Date(item.transmission_end).getUTCHours(),
            new Date(item.transmission_end).getUTCMinutes(),
            new Date(item.transmission_end).getUTCSeconds()
        );

        // Check if the start date is before the end date
        if (startDate >= endDate) {
            throw new Error(`The 'transmission_start' date is not before the 'transmission_end' date in item: ${JSON.stringify(item)}`);
        }
    });

    commonContext.logger.info("Verified that the 'transmission_start' date is before the 'transmission_end' date for all items");
});

