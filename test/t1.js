
const assert = require('chai').assert
const testing = require("../phonebook.js");

describe("testing the list", function() {
    let m = new testing();
    var nameValue = this.phone_book.map(function (a) { return a.name; })
  it("checks if its a list", function() {
    assert.equal("string",typeof nameValue[0]);
  });
});



