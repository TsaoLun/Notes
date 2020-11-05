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


//---缓冲器 buffer 与类型化数组 Uint8Array---

let a = [1, 2, 3];
let b = Buffer.from(a);
console.log(b);


let a2 = new Uint8Array([1, 2, 3]);
let b2 = Buffer.from(a2);
console.log(b2);

let b3 = Buffer.alloc(10);
console.log(b3);
