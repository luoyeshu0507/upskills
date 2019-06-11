const buf1 = Buffer.alloc(10);
console.log(buf1);
console.log(buf1[0]);

const buf2 = Buffer.alloc(10, 1);
console.log(buf2);
console.log(buf2[0]);

const bufx = new Buffer('0123456789abcdefghijklmnopqrstuvwxyz');
console.log(bufx);
console.log(bufx[0]);

const buf = Buffer.from('hello world', 'ascii');

console.log(buf.toString());
console.log(buf.toString('hex'));
// 打印: 68656c6c6f20776f726c64
console.log(buf.toString('base64'));
// 打印: aGVsbG8gd29ybGQ=

console.log(Buffer.from('fhqwhgads', 'ascii'));
// 打印: <Buffer 66 68 71 77 68 67 61 64 73>
console.log(Buffer.from('fhqwhgads', 'utf16le'));
// 打印: <Buffer 66 00 68 00 71 00 77 00 68 00 67 00 61 00 64 00 73 00>

const bufxx = Buffer.allocUnsafe(10);

console.log(bufxx);

console.log(Buffer.byteLength('123'))
console.log(Buffer.byteLength('李志玮', 'utf8'))