import { carData } from "../../fixtures/gauto/carData";
import ModalCar from "../../pages/Gauto/modalCar";
import ModalExpense from "../../pages/Gauto/modalExperse";
import FuelExpensesPage from "../../pages/Gauto/fuelExpensesPage";
import MainPage from "../../pages/Gauto/mainPage";
import GaragePage from "../../pages/Gauto/garagePage";
import Basepage from "../../pages/Gauto/BasePage";
import ModalLogin from "../../pages/Gauto/modalLogin";

let testData;
const mainPage = new MainPage();
const garagePage = new GaragePage();
const modalCar = new ModalCar();
const fuelExpensesPage = new FuelExpensesPage();
const modalExpense = new ModalExpense();
const basePage = new Basepage();
const modalLogin = new ModalLogin();

describe('successful login', () => {

    beforeEach(() => {
       // cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
        cy.visit('/', {
            auth: {
                username: 'guest',
                password: 'welcome2qauto'
            }
        });


        mainPage.clickSignInButton();
        cy.fixture('gauto/users').then((data) => {
            return cy.then(() => {
                modalLogin.sendLoginForm(
                    data.existedUser.email,
                    data.existedUser.password
                );
                garagePage.verifyPageUrl();
            });
        });
    });

    it.skip('Add a new car', () => {

        const brand = carData.carBMW.brand;
        const model = carData.carBMW.model;
        const mileage = carData.carBMW.mileage;

        garagePage.clickAddCarButton();
        modalCar.sendAddCarForm(brand, model, mileage);
        garagePage.verifyCarAdded(brand, model, mileage);

        garagePage.clickEditCarButton();
        garagePage.removeAllCars();
    });


    it('Add fuel expense', () => {

        garagePage.removeAllCars();

        const brand = carData.carBMW.brand;
        const model = carData.carBMW.model;
        const mileage = carData.carBMW.mileage;
        const liters = carData.carBMW.liters;
        const totalCost = carData.carBMW.totalCost;
        const newMileade = carData.carBMW.new_mileage;

        garagePage.clickAddCarButton();
        modalCar.sendAddCarForm(brand, model, mileage);

        garagePage.clickAddFuelExpenseButton();
        modalExpense.sendAddExpenseForm(newMileade, liters, totalCost);

        fuelExpensesPage.openFuelExpensePage();
        fuelExpensesPage.reloadPage();
        fuelExpensesPage.verifyAddedExpense(newMileade, liters, totalCost);
        fuelExpensesPage.deleteFirstFuelExpense();

        garagePage.openGaragePage();
        garagePage.removeAllCars();

    });
});