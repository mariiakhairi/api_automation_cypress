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
})
