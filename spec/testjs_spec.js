const helloWorld = require('../helloworld');

describe("Hello world", function() {
	it("returns hello world", function() {
    expect(helloWorld()).toEqual("Hello World!");
	});
});