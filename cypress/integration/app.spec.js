describe('Load Data', () => {
  it('It should load the films data', () => {
    expect(Cypress.env('CYPRESS_BASE_URL')).to.be.a('string')

    const baseUrl = Cypress.env('CYPRESS_BASE_URL')
    // Start from the index page
    cy.visit(baseUrl)

    // The page should contains at least 1 el
    cy.get('#film-0')
  })
})

describe('Click element', () => {
  it('Load Data by the side after click element', () => {
    expect(Cypress.env('CYPRESS_BASE_URL')).to.be.a('string')

    const baseUrl = Cypress.env('CYPRESS_BASE_URL')
    // Start from the index page
    cy.visit(baseUrl)

    // The page should contains at least 1 el
    const index = 0
    cy.get(`#film-${index}`)
    cy.get(`#film-${index}-btn`).click()        
    cy.get(`#film-${index}-list-title`).contains('A New Hope')
    cy.get(`#film-details-title`).contains('A New Hope')
  })
})
