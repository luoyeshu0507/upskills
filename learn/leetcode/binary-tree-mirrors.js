var tree = {
    val: 1,
    left: {
        val: 2,
        left: {
            val: 3,
            left: null,
            right: null,
        },
        right: {
            val: 4,
            left: null,
            right: null,
        },
    },
    right: {
        val: 5,
        left: {
            val: 6,
            left: null,
            right: null,
        },
        right: {
            val: 7,
            left: null,
            right: null,
        },
    },
};

function loop(tree) {
    if (!tree) return;
    loop(tree.left);
    loop(tree.right);
    console.log(tree.val);
}
loop(tree);
console.log('---');

function mirrors(tree) {
    var cur = tree;
    while (cur) {
        if (cur.left) {
            let mostRight = cur.left;
            while (mostRight.right && mostRight.right !== cur) {
                mostRight = mostRight.right;
            }
            if (mostRight.right) {
                console.log(cur.val);
                cur = cur.right;
                mostRight.right = null;
            } else {
                mostRight.right = cur;
                cur = cur.left;
            }
        } else {
            console.log(cur.val);
            cur = cur.right;
        }
    }
};

mirrors(tree);