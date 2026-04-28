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


    sendRegistrationForm(name, lastName, email, password, reEnterPassword) {
        cy.get(this.selectors.nameInput).type(name);
        cy.get(this.selectors.lastNameInput).type(lastName);
        cy.get(this.selectors.emailInput).type(email);
        cy.get(this.selectors.passwordInput)
            .type(password, { sensitive: true });
        cy.get(this.selectors.reEnterPasswordInput)
            .type(reEnterPassword, { sensitive: true });

        cy.get(this.selectors.registerButton).click();
    }

    fillPasswords(password, reEnterPassword) {
        cy.get(this.selectors.passwordInput)
            .type(password, { sensitive: true });

        cy.get(this.selectors.reEnterPasswordInput)
            .type(reEnterPassword, { sensitive: true });

        this.clickOnField(this.selectors.emailInput);
    }

    clickOnField(selector) {
        cy.get(selector).debug().click();
    }

    verifyBorderColor(selector, hasError) {
  
        if (hasError === true) {
            cy.get(selector).should('have.class', 'is-invalid');
        } else {
            cy.get(selector).should('not.have.class', 'is-invalid');
        }
    }

    getErrorText(error_text_selector, hasError) {
    
        if (hasError === true) {
            return cy.get(error_text_selector)
                .should('be.visible')
                .invoke('text')
                .then(text => text.trim());
        }
        else {
            return cy.get('.modal-body').then($body => {
                const element = $body.find(error_text_selector);

                return element.length ? element.text().trim() : null;
            });
        }
    }

    verifyErrorText(error_text_selector, expectedText, hasError) {
        this.getErrorText(error_text_selector, hasError).should('eq', expectedText);
    }

    typeValue(input_selector, value) {
        if (value !== undefined) {
            cy.get(input_selector).clear().type(value);
        }
        else {
            this.clickOnField(input_selector);
            this.clickOnField(this.selectors.emailInput);
        }
    }

    validateInputText(
        input_selector,
        error_text_selector,
        value,
        expectedTextError,
        hasError) {
    
        this.typeValue(input_selector, value);
        this.verifyErrorText(error_text_selector, expectedTextError, hasError);
        this.verifyBorderColor(input_selector, hasError);
    }

    verifyButtonDisabled() {
        cy.get(this.selectors.registerButton).should('be.disabled');
    }
}

export default ModalRegistration;