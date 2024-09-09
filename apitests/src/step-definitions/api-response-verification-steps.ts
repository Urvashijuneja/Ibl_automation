import { Given, Then } from '@cucumber/cucumber';
import { setGlobalResponse, getGlobalResponse } from "./commonContext/common-response";
import { axios } from "../setup/world";
import { commonContext } from '../setup/global';
import { APIAssertions } from './api-assertions';
import { parse, isValid, format } from 'date-fns';

let response: any;
let apiAssertions: APIAssertions;
let responseTime: number;

Given('a GET request is sent to {string} endpoint', async function (endpoint: string) {
  response = await getIblEndpoint(endpoint);
  setGlobalResponse(response);
});

Then('API returns status code {string}', async function (statusCode: string) {
  response = getGlobalResponse(response);
  apiAssertions = new APIAssertions();
  let intStatusCode: number = parseInt(statusCode, 10);
  apiAssertions.assertStatusCode(response, intStatusCode);
  commonContext.logger.info("Verified status code successfully: " + intStatusCode);
});

Then('the response time should be below {string} milliseconds', async function (expectedResponseTime: string) {
  let maxAllowedTime: number = parseInt(expectedResponseTime, 10);
  commonContext.logger.info("Actual response time: " + responseTime + " milliseconds");

  if (responseTime > maxAllowedTime) {
    throw new Error("Response time exceeded " + maxAllowedTime + " milliseconds:" + responseTime + " milliseconds");
  } else {
    commonContext.logger.info("Response time is within the allowed limit:" + responseTime + " milliseconds");
  }
});

Then('verify the error object contains {string} and {string} properties', async function (details: string, responsecode: string) {
  response = getGlobalResponse(response);

  // Check that the response contains an "error" object
  if (!response.data.error || typeof response.data.error !== 'object') {
    throw new Error("The 'error' object is missing or not an object");
  }

  // Verify that the "details" property exists and is not empty
  if (!response.data.error.details) {
    throw new Error("The 'details' property is missing or empty in the error object");
  }

  // Verify that the "http_response_code" property exists and matches the expected value
  if (response.data.error.http_response_code !== 404) {
    throw new Error("The 'http_response_code property' is missing or does not match the expected value in the error object");
  }

  commonContext.logger.info("Verified the error object contains 'details' and 'http_response_code' properties");
});

Then('verify the "Date" value in the response headers', async function () {
  response = getGlobalResponse(response);

  // Verify the "Date" header exists
  if (!response.headers || !response.headers['date']) {
    throw new Error("The 'Date' header is missing in the response");
  }

  const dateHeaderValue = response.headers['date'];
  commonContext.logger.info("The 'Date' header in the response is: " + dateHeaderValue);

  // Parse the date string from the header using the exact format
  const parsedDate = parse(dateHeaderValue, 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'', new Date());

  // Check if the parsed date is valid
  if (!isValid(parsedDate)) {
    throw new Error("The 'Date' header value is not a valid date");
  }

  // Format it back to ensure consistency
  const formattedDate = format(parsedDate, 'EEE, dd MMM yyyy HH:mm:ss \'GMT\'');

  if (formattedDate !== dateHeaderValue) {
    throw new Error("The 'Date' header value does not match the expected format");
  }

  commonContext.logger.info("The 'Date' header value is valid and correctly formatted");
});

//Function that sents GET request to Ibl API and calculates response time
async function getIblEndpoint(endpoint: string) {
  const endpointUrl = endpoint;
  const startTime = Date.now();  // Start time
  commonContext.logger.info(process.env.API_BASE_URL + endpointUrl);

  // Make the GET request and validate status codes less than 500
  response = await axios.get(process.env.API_BASE_URL + endpointUrl, {
    validateStatus: function (status) {
      return status < 500; // Resolve only if the status code is less than 500
    }
  });

  const endTime = Date.now();  // End time
  responseTime = endTime - startTime;  // Store the response time
  
  // Log the response time
  commonContext.logger.info("Response time: " + responseTime + " milliseconds");
  return response;
}
