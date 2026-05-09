class OrangeLoginPage {
  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
  }

  inputUsername(username) {
    cy.get('input[name="username"]').clear().type(username)
  }

  inputPassword(password) {
    cy.get('input[name="password"]').clear().type(password)
  }

  clickLogin() {
    cy.get('button[type="submit"]').click()
  }

  login(username, password) {
    this.inputUsername(username)
    this.inputPassword(password)
    this.clickLogin()
  }

  clickForgotPassword() {
    cy.contains('Forgot your password?').click()
  }

  verifyLoginPage() {
    cy.contains('Login').should('be.visible')
  }

  verifyInvalidLogin() {
    cy.contains('Invalid credentials').should('be.visible')
  }

  verifyRequiredUsername() {
    cy.get('input[name="username"]')
      .parents('.oxd-input-group')
      .contains('Required')
      .should('be.visible')
  }

  verifyRequiredPassword() {
    cy.get('input[name="password"]')
      .parents('.oxd-input-group')
      .contains('Required')
      .should('be.visible')
  }
}

export default OrangeLoginPage