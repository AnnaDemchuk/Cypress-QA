class LoginPage {
    selectors = {
        usernameInput: '#user-name',
        passwordInput: '#password',
        loginButton: '#login-button',
        errorMessage: '[data-test="error"]'
    };

    visit() {
        cy.visit('https://www.saucedemo.com/')
    }

    login(username, password) {
        cy.get(this.selectors.usernameInput).type(username);
        cy.get(this.selectors.passwordInput).type(password);
        cy.get(this.selectors.loginButton).click();
    }

    getErrorMessage() {
        return cy.get(this.selectors.errorMessage);
    }

    getUserNameInput() {
        return cy.get(this.selectors.usernameInput);
    }

    getPasswordInput() {
        return cy.get(this.selectors.passwordInput);
    }

    getLoginButton() {
        return cy.get(this.selectors.loginButton);
    }

    typeUsername(username) {
         this.getUserNameInput().clear().type(username);       
    }

    typePassword(password) {
        this.getPasswordInput().clear().type(password);
    }

    clickLogin() {
        this.getLoginButton().click();
    }

    verifyOpenloginpage() {
        cy.url().should('include', 'saucedemo.com');
        this.getUserNameInput().should('be.visible');
        this.getPasswordInput().should('be.visible');
        this.getLoginButton().should('be.visible');
    }


    verifyErrorMessage(expectedMessage) {
        this.getErrorMessage().should('be.visible').and('have.text', expectedMessage);
    }
}

export default LoginPage;