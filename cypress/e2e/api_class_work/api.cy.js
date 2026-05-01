describe('Simple API requests', () => {
  it('GET request - get all posts', () => {
    cy.request('GET', 'https://jsonplaceholder.typicode.com/posts')
      .then((response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.be.an('array');
        expect(response.body.length).to.be.greaterThan(0);

        cy.log(JSON.stringify(response.body[0]));
      });
  });

  it('POST request - create post', () => {
    cy.request({
      method: 'POST',
      url: 'https://jsonplaceholder.typicode.com/posts',
      body: {
        title: 'My test title',
        body: 'My test body',
        userId: 1,
      },
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.title).to.eq('My test title');
      expect(response.body.body).to.eq('My test body');
    });
  });

it.only('GET cars without auth should return 401', () => {
    cy.request({
        method: 'GET',
        url: 'https://qauto.forstudy.space/api/cars',
        failOnStatusCode: false // Важное дополнение для Cypress
    }).then((response) => {
        expect(response.status).to.eq(401);
    });
});


});