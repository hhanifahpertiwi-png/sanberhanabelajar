describe('Reqres API Automation', () => {

  const baseUrl = 'https://reqres.in/api'

  const headers = {
    'x-api-key': 'free_user_3DQzm58GmKBrN5uJ2QFSP0no6AY'
  }

  // 1. GET LIST USERS
  it('GET List Users', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/users?page=2`,
      headers
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.page).to.eq(2)

    })

  })

  // 2. GET SINGLE USER
  it('GET Single User', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/2`,
      headers
    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.data.id).to.eq(2)

    })

  })

  // 3. GET USER NOT FOUND
  it('GET User Not Found', () => {

    cy.request({
      method: 'GET',
      url: `${baseUrl}/users/23`,
      headers,
      failOnStatusCode: false
    }).then((response) => {

      expect(response.status).to.eq(404)

    })

  })

  // 4. POST CREATE USER
  it('POST Create User', () => {

    cy.request({
      method: 'POST',
      url: `${baseUrl}/users`,
      headers,
      body: {
        name: 'Hana',
        job: 'QA Engineer'
      }

    }).then((response) => {

      expect(response.status).to.eq(201)
      expect(response.body.name).to.eq('Hana')
      expect(response.body.job).to.eq('QA Engineer')

    })

  })

  // 5. PUT UPDATE USER
  it('PUT Update User', () => {

    cy.request({
      method: 'PUT',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        name: 'Hana Update',
        job: 'Senior QA'
      }

    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.name).to.eq('Hana Update')

    })

  })

  // 6. PATCH UPDATE USER
  it('PATCH Update User', () => {

    cy.request({
      method: 'PATCH',
      url: `${baseUrl}/users/2`,
      headers,
      body: {
        job: 'Automation Tester'
      }

    }).then((response) => {

      expect(response.status).to.eq(200)
      expect(response.body.job).to.eq('Automation Tester')

    })

  })

  // 7. DELETE USER
  it('DELETE User', () => {

    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/users/2`,
      headers

    }).then((response) => {

      expect(response.status).to.eq(204)

    })

  })

})