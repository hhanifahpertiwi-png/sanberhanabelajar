class OrangeForgotPasswordPage {
  verifyForgotPasswordPage() {
    cy.contains('Reset Password').should('be.visible')
  }

  inputUsername(username) {
    cy.get('input[name="username"]').clear().type(username)
  }

  clickResetPassword() {
    cy.get('button[type="submit"]').click()
  }

  resetPassword(username) {
    this.inputUsername(username)
    this.clickResetPassword()
  }

  verifySuccessResetPassword() {
    cy.contains('Reset Password link sent successfully').should('be.visible')
  }

  clickCancel() {
    cy.contains('Cancel').click()
  }
}

export default OrangeForgotPasswordPage