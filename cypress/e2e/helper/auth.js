export function getAuthCookieHeader() {
    const randomEmail = `user_${Date.now()}@test.com`;

    return cy.request({
        method: 'POST',
        url: 'https://qauto.forstudy.space/api/auth/signup',
        body: {
            name: "John",
            lastName: "Dou",
            // email: "Qwerty12345randomEmail@test.com",
            email: randomEmail,
            password: "Qwerty12345",
            repeatPassword: "Qwerty12345"
        },
    }).then((response) => {
        expect(response.status).to.eq(201);

        const sidCookie = response.headers['set-cookie'].find((cookie) => 
            cookie.startsWith('sid=')
        );

        return sidCookie.split(';')[0];
    });
}