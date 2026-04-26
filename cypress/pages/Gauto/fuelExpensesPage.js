import BasePage from './BasePage';

class FuelExpensesPage extends BasePage {
    selectors = {
        tableBody: 'tbody',
        confirmDeleteButton: 'app-delete-expense-modal button:contains("Remove")',
        deleteExpenseButton: '.btn.btn-delete',
    }

    verifyPageUrl() {
        cy.url().should('include', '/panel/expenses');
    }

    openGaragePage() {
        super.openGaragePage()
    }

    openFuelExpensePage() {
        super.openFuelExpensePage()
    }

    getColumsInFirstRow() {
        return cy.get(this.selectors.tableBody).find('tr').eq(0).find('td');
    }

    getMileageFromFirstRow() {
        return this.getColumsInFirstRow()
            .eq(1)
            .invoke('text')
            .then((text) => {
                const numeric = text.replace(/[^\d.]/g, ''); // оставить цифры и точку
                return Math.floor(parseFloat(numeric));
            });
    }

    getLitersFromFirstRow() {
        return this.getColumsInFirstRow().eq(2).invoke('text').then((text) => {
            const numeric = text.replace(/[^\d.]/g, ''); // оставить цифры и точку
            return Math.floor(parseFloat(numeric));
        });
    }

    getTotalPriceFromFirstRow() {
        return this.getColumsInFirstRow().eq(3).invoke('text').then((text) => {
            const numeric = text.replace(/[^\d.]/g, ''); // оставить цифры и точку
            return Math.floor(parseFloat(numeric));
        });
    }

    verifyAddedExpense(mileage, liters, totalPrice) {
        cy.log('---verifyAddedExpense---');
        console.log('getMileageFromFirstRow()', this.getMileageFromFirstRow());
        console.log('getLitersFromFirstRow()', this.getLitersFromFirstRow());
        console.log('getTotalPriceFromFirstRow()', this.getTotalPriceFromFirstRow());

        this.getMileageFromFirstRow().should('equal', Number(mileage));
        this.getLitersFromFirstRow().should('equal', Number(liters));
        this.getTotalPriceFromFirstRow().should('equal', Number(totalPrice));
    }

    deleteFirstFuelExpense() {
        cy.log('---deleteFirstFuelExpense---');

        this.getColumsInFirstRow().eq(4).find(this.selectors.deleteExpenseButton).click({ force: true });
        cy.get(this.selectors.confirmDeleteButton).click();
    }

    verifyExpenseDeleted() {
        cy.get(this.selectors.tableBody).find('tr').should('have.length', 0);
    }


    reloadPage() {
        cy.log('---reloadPage---');
        cy.reload();
    }
}
export default FuelExpensesPage;