import ModalRegistration from '../../pages/Gauto/modal_registration';
import { faker } from '@faker-js/faker';

let testData;
const modalRegistration = new ModalRegistration();

describe('modal registration', () => {

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        cy.get('.header_right').contains('button', 'Sign In').click();
        cy.get('.modal-content').contains('button', 'Registration').click();
        cy.fixture('gauto/login').then((data) => {
            testData = data;
        })
    });


    describe('invalid name', () => {
        afterEach(() => {
            modalRegistration.verifyBorderColor(modalRegistration.selectors.nameInput);
        });

        it('impossible login with empty name', () => {
            modalRegistration.clickOnField(modalRegistration.selectors.nameInput);

            modalRegistration.fillRegistrationForm(
                undefined,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.nameErrorMessage, testData.emptyData.invalidName);
        });

        it('impossible login with invalid name', () => {
            modalRegistration.fillRegistrationForm(
                testData.wrongData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.nameErrorMessage, testData.wrongData.invalidName);
        });

        it('impossible login with short name', () => {
            modalRegistration.fillRegistrationForm(
                testData.shortData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.nameErrorMessage, testData.shortData.invalidName);
        });

        it('impossible login with long name', () => {
            modalRegistration.fillRegistrationForm(
                testData.longData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.nameErrorMessage, testData.longData.invalidName);
        });
    });

    describe('invalid password', () => {
        afterEach(() => {
            modalRegistration.verifyBorderColor(modalRegistration.selectors.passwordInput);
        });


        it('impossible login with empty password', () => {
            modalRegistration.clickOnField(modalRegistration.selectors.passwordInput);

            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                undefined,
                testData.validData.confirmPassword
            );

            modalRegistration.verifyErrorText(modalRegistration.selectors.passwordErrorMessage, testData.emptyData.invalidPassword);
        });

        it('impossible login with invalid password', () => {
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.wrongData.password,
                testData.wrongData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.passwordErrorMessage, testData.wrongData.invalidPassword);
        });

        it('impossible login with short password', () => {
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.shortData.password,
                testData.shortData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.passwordErrorMessage, testData.shortData.invalidPassword);
        });

        it('impossible login with long password', () => {
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.longData.password,
                testData.longData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.passwordErrorMessage, testData.longData.invalidPassword);
        });
    });

    describe('invalid confirm password', () => {
         afterEach(() => {
            modalRegistration.verifyBorderColor(modalRegistration.selectors.reEnterPasswordInput);
        });

        it('impossible login with empty confirm password', () => {
            modalRegistration.clickOnField(modalRegistration.selectors.reEnterPasswordInput);
            
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                undefined
            );
            
            modalRegistration.verifyErrorText(modalRegistration.selectors.reEnterPasswordErrorMessage, testData.emptyData.invalidConfirmPassword);
        });

        it('impossible login with no match confirm password', () => {
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.passwordNotMatch.password,
                testData.passwordNotMatch.confirmPassword
            );
            modalRegistration.clickOnField(modalRegistration.selectors.nameInput);
            modalRegistration.verifyErrorText(modalRegistration.selectors.reEnterPasswordErrorMessage, testData.passwordNotMatch.invalidConfirmPassword);
        });
    });
});



describe.only('login flow', () => {
    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        cy.get('.header_right').contains('button', 'Sign In').click();
        cy.get('.modal-content').contains('button', 'Registration').click();
        cy.fixture('gauto/login').then((data) => {
            testData = data;
        })
    });


    it('if fields are empty, button Register is disabled', () => {
        modalRegistration.sendRegistrationForm(
            testData.emptyData.name,
            testData.emptyData.lastName,
            testData.emptyData.email,
            testData.emptyData.password,
            testData.emptyData.confirmPassword
        );
        modalRegistration.verifyButtonDisabled();
    });

    it.skip('successfull login', () => {
        let email = faker.internet.email();
        modalRegistration.sendRegistrationForm(
            testData.validData.name,
            testData.validData.lastName,
            email,
            testData.validData.password,
            testData.validData.confirmPassword
        );
        console.log(email);
        cy.url().should('include', 'https://qauto.forstudy.space/panel/garage');
    });
});
