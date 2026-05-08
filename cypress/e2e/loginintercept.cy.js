describe('OrangeHRM Login Intercept', () => {

  beforeEach(() => {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    cy.wait(2000)
  })

  it('Login valid - intercept auth validate', () => {

    cy.intercept('POST', '**/auth/validate').as('loginAuth')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginAuth').then((interception) => {

      expect(interception.response.statusCode).to.be.oneOf([200, 302])

    })

    cy.url().should('include', '/dashboard')
  })

  it('Login valid - intercept dashboard API', () => {

    cy.intercept('GET', '**/dashboard/employees/action-summary').as('dashboardAPI')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@dashboardAPI')
      .its('response.statusCode')
      .should('eq', 200)

    cy.contains('Dashboard').should('be.visible')
  })

  it('Login invalid - wrong password', () => {

    cy.intercept('POST', '**/auth/validate').as('invalidLogin')

    cy.get('input[name="username"]').type('Admin')
    cy.get('input[name="password"]').type('salah123')
    cy.get('button[type="submit"]').click()

    cy.wait('@invalidLogin').then((interception) => {

      expect(interception.response.statusCode).to.be.oneOf([401, 302])

    })

    cy.contains('Invalid credentials').should('be.visible')
  })

  it('Username kosong', () => {

    cy.intercept('GET', '**/auth/login').as('loginPage')

    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()

    cy.wait('@loginPage')

    cy.contains('Required').should('be.visible')
  })

  it('Password kosong', () => {

    cy.intercept('GET', '**/core/i18n/messages').as('messageAPI')

    cy.get('input[name="username"]').type('Admin')
    cy.get('button[type="submit"]').click()

    cy.wait('@messageAPI')

    cy.contains('Required').should('be.visible')
  })

})