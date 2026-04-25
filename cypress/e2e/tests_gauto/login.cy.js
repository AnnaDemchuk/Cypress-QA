import ModalLogin from "../../pages/Gauto/modalLogin";

let testData;

describe('successful login', () => {

    before(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        cy.get('.header_right').contains('button', 'Sign In').click();
        cy.fixture('gauto/users').then((data) => {
            testData = data;
        })
    });

    it('successful login in Gauto by existed user', () => {
        cy.loginGauto(testData.existedUser.email, testData.existedUser.password);
        cy.url().should('include', 'https://qauto.forstudy.space/panel/garage');
    });
});