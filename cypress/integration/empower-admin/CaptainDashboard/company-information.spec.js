describe('Company Information', () => {
  before(() => {
    cy.login('jdeere@yopmail.com', 'Tester123!')
  })

  it('Click on the navigation link', () => {
    cy.verifyNameAndUrl('Company Information', '/company-information')
  })

  after(() => {
    cy.logout()
  })
})
