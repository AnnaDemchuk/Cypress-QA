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

    getColumsInFirstRow() {
        return cy.get(this.selectors.tableBody).find('tr').eq(0).find('td');
    }

    getDataFromFirstRow(field) {
        const columnMap = {
            mileage: 1,
            liters: 2,
            totalPrice: 3,
        };

        const index = columnMap[field];

        if (index === undefined) {
            throw new Error(`Invalid field: ${field}`);
        }

        return this.getColumsInFirstRow()
            .eq(index)
            .invoke('text')
            .then((text) => {
                const numeric = text.replace(/[^\d.]/g, '');
                return Math.floor(parseFloat(numeric)); //потом добавить сравнение дробных
            });
    }


    verifyAddedExpense(mileage, liters, totalPrice) {
        this.getDataFromFirstRow('mileage').should('equal', Number(mileage));
        this.getDataFromFirstRow('liters').should('equal', Number(liters));
        this.getDataFromFirstRow('totalPrice').should('equal', Number(totalPrice));
    }

    deleteFirstFuelExpense() {
        this.getColumsInFirstRow().eq(4).find(this.selectors.deleteExpenseButton).click({ force: true });
        cy.get(this.selectors.confirmDeleteButton).click();
    }

    verifyExpenseDeleted() {
        cy.get(this.selectors.tableBody).find('tr').should('have.length', 0);
    }

    reloadPage() {
        cy.reload();
    }
}
export default FuelExpensesPage;