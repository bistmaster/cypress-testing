describe('Team Roster', () => {
  before(() => {
    cy.login('jdeere@yopmail.com', 'Tester123!')
  })

  it('Click on the navigation link', () => {
    cy.verifyNameAndUrl('Team Roster', '/team-roster')
  })

  after(() => {
    cy.logout()
  })
})
