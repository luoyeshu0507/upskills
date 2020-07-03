const camelCase = require("lodash/camelCase");
const snakeCase = require("lodash/snakeCase");
const upperFirst = require("lodash/upperFirst");


function _typeof(val) {
    return Object.prototype.toString.apply(val).toLocaleLowerCase().replace(/(\[object |])/g, '');
}

const data = {
    List: [
        {
            ID: 1,
            ParentId: '123'
        }
    ],
    Total: 10
};

const data2 = {
    list: [
        {
            id: 1,
            parent_id: '123'
        }
    ],
    total: 10
};

function changeObjectCase(obj, type) { //type = pascal | snack
    if (_typeof(obj) === 'object') {
        let res = {};
        for (let k in obj) {
            let resKey = '';
            if (type === 'pascal') {
                resKey = upperFirst(camelCase(k)).replace(/Id/i, 'ID');
            }
            if (type === 'snack') {
                resKey = snakeCase(k);
            }
            res[resKey] = changeObjectCase(obj[k], type);
        }
        return res;
    }
    if (_typeof(obj) === 'array') {
        return obj.map(item => changeObjectCase(item, type));
    }
    return obj;
}

console.log(changeObjectCase(data, 'snack'));
console.log(changeObjectCase(data2, 'pascal'));
