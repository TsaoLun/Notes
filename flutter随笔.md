## Flutter 随笔

<br/>

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

### 基础组件

#### Image 组件

**asset 构造方法**：首先配置资源路径，在 pubspec.yaml 文件的 flutter 标签下添加 assets 配置 `assets: - <PATH> ` ，若有多张素材则添加多行 `-<PATH>` 。然后修改 main.dart 文件，这里图片放在首页所以修改 _MyHomePageState 类的 build 方法来进行界面配置：

```dart
  @override
  Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
                Image.asset("src/iconImg.jpeg"),
            ],
          ),
        ),
      );
    }
```
顺便看一下完整结构：
```dart
import 'package:flutter/material.dart';

//main函数
void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidgets {
  //root widget of application，并重写build方法
  @override
  Widget build(BuildContext context) {
    return MaterilaApp(
      title: 'Demo',
      theme: ThemeData(
        PrimarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage('title: Demo Page'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Image.asset("src/iconImg.jpeg"),
          ],
        ),
      ),
    );
  }
}
```

**file**：需要导入 Dart 的 io 模块，即在头部添加 `import 'dart:io';`

```dart
Image.file(File("/src/iconImg.jpeg"))
```
**network**：使用较多，方式如下

```dart
Image.network("https://...")
```
Image 组件有多种属性配置，width 和 height 属性用于配置图片组件的尺寸，alignment 属性用来设置对齐方式，fit 属性用来设置图片的填充方式。

<br/>

#### Text 组件
使用方法与 Image 组件类似，直接使用构造方法创建 Text 对象，并将其放入布局容器中：

```dart
  @override
  Widget build(BuildContext context) {
      return Scaffold(
        appBar: AppBar(
          title: Text(widget.title),
        ),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: <Widget>[
                Text("欢迎学习Flutter应用开发",textAlign:TextAlign.center),
            ],
          ),
        ),
      );
    }
```
除了 Text 组件的 textAlign 属性用来设置文本对齐方式，还提供了 TextStyle 属性来对文本显示风格进行自定义。

<br/>

#### Icon 组件
Icon 类的构造方法中，必填参数用来设置图标数据，color 参数用来设置图标的颜色，size 参数设置尺寸。修改 body 中的布局代码：

```dart
body: Center(
  child: Column(
    mainAxisAlignment: MainAxisAlignment.center,
    children:<Widget>[
      Icon(Icons.print,color:Colors.red,size:40)
    ],
  ),
),
```

<br/>

#### Buttun 组件
MaterialButton 是按钮组件的基类，**RaisedButton** 是继承自 MaterialButton 的有凸起效果的按钮组件。

```dart
RaisedButton(child: Text("这里是一个按钮"),colorBrightness: Brightness.light,color: Colors.red,
            disabledColor: Colors.blue,onPressed: ()=>debugPrint("按钮点击"))
```

上面的代码中，我们将按钮的点击回调函数设置成了箭头函数。如果点击事件的处理复杂，就可以在当前类中单独创建方法，将回调函数指定为方法名。**FlatButton** 用法类似，但效果是扁平的。

**DropdownButton** 组件提供一组供用户进行选择的选项列表，示例如下：
(代码有问题)
```dart
Widget build(BuildContext context) {
  var item1 = DropdownMenuItem(child: Text("篮球"),value:"篮球");
  var item2 = DropdownMenuItem(child: Text("足球"),value:"足球");
  var item3 = DropdownMenuItem(child: Text("排球"),value:"排球");
  List<DropdownMenuItem<dynamic>> list = [item1,item2,item3];
  var drop = DropdownButton(items: list,onChanged: onChange,value: this.value);
  return Scaffold(
    appBar: AppBar(
      title: Text(widget.title),
    ),
    body: Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children:<Widget>[
          drop,
        ],
      ),
    ),
  );
}
```

**悬浮按钮**常用于核心功能，如分享、加入购物车等，在 Flutter 中通过 **FloatingActionButton** 来创建：

```dart
FloatingActionButton(child: Text("购物车"),backgroundColor: Colors.red,
            foregroundColor: Colors.blue,tooltip: "提示",onPressed: ()=>debugPrint("悬浮按钮"))
```

**图标按钮 IconButton** 是 Flutter 提供的最简洁的图标按钮，默认没有多余的 UI 元素，用户单击时会有反馈：

```dart
IconButton(icon: Text("^_^"), onPressed:()=>debugPrint("图标按钮"))
```

<br/>

#### Scaffold 脚手架

在前面的测试工程中，build 函数实际上就是一个 Scaffold 组件，所学的独立组件都是作为 Scaffold 组件的内容组件出现的。

Scaffold 作用像是一个功能强大的布局容器，定义好了导航栏、抽屉、悬浮按钮、内容视图等区域，开发者只需要根据界面需要来填充脚手架中的内容即可。

| 属性名                  | 用途             | 值类型      |
| ----------------------- | ---------------- | ----------- |
| appBar                  | 导航栏           | AppBar 对象 |
| backgroundColor         | 组件背景颜色     | Color 对象  |
| body                    | 设置组件内容         | Widget 对象 |
| bottomNavigationBar     | 底部导航栏       | Widget 对象 |
| bottomSheet             | 持久底部抽屉     | Widget 对象 |
| drawer                  | 左侧抽屉         | Widget 对象 |
| endDrawer               | 右侧抽屉         | Widget 对象 |
| floatingActionButton    | 悬浮按钮         | Widget 对象 |
| persistentFooterButtons | 持久底部按钮     | Widget List |
| primary                 | 脚手架从顶部开始 | bool 对象   |

以上属性中 drawer 和 endDrawer 会在对应侧创建按钮以单击弹出抽屉视图，其他的配置后都会持久显示在脚手架容器中。修改之前测试工程中的 build 方法的代码：

```dart
@override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      bottomNavigationBar: BottomAppBar(
        child: Text("底部工具栏",style:TextStyle(fontSize:30),),
      ),
      bottomSheet: Text("持久化显示的底部抽屉"),
      drawer: Column(
        children:<Widget>[
          Text("左侧抽屉1"),
          Text("左侧抽屉2"),
          Text("左侧抽屉3"),
        ],
      ),
      endDrawer:Column(
        children:<Widget>[
          Text("右侧抽屉1"),
          Text("右侧抽屉2"),
          Text("右侧抽屉3"),
        ],
      ),
      floatingActionButton:FloatingActionButton(onPressed: (){print("悬浮按钮");
      },child: Text("悬浮"),),
      persistentFooterButtons:[Text("One"),Text("Two")],
      backgroundColor: Colors.grey,
      primary:true,
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
          ],
        ),
      ),
    );
  }
```

**AppBar 组件**
Scaffold 组件中的 appBar 属性需要设置为 AppBar 对象，AppBar 对象可以设置的属性很多，示例代码如下：

```dart
appBar:AppBar(
  title: Text(widget.title),
  actions: [RaisedButton(child: Text("按钮I"),onPressed:()=>print("按钮I"),),
  RaisedButton(child: Text("按钮II"),onPressed:()=>print("按钮II")),],
  backgroundColor: Colors.grey,
  centerTitle: false,
  leading: Text("左侧组件"),
)
```

|属性名|用途|值类型|
|--------|--------|--------|
|actions|AppBar功能按钮|Widget List|
|backgroundColor|背景颜色|Color 对象|
|centerTitle|是否居中|bool 对象|
|leading|标题左侧组件|Widget 对象|
|title|设置标题|Widget 对象|

**BottomNavigationBar组件**
对于 Scaffold 组件的 bottomNavigationBar 属性，除了设置为 BottomAppBar 组件外，使用 BottomNavigationBar 来设置还能构造出 iOS 系统风格的标签栏：

```dart
bottomNavigationBar: BottomNavigationBar(
  items:[
    BottomNavigationBarItem(icon: Icon(Icons.print),title:Text("打印")),
    BottomNavigationBarItem(icon: Icon(Icons.stop),title:Text("停止")),
  ],
  type: BottomNavigationBarType.fixed,
),
```

|属性名|用途|值类型|
|-----|-----|-----|
|items|设置标签组，必选|BottomNavigationBarItem列表|
|onTap|回调相应标签索引|函数|
|type|设置类型|fixed 自适应宽度，shifting 单击动画|
|fixedColor|选中颜色|Color对象|
|backgroundColor|背景颜色|Color对象|
|iconSize|图标尺寸默认24|数值|
|selectedItemColor|选中标签颜色|Color对象|
|selectedIconTheme|选中图标风格|图标风格IconThemeData对象|

BottomNavigationBarItem 类构造标签栏上具体的标签对象，常用属性有：icon 图标，title 标题，activeIcon 选中时的图标，backgroundColor 背景色。

<br/>

**Placeholder占位符组件**
在应用程序开发中，很多 UI 渲染依赖于网络数据，在等待过程中可以在需要渲染组件的地方使用占位符来进行占位，在完成请求后再替换为真实组件：

```dart
Placeholder(color: Colors.grey,fallbackHeight:100,fallbackWidth:100,strokeWidth:1)
```

<br/>

#### 容器组件

**Container 容器组件**：Container 是最简单的一个布局容器，可以根据子组件的尺寸自适应大小：

```dart
child: Container(
  child: Text("容器的内容部分",style: TextStyle(color: Colors.white),),
  color: Colors.blue,
  width: 300,
  height: 35,
)
```

Container 常用属性
|属性名|用途|值类型|
|-----|-----|-----|
|alignment|子组件对其方式|AlignmentGeometry|
|child|子组件|Widget 对象|
|constraints|设置子组件约束|BoxConstraints对象|
|width|设置容器宽度|Double 对象|
|height|设置容器高度|Double 对象|
|color|设置容器背景颜色|Color 对象|
|decoration|容器的修饰属性，与Color不共存|Decoration 对象|
|foregroundDecoration|设置前景修饰|Decoration 对象|
|margin|容器外边距|EdgeInsetsGeometry 对象|
|padding|容器内边距|EdgeInsetGeometry 对象|
|transform|容器形状变换属性|Matrix4 对象|

其中 BoxDecoration 对象可配置属性如下：
|属性名|用途|值类型|
|-----|-----|-----|
|color|容器背景色|Color 对象|
|image|背景图片|DecorationImage|
|border|容器的边框|Border 对象|
|boxShadow|容器阴影|BoxShadow List|
|borderRadius|容器的圆角|BorderRadius|
|gradient|渐变背景|Linear/Radial/Sweep-Gradient|
|backgroundBlendMode|渲染时的混合模式|BlendMode 枚举|
|shape|背景形状|BoxShape(rectangle, circle)|

```dart
decoration: BoxDecoration(
  color: Colors.amber,
  image: DecorationImage(
    image: AssetImage("assets/iconImg.png")
  ),
  border: Border(
    top: BorderSide(
      color: Colors.lightGreenAccent,
      width: 4,
      style: BorderStyle.solid,
    )
  ),
  borderRadius: BorderRadius.all(Radius.circular(10)),
  boxShadow:[
    BoxShadow(
      color: Colors.black26,
      offset: Offset(20, 20)
    ),
    BoxShadow(
      color: Colors.brown,
      offset: Offset(-20,-20)
    )
  ],
  gradient:LinearGradient(
    colors: [
      Colors.lightBlue,
      Colors.orange
    ],
    stops:[
      0,0.5
    ]
  ),
  shape: BoxShape.rectangle
)
```

gradient 属性常用的渐变背景有3个，LinearGradient 用来创建线性渐变，RadialGradient 以中心为原点、以半径为轴向外渐变，SweepGradient扫描式渐变。

在 Container 容器属性中另一个重要属性 transform，可以对 Container 容器的展示进行变化，transform 属性需要设置为 Matrix4 对象即4维矩阵，在 Flutter 中提供了现成构造方法，可以平移、旋转、缩放、镜像和扭曲，以围绕z轴旋转为例：

```dart
Matrix4.rotationZ(-.2)
```

**Padding** 组件是简化的 Container 组件，只能有一个子组件且不需要设置内边距：

```dart
Padding(
  child: Container(
    color: Colors.red,
  ),
  padding: EdgeInsets.all(20),
)
```

**Center** 组件是一种特殊的 Padding 组件，只有一个子组件且布局在容器中心：

```dart
Center (
  child: Container(
    color: Colors.red,
    width: 200,
    height: 200,
  ),
)
```

**Align** 组件一般布局在边缘，通过 alignment 属性进行控制：

```dart
Align (
  child: Container(
    color: Colors.red,
    width: 200,
    height: 200,
  ),
  alignment: Alignment.bottomRight,
)
```
>**FittedBox** 组件会自动根据容器大小适配尺寸，通过 alignment 和 fit 对布局控制；
**AspectRatio** 组件用来创建宽高比固定的容器；
**ConstrainedBox** 组件对其内部布局的子组件进行宽高约束，constraints 属性设置组件宽度范围和高度范围；
**LimitedBox** 容器限制组件的尺寸；
**Offstage** 容器可以通过设置 offstage 属性控制组件是否显示；
**OverflowBox** 容器支持其子组件尺寸超出容器且不被截断，通过设置 maxWidth 和 maxHeight 属性来控制允许子组件的最大尺寸；
**SizeBox** 将子组件的尺寸设置为固定的尺寸；
**Transform** 容器组件与 trandform 属性类似，也是对容器进行变换，而且可以设置 alignment 变换参照的坐标系。

<br/>

#### 多组件布局容器

多组件布局容器允许一次布局多个子组件，行布局组件、列布局组件以及复杂的网络组件与列表组件都属于多组件布局容器。

**Row 与 Column**
Row 容器进行行布局，其中可以设置一组子组件并以水平方向布局：

```dart
child: Row(
  children: <Widget>[Text("组件1"),Text("组件2"),Text("组件3")],
  textDirection: TextDirection.rtl,
)
```
其中，textDirection 属性用来设置布局的方向，如从左往右还是从右往左，还可以通过 mainAxisAlignment, mainAxisSize, crossAxisAlignment 属性设置对齐方式、主轴尺寸、垂直对齐方式。

Column 组件与 Row 类似只是布局方向为竖直，主轴垂直次轴水平，常用配置属性也一致。

```dart
child: Column(
  children: <Widget>[Text("组件1"),Text("组件2"),Text("组件3")],
)
```

**Flex 与 Expanded**

Column 和 Row 都继承自 Flex 组件，Flex 通过设置 direction 属性来设置水平还是竖直布局，Expanded 组件专门用来作为 Flex 组件的子组件，通过设置 Flex 权重值来创建有比例关系的一组组件：

```dart
Row(
  children: <Widget>[
    Expanded(
      child: Container(
        color: Colors.red,
        child: Text("组件1"),
        height: 100,
      ),
      flex: 1,
    ),
    Expanded(
      child: Container(
        color: Colors.blue,
        child: Text("组件2"),
        height: 100,
      ),
      flex: 2,//权重值
    ),
    Expanded(
      child: Container(
        color: Colors.green,
        child: Text("组件3"),
        height: 100,
      ),
      flex: 1,
    ),
  ],
  textDirection: TextDirection.rtl,
)
```

**Stack 与 Positioned**
Stack 组件是 Flutter 中用来进行绝对布局的一个容器组件，Positioned 组件通常会作为 Stack 组件的子组件使用，设置绝对位置和尺寸：

```dart
Stack(
  children:<Widget>[
    Positioned(
      child: Container(
        color: Colors.orange,
      ),
      left: 100,
      right: 100,
      top: 250,
      height: 100,
    )
  ],
)
```
Positioned 组件可以通过设置 left, top, right 和 bottom 来设置距离父容器4条边的距离，也可以通过设置 width 和 height属性来确定尺寸。

**IndexedStack**
基本与 Stack 一致但只会对其中一个子组件进行渲染，由 index 属性控制：

```dart
IndexedStack(
  children:<Widget>[
    Positioned(
      child: Container(
        color: Colors.orange,
      ),
      left: 100,
      right: 100,
      top: 250,
      height: 100,
    ),
    Positioned(
      child: Container(
        color: Colors.orange,
        ),
        left: 0,
        right: 100,
        top: 0,
        height: 100,
    ),
  ],
  index: 0,//跳过渲染
)
```

**Wrap 容器组件**
Wrap 容器组件的作用与 Row, Column 组件类似，但更为强大，当一行或一列布局不下时，Wrap 组件会自动进行换行或换列：

```dart
Wrap(
  children: <Widget>[
    Container(
      color: Colors.red,
      width: 100,
      height: 100,
    ),
    Container(
      color: Colors.blue,
      width: 100,
      height: 100,
    ),
    Container(
      color: Colors.grey,
      width: 100,
      height: 100,
    ),
    Container(
      color: Colors.green,
      width: 100,
      height: 100,
    ),
    Container(
      color: Colors.orange,
      width: 100,
      height: 100,
    ),
  ],
  direction: Axis.horizontal,
  alignment: WrapAlignment.end,
  spacing: 20,
  runAlignment: WrapAlignment.start,
  runSpacing: 20,
  crossAxisAlignment: WrapCrossAlignment.center,
  textDirection: TextDirection.rtl,
)
```

<br/>

### 组件进阶

#### 表单组件
表单组件是 Flutter 中用来进行用户输入、提交用户输入信息的组件，在使用表单组件时需要将其放入表单容器中。

**表单容器**的作用是组合表单组件，例如一个应用程序的登录界面需要用户输入用户名和密码，即需要提供两个输入框组件，用 Form 组件来进行组合：

```dart
Form(child: Column(
  children:<Widget>[
    Text("用户名"),
    TextFormField(),
    Text("密码"),
    TextFormField(),
  ],
))
```
Form 组件中的属性可以统一对输入框进行配置，autovalidate 决定是否每次输入都进行有效性检查(bool 对象)，onChanged 设置回调函数。

**TextFormField** 用来创建表单中进行文本输入的输入框组件，除了可以接收和保存用户输入外，还提供输入提示、有效性校验等功能：

```dart
TextFormField(
  decoration: InputDecoration(
    labelText:"你的用户名"
  ),
  validator: (string) {
    if(string.length<3){
      return "用户名过短";
    }
    return null;
  },
)
```
decoration 属性用来设置输入的提示文本，InputDecoration 类的相关用法后面会介绍，validator 属性用来设置有效性校验逻辑，非法则返回字符串结束校验，合法则返回 null 。TextFormField 还有一个 controller 属性可以配置，这个属性用来管理文本框编辑信息。

```dart
var controller = TextEditingController();
Form(child: Column(
    children: <Widget>[
      Text("用户名"),
      TextFormField(
        decoration: InputDecoration(
          labelText:"你的用户名"
        ),
        validator: (string){
          if(string.length<3){
            return "用户名过短";
          }
          return null;
        },
        controller: controller,
      ),
      Text("密码"),
      TextFormField()
    ],
  ),autovalidate:true,onChanged: (){
    print("输入框文本发生变化:"+controller.text);
  },
)
```
其中 TextEditingController 用来控制输入框中的文本，调用其 clear 方法可以清空输入框的文本，其中的 text 属性用来存储输入框中的文本，selection 属性用来存储输入框中选中的内容区域。

**InputDecoration** 用来进行输入框提示视图的设置，一般是对输入框组件界面上的修饰。

**DropdownButtonFormField** 即下拉选择框组件，提供一组选项供用户进行选择：

```dart
Text("兴趣爱好"),
DropdownButtonFormField(items: [
  DropdownMenuItem(child: Text("篮球")),
  DropdownMenuItem(child: Text("足球")),
  DropdownMenuItem(child: Text("排球")),
])
```

<br/>

#### 布局技术

**Container** 组件是非常方便的单组件布局容器，如果其子组件尺寸小于 Container 本身就可以使用 alignment 属性控制其子组件的对齐方式。

在使用 alignment 属性控制组件对齐的前提下，可以设置 padding 属性来实现子组件相对 Container 边缘的边距调整，例如将 padding 属性设置如下:

```dart
padding: EdgeInsets.only(left: 20,top: 60, right: 100)
```

若要对整个 Container 组件进行三维变换布局，则可以对其 transform 属性进行设置，例如：

```dart
transform: Matrix4.rotationZ(3.14/16)
```

**Padding** 组件是简化版的 Container 组件，其中只有一个子组件，通过设置 padding 属性来约束其内边距

```dart
Padding(padding: EdgeInsets.only(left:20,top:60),child:Text("Container",style:TextStyle()));
```

**Center** 组件是简化版的 Container 组件，其将内部组件直接进行居中布局，例如：

```dart
Center(child: Text("Container"),);
//widthFactor和heightFactor属性分别设置组件宽度和高度是子组件的多少倍
```
**FittedBox** 组件通过 alignment 和 fit 管理其子组件的对齐模式和缩放模式。

**ConstrainedBox** 布局也是一种特殊的 Container 组件，可以对子组件进行尺寸约束：

```dart
return new Center(
  child: new ConstrainedBox(
    constraints: BoxConstraints(maxWidth:100,maxHeight:100),
    child: Container(
      color: Colors.red,
    ),
  ),
);
```

**抽屉布局** 之前学到可以通过 Scaffold 脚手架添加抽屉视图，即使用 Column 布局创建抽屉视图。在 Flutter 组件库中还提供了一个 Drawer 组件，与 ListView 组件组合进行使用：

```dart
drawer: Drawer(
  child: ListView(
    children:<Widget>[
      Text("列表选项1"),
      Text("列表选项2"),
      Text("列表选项3"),
    ],
  ),
)
````

<br/>

#### 高级用户交互

**Checkbox 复选按钮**

```dart
bool selected = true;
Center(
  child: Column(
    children: <Widget>[
      Checkbox(value: selected, onChanged:(select){
        print(select)；
        setState((){
          selected = select;
        });
      }),
      Checkbox(value: true, onChanged: null),
      Checkbox(value: false, onChanged: null),
    ],
  ),
),
```

**Radio 单选按钮**

```dart
var radioValue = 1;
Column(
  children: <Widget>[
    Radio(activeColor: Colors.red,value:1,groupValue:this.radioValue,
    onChanged:(value){
      //setState方法的作用是通知Flutter框架，有状态发生了改变
      //Flutter框架收到通知后，会执行build方法来根据新的状态重新构建界面
      setState((){
        radioValue = value;
      });
    }),
    Radio(value:2,groupValue: this.radioValue,onChanged:(value){
      setState((){
        radioValue = value;
      });
    }),
    Radio(value:3,groupValue: this.radioValue,onChanged:(value){
      setState((){
        radioValue = value;
      });
    }),
  ],
)
```

**Switch 切换按钮**

```dart
import 'package:flutter/material.dart';
class SwitchView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return _SwitchViewState();
  }
}
class _SwitchViewState extends State<SwitchView> {
  bool selected = true;
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Switch 组件"),
      ),
      body: Switch(value: selected, onChanged: (value){
        setState((){
          selected = value;
        });
      },)
    );
  }
}
```

需要注意，只要是可进行用户交互的组件，都需要将其封装为状态，StatefulWidget 组件是只可以通过用户交互改变状态的组件。Switch 组件常用属性有 activeColor 开关开启的颜色，activeTrackColor 轨道颜色等等。

**Slider 滑块按钮**

```dart
class _SliderViewState extends State<SliderView> {
  double sliderValue = 0;
  @override
  Widget build(BuildContext context) {
    return Scaffold(,
      appBar: AppBar(
        title: Text("Slider 组件")
      ),
      body: Slider(onChanged: (v){
        setState((){
          sliderValue = v;
        });
      },value:sliderValue)
    );
  }
}
```

**日期时间选择弹窗**

```dart
import 'package:flutter/material.dart';

class DatePickerView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("DatePicker 组件"),
      ),
      body: RaisedButton(child: Text("点我"),
      onPressed: (){
        showDatePicker(context: context, initialDate: DateTime.now(),
        firstDate: DateTime(2009,5,1,11,21,33),
        lastDate:DateTime(2029,5,1,11,21,33)).then((DateTime val) {print(val);
        });
        //showTimePicker(context: context,initialTime: TimeOfDay.now());
        //弹出时间选择弹窗。
      },)
    );
  }
}
```

上面代码创建了一个功能按钮，当单击按钮时弹出日期选择组件，showDatePicker 方法将返回一个 Future 对象用来进行异步编程，当用户选择了一个日期后将会回调 then 方法中定义的回调函数。showDatePicker 方法中参数的意义：context 页面构建上下文，initialDate 初始化选中日期，first/lastDate 组件起始/结束日期，initialDatePickerMode 组件的 day, year 选择模式，locale 本地化设置。

**弹窗组件**

SimpleDialog 组件是 Flutter 提供的自定义弹窗组件，当用户触发了某些交互时间时，使用 showDialog 方法弹出窗口：

```dart
RaisedButton(
  child: Text("弹出弹窗"),
    onPressed: (){
      showDialog(context: context,
      child:
      SimpleDialog(
        contentPadding: EdgeInsets.all(10.0),
        title: Text('我是标题'),
        children:<Widget>[
          Text('内容1’)，
          Text('内容2'),
          Text('内容3'),
        ]
      ));
    }
)
```

Flutter 专门封装了一个警告弹窗组件 AlertDialog :

```dart
RaisedButton(
  child: Text("弹出窗口"),
  onPressed: (){
    showDialog(context: context,
    child:
    AlertDialog(
      title: Text("警告"),content: Text("未满18岁禁止入内"),
      actions:<Widget>[RaisedButton(child: Text("按钮1")),
      RaisedButton(child: Text("按钮2"))],
    ),);
  }
)
```

showModalBottomSheet 方法在当前页面中弹出自定义的底部抽屉视图：

```dart
RaisedButton(
  child: Text("弹出窗口"),
  onPressed: (){
    showModalBottomSheet(
      context: context,
      builder:(BuildContext context) {
        return Container(
          height: 300.0,
          child: Text("底部抽屉"),
        );
      },
    ).then((val) {
      print("收起");
    });
  }
)
```

SnackBar 组件弹出底部通知栏，在默认情况下通知栏显示一段时间后自动消失:

```dart
Scaffold(
  appBar: AppBar(
    title: Text(widget.title),//?
  ),
  body: Builder(builder: (BuildContext context){
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children:<Widget>[
          RaisedButton(child: Text("通知"),onPressed:(){
            final snackBar = SnackBar(content: Text("这是一个 SnackBar"));
            Scaffold.of(context).showSnackBar(snackBar);
          },),
        ],
      ),
    );
  })
);
```

**拓展/折叠面板**
可以随用户的交互折叠或展开，通常会组合使用 ExpansionPanel 和 ExpansionPanelList：

```dart
ExpansionPanelList(
  children:[
    ExpansionPanel(
      headerBuilder: (BuildContext context, bool isExpanded) {
        return Container(
          padding: EdgeInsets.all(16),
          child: Text("拓展列表"),
        );
      },
      body: Container(
        padding: EdgeInsets.all(16),
        width: double.infinity,
        child: Text("选项A"),
      ),
      isExpanded: true //用来设置当前是否展开
    ),
    ExpansionPanel(
      headerBuilder:(BuildContext context,bool isExpanded) {
        return Container(
          padding: EdgeInsets.all(16),
          child: Text("拓展列表"),
        );
      },
      body: Container(
        padding: EdgeInsets.all(16),
        width: double.infinity,
        child: Text("选项A"),
      ),
      isExpanded: false
    )
  ],
)
```

**Card 组件**

```dart
Card(
  child: Container(
    width: MediaQuery.of(context).size.width - 60,
    height: 300,
  ),
  color :Colors.red,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(10)),
    ),
    borderOnForeground: false,
    margin: EdgeInsets.all(30),
    elevation: 15,
)
```

```dart
import 'package:flutter/material.dart';

void main() {
  runApp(MaterialApp(
    title:'Dolphin 按摩室',
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
        title: Text('Dolphin 按摩室'),
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
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            Card(
              child: Container(
                child: Text("捏脚",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.white, fontSize: 20, height: 3.5)),
                width: MediaQuery.of(context).size.width - 80,
                height: 100,
              ),
              color: Colors.blue[200],
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
              borderOnForeground: false,
              margin: EdgeInsets.all(30),
              elevation: 15,
            ),
            Card(
              child: Container(
                child: Text("捏腿",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.white, fontSize: 20, height: 3.5)),
                width: MediaQuery.of(context).size.width - 80,
                height: 100,
              ),
              color: Colors.orange[200],
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
              borderOnForeground: false,
              margin: EdgeInsets.all(30),
              elevation: 15,
            ),
            Card(
              child: Container(
                child: Text("敲背",
                    textAlign: TextAlign.center,
                    style: TextStyle(
                        color: Colors.white, fontSize: 20, height: 3.5)),
                width: MediaQuery.of(context).size.width - 80,
                height: 100,
              ),
              color: Colors.red[200],
              shape: RoundedRectangleBorder(
                borderRadius: BorderRadius.all(Radius.circular(10)),
              ),
              borderOnForeground: false,
              margin: EdgeInsets.all(30),
              elevation: 15,
            )
          ],
        ),
        ),
      );
  }
}
```

通常情况下卡片会配合列表使用，并可以用 Divider 创建分割线。

```dart
Divider(
  height: 2,
  indent: 30,
  endIndent: 30,
  color: Colors.black26,
),
```

**ToolTip** 组件：为其他组件或某个功能提供提示、解释。

```dart
Tooltip(
  child: Text("工具提示"),
  message: "提示信息",
)
```

进度条组件有两种，分别是线形和圆形，并且可以配上动画渐变：

```dart
Column(
  children: <Widget>[
    LinearProgressIndicator(
      backgroundColor: Colors.red,
      value: 0.1,
    ),
    CircularProgressIndicator(
      backgroundColor: Colors.red,
      value: 0.2,
      strokeWidth: 3,
    )
  ],
)
```

<br/>

#### 绘制组件

实际开发中需要对组件的渲染进行特殊绘制或修饰，例如透明度、裁剪等等。

**Opacity 组件**

控制渲染内容的透明度，通过 opacity 属性设置透明度比例，取值范围 0~1 。

```dart
Opacity(
  child: Image.asset("assets/iconImg.png"),
  opacity: 0.5,
)
```

#### 可滚动组件

GridView 组件是非常强大的二维流式布局滚动视图，下面的代码实现了一个简单的 GridView 二维布局：

```dart
GridView.builder(itemCount: 10,gridDelegate:
SliverGridDelegateWithFixedCrossAxisCount(crossAxisCount:4,mainAxisSpacing:10,
childAspectRatio:1,crossAxisSpacing:10),itemBuilder:(BuildContext context,int index){
  return Container(
    color: Colors.red,
    child: Text("第${index}个元素"),
  );
})
```

**Table 组件**：创建表格视图

```dart
Table(
  border: TableBorder.all(
    color: Colors.grey,
    width: 2,
    style: BorderStyle.solid,
  ),
  children: [
    TableRow(children:[
      TableCell(
        child: Text("姓名"),
      ),
      TableCell(
        child: Text("课程"),
      )
    ]),
    TableRow(children:[
      TableCell(
        child: Text("超仑"),
      ),
      TableCell(
        child: Text("Flutter 教程"),
      )
    ])
  ]
)
```

**Flow 流式布局组件**

Flow 流式布局组件是一种更加灵活的布局组件，其允许开发者根据需要自行控制其子组件的布局位置：

```dart
import 'package:flutter/material.dart';

class FlowView extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("Flow 组件"),
      ),
      body: Flow(
        children: <Widget>[
          Container(child: Text("Item1"),color:Colors.red[150],width:100,height:100,),
          Container(child: Text("Item2"),color:Colors.orange[150],width:100,height:100),
          Container(child: Text("Item3"),color:Colors.blue[150],width:100,height:100),
        ],
        delegate: _MyDelegate(),
      )
    );
  }
}

class _MyDelegate extends FlowDelegate {
  @override
  void paintChildren(FlowPaintingContext context) {
    var x = 0.0;
    var y = 100.0;
    for (int i = 0; i < context.childCount; i++) {
      var w = context.getChildSize(i).width + x;
      if (w < context.size.width) {
        context.paintChild(i,
        transform: Matrix4.translationValues(x,y,0.0));
        x = w;
        y += 100;
      }else {
        x = 0;
        y += context.getChildSize(i).height;
        context.paintChild(i,
        transform: Matrix4.translationValues(x,y,0.0));
        x += context.getChildSize(i).width;
      }
    }
  }
  @override
  bool shouldRepaint(FlowDelegate oldDelegate) {
    return true;
  }
}
```

Flow 组件通过其 delegate 属性来控制布局，delegate 属性需要设置为继承于 FlowDelegate 类的实例对象。在 FlowDelegate 的子类中，通过重写 paintChildren 方法来灵活对布局进行控制十分方便。

<br/>

### Flutter 实战

#### 基础 Widget

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

#### 处理 Taps

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

**添加 Material 触摸水波效果**

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

#### 导航 Navigator

使用 Navigator 完成页面跳转。

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

#### 路由管理 Route

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

#### 异常捕获 Error

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

#### 组件状态管理

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

void main() => runApp(MaterialApp(title: "State", home: TapboxB()));

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
//The parameter 'onChanged' is required.？？？
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

void main() => runApp(MaterialApp(title: "State", home: TapboxC()));

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

**输入框和表单**

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

**表单 Form**

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

#### 布局类组件

Flutter 没有对 Widget 进行分类，这里进行功能区分以方便讨论与记忆。

不同的布局类组件对子组件排版(layout)方式不同，Element 是最终的绘制树，是通过 Widget.createElement() 创建的，Widget 其实就是 Element 的配置数据。

Widget 分为三类，没有子节点的(如Image)，包含一个子Widget（ConstrainedBox)，包含多个子Widget的(一般都有children参数如Row,Column和Stack)。

布局类组件就是直接或间接继承 MultiChildRenderObjectWidget 的 Widget，RenderObjectWidget 的类中定义了创建、更新 RenderObject 的方法，子类必须实现他们。

对于布局类组件来说，布局算法都是通过对应的 RenderObject 对象来实现的，比如 Stack (层叠布局) 对应的 RenderObject 就是 RenderStack ，而层叠布局的实现在 RenderStack 中。

#### 容器类组件

容器类 Widget 和 布局类 Widget 都作用于其子 Widget ，不同的是：
+ 布局类通常接收一个 Widget 数组，直接或间接继承自 MultiChildRenderObjectWidget；而容器类 Widget 一般只需要接收一个子 Widget (直接间接继承或包含 SingleChildRenderObjectWidget)
+ 布局类 Widget 是按照一定排列方式来对其子 Widget 进行排列，而容器类 Widget 一般只包含子 Widget 并对其添加一些修饰、变换或限制。 

#### 滚动组件


#### 功能组件

不会影响 UI 布局及外观的 Widget，通常具有一定的功能，如事件监听、数据存储等，比如 FocusScope 焦点控制，PageStorage 数据存储，NotificationListener 事件监听等等。

<br/>

#### 事件处理与通知

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

#### 手势识别

