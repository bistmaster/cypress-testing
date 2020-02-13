describe('Purchase History', () => {
  before(() => {
    cy.login('jdeere@yopmail.com', 'Tester123!')
  })

  it('Click on the navigation link', () => {
    cy.verifyNameAndUrl('Purchase History', '/purchase-history')
  })

  after(() => {
    cy.logout()
  })
})
