/**
 * treeList to keyIdMap
 * @param {*权限树列表} treeList
 * */
function treeListToKeyIdMap(treeList, map = {}, parentKey = '') {
  treeList.forEach(per => {
    map[parentKey + per.permissionKey] = per.id;
    if (per.children) treeListToKeyIdMap(per.children, map, parentKey + per.permissionKey + '.');
  });
  return map;
}

var data = [
    {
        "id": "dBbn3eXv",
        "appId": "avX0nlyo",
        "permissionName": "管理后台",
        "des": "",
        "createTime": 1594970253,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "ADMIN",
        "parentPermissionId": "",
        "title": "管理后台",
        "value": "dBbn3eXv",
        "children": [
            {
                "id": "DOXa4dbN",
                "appId": "avX0nlyo",
                "permissionName": "系统配置",
                "des": "",
                "createTime": 1594970292,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "SYSTEM_CONFIG",
                "parentPermissionId": "dBbn3eXv",
                "title": "系统配置",
                "value": "DOXa4dbN",
                "children": [
                    {
                        "id": "V6X6L5la",
                        "appId": "avX0nlyo",
                        "permissionName": "权限管理",
                        "des": "",
                        "createTime": 1594970418,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "PERMISSION",
                        "parentPermissionId": "DOXa4dbN",
                        "title": "权限管理",
                        "value": "V6X6L5la",
                        "children": [
                            {
                                "id": "5Qb8PybE",
                                "appId": "avX0nlyo",
                                "permissionName": "添加权限",
                                "des": "",
                                "createTime": 1594970431,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "ADD",
                                "parentPermissionId": "V6X6L5la",
                                "title": "添加权限",
                                "value": "5Qb8PybE"
                            },
                            {
                                "id": "zwlVD5XL",
                                "appId": "avX0nlyo",
                                "permissionName": "删除权限",
                                "des": "",
                                "createTime": 1594970444,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "DELETE",
                                "parentPermissionId": "V6X6L5la",
                                "title": "删除权限",
                                "value": "zwlVD5XL"
                            },
                            {
                                "id": "dBbn3ZXv",
                                "appId": "avX0nlyo",
                                "permissionName": "修改权限",
                                "des": "",
                                "createTime": 1594970458,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "EDIT",
                                "parentPermissionId": "V6X6L5la",
                                "title": "修改权限",
                                "value": "dBbn3ZXv"
                            },
                            {
                                "id": "20XBQxbA",
                                "appId": "avX0nlyo",
                                "permissionName": "查看权限",
                                "des": "",
                                "createTime": 1594970472,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "LIST",
                                "parentPermissionId": "V6X6L5la",
                                "title": "查看权限",
                                "value": "20XBQxbA"
                            }
                        ]
                    },
                    {
                        "id": "MVG1jrlr",
                        "appId": "avX0nlyo",
                        "permissionName": "项目管理",
                        "des": "",
                        "createTime": 1594970315,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "PROJECT",
                        "parentPermissionId": "DOXa4dbN",
                        "title": "项目管理",
                        "value": "MVG1jrlr",
                        "children": [
                            {
                                "id": "J9bJYql2",
                                "appId": "avX0nlyo",
                                "permissionName": "添加项目",
                                "des": "",
                                "createTime": 1594970331,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "ADD",
                                "parentPermissionId": "MVG1jrlr",
                                "title": "添加项目",
                                "value": "J9bJYql2"
                            },
                            {
                                "id": "RNbQvWX5",
                                "appId": "avX0nlyo",
                                "permissionName": "删除项目",
                                "des": "",
                                "createTime": 1594970343,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "DELETE",
                                "parentPermissionId": "MVG1jrlr",
                                "title": "删除项目",
                                "value": "RNbQvWX5"
                            },
                            {
                                "id": "a1lOqpXk",
                                "appId": "avX0nlyo",
                                "permissionName": "修改项目",
                                "des": "",
                                "createTime": 1594970355,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "EDIT",
                                "parentPermissionId": "MVG1jrlr",
                                "title": "修改项目",
                                "value": "a1lOqpXk"
                            },
                            {
                                "id": "zAlmEol3",
                                "appId": "avX0nlyo",
                                "permissionName": "查看项目",
                                "des": "",
                                "createTime": 1594970391,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "LIST",
                                "parentPermissionId": "MVG1jrlr",
                                "title": "查看项目",
                                "value": "zAlmEol3"
                            },
                            {
                                "id": "zybLK0lB",
                                "appId": "avX0nlyo",
                                "permissionName": "项目权限管理",
                                "des": "",
                                "createTime": 1594970908,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "PERMISSION_MANAGE",
                                "parentPermissionId": "MVG1jrlr",
                                "title": "项目权限管理",
                                "value": "zybLK0lB",
                                "children": [
                                    {
                                        "id": "4ZX4dVXY",
                                        "appId": "avX0nlyo",
                                        "permissionName": "修改权限",
                                        "des": "",
                                        "createTime": 1594970923,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "EDIT",
                                        "parentPermissionId": "zybLK0lB",
                                        "title": "修改权限",
                                        "value": "4ZX4dVXY"
                                    },
                                    {
                                        "id": "JMGx6Bby",
                                        "appId": "avX0nlyo",
                                        "permissionName": "查看权限",
                                        "des": "",
                                        "createTime": 1594970942,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "LIST",
                                        "parentPermissionId": "zybLK0lB",
                                        "title": "查看权限",
                                        "value": "JMGx6Bby"
                                    }
                                ]
                            },
                            {
                                "id": "DOXa4BbN",
                                "appId": "avX0nlyo",
                                "permissionName": "角色管理",
                                "des": "",
                                "createTime": 1594970557,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "ROLE",
                                "parentPermissionId": "MVG1jrlr",
                                "title": "角色管理",
                                "value": "DOXa4BbN",
                                "children": [
                                    {
                                        "id": "MVG1jOlr",
                                        "appId": "avX0nlyo",
                                        "permissionName": "添加角色",
                                        "des": "",
                                        "createTime": 1594970574,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "ADD",
                                        "parentPermissionId": "DOXa4BbN",
                                        "title": "添加角色",
                                        "value": "MVG1jOlr"
                                    },
                                    {
                                        "id": "J9bJYAl2",
                                        "appId": "avX0nlyo",
                                        "permissionName": "删除角色",
                                        "des": "",
                                        "createTime": 1594970588,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "DELETE",
                                        "parentPermissionId": "DOXa4BbN",
                                        "title": "删除角色",
                                        "value": "J9bJYAl2"
                                    },
                                    {
                                        "id": "RNbQvQX5",
                                        "appId": "avX0nlyo",
                                        "permissionName": "修改角色",
                                        "des": "",
                                        "createTime": 1594970603,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "EDIT",
                                        "parentPermissionId": "DOXa4BbN",
                                        "title": "修改角色",
                                        "value": "RNbQvQX5"
                                    },
                                    {
                                        "id": "nwlgWLlQ",
                                        "appId": "avX0nlyo",
                                        "permissionName": "查看角色",
                                        "des": "",
                                        "createTime": 1594970615,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "LIST",
                                        "parentPermissionId": "DOXa4BbN",
                                        "title": "查看角色",
                                        "value": "nwlgWLlQ"
                                    },
                                    {
                                        "id": "AmG5jol0",
                                        "appId": "avX0nlyo",
                                        "permissionName": "角色权限管理",
                                        "des": "",
                                        "createTime": 1594970634,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "PERMISSION_MANAGE",
                                        "parentPermissionId": "DOXa4BbN",
                                        "title": "角色权限管理",
                                        "value": "AmG5jol0",
                                        "children": [
                                            {
                                                "id": "5dlYQzlZ",
                                                "appId": "avX0nlyo",
                                                "permissionName": "修改权限",
                                                "des": "",
                                                "createTime": 1594970705,
                                                "createUserId": "VG1K9obr",
                                                "createUserName": "luoyeshuli",
                                                "permissionKey": "EDIT",
                                                "parentPermissionId": "AmG5jol0",
                                                "title": "修改权限",
                                                "value": "5dlYQzlZ"
                                            },
                                            {
                                                "id": "18lpeAbD",
                                                "appId": "avX0nlyo",
                                                "permissionName": "查看权限",
                                                "des": "",
                                                "createTime": 1594970717,
                                                "createUserId": "VG1K9obr",
                                                "createUserName": "luoyeshuli",
                                                "permissionKey": "LIST",
                                                "parentPermissionId": "AmG5jol0",
                                                "title": "查看权限",
                                                "value": "18lpeAbD"
                                            }
                                        ]
                                    },
                                    {
                                        "id": "1klWyAXA",
                                        "appId": "avX0nlyo",
                                        "permissionName": "用户管理",
                                        "des": "",
                                        "createTime": 1594970798,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "USER_MANAGE",
                                        "parentPermissionId": "DOXa4BbN",
                                        "title": "用户管理",
                                        "value": "1klWyAXA",
                                        "children": [
                                            {
                                                "id": "q2lzkNb5",
                                                "appId": "avX0nlyo",
                                                "permissionName": "添加用户",
                                                "des": "",
                                                "createTime": 1594970818,
                                                "createUserId": "VG1K9obr",
                                                "createUserName": "luoyeshuli",
                                                "permissionKey": "ADD",
                                                "parentPermissionId": "1klWyAXA",
                                                "title": "添加用户",
                                                "value": "q2lzkNb5"
                                            },
                                            {
                                                "id": "okb2n5bN",
                                                "appId": "avX0nlyo",
                                                "permissionName": "删除用户",
                                                "des": "",
                                                "createTime": 1594970832,
                                                "createUserId": "VG1K9obr",
                                                "createUserName": "luoyeshuli",
                                                "permissionKey": "DELETE",
                                                "parentPermissionId": "1klWyAXA",
                                                "title": "删除用户",
                                                "value": "okb2n5bN"
                                            },
                                            {
                                                "id": "r3G778GL",
                                                "appId": "avX0nlyo",
                                                "permissionName": "查看用户",
                                                "des": "",
                                                "createTime": 1594970849,
                                                "createUserId": "VG1K9obr",
                                                "createUserName": "luoyeshuli",
                                                "permissionKey": "LIST",
                                                "parentPermissionId": "1klWyAXA",
                                                "title": "查看用户",
                                                "value": "r3G778GL"
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "nwlgKolQ",
        "appId": "avX0nlyo",
        "permissionName": "预警推送",
        "des": "",
        "createTime": 1595848607,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "ALARM",
        "parentPermissionId": "",
        "title": "预警推送",
        "value": "nwlgKolQ",
        "children": [
            {
                "id": "AmG5Nel0",
                "appId": "avX0nlyo",
                "permissionName": "关键词预警",
                "des": "",
                "createTime": 1595848689,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "KEYWORD_ALARM",
                "parentPermissionId": "nwlgKolQ",
                "title": "关键词预警",
                "value": "AmG5Nel0",
                "children": [
                    {
                        "id": "18lpkBGD",
                        "appId": "avX0nlyo",
                        "permissionName": "预警配置",
                        "des": "",
                        "createTime": 1595848955,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "CONFIG",
                        "parentPermissionId": "AmG5Nel0",
                        "title": "预警配置",
                        "value": "18lpkBGD"
                    },
                    {
                        "id": "5dlYkyXZ",
                        "appId": "avX0nlyo",
                        "permissionName": "预警处理",
                        "des": "",
                        "createTime": 1595848842,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "REPORTS",
                        "parentPermissionId": "AmG5Nel0",
                        "title": "预警处理",
                        "value": "5dlYkyXZ"
                    },
                    {
                        "id": "1klW52XA",
                        "appId": "avX0nlyo",
                        "permissionName": "词库管理",
                        "des": "",
                        "createTime": 1595848999,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "THESAURUS",
                        "parentPermissionId": "AmG5Nel0",
                        "title": "词库管理",
                        "value": "1klW52XA"
                    }
                ]
            }
        ]
    },
    {
        "id": "JMGxL6Gy",
        "appId": "avX0nlyo",
        "permissionName": "专项报告",
        "des": "",
        "createTime": 1597215087,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "CUSTOM",
        "parentPermissionId": "",
        "title": "专项报告",
        "value": "JMGxL6Gy",
        "children": [
            {
                "id": "d4bE3VGN",
                "appId": "avX0nlyo",
                "permissionName": "自定义报告",
                "des": "",
                "createTime": 1597215144,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "CUSTOM_REPORT",
                "parentPermissionId": "JMGxL6Gy",
                "title": "自定义报告",
                "value": "d4bE3VGN",
                "children": [
                    {
                        "id": "ZdGZm5Xx",
                        "appId": "avX0nlyo",
                        "permissionName": "报告中心",
                        "des": "",
                        "createTime": 1597215170,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "REPORT_CENTER",
                        "parentPermissionId": "d4bE3VGN",
                        "title": "报告中心",
                        "value": "ZdGZm5Xx"
                    },
                    {
                        "id": "z6lrrrlD",
                        "appId": "avX0nlyo",
                        "permissionName": "模板管理",
                        "des": "",
                        "createTime": 1597215201,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "TEMPLATE",
                        "parentPermissionId": "d4bE3VGN",
                        "title": "模板管理",
                        "value": "z6lrrrlD"
                    }
                ]
            }
        ]
    },
    {
        "id": "d4bEr0XN",
        "appId": "avX0nlyo",
        "permissionName": "游戏权限",
        "des": "",
        "createTime": 1594971254,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "GAME",
        "parentPermissionId": "",
        "title": "游戏权限",
        "value": "d4bEr0XN",
        "children": [
            {
                "id": "20XB0xlA",
                "appId": "avX0nlyo",
                "permissionName": "乱世王者",
                "des": "",
                "createTime": 1595300366,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "GAME_1286031",
                "parentPermissionId": "d4bEr0XN",
                "title": "乱世王者",
                "value": "20XB0xlA"
            },
            {
                "id": "JMGxkBXy",
                "appId": "avX0nlyo",
                "permissionName": "一人之下",
                "des": "",
                "createTime": 1595335919,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_1640857",
                "parentPermissionId": "d4bEr0XN",
                "title": "一人之下",
                "value": "JMGxkBXy"
            },
            {
                "id": "4ZX4LVXY",
                "appId": "avX0nlyo",
                "permissionName": "完美世界手游",
                "des": "",
                "createTime": 1595335846,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_1644941",
                "parentPermissionId": "d4bEr0XN",
                "title": "完美世界手游",
                "value": "4ZX4LVXY"
            },
            {
                "id": "r3G7A8bL",
                "appId": "avX0nlyo",
                "permissionName": "DNF手游",
                "des": "",
                "createTime": 1595335777,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_1661982",
                "parentPermissionId": "d4bEr0XN",
                "title": "DNF手游",
                "value": "r3G7A8bL"
            },
            {
                "id": "ZdGZyoXx",
                "appId": "avX0nlyo",
                "permissionName": "王者荣耀",
                "des": "",
                "createTime": 1594971282,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "GAME_173",
                "parentPermissionId": "d4bEr0XN",
                "title": "王者荣耀",
                "value": "ZdGZyoXx"
            },
            {
                "id": "zwlVa5GL",
                "appId": "avX0nlyo",
                "permissionName": "食物语",
                "des": "",
                "createTime": 1595296445,
                "createUserId": "VG1Kvmbr",
                "createUserName": "v_qwji",
                "permissionKey": "GAME_1735823",
                "parentPermissionId": "d4bEr0XN",
                "title": "食物语",
                "value": "zwlVa5GL"
            },
            {
                "id": "q2lzONb5",
                "appId": "avX0nlyo",
                "permissionName": "天刀手游",
                "des": "",
                "createTime": 1595335690,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_1862990",
                "parentPermissionId": "d4bEr0XN",
                "title": "天刀手游",
                "value": "q2lzONb5"
            },
            {
                "id": "DOXawBlN",
                "appId": "avX0nlyo",
                "permissionName": "明日方舟",
                "des": "",
                "createTime": 1595300388,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "GAME_1927464",
                "parentPermissionId": "d4bEr0XN",
                "title": "明日方舟",
                "value": "DOXawBlN"
            },
            {
                "id": "okb2L5GN",
                "appId": "avX0nlyo",
                "permissionName": "光与夜之恋",
                "des": "",
                "createTime": 1595335752,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_2111830",
                "parentPermissionId": "d4bEr0XN",
                "title": "光与夜之恋",
                "value": "okb2L5GN"
            },
            {
                "id": "DOXaDqbN",
                "appId": "avX0nlyo",
                "permissionName": "鸿图之下",
                "des": "",
                "createTime": 1602662337,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "GAME_2162566",
                "parentPermissionId": "d4bEr0XN",
                "title": "鸿图之下",
                "value": "DOXaDqbN"
            },
            {
                "id": "5Qb8xwbE",
                "appId": "avX0nlyo",
                "permissionName": "DNF端游",
                "des": "",
                "createTime": 1601372400,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_22",
                "parentPermissionId": "d4bEr0XN",
                "title": "DNF端游",
                "value": "5Qb8xwbE"
            },
            {
                "id": "zybL50XB",
                "appId": "avX0nlyo",
                "permissionName": "天龙八部手游",
                "des": "",
                "createTime": 1595335811,
                "createUserId": "OXDnevl3",
                "createUserName": "morazhou",
                "permissionKey": "GAME_823409",
                "parentPermissionId": "d4bEr0XN",
                "title": "天龙八部手游",
                "value": "zybL50XB"
            }
        ]
    },
    {
        "id": "z3bypDlr",
        "appId": "avX0nlyo",
        "permissionName": "舆情分析",
        "des": "",
        "createTime": 1594968427,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "INDEX_EVALUATION",
        "parentPermissionId": "",
        "title": "舆情分析",
        "value": "z3bypDlr",
        "children": [
            {
                "id": "V6X6JYXa",
                "appId": "avX0nlyo",
                "permissionName": "内容汇总",
                "des": "",
                "createTime": 1597719674,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "CONTENT_SUMMARY",
                "parentPermissionId": "z3bypDlr",
                "title": "内容汇总",
                "value": "V6X6JYXa",
                "children": [
                    {
                        "id": "5Qb8qwXE",
                        "appId": "avX0nlyo",
                        "permissionName": "详情列表",
                        "des": "",
                        "createTime": 1597719707,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "DETAIL_LIST",
                        "parentPermissionId": "V6X6JYXa",
                        "title": "详情列表",
                        "value": "5Qb8qwXE",
                        "children": [
                            {
                                "id": "RNbQk5G5",
                                "appId": "avX0nlyo",
                                "permissionName": "导出数据",
                                "des": "",
                                "createTime": 1598458079,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "EXPORT_DATA",
                                "parentPermissionId": "5Qb8qwXE",
                                "title": "导出数据",
                                "value": "RNbQk5G5"
                            }
                        ]
                    },
                    {
                        "id": "zwlVxjXL",
                        "appId": "avX0nlyo",
                        "permissionName": "任务列表",
                        "des": "",
                        "createTime": 1597719734,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "TASK_LIST",
                        "parentPermissionId": "V6X6JYXa",
                        "title": "任务列表",
                        "value": "zwlVxjXL"
                    }
                ]
            }
        ]
    },
    {
        "id": "p8X9PYbQ",
        "appId": "avX0nlyo",
        "permissionName": "个人中心",
        "des": "",
        "createTime": 1594969734,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "PERSONAL",
        "parentPermissionId": "",
        "title": "个人中心",
        "value": "p8X9PYbQ",
        "children": [
            {
                "id": "DOXD64l3",
                "appId": "avX0nlyo",
                "permissionName": "项目管理",
                "des": "",
                "createTime": 1594969750,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "PROJECT",
                "parentPermissionId": "p8X9PYbQ",
                "title": "项目管理",
                "value": "DOXD64l3",
                "children": [
                    {
                        "id": "YVbRy6lO",
                        "appId": "avX0nlyo",
                        "permissionName": "查看项目",
                        "des": "",
                        "createTime": 1594969766,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "LIST",
                        "parentPermissionId": "DOXD64l3",
                        "title": "查看项目",
                        "value": "YVbRy6lO"
                    },
                    {
                        "id": "V6X6Lgla",
                        "appId": "avX0nlyo",
                        "permissionName": "项目权限管理",
                        "des": "",
                        "createTime": 1594970161,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "PERMISSION_MANAGE",
                        "parentPermissionId": "DOXD64l3",
                        "title": "项目权限管理",
                        "value": "V6X6Lgla",
                        "children": [
                            {
                                "id": "5Qb8PLbE",
                                "appId": "avX0nlyo",
                                "permissionName": "修改权限",
                                "des": "",
                                "createTime": 1594970193,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "EDIT",
                                "parentPermissionId": "V6X6Lgla",
                                "title": "修改权限",
                                "value": "5Qb8PLbE"
                            },
                            {
                                "id": "zwlVDxXL",
                                "appId": "avX0nlyo",
                                "permissionName": "查看权限",
                                "des": "",
                                "createTime": 1594970206,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "LIST",
                                "parentPermissionId": "V6X6Lgla",
                                "title": "查看权限",
                                "value": "zwlVDxXL"
                            }
                        ]
                    },
                    {
                        "id": "LrXjOvGW",
                        "appId": "avX0nlyo",
                        "permissionName": "角色管理",
                        "des": "",
                        "createTime": 1594969860,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "ROLE",
                        "parentPermissionId": "DOXD64l3",
                        "title": "角色管理",
                        "value": "LrXjOvGW",
                        "children": [
                            {
                                "id": "jolkkwl8",
                                "appId": "avX0nlyo",
                                "permissionName": "添加角色",
                                "des": "",
                                "createTime": 1594969909,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "ADD",
                                "parentPermissionId": "LrXjOvGW",
                                "title": "添加角色",
                                "value": "jolkkwl8"
                            },
                            {
                                "id": "p4GAdaXP",
                                "appId": "avX0nlyo",
                                "permissionName": "删除角色",
                                "des": "",
                                "createTime": 1594969927,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "DELETE",
                                "parentPermissionId": "LrXjOvGW",
                                "title": "删除角色",
                                "value": "p4GAdaXP"
                            },
                            {
                                "id": "2QleZVbj",
                                "appId": "avX0nlyo",
                                "permissionName": "修改角色",
                                "des": "",
                                "createTime": 1594969939,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "EDIT",
                                "parentPermissionId": "LrXjOvGW",
                                "title": "修改角色",
                                "value": "2QleZVbj"
                            },
                            {
                                "id": "jRGwmYbr",
                                "appId": "avX0nlyo",
                                "permissionName": "查看角色",
                                "des": "",
                                "createTime": 1594969953,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "LIST",
                                "parentPermissionId": "LrXjOvGW",
                                "title": "查看角色",
                                "value": "jRGwmYbr"
                            },
                            {
                                "id": "a1lOqwXk",
                                "appId": "avX0nlyo",
                                "permissionName": "角色权限管理",
                                "des": "",
                                "createTime": 1594970085,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "PERMISSION_MANAGE",
                                "parentPermissionId": "LrXjOvGW",
                                "title": "角色权限管理",
                                "value": "a1lOqwXk",
                                "children": [
                                    {
                                        "id": "avX0Rnly",
                                        "appId": "avX0nlyo",
                                        "permissionName": "修改权限",
                                        "des": "",
                                        "createTime": 1594970105,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "EDIT",
                                        "parentPermissionId": "a1lOqwXk",
                                        "title": "修改权限",
                                        "value": "avX0Rnly"
                                    },
                                    {
                                        "id": "zAlmEEl3",
                                        "appId": "avX0nlyo",
                                        "permissionName": "查看权限",
                                        "des": "",
                                        "createTime": 1594970123,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "LIST",
                                        "parentPermissionId": "a1lOqwXk",
                                        "title": "查看权限",
                                        "value": "zAlmEEl3"
                                    }
                                ]
                            },
                            {
                                "id": "1VlokmlK",
                                "appId": "avX0nlyo",
                                "permissionName": "用户管理",
                                "des": "",
                                "createTime": 1594969990,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "USER_MANAGE",
                                "parentPermissionId": "LrXjOvGW",
                                "title": "用户管理",
                                "value": "1VlokmlK",
                                "children": [
                                    {
                                        "id": "pLXP6MlP",
                                        "appId": "avX0nlyo",
                                        "permissionName": "添加用户",
                                        "des": "",
                                        "createTime": 1594970007,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "ADD",
                                        "parentPermissionId": "1VlokmlK",
                                        "title": "添加用户",
                                        "value": "pLXP6MlP"
                                    },
                                    {
                                        "id": "gVbvJpb8",
                                        "appId": "avX0nlyo",
                                        "permissionName": "删除用户",
                                        "des": "",
                                        "createTime": 1594970021,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "DELETE",
                                        "parentPermissionId": "1VlokmlK",
                                        "title": "删除用户",
                                        "value": "gVbvJpb8"
                                    },
                                    {
                                        "id": "vZbqKQG6",
                                        "appId": "avX0nlyo",
                                        "permissionName": "查看用户",
                                        "des": "",
                                        "createTime": 1594970036,
                                        "createUserId": "VG1K9obr",
                                        "createUserName": "luoyeshuli",
                                        "permissionKey": "LIST",
                                        "parentPermissionId": "1VlokmlK",
                                        "title": "查看用户",
                                        "value": "vZbqKQG6"
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "NabNPQGV",
        "appId": "avX0nlyo",
        "permissionName": "天美专区",
        "des": "",
        "createTime": 1594968396,
        "createUserId": "VG1K9obr",
        "createUserName": "luoyeshuli",
        "permissionKey": "TIMI",
        "parentPermissionId": "",
        "title": "天美专区",
        "value": "NabNPQGV",
        "children": [
            {
                "id": "DOXa1qXN",
                "appId": "avX0nlyo",
                "permissionName": "内容汇总",
                "des": "",
                "createTime": 1598457538,
                "createUserId": "VG1K9obr",
                "createUserName": "luoyeshuli",
                "permissionKey": "CONTENT_SUMMARY",
                "parentPermissionId": "NabNPQGV",
                "title": "内容汇总",
                "value": "DOXa1qXN",
                "children": [
                    {
                        "id": "MVG1Bmlr",
                        "appId": "avX0nlyo",
                        "permissionName": "详情列表",
                        "des": "",
                        "createTime": 1598457560,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "DETAIL_LIST",
                        "parentPermissionId": "DOXa1qXN",
                        "title": "详情列表",
                        "value": "MVG1Bmlr",
                        "children": [
                            {
                                "id": "nwlgeoXQ",
                                "appId": "avX0nlyo",
                                "permissionName": "导出数据",
                                "des": "1",
                                "createTime": 1598458089,
                                "createUserId": "VG1K9obr",
                                "createUserName": "luoyeshuli",
                                "permissionKey": "EXPORT_DATA",
                                "parentPermissionId": "MVG1Bmlr",
                                "title": "导出数据",
                                "value": "nwlgeoXQ"
                            }
                        ]
                    },
                    {
                        "id": "J9bJR3b2",
                        "appId": "avX0nlyo",
                        "permissionName": "任务列表",
                        "des": "",
                        "createTime": 1598457579,
                        "createUserId": "VG1K9obr",
                        "createUserName": "luoyeshuli",
                        "permissionKey": "TASK_LIST",
                        "parentPermissionId": "DOXa1qXN",
                        "title": "任务列表",
                        "value": "J9bJR3b2"
                    }
                ]
            }
        ]
    }
];
console.log(treeListToKeyIdMap(data));