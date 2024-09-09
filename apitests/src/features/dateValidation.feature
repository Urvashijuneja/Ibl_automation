@ibltest
Feature: Feature: As a user, expect to validate transmission dates scenario

    @transmission-date-validation
    Scenario: Verify transmission start date should be before end date
        Given a GET request is sent to "/RMSTest/ibltest" endpoint
        Then verify that the "transmission_start" date is before the "transmission_end" date
