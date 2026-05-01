describe('Cars API', () => {
    beforeEach(() => {
        cy.signupAndSaveSession();
    });

    it('should get cars', () => {
        cy.request('GET', 'https://qauto.forstudy.space/api/cars').then((response) => {
            expect(response.status).to.eq(200);
        });
    });

    it('should get cars2', () => {
        cy.request('GET', 'https://qauto.forstudy.space/api/cars').then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});