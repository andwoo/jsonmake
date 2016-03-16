var assert = {
  strictEqual: function(v1, v2) {
    return v1 === v2;
  },
  equal: function(v1, v2) {
    return this.strictEqual(v1, v2);
  }
}