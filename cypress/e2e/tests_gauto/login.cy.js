import ModalLogin from "../../pages/Gauto/modalLogin";

let testData;
const mainPage = new MainPage();
const garagePage = new GaragePage();

describe('successful login', () => {

    before(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        mainPage.clickSignInButton();
        cy.fixture('gauto/users').then((data) => {
            testData = data;
        })
    });

    it('successful login in Gauto by existed user', () => {
        cy.loginGauto(testData.existedUser.email, testData.existedUser.password);
        garagePage.verifyGaragePageUrl();
    });
});