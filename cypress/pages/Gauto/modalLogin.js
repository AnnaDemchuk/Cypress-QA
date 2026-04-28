class ModalLogin {
    selectors = {
        emailInput: '#signinEmail',
        passwordInput: '#signinPassword',
        loginButton: '.modal-footer button[type="button"]:contains("Login")',
        registrationButton: '.modal-footer button[type="button"]:contains("Registration")',
    }

    sendLoginForm(email, password) {
        cy.get(this.selectors.emailInput).type(email);
        cy.get(this.selectors.passwordInput).type(password);
        cy.get(this.selectors.loginButton).click();
    }

     clickRegistrationButton() {
        cy.get(this.selectors.registrationButton).click();
    }
}
export default ModalLogin;

