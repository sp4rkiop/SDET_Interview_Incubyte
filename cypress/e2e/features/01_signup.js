import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import SignupPage from '../../pages/SignupPage';

const signup = new SignupPage();
let testEmail = '';
let testPassword = 'Password123!';
const firstName = 'Abhishek';
const lastName = 'Test';

Given('I visit the signup page', () => {
    cy.log('Visiting signup page');
    signup.visit();
});

When('I fill in the signup form with new data', () => {
    const timestamp = Date.now();
    testEmail = `abhishek.test${timestamp}@email.com`;

    // Save email and password to fixture
    cy.writeFile('cypress/fixtures/testuser.json', {
        email: testEmail,
        password: testPassword
    });
    signup.fillForm(firstName, lastName, testEmail, testPassword);
});

When('I fill in the signup form with existing data', () => {
    cy.fixture('testuser.json').then((user) => {
        signup.fillForm(firstName, lastName, user.email, user.password);
    });
});

Then('I should see account creation success message', () => {
    cy.url().should('include', '/customer/account');
    cy.contains('Thank you for registering').should('be.visible');

});

Then('I should see account exists error', () => {
    cy.get('.message-error')
        .should('be.visible')
        .and('contain', 'There is already an account');
});
