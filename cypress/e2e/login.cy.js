describe('OrangeHRM Login Feature', () => {

    beforeEach(() => {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')

        cy.get('input[name="username"]', { timeout: 10000 })
            .should('be.visible')
    })

    // SCN_Login_001
    it('SCN_Login_001 - Login dengan username dan password valid', () => {

        cy.fixture('loginData').then((data) => {

            cy.login(
                data.validUser.username,
                data.validUser.password
            )

            cy.url().should('include', '/dashboard')

            cy.contains('Dashboard').should('be.visible')
        })
    })

    // SCN_Login_002
    it('SCN_Login_002 - Login gagal dengan user salah', () => {

        cy.fixture('loginData').then((data) => {

            cy.login(
                data.invalidUsername.username,
                data.invalidUsername.password
            )

            cy.contains('Invalid credentials')
                .should('be.visible')
        })
    })

    // SCN_Login_003
    it('SCN_Login_003 - Login gagal dengan password salah', () => {

        cy.fixture('loginData').then((data) => {

            cy.login(
                data.invalidPassword.username,
                data.invalidPassword.password
            )

            cy.contains('Invalid credentials')
                .should('be.visible')
        })
    })

    // SCN_Login_004
    // SCN_Login_004
it('SCN_Login_004 - Username dan password kosong', () => {

    cy.get('button[type="submit"]').click()

    cy.get('.oxd-input-field-error-message')
        .should('have.length', 2)

    cy.contains('Required').should('be.visible')
})

    // SCN_Login_005
    it('SCN_Login_005 - Username kosong dan password valid', () => {

        cy.fixture('loginData').then((data) => {

            cy.get('input[name="password"]')
                .type(data.validUser.password)

            cy.get('button[type="submit"]').click()

            cy.contains('Required')
                .should('be.visible')
        })
    })

    // SCN_Login_006
    it('SCN_Login_006 - Username valid dan password kosong', () => {

        cy.fixture('loginData').then((data) => {

            cy.get('input[name="username"]')
                .type(data.validUser.username)

            cy.get('button[type="submit"]').click()

            cy.contains('Required')
                .should('be.visible')
        })
    })

    // SCN_Login_007
    it('SCN_Login_007 - Login dengan format username salah', () => {

        cy.fixture('loginData').then((data) => {

            cy.login(
                data.wrongFormatUsername.username,
                data.wrongFormatUsername.password
            )

            cy.contains('Invalid credentials')
                .should('be.visible')
        })
    })
})