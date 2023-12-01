/// <reference types="Cypress"/>

describe('REST api testing with cypress', () => {
	it('Console log response', () => {
		cy.request('/users/2').then((response) => {
			cy.log(JSON.stringify(response.body))
			cy.log(JSON.stringify(response.headers))
		})
	})
	it('Validate headers', () => {
		cy.request('/users/2').as('user')
		cy.get('@user')
			.its('headers')
			.its('content-type')
			.should('include', 'application/json')

		cy.get('@user')
			.its('headers')
			.its('connection')
			.should('include', 'keep-alive')
	})

	it('API Tests - Status codes', () => {
		cy.request('/users/2').as('exisitingUser')
		cy.get('@exisitingUser').its('status').should('equal', 200)

		cy.request({ url: '/users/non-exisit', failOnStatusCode: false }).as(
			'nonExisitingUser',
		)
		cy.get('@nonExisitingUser').its('status').should('equal', 404)
	})

	it('API Tests - GET Request', () => {
		cy.request({ method: 'GET', url: '/users/2' }).as('user')
		cy.get('@user').then((res) => {
			cy.log(JSON.stringify(res.body))
			expect(res.body.data.id).equal(2)
			expect(res.body.data.email).equal('janet.weaver@reqres.in')
			expect(res.body.data.last_name).not.to.contain('someFunnyName')
		})
	})
})
