function JSONMake(cfg) {
  JSONMake.prototype.config(cfg);
}
JSONMake.prototype.config = function(config) {
  //override config
  var temp = JSONMake.prototype.isUndefined(config) ? {} : config;
  this.config = {
    readPrint: temp.readPrint || "readPrint",
    writePrint: temp.writePrint || "writePrint"
  }
};

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
    console.warn(`Make warning: ${obj.constructor.name} is not a function or object`);
    return obj;
  }
  
  if(JSONMake.prototype.isUndefined(source) || source === "" ) {
    console.warn(`Make warning: JSON source '${source}' is undefined or invalid`);
    return makeObj;
  }
  //check if jsonstring is a string or already parsed json
  var parsed;
  try {
    parsed = JSONMake.prototype.isString(source) ? JSON.parse(source) : source;
  }
  catch(error) {
    console.warn(`Make warning: JSON source '${source}' is undefined or invalid`);
    return makeObj;
  }
  
  if(this.config.readPrint in makeObj && JSONMake.prototype.isFunction(makeObj[this.config.readPrint])) {
    var blueprint = makeObj[this.config.readPrint]();
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
  
JSONMake.prototype.dump = function(obj) {
  if (JSONMake.prototype.isUndefined(obj)) {
    console.warn(`Dump warning: object is undefined`);
    return "{}"; //empty json object
  }
  else if(this.config.writePrint in obj && JSONMake.prototype.isFunction(obj[this.config.writePrint])) {
    //use the blueprint
    var blueprint = obj[this.config.writePrint]();
    if(JSONMake.prototype.isArray(blueprint)) {
      var tempObj = {};
      for(var key of blueprint) {
        tempObj[key] = obj[key];
      }
      obj = tempObj;
    }
    else {
      console.warn(`Dump warning: blueprint returned by '${obj.constructor.name}' is not an array`);
    }
  }
  
  return JSON.stringify(obj);
};

//helper methods
JSONMake.prototype.isUndefined = function(thing) {
  return thing === undefined || thing === null;
}
JSONMake.prototype.isFunction = function(thing) {
  return typeof(thing) === "function";
}
JSONMake.prototype.isObject = function(thing) {
  return !JSONMake.prototype.isUndefined(thing) && typeof(thing) === "object" && !JSONMake.prototype.isArray(thing);
}
JSONMake.prototype.isArray = function(thing) {
  return thing instanceof Array;
}
JSONMake.prototype.isString = function(thing) {
  return typeof(thing) === "string";
}

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