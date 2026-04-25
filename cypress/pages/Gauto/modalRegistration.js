class ModalRegistration {
    selectors = {
        nameInput: '#signupName',
        lastNameInput: '#signupLastName',
        emailInput: '#signupEmail',
        passwordInput: '#signupPassword',
        reEnterPasswordInput: '#signupRepeatPassword',
        registerButton: '.modal-footer button[type="button"]',
        nameErrorMessage: '#signupName ~ .invalid-feedback p',
        lastNameErrorMessage: '#signupLastName ~ .invalid-feedback p',
        emailErrorMessage: '#signupEmail ~ .invalid-feedback p',
        passwordErrorMessage: '#signupPassword ~ .invalid-feedback p',
        reEnterPasswordErrorMessage: '[formcontrolname="repeatPassword"] ~ .invalid-feedback p',
    };

    fillRegistrationForm(name, lastName, email, password, reEnterPassword) {
        if (name) {
            cy.get(this.selectors.nameInput).type(name);
        }
        if (lastName) {
            cy.get(this.selectors.lastNameInput).type(lastName);
        }
        if (email) {
            cy.get(this.selectors.emailInput).type(email);
        }
        if (password) {
            cy.get(this.selectors.passwordInput).type(password, { sensitive: true });
        }
        if (reEnterPassword) {
            cy.get(this.selectors.reEnterPasswordInput).type(reEnterPassword, { sensitive: true });
        }
    }

    clickOnField(selector) {
        cy.get(selector).click();
    }

    sendRegistrationForm(name, lastName, email, password, reEnterPassword) {
        this.fillRegistrationForm(name, lastName, email, password, reEnterPassword);
        this.clickRegisterButton();
    }

    clickRegisterButton() {
        cy.get(this.selectors.registerButton).click();
    }

    verifyBorderColor(selector) {
        cy.get(selector).should('have.class', 'is-invalid');
    }

    getErrorText(selector) {
        return cy
            .get(selector)
            .invoke('text')
            .then(text => text.trim());
    }

    verifyErrorText(selector, expectedText) {
        this.getErrorText(selector).should('eq', expectedText);
    }

    verifyButtonDisabled() {
        cy.get(this.selectors.registerButton).should('be.disabled');
    }
}

export default ModalRegistration;