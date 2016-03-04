# JSONmake
A JSON library for serializing and deserializing specific properties of objects. Inspired by [TinyJSON](https://github.com/pbhogan/TinyJSON).

## Features
- Only properties that exist on objects will be serialized or deserialized, objects not defined will be skipped.
- Choose which subset of properties get inserted into objects from JSON.
- Choose which subset of properties get output to JSON.

## Install
```
npm install jsonmake --save
```

## Usage
### Populating or generating an object from JSON.
Test class and JSON string.
```javascript
var jsonString = '{"p1":"overwrite","p2":"overwrite","p3":"overwrite","p4":"overwrite"}';

class TestClass {
  constructor() {
    this.p1 = "original";
    this.p2 = "original";
    this.p3 = "original";
    this.p4 = "original";
  }
}
```
Create an object yourself or pass the function contructor to create the object for you.
```javascript
var cls = new TestClass();
JSONMake.make(cls, jsonString);

or

var cls = JSONMake.make(TestClass, jsonString);

//cls.p1 -> "overwrite"
//cls.p2 -> "overwrite"
//cls.p3 -> "overwrite"
//cls.p4 -> "overwrite"
```
If the JSON string contained properties other than p1 to p4, They would not be created on the instance.
```javascript
var jsonString = '{"p1":"overwrite","p2":"overwrite","p3":"overwrite","p4":"overwrite","asd":"overwrite"}';
var cls = JSONMake.make(TestClass, jsonString);

//cls.p1 -> "overwrite"
//cls.p2 -> "overwrite"
//cls.p3 -> "overwrite"
//cls.p4 -> "overwrite"
//cls.asd -> undefined
```
If your object contains the method `readJSON` you can choose which properties get populated from JSON.
```javascript
class TestClass {
  constructor() {
    this.p1 = "original";
    this.p2 = "original";
    this.p3 = "original";
    this.p4 = "original";
  }
  readJSON() {
    return ["p1", "p2"];
  }
}

var cls = JSONMake.make(TestClass, jsonString);

//cls.p1 -> "overwrite"
//cls.p2 -> "overwrite"
//cls.p3 -> "original"
//cls.p4 -> "original"

```
### Creating JSON data from an object.
If the object contains the method `writeJSON`, only those values will be output to JSON.
```javascript
class TestClass {
  constructor() {
    this.p1 = "original";
    this.p2 = "original";
    this.p3 = "original";
    this.p4 = "original";
  }
  writeJSON() {
    return ["p1", "p2"];
  }
}

var cls = new TestClass();
var stringified = JSONMake.dump(cls);

//stringified -> {"p1":"original","p2":"original"}
```
If no method is present, the `JSONMake.dump(obj)` method works the same as `JSON.stringify(obj)`.
```javascript
var cls = new TestClass();
var stringified = JSONMake.dump(cls);

//stringified -> {"p1":"original","p2":"original","p3":"original","p4":"original"}
```