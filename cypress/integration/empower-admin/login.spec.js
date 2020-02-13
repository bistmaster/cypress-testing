describe('/login', () => {
  beforeEach(() => {
    cy.visit('https://qa.jpmcc-sw.com/login')
    cy.wait(500)
  })

  it('Greets with Login header', () => {
    cy.contains('p', 'Login')
  })

  it('Contains input forms', () => {
    cy.contains('label', 'Email')
    cy.contains('label', 'Password')
  })

  it('Checks the required fields', () => {
    cy.get('button[type=submit]').click()
    cy.contains('p', 'Email is required')
    cy.contains('p', 'Password is required')
  })

  it('login with incorrect credentials', () => {
    cy.get('[id=email]').type('asdas@msadd.com')
    cy.get('[id=password]').type('sample')
    cy.get('button[type=submit]').click()
    cy.contains('p', 'Invalid username and password combination')
  })

  it('login with correct credentials', () => {
    cy.server()
    cy.route('POST', 'https://qa.jpmcc-sw.com/qa/auth/login').as('login')
    cy.get('[id=email]').type('jdeere@yopmail.com')
    cy.get('[id=password]').type('Tester123!')
    cy.get('button[type=submit]').click()
    cy.wait('@login')

    cy.get('@login').then(response => {
      expect(response.status).to.eq(200)
      expect(response.method).to.eq('POST')
      expect(response.responseBody).to.have.property('success')
      expect(response.responseBody).to.have.property('data')
      expect(response.responseBody.data).to.have.property('accessToken')
      expect(response.responseBody.data).to.have.property('refreshToken')
    })
  })
})
