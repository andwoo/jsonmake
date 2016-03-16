try {
  var JSONMake = require("../jsonmake");
  var assert = require("assert");
}
catch(error) {
  
}

describe("Helper methods", function() {
  describe("Is undefined", function() {
    it("function  = false", function() {
      assert.equal(JSONMake.isUndefined(function(){ console.log("method"); }), false);
    });
    it("object    = false", function() {
      assert.equal(JSONMake.isUndefined({a:"b"}), false);
    });
    it("array     = false", function() {
      assert.equal(JSONMake.isUndefined([1, 2, 3]), false);
    });
    it("string    = false", function() {
      assert.equal(JSONMake.isUndefined("teststring"), false);
    });
    it("undefined = true", function() {
      assert.equal(JSONMake.isUndefined(undefined), true);
    });
    it("null      = true", function() {
      assert.equal(JSONMake.isUndefined(null), true);
    });
  });
  
  describe("Is function", function() {
    it("function  = true", function() {
      assert.equal(JSONMake.isFunction(function(){ console.log("method"); }), true);
    });
    it("object    = false", function() {
      assert.equal(JSONMake.isFunction({a:"b"}), false);
    });
    it("array     = false", function() {
      assert.equal(JSONMake.isFunction([1, 2, 3]), false);
    });
    it("string    = false", function() {
      assert.equal(JSONMake.isFunction("teststring"), false);
    });
    it("undefined = false", function() {
      assert.equal(JSONMake.isFunction(undefined), false);
    });
    it("null      = false", function() {
      assert.equal(JSONMake.isFunction(null), false);
    });
  });
  
  describe("Is object", function() {
    it("function  = false", function() {
      assert.equal(JSONMake.isObject(function(){ console.log("method"); }), false);
    });
    it("object    = true", function() {
      assert.equal(JSONMake.isObject({a:"b"}), true);
    });
    it("array     = false", function() {
      assert.equal(JSONMake.isObject([1, 2, 3]), false);
    });
    it("string    = false", function() {
      assert.equal(JSONMake.isObject("teststring"), false);
    });
    it("undefined = false", function() {
      assert.equal(JSONMake.isObject(undefined), false);
    });
    it("null      = false", function() {
      assert.equal(JSONMake.isObject(null), false);
    });
  });
  
  describe("Is Array", function() {
    it("function  = false", function() {
      assert.equal(JSONMake.isArray(function(){ console.log("method"); }), false);
    });
    it("object    = false", function() {
      assert.equal(JSONMake.isArray({a:"b"}), false);
    });
    it("array     = true", function() {
      assert.equal(JSONMake.isArray([1, 2, 3]), true);
    });
    it("string    = false", function() {
      assert.equal(JSONMake.isArray("teststring"), false);
    });
    it("undefined = false", function() {
      assert.equal(JSONMake.isArray(undefined), false);
    });
    it("null      = false", function() {
      assert.equal(JSONMake.isArray(null), false);
    });
  });
});