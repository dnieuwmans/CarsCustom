// https://docs.cypress.io/api/introduction/api.html

describe('CarsCustom - Home page', () => {
    it('Renders Homepage correctly', () => {
        cy.visit('/');
        cy.contains('h1', 'Buy your dream car today!');
        cy.contains('h2', 'Car Of The Month');
    });
});
