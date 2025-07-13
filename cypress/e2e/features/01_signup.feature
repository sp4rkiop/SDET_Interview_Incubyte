Feature: Sign up functionality

  Scenario: Sign up success with new credentials
    Given I visit the signup page
    When I fill in the signup form with new data
    Then I should see account creation success message

  Scenario: Sign up fail with existing credentials
    Given I visit the signup page
    When I fill in the signup form with existing data
    Then I should see account exists error