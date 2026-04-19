describe('inventory tests', () => {

    beforeEach(() => {

        cy.visit('/')
        cy.get('#user-name').type('standard_user')
        cy.get('#password').type('secret_sauce')
        cy.get('#login-button').click()
        cy.url().should('include', '/inventory.html')
    })

    it('check button "add to cart"/"remove"', () => {
        cy.get('.inventory_item').first().find('button').as('firstButton');
        cy.get('@firstButton').click();
        cy.get('[data-test="shopping-cart-badge"]').should('be.visible').and('have.text', '1'); //

        cy.get('@firstButton').should('have.text', 'Remove');
        cy.get('@firstButton').click();
        cy.get('[data-test="shopping-cart-badge"]').should('not.exist');
        cy.get('@firstButton').should('have.text', 'Add to cart');
    }
    );

    it('inventory_item has title, description, and price', () => {

        cy.get('.inventory_item').each(($item) => {
            cy.wrap($item).within(() => {
                cy.get('.inventory_item_name').should('not.be.empty');
                cy.get('.inventory_item_desc').should('not.be.empty');
                cy.get('.inventory_item_price').should('not.be.empty');
                cy.get('img.inventory_item_img')
                    .should('have.attr', 'src')
                    .and('not.be.empty');
            });
        });
    });


    it("should display inventory items", () => {
        cy.get('.inventory_item').should('be.visible');
        cy.get('.inventory_item').should('have.length.greaterThan', 5);
    });
});