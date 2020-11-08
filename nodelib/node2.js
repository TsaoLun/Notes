/* //---stdin 与 stdout : 监听 readable 事件---

process.stdin.on('readable', function () {
    var input = process.stdin.read();
    if (input != null) {
        process.stdout.write(`stdout: ${input}`);
    }
}); */


/* //---监听退出字符串---

process.stdin.setEncoding('utf8');

process.stdin.on('readable', function () {
    var input = process.stdin.read();

    if (input !== null) {
        let command = input.trim();
        if (command == 'exit')
            process.exit(0);
        
        process.stdout.write(`stdout: ${input}`);
    }
}); */


/* //---缓冲器 buffer 与类型化数组 Uint8Array---

let a = [1, 2, 3];
let b = Buffer.from(a);
console.log(b);


let a2 = new Uint8Array([1, 2, 3]);
let b2 = Buffer.from(a2);
console.log(b2);

let b3 = Buffer.alloc(10);
console.log(b3);

let b4 = Buffer.allocUnsafe(10);
console.log(b4); 

//Buffer => JSON

let buf = Buffer.from('This is my pretty example');
let json = JSON.stringify(buf);

console.log(json);

//JSON => Buffer => String
let buf2 = Buffer.from(JSON.parse(json).data);
console.log(buf2.toString());

//StringDecoder 获取完整 UTF-8 字符序列
let StringDecoder = require('string_decoder').StringDecoder;
let decoder = new StringDecoder('utf8');

let euro = new Buffer.from([0xE2, 0x82]);
let euro2 = new Buffer.from([0xAC]);

console.log(decoder.write(euro));
console.log(decoder.write(euro2));

console.log(euro.toString());
console.log(euro2.toString());

//字符串写入缓冲器
let buf = Buffer.alloc(3);
buf.write('$', 'utf-8');
console.log(buf.toString());
console.log(buf.length);

//缓冲器操作
var buf = new Buffer.alloc(4);

buf.writeUInt8(0x63, 0);
buf.writeUInt8(0x61, 1);
buf[3] = 0x73;
buf[2] = 0x74;

console.log(buf.toString());

//buffer.slice() 创建新缓冲器及修改
var buf1 = new Buffer.from('this is the way we build our buffer');
var lnth = buf1.length;

console.log(buf1.slice().toString());

var buf2 = buf1.slice(19, lnth);
console.log(buf2.toString());

buf2.fill('*', 0, 5);
console.log(buf2.toString());
console.log(buf1.toString());

console.log(buf1.equals(buf2));
//buffer.copy() 从一个缓冲器复制到另一个(略)
//buf1.compare(buf2) 前大于后返回 1 否则 -1*/

//---Node 回调函数和异步事件处理---


