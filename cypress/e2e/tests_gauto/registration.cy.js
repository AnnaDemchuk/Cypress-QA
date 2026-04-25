import ModalLogin from '../../pages/Gauto/modalLogin';
import ModalRegistration from '../../pages/Gauto/modalRegistration';
import { faker } from '@faker-js/faker';

let testData;
const modalLogin = new ModalLogin();
const modalRegistration = new ModalRegistration();

describe('modal registration', () => {

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        cy.get('.header_right').contains('button', 'Sign In').click();
        modalLogin.clickRegistrationButton();
        cy.fixture('gauto/registrationData').then((data) => {
            testData = data;
        })
    });


    describe('invalid name on registration form', () => {
        afterEach(() => {
            modalRegistration.verifyBorderColor(modalRegistration.selectors.nameInput);
        });

        it.only('impossible registration with empty name', () => {
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

        it('impossible registration with invalid name', () => {
            modalRegistration.fillRegistrationForm(
                testData.wrongData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.nameErrorMessage, testData.wrongData.invalidName);
        });

        it('impossible registration with short name', () => {
            modalRegistration.fillRegistrationForm(
                testData.shortData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.nameErrorMessage, testData.shortData.invalidName);
        });

        it('impossible registration with long name', () => {
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

    describe('invalid password on registration form', () => {
        afterEach(() => {
            modalRegistration.verifyBorderColor(modalRegistration.selectors.passwordInput);
        });


        it('impossible registration with empty password', () => {
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

        it('impossible registration with invalid password', () => {
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.wrongData.password,
                testData.wrongData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.passwordErrorMessage, testData.wrongData.invalidPassword);
        });

        it('impossible registration with short password', () => {
            modalRegistration.fillRegistrationForm(
                testData.validData.name,
                testData.validData.lastName,
                testData.validData.email,
                testData.shortData.password,
                testData.shortData.confirmPassword
            );
            modalRegistration.verifyErrorText(modalRegistration.selectors.passwordErrorMessage, testData.shortData.invalidPassword);
        });

        it('impossible registration with long password', () => {
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

    describe('invalid confirm password on registration form', () => {
        afterEach(() => {
            modalRegistration.verifyBorderColor(modalRegistration.selectors.reEnterPasswordInput);
        });

        it('impossible registration with empty confirm password', () => {
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

        it('impossible registration with no match confirm password', () => {
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

    describe('registration', () => {

        it('if fields are empty, button Register is disabled on registration form', () => {
            modalRegistration.clickOnField(modalRegistration.selectors.nameInput);
            modalRegistration.clickOnField(modalRegistration.selectors.lastNameInput);
            modalRegistration.clickOnField(modalRegistration.selectors.emailInput);
            modalRegistration.clickOnField(modalRegistration.selectors.passwordInput);
            modalRegistration.clickOnField(modalRegistration.selectors.reEnterPasswordInput);

            modalRegistration.verifyButtonDisabled();
        });

        it.skip('successfull registration', () => {
            let email = faker.internet.email();
            let name = faker.person.firstName();
            let lastName = faker.person.lastName();

            modalRegistration.sendRegistrationForm(
                name,
                lastName,
                email,
                testData.validData.password,
                testData.validData.confirmPassword
            );
            console.log(email);
            cy.url().should('include', 'https://qauto.forstudy.space/panel/garage');
        });
    });
});



