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
      title: 'Flutter Demo',
      theme: ThemeData(
        PrimarySwatch: Colors.blue,
        visualDensity: VisualDensity.adaptivePlatformDensity,
      ),
      home: MyHomePage('title: Flutter Demo Page'),
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
Image 组件有多种属性配置，width 和 height 属性用于配置图片组件的尺寸，alignment 属性用来设置对齐方式，fit 属性用来设置图片的填充方式

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
#### Buttun 组件
