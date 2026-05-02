import BasePage from './BasePage';
import ModalCar from './modalCar';

class GaragePage extends BasePage {

    selectors = {
        addCarButton: 'button:contains("Add car")',
        carName: '.car_name',
        carMileage: 'input[formcontrolname="miles"]',
        addFuelExpenseButton: 'button:contains("Add fuel expense")',
        editCarButton: '.car_edit.btn.btn-edit',
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
        cy.get(this.selectors.addFuelExpenseButton).first().click();
    }

    clickEditCarButton() {
        cy.get(this.selectors.editCarButton).first().click();
    }

    removeAllCars() {
        const modalCar = new ModalCar();

        cy.get('body').then(($body) => {
            const buttons = $body.find(this.selectors.editCarButton);

            if (buttons.length === 0) {
                return;
            }

            cy.get(this.selectors.editCarButton).first().click();
            modalCar.removeCar();

            cy.get(this.selectors.editCarButton).should('have.length.lessThan', buttons.length);

            this.removeAllCars();
        });
    }
};

export default GaragePage;