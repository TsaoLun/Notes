/* //---Node模块---
//使用 VM 模块将脚本装进沙箱

var vm = require('vm');

var sandbox = {
    process: 'this baby',
    require: 'that',
    console: console //上下文添加 console 对象
};

vm.runInNewContext('console.log(process);console.log(require)', sandbox); 

//改进:使用 Script 对象让上下文访问全局 console 对象
var vm = require('vm');

global.count1 = 100;
var count2 = 100;

var txt = 'if (count1 === undefined) var count1 = 0; count1++;' +
    'if (count2 === undefined) var count2 = 0; count2++;' +
    'console.log(count1); console.log(count2);';

var script = new vm.Script(txt);
script.runInThisContext({ filename: 'count.vm' });

console.log(count1);
console.log(count2);

//为 Script 对象指定文件名(此处报错)
var vm = require('vm');

global.count1 = 100;
var count2 = 100;

var txt = 'count1++;' +
    'count2++' +
    'console.log(count1); console.log(count2);';

var script = new vm.Script(txt, { filename: 'count.vm' });

try {
    script.runInThisContext();
} catch (err) {
    console.log(err.stack);
}

//沙箱函数 runInContext()
//需在函数调用之前进行语境化(显式创建上下文)
var vm = require('vm');
var util = require('util');

var sandbox = {
    count1: 1
};

vm.createContext(sandbox);
if (vm.isContext(sandbox)) console.log('contextualized');

vm.runInContext('count1++; counter = true;', sandbox,
    { filename: 'context.vm' });

console.log(util.inspect(sandbox));*/


/* //---创建与发布 Node 模块---

function concatArray(str, array) {
    return array.map(function (element) {
        return str + '' + element;
    });
}

console.log(concatArray('t', [1, 2, 3]));
// 使用 exports 对象将需要暴露的函数导出

var newArray = require('./arrayfunctions.js');

console.log(newArray.concatArray('hello', ['test1', 'test2']));*/

//Async 模块: 控制流能力
var fs = require('fs'),
    async = require('async');

async.waterfall([
    function readData(callback) {
        fs.readFile('./data/data1.txt', 'utf8', function (err, data) {
            callback(err, data);
        });
    },
    function writeData(text, callback) {
        fs.writeFile('./data/data1.txt', text, function (err) {
            callback(err, text);
        });
    }//任务数组
], function (err, result) {
        if (err) {
            console.error(err.message);
        } else {
            console.log(result);
        }//最终回调函数
});
