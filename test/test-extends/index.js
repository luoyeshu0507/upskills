 let copyArray = function (arr, coped) {
    arr.forEach((item, index) => {
        if (Array.isArray(item)) {
            coped[index] = [];
            copyArray(item, coped[index]);
        }  else if (item !== null && typeof item === 'object') {
            let obj = {};
            extend(true, obj, item);
            coped.push(obj);
        } else {
            coped.push(item);
        }
    });
 };

let extend = function (isRecursive, o, ext) {
    console.log(ext, '\n-----');
    if (!isRecursive) {
        for (let [key, value] of Object.entries(ext)) {
            o[key] = value;
        }
    }

    for (let [key, value] of Object.entries(ext)) {
        // 数组只会覆盖，不会合并，没法区分是否相同数据
        if (Array.isArray(value)) {
            o[key] = [];
            copyArray(value, o[key]);
        } else if (value !== null && typeof value === 'object') {
            o[key] = o[key] || {};
            extend(true, o[key], value);
        } else {
            o[key] = value;
        }
    }
};

let xxx = {
    "customer": {
        "customerType": 1,
        "customerStatus": 999,
        "owner": {
            "kfext": "0",
            "name": null
        },
        "tag": [],
        "gender": 0,
        "name": "华通",
        "avatar": "http://thirdqq.qlogo.cn/g?b=oidb&k=Nod8MHmKprMZsKBIJ6UtAg&s=0",
        "education": 0,
        "birthday": "",
        "position": [null, ""],
        "country": {
            "name": "中国",
            "code": 49
        },
        "province": {
            "name": "福建",
            "code": 13109
        },
        "city": {
            "name": "泉州",
            "code": 53
        },
        "region": {
            "name": null,
            "code": ""
        },
        "address": "商业大厦11楼华通",
        "remark": "马思羽0591-87879946；15259165142\r",
        "mobile": [{
            "fid": 7968,
            "value": "+8613705068346",
            "valid": 0
        }],
        "tel": [],
        "email": [],
        "fax": [],
        "wx": [],
        "qq": [{
            "value": 563369255,
            "verify": 1,
            "fid": 7963
        }],
        "relationAccounts": {
            "qqMp": [],
            "wxMp": [],
            "lt": [],
            "ipphone": [],
            "qqGroup": [],
            "corpUinFriends": [{
                "name": "福州捷之印图文",
                "avatar": "http://imgplat.store.qq.com/bqq_qfpic/520520/2_938012930_face/0",
                "uin": 563369255,
                "id": "2852137135"
            }],
            "visitorId": []
        },
        "modifyTime": null,
        "socialAccount": [{
            "avatar": "http://imgplat.store.qq.com/bqq_qfpic/520520/2_938012930_face/0",
            "name": "福州捷之印图文",
            "desc": "主号好友",
            "certi": 0
        }],
        "status": [{
            "id": 999,
            "name": "待跟进",
            "state": 1,
            "flag": 0
        }, {
            "id": 4,
            "name": "已成单",
            "state": 1,
            "flag": 1
        }],
        "operatorKfext": "3007271565",
        "canMerge": true,
        "canEditOther": true
    },
    "qqInfo": [],
    "wxInfo": [],
    "webImInfo": []
};

let a1 = extend(true, {}, xxx);