describe('', () => {
  it ('To Target Field departures', () => {
    cy.visit('http://localhost:3000/')

    cy.contains('METRO Green Line')
      .click()

    cy.url()
      .should('include', '/route')

    cy.contains('Westbound')
      .click()

    cy.url()
      .should('include', '/direction')

    cy.contains('Target Field Station Platform 1')
      .click()
      
    cy.url()
      .should('include', '/stop')

    cy.get('h1')
      .should('contain', 'Departures')
  })
})