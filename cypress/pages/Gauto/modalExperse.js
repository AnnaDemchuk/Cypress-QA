class ModalExpense {
    selectors = {
        vehicleInput: '#addExpenseCar',
        reportDateInput: '#addExpenseDate',
        mileageInput: '#addExpenseMileage',
        litersInput: '#addExpenseLiters',
        totalCostInput: '#addExpenseTotalCost',
        addButton: '.modal-footer button:contains("Add")'
    }

    sendAddExpenseForm(mileage, liters, totalCost) {
        // cy.get(this.selectors.vehicleInput).type(vehicle);
        // cy.get(this.selectors.reportDateInput).type(reportDate);
        cy.get(this.selectors.mileageInput).clear().type(mileage);
        cy.get(this.selectors.litersInput).type(liters);
        cy.get(this.selectors.totalCostInput).type(totalCost);
        cy.get(this.selectors.addButton).click();
    }

}
export default ModalExpense;
