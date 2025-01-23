describe('Music Schedule App', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/v1/users/1/schedules/1", {
      fixture: "detailedschedule"
    }).as('getDetailedSchedule');

    cy.intercept("DELETE", "http://localhost:3000/api/v1/users/1/schedules/1/shows/1", {
      statusCode: 200,
      body: {} 
    }).as('removeShow');

    cy.visit("http://localhost:3001/users/1/schedules/1");
  });
  

  it('displays the schedule details correctly', () => {
    cy.wait('@getDetailedSchedule');

    cy.get('h2').should('contain', 'Louder Than Life: Day 1');
    cy.get('p').should('contain', 'Date: 2025-07-10');
    cy.get('p').should('contain', 'Alice Johnson');

    cy.get('.consertClass').should('have.length', 3);  

    cy.get('.consertClass').eq(0).within(() => {
      cy.get('p').should('contain', 'Tame Impala');
      cy.get('p').should('contain', 'Date: 2025-07-11');
      cy.get('p').should('contain', 'Time: 10:00');
    });
    cy.get('.consertClass').eq(1).within(() => {
      cy.get('p').should('contain', 'The Rolling Stones');
      cy.get('p').should('contain', 'Date: 2025-07-10');
      cy.get('p').should('contain', 'Time: 11:00'); 
    });

    cy.get('.consertClass').eq(2).within(() => {
      cy.get('p').should('contain', 'Lady Gaga');
      cy.get('p').should('contain', 'Date: 2025-07-10');
      cy.get('p').should('contain', 'Time: 01:00');
    });
  });
});
