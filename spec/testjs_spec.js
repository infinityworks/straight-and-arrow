'use strict'
let request = require('request');
let home_url = "http://localhost:8888/"


describe("Home page functions", () => {


	it("Returns status code 200", (done) => {
		request.get(home_url, (error, response, body) => {
			expect(response.statusCode).toBe(200);
			done()
		});
	});

	it('should not respond with a 404', (done) => {
        request(home_url, (error, response, body)=> {
            expect(response.statusCode).not.toBe(404)
            done()
        })
    })

    // is this good, if not why not?
    it('should have a page title of "Welcome to IWAO"', (done) => {
        request(home_url, (error, response, body)=> {
            expect(body).toContain('Welcome to IWAO')
            done()
        })
    });
});
