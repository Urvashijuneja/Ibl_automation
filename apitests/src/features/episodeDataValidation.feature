@episode-data-validation
@ibltest
Feature: Feature: As a user, expect to validate episode data fields and conditions

  @verify-id-type-episode
  Scenario: Verify the id field is not null or empty and type is always episode
    Given a GET request is sent to "/RMSTest/ibltest" endpoint
    Then verify the "id" field is not null or empty in all items
    And verify the "type" field in "episode" is always "episode"

  @verify-title-episode
  Scenario: Verify the title field in episode is not null or empty
    Given a GET request is sent to "/RMSTest/ibltest" endpoint
    Then verify the "title" field in "episode" is not null or empty for all schedule items

  @verify-one-live-episode
  Scenario: Verify only one episode has live field as true
    Given a GET request is sent to "/RMSTest/ibltest" endpoint
    Then verify only one episode in the list has "live" field as true