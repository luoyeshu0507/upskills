function deepSet(obj, key, val) {
    console.log('before', obj);
    if (getType(obj) === 'object' && getType(key) === 'string') {
        var keyArr = key.split('.');
        var cur = obj;
        for (var i = 0; i < keyArr.length; i++) {
            if (i === keyArr.length - 1) {
                cur[keyArr[i]] = val;
            } else {
                cur = getType(cur[keyArr[i]]) === 'object'? cur[keyArr[i]]: cur[keyArr[i]] = {};
            }
        }
    }
    console.log('after', obj);
    return obj;
}

function getType(val) {
    return Object.prototype.toString.call(val).toLocaleLowerCase().match(/\w+(?=\])/)[0];
}

// deepSet({}, 'a.b.c', 1);
// deepSet({a: {d: 2}}, 'a.b.c', 1);

Object.prototype.deepSet = function(key, val) {
    function getType(val) {
        return Object.prototype.toString.call(val).toLocaleLowerCase().match(/\w+(?=\])/)[0];
    }
    console.log('before', this);
    if (getType(this) === 'object' && getType(key) === 'string') {
        var keyArr = key.split('.');
        var cur = this;
        for (var i = 0; i < keyArr.length; i++) {
            if (i === keyArr.length - 1) {
                cur[keyArr[i]] = val;
            } else {
                cur = getType(cur[keyArr[i]]) === 'object'? cur[keyArr[i]]: cur[keyArr[i]] = {};
            }
        }
    }
    console.log('after', this);
    return this;
}

var a = {};
a.deepSet('b.c.d', 2);