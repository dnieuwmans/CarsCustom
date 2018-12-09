// https://docs.cypress.io/api/introduction/api.html

describe('CarsCustom - Explore Cars', () => {
    it('Renders Explore Cars correctly', () => {
        cy.visit('/#/explore-cars');

        cy.contains('h3', 'Explore Cars');
    });

    it('Switch colors', () => {
        cy.visit('/#/explore-cars');

        // TODO: figure out how we can be certain that we do have a car with multiple colors, otherwise this test will be flaky.

        cy.get('.box.car-card').eq(0).find('.car-colors').find('li').eq(0).should('have.class', 'car-colors__item--active');

        cy.get('.box.car-card').eq(0).find('.car-colors').find('li').eq(1).click();

        cy.get('.box.car-card').eq(0).find('.car-colors').find('li').eq(1).should('have.class', 'car-colors__item--active');
        cy.get('.box.car-card').eq(0).find('.car-colors').find('li').eq(0).should('not.have.class', 'car-colors__item--active');

    });
});
