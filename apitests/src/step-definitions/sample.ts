import { Given, When, Then } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { axios } from "../setup/world";
import { commonContext } from '../setup/global';

let response: any;

Given('I have the user endpoint', function () {
  this.endpoint = 'https://jsonplaceholder.typicode.com/users/1';
});

When('I send a GET request to the user endpoint', async function () {
  response = await axios.get(this.endpoint);
});

Then('the response status should be {int}', function (statusCode) {
  expect(response.status).toBe(statusCode);
  commonContext.logger.info("API executed successfully with " + statusCode)
});

Then('the response should contain user details', async function () {
  expect(response.data).toHaveProperty('id');
  expect(response.data).toHaveProperty('name');
  expect(response.data).toHaveProperty('email');
  commonContext.logger.info("Assertions verified");
});
