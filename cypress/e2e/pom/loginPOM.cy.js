import LoginPage from '../../pages/LoginPage'

const loginPage = new LoginPage()

describe('OrangeHRM Login POM Feature', () => {

    let data

    beforeEach(() => {

        cy.fixture('loginData').then((testData) => {

            data = testData
        })

        loginPage.visitLoginPage()

        cy.get('input[name="username"]', { timeout: 10000 })
            .should('be.visible')
    })

    // SCN_Login_001
    it('SCN_Login_001 - Login valid', () => {

        loginPage.inputUsername(data.validUser.username)

        loginPage.inputPassword(data.validUser.password)

        loginPage.clickLoginButton()

        loginPage.verifyDashboardPage()
    })

    // SCN_Login_002
    it('SCN_Login_002 - Login gagal user salah', () => {

        loginPage.inputUsername(data.invalidUsername.username)

        loginPage.inputPassword(data.invalidUsername.password)

        loginPage.clickLoginButton()

        loginPage.verifyInvalidCredential()
    })

    // SCN_Login_003
    it('SCN_Login_003 - Login gagal password salah', () => {

        loginPage.inputUsername(data.invalidPassword.username)

        loginPage.inputPassword(data.invalidPassword.password)

        loginPage.clickLoginButton()

        loginPage.verifyInvalidCredential()
    })

    // SCN_Login_004
    it('SCN_Login_004 - Username dan password kosong', () => {

        loginPage.clickLoginButton()

        cy.get('.oxd-input-field-error-message')
            .should('have.length', 2)
    })

    // SCN_Login_005
    it('SCN_Login_005 - Username kosong password valid', () => {

        loginPage.inputPassword(data.validUser.password)

        loginPage.clickLoginButton()

        loginPage.verifyRequiredMessage()
    })

    // SCN_Login_006
    it('SCN_Login_006 - Username valid password kosong', () => {

        loginPage.inputUsername(data.validUser.username)

        loginPage.clickLoginButton()

        loginPage.verifyRequiredMessage()
    })

    // SCN_Login_007
    it('SCN_Login_007 - Format username salah', () => {

        loginPage.inputUsername(data.wrongFormatUsername.username)

        loginPage.inputPassword(data.wrongFormatUsername.password)

        loginPage.clickLoginButton()

        loginPage.verifyInvalidCredential()
    })
})