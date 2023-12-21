// Lru 算法 least recent used
// 一个缓存算法，有缓存最大值，比如 100 条
// 用双向链表 + map 实现 O(1) 的读写
// 最近加入的跟最近读取过的都会移动到链表头部，如果超长了从尾部淘汰，保证长度不超过 limit
function Node(key, value) {
    return {
        key,
        value,
        pre: null,
        next: null,
    }
}

function Lru(limit = 100) {
    this.limit = limit; // 最多缓存多少条数据
    this.count = 0; // 已经缓存多少条
    this.map = {};
    this.head = new Node(); // 双向链表头尾
    this.tail = new Node();
    this.head.next = this.tail; // 最开始头尾相连 中间没数据
    this.tail.pre = this.head;
}

// 获取数据 如果有则被读取过 移动到链表头
Lru.prototype.get = function(key) {
    if (this.has(key)) {
        const { map } = this;
        const item = map[key];
        this.set(key, item.value);
        this.log('get', key);
        return item;
    } else {
        return null;
    }
}

// 设置数据 如果已存在 删除 不存在则添加到 head 后面
// 添加后如果超出 limit 则从 tail 前删除一条
Lru.prototype.set = function(key, value) {
    if (this.has(key)) {
        this.delete(key);
        this.set(key, value);
    } else {
        let { map, head, tail, limit, count } = this;
        this.count = count + 1;
        const item = new Node(key, value);
        map[key] = item;
        item.next = head.next;
        item.pre = head;
        head.next = item;
        item.next.pre = item;
        if (count + 1 > limit) {
            this.delete(tail.pre.key);
        }
    }
    this.log('set', key);
}

Lru.prototype.has = function(key) {
    const { map }  = this;
    return key in map;
}

// 如果有则删除一条数据
Lru.prototype.delete = function(key) {
    if (this.has(key)) {
        const { map } = this;
        let item = map[key];
        delete map[key];
        this.count = this.count - 1;
        item.pre.next = item.next;
        item.next.pre = item.pre;
        item = null;
        this.log('delete', key);
    } else {
        return true;
    }
}

// 测试用 log 一下看看效果
Lru.prototype.log = function(fn, key) {
    let { head } = this;
    const arr = [];
    while (head.next) {
        arr.push(head.next.key);
        head = head.next;
    }
    console.log('after ' + fn, key, arr);
}

const lru = new Lru(3);
lru.set(1, 1);
lru.set(2, 2);
lru.set(3, 3);
lru.set(4, 4);
lru.get(1);
lru.delete(9);
lru.delete(4);
lru.get(2);
