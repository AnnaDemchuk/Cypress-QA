class ModalCar {
    selectors = {
        brandInput: '#addCarBrand',
        modelInput: '#addCarModel',
        mileageInput: '#addCarMileage',
        addCarButton: '.modal-footer button:contains("Add")',
        removeCarButton: '.modal-footer button:contains("Remove car")',
        brandDropdownOption: '#addCarBrand option',
        modelDropdownOption: '#addCarModel option',
        confirmRemoveButton: 'app-remove-car-modal button:contains("Remove")'
    }

    selectBrand(brand) {
        cy.get(this.selectors.brandInput).select(brand);
    }

    selectModel(model) {
        cy.get(this.selectors.modelInput).select(model);

    }

    sendAddCarForm(brand, model, mileage) {
        this.selectBrand(brand);
        this.selectModel(model);
        cy.get(this.selectors.mileageInput).type(mileage);
        cy.get(this.selectors.addCarButton).click();
    }

    removeCar() {
        this.clickRemoveCarButton();
        this.clickConfirmRemoveButton();
    }


    clickRemoveCarButton() {
        cy.get(this.selectors.removeCarButton).click();
    }

    clickConfirmRemoveButton() {
        cy.get(this.selectors.confirmRemoveButton).click();
    }
}

export default ModalCar;