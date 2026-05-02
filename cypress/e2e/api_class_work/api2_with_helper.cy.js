import { getAuthCookieHeader } from '../helper/authCookieRegi';

describe('Cars API', () => {
    let authCookie;

    before(() => {
        getAuthCookieHeader().then((cookie) => {
            authCookie = cookie;
        });
    });

    it('should get cars', () => {
        cy.request({
            method: 'GET',
            url: 'https://qauto.forstudy.space/api/cars',
            headers: {
                Cookie: authCookie,
            },
        }).then((response) => {
            expect(response.status).to.eq(200);
        });
    });
});