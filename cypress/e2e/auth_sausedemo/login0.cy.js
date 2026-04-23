
describe('Test login saucedemo.com', () => {

    //without pom, without fixture
beforeEach(() => {
    cy.visit('https://www.saucedemo.com/')
})

    it('should login with valid credentials' , () => {

        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')
    })

const invalidCredentials = [
    { username: 'locked_out_user', password: 'secret_sauce' },
    { username: 'standard_user', password: 'wrong_password' },
    { username: 'invalid_user', password: 'secret_sauce' },
    { username: 'invalid_user', password: 'wrong_password' },
];

invalidCredentials.forEach(({ username, password }) => {
    it(`should not login with invalid credentials: ${username} / ${password}`, () => {
        cy.get('#user-name').type(username);
        cy.get('#password').type(password);
        cy.get('#login-button').click();
        cy.get('[data-test="error"]').should('be.visible');
    });
});
})

