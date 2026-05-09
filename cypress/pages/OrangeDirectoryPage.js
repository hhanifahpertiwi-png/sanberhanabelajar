class OrangeDirectoryPage {
  verifyDashboardPage() {
    cy.contains('Dashboard').should('be.visible')
  }

  clickDirectoryMenu() {
    cy.contains('span', 'Directory').click()
  }

  verifyDirectoryPage() {
    cy.contains('Directory').should('be.visible')
  }

  clickSearch() {
    cy.contains('button', 'Search').click()
  }

  clickReset() {
    cy.contains('button', 'Reset').click()
  }
}

export default OrangeDirectoryPage