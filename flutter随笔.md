# Flutter 随笔

**Complex UI**

![avatar](images/complexui.png)
<br/>
**计数器 Demo**

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter Demo Home Page'),
      //注意此处title参数要用于构造函数
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

<br/>

# 组件基础

**Widget 与 Element**

Widget 并不是表示最终绘制在设备屏幕上的显示元素，只是UI元素的配置数据。实际上真正代表屏幕上显示元素的类是 Element ，而 Widget 可以对应多个 Element（同一份配置创建多个实例），Element 是通过 Widget 生成的。

```dart
@immutable
abstract class Widget extends DiagnosticableTree {
//继承自诊断树，提供调试信息
  const Widget({ this.key });
  final Key key;
  //Key：key属性主要作用是在下一次build时复用旧widget

  @protected
  Element createElement();
  //构建UI树时调用，生成对应节点的Element对象，属隐式调用

  @override
  String toStringShort() {
    return ......
  }

  ...

  static bool canUpdate(Widget oldWidget,Widget newWidget) {
    return oldWidget.runtimeType == newWidget.runtimeType 
    && oldWidget.key == newWidget.key;
    //静态方法，是否用新widget去更新旧UI树上对应的Element配置
  }
}
```
注意，为 Widget 显式添加 key 可能会使 UI 在重新构建时变得高效，接下来的例子中，构建列表 UI 时会显式指定 Key 。

**StatelessWidget**

继承自 Widget 类，重写了 createElement() 方法：

```dart
@override
StatelessElement createElement()=>StatelessWidget(this);
```
StatelessElement 间接继承自 Element 类，与 StatelessWidget 相对应（作为其配置数据）。

StatelessWidget 用于不需要维护状态的场景，通常在 build 方法中通过嵌套其他 Widget 来构建 UI，过程中会递归的构建其嵌套的 Widget 。

```dart
//举个栗子
class Echo extends StatelessWidget {
  const Echo({
    Key key,
    @required this.text,
    this.backgroundColor:Colors.grey,
  }):super(key:key);
//命名参数中必要参数要添加@required标注，利于静态代码分析器检查
//在继承Widget时，第一个参数通常为Key
//子Widget child,children参数放在参数列表最后
//Widget属性应尽可能被声明为final防止被意外改变

  final String text;
  final Color backgroundColor;

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Container(
        color: backgroundColor,
        child: Text(text),
      )
    );
  }
}
```

调用时通过如下方式：

```dart
Widget build(BuildContext context) {
  return Echo(text:"hello world");
}
```

**Context**

build 方法有一个 context 参数，它是 BuildContext 类的一个实例，表示当前 widget 在 widget 树中的上下文，每个 widget 都会对应一个 context 对象（作为widget树上的节点），context 提供了从当前 widget 开始向上遍历 widget 树以及按照 widget 类型查找父级 widget 的方法。

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(
  title: "Context test",
  home:ContextRoute()));

class ContextRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:Text("Context测试"),
      ),
      body: Container(
        child:Builder(builder:(context){
          //在Widget树中向上查找最近的父级Scaffold widget
          Scaffold scaffold = context.findAncestorWidgetOfExactType<Scaffold>();
          //直接返回AppBar的title，此处实际上是Text("Context测试")
          return (scaffold.appBar as AppBar).title;
        })
      )
    );
  }
}
```
**StatefulWidget**

StatefulWidget 也是继承了 Widget 类并重写了 createElement() 方法，但返回的 Element 对象不同；另外 StatefulWidget 类中添加了一个新的接口 createState() 。

```dart
//定义
abstract class StatefulWidget extends Widget {
  const StatefulWidget({Key key}) : super(key:key);

  @override
  StatefulElement createElement() => StatefulElement(this);
  
  @protected
  State createState();
}
```
StatefulElement 可能会多次调用 createState() 来创建(State)对象。

createState() 用于创建和 StatefulWidget 相关的状态，它在 StatefulWidget 的生命周期中可能会被多次调用。例如当一个 StatefulWidget 同时插入到 widget 树的多个位置时，Flutter framework 就会调用该方法为每个位置生成一个独立的 State 实例，本质上就是一个 StatefulElement 对应一个 State 实例。 

**State**

一个 StatefulWidget 类会对应一个 State 类，State 表示与其对应的 StatefulWidget 要维护的状态，State 中的保存的状态信息可以：
1. 在 widget 构建时可以被同步读取。
2. 在 widget 生命周期中可以被改变。当 State 被改变时可以手动调用 setState() 通知 Flutter framework 状态发生改变，framework 收到消息后会重新调用其 build 方法构建 widget 树，从而达到更新 UI 的目的。

State 中有两个常用属性：
1. widget，它表示与该 State 实例关联的 widget 实例，这种关联并非永久的，因为在应用生命周期中，UI 树上某一个节点的 widget 实例在重新构建时可能会变化.
2. context，StatefulWidget 对应的 BuidContext ，作用同 StatelessWidget 的 BuildContext 。

**State 生命周期**

通过实现一个计数器 widget 来理解生命周期：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(title: "State", home: StateRoute()));

class StateRoute extends StatelessWidget {
  Widget build(BuildContext context) {
    return CounterWidget();
  }
}

class CounterWidget extends StatefulWidget {
  const CounterWidget({Key key, this.initValue: 0});
  //接受initValue整形参数并设置默认值
  final int initValue;

  @override
  _CounterWidgetState createState() => _CounterWidgetState();
  //关联（创建）State对象
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter;

  @override
  void initState() {
    super.initState();
    //初始化状态
    _counter = widget.initValue;
    print("initState");
  }

  @override
  Widget build(BuildContext context) {
    print("build");
    return Scaffold(
        body: Center(
            child: FlatButton(
                child: Text('$_counter'),
                //点击后计数器自增
                onPressed: () => setState(
                      () => ++_counter),
                )));
  }

  @override
  void deactivate() {
    super.deactivate();
    print("deactive");
  }

  @override
  void dispose() {
    super.dispose();
    print("dispose");
  }

  @override
  void reassemble() {
    super.reassemble();
    print("reassemble");
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("didChangeDependencies");
  }
}

```
![avatar](images/statelife.png)

>注意：为什么build方法放在 State 中而不是 StatefulWidget 中？

主要为了提高开发的灵活性，如果将 build() 放在 StatefulWidget 中有两个问题：
+ 状态访问不方便。如果 StatefulWidget 有很多状态，每次改变状态都要调用 build 方法，由于状态是保存在 State 中的，如果 build 方法在 StatefulWidget 中，那么 build 方法和状态分别在两个类中，由于构建用户界面需要依赖 State，所以 build 方法必须加一个 State 参数：

```dart
Widget build(BuildContext context, State state) {
  //state.counter
  ...
}
```

这样只能将 State 所有状态声明为公开才能在 State 类外部访问，这也将导致对状态的修改将变得不可控。但如果将 build() 方法放在 State 中，**构建过程不仅可以直接访问状态**，也无需公开私有状态，非常方便。
+ 继承 StatefulWidget 不便：例如 Flutter 中有一个动画 widget 的基类 AnimateWidget ，继承自 StatefulWidget，AnimatedWidget 中引入了一个抽象方法 build(BuildContext context)，继承自 AnimatedWidget 的动画 widget 都要实现这个 build 方法。如果 StatefulWidget 已经有一个 build 方法，此时 **build 方法需要接收一个 state 对象**，意味着 AnimatedWidget 必须将自己的 State 对象提供给其子类，**因为子类需要在其 build 方法中调用父类的 build 方法。**

```dart
class MyAnimationWidget extends AnimatedWidget {
  @override
  Widget build(BuildContext context,State state) {
    //子类要用到AnimatedWidget的状态对象_animatedWidgetState
    //所以AnimatedWidget必须通过某种方式将其状态对象暴露给子类
    super.build(context, _animatedWidgetState)
  }
}
```

这样不合理，因为 AnimatedWidget 的状态对象是 AnimatedWidget 内部实现细节，不应该暴露给外部。而且如果要将父类状态暴露给子类，那么必须得有一种传递机制，而这套机制无意义因为父子类之间状态的传递和子类本身逻辑是无关的。

所以对于 StatefulWidget，将 build 方法放在 State 中可以给开发带来很大的灵活性。

**在 Widget 树中获取 State 对象**

由于 StatefulWidget 具体逻辑都在其 State 中，很多时候需要获取 StatefulWidget 对应的 State 对象来调用一些方法，比如 Scaffold 组件对应的状态类 ScaffoldState 中就定义了打开 SnackBar 的方法。我们有两种方法在子 widget 树中获取父级 State 。

1. **通过 Context 获取**

context 对象有一个 **findAncestorStateOfType()** 方法，可以从当前节点沿着 widget 树向上查找指定类型的 StatefulWidget 对应的 State 对象。

```dart
Scaffold(
  appBar: AppBar(
    title: Text("子树中获取State对象"),
  ),
  body: Center(child: Builder(builder: (context) {
    return RaisedButton(
      onPressed: () {
        //查找父级最近的Scaffold对应的Scaffold对象
        ScaffoldState _state =
            context.findAncestorStateOfType<ScaffoldState>();
        //调用ScaffoldState的showSnackBar来弹出SnackBar
        _state.showSnackBar(SnackBar(
          content: Text("我是SnackBar"),
        ));
      },
      child: Text("显示SnackBar"),
    );
  })));
```

一般来说，如果 StatefulWidget 状态是私有的我们就不应该直接去获取其 State 对象，在 Flutter 开发中默认的约定：如果 StatefulWidget 的状态是希望暴露出的应当提供一个 of 静态方法来获取其 State 对象，如果不希望暴露则不提供。所以上例的 Scaffold 也提供了一个 of 方法，可以直接调用：

```dart
ScaffoldState _state = Scaffold.of(context);
_state.showSnackBar(
  SnackBar(
    content: Text("我是SnackBar"),
  ),
);
```

2. 通过 Globalkey

分成两步：先给目标 StatefulWidget 添加 GlobalKey ：

```dart
//定义一个 globalKey，由于要保持全局唯一性，我们使用静态变量存储
static GlobalKey<ScaffoldState> _globalKey=GlobalKey();
...
Scaffold(
  key: _globalKey,//设置key
  ...
)
```
如果当前 widget 是 StatefulWidget ，则可以通过 globalkey.currentState 来获取该 widget 对应的 state 对象。

<br/>

**练手：cookbook**

```dart
import 'package:flutter/material.dart';

void main() {
  //runApp接受一个Widget参数
  runApp(MaterialApp(
    title: 'My app',
    home: MyScaffold(),
  ));
}

class MyAppBar extends StatelessWidget {
  MyAppBar({this.title});

  final Widget title; //Widget子类中的字段常定义为final

  @override
  Widget build(BuildContext context) {
    return Container(
      height: 56.0,
      padding: const EdgeInsets.symmetric(horizontal: 8.0),
      //padding是简化版Container只能有一个子组件
      decoration: BoxDecoration(color: Colors.blue[500]),
      child: Row(
        //Row是水平线性布局(linear layout)
        children: <Widget>[
          //列表项的类型是<Widget>
          IconButton(
            icon: Icon(Icons.menu),
            tooltip: 'Navigation menu', //提供解释
            onPressed: null, //null会禁用button
          ),
          Expanded(
            //Expanded组件
            child: title,
          ),
          IconButton(
            icon: Icon(Icons.search),
            tooltip: 'Search',
            onPressed: null,
          )
        ],
      ),
    );
  }
}

class MyScaffold extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //Material是UI呈现的“一张纸”
    return Material(
        //采用垂直线性布局
        child: Column(
      children: <Widget>[
        //能否不被状态栏挡住？
        MyAppBar(
          title: Text(
            'Example title',
            style: Theme.of(context).primaryTextTheme.headline6,
          ),
        ),
        Expanded(
            child: Center(
          child: Text("Hello, world!"),
        ))
      ],
    ));
  }
}
```
![avatar](images/demo1.png)

使用 Material 组件：

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title:'Flutter Tutorial',
    home:TutorialHome(),
  ));
}

class TutorialHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //Scaffold是Material中的主要布局组件
    return Scaffold(
      appBar: AppBar(
        leading: IconButton(
          icon: Icon(Icons.menu),
          tooltip: 'Navigation menu',
          onPressed: null,
        ),
        title: Text('Example title'),
        actions: <Widget>[
          IconButton(
          icon: Icon(Icons.search),
          tooltip: 'Search',
          onPressed: null,
          ),
        ],
      ),
      //body占屏幕的大部分
      body: Center(
        child: Text("Hello, world!"),
      ),
      floatingActionButton: FloatingActionButton(
        tooltip: 'Add',
        child: Icon(Icons.add),
        onPressed: null,
      ),
    );
  }
}
```
![avatar](images/material.png)

此时即 Material，应用栏有阴影，标题自动继承正确样式，还添加了一个浮动操作按钮。

**处理手势**

创建一个简单的按钮来了解检测输入手势的工作原理：

```dart
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap:(){
        print('MyButton was tapped!');
      },
      child: Container(
        height: 36.0,
        padding: const EdgeInsets.all(8.0),
        margin: const EdgeInsets.symmetric(horizontal:8.0),
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(5.0),
          color: Colors.lightGreen[500],
        ),
        child: Center(
          child: Text('Engage'),
        ),
      ),
    );
  }
}
```

GestureDetector 组件检测用户做出的手势，当用户点击 Container 时会调用它的 onTap 回调。IconButton, RaisedButton, FloatingActionButton 都有一个 onPressed 回调可以在用户点击 widget 时被触发。

目前为止我们只使用了无状态 widget，它们从父 widget 接受参数并存储在 final 型成员变量中。当一个 widget 被要求构建时，它使用这些存储的值作为参数来构建 widget。

StatefulWidgets 是特殊的 widget，它知道如何生成 State 对象以保持状态，下面来看一下 RaisedButton：

```dart
class Counter extends StatefulWidget {
  @override
  _CounterState createState() => _CounterState();
}

class _CounterState extends State<Counter> {
  int _counter = 0;

  void _increment() {
    setState(() {
      _counter++;
    });
  }
  
  //在 _CounterState 的 build 方法中使用 _counter
  @override
  Widget build(BuildContext context) {
    return Row(
      children:<Widget>[
        RaisedButton(
          onPressed: _increment,
          child: Text('Increment'),
        ),
        Text('Count: $_counter'),
      ],
    );
  }
}
```

StatefulWidget 和 State 是单独的对象，具有不同的生命周期：Widget 是临时对象，用于构建当前状态下的应用程序，而 State 对象在多次调用 build() 之间保持不变，允许它们记住状态信息。

在更复杂的应用程序中，widget 结构层次的不同部分会有不同的职责，例如一个 widget 呈现复杂用户界面，其目的是收集特定信息，另一个 widget 会使用该信息来更改整体的显示。

在 Flutter 中，子 widget 到父 widget 是通过事件通信的，而父 widget 到子 widget 是通过状态，重定向这一流程的共同父元素是 State 。

```dart
class CounterDisplay extends StatelessWidget {
  CounterDisplay({this.count}); //显示器组件

  final int count; //定义final整形属性

  @override
  Widget build(BuildContext context) {
    return Text('Count: $count'); //调用该属性构建widget
  }
}

class CounterIncrementor extends StatelessWidget {
  CounterIncrementor({this.onPressed}); //计数组件

  final VoidCallback onPressed; //定义回调参数onPressed

  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: onPressed, //调用该属性构建widget
      child: Text('Increment'),
    );
  }
}

class Counter extends StatefulWidget {
  //创建StatefulWidget子类
  @override
  _CounterState createState() => _CounterState();
  //重写createState()来创建状态对象，构建widget时会用到
}

class _CounterState extends State<Counter> {
  //创建State子类
  int _counter = 0;

  void _increment() {
    setState(() { //widget状态改变，状态对象调用setState()重绘widget
      ++_counter;
    });
  }

  @override
  Widget build(BuildContext context) {
    //定义build方法
    return Row(children: <Widget>[
      CounterIncrementor(onPressed: _increment),
      CounterDisplay(count: _counter),
    ]);
  }
}
```

注意我们创建了两个新的无状态 widget 清晰地分离了显示计数器 CounterDisplay 和更改计数器 CounterIncrementor 的逻辑，在前一示例的基础上实现责任分离，将复杂性逻辑封装在各 widget 中的同时保持父项的简单性。

**整合**：一个购物应用程序，显示出售各种产品并维护购物车，先来定义 ShoppingListItem：

```dart
class Product {
  const Product({this.name});
  final String name;
}

typedef void CartChangedCallback(Product product, bool inCart);

class ShoppingListItem extends StatelessWidget {
  ShoppingListItem({Product product,this.inCart,this.onCartChanged}):
  product=product,
  super(key: new ObjectKey(product));
  
  //将构造函数中接收到的值存储在final成员变量中，供build使用
  final Product product;
  final bool inCart;
  final CartChangedCallback onCartChanged;

  Color _getColor(BuildContext context) {
    return inCart ? Colors.black54:Theme.of(context).primaryColor;
  }

  TextStyle _getTextStyle(BuildContext context) {
    if (!inCart) return null;

    return TextStyle(
      color: Colors.black54,
      decoration: TextDecoration.lineThrough,
    );
  }

  @override
  Widget build(BuildContext context) {
    return ListTile(
      onTap: (){
        onCartChanged(product, !inCart);
        //不直接修改inCart而是调用回调函数
      },
      leading: CircleAvatar(
        backgroundColor: _getColor(context),
        child: Text(product.name[0]),
      ),
      title:Text(product.name,style:_getTextStyle(context)),
    );
  }
}
```

接下来是父 widget 存储可变状态示例：

```dart
class ShoppingList extends StatefulWidget {
  ShoppingList({Key key,this.product}) : super(key: key);

  final List<Product> product;

  @override
  _ShoppingListState createState() => _ShoppingListState();
}

class _ShoppingListState extends State<ShoppingList> {
  Set<Product> _shoppingCart = Set<Product>();

  void _handleCartChanged(Product product,bool inCart) {
    setState((){
      if (inCart){
        _shoppingCart.add(product);
      }else {
        _shoppingCart.remove(product);
      }
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Shopping List'),
      ),
      body: ListView(
        padding: EdgeInsets.symmetric(vertical:8.0),
        children: widget.product.map((Product product) {
          return ShoppingListItem(
            product: product,
            inCart: _shoppingCart.contains(product),
            onCartChanged: _handleCartChanged,
          );
        }).toList(),
      ),
    );
  }
}

void main() {
  runApp(MaterialApp(
    title:'Shopping App',
    home: ShoppingList(
      product:<Product>[
        Product(name:'Eggs'),
        Product(name:'Flour'),
        Product(name:'Chocolate chips'),
      ],
    ),
  ));
}
```

**cookbook**

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final appName = 'Custom Themes';

    return MaterialApp(
      title: appName,
      theme: ThemeData(
        brightness: Brightness.dark,
        primaryColor: Colors.cyan[300],
        accentColor: Colors.cyan[600],
      ),
      home: MyHomePage(
        title: appName,
      ),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title; //为什么要定义这个title？
  final x = '                                 ';

  MyHomePage({Key key, @required this.title}) : super(key: key);
  //这个不能理解?是继承吗？

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Column(children: <Widget>[
          Container(
            alignment: Alignment.center,
            margin: EdgeInsets.fromLTRB(100, 220, 100, 15),
            padding: EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: Theme.of(context).accentColor,
              borderRadius: BorderRadius.all(Radius.circular(20))),
            child: Text(
            'Text with \na background color.',
            style: Theme.of(context).textTheme.headline6,
          ),
        ),
        Text(x +'One More thing,\n\n'+ x+'I love dolphin.'),
        ],
        crossAxisAlignment: CrossAxisAlignment.start,
        ),
      floatingActionButton: Theme(
        data: Theme.of(context),
        child: FloatingActionButton(
          onPressed: null,
          child: Icon(Icons.add),
        ),
      ),
    );
  }
}
```

![avatar](/images/ild.png)

**图片载入**

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var title = 'Cyberpunk 2077';

    return MaterialApp(
      title: title,
      theme: ThemeData(
        brightness: Brightness.dark
      ),
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
          backgroundColor: Colors.purple,
        ),
        body: Container(
          child:Column(
            children:<Widget>[
        Container(
        decoration: ShapeDecoration(
          image: DecorationImage(
            image: NetworkImage('https://image.gcores.com/3a216a61-c423-4379-84e4-64c1aaf6da15.jpg?'
          'x-oss-process=image/resize,limit_1,m_lfit,w_1067/quality,q_90'),
          fit: BoxFit.fitWidth),
          shape: RoundedRectangleBorder(borderRadius: BorderRadius.only(bottomRight: Radius.circular(40),)),
        ),
        width: double.maxFinite,
        height: 200,
        alignment: Alignment.bottomCenter,
        ),
        Expanded(
          child: Container(
            color: Colors.grey[600],
            transform: Matrix4.translationValues(-150,0,0),
            height: 100,
          ),
          flex: 1,
        ),
        Expanded(
          child: Container(
            child: Text('\n\t\tNightCity Story',style: TextStyle(color: Colors.purple[300],
            fontWeight: FontWeight.bold,fontSize: 30,),),
          ),
          flex: 6,
        ),
          Expanded(
          child: Container(
            child: Text('\n\n\n\n\n\t\t\t\t\tby Sliver Hand'),
            transform: Matrix4.translationValues(150,-50,0),
            width: 300,
            decoration: BoxDecoration(
              color: Colors.grey[600],
              borderRadius: BorderRadius.all(Radius.circular(20)),
            ),
            ),
          flex: 4,)
        ],
        crossAxisAlignment: CrossAxisAlignment.start,
      ),),
      backgroundColor: Colors.yellow,
      primary: true,)
    );
  }
}
```

![avatar](/images/cyberimage.png)

接下来用占位符实现图片淡入效果：

```dart
import 'package:transparent_image/transparent_image.dart';
//在yaml中添加依赖再flutter package get

Stack( //替代Container，如何实现圆角？
      children: <Widget>[
        Center(child: CircularProgressIndicator(),),
        //一直显示是否影响性能？
        //组件在实际显示上不居中？设置Size又面临适配问题
        Center(
          child: FadeInImage.memoryNetwork(placeholder: kTransparentImage, 
          image: 'https://image.gcores.com/3a216a61-c423-4379-84e4-64c1aaf6da15.jpg?'
      'x-oss-process=image/resize,limit_1,m_lfit,w_1067/quality,q_90'),
        )
      ],
    )
```

设置缓存图片

```dart
import 'package:cached_network_image/cached_network_image.dart';
...
    String url =
        'https://image.gcores.com/3a216a61-c423-4379-84e4-64c1aaf6da15.jpg?'
        'x-oss-process=image/resize,limit_1,m_lfit,w_1067/quality,q_90';
        ...
        Center(
                  child: CachedNetworkImage(
                      placeholder: (context, url) =>
                          CircularProgressIndicator(),
                      //注意与flutter中文有区别,CachedNetworkImage的placeholder有变化
                      //这种方法比在stack中一直搞个圈圈更好
                      imageUrl:url),
                ),
```

**基本 List**

标准 ListView 构造函数适合仅包含少量条目的列表，使用内置 ListTile 来作为列表项：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Basic List';

    return MaterialApp(
        title: title,
        home: Scaffold(
          appBar: AppBar(
            title: Text(title),
          ),
          body: ListView(
            children: <Widget>[
              ListTile(
                leading: Icon(Icons.map),
                title: Text('Map'),
              ),
              ListTile(
                leading: Icon(Icons.photo),
                title: Text('Album'),
              ),
              ListTile(
                leading: Icon(Icons.phone),
                title: Text('Phone'),
              ),
            ],
          ),
        ),
      );
  }
}
```

以上代码如何减少缩进？

```dart
void main() {
  runApp(MaterialApp(title: title, home: BasicListHome()));
}

final title = 'BasicList';

class BasicListHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: ListView(
        children: <Widget>[
          ListTile(
            leading: Icon(Icons.map),
            title: Text('Map'),
          ),
          ListTile(
            leading: Icon(Icons.photo),
            title: Text('Album'),
          ),
          ListTile(
            leading: Icon(Icons.phone),
            title: Text('Phone'),
          ),
        ],
      ),
    );
  }
}
```
![avatar](/images/listview.png)

设置 scrollDirection 创建水平滚动的 List

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(title: title, home: BasicListHome()));
}

final title = 'HorizontalList';

class BasicListHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Container(
          margin: EdgeInsets.symmetric(vertical: 20.0),
          height: 200.0,
          child: ListView(
            scrollDirection: Axis.horizontal,
            children: <Widget>[
              Container(
                width: 160,
                color: Colors.red,
              ),
              Container(
                width: 160,
                color: Colors.blue,
              ),
              Container(
                width: 160,
                color: Colors.green,
              ),
              Container(
                width: 160,
                color: Colors.yellow,
              ),
              Container(
                width: 160,
                color: Colors.orange,
              )
            ],
          ),
        )
      );
  }
}
```

**Demo**

```dart
//小象按摩师
import 'package:flutter/material.dart';
import 'package:url_launcher/url_launcher.dart';

void main() {
  runApp(MaterialApp(title: title, home: BasicListHome()));
}

final title = 'HorizontalList';

class BasicListHome extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        backgroundColor: Colors.grey[800],
        body: Column(
          children: <Widget>[
            Text('\n\t小象按摩室',
                style: TextStyle(fontSize: 40, color: Colors.grey[300])),
            Container(
              margin: EdgeInsets.symmetric(vertical: 20.0),
              height: 150.0,
              child: ListView(
                scrollDirection: Axis.horizontal,
                children: <Widget>[
                  Container(
                    child: CustomButton(
                      btnTitle: '捏脚\t\t\t\t\t',
                      bcolor: Colors.yellow,
                      onPressed: () =>
                          launch("https://www.sohu.com/a/205548701_99960734"),
                    ),
                    margin: EdgeInsets.all(5),
                  ),
                  Container(
                    child: CustomButton(
                      btnTitle: '捏小腿\t\t\t\t\t',
                      bcolor: Colors.blue,
                      onPressed: () =>
                          launch("https://m.sohu.com/a/137934555_734922"),
                    ),
                    margin: EdgeInsets.all(5),
                  ),
                  Container(
                    child: CustomButton(
                      btnTitle: '捏大腿\t\t\t\t\t',
                      bcolor: Colors.green,
                      onPressed: () => launch(
                          "http://www.5201000.com/Memorial/ArticleList/925304041.html"),
                    ),
                    margin: EdgeInsets.all(5),
                  ),
                  Container(
                    child: CustomButton(
                      btnTitle: '敲背\t\t\t\t\t',
                      bcolor: Colors.red,
                      onPressed: () =>
                        launch("https://www.sohu.com/a/31104123_162676"),
                    ),
                    margin: EdgeInsets.all(5),
                  ),
                  Container(
                    child: CustomButton(
                      btnTitle: '脚趾头\t\t\t\t\t',
                      bcolor: Colors.orange,
                      onPressed: () =>
                          launch("https://www.sohu.com/a/140637863_756450"),
                    ),
                    margin: EdgeInsets.all(5),
                  ),
                ],
              ),
            )
          ],
          crossAxisAlignment: CrossAxisAlignment.start,
        )
      );
  }
}

class CustomButton extends StatelessWidget {
  const CustomButton(
      {Key key,
      this.btnTitle = "",
      this.onPressed,
      this.width = 160,
      this.bcolor = Colors.grey,
      this.height = 130})
      : super(key: key);

  final String btnTitle; //按钮标题
  final onPressed; //按钮点击回调
  final double width; //按钮的宽度
  final double height; //按钮的高度
  final bcolor;

  @override
  Widget build(BuildContext context) {
    return Container(
      height: height,
      width: width,
      child: FlatButton(
        child: Text(
          btnTitle,
          style: TextStyle(
            color: Colors.white,
            fontSize: 30,
          ),
        ),
        onPressed: onPressed,
      ),
      decoration: BoxDecoration(
          color: bcolor, borderRadius: BorderRadius.all(Radius.circular(20))),
    );
  }
}

```

**长列表**

使用 ListView.builder 构造函数，它将在列表项滚动到屏幕上时创建该列表项。

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp(
    items: List<String>.generate(10000, (index) => "Item $index"),
    //使用List.generate构造函数生成10000个字符串的列表
  ));
}

class MyApp extends StatelessWidget {
  final List<String> items;

  MyApp({Key key, @required this.items}) : super(key: key);
  //构造函数？ Key key? @required? super的是什么？

  @override
  Widget build(BuildContext context) {
    final title = 'Long list';

    return MaterialApp(
      title: title,
      home: Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: ListView.builder(
            itemCount: items.length,
            itemBuilder: (context, index) {
              return ListTile(
                title: Text('${items[index]}'),
                //每行显示一个字符串
              );
            }),
      ),
    );
  }
}
```

**使用不同类型的子项创建列表**

例如，列表中显示一个标题，后面跟着与该标题相关的几个子项，再后面是另一个标题。步骤依然是：

1. 使用不同类型的数据创建数据源
2. 将数据源转换为 Widget 列表

```dart
//对不起学到这里有点迷...暂时跳过
```

**创建 Grid List**

```dart
import 'package:flutter/material.dart';
//创建一个包含100个widget的list

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: GridListHome(),
    );
  }
}

class GridListHome extends StatelessWidget {
  final title = 'final Grid';
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: GridView.count(
        crossAxisCount: 2,
        children: List.generate(100, (index) {
          return Center(
            child: Text(
              'Item $index',
              style: Theme.of(context).textTheme.headline3,
            ),
          );
        }),
      ),
    );
  }
}
```

<br/>

<br/>

### 状态管理

响应式编程永恒的主题——“状态管理”，即 StatefulWidget 的状态应该被谁管理：

+ 如果状态是用户数据，如复选框的选中状态、滑块位置，则状态最好由父 Widget 管理。
+ 如果状态是有关界面外观效果的，例如颜色、动画，那么状态最好由 Widget 本身管理。
+ 如果某一状态是不同 Widget 共享的则最好由他们共同点父 Widget 管理。

在 Widget 内部管理封装状态会好一些，而父 Widget 管理会比较灵活。如果不确定如何管理优先选择灵活一点的父 Widget 管理。

**Widget 管理自身状态**

_TapboxAState 类：

+ 管理 TapboxA 的状态。
+ 定义 _active：确定盒子的当前颜色的布尔值。
+ 定义 _handleTap() 函数，该函数在点击该盒子时更新 _active，并调用 setState() 更新 UI 。
+ 实现 widget 的所有交互式行为。

```dart
//Widget管理自身状态
class TapboxA extends StatefulWidget {
  TapboxA({Key key}) : super(key:key);

  @override
  _TapboxAState createState() => _TapboxAState();
}

class _TapboxAState extends State<TapboxA> {
  bool _active = false;
  //与State绑定的属性变量，true时为绿，false为灰

  void _handleTap(){
    //定义方法调用setState()以更新State
    setState((){
      _active = !_active;
    });
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      //注意不是_handletap()因为void，这里只要调用方法不需要返回值
      child: Container(
        child: Center(
          child: Text(
            _active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize:32.0, color:Colors.white),
          )
        ),
        width:200.0,
        height:200.0,
        decoration: BoxDecoration(
          color: _active ? Colors.lightGreen[700] : Colors.grey[600],
        )
      )
    );
  }
}
```

**父 Widget 管理子 Widget 状态**

对于父 Widget 来说，管理状态并告诉其子 Widget 何时更新是比较好的方式。下面，TapboxB 通过回调将其状态导出到其父组件，状态由父组件管理，而自身为 StatelessWidget 。

ParentWidgetState 类：

+ 为 TapboxB 管理 _active 状态
+ 实现 _handleTapboxChanged() ，点击盒子时调用
+ 状态改变时，调用 setState() 更新 UI

TapboxB 类：

+ 继承 StatelessWidget 类，因为所有状态都由其父组件处理。
+ 检测到点击时，会通知父组件。

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(title: "State", home: Center(child:ParentWidget())));
//注意是调用父widget

//------------ParentWidget-------------

class ParentWidget extends StatefulWidget {
  @override
  _ParentWidgetState createState() => _ParentWidgetState();
}

class _ParentWidgetState extends State<ParentWidget> {
  bool _active = false;

  void _handleTapboxChanged(bool newValue) {
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      child: TapboxB(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//-------------TapboxB-----------------

class TapboxB extends StatelessWidget {
  TapboxB({Key key, this.active: false, @required this.onChanged})
      : super(key: key);

  final bool active;
  final ValueChanged<bool> onChanged;

  void _handleTap() {
    onChanged(!active);
  }

  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: _handleTap,
      child: Container(
        child: Center(
          child: Text(
            active ? 'Active' : 'Inactive',
            style: TextStyle(fontSize: 32.0, color: Colors.white),
          ),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
            color: active ? Colors.lightGreen[700] : Colors.grey[600]),
      ),
    );
  }
}
```

**混合状态管理**

组件自身管理一些内部状态，而父组件管理一些外部（通用）状态，即混合状态管理。

在 TapboxC 中，手指按下时盒子周围会出现深绿色边框（内部状态），抬起时消失。点击完成后盒子颜色改变。TapboxC 将 _active 状态导出到父组件中，但在内部管理 _highlight 状态。此例有两个状态对象 _ParentWidgetState 和 _TapboxCState 。

_ParentWidgetStateC 类：

+ 管理 _active 状态。
+ 实现 _handleTapboxChanged() ，当盒子被点击时调用。
+ 当点击盒子并且 _active 状态改变时调用 setState() 更新 UI 。

_TapboxCState 对象：

+ 管理 _highlight 状态
+ GestureDetector 监听所有 tap 事件。点下时添加深绿色边框高亮，释放时移除。
+ 当按下、抬起、或取消点击时更新 _highlight 状态，调用 setState() 更新 UI 。
+ 点击时将状态改变传递给父组件。

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(title: "State", home: Center(child:ParentWidgetC())));

//------------ParentWidgetC-----------

class ParentWidgetC extends StatefulWidget {
  @override
  _ParentWidgetCState createState() => _ParentWidgetCState();
}

class _ParentWidgetCState extends State<ParentWidgetC> {
  bool _active = false;
  //定义并赋值State的参数_active

  void _handleTapboxChanged(bool newValue) {
    //定义更新State的方法
    setState(() {
      _active = newValue;
    });
  }

  @override
  Widget build(BuildContext context) {
    //重写build方法，返回子类
    return Container(
      child: TapboxC(
        active: _active,
        onChanged: _handleTapboxChanged,
      ),
    );
  }
}

//------------TapboxC------------------

class TapboxC extends StatefulWidget {
  TapboxC({Key key, this.active: false, @required this.onChanged})
      : super(key: key);
  //构造函数，继承wigket时第一个参数通常为key,required为必要参数

  final bool active;
  final ValueChanged<bool> onChanged;

  @override
  _TapboxCState createState() => _TapboxCState();
}

class _TapboxCState extends State<TapboxC> {
  bool _highlight = false;
  //定义State参数_highlight

  void _handleTapDown(TapDownDetails details) {
    //定义更新State的方法I,但details是什么？
    setState(() {
      _highlight = true;
    });
  }

  void _handleTapUp(TapUpDetails details) {
    //更新State的方法II，疑惑detail参数
    setState(() {
      _highlight = false;
    });
  }

  void _handleTapCancel() {
    //更新State的方法III，不需要参数？
    setState(() {
      _highlight = false;
    });
  }

  void _handleTap() {
    widget.onChanged(!widget.active);
    //更新父类State
  }

  @override
  Widget build(BuildContext context) {
    //按下时添加绿色边框，抬起时取消高亮
    return GestureDetector(
      //处理按钮事件
      onTapDown: _handleTapDown,
      onTapUp: _handleTapUp,
      onTap: _handleTap,
      onTapCancel: _handleTapCancel,
      child: Container(
        child: Center(
          child: Text(widget.active ? 'Active':'Inactive',
            style: TextStyle(fontSize: 32.0,color: Colors.white),),
        ),
        width: 200.0,
        height: 200.0,
        decoration: BoxDecoration(
          color: widget.active ? Colors.lightGreen[700]:Colors.grey[600],
          border: _highlight ? Border.all(color: Colors.teal[700],
          width: 10.0):null,
        ),
      ),
    );
  }
}
```

实现的时候都存在问题：子类无法调用父类的setState()


**单选开关和复选框**

```dart
class SwitchAndCheckBoxTestRoute extends StatefulWidget {
  @override
  _SwitchAndCheckBoxTestRouteState createState() => _SwitchAndCheckBoxTestRouteState();
}

class _SwitchAndCheckBoxTestRouteState extends State<SwitchAndCheckBoxTestRoute> {
  bool _switchSelected = true;//维护单选开关状态
  bool _checkboxSelected = true;//维护复选框状态
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        Switch(
          value: _switchSelected,//当前状态
          onChanged:(value){
            //重新构建页面
            setState((){
              _switchSelected=value;
            });
          }
        ),
        Checkbox(
          value: _checkboxSelected,
          activeColor: Colors.red,//选中的颜色
          onChanged:(value){
            setState((){
              _checkboxSelected=value;
            });
          }
        )
      ]
    );
  }
}
```

通过 Switch 和 Checkbox 看到，它们本身是与状态（是否选中）关联的，但却不是自己来维护状态，而是需要父组件来管理，当用户点击时通过事件通知给父组件。这样是合理的，因为 Switch 和 Checkbox 是否选中本就和用户数据关联，而这些数据也不可能是它们的私有状态。在定义组件时应该思考哪种状态管理方式最合理。

##### cookbook : TextField

```dart
//布局
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(title: "State", home: Homepage()));

class Homepage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar: AppBar(
      title: Text('HomePage'),
    ),
    body:Center(child:Column(
      children: <Widget>[
        TextField(
          decoration: InputDecoration(
            labelText: "用户名",
            hintText: "用户名或邮箱",
            prefixIcon: Icon(Icons.person)
          ),
        ),
        TextField(
          decoration: InputDecoration(
            labelText: "密码",
            hintText: "您的登录密码",
            prefixIcon: Icon(Icons.lock)
          ),
        )
      ],
    )));
  }
}
```

获取输入内容有两种方式：

1. 定义两个变量，用于保存用户名和密码，在 onChanged 触发时各自保存一下输入内容。
2. 通过 controller 直接获取。

监听文本变化也有两种方式：

1. 设置 onChange 回调：

```dart
TextField(
  autofocus: true,
  onChanged:(v){
    print("onChanged: $v")
  }
)
```

2. 通过 controller 监听:

```dart
@override
void initState(){
  //监听输入改变
  _unameController.addListener((){
    print(_unameController.text);
  });
}
```

onChanged 是专门用于监听文本变化的，而 controller 功能多一些，还可以设置默认值、选择文本：

```dart
//创建一个controller
TextEditingController _selectionController = TextEditingController();
//设置默认值，并从第三个字符开始选中
_selectionController.text = "hello world!";
_selectionController.selection = TextSelection(
  baseOffset: 2,
  extentOffset: _selectionController.text.length
);
//设置controller
TextField(
  controller: _selectionController,
)
```

控制焦点：

```dart
class FocusTestRoute extends StatefulWidget {
  @override
  _FocusTestRouteState createState() => _FocusTestRouteState();
}

class _FocusTestRouteState extends State<FocusTestRoute> {
  FocusNode focusNode1 = FocusNode();
  FocusNode focusNode2 = FocusNode();
  FocusScopeNode focusScopeNode;

  @override
  Widget build(BuildContext context) {
    return Padding(
        padding: EdgeInsets.all(16.0),
        child: Column(children: <Widget>[
          TextField(
            autofocus: true,
            focusNode: focusNode1,
            decoration: InputDecoration(labelText: "input1"),
          ),
          TextField(
              focusNode: focusNode2,
              decoration: InputDecoration(labelText: "input2")),
          Builder(builder: (ctx) {
            return Column(children: <Widget>[
              RaisedButton(
                child: Text("移动焦点"),
                onPressed: () {
                  //将焦点从第一个TextField移到第二个
                  //FocusScope.of(context).requestFocus(focusNode2);
                  if (null == focusScopeNode) {
                    focusScopeNode = FocusScope.of(context);
                  }
                  focusScopeNode.requestFocus(focusNode2);
                },
              ),
              RaisedButton(
                  child: Text("隐藏键盘"),
                  onPressed: () {
                    //当所有编辑框都是去焦点时键盘会收起
                    focusNode1.unfocus();
                    focusNode2.unfocus();
                  })
            ]);
          })
        ]));
  }
}
```

##### cookbook : Form

Form 继承自 StatefulWidget 对象，对应的状态类为 FormState 。

Form 的子孙元素为 FormField 类型，是一个抽象类，FormState内部通过它们来完成操作，FormField 几个属性的定义如下：

```dart
const FormField({
  ...
  FormFieldSetter<T> onSaved,//保存回调
  FormFieldValidator<T> validator,//验证回调
  T initialValue,//初始值
  bool autovalidate = false,//是否自动校验
})
```

**FormState**

FormState 为 Form 的 State 类，可以通过 Form.of() 或 GlobalKey 获得，可以通过它来对 Form 的子孙 FormField 进行统一操作。

+ FormState.validate()：此方法会调用 Form 子孙 FormField 的 validate 回调，如果有一个校验失败则返回 false 。
+ FormState.save()：此方法会调用 Form 子孙 FormField 的 save 回调，用于保存表单内容。
+ FormState.reset()：此方法会将 FormField的内容清空。

示例，登录界面提交前校验，用户名不能为空且密码不能小于6位：

```dart
class FormTestRoute extends StatefulWidget {
  @override
  _FormTestRouteState createState() => _FormTestRouteState();
}

class _FormTestRouteState extends State<FormTestRoute> {
  TextEditingController _unameController = TextEditingController();
  TextEditingController _pwdController = TextEditingController();
  GlobalKey _formKey = GlobalKey<FormState>();

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title:Text("Form Test"),
      ),
      body: Padding(
        padding: const EdgeInsets.symmetric(vertical:16.0,horizontal:24.0),
        child:Form(
          key:_formKey,//设置globalKey用于后面获取FormState
          autovalidate:true,//开启自动校验
          child:Column(
            children:<Widget>[
              TextFormField(
                autofocus: true,
                controller: _unameController,
                decoration: InputDecoration(
                  labelText:"用户名",
                  hintText:"用户名或邮箱",
                  icon: Icon(Icons.person)
                ),
                //校验用户名
                validator:(v){
                  return v.trim().length > 0?
                  null:"用户名不为空";
                }
              ),
              TextFormField(
                controller: _pwdController,
                decoration: InputDecoration(
                  labelText:"密码",
                  hintText:"您的登录密码",
                  icon:Icon(Icons.lock)
                ),
                obscureText: true,
                //校验密码
                validator:(v){
                  return v.trim().length>5?null:"密码不能小于6位";
                }
              ),
              //登录按钮
              Padding(
                padding:const EdgeInsets.only(top:28.0),
                child:Row(
                  children:<Widget>[
                    Expanded(
                      child:RaisedButton(
                        padding:EdgeInsets.all(15.0),
                        child:Text("登录"),
                        color:Theme.of(context).primaryColor,
                        textColor:Colors.white,
                        onPressed:(){
                        //不能Form.of(context)因为context不对
                        //通过_formKey.currentState获取FormState后调用validate()校验
                          if((_formKey.currentState as FormState).validate()){
                            //验证通过
                          }
                        }
                      )
                    )
                  ]
                )
              )
            ]
          )
        )
      )
    );
  }
}
```

注意，登录按钮的 onPressed 方法不能通过 Form.of(context) 获取，因为此处的 context 为 FormTestRoute 的 context，而Form.of(context) 是根据指定 context 向根去查找，而 FormState 在 FormTestRoute 的子树中。正确的做法是通过 Builder 来构建登录按钮，Builder 会将 widget 节点的 context 作为回调参数。

```dart
Expanded(
  //通过Builder来获取RaisedButton所在widget树的真正context(Element)
  child:Builder(builder:(context){
    return RaisedButton(
      ...
      onPressed:(){
        //由于本widget也是Form的子代widget，所以通过以下方式获取FormState
        if(Form.of(context).validate()){
          //验证通过提交数据
        }
      }
    );
  })
)
```

其实 context 是操作 Widget 所对应的 Element 的一个接口，由于 Widget 树对应的 Element 都是不同的，所有 context 也不同，在使用时需要注意 of(context) 的 context 是否正确。

<br/>

### 路由管理

路由 Route 在移动开发中通常指页面 Page，Route 在 Android 中页面对应的是 Activity ，在 iOS 中则对应 ViewController 。路由管理通过路由栈的 push 和 pop 进行操作。接下来基于“计数器”修改：

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter Demo Home Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            new Text(
              'You have pushed the button this many times:',
            ),
            new Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            //添加一个按钮
            FlatButton(
              child: Text("open new route"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.push(context, MaterialPageRoute(builder: (context) {
                  return NewRoute();
                }));
              },
            )
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}

//创建新界面
class NewRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("New route"),
        ),
        body: Center(
          child: Text("This is new route"),
        ));
  }
}
```

**MaterialPageRoute**：继承自 PageRoute 类，定义了路由构建，还可以针对不同平台实现不同的页面切换动画。通过 builder 参数进行回调，返回新路由实例。

**Navigator**：路由管理组件，提供了打开和退出路由页的方法，通过一个栈来管理活动路由集合，通常当前页面作为栈顶路由。两种最常用的方法：
1. Future push(BuildContext,Route route)
将给定的路由入栈，即打开新页面，返回值是一个 Future 对象，用以接收新路由出栈时返回数据。
2. bool pop(BuildContext,[result])
将栈顶路由出栈，result 为页面关闭时返回上一个页面的数据。

```dart
//Navigator类中第一个参数为context的静态方法都对应一个Navigator的实例方法（以下两种等价）
Navigator.push(BuildContext context, Route route)
Navigator.of(context).push(Route route)
```

**路由传值**

很多时候路由跳转时需要带一些参数，比如商品id，将地址返回到订单页等等。我们创建一个 TipRoute 路由，接受一个提示文本参数负责将传入它的文本显示在页面上，另外 TipRoute 中添加一个“返回”按钮以在返回上一个路由的同时带上返回参数：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: RouterTestRoute(),
    );
  }
}

class RouterTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('首页')),
        body: Center(
          child: RaisedButton(
            onPressed: () async {
              //打开TipRoute并等待结果
              var result = await Navigator.push(context,
                  MaterialPageRoute(builder: (context) {
                return TipRoute(
                  text: "提示字符串",
                );
              }));
              print('路由返回值:$result');
            },
            child: Text("打开提示页"),
          ),
        ));
  }
}

class TipRoute extends StatelessWidget {
  TipRoute({
    Key key,
    @required this.text,
  }) : super(key: key);
  final String text;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("提示"),
        ),
        body: Padding(
            padding: EdgeInsets.all(18),
            child: Center(
              child: Column(
                children: <Widget>[
                  Text(text),
                  RaisedButton(
                    onPressed: () => Navigator.pop(context, "我是返回值"),
                    child: Text("返回"),
                  )
                ],
              ),
            )));
  }
}
```

点击返回按钮会有返回值而返回则没有。

```
I/flutter ( 5913): 路由返回值:null
I/flutter ( 5913): 路由返回值:我是返回值
```

**路由表 routing table**

要使用命名路由，必须先注册一个路由表，将名字与路由组件对应，定义如下：

```dart
Map<String, WidgetBuilder> routes;
```

它是一个 Map , Key 为路由的名字（字符串），value 是个 builder 回调函数，用于生成相应的路由 widget 。我们在通过路由名字打开新路由时，应用会根据路由名字在路由表中查找到对应的 WidgetBuilder 回调函数，然后调用该回调函数生成路由 widget 并返回。在对应的 onPressed 中只需调用 `Navigator.pushNamed(context, "widget_name");`

```dart
import 'package:flutter/material.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      initialRoute: "/",
      //名为"/"的路由作为应用的home(initialRoute即home)
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      routes: {
        //路由表，首页路由
        "/": (context) => MyHomePage(title: 'Flutter Demo'), 
        "new_page": (context) => NewRoute()
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Text(
              'You have pushed the button this many times:',
            ),
            Text(
              '$_counter',
              style: Theme.of(context).textTheme.headline4,
            ),
            FlatButton(
                child: Text("open new route"),
                textColor: Colors.blue,
                onPressed: () {
                  Navigator.pushNamed(context, "new_page");
                  //使用Navigator的pushNamed方法通过路由名打开路由页
                })
          ],
        ),
      ),
      floatingActionButton: new FloatingActionButton(
        onPressed: _incrementCounter,
        tooltip: 'Increment',
        child: new Icon(Icons.add),
      ), 
    );
  }
}

class NewRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("New route"),
        ),
        body: Center(
          child: Text("This is new route"),
        ));
  }
}
```

**命名路由参数传递**

先注册路由：

```dart
routes:{
  "new_page":(context) => EchoRoute(),
},
```
在路由页通过 RouteSetting 对象获取路由参数：

```dart
class EchoRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    var args = ModalRoute.of(context).settings.arguments
  }
}
```
打开路由时传递参数

```dart
Navigator.of(context).pushNamed("new_page",arguments:"hi");
//Navigator.pushNamed(context,"new_page",arguments:"hi");
```
**适配**

将上面的 TipRoute 路由页注册到路由表中，以通过路由名打开它，由于 TipRoute 接受一个 text 参数，在不改变 TipRoute 源码的前提下进行适配：

```dart
MaterialApp(
  ...
  routes:(context){
    return TipRoute(text: ModalRoute.of(context).settings.arguments);
  }
)
```

**路由生成钩子**

实现打开每个路由页前判断用户的登录状态，需要用到 MaterilaApp 的 onGenerateRoute 属性，当调用 Navigator.pushNamed() 打开命名路由时，如果指定路由名在路由表中已注册，则会调用路由表中的 builder 函数来生成路由组件；如果没注册则调用 onGenerate 生成路由：

```dart
MaterilaApp(
  ...
  onGenerateRoute:(RouteSettings settings){
    return MaterialPageRoute(builder:(context){
      String routeName = settings.name;
    });
  }
);
//onGenerateRoute只会对命名路由生效
```

最好统一使用命名路由的管理方式，这将会带来如下好处：
1. 语义化更明确。
2. 代码更好维护（匿名路由必须在调用 Navigator.push 的地方创建新路由页）
3. 可以通过 onGenerateRoute 做全局路由跳转的前置处理逻辑。

<br/>

##### cookbook : Navigator

1. 创建两个页面。
2. 调用 Navigator.push 导航到第二个页面。
3. 调用 Navigator.pop 返回第一个页面。

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Navigation Basics',
    home: FirstScreen(),
  ));
}

class FirstScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('First Screen'),
      ),
      body: Center(
        child: RaisedButton(
          child: Text('Launch'),
          onPressed: () {
            Navigator.push(context,
                MaterialPageRoute(builder: (context) => SecondScreen()));
          },
        ),
      ),
    );
  }
}

class SecondScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Second Screen'),
      ),
      body: Center(
        child: RaisedButton(
          onPressed: () {
            Navigator.pop(context);
          },
          child: Text('Go back!'),
        ),
      ),
    );
  }
}
```

**给新页面传值**

将点击的条目信息传递给新页面，这里我们创建一个 Todo List ，当点击一个 todo 时将导航至待办事项信息的新页面：

1. 定义一个 Todo 类
2. 显示 Todo List
3. 创建一个显示待办事项详细的页面
4. 导航并将数据传递到详情页

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

class Todo {
  final String title;
  final String description;

  Todo(this.title, this.description);
}

void main() {
  runApp(MaterialApp(
    title: 'Passing Data',
    home: TodoScreen(
        todolist: List.generate(
            20,
            (index) => Todo(
                  'Todo $index',
                  'A description of what needs to be done for Todo $index',
                ))),
  ));
}

class TodoScreen extends StatelessWidget {
  final List<Todo> todolist;

  TodoScreen({Key key, @required this.todolist}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(title: Text('TodoList')),
        body: ListView.builder(
          itemCount: todolist.length,
          itemBuilder: (context, index) {
            return ListTile(
                title: Text(todolist[index].title),
                onTap: () {
                  Navigator.push(
                      context,
                      MaterialPageRoute(
                          builder: (context) =>
                              DetailScreen(todo: todolist[index])));
                });
          },
        ));
  }
}

class DetailScreen extends StatelessWidget {
  final Todo todo;

  DetailScreen({Key key, @required this.todo}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text('${todo.title}'),
        ),
        body: Padding(
          padding: EdgeInsets.all(16.0),
          child: Text('${todo.description}'),
        ));
  }
}
```

**从新页面返回数据**

使用 Navigator.pop :

1. 定义主页
2. 添加打开选择页面的按钮
3. 在选择页面上显示两个按钮
4. 点击一个按钮时，关闭选择的页面
5. 弹出 snackbar 以显示用户的选择

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title: 'Returning Data',
    home: HomeScreen(),
  ));
}

class HomeScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Returning Data Demo'),
      ),
      body: Center(
        child: SelectionButton(),
      ),
    );
  }
}

class SelectionButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RaisedButton(
      onPressed: () {
        _navigateAndDisplaySelection(context);
      },
      child: Text('Pick an option.'),
    );
  }

  _navigateAndDisplaySelection(BuildContext context) async {
    final result = await Navigator.push(
        context, MaterialPageRoute(builder: (context) => SelectionScreen()));
    Scaffold.of(context).showSnackBar(SnackBar(
      content: Text('$result'),
    ));
  }
}

class SelectionScreen extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Pick an option'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                onPressed: () {
                  Navigator.pop(context, 'Yep!');
                },
                child: Text('Yep!'),
              ),
            ),
            Padding(
              padding: const EdgeInsets.all(8.0),
              child: RaisedButton(
                onPressed: () {
                  Navigator.pop(context, 'Nope!');
                },
                child: Text('Nope!'),
              ),
            )
          ],
        ),
      ),
    );
  }
}
```

<br/>

### 异常捕获

Java 和 OC 都是多线程模型的编程语言，任意一个线程触发异常且未被捕获时会导致整个进程退出。而 Dart 是单线程模型，以消息循环机制来运行，其中包含两个任务队列，一个是“微任务队列” microtask queue，另一个是“事件队列” event queue ，微任务队列的执行优先级高于事件队列。

![avatar](images/queue.png)

入口 main() 函数执行后，消息循环机制启动。首先会按照先进先出顺序逐个执行微任务队列中的任务，再执行事件任务，完毕后程序退出。在事件任务执行过程中也可以插入新的微任务和事件任务。

在 Dart 中所有外部事件任务都在事件任务队列中，如IO、计时器、点击、以及绘制事件，而微任务通常来自 Dart 内部且非常之少。如果微任务太多，执行时间总和就越久，事件任务延迟也就越久（对 GUI 应用来说就会变卡）。可以通过 Future.microtask() 方法向微任务队列插入一个任务。

在事件循环中当某个任务发生异常并没有被捕获时，程序并不会退出，当前任务的后续代码不会被执行，不会影响其他任务的执行。

当布局发生越界或不合规错误时，Flutter 会弹出一个 ErrorWidget ，通过 FlutterError.reportError 方法上报，其中调用了 onError 回调，即 FlutterError 的一个静态属性，默认处理方法 dumpErrorToConsole 。我们也可以自己上报异常，只需提供一个自定义的错误处理回调即可：

```dart
void main(){
  FlutterError.onError = (FlutterErrorDetails details){
    reportError(details);
  };
  ...
}
```

Flutter 中还有一些没有为我们捕获的异常，如调用空对象方法异常、Future 中的异常。在 Dart 中异常分为同步异常和异步异常，同步可以通过 trt/catch 捕获，而异步异常比较麻烦，需通过 runZoned() 方法，给执行对象指定一个 Zone (可用于捕获日志输出、Timer创建、微任务调度、未处理异常等等)。

如果开发者提供了 onError 回调或指定了错误回调处理，就可以捕获 Flutter 中全部的错误：

```dart
void collecting(String line) {
  ...//收集日志
}

void reportErrorAndlog(FlutterErrorDetails details) {
  ...//上报错误和日志逻辑
}

FlutterErrorDetails makeDetails(Object obj, StackTrace stack) {
  ...//构建错误信息
}

void main() {
  FlutterError.onError=(FlutterErrorDetails details) {
    reportErrorAndLog(details);
  };
  runZoned(
    ()=>runApp(MyApp()),
    zoneSpecification: ZoneSpecification(
      print:(Zone self,ZoneDelegate parent,Zone zone,String line) {
        collectLog(line);
      },
    ),
    onError:(Object obj,StackTrace) {
      var details = makeDetails(obj, stack);
      reportErrorAndLog(details);
    }
  );
}
```

<br/>

# 组件分类

### 布局类组件

Flutter 没有对 Widget 进行分类，这里进行功能区分以方便讨论与记忆。不同的布局类组件对子组件排版(layout)方式不同，Element 是最终的绘制树，是通过 Widget.createElement() 创建的，Widget 其实就是 Element 的配置数据。

布局类 Widget 可以分为三类，没有子节点的 LeafRenderObjectWidget (比如 Image)，包含一个子节点的SingleChildRenderObjectWidget （比如 ConstrainedBox)，包含多个子节点的 MultiChildRenderObjectWidget (一般都有 children 参数如 Row, Column 和 Stack)。

> 注意，Flutter中的很多Widget是直接继承自StatelessWidget或StatefulWidget，然后在`build()`方法中构建真正的RenderObjectWidget，如Text，它其实是继承自StatelessWidget，然后在`build()`方法中通过RichText来构建其子树，而RichText才是继承自MultiChildRenderObjectWidget。所以为了方便叙述，我们也可以直接说Text属于MultiChildRenderObjectWidget（其它widget也可以这么描述），这才是本质。读到这里我们也会发现，其实**StatelessWidget和StatefulWidget就是两个用于组合Widget的基类，它们本身并不关联最终的渲染对象（RenderObjectWidget）**。

RenderObjectWidget 的类中定义了创建、更新 RenderObject 的方法，子类必须实现他们。对于布局类组件来说，布局算法都是通过对应的 RenderObject 对象来实现的，比如 Stack (层叠布局) 对应的 RenderObject 就是 RenderStack ，而层叠布局的实现在 RenderStack 中。

<br/>

##### Row & Column

线性布局组件，继承自弹性布局组件 Flex ，有两个定义对齐方式的枚举类`MainAxisAlignment`和`CrossAxisAlignment`，分别代表主轴对齐和纵轴对齐。

```dart
//Row定义如下
Row({
  ...  
  TextDirection textDirection,
  //布局顺序:ltr,rtl
  MainAxisSize mainAxisSize = MainAxisSize.max,
  //主轴(水平)占用空间，默认最大无视子组件宽度
  MainAxisAlignment mainAxisAlignment = MainAxisAlignment.start,
  //子组件对其方式:start,end,center
  VerticalDirection verticalDirection = VerticalDirection.down,
  //纵轴对齐方向，垂直
  CrossAxisAlignment crossAxisAlignment = CrossAxisAlignment.center,
  //子组件纵方向对齐方式
  List<Widget> children = const <Widget>[],
})
```

示例：

```dart
Column(
  crossAxisAlignment: CrossAxisAlignment.start,
  //水平方向左对齐，排除Column默认居中对齐的干扰
  children:<Widget>[
    Row(
      mainAxisAlignment: MainAxisAlignment.center,
      children:<Widget>[
        Text("hello world"),
        Text("I am Jack "),
      ],
    ),
    Row(
      mainAxisSize:MainAxisSize.min,
      //此时Row宽度为两个Text宽度和，下面的对齐无意义
      mainAxisAlignment:MainAxisAlignment.center,
      children:<Widget>[
        Text("hello world"),
        Text("I am Jack "),
      ],
    ),
    Row(
      mainAxisAlignment:MainAxisAlignment.end,
      textDirection:TextDirection.rtl,
      //子组件从右往左，此时end表示左对齐
      children:<Widget>[
        Text("hello world"),
        Text("I am Jack"),
      ],
    ),
    Row(
      crossAxisAlignment:CrossAxisAlignment.start,
      verticalDirection:VerticalDirection.up,
      //纵轴即垂直方向低向高，此时start即底对齐
      children:<Widget>[
        Text("hello world",style:TextStyle(fontSize:30.0),),
        //字体不一样高度不一样
        Text("I am back "),
      ],
    ),
  ],
),
```

Column 与 Row 类似只是变换了主轴的方向。

```dart
Column(
  //没有指定mainAxisSize默认max即垂直方向为屏幕高度
  crossAxisAlignment: CrossAxisAlignment.center,
  //子项会在Column的水平方向居中对齐，Column宽度由最宽子项决定
  children:<Widget>[
    Text("hi"),
    Text("world"),
  ],
)
```

实际上，Row 和 Column 都只会在主轴方向占用尽可能大的空间，而纵轴的长度则取决于它们最大子元素的长度。如果想让本例中的文本控件在整个手机屏幕中间对齐，有两种方法：

+ 通过 ConstrainedBox 或 SizedBox 将 Column 的宽度指定为屏幕宽度。

```dart
ConstrainedBox(
  constraints: BoxConstraints(minWidth: double.infinity),
  //将minWidth设为double.infinity使宽度占用尽可能多空间
  child:Column(
    crossAxisAlignment: CrossAxisAlignment.center,
    children:<Widget>[
      Text("hi"),
      Text("World"),
    ],
  ),
);
```
+ 使用 Center Widget，后面会介绍。

> 特殊情况：如果 Row 里面嵌套 Row 或者 Column 里嵌套 Column，那么外层组件会占用尽可能大的空间而内层组件占用空间为实际（需要）大小。

<br/>

##### Flex & Expanded

弹性布局允许子组件按照一定比例来分配父容器空间，类似 Android 中的 FlexboxLayout 等。Flutter 中的弹性布局主要通过 Flex 和 Expanded 来配合实现。

```dart
Flex({
  ...
  @required this.direction,
  //弹性布局方向，Row默认水平，Column为垂直
  List<Widget> children = const <Widget>[],
})
```
Flex 继承自 MultiChildRenderObjectWidget，对应的 RenderObject 为 RenderFlex ，RenderFlex 中实现了其布局算法。

```dart
//Expanded
const Expanded({
  int flex = 1,
  @required Widget child,
})
```

flex 参数为弹性参数，如果为0或null，则 child 无弹性，不会被扩伸占用的空间。如果大于0，所有的 Expanded 按照其 flex 的比例来分割主轴的全部空闲空间。

```dart
class FlexLayoutTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(children: <Widget>[
      //Flex的两个子widget按1：2来占据水平空间
      Flex(
        direction: Axis.horizontal,
        children: <Widget>[
          Expanded(
            flex: 1,
            child: Container(
              height: 30.0,
              color: Colors.red,
            ),
          ),
          Expanded(
            flex: 2,
            child: Container(
              height: 30.0,
              color: Colors.green,
            ),
          ),
        ],
      ),
      Padding(
          padding: const EdgeInsets.only(top: 20.0),
          child: SizedBox(
              height: 100.0,
              //Flex的三个子widget垂直方向按2:1:1占用100像素的空间
              child: Flex(direction: Axis.vertical, children: <Widget>[
                Expanded(
                  flex: 2,
                  child: Container(
                    height: 30.0,
                    color: Colors.red,
                  ),
                ),
                Spacer(
                  flex: 1
                ),
                Expanded(
                    flex: 1,
                    child: Container(
                      height: 30.0,
                      color: Colors.green,
                    ))
              ])))
    ]);
  }
}
```

其中 Spacer 的功能是占用指定比例的空间，实际上它只是 Expanded 的一个包装类，Spacer 的源码如下：

```dart
class Spacer extends StatelessWidget {
  const Spacer({Key key,this.flex = 1})
    :assert(flex != null),
     assert(flex > 0),
     super(key: key);

     @override
     Widget build(BuildContext context) {
       return Expanded(
         flex: flex,
         child:const SizedBox.shrink(),
       );
     }
}
```

<br/>

##### Wrap & Flow

在使用 Row 和 Column 时如果子 widget 超出屏幕则会报溢出错误，我们把屏幕显示范围会自动折行的布局称为流式布局，Flutter 中通过 Wrap 和 Flow 来支持该布局

```dart
//Wrap定义
Wrap({
  ...
  this.direction = Axis.horizontal,
  this.alignment = WrapAlignment.start,
  this.spacing = 0.0,
  //主轴方向子widget间距
  this.runAlignment = WrapAlignment.start,
  //纵轴方向对齐方式
  this.runSpacing = 0.0,
  //纵轴方向间距
  this.crossAxisAlignment = WrapCrossAlignment.start,
  this.textDirection,
  this.verticalDirection = VerticalDirection.down,
  List<Widget> children = const <Widget>[],
})
```
示例：

```dart
class WrapTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing:8.0,//主轴（水平）方向间距
      runSpacing:4.0,//纵轴（垂直）方向间距
      alignment: WrapAlignment.start,//沿主轴左侧
      children: <Widget>[
        Chip(
          avatar: CircleAvatar(backgroundColor: Colors.blue,child: Text('A'),),
          label: Text('Hamilton'),
        ),
        Chip(
          avatar: CircleAvatar(backgroundColor: Colors.blue,child: Text('M'),),
          label: Text('Lafayette'),
        ),
        Chip(
          avatar: CircleAvatar(backgroundColor: Colors.blue,child: Text('H'),),
          label: Text('Mulligan'),
        ),
        Chip(
          avatar: CircleAvatar(backgroundColor: Colors.blue,child: Text('J'),),
          label: Text('Laurens'),
        ),
      ],
    );
  }
}
```

Flow 平时很少会使用，一般优先考虑 Wrap。Flow 主要用于需要自定义布局策略或性能要求较高的场景。

优点：

+ 性能好，Flow 是一个对子组件尺寸以及位置调整非常高效的控件，Flow 用转换矩阵在对子组件进行位置调整的时候进行了优化。在 Flow 定位过后，如果子组件的尺寸或位置发生了变化，在 FlowDelegate 中的 paintChildren() 方法中调用 context.paintChild 进行重绘，这个过程中使用了转换矩阵并没有实际调整组件位置。

+ 灵活，由于需要自己实现 FlowDelegate 的 paintChildren() 方法，所以需要自己计算每一个组件的位置。

缺点即比较复杂，不能自适应子组件大小，必须通过父容器大小或实现 TestFlowDelegate 的 getSize 返回固定大小。

示例：

```dart
Flow(
  delegate:TestFlowDelegat(margin:EdgeInsets.all(10.0)),
  children:<Widget>[
    Container(width:80, height:80, color:Colors.red),
    Container(width:80, height:80, color:Colors.green),
    Container(width:80, height:80, color:Colors.blue),
    Container(width:80, height:80, color:Colors.yellow),
    Container(width:80, height:80, color:Colors.brown),
    Container(width:80, height:80, color:Colors.purple),
  ],
)

class TestFlowDelegate extends FlowDelegate {
  EdgeInsets margin = EdgeInsets.zero;
  TestFlowDelegate({this.margin});
  @override
  void paintChildren(FlowPaintingContext context) {
    var x = margin.left;
    var y = margin.top;
    //计算每一个子widget的位置
    for(int i=0;i<context.childCount;i++){
      var w = context.getChildSize(i).width + x + margin.right;
      if (w < context.size.width) {
        context.paintChild(i,transform:Matrix4.translationValues(x,y,0.0));
        x += context.getChildSize(i).width + margin.left + magin.right;
      }
    }
  }

  @override
  getSize(BoxConstraints constraints){
    //指定Flow的大小
    return Size(double.infinity,200.0);
  }

  @override
  bool shouldRepaint(FlowDelegate oldDelegate){
    return oldDelegate != this;
  }
}
```

##### Stack & Positioned

层叠布局和 Android 中的 Frame 布局是相似的，子组件可以根据父容器四个角度位置来确定自身的位置。绝对定位允许子组件堆叠起来（按代码中的声明顺序），Flutter 中使用 Stack 和 Positioned 这两个组件来配合实现绝对定位。Stack 允许子组件堆叠，而 Positioned 用于根据 Stack 四个角来确定子组件的位置。

**Stack**

```dart
Stack({
  this.alignment = AlignmentDirectional.topStart,
  //对齐没有Positioned(left,right,top,bottom)的子组件
  this.textDirection,//ltr,rtl
  this.fit = StackFit.loose,
  //没有定位的子组件如何适应Stack大小，loose子组件大小expand则扩至Stack
  this.overflow = Overflow.clip,
  //用决定如何显示超出Stack空间的子组件，clip为隐藏，visible则不会
  List<Widget> children = const <Widget>[],
})
```
**Positioned**

```dart
const Positioned({
  Key key,
  this.left,
  this.top,
  this.right,
  this.bottom,
  //离Stack上下左右四边的距离
  this.width,
  this.height,
  //元素的宽度和高度
  @required Widget child,
})
```
当指定 left 和 width 时，right 就能自动得出，同时指定三个属性则会报错。

示例：

```dart
class MyHomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(appBar:AppBar(title:Text('Stack')),
    body:ConstrainedBox(
        constraints: BoxConstraints.expand(),
        child: Stack(alignment: Alignment.center, //指定未完全定位的widget对齐方式
            children: <Widget>[
              Container(
                child:
                    Text("Hello world", style: TextStyle(color: Colors.white)),
                color: Colors.red,
              ),
              Positioned(
                left: 18.0,
                child: Text("I am Jack"),
              ),
              Positioned(
                top: 18.0,
                child: Text("Your friend"),
              )
            ])));
  }
}
```

未定位的方向会按 Stack alignment 指定的方式对齐。我们给上例 Stack 指定一个 fit 值，将三个子文本顺序调整一下：

```dart
Stack(
  alignment:Alignment.center,
  fit:StackFit.expand,//未定位widget占满整个空间
  children:<Widget>[
    Positioned(
      left:18.0,
      child:Text("I am Jack"),
    ),
    Container(
      child:Text("Hello world",style:TextStyle(color:Colors.white)),
      color:Colors.red,
    ),
    Positioned(
      top:18.0,
      child:Text("Your friend"),
    )
  ]
)
```
此时第二个子文本组件没有定位，fit 属性会对其作用占满 Stack ，由于 Stack 子元素是堆叠的，所以第一个子组件被第二个遮住了，而第三个在最上面可以正常显示。

##### Align & Center

通过 Stack 和 Positioned ，可以指定一个或多个子元素相对于父元素各边的精准偏移，并且可以重叠。但如果我们只想简单地调整一个子元素在父元素中的位置，使用 Align 组件会更简单。 Align 组件可以调整子组件的位置，根据子组件宽高来确定自身宽高，定义如下：

```dart
Align({
  Key key,
  this.alignment = Alignment center,
  //需要一个 AlignmentGeometry 类型的值，表示子组件在父组件中的起始位置
  this.widthFactor,
  this.heightFactor,
  //组件本身宽高的缩放因子，若为null会占用尽可能多的空间
  Widget child,
})
```
来看一个简单的例子：

```dart
Container(
  height:120.0,
  width:120.0,
  color:Colors.blue[50],
  child:Align(
    alignment:Alignment.topRight,
    child:FlutterLogo(
      size:60,
    )
  )
)
```

上例我们显式地指定了 Container 的宽高为120，直接指定 widthFactor 和 heightFactor 为 2 也可以达到一样的效果(因为 FlutterLogo 的宽高为60)。

```dart
Align(
  widthFactor:2,
  heightFactor:2,
  alignment:Alignment.topRight,
  child:FlutterLogo(
    size:60,
  )
)
//背景色不同
```

这里的 Alignment.topRight 定义 `static const Alignment topRight = Alignment(1.0, -1.0)` ，即 Alignment 的一个实例，下面来看一下 Alignment :

```dart
Alignment(this.x, this.y)
```

Alignment 继承自 AlignmentGeometry，表示矩形内的一个点，原点为矩阵中心，x、y 两个属性分别表示在水平和垂直方向的偏移，(-1.0,-1.0)为左侧顶点，(1.0,1.0)为右侧底部。**FractionalOffset** 继承自 Alignment ，但坐标原点不同为矩形左侧顶点，FractionOffset(0.2,0.6) 即在矩形内距左侧 0.2，上侧 0.6 。 `Align(alignment:FractionalOffset(0.2,0.6))` 这种的坐标系统更精确且与布局系统一致，在开发中应该优先使用。

Align 与 Stack 的不同：都能用于指定子元素相对父元素的偏移，但 Stack 参考系是矩阵四条边而 Align 先通过 alignment 参数确定坐标原点。Stack 可以有多个元素并且子元素可以堆叠，而 Align 只能有一个子元素不存在堆叠。

**Center**

```dart
//Center定义
class Center extends Align {
  const Center({Key key, double widthFactor, double heightFactor, Widget child})
    : super(key: key, widthFactor:widthFactor, heightFactor: heightFactor, child: child);
}
```
Center 继承自 Align 只是少了一个 alignment 参数（由于 Align 构造函数中 alignment 值为 center)，可以认为 Center 组件为对齐方式确定了的 Align 。上面说过 widthFactor 和 heightFactor 为 null 时组件宽高会尽可能多占用空间，Center 也是这样。

<br/>

### 容器类组件

容器类 Widget 和 布局类 Widget 都作用于其子 Widget ，不同的是：
+ 布局类通常接收一个 Widget 数组，直接或间接继承自 MultiChildRenderObjectWidget；而容器类 Widget 一般只需要接收一个子 Widget (直接间接继承或包含 SingleChildRenderObjectWidget)
+ 布局类 Widget 是按照一定排列方式来对其子 Widget 进行排列，而容器类 Widget 一般只包含子 Widget 并对其添加一些修饰、变换或限制。 

##### Padding

Padding 可以给子节点添加填充，效果和边距类似，来看一下定义：

```dart
Padding({
  ...
  EdgeInsetsGeometry padding,
  //抽象类，开发中一般使用其子类EdgeInsets，定义了填充方法
  Widget child,
})
```
**EdgeInsets**

+ fromLTRB(double left, double top, double right, double bottom)
+ all(double value)：所有方向以相同数值填充
+ only({left, top, right, bottom})：设置某个/多个方向的填充
+ symmetric({vertical, horizontal})：设置对称方向的填充

示例：

```dart
class PaddingTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Padding(
      //上下左右各添加16像素空白
      padding:EdgeInsets.all(16.0),
      child:Column(
        //显式指定对齐方式为左对齐，排除对齐干扰
        crossAxisAlignment: CrossAxisAlignment.start,
        children:<Widget>[
          Padding(
            //上下各添加8像素补白
            padding: const EdgeInsets.symmetric(vertical:8.0),
            child:Text("I am Jack"),
          ),
          Padding(
            //分别指定四个方向的补白
            padding: const EdgeInsets.fromLTRB(20.0,.0,20.0,20.0),
            child:Text("Your friend")
          )
        ]
      )
    );
  }
}
```

##### ConstrainedBox

限制类容器 ConstrainedBox 用于对子组件添加额外约束，比如想让子组件最小高度为 80 像素，可以使用 `const BoxConstraints(minHeight: 80.0)` 作为子组件的约束。

示例：

```dart
//先定义一个redBox，不指定宽度和高度
Widget redBox = DecoratedBox(
  decoration: BoxDecoration(color:Colors.red)
);
```

实现一个最小高度为50，宽度尽可能大的红色容器：

```dart
ConstrainedBox(
  constraints: BoxConstraints(
    minWidth: double.infinity,//宽度尽可能大
    minHeight:50.0
  ),
  child:Container(
    height:5.0,
    child:redBox
  ),
)
```
虽然我们将 Container 高度设为 5 ，但最终却是 50 像素，正是因为 ConstrainedBox 中 constraints 参数 BoxConstraints 设置的最小高度限制生效了。

BoxConstraints 用于设置限制条件，定义如下：

```dart
const BoxConstraints({
  this.minWidth = 0.0,
  this.maxWidth = double.infinity,
  this.minHeight = 0.0,
  this.maxHeight = double.infinity
})
```

**SizedBox** 用于给子元素指定固定的宽高，如：

```dart
SizedBox(
  width: 80.0,
  height: 80.0,
  child: redBox
)
```
实际上 SizedBox 只是 ConstrainedBox 的一个定制，以上代码等价于：

```dart
ConstrainedBox(
  constraints : BoxConstraints.tightFor(width:80.0,height:80),
  child:redBox,
)
```
其中 `BoxConstraints.tightFor(width:80.0,height:80.0)` 等价于 `BoxConstraints(minHeight:80.0, maxHeight:80.0, minWidth:80.0, maxWidth:80.0)` ，而实际上 ConstrainedBox 和 SizedBox 都是通过 RenderConstrainedBox 渲染的，两者的 createRenderObject() 方法都是返回一个 RenderConstrainedBox 对象：

```dart
@override
RenderConstrainedBox createRenderObject(BuildContext context){
  return RenderConstrainedBox(
    additionalConstraints:...,
  );
}
```
**多重限制**：如果某个组件有多个父级 ConstrainedBox 限制，那么最终会是哪个生效？

```dart
ConstrainedBox(
  constraints:BoxConstraints(minWidth:60.0,minHeight:60.0),
  child:ConstrainedBox(constraints:BoxConstraints(minWidth:90.0,minHeight:20.0),
    child:redBox)
)
```
显示宽 90 高 60 的方块，即对于 minWidth 和 minHeight 来说，取父子相应数值较大的。

##### DecoratedBox

装饰容器 DecoratedBox 可以在其子组件绘制前后绘制一些装饰 Decoration ，如背景、边框、渐变等等。DecoratedBox 定义如下：

```dart
const DecoratedBox({
  Decoration decoration,
  //代表将要绘制的装饰，类型为 Decoration 抽象类，定义了接口 createBoxPainter() 用于绘制装饰
  DecorationPosition position = DecorationPosition.background,
  //决定了在哪里绘制 Decoration，接受 DecorationPosition 枚举类型
  //background 在子组件后绘制背景，foreground 在子组件上绘制前景
  Widget child
})
```

我们会直接使用 **BoxDecoration** 类，它是 Decoration 的子类，实现了常用的装饰元素的绘制：

```dart
BoxDecoration({
  Color color,//颜色
  DecorationImage image,//图片
  BoxBorder border,//边框
  BorderRadiusGeometry borderRadius,//圆角
  List<BoxShadow> boxShadow,//阴影，可以指定多个
  Gradient gradient,//渐变
  BlendMode backgroundBlendMode,//背景混合模式
  BoxShape shape = BoxShape.rectangle,//形状
})
```

实现一个背景色渐变的按钮：

```dart
DecoratedBox(
  decoration: BoxDecoration(
    gradient:LinearGradient(colors:[Colors.red, Colors.orange[700]]),//背景渐变
    borderRadius: BorderRadius.circular(15.0),//15像素圆角
    boxShadow: [
      BoxShadow(
        color:Colors.black54,
        offset:Offset(2.0,2.0),
        blurRadius:4.0,
      )
    ]
  ),
  child: Padding(padding: EdgeInsets.symmetric(horizontal:80, vertical:18.0),
    child:Text("Login",style:TextStyle(color:Colors.white),),
  )
)
```
该按钮还不能响应点击事件，后面将会尝试实现标准 GradientButton 。

##### Transform

Transform 可以在其子组件绘制时对其应用一些矩阵变换来实现一些特效。Matrix4 是一个 4D 矩阵，通过它可以实现各种矩阵操作，来看下例：

```dart
Container(
  color: Colors.black,
  child: Transform(
    alignment:Alignment.topRight,//相对于坐标原点的对齐方式
    transform:Matrix4.skewY(0.3),//沿y轴倾斜0.3弧度
    child:Container(
      padding:const EdgeInsets.all(8.0),
      color:Colors.deepOrange,
      child:const Text('Apartment for rent!'),
    )
  )
)
```
矩阵变化时发生在绘制时。无需重新布局和构建，所有性能很好。接下来看一下平移吗，Transform.translate 接收一个 offset 参数，可以在绘制时沿 x , y 轴对子组件平移指定的距离。

```dart
DecorationBox(
  decoration:BoxDecoration(color:Colors.red),
  //默认原点为左上角，左移20像素，向上平移5像素
  child:Transform.translate(
    offset:Offset(-20.0,-5.0),
    child:Text("Hello world"),
  ),
)
```

**旋转**

Transform.rotate 可以对子组件进行旋转变换，如：

```dart
DecoratedBox(
  decoration:BoxDecoration(color:Colors.red),
  child:Transform.rotate(
    //旋转90度
    angle:math.pi/2,
    child:Text("Hello world"),
  ),
)
```

**缩放**

Transform.scale 可以对子组件进行缩小或放大，如:

```dart
DecoratedBox(
  decoration:BoxDecoration(color:Colors.red),
  child:Transform.scale(
    scale:1.5,//放大到1.5倍
    child:Text("Hello world")
  )
)
```

**注意**：Transform 的变换是应用在绘制阶段，而不是应用在布局(layout)阶段，所以无论子组件应用何种变化，其占用空间的大小和屏幕上的位置都是固定不变的，因为这些是在布局阶段就确定的：

```dart
Row(
  mainAxisAlignment:MainAxisAlignment.center,
  children:<Widget>[
    DecoratedBox(
      decoration:BoxDecoration(color:Colors.red),
      child:Transform.scale(scale:1.5,
        child:Text("Hello world"))
    ),
  Text("你好",style:TextStyle(color:Colors.green, fontSize:18.0))],
)
```
第一个 Text 在绘制时放大后，其占用的空间依然为红色部分，所以与紧挨着红框的第二个 Text 部分的重合。在某些场景下，在 UI 需要变化时可以通过矩阵变化来达到视觉上的 UI 改变，而不是去重新触发 build 流程，这样会节省 layout 开销，性能较好。之前的 Flow 组件就是通过矩阵变换来更新 UI 的，Flutter 动画中也大量使用了 Transform 以提升性能。

**RotatedBox**

RotatedBox 与 Transform.rotate 功能相似，都可以对子组件旋转变换，但变换是在 layout 阶段，会影响子组件的位置和大小。

```dart
Row(
  mainAxisAlignment:MainAxisAlignment.center,
  children:<Widget>[
    DecoratedBox(
      decoration:BoxDecoration(color:Colors.red),
      //将Transform.rotate换成RotatedBox
      child:RotatedBox(
        quarterTurns:1,
        child:Text("Hello world")
      ),
    ),
    Text("你好",style:TextStyle(color:Colors.green,fontSize:18.0))
  ]
)
```
与 Transform.rotate 不同，因为 decoration 会作用到子组件所占用的空间上，所以红色部分也一起旋转了。

##### Container

Container 组合类容器，本身不对应具体的 RenderObject，是 DecoratedBox, ConstrainedBox, Transform, Padding, Align 等组件组合的一个多功能容器，只需通过一个 Container 组件可以实现同时需要装饰、变换、限制的场景。

```dart
Container({
  this.alignment,
  this.padding,//容器内补白，属于decoration装饰范围
  Color color,//背景色
  Decoration decoration,//背景装饰
  Decoration foregroundDecoration,//前景装饰
  double width,//容器宽度
  double height,//容器高度
  BoxConstraints constraints,//容器大小的限制条件
  this.margin,//容器外补白，不属于decoration装饰范围
  this.transform,//变换
  this.child,
})
```
容器大小可以通过 width, height 属性来指定，也可以通过 constraints 来指定；如果它们同时存在，width 和 height 优先，实际上 Container 内部会根据 width 和 height 生成一个 constraints 。color 和 decoration 是互斥的，同时设置将报错，指定 color 时 Container 内会自动创建一个 decoration 。

```dart
Container(
  margin:EdgeInsets.only(top:50.0,left:120.0),//容器外填充
  constraints:BoxConstraints.tightFor(width:200.0,height:150.0),//卡片大小
  decoration:BoxDecoration(//背景装饰
    gradient:RadialGradient(//背景径向渐变
      colors:[Colors.red,Colors.orange],
      center:Alignment.topLeft,
      radius:.98
      ),
      boxShadow:[//卡片阴影
        BoxShadow(
          color:Colors.black54,
          offset:Offset(2.0,2.0),
          blurRadius:4.0
        )]),
  transform:Matrix4.rotationZ(.2),//卡片倾斜变换
  alignment:Alignment.center,//卡片内文字居中
  child:Text(//卡片文字
    "5.20",style:TextStyle(color:Colors.white,fontSize:40.0),)
)
```
研究一下 Container 组件 margin 和 padding 属性的区别：

```dart
...
Container(
  margin:EdgeInsets.all(20.0),//容器外补白，margin页边距
  color:Colors.orange,
  child:Text("Hello world!")
),
Container(
  padding:EdgeInsets.all(20.0),//容器内补白，padding外层护垫
  color:Colors.orange,
  child:Text("Hello world"),
),
...
```

##### Scaffold

Material 组件库提供了丰富多彩的组件，可以查看 flutter 源码中 examples 目录下的 Flutter Gallery ，相关示例非常全面。

**Scaffold**：一个完整的路由页包含导航栏、抽屉菜单(Drawer)以及底部 Tab 导航菜单，Flutter Material 组件库提供了一些现成组件，Scaffold 是一个路由页的骨架，使用它可以很容易拼装出一个完整的页面。

示例：实现一个页面，包含导航栏及右侧分享按钮，抽屉菜单，底部导航，右下角悬浮动作按钮：

```dart
class ScaffoldRoute extends StatefulWidget {
  @override
  _ScaffoldRouteState createState() => _ScaffoldRouteState();
}

class _ScaffoldRouteState extends State<ScaffoldRoute> {
  int _selectedIndex = 1;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar:AppBar(//导航栏
        title:Text("App Name"),
        actions:<Widget>[//导航栏右侧菜单
          IconButton(icon:Icon(Icons.share),onPressed:(){}),]),
        drawer:MyDrawer(),//抽屉
        bottomNavigationBar:BottomNavigationBar(//底部导航
          items:<BottomNavigationBarItem>[
            BottomNavigationBarItem(icon:Icon(Icons.home),title:Text('Home')),
            BottomNavigationBarItem(icon:Icon(Icons.business),title:Text('Business')),
            BottomNavigationBarItem(icon:Icon(Icons.school),title:Text('School')),
          ],
          currentIndex:_selectedIndex,
          fixedColor:Colors.blue,
          onTap:_onItemTapped,
          ),
          floatingActionButton:FloatingActionButton(//悬浮按钮
            child:Icon(Icons.add),
            onPressed:_onAdd)
    );
  }
  void _onItemTapped(int index) {
    setState((){
      _selectedIndex = index;
    });
  }
  void _onAdd(){}
}
```
**AppBar**

AppBar 是一个 Material 风格的导航栏，通过它可以设置导航栏标题、导航栏菜单、导航栏底部 Tab 标题等，下面看一下定义：

```dart
AppBar({
  Key key,
  this.leading,//最左侧Widget，常见抽屉或返回
  this.automaticallyImplyLeading = true,//如果leading为null实现默认leading按钮
  this.title,//页面标题
  this.actions,//导航栏右侧菜单
  this.bottom,//底部菜单，通常为Tab按钮组
  this.elevation = 4.0,//导航栏阴影
  this.centerTitle,//标题是否居中
  this.backgroundColor,
  ...//其他见源码注释
})
```
如果给 Scaffold 添加了抽屉菜单，默认情况下 Scaffold 会自动将 AppBar 的 leading 设置为菜单按钮，点击它便可打开抽屉菜单。可以手动设置 leading ，如：

```dart
Scaffold(
  appBar:AppBar(
    title:Text("App Name"),
    leading:Builder(builder:(context){
      return IconButton(
        icon:Icon(Icons.dashboard,color:Colors.white),//自定义图标
        onPressed:(){
          //打开抽屉菜单
          Scaffold.of(context).openDrawer();
        },
      );
    }),
    ...
  )
)
```

**TabBar**

我们通过 "bottom" 属性来添加一个导航栏底部 Tab 按钮组，Materila 组件中提供了一个 TabBar 组件，可以快速生成 Tab 菜单：

```dart
class _ScaffoldRouteState extends State<ScaffoldRoute>
  with SingleTickerProviderStateMixin {
    TabController _tabController //需要定义一个Controller
    List tabs = ["新闻","历史","图片"];

    @override
    void initState(){
      super.initState();
      //创建Controller
      _tabController = TabController(length:tabs.length, vsync:this);
    }

    @override
    Widget build(BuildContext context) {
      return Scaffold(
        appBar:AppBar(
          ...
          bottom:TabBar(
            controller:_tabController,
            tabs:tabs.map((e)=>Tab(text:e)).toList()//Widget数组   
          ),
        ),
        ...
      )
    }
  }
```
上面代码首先创建了一个 TabController ，用于控制、监听 Tab 菜单切换，再通过 TabBar 生成一个底部菜单栏，TabBar 的 tabs 属性接受一个 Widget 数组，表示每一个 Tab 子菜单。这里可以自定义也能如上例一样直接使用 Tab 组件，它是 Material 组件库提供的 Material 风格的 Tab 菜单。

Tab 组件有三个可选参数，除了指定文字外还能指定 Tab 菜单图标，或者直接自定义组件样式：

```dart
Tab({
  Key key,
  this.text,//菜单文本
  this.icon,//菜单图标
  this.child,//自定义组件样式
})
```

**TabBarView**

TabBar 只能生成静态菜单，由于 Tab 菜单和 Tab 页的切换需要同步，我们需要通过 TabController 去监听 Tab 菜单的切换去切换 Tab 页：

```dart
_tabController.addListener((){
  switch(_tabController.index){
    case 1: ...;
    case 2: ...;
  }
});
```
若 Tab 页可以滑动切换，还需要在滑动过程中更新 TabBar 指示器的偏移。Material 库提供了 TabBarView 组件，通过它可以轻松实现 Tab 页，还可以非常容易地配合 TabBar 来实现同步切换和滑动状态同步。

```dart
Scaffold(
  appBar:AppBar(
    ...
    bottom:TabBar(
      controller: _tabController,
      tabs:tabs.map((e)=>Tab(text: e)).toList()),
    ),
    drawer:MyDrawer(),
    body:TabBarView(
      controller:_tabController,
      children:tabs.map((e) {
        return Container(
          alignment: Alignment.center,
          child:Text(e, textScaleFactor:5),
        );
      }).toList(),
    ),
    ...
  )
)
```

**Drawer**

```dart
class MyDrawer extends StatelessWidget {
  const MyDrawer({
    Key key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: MediaQuery.removePadding(
          context: context,
          removeTop: true,
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,
            children: <Widget>[
              Padding(
                padding: const EdgeInsets.only(top: 38.0),
                child: Row(
                  children: <Widget>[
                    Padding(
                      padding: const EdgeInsets.symmetric(horizontal: 16.0),
                      child: Image.asset(
                        "imgs/coast.jpg",
                        width: 80,
                      ),
                    ),
                    Text(
                      "Wendux",
                      style: TextStyle(fontWeight: FontWeight.bold),
                    )
                  ],
                ),
              ),
              Expanded(
                child: ListView(
                  children: <Widget>[
                    ListView(
                      children: <Widget>[
                        ListTile(
                          leading: const Icon(Icons.add),
                          title: const Text('Add account'),
                        ),
                        ListTile(
                          leading: const Icon(Icons.settings),
                          title: const Text('Manage accounts'),
                        )
                      ],
                    )
                  ],
                ),
              )
            ],
          )),
    );
  }
}
```
抽屉菜单通常将 Drawer 组件作为根节点，实现了 Material 风格的菜单面板，MediaQuery.removePadding 可以移除 Drawer 默认的一些留白。抽屉菜单页由顶部和底部组成，顶部由用户头像和昵称组成，底部是一个菜单列表，用 ListView 实现。

**bottomNavigationBar**

Material 组件提供了 BottomAppBar 组件，可以与 FloatingActionButton 配合实现打洞效果：

```dart
bottomNavigationBar: BottomAppBar(
  color: Colors.white,
  shape: CircularNotchedRectangle(),//打孔
  child: Row(children: <Widget>[
    IconButton(icon: Icon(Icons.home),),
    SizedBox(),//中间位置空出
    IconButton(icon: Icon(Icons.business),)
  ],
  mainAxisAlignment: MainAxisAlignment.spaceAround,),
),
floatingActionButtonLocation: FloatingActionButtonLocation.centerDocked,
floatingActionButton: FloatingActionButton(
    //悬浮按钮
    child: Icon(Icons.add),
    onPressed: _onAdd,)
```

##### Clip

Flutter 中提供了一些裁剪函数，比如 ClipOval(), ClipRRect(), ClipRect() 等，用于对组件进行裁剪：

```dart
class ClipTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    //头像
    Widget coast = Image.asset(
      "imgs/coast.jpg",
      width: 60.0,
    );
    return Center(
      child: Column(
        children: <Widget>[
          coast, //不裁
          ClipOval(
            child: coast,
          ), //裁剪圆形
          ClipRRect(
            //裁剪圆角矩形
            borderRadius: BorderRadius.circular(15.0),
            child: coast,
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              Align(
                alignment: Alignment.topLeft,
                widthFactor: .5, //宽度设为一半
                child: coast,
              ),
              Text(
                "你好世界",
                style: TextStyle(color: Colors.green),
              )
            ],
          ),
          Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
              ClipRect(
                //将溢出部分剪裁
                child: Align(
                  alignment: Alignment.topLeft,
                  widthFactor: .5,
                  child: coast,
                ),
              ),
              Text(
                "你好世界",
                style: TextStyle(color: Colors.green),
              )
            ],
          )
        ],
      ),
    );
  }
}
```

**CustomClipper**

通过 CustomClipper 剪裁子组件的特定区域：

```dart
class MyClipper extends CunstomClipper<Rect> {
  @override
  Rect getClip(Size size) => Rect.fromLTWH(10.0,15.0,40.0,30.0);
  //getClip()用于获取裁剪区域的接口
  @override
  bool shouldReclip(CustomClipper<Rect> oldClipper) => false;
  //shouldReclip()用于决定是否重新裁剪
}
```

裁剪是在 layout 完成后的绘制阶段进行的，不会影响组件的大小，与 Transform 原理类似。

### 滚动组件

当组件内容超过当前显示视口 ViewPort 时，如果没有特殊处理则会提示 Overflow 错误，为此 Flutter 提供了多种可滚动组件(Scrollable Widget)用于显示列表和长布局。可滚动组件都直接或间接包含一个 Scrollable 组件，来看一下定义：

```dart
Scrollable({
  ...
  this.axisDirection = AxisDirection.down,//滚动方向
  this.controller,//接受ScrollController，控制滚动位置，监听滚动事件
  this.physics,//接受ScrollPhysics类型对象，决定如何相应操作
  @required this.viewportBuilder,
})
```
**Scrollbar** 是一个 Material 风格的滚动指示器，要为可滚动组件添加滚动条只需将 Scrollbar 作为可滚动组件的任意一个父级组件即可。

##### SingleChildScrollView

SingleChildScrollView 类似于 Andriod 中的 ScrollView，只接受一个子组件：

```dart
SingleChildScrollView({
  this.scrollDirection = Axis.vertical,
  //滚动方向，默认垂直
  this.reverse = false,
  //阅读方向
  this.padding,
  bool primary,
  //是否使用默认PrimaryScrollController
  this.physics,
  this.controller,
  this.child,
})
```

注意，因为 SingleChildScrollView 不支持基于 sliver 的延迟实例化模型，若视口 ViewPort 超出屏幕太多应该使用支持延迟加载的组件，比如 ListView 。

```dart
class SingleChildScrollViewTestRoute extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    return Scrollbar(
      //显示进度条
      child: SingleChildScrollView(
        padding: EdgeInsets.only(left: 380),
        child: Column(
          //动态创建一个List<Widget>
          children: str
              .split("") //每个字母用一个Text显示，放大两倍
              .map((e) => Text(
                    e,
                    textScaleFactor: 2.0,
                    style: TextStyle(color: Colors.grey),
                  ),)
              .toList(),//Widget List
        ),
      ),
    );
  }
}
```

##### ListView

ListView 是最常用的可滚动组件之一，可以沿一个方向线性排布所有子组件，支持 Sliver 的延迟构建模型。

```dart
ListView({
  ...
  //可滚动Widget公共参数
  Axis scrollDirection = Axis.vertical,
  bool reverse = false,
  ScrollController controller,
  bool primary,
  ScrollPhysics physics,
  EdgeInsetsGeometry padding,

  //ListView各构造函数的共同参数
  double itemExtent,
  //不为null会强制children长度为itemExtent值，指定后更滚动更高效
  bool shrinkWrap = false,
  //是否根据子组件总长度设置ListView长度，默认false即尽可能多占用空间。
  bool addAutomaticKeepAlives = true,
  bool addRepaintBoundaries = true,//是否重绘，取决于重绘开销
  double cacheExtent,

  //子Widget列表
  List<Widget> children = const <Widget>[],
})
```

默认构造函数有一个 children 参数，接受 Widget 列表，但需要提前创建好而用不到Sliver懒加载模型，与 SingleChildScrollView + Column 没有本质区别:

```dart
ListView(
  shrinkWrap: true,
  padding: const EdgeInsets.all(20.0),
  children:<Widget>[
    const Text('I\'m dedlicating every day to you'),
    const Text('Domestic life was never quite my style'),
    const Text('When you smile, you knock me out, I fall apart'),
    const Text('And I thought I was so smart'),
  ]
)
```

这种通过 List 作为 children 属性的方法只适用于子组件较少的情况。

**ListView.builder**

ListView.builder 适合列表项比较多的情况，只有当子组件真正显示的时候才会被创建，也就是说该构造函数创建 ListView 是基于 Sliver 懒加载模型的。

```dart
ListView.builder({
  ...
  @required IndexedWidgetBuilder itemBuilder,
  int itemCount,
  ...
})
```
itemBuilder 是列表项的构建器，类型为 IndexedWidgetBuilder ，返回值为一个 Widget，当列表滚动到具体 index 位置时会调用该构建器构建列表项。itemCount 为列表项的数量，如果其值为 null 则为无限列表。

```dart
ListView.builder(
  itemCount: 100,
  itemExtent:50.0,//强制高度为50.0
  itemBuilder:(BuildContext context, int index) {
    return ListTile(title: Text("$index"));
  }
)
```

**ListView.separated**

在列表之间添加分割组件，比 ListView.builder 多了一个 separatorBuilder 参数，是一个分割组件生成器。下例在奇数行添加了蓝色下划线，偶数行添加了绿色下划线：

```dart
class ListView3 extends StatelessWidget {
  @override
  Widget build(Buildcontext context) {
    //下划线Widget预定义以供复用
    Widget divider1=Divider(color: Colors.blue,);
    Widget divider2=Divider(color: Colors.green,);
    return ListView.separated(
      itemCount:100,
      //列表项构造器
      itemBuilder:(BuildContext context, int index) {
        return ListTile(title:Text("$index"));
      },
      //分割器构造器
      separatorBuilder:(BuildContext context, int index) {
        return index%2==0?divider1:divider2;
      } 
    );
  }
}
```

实例：无限加载列表

```dart
import 'package:english_words/english_words.dart';

class InfiniteListView extends StatefulWidget {
  @override
  _InfiniteListViewState createState() => _InfiniteListViewState();
}

class _InfiniteListViewState extends State<InfiniteListView> {
  static const loadingTag = "##loading##"; //表尾标记
  var _words = <String>[loadingTag];

  @override
  void initState() {
    super.initState();
    _retrieveData();
  }

  @override
  Widget build(BuildContext context) {
    return ListView.separated(
        itemBuilder: (context, index) {
          //如果到了表尾
          if (_words[index] == loadingTag) {
            //不足100条，继续获取数据
            if (_words.length - 1 < 100) {
              //获取数据
              _retrieveData();
              //加载时显示loading
              return Container(
                padding: const EdgeInsets.all(16),
                alignment: Alignment.center,
                child: SizedBox(
                  width: 24.0,
                  height: 24.0,
                  child: CircularProgressIndicator(
                    strokeWidth: 2.0,
                  ),
                ),
              );
            } else {
              //已经加载了100条数据，不再获取
              return Container(
                alignment: Alignment.center,
                padding: EdgeInsets.all(16.0),
                child: Text("没有更多了", style: TextStyle(color: Colors.grey)),
              );
            }
          }
          //显示单词列表项
          return ListTile(
            title: Text(_words[index]),
          );
        },
        separatorBuilder: (context, index) => Divider(height: .0),
        itemCount: _words.length);
  }

  void _retrieveData() {
    Future.delayed(Duration(seconds: 2)).then((e) {
      _words.insertAll(
          _words.length - 1,
          //english_words包的generateWordPairs()每次生成20个单词
          generateWordPairs().take(20).map((e) => e.asPascalCase).toList());
      setState(() {
        //重新构建列表
      });
    });
  }
}
```

**添加固定列表头**：在列表顶部添加“商品列表”的标题。

```dart
@override
Widget build(BuildContext context) {
  return Column(children:<Widget>[
    ListTile(title:Text("商品列表")),
    ListView.builder(itemBuilder:(BuildContext context, int index) {
      return ListTile(title: Text("$index"));
    }),
  ]);
}
//触发异常
```
此处异常是因为 ListView 高度边界无法确定，我们可以通过 SizedBox 指定边界，比如指定高度为屏幕高度减去状态栏、导航栏和表头，`height: MediaQuery.of(context).size.height-24-56-56`，但这种方法并不优雅，若表头布局改变剩余高度就得重新计算。最好的办法是通过 Flex 弹性布局 Expanded 自动拉伸组件大小。Column 是继承自 Flex 的，可以用 Column + Expanded 来实现：

```dart
@override
Widget build(BuildContext context) {
  return Column(children:<Widget>[
    ListTile(title:Text("商品列表")),
    Expanded(
      child:ListView.builder(itemBuilder:(BuildContext context, int index) {
        return ListTile(title: Text("$index"));
      }),
    ),
  ]);
}
```

##### GridView

GridView 可以构建一个二维网格列表，其默认的构造函数定义代码如下:

```dart
GridView({
  Axis scrollDirection = Axis.vertical,
  bool reverse = false,
  ScrollController controller,
  bool primary,
  ScrollPhysics physics,
  bool shrinkWrap = false,
  EdgeInsetsGeometry padding,
  @required SliverGridDelegate gridDelegate,
  //控制子Widget layout的委托
  bool addAutomaticKeepAlives = true,
  bool addRepaintBoundaries = true,
  double cacheExtent,
  List<Widget> children = const <Widget>[],
})
```
gridDelegate 参数的类型是 SliverGridDelegate，作用是控制 GridView 子组件如何排列 layout 。SliverGridDelegate 是一个抽象类,定义了 GridView Layout 的相关接口，子类需要通过它们来实现具体的布局算法。

Flutter 中提供了两个 SliverGridDelegate 子类 SliverGridDelegateWithFixedCrossAxisCount 和 SliverGridDelegateWithMaxCrossAxisExtent ，接下来认识一下它们：

**SliverGridDelegateWithFixedCrossAxisCount** 实现了一个横轴为固定数量子元素的 layout 算法，其构造函数：

```dart
SliverGridDelegateWithFixedCrossAxisCount({
  @required double crossAxisCount,//横轴子元素数量
  double mainAxisSpacing = 0.0,//主轴方向间距
  double crossAxisSpacing = 0.0,//横轴方向子元素间距
  double childAspectRatio = 1.0,//子元素横轴主轴长度比
})
```
实例：

```dart
GridView(
  gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
    crossAxisCount:3,
    childAspectRatio:1.0
  ),
  children:<Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast)
  ]
);
```

**GridView.count** 构造函数内部使用了 SliverGridDelegateWithFixedCrossAxisCount ，通过它可以快速创建横轴固定数量子元素的 GridView ，上面的示例代码等价于如下代码：、

```dart
GridView.count(
  crossAxisCount: 3,
  childAspectRatio: 1.0,
  children:<Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast),
  ],
);
```

**SliverGridDelegateWithMaxCrossAxisExtent** 子类实现了一个横轴子元素为固定最大长度的 layout 算法，其构造函数为：

```dart
SliverGridDelegateWithMaxCrossAxisExtent({
  double maxCrossAxisExtent,
  double mainAxisSpacing = 0.0,
  double crossAxisSpacing = 0.0,
  double childAspectRatio = 1.0,
})
```
看一下实例：

```dart
GridView(
  padding: EdgeInsets.zero,
  gridDelegate: SliverGridDelegateWithMaxCrossAxisExtent(
    maxCrossAxisExtent: 120.0,
    childAspectRatio: 2.0,//宽高比为2
  ),
  children:<Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast),
  ],
);
```

GridView.extent 构造函数内部使用了 SliverGridDelegateWithMaxCrossAxisExtent，我们通过它可以快速创建纵轴子元素为固定最大长度的 GridView，上例等价于如下代码：

```dart
GridView.extent(
  maxCrossAxisExtent:120.0,
  childAspectRatio:2.0,
  children:<Widget>[
    Icon(Icons.ac_unit),
    Icon(Icons.airport_shuttle),
    Icon(Icons.all_inclusive),
    Icon(Icons.beach_access),
    Icon(Icons.cake),
    Icon(Icons.free_breakfast),
  ],
);
```

**GridView.builder**

当子 Widget 较多无法全部提前构建好时，可以通过 GridView.builder 来动态创建子 Widget。GridView.builder 必须指定的参数有如下两个：

```dart
GridView.builder(
  ...
  @required SliverGridDelegate gridDelegate,
  @required IndexedWidgetBuilder itemBuilder,
)
```
其中，itemBuilder 为子 Widget 构建器。假设我们需要从一个异步数据源分批获取一些 Icon，然后用 GridView 做展示，代码如下：

```dart
class InfiniteGridView extends StatefulWidget {
  @override
  _InfiniteGridViewState createState() => _InfiniteGridViewState();
}

class _InfiniteGridViewState extends State<InfiniteGridView> {
  List<IconData> _icons = [];//保存Icon数据

  @override
  void initState() {
    //初始化数据
    _retrieveIcons();
  }

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      gridDelegate: SliverGridDelegateWithFixedCrossAxisCount(
        crossAxisCount:3,//每行三列
        childAspectRatio:1.0//宽高相等
      ),
      itemCount: _icons.length,
      itemBuilder: (context, index) {
        //如果显示到最后一个并且Icon的总数小于200,则继续获取数据
        if (index == _icons.length - 1 && _icons.length < 200) {
          _retrieveIcons();
        }
        return Icon(_icons[index]);
      }
    );
  }

  //模拟异步获取数据
  void _retrieveIcons() {
    Future.delayed(Duration(milliseconds:200)).then((e) {
      setState((){
        _icons.addAll([
          Icons.ac_unit,
          Icons.airport_shuttle,
          Icons.all_inclusive,
          Icons.beach_access, Icons.cake,
          Icons.free_breakfast
        ]);
      });
    });
  }
}
```

##### CustomScrollView

CustomScrollView 可以使用 Sliver 来自定义滚动模型的组件，可以包含多种滚动模型，比如顶部是 GridView 底部是 ListView ，它们的滚动效果是分离的，需要一个 “胶水” CustomScrollView 来进行粘贴。

Sliver 版和非 Sliver 版可滚动组件最大的区别就是前者不包含滚动模型而后者包含滚动模型，也正因如此才能将多个 Sliver 粘在一起，共用 CustomScrollView 的 Scrollable 实现统一的滑动效果。CustomScrollView 的子组件必须是 Sliver 。

### 功能组件

不会影响 UI 布局及外观的 Widget，通常具有一定的功能，如事件监听、数据存储等，比如 FocusScope 焦点控制，PageStorage 数据存储，NotificationListener 事件监听等等。

##### WillPopScope

为了避免用户误触而设置的导航返回拦截，默认构造如下：

```dart
const WillPopScope({
  ...
  @required WillPopCallback onWillPop,
  @required Widget child
})
```

<br/>

# 事件与通知

### 手势识别

Flutter 中的手势系统有两个独立的层，第一层为原始指针事件 pointer，它描述类屏幕上指针（触摸、鼠标和触控笔）的位置和移动。第二层为手势，描述由一个或多个指针移动组成的语义动作，比如拖动、缩放、双击等。

先来介绍原始指针事件(Pointer Event，在移动设备上通常为触摸事件)，在移动端各平台或 UI 系统的原始指针事件模型基本都是一致，即：一次完整的事件分为三个阶段：手指按下、手指移动、手指抬起。

当指针按下时，Flutter 会对应用程序执行命中测试（Hit Test），以确定指针与屏幕接触的位置存在哪些组件，指针按下事件被分发到由命中测试发现的最内部的组件，然后从那里开始，事件会在组件树中向上冒泡，从最内部的组件被分发到组件树根的路径上的所有组件。

Flutter 可以使用 Listener 来监听原始触摸事件，功能性组件 Listener 的构造函数定义：

```dart
Listener({
  Key key,
  this.onPointerDown, //手指按下回调
  this.onPointerMove, //手指移动回调
  this.onPointerUp,   //手指抬起回调
  this.onPointerCancel,//触摸事件取消回调
  this.behavior = HitTestBehavior.deferToChild,
  //在命中测试期间如何表现，决定子组件如何相应命中测试
  Widget child
})
```
来看一下示例：

```dart
...
//定义一个状态，保存当前指针位置
...
Listener(
  child: Container(
    alignment:Alignment.center,
    color:Colors.blue,
    width:300.0,
    height:150.0,
    child:Text(_event?.toString()??"",style:TextStyle(color:Colors.white)),
  ),
  onPointerDown:(PointerDownEvent event)=>setState(()=>_event=event),
  onPointerMove:(PointerMoveEvent event)=>setState(()=>_event=event),
  onPointerUp:(PointerUpEvent event)=>setState(()=>_event=event),
),
```

这里参数 PointerDownEvent，PointerMoveEvent，PointerUpEvent 都是 PointerEvent 的子类，PointerEvent 类中包括当前指针的一些信息：
+ position：鼠标相对于全局坐标的偏移。
+ delta：两次指针移动事件(PointerMoveEvent)的距离。
+ pressure：按压力度
+ orientation：指针移动方向，角度值

**忽略 PointerEvent**
假如不想让某个子树响应 PointerEvent ，可以使用 IgnorePointer 和 AbsorbPointer，这两个组件都能阻止子树接受指针事件（AbsorbPointer 本身会参与命中测试，而 IgnorePointer 不会）

```dart
Listener(
  child:AbsorbPointer(
    child:Listener(
      child:Container(
        color: Colors.red,
        width: 200.0,
        height: 100.0,
      ),
      onPointerDown: (event)=>print("in"),
    ),
  ),
  onPointerDown: (event)=>print("up"),
)
```
点击 Container 时，由于它在 AbsorbPointer 子树上故不会响应指针事件，日志不会输出 "in"，但 AbosrbPointer 本身是可以接收指针事件的，所以会输出 "up"，如果换成 IgnorePointer 则两个都不会输出。

**GestureDetector**

GestureDetector 是一个用于手势识别的功能性组件，是指针事件的语义化封装。

我们通过 GestureDetector 对 Container 进行手势识别，触发事件后，在 Container 上显示事件名：

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(title: "State", home: HomePage()));

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('手势检测'),
      ),
      body: GestureDetectorTestRoute(),
    );
  }
}

class GestureDetectorTestRoute extends StatefulWidget {
  @override
  _GestureDetectorTestRoute createState() => _GestureDetectorTestRoute();
}

class _GestureDetectorTestRoute extends State<GestureDetectorTestRoute> {
  String _operation = "No Gesture detected!"; //事件名
  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        child: Container(
            alignment: Alignment.center,
            color: Colors.blue,
            width: 200.0,
            height: 100.0,
            child: Text(
              _operation,
              style: TextStyle(color: Colors.white),
            )),
        onTap: () => updateText("Tap"), //点击
        onDoubleTap: () => updateText("DoubleTap"), //双击
        onLongPress: () => updateText("LongPress"),
      ), //长按
    );
  }

  void updateText(String text) {
    //更新显示的事件名
    setState(() {
      _operation = text;
    });
  }
}
```

> 当同时监听 onTap 和 onDoubleTap 事件时，当用户触发了 tap 事件，会有 200 毫秒左右的延时，以区分双击事件。如果用户只监听了 onTap 则没有延时。

**拖动 滑动**

```dart
import 'package:flutter/material.dart';

void main() => runApp(MaterialApp(title: "State", home: HomePage()));

class HomePage extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('手势检测'),
      ),
      body: _Drag(),
    );
  }
}

class _Drag extends StatefulWidget {
  @override
  _DragState createState() => _DragState();
}

class _DragState extends State<_Drag> with SingleTickerProviderStateMixin {
  double _top = 0.0; //距顶部偏移
  double _left = 0.0; //距左边偏移

  @override
  Widget build(BuildContext context) {
    return Stack(children: <Widget>[
      Positioned(
          top: _top,
          left: _left,
          child: GestureDetector(
              child: CircleAvatar(child: Text("A")),
              //手指按下时触发
              onPanDown: (DragDownDetails e) {
                //打印手指按下的位置
                print("用户手指按下:${e.globalPosition}");
              },
              //手指滑动时会触发此回调
              onPanUpdate: (DragUpdateDetails e) {
                //用户手指滑动时，更新偏移，重新构建
                setState(() {
                  _left += e.delta.dx;
                  _top += e.delta.dy;
                });
              },
              onPanEnd: (DragEndDetails e) {
                //打印滑动结束时在x, y轴上的速度
                print(e.velocity);
              }))
    ]);
  }
}
```

**单一方向拖动**

很多场景下只需要沿一个方向拖动，如垂直方向的列表，即 GestureDetector 只识别特定方向的手势：

```dart
class _DragVertical extends StatefulWidget {
  @override
  _DragVerticalState createState()=> _DragVerticalState();
}

class _DragVerticalState extends State<_DragVertical> {
  double _top = 0.0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget> [
        Positioned(
          top:_top,
          child:GestureDetector(
            child:CircleAvatar(child:Text("A")),
            //垂直方向拖动事件
            onVerticalDragUpdate: (DragUpdateDetails details) {
              setState((){
                _top += details.delta.dy;
              });
            }
          )
        )
      ]
    );
  }
}
```
横向同理：

```dart
class _DragVertical extends StatefulWidget {
  @override
  _DragVerticalState createState()=> _DragVerticalState();
}

class _DragVerticalState extends State<_DragVertical> {
  double _left = 0.0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget> [
        Positioned(
          left: _left,
          child:GestureDetector(
            child:CircleAvatar(child:Text("A")),
            //垂直方向拖动事件
            onHorizontalDragUpdate: (DragUpdateDetails details) {
              setState((){
                _left += details.delta.dx;
              });
            }
          )
        )
      ]
    );
  }
}
```

**缩放**

GestureDetector 可以监听缩放事件，下面实例演示了简单的图片缩放效果：

```dart
class _ScaleTestRouteState extends State<_ScaleTestRoute> {
  double _width = 200.0;//通过修改图片宽度来达到缩放效果

  @override
  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        //指定宽度，高度自适应
        child:Image.asset("src/iconImg.jpeg",width:_width),
        onScaleUpdate:(ScaleUpdateDetails details) {
          setState((){
            //缩放倍数在0.8到10之间
            _width=200*details.scale.clamp(.8,10.0);
          });
        }
      )
    );
  }
}
```

**GestureRecognizer**

GestureDetector 内部用一个或多个 GestureRecognizer 来识别各种手势，后者是通过 Listener 来将原始指针事件转换为语义手势。GestureRecognizer 是一个抽象类，一种手势的识别器对应一个 GestureRecognizer 的子类。

示例：给一段富文本不同部分添加事件处理器，TextSpan 本身不是 widget ，不能用 GestureDetector ，但是其 recognizer 属性可以接收一个 GestureRecognizer:

```dart
class _GestureRecognizerTestRoute extends StatefulWidget {
  @override
  _GestureRecognizerTestRouteState createState() =>
      _GestureRecognizerTestRouteState();
}

class _GestureRecognizerTestRouteState
    extends State<_GestureRecognizerTestRoute> {
  TapGestureRecognizer _tapGestureRecognizer = TapGestureRecognizer();
  bool _toggle = false; //变色开关

  @override
  void dispose() {
    //用到GestureRecognizer一定要调用dispose()方法释放资源
    _tapGestureRecognizer.dispose();
    super.dispose(); //这是?
  }

  @override
  Widget build(BuildContext context) {
    return Center(
      child: Text.rich(TextSpan(children: [
        TextSpan(text: "Hello World"),
        TextSpan(
            text: "change",
            style: TextStyle(
                fontSize: 30.0, color: _toggle ? Colors.blue : Colors.red),
            recognizer: _tapGestureRecognizer
              ..onTap = () {
                setState(() {
                  _toggle = !_toggle;
                });
              }),
              TextSpan(text: '你好世界')
      ])),
    );
  }
}
```

**手势竞争**

Flutter 中的手势识别引入了 Arena 竞技场的概念，两个收到监听的手势会竞争事件的处理权。例如有一个 ListView ，子组件也是 ListView ，这时滑动子组件父组件不会动。

以拖动手势为例，同时识别水平和垂直拖动手势：

```dart
class BothDirectionTestRoute extends StatefulWidget{
  BothDirectionTestRouteState createState()=>BothDirectionTestRouteState();
}

class BothDirectionTestRouteState extends State<BothDirectionTestRoute>{
  double _top = 0.0;
  double _left = 0.0;

  @override
  Widget build(BuildContext context) {
    return Stack(
      children: <Widget>[
        Positioned(
          top:_top,
          left:_left,
          child: GestureDetector(
            child: CircleAvatar(child: Text("A"),),
            //垂直方向
            onVerticalDragUpdate:(DragUpdateDetails details){
              setState(() {
                _top += details.delta.dy;
              });
            },
            onHorizontalDragUpdate: (DragUpdateDetails details){
              setState(() {
                _left +=details.delta.dx;
              });
            },
          ),
        )
      ],
    );
  }
}
```
此例中的获胜条件为，首次移动时代位移在水平和垂直方向上分量大的获胜。

**手势冲突**

手势竞争可能产生手势竞争，假设有一个可以左右拖动的 widget，我们也想在上面检测按下和抬起事件。

```dart
class GestureConflictTestRouteState extends State<GestureConflictTestRoute> {
  double _left = 0.0;
  @override
  Widget build(BuildContext context) {
    return Stack(
      children:<Widget>[
        Positioned(
          left:_left,
          child:GestureDetector(
            child:CircleAvatar(child:Text("A")),
            onHorizontalDragUpdate:(DragUpdateDetails details){
              setState((){
                _left += details.delta.dx;
              });
            },
            onHorizontalDragEnd:(details){
              print("onHorizontalDragEnd");
            },
            onTapDown:(details){
              print("down");
            },
            onTapUp:(details){
              print("up");
            }
          )
        )
      ]
    );
  }
}
```

按住 A 拖动，先显示 down 再显示 onHorizontalDragEnd 。按下时拖动手势没有完整语义，TapDown 胜出打印 down ，拖动后当手指抬起时，onHorizontalDragEnd 和 onTapUp 发生冲突，但是因为在拖动的语义中所以前者胜出。

如果我们的代码逻辑强依赖按下和抬起，比如一个轮播组件，其本身已经处理了拖动事件，此时再用 onTapDown 和 onTapUp 来监听是无用的，通过 Listener 监听原始指针事件就行：

```dart
Positioned(
  top:80.0,
  left:_leftB,
  child:Listener(
    onPointerDown:(details){
      print("down");
    },
    onPointerUp:(details) {
      //会触发
      print("up");
    },
    child:GestureDetector(
      child:CircleAvatar(child:Text("B")),
      onHorizontalDragUpdate:(DragUpdateDetails details) {
        setState((){
          _leftB += details.delta.dx;
        });
      },
      onHorizontalDragEnd:(details){
        print("onHorizontalDragEnd");
      }
    )
  )
)
```
手势冲突只是手势级别的，而手势是对原始指针的语义化识别，所以在遇到复杂的冲突场景时，通过 Listener 直接识别原始指针事件来解决冲突。

##### cookbook : Taps

在 Flutter 中使用 GestureDetector Widget 处理 Taps 

1. 创建一个 button 。
2. 把它包装在 GestureDector 中并提供 onTap 回调。

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'Gesture Demo';

    return MaterialApp(
      title: title,
      home: MyHomePage(title: title),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text(title),
        ),
        body: Center(child: MyButton()));
  }
}

class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        final snackBar = SnackBar(
          content: Text("Tap"),
        );

        Scaffold.of(context).showSnackBar(snackBar);
        //呈现在
      },
      child: Container(
        padding: EdgeInsets.all(12.0),
        decoration: BoxDecoration(
            color: Theme.of(context).buttonColor,
            borderRadius: BorderRadius.circular(18)),
            child: Text('My Button'),
      ),
    );
  }
}
```

![avatar](images/GD.png)



##### cookbook : InkWell

Flutter 提供了 InkWell Widget 来管理点击回调和水波动画

1. 创建可点击的 Widget
2. 包裹在 InkWell 中管理点击回调和水波动画

遇到问题：无法在 InkWell 里设置按钮背景色
解决方法一：外层套上 Material 以及 Ink 组件

```dart
import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    final title = 'InkWell Demo';

    return MaterialApp(
      title: title,
      home: MyHomePage(title: title),
    );
  }
}

class MyHomePage extends StatelessWidget {
  final String title;

  MyHomePage({Key key, this.title}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(title),
      ),
      body: Center(
        child: MyButton(),
      ),
    );
  }
}

class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Material(child:Ink(
      child:InkWell(
      onTap: () {
        Scaffold.of(context).showSnackBar(SnackBar(content: Text('Tap')));
      },
      child: Container(
        padding: EdgeInsets.all(12.0),
        child: Text('Falt Button',),
      ),
      borderRadius: BorderRadius.circular(20),
    ),
    decoration: BoxDecoration(color:Colors.blue, borderRadius: BorderRadius.circular(20)),));
  }
}
```

可以同时实现圆角颜色和水波效果，就是嵌套有点多。其实 Material 自带 button 都有水波效果是因为它们都是对 **RawMaterialButton** 的包装定制，我们直接用这个:

```dart
class MyButton extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return RawMaterialButton(
      onPressed: () {},
      child: Container(
        padding: EdgeInsets.all(12.0),
        child: Text('Falt Button',),
      ),
      fillColor: Colors.blue,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(20)),
    );
  }
}
```

<br/>

### 事件总线

事件总线可以实现跨页面的事件通知，比如用户登录或注销事件。事件总线通常实现了订阅者模式，包含订阅者和发布者两种角色，通过事件总线来触发事件和监听事件。

```dart
//订阅者回调签名
typedef void EventCallback(arg);

class EventBus {
  //私有构造函数
  EventBus._internal();

  //保存单例
  static EventBus _singleton = EventBus._internal();

  //工厂构造函数
  factory EventBus() => _singleton;

  //保存事件订阅队列，key：事件名(id)，value：对应事件的订阅者队列
  var _emap = Map<Object, List<EventCallback>>();

  //添加订阅者
  void on(eventName, EventCallback f) {
    if (eventName == null||f==null) return;
    _emap[eventName] ??= List<EventCallback>();
    _emap[eventNmae].add(f);
  }

  //移除订阅者
  void off(eventName,[EventCallback f]) {
    var list = _emap[eventName];
    if (eventName == null || list == null) return;
    if (f == null) {
      _emap[eventName] = null;
    } else {
      list.remove(f);
    }
  }

  //触发事件，该事件所有订阅者会被调用
  void emit(eventName, [arg]) {
    var list = _emap[eventName];
    if (list == null) return;
    int len = list.length - 1;
    //反向遍历，防止订阅者在回调中移除自身带来的下标错位
    for (var i = len; i > -1; --i) {
      list[i](arg);
    }
  }
}

//定义一个top-level全局变量，页面引入该文件后可以直接用bus
```

**实现滑动关闭**

1. 创建 item 列表 (类似长列表，将数据源转换为 List )
2. 将 item 包装在一个 Dismissable Widget 中
3. 提供滑动背景提示

```dart
import 'package:flutter/foundation.dart';
import 'package:flutter/material.dart';

void main() {
  runApp(MyApp(
    items: List<String>.generate(20, (i) => "Item ${i + 1}"),
  ));
}

class MyApp extends StatelessWidget {
  final List<String> items;

  MyApp({Key key, @required this.items}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final title = 'Dismissing Items';

    return MaterialApp(
        title: title,
        home: Scaffold(
            appBar: AppBar(
              title: Text(title),
            ),
            body: ListView.builder(
              itemCount: items.length,
              itemBuilder: (context, index) {
                final item = items[index];
                return Dismissible(
                    key: Key(item),
                    onDismissed: (direction) {
                      items.removeAt(index);

                      Scaffold.of(context).showSnackBar(SnackBar(
                        content: Text("$item dismissed"),
                      ));
                    },
                    background: Container(color: Colors.red),
                    child: ListTile(title: Text('$item')));
              },
            )
          )
        );
  }
}
```

#### 