import LoginPage from "../../pages/SauseDemo/LoginPage";

//test with POM and fixture data (json file)
let testData;

describe('Login Tests', () => {
    const loginPage = new LoginPage();
    beforeEach(() => {
        loginPage.visit();
        loginPage.verifyOpenloginpage();
        cy.fixture('sausedemo/users2').then((data) => {
            testData = data;
        });
    });

   it('should login with valid credentials1', () => {
        cy.login(testData.standard_user.username, testData.standard_user.password);
        cy.url().should('include', '/inventory.html');
    });

    it('should login with valid credentials2', () => {
        loginPage.login(testData.standard_user.username, testData.standard_user.password);
        cy.url().should('include', '/inventory.html');
    });
});