import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import LoginPage from '../../pages/LoginPage';
const login = new LoginPage();

Given('I visit the login page', () => {
    login.visit();
});

When('I enter valid credentials', () => {
    cy.fixture('testuser.json').then((user) => {
        login.login(user.email, user.password);
    });
});

When('I enter invalid credentials', () => {
    login.login("abhishek.testINVALID@email.com", "Password123!");
});

Then('I should be logged in successfully', () => {
    cy.url().should('include', '/customer/account');
    cy.get('body').then(($body) => {
        if ($body.text().includes('My Account')) {
            cy.log('Login successful: Account details found');
        } else {
            throw new Error('Login did not complete successfully.');
        }
    });
});

Then('I should see incorrect account sign-in request', () => {
    cy.get('.message-error')
        .should('be.visible')
        .and('contain', 'The account sign-in was incorrect');
});