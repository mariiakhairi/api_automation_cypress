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

	it('API Tests - POST Request', () => {
		cy.request({
			method: 'POST',
			url: '/login',
			body: {
				email: 'eve.holt@reqres.in',
				password: 'cityslicka',
			},
		}).as('loginRequest')
		cy.get('@loginRequest').then((res) => {
			cy.log(JSON.stringify(res.body))
			expect(res.status).equal(200)
			expect(res.body.token).equal('QpwL5tke4Pnpja7X4')
		})
	})
	it('API Tests - POST Request error', () => {
		cy.request({
			method: 'POST',
			url: '/login',
			body: {
				email: 'peter@klaven',
			},
			failOnStatusCode: false,
		}).as('loginRequest')
		cy.get('@loginRequest').then((res) => {
			cy.log(JSON.stringify(res.body))
			expect(res.status).equal(400)
			expect(res.body.error).equal('Missing password')
		})
	})

	it('API Tests - DELETE Request', () => {
		cy.request({
			method: 'DELETE',
			url: '/users/2',
		}).as('deleteUser')
		cy.get('@deleteUser').then((res) => {
			cy.log(JSON.stringify(res.body))
			expect(res.status).equal(204)
		})
	})

	it('API Tests - PUT Request', () => {
		cy.request({
			method: 'PUT',
			url: '/users/2',
			body: {
				email: 'email-update@reqres.in',
				name: 'name-update',
			},
		}).as('putRequest')
		cy.get('@putRequest').then((res) => {
			cy.log(JSON.stringify(res.body))
			expect(res.status).equal(200)
			expect(res.body.email).equal('email-update@reqres.in')
			expect(res.body.name).equal('name-update')
		})
	})
})
