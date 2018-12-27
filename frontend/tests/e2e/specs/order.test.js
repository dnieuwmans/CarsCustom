describe('CarsCustom - Order', () => {
    before(() => {
        cy.visit('/#/explore-cars');

        // Make sure we are there
        cy.contains('h3', 'Explore Cars');

        // Select a car
        cy.get('.box.car-card').eq(0).click();

        // Check if we do indeed arrived at the order page
        cy.location('hash').should('eq', '#/order');
    });

    it('Selects a new color', () => {
        // Check if we are at step 1.
        cy.get('.order-steps').find('li').eq(0).should('have.class', 'is-active');

        // Select a new color.
        // TODO: we should make a check to see if we have multiple colors.

        // Check if the first color is selected
        cy.get('.car-colors.car-colors--lg').find('li').eq(0).should('have.class', 'car-colors__item--active');

        // Click on a new color
        cy.get('.car-colors.car-colors--lg').find('li').eq(1).click();

        // Check if the first color is not selected and the clicked color is selected
        cy.get('.car-colors.car-colors--lg').find('li').eq(0).should('not.have.class', 'car-colors__item--active');
        cy.get('.car-colors.car-colors--lg').find('li').eq(1).should('have.class', 'car-colors__item--active');

        // Go to the next step
        cy.get('.order-navigation').find('#next-step').click();
    });

    it('Goes back to the color step', () => {
        // Check if we are at step 2.
        // The first step should be done at this point
        cy.get('.order-steps').find('li').eq(0).should('have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(1).should('have.class', 'is-active');

        // Let's head back to the color page
        cy.get('.order-navigation').find('#previous-step').click();

        // Check if the progress is rendered correctly
        cy.get('.order-steps').find('li').eq(0).should('not.have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(1).should('not.have.class', 'is-active');
        cy.get('.order-steps').find('li').eq(0).should('have.class', 'is-active');
    });

    it('Selects accessories', () => {
        // Go to the next step
        cy.get('.order-navigation').find('#next-step').click();

        // Check if we are at step 2.
        // The first step should be done at this point
        cy.get('.order-steps').find('li').eq(0).should('have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(1).should('have.class', 'is-active');

        // Select all the accessories
        cy.get('.order-accessories').find('li').each(($el) => {
            cy.wrap($el).click();

        });

        // Check if they are added correctly to the side bar
        cy.get('.order-car__accessories-info').find('li');

        // TODO: Check if the price differs

        // Go to the next step
        cy.get('.order-navigation').find('#next-step').click();
    });

    it('Fills in user information incorrectly', () => {
        // Check if we are at step 3.
        // The second step should be done at this point
        cy.get('.order-steps').find('li').eq(1).should('have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(2).should('have.class', 'is-active');

        // Type in the values
        cy.get('#first-name').type('D').blur();
        cy.get('#last-name').type('N').blur();
        cy.get('#zip-code').type('2').blur();
        cy.get('#number').type('thisistoolong').blur();
        cy.get('#phone').type('abcde').blur();
        cy.get('#email').type('dannynieuwmansgmail.com').blur();

        // Check if we got any errors
        cy.get('#first-name').should('have.class', 'is-invalid');
        cy.get('#last-name').should('have.class', 'is-invalid');
        cy.get('#zip-code').should('have.class', 'is-invalid');
        cy.get('#number').should('have.class', 'is-invalid');
        cy.get('#phone').should('have.class', 'is-invalid');
        cy.get('#email').should('have.class', 'is-invalid');

        // continue to summary should not work
        cy.get('#continue-to-summary').click();

        // Check if we are still at step 3
        cy.get('.order-steps').find('li').eq(1).should('have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(2).should('have.class', 'is-active');
    });

    it('Fills in user information correctly', () => {
        // clear everything
        cy.get('#first-name').clear().blur();
        cy.get('#last-name').clear().blur();
        cy.get('#zip-code').clear().blur();
        cy.get('#number').clear().blur();
        cy.get('#phone').clear().blur();
        cy.get('#email').clear().blur();

        // type in the values
        cy.get('#first-name').clear().type('Danny').blur();
        cy.get('#last-name').clear().type('Nieuwmans').blur();
        cy.get('#zip-code').clear().type('2691zz').blur();
        cy.get('#number').clear().type('26').blur();

        // check if the address api is working
        cy.get('#address').contains('em', 'Gravin Aleidisstraat 26, \'s-Gravenzande');

        cy.get('#phone').clear().type('0612345678').blur();
        cy.get('#email').clear().type('dannynieuwmans@gmail.com').blur();

        // continue to summary should now work
        cy.get('#continue-to-summary').click();
    });

    it('Shows the summary correctly', () => {
        // Check if we are at step 4.
        // The third step should be done at this point
        cy.get('.order-steps').find('li').eq(2).should('have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(3).should('have.class', 'is-active');

        // Check the information
        // Full name
        cy.get('.order-summary-table').find('tr').eq(0).contains('th', 'Full name:');
        cy.get('.order-summary-table').find('tr').eq(0).contains('td', 'Danny Nieuwmans');

        // Email
        cy.get('.order-summary-table').find('tr').eq(1).contains('th', 'Email:');
        cy.get('.order-summary-table').find('tr').eq(1).contains('td', 'dannynieuwmans@gmail.com');

        // Address
        cy.get('.order-summary-table').find('tr').eq(2).contains('th', 'Address:');
        cy.get('.order-summary-table').find('tr').eq(2).contains('td', 'Gravin Aleidisstraat 26, 2691zz - \'s-Gravenzande');

        // Phone
        cy.get('.order-summary-table').find('tr').eq(3).contains('th', 'Phone:');
        cy.get('.order-summary-table').find('tr').eq(3).contains('td', '0612345678');

        // Go to the next step
        cy.get('#next-step').click();
    });

    it('Shows the payment page correctly', () => {
       // TODO: work this out
        // Check if we are at step 5.
        // The fourth step should be done at this point
        cy.get('.order-steps').find('li').eq(3).should('have.class', 'is-done');
        cy.get('.order-steps').find('li').eq(4).should('have.class', 'is-active');

        // Finish the order
        cy.get('#place-order').click();
    });

    it('Shows the complete page correctly', () => {
        // Check if we do indeed arrived at the order page
        cy.location('hash').should('contain', '#/order-complete');
    })
});
