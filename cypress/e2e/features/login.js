import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../pages/LoginPage';
import { email, password } from '../../support/constants';
const login = new LoginPage();

Given('I visit the login page', () => {
    login.visit();
});

When('I enter valid credentials', () => {
    login.login(email, password);
});

Then('I should be logged in successfully', () => {
    cy.get('body').then(($body) => {
        if ($body.find("span.logged-in").length > 0) {
            cy.get("span.logged-in")
                .should("contain.text", "Welcome")
                .then(() => cy.log('Login successful: "Welcome" message found'));
        } else {
            cy.log('Login failed: "Welcome" message not found');
            throw new Error('Login did not complete successfully.');
        }
    });
});
