// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

import ModalLogin from "../pages/Gauto/modalLogin";

//sausedemo.com login command
Cypress.Commands.add('loginSauseDemo', (username, password) => {

    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('#login-button').click()
});

//qauto login command
Cypress.Commands.add('loginGauto', (email, password) => {
    const modalLogin = new ModalLogin();
    modalLogin.sendLoginForm(email, password);
    cy.url().should('include', 'https://qauto.forstudy.space/panel/garage');

});

// Command to fill registration form in Gauto
Cypress.Commands.overwrite('type', (originalFn, element, text, options) => {
    if (options && options.sensitive) {
        // turn off original log
        options.log = false
        // create our own log with masked message
        Cypress.log({
            $el: element,
            name: 'type',
            message: '*'.repeat(text.length),
        })
    }

    return originalFn(element, text, options)
})

Cypress.Commands.add('loginByApi', () => {
    const randomEmail = `user_${Date.now()}@test.com`;
    cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/auth/signup',
        body: {
            name: "John",
            lastName: "Dou",
            email: randomEmail,
            password: "Qwerty12345",
            repeatPassword: "Qwerty12345"
        },
    }).then((response) => {
        expect(response.status).to.eq(201);
        expect(response.body.status).to.eq('ok');
    });
});

Cypress.Commands.add('signupAndSaveSession', () => {
    const email = `user_${Date.now()}@test.com`;
    const password = 'Qwerty12345';

    // Use cy.session to cache the session after signing up
    cy.session('qauto-user-session', () => {
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/auth/signup',
            body: {
                name: 'John',
                lastName: 'Dou',
                email,
                password,
                repeatPassword: password,
            },
        }).then((response) => {
            expect(response.status).to.eq(201);
            expect(response.body.status).to.eq('ok');
        });
    });
});

Cypress.Commands.add('postExpenses', (carData, authCookie) => {
    return cy.fixture('gauto/createdCar').then(({ id: carId }) =>
        cy.request({
            method: 'POST',
            url: 'https://qauto.forstudy.space/api/expenses',
            headers: { Cookie: authCookie },
            body: {
                carId,
                reportedAt: new Date().toISOString().slice(0, 10),
                mileage: Number(carData.new_mileage),
                liters: Number(carData.liters),
                totalCost: Number(carData.totalCost),
                forceMileage: true,
            },
        }),
    );
});

Cypress.Commands.add('getAllCarsByApi', (authCookie) =>
    cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        headers: { Cookie: authCookie },
    }).then(({ body }) => body.data),
);

Cypress.Commands.add('deleteAllCarsByApi', (authCookie) =>
    cy.getAllCarsByApi(authCookie).then((cars) => {
        cars.forEach((car) => {
            cy.request({
                method: 'DELETE',
                url: `https://qauto.forstudy.space/api/cars/${car.id}`,
                headers: { Cookie: authCookie },
            });
        });
    }),
);

Cypress.Commands.add('deleteAllExpensesByApi', (authCookie) =>
    cy.getAllCarsByApi(authCookie).then((cars) => {
        if (cars.length === 0) return;

        cars.forEach((car) => {
            cy.request({
                method: 'GET',
                url: `https://qauto.forstudy.space/api/expenses?carId=${car.id}`,
                headers: { Cookie: authCookie },
            }).then(({ body: expensesBody }) => {
                expensesBody.data.forEach((expense) => {
                    cy.request({
                        method: 'DELETE',
                        url: `https://qauto.forstudy.space/api/expenses/${expense.id}`,
                        headers: { Cookie: authCookie },
                    });
                });
            });
        });
    }),
);

Cypress.Commands.add('verifyNoExpensesByApiForCar', (carId, authCookie) =>
    cy.request({
        method: 'GET',
        url: `https://qauto.forstudy.space/api/expenses?carId=${carId}`,
        headers: { Cookie: authCookie },
    }).then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body.data).to.be.an('array').that.is.empty;
    }),
);

Cypress.Commands.add('verifyNoExpensesByApiForAllCars', (authCookie) =>
    cy.getAllCarsByApi(authCookie).then((cars) => {
        cars.forEach((car) => {
            cy.verifyNoExpensesByApiForCar(car.id, authCookie);
        });
    }),
);