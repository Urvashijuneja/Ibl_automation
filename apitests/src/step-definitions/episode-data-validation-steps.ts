import { Then } from '@cucumber/cucumber';
import { getGlobalResponse } from "./commonContext/common-response";
import { commonContext } from '../setup/global';

let response: any;

Then('verify the {string} field is not null or empty in all items', async function (id: string) {
    response = getGlobalResponse(response);
    const data = response.data.schedule.elements;

    // Ensure that data is an array
    if (!Array.isArray(data)) {
        throw new Error("Expected 'data' to be an array, but it is not.");
    }

    data.forEach(item => {
        if (!item.id || item.id.trim() === '') {
            throw new Error("Found an item with an empty or null 'id' field: " + JSON.stringify(item));
        }
    });

    commonContext.logger.info("Verified that all items have a non-null and non-empty 'id' field");
});

Then('verify the {string} field in {string} is always {string}', async function (type: string, episode: string, episode1: string) {
    response = getGlobalResponse(response);
    const data = response.data.schedule.elements

    data.forEach(item => {
        if (item.episode.type !== 'episode') {
            throw new Error("Expected 'type' to be 'episode', but found " + item.episode.type + "for item: " + JSON.stringify(item));
        }
    });

    commonContext.logger.info("Verified that the 'type' field in all episodes is 'episode'");
});

Then('verify the {string} field in {string} is not null or empty for all schedule items', async function (title: string, episode: string) {
    response = getGlobalResponse(response);
    const data = response.data.schedule.elements

    // Iterate over each item in the array to verify the "title" field
    data.forEach(item => {
        if (!item.episode || !item.episode.title || item.episode.title.trim() === '') {
            throw new Error("Found an item with an empty or null 'title' field in 'episode': " + JSON.stringify(item));
        }
    });

    commonContext.logger.info("Verified that the 'title' field in all episodes is not null or empty");
});

Then('verify only one episode in the list has {string} field as true', async function (live: string) {
    response = getGlobalResponse(response);
    const data = response.data.schedule.elements

    // Count the number of episodes with "live" field set to true
    let liveCount = 0;
    data.forEach(item => {
        if (item.episode && item.episode.live === true) {
            liveCount++;
        }
    });

    // Check that only one episode has the "live" field set to true
    if (liveCount !== 1) {
        throw new Error("Expected exactly one episode with 'live' field as true, but found " + liveCount);
    }

    commonContext.logger.info("Verified that exactly one episode has the 'live' field set to true");
});

