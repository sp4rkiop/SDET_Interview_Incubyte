import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SignupPage from '../../pages/SignupPage';
import { firstName, lastName, email, password } from '../../support/constants';

const signup = new SignupPage();

Given('I visit the signup page', () => {
    cy.log('Visiting signup page');
    signup.visit();
});

When('I fill in the signup form with valid data', () => {
    signup.fillForm(firstName, lastName, email, password);
});

Then('I should see account creation success message or exists error', () => {
    cy.get('body').then(($body) => {
        if ($body.text().includes('Thank you for registering with Main Website Store.')) {
            cy.log('Signup successful: Account successfully created');
        } else if ($body.text().includes('There is already an account with this email address')) {
            cy.log('Signup failed: Account already exists');
        } else {
            throw new Error('Signup failed: Neither success nor "already exists" message found');
        }
    });
});
