class GaragePage {

 url = 'https://qauto.forstudy.space/panel/garage';

    verifyGaragePageUrl() {
        cy.url().should('include', this.url);
    }
}

export default GaragePage;