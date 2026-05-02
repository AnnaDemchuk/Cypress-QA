import GaragePage from '../../pages/Gauto/garagePage';
import ModalCar from '../../pages/Gauto/modalCar';
import { getLoginCookieHeader } from '../helper/loginCookie';
import { carData } from '../../fixtures/gauto/carData';
import FuelExpensesPage from '../../pages/Gauto/fuelExpensesPage';

describe('Api cars responses', () => {
    let authCookie;
    const garagePage = new GaragePage();
    const modalCar = new ModalCar();
    const fuelExpensesPage = new FuelExpensesPage();
    const data = carData.carBMW;

    beforeEach(() => {
        getLoginCookieHeader().then((cookie) => {
            authCookie = cookie;
            cy.setCookie('sid', authCookie.split('=')[1]);
        });
    });

    it('should create car via UI and capture id from POST response', () => {
        cy.intercept('POST', '**/api/cars').as('postCars');

        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');
        garagePage.verifyPageUrl();

        //cy.deleteAllCarsByApi(authCookie);//clear cars before test

        garagePage.clickAddCarButton();
        modalCar.sendAddCarForm(data.brand, data.model, data.mileage);

        cy.wait('@postCars').then((interception) => {
            const body = interception.response.body;
            cy.log(JSON.stringify(body));
            expect(interception.response.statusCode).to.eq(201);

            cy.writeFile('cypress/fixtures/gauto/createdCar.json', { id: body.data.id });
        });
        garagePage.verifyCarAdded(
            data.brand, data.model, data.mileage);
    });

    it('should get car response and verify added car', () => {
        cy.fixture('gauto/createdCar').then(({ id: carId }) => {
            cy.request({
                method: 'GET',
                url: 'https://qauto.forstudy.space/api/cars',
                headers: {
                    Cookie: authCookie,
                },
            }).then((response) => {
                expect(response.status).to.eq(200);

                const carInList = response.body.data.find(car => car.id === carId);

                expect(carInList).to.exist;
                expect(carInList.brand).to.eq(data.brand);
                expect(carInList.mileage).to.eq(Number(data.mileage));
                expect(carInList.model).to.eq(data.model);
            });
        });
    });

    it('should create expense by API with custom command', () => {

        cy.deleteAllExpensesByApi(authCookie);
        /// cy.verifyNoExpensesByApi(authCookie);

        cy.postExpenses(data, authCookie).then(({ status, body }) => {
            expect(status).to.eq(200);
            expect(body.status).to.eq('ok');
            expect(body.data.mileage).to.eq(Number(data.new_mileage));
            expect(body.data.liters).to.eq(Number(data.liters));
            expect(body.data.totalCost).to.eq(Number(data.totalCost));
        });
    });


    it('should verify added expense by UI', () => {

        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/panel/expenses');
        fuelExpensesPage.verifyPageUrl();
        fuelExpensesPage.verifyAddedExpense(data.new_mileage, data.liters, data.totalCost);

        cy.deleteAllExpensesByApi(authCookie);
        cy.verifyNoExpensesByApiForAllCars(authCookie);
        cy.deleteAllCarsByApi(authCookie);//clear cars after test 
    });
});