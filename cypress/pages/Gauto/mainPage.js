class MainPage {

    selectors = {
        signInButton: '.header_right button:contains("Sign In")',
    }

    clickSignInButton() {
        cy.get(this.selectors.signInButton).click();
    }
}
export default MainPage;