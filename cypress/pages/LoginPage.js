class LoginPage {
    visit() {
        cy.visit('https://magento.softwaretestingboard.com/customer/account/login/');
    }

    login(email, password) {
        cy.get('#email').type(email);
        cy.get('#pass').type(password);
        cy.get('button.action.login.primary').click();
    }
}

export default LoginPage;
