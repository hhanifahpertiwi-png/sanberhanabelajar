import OrangeLoginPage from '../../pages/OrangeLoginPage'
import OrangeForgotPasswordPage from '../../pages/OrangeForgotPasswordPage'
import OrangeDirectoryPage from '../../pages/OrangeDirectoryPage'
import data from '../../fixtures/orangehrmData.json'

const loginPage = new OrangeLoginPage()
const forgotPasswordPage = new OrangeForgotPasswordPage()
const directoryPage = new OrangeDirectoryPage()

describe('OrangeHRM Demo - POM dan Intercept', () => {
  beforeEach(() => {
    cy.viewport(1366, 768)
  })

  it('Login berhasil dengan username dan password valid', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboardPage')

    loginPage.visit()
    loginPage.login(data.validUser.username, data.validUser.password)

    cy.wait('@dashboardPage')
    directoryPage.verifyDashboardPage()
  })

  it('Login gagal dengan username dan password invalid', () => {
    cy.intercept('POST', '**/auth/validate').as('loginRequest')

    loginPage.visit()
    loginPage.login(data.invalidUser.username, data.invalidUser.password)

    cy.wait('@loginRequest')
    loginPage.verifyInvalidLogin()
  })

  it('Login gagal ketika username kosong', () => {
    loginPage.visit()

    loginPage.inputPassword(data.validUser.password)
    loginPage.clickLogin()

    loginPage.verifyRequiredUsername()
  })

  it('Login gagal ketika password kosong', () => {
    loginPage.visit()

    loginPage.inputUsername(data.validUser.username)
    loginPage.clickLogin()

    loginPage.verifyRequiredPassword()
  })

  it('Login gagal ketika username dan password kosong', () => {
    loginPage.visit()

    loginPage.clickLogin()

    loginPage.verifyRequiredUsername()
    loginPage.verifyRequiredPassword()
  })

  it('Berhasil membuka halaman forgot password', () => {
    loginPage.visit()

    loginPage.clickForgotPassword()

    forgotPasswordPage.verifyForgotPasswordPage()
  })

  it('Berhasil request reset password', () => {
  cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/requestPasswordResetCode')

  cy.get('input[name="username"]').clear().type('Admin')
  cy.get('button[type="submit"]').click()

  cy.url().should('include', '/sendPasswordReset')
  cy.contains('Reset Password link sent successfully').should('be.visible')
})

  it('Berhasil cancel forgot password dan kembali ke login page', () => {
    loginPage.visit()

    loginPage.clickForgotPassword()
    forgotPasswordPage.clickCancel()

    loginPage.verifyLoginPage()
  })

  it('Berhasil membuka menu Directory dari Dashboard', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboardPage')
    cy.intercept('GET', '**/directory/viewDirectory**').as('directoryPage')

    loginPage.visit()
    loginPage.login(data.validUser.username, data.validUser.password)

    cy.wait('@dashboardPage')
    directoryPage.verifyDashboardPage()

    directoryPage.clickDirectoryMenu()
    cy.wait('@directoryPage')
    directoryPage.verifyDirectoryPage()
  })

  it('Berhasil klik search pada halaman Directory', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboardPage')
    cy.intercept('GET', '**/directory/viewDirectory**').as('directoryPage')
    cy.intercept('GET', '**/api/v2/directory/employees**').as('directoryApi')

    loginPage.visit()
    loginPage.login(data.validUser.username, data.validUser.password)

    cy.wait('@dashboardPage')
    directoryPage.clickDirectoryMenu()
    cy.wait('@directoryPage')

    directoryPage.clickSearch()
    cy.wait('@directoryApi')

    directoryPage.verifyDirectoryPage()
  })

  it('Berhasil klik reset pada halaman Directory', () => {
    cy.intercept('GET', '**/dashboard/**').as('dashboardPage')
    cy.intercept('GET', '**/directory/viewDirectory**').as('directoryPage')

    loginPage.visit()
    loginPage.login(data.validUser.username, data.validUser.password)

    cy.wait('@dashboardPage')
    directoryPage.clickDirectoryMenu()
    cy.wait('@directoryPage')

    directoryPage.clickReset()
    directoryPage.verifyDirectoryPage()
  })
})