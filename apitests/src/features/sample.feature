Feature: Sample API Test

#This scenario is to test framework is working
  @Example1
  Scenario: Get user details
    Given I have the user endpoint
    When I send a GET request to the user endpoint
    Then the response status should be 200
    And the response should contain user details
