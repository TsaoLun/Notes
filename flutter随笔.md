## Flutter 随笔

<br/>

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

**File类**：需要导入 Dart 的 io 模块，即在头部添加 `import 'dart:io';`

```dart
Image.file(new File("/src/iconImg.jpeg"))
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
| body                    | 组件内容         | Widget 对象 |
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
