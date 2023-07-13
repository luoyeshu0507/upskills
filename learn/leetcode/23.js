function Heap(list) {
    this.list = [];
    var len = (list || []).length;
    if (len) {
        list.forEach(item => {
            if (item) this.push(item);
        });
    }
}

Heap.prototype.size = function() {
    return this.list.length;
}

Heap.prototype.push = function(item) {
    this.list.push(item);
    this.heapInsert(this.list.length - 1);
}

Heap.prototype.heapInsert = function(index) {
    if (index === 0) return;
    var list = this.list;
    var parent = (index - 1) >> 1;
    while (index !== 0 && list[parent].val > list[index].val) {
        this.swap(parent, index);
        index = parent;
        parent = (index - 1) >> 1;
    }
}

Heap.prototype.heapifiy = function(index) {
    var list = this.list;
    var len = list.length;
    var left = index * 2 + 1;
    while (left < len) {
        var min = list[left + 1] && list[left + 1].val < list[left].val ? left + 1 : left;
        min = list[min].val < list[index].val ? min : index;
        if (min !== index) {
            this.swap(min, index);
            index = min;
            left = index * 2 + 1;
        } else {
            left = len;
        }
    }
}

Heap.prototype.pop = function() {
    var list = this.list;
    var res = list[0];
    var len = list.length;
    list[0] = list[len - 1];
    list.length = len - 1;
    this.heapifiy(0);
    return res;
}

Heap.prototype.swap = function(index1, index2) {
    var list = this.list;
    var temp = list[index1];
    list[index1] = list[index2];
    list[index2] = temp;
}

/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
    if (!lists) return lists;
    var len = lists.length;
    if (len < 2) return lists[0] || null;
    var heap = new Heap(lists);
    var dumy = {
        next: null,
        value: undefined,
    };
    var cur = dumy;
    while (heap.size() !== 0) {
        var next = heap.pop();
        cur.next = next;
        if (next.next) {
            heap.push(next.next);
        }
        cur = next;
    }
    return dumy.next;
};