// //2.2 变量与常量
// void main() {
//   var number;
//   number = 15;
//   print('小明的年龄是 $number 岁');

//   number = '20';
//   print(number); //变量类型可以变

//   final c = 30;
//   print(c);

//   const d = 50;
//   print(d);

//   num a = 10;
//   a = 30.2;
//   print(a);
//   //num声明的变量加入的是int型且可以改为double，已经int的变量类型则无法修改

// }

// //2.2.5 数值型操作
// void main() {
//   var a = 15;
//   var b = 10;

//   print(a + b);
//   print(a - b);
//   print(a * b);
//   print(a / b);
//   print(a ~/ b);
//   print(a % b);

//   print(a.isEven);
//   print(a.isOdd);
//   print(b.isEven);
//   print(b.isOdd);

//   var c = 1.23;

//   print(c.floor());
//   print(c.round());
//   print(c.floor());
//   print(c.ceil());
//   print(c.toInt());
//   print(c.toDouble());
// }

// // 字符串操作
// void main() {
//   var str1 = 'Hello';
//   var str2 = "Hello2";
//   var str3 = '''你好
//              欢迎光临''';
//   var str4 = r"双11真给力";
//   var str5 = 'a|b|c|d|e|f|g';
//   var str6 = '小学一年级';

//   print(str1.toUpperCase());
//   print(str2.length);
//   print(str3);
//   print(str3.startsWith('你好'));
//   print(str4);
//   print(str5.split('|'));
//   print(str6.replaceAll('小', '大'));

//   double iphone = 11000.0;
//   print('最新的 iphone 价格为 $iphone');
// }

// //List
// void main() {
//   var list = [1, 2, 3];
//   var list2 = new List(); //构造方式
//   var list3 = const [1, 2, 3];
// }

// void main() {
//   var list = ['one', 'two', 'three'];
//   print(list.length);
//   list.add('four');
//   print(list);
//   list.remove('two');
//   print(list);
//   list.insert(1, 'two');
//   print(list);
//   print(list.indexOf('one'));
//   print(list.sublist(2)); //去除前两个元素返回新list
//   list.forEach(print);
//   list.shuffle();
//   print(list);
// }

// // Map
// void main() {
//   Map gameout = const {"name": "Switch", "company": "任天堂"}; //创建不可变Map
//   Map game = new Map(); //构造方式，先声明再赋值
//   game["name"] = "Switch";
//   game['company'] = '任天堂';

//   game['name'] = 'Gameboy'; //修改元素
//   game.remove('name'); //移除元素
//   game.clear(); //清空Map

//   print(gameout);
//   print(game);
// }

//
// void main() {
//   var name1 = 'abc';
//   Object name2 = 'def';
//   dynamic name3 = 'hij'; //编译时会根据值明确类型，但不推荐

//   String a = 'abc'; //明确类型

//   // dynamic obj = '小张';
//   // obj['age'] = 20;// 编译时可以通过但运行报错

//   //为了对类型进行检测，我们使用as和is关键字
//   dynamic obj = <String, int>{};
//   if (obj is Map<String, int>) {
//     obj['age'] = 20;
//   }
//   var map = obj as Map<String, int>;
// }

// // 条件运算符
// // ? ??
// void main() {
//   int a = 20;
//   var val = a < 10 ? 0 : 1;
//   print(val);

//   var c;
//   c ??= 1;
//   print(c);
// }

// // 级联操作符

// void main() {
//   var s = StringBuffer()
//     ..write('a ')
//     ..write('b ')
//     ..write('c ')
//     ..toString();
//   print(s);

//   var sb = StringBuffer();
//   sb
//     ..write('Use a StringBuffer for ')
//     ..writeAll(['efficient', 'string', 'creation'], '')
//     ..write('.');
//   print(sb);

//   var fullString = sb.toString();
//   print(fullString);
// }

//异常捕获
//省略

// //函数Function
// //函数作为参数
// void main() {
//   void printItem(String item) {
//     print(item);
//   }

//   var users = ['小明', '小王', '小张'];
//   users.forEach(printItem);
// }

// void main() {
//   var say = (name) {
//     print(name);
//   };
//   say('过年了');
// }


//////////////////
//极速构建原生应用//
////////////////


//var声明变量后类型固定，可通过dynamic声明动态类型
// main() {
//   dynamic age = 26;
//   age = '26';
// }

// //只声明不赋值会输出null
// main() {
//   var uninit;
//   print(uninit);
// }

// //不可变变量
// main() {
//   final a = 1;
//   final String b = "sss";
//   const c = 2;
//   const int d = 3;
// }

// //创建类对象，字面量或者类的构造器
// main() {
//   int a = 99;
//   int b = 0xA1;
//   print(a);
//   print(b);
// }

// //如果包含小数就定义为double类型
// main() {
//   double c = 3.14;
//   double d = 1.4e2;
//   print(c);
//   print(d);
// }

// //整型数值可以直接赋给浮点型，Dart会自动转换
// main() {
//   double e = 1;
//   print(e);
// }

// //int和double许多常用属性
// main() {
//   var count1 = 1;
//   var count2 = 1.1;
//   //runtimeType属性获取运行时类型
//   print(count1.runtimeType);
//   print(count2.runtimeType);
//   //获取当前数值是否为有限值
//   print(count1.isInfinite);
//   print(count1.isFinite);
//   //获取当前数值是否为NaN，即非数值(比如i)
//   print(count1.isNaN);
//   //获取当前数值是否为负数
//   print(count1.isNegative);
//   //返回当前数值的符号
//   print(count1.sign);
//   //获取当前数值是否为偶数
//   print(count1.isEven);
//   print(count1.isOdd);
// }

// //int和double的常用(操作）方法
// main() {
//   var count1 = -1;
//   var count2 = 1.1;
//   //返回当前数值的绝对值
//   print(count1.abs());
//   //返回不小于当前数值的最小整数
//   print(count2.ceil());
//   //同上，但返回浮点型
//   print(count2.ceilToDouble());
//   //返回指定范围内离当前数值最近的值
//   print(count1.clamp(0, 10));
//   //对比传入参数，大于返回1小于返回-1等于返回0
//   print(count1.compareTo(0));
//   //返回不大于当前数值的最大整数
//   print(count2.floor());
//   //同上但返回浮点型
//   print(count2.floorToDouble());
//   //将当前数值转化为整形再返回
//   print(count2.toInt());
//   //获取当前数值除以参数后的余数
//   print(count1.remainder(5));
//   //获取离当前数最近的整数
//   print(count2.round());
//   //同上但获取浮点型
//   print(count2.roundToDouble());
//   //将当前数值转化为浮点数返回
//   print(count1.toDouble());
//   //将当前数值转化为整型返回
//   print(count2.toInt());
//   //将当前数值转化为字符串返回
//   print(count1.toString());
//   //将小数部分丢弃再返回
//   print(count2.truncate());
//   //将小数部分丢弃返回浮点
//   print(count2.truncateToDouble());
// }

// //int类型独有方法
// main() {
//   var num1 = 35;
//   //获取当前数与传入参数的最大公约数
//   print(num1.gcd(7));
//   //求模逆运算，即整除后的余数？不是...
//   print(num1.modInverse(13));
// }
// //

// //字符串类型
// main() {
//   var name = "超仑";
//   var str = "Hello ${name} $name";
//   var num1 = 3;
//   var num2 = 4;
//   var str1 = "3+4=${num1 + num2}";
//   print(str);
//   print(str1);

//   var str2 = '''第一行
//   第二行
//   第三行''';
//   print(str2);

//   var str3 = """第一行
//   第二行
//   第三行""";
//   print(str3);

//   var str4 = "第一行\n第二行\n第三行\n";
//   print(str4);
// }

// //使用构造方法创建字符串
// main() {
//   var str5 = String.fromCharCode(97);
//   var str6 = String.fromCharCodes([97, 98, 99]);
//   //获取字符串的字符码合集
//   print(str6.codeUnits);
//   //字符串是否为空
//   print("".isEmpty);
//   //是否非空
//   print("".isNotEmpty);
//   //获取当前字符串长度
//   print(str6.length);
//   //获取类型
//   print(str6.runtimeType);
// }

// //字符串操作
// //通过下标获得字符串中某字符的code码
// main() {
//   print("hello".codeUnitAt(1));
//   print("hello".contains("he"));
//   print("hello".endsWith("lo"));
//   print("hello".startsWith("h"));
//   print("hello".indexOf('l'));
//   print("hello".lastIndexOf("l"));
//   //在一侧进行字符串位数补齐
//   print("hello".padLeft(10, "*"));
//   print("hello".padRight(10, "*"));
//   //字符串替换
//   print("hello".replaceAll("o", "p"));
//   //指定范围内的字符串替换，左闭右开
//   print("hello".replaceRange(0, 3, "0001"));
//   //使用指定字符串分割，返回列表
//   print("hello".split('e'));
//   //进行字符串截取，左闭右开
//   print("hello".substring(1, 3));
//   //将字符串全部转为小写/大写
//   print("Hello".toLowerCase());
//   print("hello".toUpperCase());
//   //字符串空格处理
//   print(" hello ".trim());
//   print(" hello ".trimLeft());
//   print(" hello ".trimRight());
//   //字符串拷贝
//   print("hello" * 2);
//   //字符串的集合类型操作
//   print("hello"[0]);
// }

// //布尔类型
// main() {
//   bool a = true;
//   bool b = false;
//   print(a.runtimeType);
//   print(b.toString());
// }

// //列表
// //完整声明
// main() {
//   List<int> list = [1, 2, 3, 4];
//   //列表存放不同类型
//   List<dynamic> listd = [1, 2, 3, 4, "5"];
//   //利用Dart类型推断使用var进行声明
//   var listv = [1, 2, 3, 4, "5"];

//   //不用字面量，通过构造方法创建
//   var list2 = new List(5);
//   print(list2); //[null, null, null, null, null]
//   //创建指定长度列表设置默认值
//   var list3 = List.filled(3, 1);
//   print(list3);
//   //通过另一个集合类型的数据来创建列表
//   var list4 = List.from(list3);
//   print(list4);
//   //使用new关键字是Dart标准对象构造方法，可省略

//   //列表对象常用属性
//   //获取列表第一个元素
//   print([1, 2].first);
//   //获取列表最后一个元素
//   print([1, 2].last);
//   //获取列表的长度
//   print([1, 2].length);
//   //列表操作
//   print(["a", "b", "c", "d"][3]);
//   print([1, 2] + [2, 3]);
//   var data = [1, 2, 3];
//   data[2] = 4;
//   print(data);
// }

// //List类封装方法
// main() {
//   var l = [];
//   //向列表中增加元素
//   l.add(1);
//   //向列表添加一组元素
//   l.addAll([2, 3]);
//   //将列表映射为下标为键的字典，需赋值
//   print(l.asMap());
//   //将列表中某个范围的元素进行覆盖
//   l.fillRange(0, 2, 'x');
//   //获取列表某个下标范围内的元素集合
//   print(l.getRange(0, 3));
//   print(l.indexOf('x'));
//   print(l.lastIndexOf("x"));
//   //insert
//   l.insert(0, 's');
//   //insertAll插入一组元素
//   l.insertAll(1, ['s', 'e', 'x']);
//   //删除列表中指定元素
//   l.remove('s');
//   //删除列表指定位置的元素
//   l.removeAt(2);
//   //删除最后一个元素
//   l.removeLast();
//   //删除指定范围内的元素
//   l.removeRange(2, 3);
//   //将指定范围元素进行替换
//   l.replaceRange(0, 3, [1, 2, 3, 4]);
//   //截取列表中范围内的元素返回新列表
//   print(l.sublist(0, 3));
//   //判断列表中是否包含指定元素
//   print(l.contains(2));
//   //使用指定拼接符将列表拼接为字符串
//   print(l.join("-"));
//   //将列表转化为字符串
//   print(l.toString());
//   //删除列表中所有元素
//   l.clear();
//   print(l);
// }

// //字典类型
// main() {
//   var map1 = {
//     "name": "超仑",
//     "age": 26,
//   };

//   //Map类型确定键值类型即确定
//   Map<String, int> map2 = {"1": 1, "2": 2};
//   //使用构造方法创建字典
//   var map3 = Map();
//   map3["name"] = "超仑";
//   print(map3["name"]);
//   //修改键值
//   map3["name"] = "大象";
//   print(map3["name"]);
//   //不存在的键值将返回null
//   print(map3["age"]);
// }

// //字典常用属性和方法
// main() {
//   //判断Map是否为空/非空
//   print({"1": 1, "2": 2}.isEmpty);
//   print({"1": 1, "2": 2}.isNotEmpty);
//   //获取所有键/值
//   print({"name": "Lucy", "age": 25}.keys);
//   print({"name": "Lucy", "age": 25}.values);
//   //获取键值对的个数
//   print({"name": "Lucy", "age": 25}.length);
//   print({"name": "Aaron"}.runtimeType);

//   var map = {};
//   map.addAll({"name": "Lucy", "age": 28});
//   print(map.containsKey("name"));
//   print(map.containsValue("Lucy"));
//   map.remove("name");
//   print(map.toString());
//   print(map);
//   map.clear();
// }

// //运算符
// main() {
//   var a = 3;
//   a++;
//   print(a);
//   ++a;
//   print(a);

//   var b = 3;
//   var c = 3;
//   print(b++);//++后置会先返回原始值
//   print(++c);//++前置则先计算再返回
// }

// //类型运算符as,is,is!
// //as用作临时转换类型
// main() {
//   var a = 1;
//   var b = "2";
//   print(a is int);
//   print(b is! String);
// }

// //逻辑运算符
// main() {
//   print(!false);
//   print(false || true);
//   print(false && true);
// }

// //位运算符
// //&按位与/或运算，即将两数二进制位分别进行与运算
// main() {
//   var a = 10; //1010
//   var b = 3; //0010
//   print(a & b); //0010即2

//   var c = 10; //1010
//   var d = 4; //0100
//   print(c | d); //1110即14

//   var e = 4;
//   print(~e);
// }

// //条件运算符
// main() {
//   var a = 3;
//   var b = 5;
//   var res = a > b ? "a>b" : "a<=b";
//   print(res);

//   var c = null;
//   print(c == null ? "无作为" : "额外操作 a:$c");
//   //再次简化
//   var cc = 3;
//   print(cc ?? "无作为");

//   //复合运算符
//   var ccc = null;
//   ccc ??= 0; // 与ccc=ccc??0意义完全一样
//   print(ccc);
// }

// //级联运算符
// class People {
//   String name;
//   int age;
// }

// main() {
//   // var p = People();
//   // p.name = "超仑";
//   // p.age = 26;
//   // print("name:${p.name}, age:${p.age}");
//   //用了3行创建对象和完成属性赋值

//   var p = People()
//     ..name = "超仑"
//     ..age = 26;
//   print("name:${p.name},age:${p.age}");
//   //利用级联运算符可以连续执行一组操作
// }

// //点运算符
// class People {
//   String name;
//   int age;
//   void printSelf() {
//     print("name:${name},age:${age}");
//   }
// }

// main() {
//   var p = People()
//     ..name = "超仑"
//     ..age = 26
//     ..printSelf();

//   //访问属性时的安全调用方法?.
//   var c = null;
//   //print(c.a);//NoSuchMethodError
//   print(c?.a);
// }

// //dart流程控制
// //条件分支if
// main() {
//   var res = true;
//   if (res) {
//     print("成功");
//   }
//   print("程序结束");
// }

// //if-else
// main() {
//   var res = false;
//   if (res) {
//     print("成功");
//   } else {
//     print("失败");
//   }
//   print("程序结束");
// }

// //if-else if-else
// main() {
//   var n = 79;
//   if (n < 60) {
//     print("不及格");
//   } else if (n < 85) {
//     print("良好");
//   } else if (n < 100) {
//     print("优秀");
//   } else {
//     print("满分");
//   }
// }

// //循环语句
// main() {
//   var res = (1 + 100) * 100 / 2;
//   print(res.toInt());
// }

// main() {
//   var x = 1;
//   var total = 0;
//   while (x <= 100) {
//     total += x;
//     x++;
//   }
//   print(total);
// }

// //do-while
// main() {
//   var x = 1;
//   var total = 0;
//   do {
//     total += x;
//     x++;
//   } while (x <= 100);
//   print(total);
// }

// // for循环
// // for(变量初始化；判定条件；完成循环后的操作){循环体}
// main() {
//   var total = 0;
//   for (var i = 0; i <= 100; i++) {
//     total += i;
//   }
//   print(total);
// }

// //遍历列表
// var col = [1, 2, 3, 4];
// main() {
//   for (var i = 0; i < col.length; i++) {
//     print(col[i]);
//   }
// }

// //for-in遍历集合
// //for(变量 in 集合){循环体}
// var col = [1, 2, 3, 4];
// main() {
//   for (var number in col) {
//     print(number);
//   }
// }

// //中断语句
// //break
// main() {
//   var i = 1;
//   var res = 0;
//   while (true) {
//     res += i;
//     i++;
//     if (i > 100) {
//       break;
//     }
//   }
//   print(res);
// }

// // continue
// main() {
//   for (var j = 0; j < 3; j++) {
//     if (j == 0) {
//       break;
//     }
//     print(j);
//   }
//   //对比
//   for (var j = 0; j < 3; j++) {
//     if (j == 0) {
//       continue;
//     }
//     print(j);
//   }
// }

// //多分支switch-case(-default)
// //(比if-else更规整)
// main() {
//   var ar = "优秀";
//   switch (ar) {
//     case "不及格":
//       {
//         print("成绩在60分以下");
//       }
//       break;
//     case "及格":
//       {
//         print("成绩在60-75分");
//       }
//       break;
//     case "良好":
//       {
//         print("成绩在75-85分");
//       }
//       break;
//     case "优秀":
//       {
//         print("成绩在85分以上");
//       }
//       break;
//     default:
//       {
//         print("输入异常！");
//       }
//   }
// }

// //异常处理
// main() {
//   var a = -10;
//   if (a < 0) {
//     throw "输入有误";
//   }
//   print("程序完成");
// }

// //try-on
// //try{可能产生的异常}on语句判断的异常类型
// main() {
//   var a = -10;
//   try {
//     if (a < 0) {
//       throw "输入有误";
//     }
//   } on int {
//     print("捕获了整数类型的异常");
//   } on String {
//     print("捕获了字符串类型的异常");
//   }
//   print("程序完成");
// }

// //在on语句中使用catch捕获异常并使用
// main() {
//   var a = 10;
//   try {
//     if (a < 0) {
//       throw "输入有误";
//     }
//   } on int {
//     print("捕获了整数类型的异常");
//   } on String catch (exp) {
//     print("捕获了字符串类型的异常:$exp");
//   }
//   print("程序完成");
// }
// //catch(exp,st)可以添加第二个参数来获取堆栈信息

// 使用rethrow关键字，在捕获异常后再抛出
// main() {
//   var a = -10;
//   try {
//     if (a < 0) {
//       throw "输入异常";
//     }
//   } on int {
//     print("捕获了整数类型异常");
//   } on String catch (exp, st) {
//     print("捕获了字符串类型的异常:$exp\n$st");
//     rethrow; //继续抛出异常
//   }
//   print("程序完成");
// }

//try-catch-finally，finally始终执行(常用于数据清理)
main() {
  var a = -10;
  try {
    if (a < 0) {
      throw "输入有误";
    }
  } catch (exp, st) {
    print("$exp\n$st");
  } finally {
    print("异常处理结束");
  }
  print("程序完成");
}
