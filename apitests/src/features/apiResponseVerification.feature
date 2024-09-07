@response-verification
@ibltest

Feature: As a user, expect to test scenarios for API response verification

  @verify200
  Scenario: Verify 200 status code and response time
    Given a GET request is sent to "/RMSTest/ibltest" endpoint
    Then API returns status code "200"
    And the response time should be below "1000" milliseconds

  @verify404
  Scenario: Verify 404 status code and the error object properties in response
    Given a GET request is sent to "/RMSTest/ibltest/2023-09-11" endpoint
    Then API returns status code "404"
    And verify the error object contains "details" and "http_response_code" properties

  @verifydateinheader
  Scenario: Verify Date value in the response headers
    Given a GET request is sent to "/RMSTest/ibltest" endpoint
    Then verify the "Date" value in the response headers
