import ModalRegistration from "../../pages/Gauto/modalRegistration";
import ModalLogin from "../../pages/Gauto/modalLogin";
import MainPage from "../../pages/Gauto/mainPage";
import GaragePage from "../../pages/Gauto/garagePage";
import { regiData } from "../../fixtures/gauto/regiData";

const modalLogin = new ModalLogin();
const modalRegistration = new ModalRegistration();
const mainPage = new MainPage();
const garagePage = new GaragePage();

describe('Verify Registration flow ', () => {


    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        mainPage.clickSignInButton();
        modalLogin.clickRegistrationButton();
    });

    const validateInput = (input_selector, error_text_selector, testCases) => {
        testCases.forEach(({ input, expectedError, hasError }) => {
         
            modalRegistration.validateInputText(input_selector, error_text_selector, input, expectedError, hasError);
        });
    };

    it('Name validation', () => {
        validateInput(modalRegistration.selectors.nameInput, modalRegistration.selectors.nameErrorMessage, [
            {
                input: regiData.name.empty,
                expectedError: regiData.name.message_empty,
                hasError: true
            },
            {
                input: regiData.name.invalid_name_with_numbers,
                expectedError: regiData.name.message_invalid,
                hasError: true
            },
            {
                input: regiData.name.short,
                expectedError: regiData.name.message_length,
                hasError: true
            },
            {
                input: regiData.name.long,
                expectedError: regiData.name.message_length,
                hasError: true
            },
            {
                input: regiData.name.valid_3_sign,
                expectedError: null,
                hasError: false
            },
            {
                input: regiData.name.valid_20_sign,
                expectedError: null,
                hasError: false
            },
        ]);
    });

    it('Last Name validation', () => {
        validateInput(modalRegistration.selectors.lastNameInput, modalRegistration.selectors.lastNameErrorMessage, [
            {
                input: regiData.last_name.empty,
                expectedError: regiData.last_name.message_empty,
                hasError: true
            },
            {
                input: regiData.last_name.invalid_name_with_numbers,
                expectedError: regiData.last_name.message_invalid,
                hasError: true
            },
            {
                input: regiData.last_name.short,
                expectedError: regiData.last_name.message_length,
                hasError: true
            },
            {
                input: regiData.last_name.long,
                expectedError: regiData.last_name.message_length,
                hasError: true
            },
            {
                input: regiData.last_name.valid_3_sign,
                expectedError: null,
                hasError: false
            },
            {
                input: regiData.last_name.valid_20_sign,
                expectedError: null,
                hasError: false
            },
        ]);
    });


    it('Password validation', () => {
        validateInput(modalRegistration.selectors.passwordInput, modalRegistration.selectors.passwordErrorMessage, [
            {
                input: regiData.password.empty,
                expectedError: regiData.password.message_empty,
                hasError: true
            },
            {
                input: regiData.password.short,
                expectedError: regiData.password.message_length,
                hasError: true
            },
            {
                input: regiData.password.long,
                expectedError: regiData.password.message_length,
                hasError: true
            },
            {
                input: regiData.password.valid_8_sign,
                expectedError: null,
                hasError: false
            },
            {
                input: regiData.password.valid_15_sign,
                expectedError: null,
                hasError: false
            },
        ]);
    });

    it('Password validation', () => {
        modalRegistration.fillPasswords(
            regiData.confirm_password.password,
            regiData.confirm_password.re_enter_password);

        modalRegistration.verifyErrorText(
            modalRegistration.selectors.reEnterPasswordErrorMessage,
            regiData.confirm_password.message_not_match, true);

        modalRegistration.verifyBorderColor(
            modalRegistration.selectors.reEnterPasswordInput, true);
    });


    it.skip('successfull registration', () => {
        let email = faker.internet.email();
        let name = faker.person.firstName().slice(0, 10);;
        let lastName = faker.person.lastName().slice(0, 10);;

        modalRegistration.sendRegistrationForm(
            name,
            lastName,
            email,
            regiData.password.valid_8_sign,
            regiData.password.valid_8_sign
        );
    
        garagePage.verifyGaragePageUrl();
    });

    it.only('if fields are empty, button Register is disabled on registration form', () => {
        cy.log('====Check that the Register button is disabled when all fields are empty==');
        modalRegistration.clickOnField(modalRegistration.selectors.nameInput);
       
       // debugger;
       //cy.pause();

       //visual check of the test execution in the Cypress Test Runner
       cy.screenshot('after-clicking-name-input');
        modalRegistration.clickOnField(modalRegistration.selectors.lastNameInput);
        modalRegistration.clickOnField(modalRegistration.selectors.emailInput);

      
        modalRegistration.clickOnField(modalRegistration.selectors.passwordInput);
        modalRegistration.clickOnField(modalRegistration.selectors.reEnterPasswordInput);

        modalRegistration.verifyButtonDisabled();
    });

});