describe('Music Schedule App', () => {
  beforeEach(() => {
    cy.intercept("GET", "http://localhost:3000/api/v1/schedules", {
      fixture: "schedules"
    }).as('getSchedules'); 

    cy.visit("http://localhost:3001");
  });

  it('loads the itinerary cards correctly', () => {
    cy.wait('@getSchedules'); 
    cy.get('.button-container').should('exist'); 
    cy.get('.button-container .schedule-button').should('have.length', 3); 

    cy.get('.schedule-button').eq(0).within(() => {
      cy.get('.schedule-title').should('contain', 'Louder Than Life: Day 1');
      cy.get('.schedule-date').should('contain', '2025-07-10');
    });

    cy.get('.schedule-button').eq(1).within(() => {
      cy.get('.schedule-title').should('contain', 'Louder Than Life: Day 2');
      cy.get('.schedule-date').should('contain', '2025-07-11');
    });

    cy.get('.schedule-button').eq(2).within(() => {
      cy.get('.schedule-title').should('contain', 'Louder Than Life: Day 2');
      cy.get('.schedule-date').should('contain', '2025-07-12');
    });
  });
  it('should navigate to the schedule details page when a schedule card is clicked', () => {
    cy.get('.schedule-button').eq(0).click(); 
    cy.url().should('include', '/users/1/schedules/1'); 
  });
});