describe('Hospitality Catalogue', () => {
  before(() => {
    cy.login('jdeere@yopmail.com', 'Tester123!')
  })

  it('Click on the navigation link', () => {
    cy.verifyNameAndUrl('Hospitality', '/hospitality/catalogue')
  })

  after(() => {
    cy.logout()
  })
})
