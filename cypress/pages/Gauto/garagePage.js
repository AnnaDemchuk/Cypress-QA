import BasePage from './BasePage';

class GaragePage extends BasePage {

    selectors = {
        addCarButton: 'button:contains("Add car")',
        carName: '.car_name',
        carMileage: 'input[formcontrolname="miles"]',
        addFuelExpenseButton: 'button:contains("Add fuel expense")',
        editCarButton: '.car_edit.btn.btn-edit',
        removeCarButton: '.modal-footer button:contains("Remove car")',
        confirmRemoveButton: 'app-remove-car-modal button:contains("Remove")'
    }

    verifyPageUrl() {
        cy.url().should('include', '/panel/garage');
    }

    clickAddCarButton() {
        cy.get(this.selectors.addCarButton).click();
    }

    verifyCarAdded(brand, model, mileage) {

        const carName = `${brand} ${model}`;
        cy.get(this.selectors.carName).should('contain.text', carName);
        cy.get(this.selectors.carMileage)
            .then($el => {
                const value = $el[0].value
                expect(value).to.equal(mileage.toString());
            })
    }

    clickAddFuelExpenseButton() {
        cy.get(this.selectors.addFuelExpenseButton).click();
    }

    clickEditCarButton() {
        cy.get(this.selectors.editCarButton).first().click();
    }

    clickRemoveCarButton() {
        cy.get(this.selectors.removeCarButton).first().click(); 
    }

    clickConfirmRemoveButton() {
        cy.get(this.selectors.confirmRemoveButton).click();
    }

    removeAllCars() {

        cy.get(this.selectors.editCarButton).then(($buttons) => {
            const count = $buttons.length;

            if (count === 0) {
                cy.log('No cars to remove');
                return;
            }

            cy.wrap([...Array(count)]).each(() => {
        
                cy.get(this.selectors.editCarButton)
                    .first()
                    .click();

                this.clickRemoveCarButton();
                this.clickConfirmRemoveButton();

                cy.wait(300);
            });
        });
    }
};

export default GaragePage;