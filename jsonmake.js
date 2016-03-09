/**
 * Creates a new instance of JSONMake.
 * @constructor
 * @param {Object} cfg - Config object containing keys for overriding the method names for 'readJSON' and 'writeJSON'.
 */
function JSONMake(cfg) {
  JSONMake.prototype.config(cfg);
}
/**
 * Overwrites the default config object.
 * @param {Object} cfg - Config object containing keys for overriding the method names for 'readJSON' and 'writeJSON'. 
 */
JSONMake.prototype.config = function(config) {
  var temp = JSONMake.prototype.isUndefined(config) ? {} : config;
  this.config = {
    readJSON: temp.readJSON || "readJSON",
    writeJSON: temp.writeJSON || "writeJSON"
  }
};
/**
 * Generates or populates an object with data from the source. If the key does not exist on the 'obj', it will not be added and skipped. 
 * If the method 'readJSON' exists on the obj, it will only populate those keys.
 * @param {Object} obj - Function constructor or object to populate with data parsed from JSON.
 * @param {string} source - JSON string data or an already parsed object.
 * @return {Object} Object containing parsed data.
 */
JSONMake.prototype.make = function(obj, source) {
  //generates a class from json
  var makeObj;
  if (JSONMake.prototype.isFunction(obj)) {
    //perform new
    makeObj = new obj();
  }
  else if(JSONMake.prototype.isObject(obj) && !JSONMake.prototype.isUndefined(obj)) {
    //object is already created
    makeObj = obj;
  }
  else {
    console.warn("Make warning: " + obj.constructor.name + " is not a function or object");
    return obj;
  }
  
  if(JSONMake.prototype.isUndefined(source) || source === "" ) {
    console.warn("Make warning: JSON source " + source + " is undefined or invalid");
    return makeObj;
  }
  //check if jsonstring is a string or already parsed json
  var parsed;
  try {
    parsed = JSONMake.prototype.isString(source) ? JSON.parse(source) : source;
  }
  catch(error) {
    console.warn("Make warning: JSON source " + source + " is undefined or invalid");
    return makeObj;
  }
  
  if(this.config.readJSON in makeObj && JSONMake.prototype.isFunction(makeObj[this.config.readJSON])) {
    var blueprint = makeObj[this.config.readJSON]();
    if(JSONMake.prototype.isArray(blueprint)) {
      for(var key of blueprint) {
        if(key in parsed) {
          makeObj[key] = parsed[key];  
        }
      }
      return makeObj;
    }
  }
  
  var keys = JSONMake.prototype.getObjectKeys(parsed);
  for(var key of keys) {
    if(key in makeObj) {
      makeObj[key] = parsed[key];
    }
  }
  return makeObj;
};
/**
 * Convers the obj to a JSON string. If the method 'writeJSON' exists on the object, it will only convert those properties to JSON while 
 * ignoring the rest.
 * @param {Object} obj - Object to convert to a JSON string.
 * @return {string} Stringified JSON object.
 */
JSONMake.prototype.dump = function(obj) {
  if (JSONMake.prototype.isUndefined(obj)) {
    console.warn("Dump warning: object is undefined");
    return "{}"; //empty json object
  }
  else if(this.config.writeJSON in obj && JSONMake.prototype.isFunction(obj[this.config.writeJSON])) {
    //use the blueprint
    var blueprint = obj[this.config.writeJSON]();
    if(JSONMake.prototype.isArray(blueprint)) {
      var tempObj = {};
      for(var key of blueprint) {
        tempObj[key] = obj[key];
      }
      obj = tempObj;
    }
    else {
      console.warn("Dump warning: blueprint returned by " + obj.constructor.name + " is not an array");
    }
  }
  
  return JSON.stringify(obj);
};
/**
 * Method checks if the passed in parameter is undefined or null. 
 * @param {any} thing - Value to test
 * @return {bool} Returns TRUE if the parameter is undefined or null.
 */
JSONMake.prototype.isUndefined = function(thing) {
  return thing === undefined || thing === null;
}
/**
 * Method checks if the passed in parameter is a function. 
 * @param {any} thing - Value to test
 * @return {bool} Returns TRUE if the parameter is a function.
 */
JSONMake.prototype.isFunction = function(thing) {
  return typeof(thing) === "function";
}
/**
 * Method checks if the passed in parameter is of type Object. 
 * @param {any} thing - Value to test
 * @return {bool} Returns TRUE if the parameter is of type Object.
 */
JSONMake.prototype.isObject = function(thing) {
  return !JSONMake.prototype.isUndefined(thing) && typeof(thing) === "object" && !JSONMake.prototype.isArray(thing);
}
/**
 * Method checks if the passed in parameter is of type array. 
 * @param {any} thing - Value to test
 * @return {bool} Returns TRUE if the parameter is of type array.
 */
JSONMake.prototype.isArray = function(thing) {
  return thing instanceof Array;
}
/**
 * Method checks if the passed in parameter is of type string. 
 * @param {any} thing - Value to test
 * @return {bool} Returns TRUE if the parameter is of type string.
 */
JSONMake.prototype.isString = function(thing) {
  return typeof(thing) === "string";
}
/**
 * Returns the property keys of the given object.
 * @param {Object} obj - Object to retrieve property keys from
 * @return {string[]} Array of keys.
 */
JSONMake.prototype.getObjectKeys = function(obj) {
  if(Object.keys) {
    return Object.keys(obj);
  }
  //polyfill incase Object.keys does not exist
  else {
    var keys = [];
    for(var key in obj) {
      keys.push(key);
    }
    return keys;
  }
};

//export the library
if(!JSONMake.prototype.isUndefined(exports) && !JSONMake.prototype.isUndefined(module) && module.exports) {
//export the code for node
  module.exports = new JSONMake({});
}
//browser
else if(window) {
  window.JSONMake = new JSONMake({});
}