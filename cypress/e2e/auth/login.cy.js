import LoginPage from "../../pages/LoginPage";
import { users } from "../../fixtures/users";

describe('Login Tests', () => {
    const loginPage = new LoginPage();
    beforeEach(() => {
        //LoginPage.visit();
        loginPage.visit();
        loginPage.verifyOpenloginpage();
    });

    it('should login with valid credentials', () => {
        loginPage.login(users.standard_user.username, users.standard_user.password);
        cy.url().should('include', '/inventory.html');
    });

    it('should display error message with invalid credentials', () => {
        loginPage.login(users.invalid_user.username, users.invalid_user.password);
        loginPage.verifyErrorMessage('Epic sadface: Username and password do not match any user in this service');
    });
});