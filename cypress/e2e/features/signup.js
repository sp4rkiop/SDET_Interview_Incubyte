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
    cy.get('body').then(($body) => {
        if ($body.text().includes('Thank you for registering with Main Website Store.')) {
            cy.log('Signup successful: Account successfully created');
        } else {
            throw new Error('Signup failed: Neither success nor "already exists" message found');
        }
    });
});

Then('I should see account exists error', () => {
    cy.get('body').then(($body) => {
        if ($body.text().includes('There is already an account with this email address')) {
            cy.log('Signup failed: Account already exists');
        } else {
            throw new Error('Signup failed: Neither success nor "already exists" message found');
        }
    });
});
