describe('REST api testing with cypress', () => {
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
