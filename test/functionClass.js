var JSONMake = require("../src/jsonmake");
var assert = require("assert");

/* TEST JSON */
var overwrite = "overwrite";
var original = "original";
var overwriteAllJson = `{"p1":"${overwrite}","p2":"${overwrite}","p3":"${overwrite}","p4":"${overwrite}"}`;
var limitedJson = `{"p1":"${overwrite}","p2":"${overwrite}"}`;
var overwriteNoneJson = `{"a":"${overwrite}","b":"${overwrite}","c":"${overwrite}","d":"${overwrite}"}`;

function TestClassFunctionNoBluePrint() {
  this.p1 = original;
  this.p2 = original;
  this.p3 = original;
  this.p4 = original;
}

function TestClassFunctionBluePrint() { TestClassFunctionNoBluePrint.apply(this); }
TestClassFunctionBluePrint.prototype.writePrint = function() { return ["p1", "p2"]; }
TestClassFunctionBluePrint.prototype.readPrint = function() { return ["p1", "p2"]; }

//test make
  //test make using no blueprint (both generate and reference)
  //test make using blueprint
describe("[MAKE] Function Class", function() {
  describe("Pass by reference", function() {
    it("Overwrite all", function() {
      let cls = new TestClassFunctionNoBluePrint();
      JSONMake.make(cls, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, overwrite);
      assert.strictEqual(cls.p4, overwrite);
    });
    
    it("Overwrite using blueprint", function() {
      let cls = new TestClassFunctionBluePrint();
      JSONMake.make(cls, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
    });
    
    it("Overwrite none", function() {
      let cls = new TestClassFunctionNoBluePrint();
      JSONMake.make(cls, overwriteNoneJson);
      assert.strictEqual(cls.p1, original);
      assert.strictEqual(cls.p2, original);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
      
      assert.strictEqual(cls.a, undefined);
      assert.strictEqual(cls.b, undefined);
      assert.strictEqual(cls.c, undefined);
      assert.strictEqual(cls.d, undefined);
    });
  });
  
  describe("Generated Function class", function() {
    it("Overwrite all", function() {
      let cls = JSONMake.make(TestClassFunctionNoBluePrint, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, overwrite);
      assert.strictEqual(cls.p4, overwrite);
    });
    
    it("Overwrite using blueprint", function() {
      let cls = JSONMake.make(TestClassFunctionBluePrint, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
    });
    
    it("Overwrite none", function() {
      let cls = JSONMake.make(TestClassFunctionNoBluePrint, overwriteNoneJson);
      assert.strictEqual(cls.p1, original);
      assert.strictEqual(cls.p2, original);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
      
      assert.strictEqual(cls.a, undefined);
      assert.strictEqual(cls.b, undefined);
      assert.strictEqual(cls.c, undefined);
      assert.strictEqual(cls.d, undefined);
    });
  });
});

describe("[DUMP] Function Class", function() {
  it("No blueprint", function() {
    let cls = new TestClassFunctionNoBluePrint();
    cls.p1 = overwrite;
    cls.p2 = overwrite;
    cls.p3 = overwrite;
    cls.p4 = overwrite;
    assert.strictEqual(JSONMake.dump(cls), overwriteAllJson);
  });
  
  it("Using blueprint", function() {
    let cls = new TestClassFunctionBluePrint();
    cls.p1 = overwrite;
    cls.p2 = overwrite;
    delete cls.p3;
    delete cls.p3;
    assert.strictEqual(JSONMake.dump(cls), limitedJson);
  });
});