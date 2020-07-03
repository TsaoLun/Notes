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
