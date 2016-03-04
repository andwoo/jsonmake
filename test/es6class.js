var JSONMake = require("../src/jsonmake");
var assert = require("assert");

/* TEST JSON */
var overwrite = "overwrite";
var original = "original";
var overwriteAllJson = `{"p1":"${overwrite}","p2":"${overwrite}","p3":"${overwrite}","p4":"${overwrite}"}`;
var limitedJson = `{"p1":"${overwrite}","p2":"${overwrite}"}`;
var overwriteNoneJson = `{"a":"${overwrite}","b":"${overwrite}","c":"${overwrite}","d":"${overwrite}"}`;

/* TEST OBJECTS */
class TestClassNoBlueprint {
  constructor() {
    this.p1 = original;
    this.p2 = original;
    this.p3 = original;
    this.p4 = original;
  }
}

class TestClassBlueprint extends TestClassNoBlueprint {
  writePrint() { return ["p1", "p2"]; }
  readPrint()  { return ["p1", "p2"]; }
}

//test make
  //test make using no blueprint (both generate and reference)
  //test make using blueprint
describe("[MAKE] ES6 Class", function() {
  describe("Pass by reference", function() {
    it("Overwrite all", function() {
      let cls = new TestClassNoBlueprint();
      JSONMake.make(cls, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, overwrite);
      assert.strictEqual(cls.p4, overwrite);
    });
    
    it("Overwrite using blueprint", function() {
      let cls = new TestClassBlueprint();
      JSONMake.make(cls, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
    });
    
    it("Overwrite none", function() {
      let cls = new TestClassNoBlueprint();
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
  
  describe("Generated ES6 class", function() {
    it("Overwrite all", function() {
      let cls = JSONMake.make(TestClassNoBlueprint, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, overwrite);
      assert.strictEqual(cls.p4, overwrite);
    });
    
    it("Overwrite using blueprint", function() {
      let cls = JSONMake.make(TestClassBlueprint, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
    });
    
    it("Overwrite none", function() {
      let cls = JSONMake.make(TestClassNoBlueprint, overwriteNoneJson);
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

describe("[DUMP] ES6 Class", function() {
  it("No blueprint", function() {
    let cls = new TestClassNoBlueprint();
    cls.p1 = overwrite;
    cls.p2 = overwrite;
    cls.p3 = overwrite;
    cls.p4 = overwrite;
    assert.strictEqual(JSONMake.dump(cls), overwriteAllJson);
  });
  
  it("Using blueprint", function() {
    let cls = new TestClassBlueprint();
    cls.p1 = overwrite;
    cls.p2 = overwrite;
    delete cls.p3;
    delete cls.p3;
    assert.strictEqual(JSONMake.dump(cls), limitedJson);
  });
});