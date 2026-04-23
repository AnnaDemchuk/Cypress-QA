describe('buttons on qauto.forstudy.space ', () => {

    beforeEach(() => {
        cy.visit('https://guest:welcome2qauto@qauto.forstudy.space/')
    })

    it('check header buttons', () => {

        cy.get('a.header_logo').should('be.visible');

        cy.get('nav a').contains('Home').should('be.visible').should('have.attr', 'href').and('not.be.empty')
        cy.get('nav button').contains('About').should('be.visible').should('have.attr', 'appscrollto').and('not.be.empty')
        cy.get('nav button').contains('Contacts').should('be.visible').should('have.attr', 'appscrollto').and('not.be.empty')

        cy.get('.header_right').as('headerButtons');
        cy.get('@headerButtons').contains('button', 'Guest log in').should('be.visible')
        cy.get('@headerButtons').contains('button', 'Sign In').should('be.visible')
    }
    );

    it('check footer buttons', () => {

        cy.get('.contacts_socials.socials').as('socialLinks');
        cy.get('@socialLinks').find('[href^="https://www.facebook.com"]').should('be.visible');
        cy.get('@socialLinks').find('[href^="https://t.me"]').should('be.visible');
        cy.get('@socialLinks').find('[href^="https://www.youtube.com/"]').should('be.visible');
        cy.get('@socialLinks').find('[href^="https://www.instagram.com/"]').should('be.visible');
        cy.get('@socialLinks').find('[href^="https://www.linkedin.com/"]').should('be.visible');

        cy.contains('a', 'ithillel.ua').should('be.visible').should('have.attr', 'href').and('not.be.empty')
        cy.contains('a', 'support@ithillel.ua').should('have.attr', 'href').and('not.be.empty')
    }
    );
    
    it('check hero sections buttons', () => {

        cy.get('button.hero-descriptor_btn').should('have.text', 'Sign up').and('be.visible');
    }
    );
});
