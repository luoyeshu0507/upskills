"use strict";

var obj = new Proxy({}, {
  get: function get(target, key, receiver) {
    console.log("getting " + key + "!");
    return Reflect.get(target, key, receiver);
  },
  set: function set(target, key, value, receiver) {
    console.log("setting " + key + "!");
    return Reflect.set(target, key, value, receiver);
  }
});

obj.count = 1;
++obj.count;