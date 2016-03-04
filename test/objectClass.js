var JSONMake = require("../src/jsonmake");
var assert = require("assert");

/* TEST JSON */
var overwrite = "overwrite";
var original = "original";
var overwriteAllJson = `{"p1":"${overwrite}","p2":"${overwrite}","p3":"${overwrite}","p4":"${overwrite}"}`;
var limitedJson = `{"p1":"${overwrite}","p2":"${overwrite}"}`;
var overwriteNoneJson = `{"a":"${overwrite}","b":"${overwrite}","c":"${overwrite}","d":"${overwrite}"}`;

/* TEST OBJECTS */
var ObjectClassNoBlueprint = {
  p1: original,
  p2: original,
  p3: original,
  p4: original
};

var ObjectClassBlueprint = Object.create(ObjectClassNoBlueprint);
ObjectClassBlueprint.writePrint = function() { return ["p1", "p2"]; }
ObjectClassBlueprint.readPrint = function() { return ["p1", "p2"]; }

//test make
  //test make using no blueprint (both generate and reference)
  //test make using blueprint
describe("[MAKE] Object Class", function() {
  describe("Pass by reference", function() {
    it("Overwrite all", function() {
      let cls = Object.create(ObjectClassNoBlueprint);
      JSONMake.make(cls, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, overwrite);
      assert.strictEqual(cls.p4, overwrite);
    });
    
    it("Overwrite using blueprint", function() {
      let cls = Object.create(ObjectClassBlueprint);
      JSONMake.make(cls, overwriteAllJson);
      assert.strictEqual(cls.p1, overwrite);
      assert.strictEqual(cls.p2, overwrite);
      assert.strictEqual(cls.p3, original);
      assert.strictEqual(cls.p4, original);
    });
    
    it("Overwrite none", function() {
      let cls = Object.create(ObjectClassNoBlueprint);
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
});

describe("[DUMP] ES6 Class", function() {
  it("No blueprint", function() {
    let cls = Object.create(ObjectClassNoBlueprint);
    cls.p1 = overwrite;
    cls.p2 = overwrite;
    cls.p3 = overwrite;
    cls.p4 = overwrite;
    assert.strictEqual(JSONMake.dump(cls), overwriteAllJson);
  });
  
  it("Using blueprint", function() {
    let cls = Object.create(ObjectClassBlueprint);
    cls.p1 = overwrite;
    cls.p2 = overwrite;
    delete cls.p3;
    delete cls.p3;
    assert.strictEqual(JSONMake.dump(cls), limitedJson);
  });
});