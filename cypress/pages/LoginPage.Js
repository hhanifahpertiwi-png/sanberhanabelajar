class LoginPage {

    visitLoginPage() {

        cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    }

    inputUsername(username) {

        cy.get('input[name="username"]')
            .clear()
            .type(username)
    }

    inputPassword(password) {

        cy.get('input[name="password"]')
            .clear()
            .type(password)
    }

    clickLoginButton() {

        cy.get('button[type="submit"]').click()
    }

    verifyDashboardPage() {

        cy.url().should('include', '/dashboard')

        cy.contains('Dashboard')
            .should('be.visible')
    }

    verifyInvalidCredential() {

        cy.contains('Invalid credentials')
            .should('be.visible')
    }

    verifyRequiredMessage() {

        cy.contains('Required')
            .should('be.visible')
    }
}

export default LoginPage