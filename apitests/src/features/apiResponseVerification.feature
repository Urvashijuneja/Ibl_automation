@response-verification
Feature: API Response Verification

  @verify200
  Scenario: Verify HTTP status code and response time
    Given I make a GET request to "/api/RMSTest/ibltest" endpoint
    Then the HTTP status code should be "200"
    And the response time should be below "1000" milliseconds

  @verify404
  Scenario: Verify 404 status code and error object properties
    Given I make a GET request to "/api/RMSTest/ibltest/2023-09-11" endpoint
    Then the HTTP status code should be "404"
    And verify the error object contains "details" and "http_response_code" properties

  @verifydateinheader
  Scenario: Verify Date value in response headers
    Given I make a GET request to "/api/RMSTest/ibltest" endpoint
    Then verify the "Date" value in the response headers
