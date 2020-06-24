//////////////
//dart 进阶//
///////////

//面向过程强调代码逻辑过程
//面向对象强调封装与抽象

// //函数:问题简单化，实现代码复用
// //完整main函数
// void main(List<String> argus) {
//   print(argus);
// }

// //自定义函数
// //返回值 函数名（参数组）{函数体}

// main() {
//   var add = addFunc;
//   var res = add(3, 6);
//   print(res);
// }

// num addFunc(num a, num b) {
//   return a + b;
// }

// //省略函数定义中返回值与参数的类型
// main() {
//   var add = addFunc;
//   var res = add(3, 6); //通过变量调用函数
//   var ress = add('x', 'y');
//   print(res);
//   print(ress);
// }

// addFunc(a, b) {
//   return a + b;
// }

// //箭头函数：进一步简化
// main() {
//   var res = addFunc(3, 6);
//   print(res);
// }
// //返回值 函数名（参数）=> 函数体语句
// addFunc(a, b) => a + b;
// //完整的应该是 num addFunc(num a, num b) => a+b;

// //定义可选参数的函数
// //参数名可选，定义时用{}，调用时需参数名:
// //返回值类型 函数名({参数列表}){函数体}
// main() {
//   myFunc(age: 26, name: "超仑");
// }

// myFunc({String name, int age}) {
//   if (name != null) {
//     print("名字是:${name}");
//   }
//   if (age != null) {
//     print("年龄是:${age}");
//   }
// }

// //位置可选参数[]，否则为必选，顺序位置
// main() {
//   myFunc("超仑");
//   myFunc("超仑",12);
// }

// myFunc(String name, [int age]) {
//   if (name != null) {
//     print("名字是:${name}");
//   }
//   if (age != null) {
//     print("年龄是:${age}");
//   }
// }

// //函数可选参数的默认值
// //调用时无传入参数，函数获取null
// main() {
//   myFunc("超仑");
// }

// myFunc(String name, [int age]) {
//   if (name != null) {
//     print("名字是:${name}");
//   }
//   print("年龄是:$age");
// }

// //设置默认值后若没有传入则使用默认值
// //(关键字){}可选参数函数
// main() {
//   myFunc();
// }

// myFunc({String name = "未知", int age = 0}) {
// print("名字是:${name}");
// print("年龄是:${age}");
// }

// //[]位置可选参数函数
// main() {
//   myFunc();
// }

// myFunc([String name = "超仑", int age = 26]) {
//   print("名字是:$name");
//   print("年龄是:${age}");
// }

// //匿名函数，直接赋值给变量并通过变量进行函数调用
// var func=(a, b) {
//   return a + b;
// };

// main() {
//   var res = func(1, 5);
//   //等同于var add(a, b){}//var func = add
//   print(res);
//   (name) {
//     print("hello ${name}");
//   }(123);
// }
// // 上例func变量被赋值给一个函数对象

// //词法作用域，外层无法调用内层
// main() {
//   if (true) {
//     var a = 1;
//   }
//   print(a);
// }

// //外层作用域的变量可以在内层使用
// main() {
//   var a = 1;
//   if (true) {
//     print(a);
//     a = 2;
//   }
//   print(a);
// }

// //内层声明了外层变量名，外层变量名在内层失效
// main() {
//   var a = 1;
//   if (true) {
//     //print(a);会报错
//     var a = 2;
//     print(a);
//   }
// }

// // 闭包，离开作用域依然可以被函数内部使用
// main() {
//   var close = func("超仑");
//   print(close());
// }

// func(name) {
//   return () => "Hello ${name}";
// }
// //func函数及name变量一起被引用

// // 类
// //自定义类
// class Circle{
//   //半径
//   double radius;
//   //圆心 X
//   double centerX;
//   //圆心 Y
//   double centerY;
// }

// //通过类名调用
// main() {
//   var circle = new Circle();
//   circle.radius = 3;
//   circle.centerX = 1;
//   circle.centerY = 1;
// }

// class Circle {
//   //半径
//   double radius;
//   //圆心 X
//   double centerX;
//   //圆心 Y
//   double centerY;
// }

// //构造方法：生成类的实例对象(重中之重)
// class Circle {
//   double radius = 0;
//   double centerX = 0;
//   double centerY = 0;
//   //构造方法,重写参数并传入(否则为null)
//   Circle(double radius, double centerX, double centerY) {
//     this.radius = radius; //this关键字当前实例对象
//     this.centerX = centerX;
//     this.centerY = centerY;
//   }
// }

// //构造方法常用技巧，不用在main函数中var xxx = Circle()后再一个个进行属性赋值
// main() {
//   var circle = new Circle(6, 1, 1); //使用参数构造圆形对象
//   print(circle.radius);
// }

// class Circle {
//   double radius = 0;
//   double centerX = 0;
//   double centerY = 0;
//   //构造方法，使得创建实例时不用多步赋值更方便
//   Circle(this.radius, this.centerX, this.centerY);
// }

// //命名构造方法：一个类，多个构造方法
// //自定义圆类型与单位圆
// main() {
//   var circle = Circle.standard();
//   print(circle.radius);
// }

// class Circle {
//   double radius = 0;
//   double centerX = 0;
//   double centerY = 0;

//   Circle(this.radius, this.centerX, this.centerY);
//   Circle.standard() {
//     this.radius = 1;
//     this.centerX = 0;
//     this.centerY = 0;
//   }
// }

// //实例方法
// //类封装了属性和方法，属性用来存储描述类的数据，方法用来描述类的行为
// class Teacher {
//   String name;
//   int number;
//   String subject;
//   //在方法中通过this关键字获取对象属性信息
//   Teacher(this.name, this.number, this.subject);
//   void sayHi(String toName) {
//     print("Hello ${toName}，我是${this.name}老师！编号为${this.subject}");
//   }

//   void teaching() {
//     print("${this.name}老师正在进行${this.subject}教学");
//   }
// }

// main() {
//   var teacher = Teacher("超仑", 1101, "Dart");
//   teacher.sayHi("小明");
//   teacher.teaching();
// }

// //类中的Setters方法与Getters方法
// //定义属性时会自动生成Setters和Getters方法，可用于定义附加属性
// //属性类型 get 属性名称{return xxxx}  ; set 属性名称(属性类型 临时变量){this.属性=临时变量.方法}
// main() {
//   var teacher = Teacher("超仑", 1101, "Dart");
//   teacher.sayHi("小明");
//   teacher.teaching();
//   print(teacher.description);
//   teacher.description = "Lucy:JavaScript";
//   teacher.teaching();
// }

// class Teacher {
//   String name;
//   int number;
//   String subject;
//   Teacher(this.name, this.number, this.subject);
//   void sayHi(String toName) {
//     print("Hello ${toName},我是${this.name}老师!编号${this.number}");
//   }

//   void teaching() {
//     print("${this.name}老师正在进行${this.subject}教学。");
//   }

//   String get description {
//     return "${this.name}:${this.subject}";
//   }

//   set description(String value) {
//     this.name = (value.split(":") as List)[0];
//     this.subject = (value.split(":") as List)[1];
//   }
// }

// //抽象类与抽象方法
// //抽象类是一个接口，定义了未实现的方法，以模块化开发
// //abstract class xxx{}  class...implements xxx{}
// abstract class TeacherInterface {
//   void teaching();
// }

// class Teacher implements TeacherInterface {
//   String name;
//   int number;
//   String subject;
//   Teacher(this.name, this.number, this.subject);
//   void sayHi(String toName) {
//     print("Hello ${toName}，我是${this.name}老师！编号是${this.number}");
//   }

//   void teaching() {
//     print("${this.name}老师正在进行${this.subject}教学。");
//   }
// }

// //一个类也可以同时实现多个接口，接下来调用两个未实现的方法
// main() {
//   var teacher = Teacher("超仑", 1303, "dart");
//   teacher.sayHi("小蔡");
// }

// abstract class TeacherInterface {
//   void teaching();
// }

// abstract class PeopleInterface {
//   void sayHi(String name);
// }

// class Teacher implements TeacherInterface, PeopleInterface {
//   String name;
//   int number;
//   String subject;
//   Teacher(this.name, this.number, this.subject);
//   void sayHi(String toName) {
//     print("Hello ${toName}，我是${this.name}老师！编号为${this.number}");
//   }

//   void teaching() {
//     print("${this.name}老师正在进行${this.subject}教学。");
//   }
// }
// //不能直接用抽象类构造实例对象，但能通过抽象类接口或继承它的子类来实例化对象

// //类的继承
// //extends关键字进行类的继承
// main() {
//   var teacher = Teacher("超仑", 26);
//   teacher.sayHi();
//   teacher.teaching();
// }

// class People {
//   String name;
//   int age;
//   People(this.name, this.age);
//   void sayHi() {
//     print("Hello");
//   }
// }

// class Teacher extends People {
//   Teacher(name, age) : super(name, age); //构造方法调用父类构造方法
//   void teaching() {
//     print("${this.name}正在教学");
//   }
// }
// //Teacher直接继承People类的姓名年龄属性和sayHi方法，但构造方法是不会直接被继承的。
// //在Teacher类中使用super关键字来调用父类方法，包括构造方法。
// //子类也可以重载父类的方法(@override标注可省略），并在重载时调用对应的父类方法 void 方法{super.方法;重写方法;}

// class People {
//   String name;
//   int age;
//   People(this.name, this.age);
//   void sayHi() {
//     print("Hello");
//   }
// }

// class Teacher extends People {
//   Teacher(name, age) : super(name, age);
//   void teaching() {
//     print("${this.name}正在教学");
//   }

//   @override
//   void sayHi() {
//     super.sayHi();
//     print("我是${this.name}");
//   }
// }

// main() {
//   var teacher = Teacher("超仑", 26);
//   teacher.sayHi();
//   teacher.teaching();
// }

// //运算符重载：为自定义类添加运算符方法
// //返回值类型 operator 运算符(参数列表){函数体}
// main() {
//   var size1 = Size(3, 6);
//   var size2 = Size(2, 2);
//   var size3 = size1 + size2;
//   size3.desc();
// }

// class Size {
//   num width;
//   num height;
//   Size(this.width, this.height);
//   Size operator +(Size size) {
//     return Size(this.width + size.width, this.height + size.height);
//   }

//   desc() {
//     print("width:${this.width},height:${this.height}");
//   }
// }

// //对于非抽象类，当定义了一个未实现的方法时会报错
// main() {
//   var people = People();
// }

// class People {
//   void sayHi();
//   //sayHi must have a method body because 'People' isn't abstract.
// }

// //当一个类没有全部实现接口和抽象类中声明的方法时，可重载noSuchMethod方法
// main() {
//   var teacher = Teacher();
//   teacher.sayHi(); //调用了未实现的方法Symbol("sayHi")
// }

// abstract class People {
//   void sayHi();
// }

// class Teacher extends People {
//   @override
//   void noSuchMethod(Invocation invocation) {
//     print('调用了未实现的方法' + '${invocation.memberName}');
//   }
// }
// //重载noSuchMethod方法可以避免调用未定义方法异常的产生但也会掩盖代码逻辑错误，慎用

// // 枚举是一种特殊类型，用来描述有限个数的数据集合，enum关键字定义
// main() {
//   var teacher = Teacher("超仑", Subject.Dart);
//   teacher.desc();
//   print(teacher.subject.index);
//   print(Subject.values);
// }

// enum Subject {
//   Dart,
//   JavaScript,
//   ObjectiveC,
//   Swift,
//   Python,
// }

// class Teacher {
//   String name;
//   Subject subject;
//   Teacher(this.name, this.subject);
//   desc() {
//     print("${this.name}:${this.subject}");
//   }
// }

// //更多时候，枚举会和多分支语句结合使用
// main() {
//   var teacher = Teacher("超仑", Subject.Dart);
//   switch (teacher.subject) {
//     case Subject.Dart:
//       {
//         print("Dart老师");
//       }
//       break;
//     case Subject.JavaScript:
//       {
//         print("JavaScript老师");
//       }
//       break;
//     case Subject.ObjectiveC:
//       {
//         print("ObjectiveC老师");
//       }
//       break;
//     case Subject.Swift:
//       {
//         print("Swift老师");
//       }
//       break;
//     case Subject.Python:
//       {
//         print("Python老师");
//       }
//       break;
//   }
// }

// enum Subject { Dart, JavaScript, ObjectiveC, Swift, Python }

// class Teacher {
//   String name;
//   Subject subject;
//   Teacher(this.name, this.subject);
// }

// //扩展类的功能 Mixin 特征，extends xxx + with 关键字 + yyy
// //Dart只支持单继承，需要多个类的功能时就需使用到Mixin特性，其允许一个类引入其他类的功能
// main() {
//   var bird = Bird("鸟类");
//   bird.desc();
//   bird.sleep();
// }

// class Animal {
//   String name;
//   Animal(this.name);
// }

// class Descript {
//   desc() {
//     print(this);
//   }
// }

// class Sleep {
//   sleep() {
//     print("sleeping");
//   }
// }

// class Bird extends Animal with Descript, Sleep {
//   Bird(name) : super(name);
// }

// //作为Mixin的类虽然不能够定义构造方法，但可以使用默认构造方法进行实例化
// //若不想使Mixin类实例化，可以使用mixin关键字代替class关键字来定义Mixin类
// mixin Descript {
//   desc() {
//     print(this);
//   }
// }
// mixin Sleep {
//   sleep() {
//     print("sleeping");
//   }
// }
// //使用mixin定义的Mixin类不能被继承也不能进行实例化
// //如果使用mixin关键字进行定义就使用on关键字进行继承
// mixin Sleep on Object {
//   sleep() {
//     print("sleeping");
//   }
// }

// // Mixin的示例
// main() {
//   var obj = Sub();
//   obj.func();
// }

// class Father extends Mixin {
//   func() {
//     print("father func");
//   }
// }

// class Mixin {
//   func() {
//     print("Mixin fucn");
//   }
// }

// mixin One on Mixin {
//   func() {
//     print("one func");
//   }
// }

// mixin Two {
//   func() {
//     print("two func");
//   }
// }

// class Sub extends Father with One, Two {
//   func() {
//     print("sub func");
//   }
// }
// //上面代码使用了继承和多混合，并且子类父类Mixin类都对相同的方法进行了实现
// //可以看出无论是Mixin还是继承，子类中的方法实现优先级最高，Mixin高于父类，多混合中后混合（右侧）优先级高

// //类属性和类方法
// //类本身也是对象，在类中可以定义类属性和类方法，使用类名直接访问和调用
// main() {
//   print(Animal.name); //访问类属性
//   Animal.printName(); //调用类方法
// }

// class Animal {
//   static String name = "动物类";
//   static printName() {
//     print(name);
//   }
// }
// //类属性/方法也被称为类static静态属性/方法，通常用来存放某些固定的且在类的所有实例中共享的属性/方法

//////////////////////////
// 泛型，即通用类型/////////
// 类型更动态、提高代码重用率
////////////////////////

// //创建集合类型对象，尖括号里的类型即泛型
// main() {
//   List<String> list = ["1", "2", "3"];
//   Map<int, String> map = {1: "1", 2: "2", 3: "3"};
// }

// //上例通过泛型指定了存放元素的类型，在自定义类时也可以用到
// main() {
//   var data1 = MyClassInt(1);
//   var data2 = MyClassString("哈");
//   print(data1.data.runtimeType); //int
//   print(data2.data.runtimeType); //String
// }

// class MyClassInt {
//   int data;
//   MyClassInt(this.data);
// }

// class MyClassString {
//   MyClassString(this.data);
//   String data;
// }
// //上例中定义的两个类，行为完全一样只是存储类型不同，可以用泛型

// main() {
//   var data1 = MyClass(1);
//   var data2 = MyClass("哈");
//   print(data1.data.runtimeType); //int
//   print(data2.data.runtimeType); //String
//   print(data1); //Instance of 'MyClass<int>'
//   print(data2); //Instance of 'MyClass<String>'
// }

// class MyClass<T> {
//   T data;
//   MyClass(this.data);
// }
// // T为标识符，用来作为泛型进行占位，实际类型会在运行时确定

// //约束泛型，控制灵活性
// main() {
//   var my = MyClass<Teacher>(new Teacher());
//   my.sayHi();
// }

// class MyClass<T extends People> {
//   T data;
//   MyClass(this.data);
//   sayHi() {
//     this.data.sayHi();
//   }
// }

// class People {
//   sayHi() {
//     print("Hello");
//   }
// }

// class Teacher extends People {
//   sayHi() {
//     print("Hi,I'm teacher");
//   }
// }

// class Student extends People {
//   sayHi() {
//     print("Hi");
//   }
// }

// // 泛型函数
// main() {
//   var my = MyClass<Student>(new Student());
//   var res = getData<Student>(my);
//   res.sayHi();
// }

// class MyClass<T extends People> {
//   T data;
//   MyClass(this.data);
// }

// class People {
//   sayHi() {
//     print("Hello");
//   }
// }

// class Student extends People {
//   sayHi() {
//     print("Hi,I'm student");
//   }
// }

// T getData<T extends People>(MyClass<T> People) {
//   T data = People.data;
//   return data;
// }
// //函数名后面尖括号用来指定泛型的类型，该类型可以在函数的返回值、参数类型甚至参数类型的泛型以及函数体中使用

// //异步编程
// //async与await关键字

// main() {
//   getData();
//   print("继续执行...");
// }

// getData() {
//   print("获取数据");
// }

// //假设getData()需要耗时，且需要该步返回的数据
// main() {
//   getData();
//   print("继续执行...");
// }

// getData() async {
//   var data = await "数据";
//   print(data);
// }
// //getData函数虽然在print语句前面执行，但数据输出却滞后了
// //需要被异步执行的函数需要使用async关键字修饰，其中需滞后处理的语句用await修饰

// //异步与回调 callback
// //在应用程序中，网络请求往往是一个耗时的任务，请求完成后将数据渲染到界面上
// //通常将网络请求封装为一个函数，并在数据请求完成后通过回调函数将数据传递到调用方
// main() {
//   getData((data) => print("获取到数据：${data}"));
//   print("继续执行...");
// }

// getData(callback) async {
//   var data = await "HelloWorld";
//   callback(data);
// }

// //不使用箭头，将复杂函数作为回调函数
// main() {
//   getData(renderUI);
//   print("继续执行...");
// }

// renderUI(data) {
//   print("进行UI渲染");
// }

// getData(callback) async {
//   var data = await "HelloWorld";
//   callback(data);
// }

// // 使用Future对象
// // 调用任意一个async函数都会返回一个Future对象
// // Future是一种抽象，表示对象封装的数据是未来的，即对应前面的异步
// main() {
//   var future = getData();
//   print(future);
//   print("继续执行...");
// }

// getData() async {
//   var data = await "HelloWorld";
// }

// //我们可以通过执行Future对象的then方法来设置回调函数
// main() {
//   var future = getData();
//   future.then((data) {
//     print("获得数据:${data}");
//     renderUI();
//   });
//   print("继续执行...");
// }

// renderUI() {
//   print("进行UI渲染");
// }

// getData() async {
//   var data = await "HelloWorld";
//   return data;
// }

// // 异步函数的返回值会作为Future对象设置回调的参数
// // 因此在编写异步函数getData时开发者不需要再考虑数据的处理问题，直接返回即可
// // 如果有多个异步任务有依赖，使用Future可以非常方便地进行依赖关系处理

// main() {
//   var future = getDataOne();
//   future.then((data){
//     print("获得数据${data}");
//     return getDataTwo();
//   }).then((data){
//     print("获得数据${data}");
//     renderUI();
//   })
//   print("继续执行...");
// }
// renderUI(){
//   print("进行UI渲染");
// }
// getDataOne() async{
//   var data = await "Hello";
//   return data;
// }
// getDataTwo() async{
//   var data = await "World";
//   return data;
// }
// //使用Future对象的链式操作可以非常轻松地处理异步任务间的依赖关系

/////////
//模块//
//////
//新建pri.dart文件

// import "./pri.dart" show other;

// main() {
//   other();
// }

// // 命名冲突
// import "./pri.dart";
// import './pri2.dart' as pri2;

// main() {
//   pri();
//   pri2.pri();
// }

// //可调用类，将类定义为像函数一样可调用
// main() {
//   var cls = MyClass();
//   var res = cls("Hello", "World");
//   print(res);
// }

// class MyClass {
//   call(a, b) {
//     return [a, b];
//   }
// }
