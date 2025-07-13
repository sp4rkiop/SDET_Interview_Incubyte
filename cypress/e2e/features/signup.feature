Feature: Sign up functionality

  Scenario: Sign up with valid credentials
    Given I visit the signup page
    When I fill in the signup form with valid data
    Then I should see account creation success message or exists error