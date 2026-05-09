class DirectoryPage {

    clickDirectoryMenu() {
        cy.contains('Directory').click()
    }

    searchEmployee(name) {
        cy.get('input[placeholder="Type for hints..."]').type(name)
    }

    clickSearch() {
        cy.get('button[type="submit"]').click()
    }

    verifyDirectoryPage() {
        cy.url().should('include', '/directory')
    }
}

export default DirectoryPage