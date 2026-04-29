import { carData } from "../../fixtures/gauto/carData";
import ModalCar from "../../pages/Gauto/modalCar";
import ModalExpense from "../../pages/Gauto/modalExperse";
import FuelExpensesPage from "../../pages/Gauto/fuelExpensesPage";
import MainPage from "../../pages/Gauto/mainPage";
import GaragePage from "../../pages/Gauto/garagePage";
import ModalLogin from "../../pages/Gauto/modalLogin";

const mainPage = new MainPage();
const garagePage = new GaragePage();
const modalCar = new ModalCar();
const fuelExpensesPage = new FuelExpensesPage();
const modalExpense = new ModalExpense();
const modalLogin = new ModalLogin();

describe('successful login', () => {

    beforeEach(() => {
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });

        mainPage.clickSignInButton();

        const email = Cypress.config('email');
        const password = Cypress.config('password');

        modalLogin.sendLoginForm(email, password);
        garagePage.verifyPageUrl();
    });

    afterEach(() => {
        garagePage.removeAllCars();
    });

    it('Add a new car', () => {

        const car = carData.carBMW;

        garagePage.clickAddCarButton();
        modalCar.sendAddCarForm(car.brand, car.model, car.mileage);
        garagePage.verifyCarAdded(car.brand, car.model, car.mileage);
    });

    it('Add fuel expense', () => {

        const car = carData.carBMW;

        garagePage.clickAddCarButton();
        modalCar.sendAddCarForm(car.brand, car.model, car.mileage);

        garagePage.clickAddFuelExpenseButton();
        modalExpense.sendAddExpenseForm(car.new_mileage, car.liters, car.totalCost);

        fuelExpensesPage.openFuelExpensePage();
        fuelExpensesPage.reloadPage();
        fuelExpensesPage.verifyAddedExpense(car.new_mileage, car.liters, car.totalCost);
        fuelExpensesPage.deleteFirstFuelExpense();

        garagePage.openGaragePage();
    });
});