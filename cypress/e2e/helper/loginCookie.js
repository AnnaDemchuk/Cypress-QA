export function getLoginCookieHeader() {
    const email = 'Lucia_Douglas79@yahoo.com';
    const password = 'Qt123456';

    return cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/auth/signin',
        body: {
            email,
            password,
            remember: false
        },
    }).then((response) => {
        expect(response.status).to.eq(200);

        const sidCookie = response.headers['set-cookie'].find((cookie) =>
            cookie.startsWith('sid=')
        );

        return sidCookie.split(';')[0];
    });


}