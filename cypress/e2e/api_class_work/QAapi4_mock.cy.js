describe('Mock cars response', () => {
    it('should register user, set cookie, intercept cars response and return mocked cars', () => {
        const email = `user_${Date.now()}@test.com`;
        const password = 'Qwerty12345';

        const mockedCarsResponse = {
            status: 'ok',
            data: [
                {
                    id: 94,
                    carBrandId: 1,
                    carModelId: 1,
                    initialMileage: 11,
                    updatedMileageAt: '2021-05-17T15:26:36.000Z',
                    mileage: 111,
                    brand: 'Audi',
                    model: 'TT',
                    logo: 'audi.png',
                },
                {
                    id: 95,
                    carBrandId: 1,
                    carModelId: 2,
                    initialMileage: 11,
                    updatedMileageAt: '2021-06-17T15:26:36.000Z',
                    mileage: 111,
                    brand: 'Audi',
                    model: 'R8',
                    logo: 'audi.png',
                },
            ],
        };

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

            const sidCookie = response.headers['set-cookie']
                .find((cookie) => cookie.startsWith('sid='));

            const sidValue = sidCookie.split(';')[0].replace('sid=', '');

            cy.setCookie('sid', sidValue);
        });

        cy.intercept('GET', '**/api/cars', {
            statusCode: 200,
            body: mockedCarsResponse,
        }).as('getCars');

        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/panel/garage');

        cy.wait('@getCars').then((interception) => {
            const body = interception.response.body;

            cy.log(JSON.stringify(body));
            console.log(body);

            expect(interception.response.statusCode).to.eq(200);
            expect(body.status).to.eq('ok');
            expect(body.data).to.have.length(2);
            expect(body.data[0]).to.include({
                brand: 'Audi',
                model: 'TT',
                mileage: 111,
            });
            expect(body.data[1]).to.include({
                brand: 'Audi',
                model: 'R8',
                mileage: 111,
            });
        });
    });
});