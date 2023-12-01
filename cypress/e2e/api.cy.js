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
})
