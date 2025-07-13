Feature: Login functionality

  Scenario: Login success with valid credentials
    Given I visit the login page
    When I enter valid credentials
    Then I should be logged in successfully

  Scenario: Login fail with invalid credentials
    Given I visit the login page
    When I enter invalid credentials
    Then I should see incorrect account sign-in request