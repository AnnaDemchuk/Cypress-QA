class BasePage {

    _selectors = {
        garageButton: '.header_nav a:contains("Garage")',
        fuelExpenseButton: '.header_nav a:contains("Fuel expenses")',
    }

    openGaragePage() {
        cy.get(this._selectors.garageButton).click();
        cy.url().should('include', '/panel/garage');
    }

    openFuelExpensePage() {
        cy.get(this._selectors.fuelExpenseButton).click();
        cy.url().should('include', '/panel/expenses');
    }
}
export default BasePage;