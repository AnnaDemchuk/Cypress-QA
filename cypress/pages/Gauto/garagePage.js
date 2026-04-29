class GaragePage {

 url = 'https://qauto.forstudy.space/panel/garage';

    verifyPageUrl() {
        cy.url().should('include', this.url);
    }
}

export default GaragePage;