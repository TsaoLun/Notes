#  Problem Solving with Algorithms and Data Structures

<br/>

## 导论

在面向对象编程语言中，类都是对数据的构成（状态）与行为的描述，数据项被称为对象，一个对象就是类的一个实例。

赋值语句创建变量，赋值运算符将变量名与值关联，变量存的是指向数据的引用。

```python
#Python会先计算右侧表达式的结果，将指向该数据对象的引用赋给左侧变量名
theSum = 0
theSum = theSum + 1
theSum #1
```

当数据的类型发生改变，赋值语句就改变变量的引用。

```python
#变量类型从整型变成布尔类型，体现了动态特性
theSum = True
theSum #True
```

列表是指向数据对象的引用的有序集合，通过重新赋值修改会改变地址，通过切片等自带方法修改则地址不变。

```python
x=[1,2,3]
y=x
x[1]=0
y #[1, 0, 3]
```
实践：通过**牛顿迭代法**实现平方根函数

```python
#newguess=1/2(oldguess+n/oldguess)
def squareroot(n):
    root = n/2
    for k in range(20):
        root = 0.5*(root+n/root)
    return root
```
面向对象：定义类以实现**精准分数表示**

```python
class Fraction:
    def __init__(self, top, bottom):
        self.num=top
        self.den=bottom

#创建实例
myfraction = Fraction(3,5)
print(myfraction) #<__main__.Fraction object at 0x7f202c6227b8>
```
print函数要求对象将自己转换成可以被写到输出端的字符串，而myfraction只能显示储存在变量中的实际引用（地址本身）

```python
#方法一是定义一个show方法将Fraction对象打印
class Fraction:
    def __init__(self, top, bottom):
        self.num=top
        self.den=bottom
    def show(self):
        print(self.num,'/',self.den)

myfraction = Fraction(3,5)
myfraction.show() #3 / 5
```

```python
#方法二告诉Fraction类如何将自己转换成字符串
#python所有类都存在的标准方法__str__，这里需要重写默认实现
class Fraction:
    def __init__(self, top, bottom):
        self.num=top
        self.den=bottom
    def __str__(self):
        return str(self.num) + '/' +str(self.den)

myfraction = Fraction(3,5)
print(myfraction) #3/5

myfraction.__str__() #'3/5'
str(myfraction) #'3/5'
```

```python
#加号无法处理Fraction类，接下来重写Fraction类的__add__方法
#a/b与c/d相加的结果是(ad+cb)/bd，分子是ad+cb，分母是bd
class Fraction:
    def __init__(self, top, bottom):
        self.num=top
        self.den=bottom
    def __str__(self):
        return str(self.num) + '/' +str(self.den)
    def __add__(self, fraction2):
        newnum = self.num*fraction2.den+self.den*fraction2.num
        newden = self.den*fraction2.den
        return Fraction(newnum,newden)

f1 = Fraction(1,4)
f2 = Fraction(1,2)
f3 = f1+f2
print(f3) #6/8 没有化成最简
```
欧几里得算法求最大公因数：
1. 对于m与n，如果m能被n整除则最大公因数是n；
2. 如果不能,则结果是n与[m除以n余数]的最大公因数(回到1形成迭代)
```python
def gcd(m,n):
    while m%n != 0:
        oldm = m
        oldn = n
        m = oldn
        n = oldm%oldn
    return n
```

```python
class Fraction:
    def __init__(self, top, bottom):
        self.num=top
        self.den=bottom
    def __str__(self):
        return str(self.num) + '/' +str(self.den)
    def __add__(self, fraction2):
        newnum = self.num*fraction2.den+self.den*fraction2.num
        newden = self.den*fraction2.den
        common = gcd(newnum, newden)
        return Fraction(newnum//common,newden//common)

f1 = Fraction(1,4)
f2 = Fraction(1,2)
f3 = f1+f2
print(f3) #3/4
```

```python
#通过重写__eq__方法实现深相等(浅相等为同一引用)
class Fraction:
    def __init__(self, top, bottom):
        self.num=top
        self.den=bottom
    def __str__(self):
        return str(self.num) + '/' +str(self.den)
    def __add__(self, fraction2):
        newnum = self.num*fraction2.den+self.den*fraction2.num
        newden = self.den*fraction2.den
        common = gcd(newnum, newden)
        return Fraction(newnum//common,newden//common)
    def __eq__(self, other):
        firstnum = self.num*other.den
        secondnum = other.num*self.den
        return firstnum == secondnum
```
面向对象：**继承** ( IS-A关系 )
列表字符串元组从有序集合继承了共同的数据组织与操作,并通过额外特征彼此区分。为探索继承的层次结构，实现逻辑门继承结构: AND gate, OR gate, NOT gate.

```python
#最通用的类LogicGate，有一个用于识别的标签以及一个输出。还需要方法获得逻辑门标签，以及方法进行逻辑运算以获得输出。
class LogicGate:
    def __init__(self,n):
        self.label = n
        self.output = None
    def getLabel(self):
        return self.label
    def getOutput(self):
        self.output = self.performGateLogic()
        #待定义运算逻辑，交给不同的继承层次结构解决
        return self.output

#使用super函数调用父类并初始化继承项,再构造独有数据并初始化
class BinaryGate(LogicGate):
    def __init__(self, n):
        super().__init__(n)
        self.pinA = None
        self.pinB = None

    def getPinA(self):
        return int(input("Pin A"+self.getLabel()+'...'))
        #调用getLabel()实现getPinA方法

    def getPinB(self):
        return int(input("Pin B"+self.getLabel()+'...'))
        #调用getLabel()实现getPinB方法

class UnaryGate(LogicGate):
    def __init__(self, n):
        super().__init__(n)
        self.pin = None

    def getPin(self):
        return int(input("Pin"+self.getLabel()+'...'))
```

```python
#实现AND gate
class AndGate(BinaryGate):
    def __init__(self,n):
        super().__init__(n)
    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if a==1 and b==1:
            return 1
        else:
            return 0
```

```python
#实现OR gate
class OrGate(BinaryGate):
    def __init__(self,n):
        super().__init__(n)
    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if a==0 and b==0:
            return 0
        else:
            return 1
```

```python
#实现NOT gate
class NotGate(UnaryGate):
    def __init__(self,n):
        super().__init__(n)
    def performGateLogic(self):
        i = self.getPin
        if i == 1:
            return 0
        else:
            return 1
#用于识别的标签n有什么作用？
```
为了将逻辑门连接，要实现Connector类。每个连接器对象包含fromgate和togate两个逻辑门实例。并给之前的逻辑门增添setNextPin方法以使每个togate能选择适当输入。
```python
#面向对象，Connector与LogicGate是HAS-A关系，包含但不继承。
class Connector:
    def __init__(self, fgate, tgate):
        self.fromgate = fgate
        self.togate = tgate
        
        tgate.setNextPin(self)
    def getFrom(self):
        return self.fromgate
    def getTo(self):
        return self.togate
```

```python
class BinaryGate(LogicGate):
    def __init__(self, n):
        super().__init__(n)
        self.pinA = None
        self.pinB = None

    def getPinA(self):
        return int(input("Pin A"+self.getLabel()+'...'))

    def getPinB(self):
        return int(input("Pin B"+self.getLabel()+'...'))
    
    #增加setNextPin，默认选择PinA，若已连接则选PinB，都选了则无法连接
    def setNextPin(self, source):
        if self.pinA == None:
            self.pinA = source
        else:
            if self.pinB == None:
                self.pinB = source
            else:
                raise RuntimeError("Error: No Empty Pins")

class UnaryGate(LogicGate):
    def __init__(self, n):
        super().__init__(n)
        self.pin = None

    def getPin(self):
        return int(input("Pin"+self.getLabel()+'...'))
    
    #同样增加setNextPin，逻辑与上面类似
    def setNextPin(self, source):
        if self.pin == None:
            self.pin = source
        else:
            raise RuntimeError("Error: No Empty Pins")
```
改变了setNextPin后，输入来源有两个：外部以及上一个逻辑门，继续对getPinA, getPinB, getPin进行修改。若输入没有与任何逻辑门连接，那就要求用户输入；若有连接，就访问该连接并获得fromgate的输出值。

```python
class LogicGate:
    def __init__(self,n):
        self.label = n
        self.output = None
    def getLabel(self):
        return self.label
    def getOutput(self):
        self.output = self.performGateLogic()
        return self.output

class Connector:
    def __init__(self, fgate, tgate):
        self.fromgate = fgate
        self.togate = tgate
        
        tgate.setNextPin(self)
    def getFrom(self):
        return self.fromgate
    def getTo(self):
        return self.togate

class BinaryGate(LogicGate):
    def __init__(self, n):
        super().__init__(n)
        self.pinA = None
        self.pinB = None

    #判断输入或传入getFrom()
    def getPinA(self):
        if self.pinA == None:
            return int(input("Enter Pin A: "+self.getLabel()+'--->'))
        else:
            return self.pinA.getFrom().getOutput()

    def getPinB(self):
        if self.pinB == None:
            return int(input("Enter Pin B: "+self.getLabel()+'--->'))
        else:
            return self.pinB.getFrom().getOutput()
    
    def setNextPin(self, source):
        if self.pinA == None:
            self.pinA = source
        else:
            if self.pinB == None:
                self.pinB = source
            else:
                raise RuntimeError("Error: No Empty Pins")

class UnaryGate(LogicGate):
    def __init__(self, n):
        super().__init__(n)
        self.pin = None

    def getPin(self):
        if self.pin == None:
            return int(input("Enter Pin: "+self.getLabel()+'--->'))
        else:
            return self.pin.getFrom().getOutput()
    
    def setNextPin(self, source):
        if self.pin == None:
            self.pin = source
        else:
            raise RuntimeError("Error: No Empty Pins")

class AndGate(BinaryGate):
    def __init__(self,n):
        super().__init__(n)
    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if a==1 and b==1:
            return 1
        else:
            return 0

class OrGate(BinaryGate):
    def __init__(self,n):
        super().__init__(n)
    def performGateLogic(self):
        a = self.getPinA()
        b = self.getPinB()
        if a==0 and b==0:
            return 0
        else:
            return 1

class NotGate(UnaryGate):
    def __init__(self,n):
        super().__init__(n)
    def performGateLogic(self):
        i = self.getPin()
        if i == 1:
            return 0
        else:
            return 1
```

```python
g1 = AndGate("G1")
g2 = AndGate("G2")
g3 = OrGate("G3")
g4 = NotGate("G4")
c1 = Connector(g1, g3)
c2 = Connector(g2, g3)
c3 = Connector(g3, g4)

g4.getOutput()
"""
Enter Pin A: G1--->0
Enter Pin B: G1--->1
Enter Pin A: G2--->1
Enter Pin B: G2--->1
0
"""
```

<br/>

## 算法分析

#### 大$O$记法
常见大O函数排序：常数、对数、线性、对数线性、平方、立方、指数
$T(n)=3n^2+2n+4$
在 $T(n)$ 中 $n^2$ 起主导作用，所以这段代码的时间复杂度是 $O(n^2)$

异序词检测，编写一个布尔函数，接受两个字符串并判断是否是异序词：

```python
#lun
def eqmix(str1,str2):
    strx = list(str2)
    try:
        for i in str1:
            strx.remove(i)
        if strx == []:
            return 1
        else:
            return 0
    except ValueError:
        return 0 #eqmix('python'*10000,'typhon'*10000) --> 0.39s
```
+ 清点法：

```python
#sucks
def anagramSolution1(s1, s2):
    alist = list(s2)

    pos1 = 0
    stillOK = True

    while pos1 < len(s1) and stillOK:
        pos2 = 0
        found = False
        while pos2 < len(alist) and not found:
            if s1[pos1] == alist[pos2]:
                found = True
            else:
                pos2 += 1
            
        if found:
            alist[pos2] = None
        else:
            stillOK = False
            
        pos1 = pos1 + 1
        
    return stillOK #anagramSolution1('python'*10000,'typhon'*10000) --> 243.7338s
```
对于s1中的n个字符，检查每一个时都要遍历s2中的n个字符，访问次数即1到n之和：

$\sum_{i=1}^n{i}=\frac{n(n+1)}{2}=\frac{1}{2}n^2+\frac{1}{2}n$ ，时间复杂度为$O(n^2)$

+ 排序法:

```python
#将字符串转化为列表，再使用内建sort方法对列表排序
def anagramSolution2(s1,s2):
    alist1 = list(s1)
    alist2 = list(s2)

    alist1.sort()
    alist2.sort()
    
    pos = 0
    matches = True

    while pos < len(s1) and matches:
        if alist1[pos] == alist2[pos]:
            pos = pos + 1
        else:
            matches = False
        #这个过程和"=="原理相同

    return matches #anagramSolution2('python'*10000,'typhon'*10000) --> 0.0233s
```
虽然只有一次遍历，但两次调用sort()方法使得时间复杂度稍稍超出$O(n)$

+ 蛮力法，生成s1所有可能的组合，即 n! ，当n较大时增长比$2^n$还快，排除。

+ 计数法，创建两个计数器列表，每个列表有26个计数器

```python
def anagramSolution4(s1, s2):
    c1 = [0] * 26
    c2 = [0] * 26
    
    for i in range(len(s1)):
        pos = ord(s1[i])-ord('a')
        c1[pos] = c1[pos] + 1
    #ord()函数以一个字符（长度为1的字符串）作为参数，返回对应的ASCII数值，或者Unicode数值。
    
    for i in range(len(s2)):
        pos = ord(s2[i])-ord('a')
        c2[pos] = c2[pos] + 1
    
    j = 0
    stillOK = True
    while j < 26 and stillOK:
        if c1[j] == c2[j]:
            j = j+1
        else:
            stillOK = False

    return stillOK #anagramSolution4('python'*10000,'typhon'*10000) -->0.0203s
```
前两次循环都是n，第三个循环为26，因为不存在循环嵌套，$T(n)=2n+26$，即$O(n)$
虽然这个方法执行时间是线性的，但需要额外空间存储计时器，即用空间换时间。如果有数百万字符，计算资源的问题就会出现。

#### 数据结构性能

**列表**

两个常见操作是索引和给某个位置赋值，无论列表多长，这两个操作所花的时间恒定，即常数阶。

另一种常见的操作是加长列表。有两种方式，要么采用追加方法，要么执行连接操作。追加方法是常数阶段，如果待连接列表的长度是k，那么连接操作的时间复杂度就是$O(k)$ 。

```python
def test1():
    l = []
    for i in range(1000):
        l = l + [i] #连接操作

def test2():
    l = []
    for i in range(1000):
        l.append(i) #追加方法

def test3():
    l = [i for i in range(1000)]
    #列表解析式

def test4():
    l = list(range(1000)) 
    #列表构造器调用range函数
```
使用timeit模块实现跨平台计时：创建Timer对象，第一个参数是待计时的Python语句，第二个参数是建立测试的语句，可选参数number为语句执行次数，默认是100万次。

```python
from timeit import Timer

t1 = Timer("test1()", "from __main__ import test1")
print("concat", t1.timeit(number=1000), "milliseconds")

t2 = Timer("test2()", "from __main__ import test2")
print("append", t2.timeit(number=1000), "milliseconds")

t3 = Timer("test3()", "from __main__ import test3")
print("comprehension", t3.timeit(number=1000), "milliseconds")

t4 = Timer("test4()", "from __main__ import test4")
print("list range", t4.timeit(number=1000), "milliseconds")

"""
concat 0.8996472359995096 milliseconds
append 0.05303773900050146 milliseconds
comprehension 0.025937612999769044 milliseconds
list range 0.014922981000381697 milliseconds
"""
```

`from __main__ import test1` 将 test1 函数从 `__main__` 命名空间导入到timeit设置计时的命名空间，以在一个干净的环境中运行计时测试，以免某些变量干扰函数的性能。

>pop()--O(1), pop(i)、切片删除反转连接--O(n), 排序--O(nlogn), 连接--O(k), 乘法--O(nk)

```python
#pop的性能分析
import timeit

popzero = timeit.Timer("x.pop(0)","from __main__ import x")
popend = timeit.Timer("x.pop()","from __main__ import x")

x = list(range(2000000))
popzero.timeit(number=1000) #1.235624552000445

x = list(range(2000000))
popend.timeit(number=1000) #5.850999968970427e-05
```
pop(0)和pop()存在极大性能差异，接下来查看两者时间复杂度

```python
popzero = Timer("x.pop(0)", "from __main__ import x")
popend = Timer("x.pop()", "from __main__ import x")
print("pop(0) pop()")

for i in range(1000000, 100000001, 1000000):

    x = list(range(i))
    pt = popend.timeit(number=1000)

    x = list(range(i))
    pz = popzero.timeit(number=1000)

    print("%15.5f, %15.5f " %(pz,pt))
```
![avatar](images/popzero.svg)
可以看出列表越长，pop(0)耗时越长，而pop()则很稳定。

**字典**
字典的取值操作和赋值操作都是常数阶，另一个重要的字典操作就是包含（检查某个键是否在字典中），也是常数阶。字典的大$O$效率如下：
>复制--O(n), 取值--O(1), 赋值--O(1), 删除--O(1), 包含--O(1), 遍历--O(n)

创建一个列表随机选取数看是否在列表中，观察随着列表的变长耗时的变化。再以数字为键创建字典重复上述实验：
```python
#比较列表和字典的包含操作
import timeit
import random

leng = []
lt = []
dt = []

for i in range(10000, 1000001, 20000):
    t = timeit.Timer("random.randrange(%d) in x" % i,
    "from __main__ import random, x")

    x = list(range(i))
    lst_time = t.timeit(number=1000)

    x = {j:None for j in range(i)}
    d_time = t.timeit(number=1000)

    leng.append(i)
    lt.append(lst_time)
    dt.append(d_time)
```
![avatar](images/dictlist.svg)
即列表的包含操作在耗时上的增长是线性的，而字典则是恒定的。

小结：算法分析师一种独立于实现的算法度量方法，大$O$记法使得算法可以根据随问题规模增长而起主导作用的部分进行归类

<br/>

## 基本数据结构

线性数据结构：有序的数据集合，其元素的顺序取决于添加顺序或移除顺序，如栈、队列、双端队列和列表。区分它们的是元素的添加方式和移除方式，尤其是添加操作和移除操作发生的位置。

<br/>

#### 栈

有序集合，添加操作和移除操作总发生在同一端，即顶端，另一端被称为底端。

排序方式为 LIFO，last-in first-out 即后进先出，是一种基于在集合中的时间来排序的方式，最近添加的元素靠近顶端而旧元素靠近底端。考虑到栈添加元素和移除元素的反转特性，可以在如 URL 的存放和返回浏览中用到该结构。

栈抽象数据类型由下面的结构和操作定义：
+ stack() 创建一个空栈
+ push(item) 将一个元素添加到栈的顶端，需要参数 item，且无返回值
+ pop() 将栈顶端的元素移除，返回该元素并修改栈的内容
+ peek() 返回栈顶端的元素，不修改栈内容
+ isEmpty() 检查栈是否为空，返回布尔值
+ size() 返回栈中元素的数目，返回整数

创建新类并通过方法实现栈的操作，使用原生集合中的列表：

```python
class Stack:

    def __init__(self):
        self.items = []
    
    def isEmpty(self):
        return self.items == []

    def push(self, item):
        self.items.append(item)
    
    def pop(self):
        return self.items.pop()
    
    def peek(self):
        return self.items[len(self.items)-1]
    
    def size(self):
        return len(self.items)
```
展示栈操作及其返回结果：

```python
s = Stack()
s.isEmpty() #True

s.push(4)
s.push('dog')
s.peek() #'dog'

s.push(True)
s.size() #3

s.isEmpty() #False

s.push(8.4)
s.pop() #8.4
s.pop() #True

s.size() #2
```
也可以选择将列表的头部作为栈的顶端，此时要用到 pop() 方法和 insert() 方法访问下标为0的元素：

```python
class Stack:

    def __init__(self):
        self.items = []

    def isEmpty(self):
        return self.item == []

    def push(self, item):
        self.items.insert(0, item)

    def pop(self):
        return self.items.pop(0)
    
    def peek(self):
        return self.items[0]
    
    def size(self):
        return len(self.items)
```
改变抽象数据类型的实现却保留其逻辑特征，这种能力体现了抽象思想。不过上述第二种实现的性能受制于栈中的元素个数，因为 insert(0) 和 pop(0) 的时间复杂度都是 $O(n)$ 。

接下来运用栈来解决括号匹配问题，遇到左括号便通过push将其加入栈中，遇到右括号就调用pop操作。在处理完匹配的括号串之后，栈应该是空的。

```python
def parChecker(symbolString):

    s = Stack()
    balanced = True
    index = 0

    while index < len(symbolString) and balanced:
        symbol = symbolString[index]

        if symbol == "(":
            s.push(symbol)
        else:
            if s.isEmpty():
                balanced = False
            else:
                s.pop()

        index = index + 1

    if balanced and s.isEmpty():
        return True
    else:
        return False

"""
x = "()(()"
parChecker(x) #False
"""
```
接下来进行拓展，实现符号类型匹配。我们在右符号出现时，调用辅助函数来匹配：

```python
def parChecker(symbolString):      
    s = Stack()

    balanced = True
    index = 0

    while index < len(symbolString) and balanced:
        symbol = symbolString[index]

        if symbol in "([{":
            s.push(symbol)
        else:
            if s.isEmpty():
                balanced = False
            else:
                top = s.pop()
                if not matches(top, symbol):
                    balanced = False
        
        index = index + 1

    if balanced and s.isEmpty():
        return True
    else:
        return False

def matches(open, close):
    opens = "([{"
    closers = ")]}"

    return opens.index(open) == closers.index(close) #字符串的index方法？

#测试
parChecker("[](}") 
#False
```
几乎所有记法都有需要正确匹配和嵌套的符号，可见在处理编程语言的语法结构时，栈是十分重要的数据结构。

**将十进制转换为二进制**

$233=2\times10^2+3\times10^1+3\times10^0$
$1\times2^7+1\times2^6+1\times2^5+0\times2^4+1\times2^3+0\times2^2+0\times2^1+1\times2^0$

通过“除以2”算法使用栈以保存二进制结果的每一位，将rem值反转即对应的二进制数：

`233//2=116(rem=1), 116//2=58(rem=0), 58//2=29(rem=0), 29//2=14(rem=1)`

`14//2=7(rem=0), 7//2=3(rem=1), 3//2=1(rem=1), 1//2=0(rem=1)`

```python
def divideBy2(decNumber):
    remstack = Stack()

    while decNumber > 0:
        rem = decNumber % 2
        remstack.push(rem)
        decNumber = decNumber // 2

    binString = ""
    while not remstack.isEmpty():
        binString = binString + str(remstack.pop())

    return binString

#测试
divideBy2(233)
#'11101001'
```
拓展到八进制和十六进制，注意余数要十六进制即添加ABCDEF：

```python
def baseConverter(decNumber, base):
    digits = "0123456789ABCDEFG"
    remstack = Stack()

    while decNumber > 0:
        rem = decNumber % base
        remstack.push(digits[rem])
        decNumber = decNumber // base

    binString = ""
    while not remstack.isEmpty():
        binString = binString + str(remstack.pop())

    return binString

#测试
baseConverter(223, 8) #'337'
baseConverter(223, 16) #'DF'
```

**前序、中序和后序表达式**

我们平时书写习惯为中序表达式，A + B * C 的前序表达式为 + A * B C ,乘号出现在B和C之前代表它的优先级高于加号。上式对应的后序表达式为 A B C * + ，乘号跟随B和C出现意味它的优先级比加号高。

现在来看中序表达式，需要用括号来保证优先级。而前序可以通过前提星号 * + A B C 以改变优先级，后序可以通过 A B + C * 实现同样的优先级改变。鉴于此，中序表达式是最不理想的算数表达式。

>问题 ： 为什么 A+B+C+D 前序表达式为 +++A B C D ，后序为 A B+C+D+ 而不是 A B C D +++ ？ 因为的确有差异，前者先计算A+B而后者会先计算C+D

转换任意复杂度的表达式：首先使用完全括号表达式，以括号表示优先级高低，再将每个子表达式的运算符移动到对应阔后的固定侧，前序为左后序为右。

```C
(A+B)*C-(D-E)*(F+G)`-->(((A+B)*C)-((D-E)*(F+G)))

//前序表达式
-*+ABC*-DE+FG

//后序表达式
AB+C*DE-FG+*-
```
接下来实现转换表达式的算法，在转换到后序的过程中，由于运算符右边操作数还未出现，以此需要将运算符保存在某处。鉴于 A + B * C 的后序表达式 A B C * + 将符号的保存顺序反转，可以用栈来存储。对于 （A + B）* C 的后序则为 A B + C * ，故遇到左括号时需要将其保存以表示接下来会遇到高优先级的运算符，当右括号出现时确定该运算符的位置，将运算符从栈中取出。

后序标记串的步骤：
1. 创建用于保存运算符的空栈opstack，以及用于保存结果的空列表。
2. 使用字符串方法split将输入的中序表达式转换成一个列表。
3. 从左往右扫描这个标记列表。
如果标记的是操作数，将其添加到结果列表的末尾。
如果标记的是左括号，将其压入opstack栈中。
如果标记的是右括号，反复从opstack栈中移除元素，直到移除对应的左括号。将从栈中取出的每一个运算符都添加到结果列表的末尾。
如果标记的是运算符，将其压入opstack中，在这之前需要从栈中取出优先级更高或相同的运算符，并将它们添加到结果列表的末尾。
4. 处理完输入表达式以后，检查opstack并将其中所有残留的运算符全部添加到结果列表的末尾。
PS . 看完步骤依然很迷，但图示很清晰

为了实现这个算法，我们使用一个叫prec的字典来存储优先级，通过比较值来确定优先级。其中左括号的优先级最小，所以任意与之比较的运算符都会被压入栈中。导入string模块所有大写字母组成的字符串 _string.ascii_uppercase_ ，以下是完整的转换函数：

```python
import string

def infixToPostfix(infixexpr):
    prec = {}
    prec["*"] = 3
    prec["/"] = 3
    prec["+"] = 2
    prec["-"] = 2
    prec["("] = 1

    opStack = Stack()
    postfixList = []

    tokenList = infixexpr.split()

    for token in tokenList:
        if token in string.ascii_uppercase:
            postfixList.append(token)
        elif token == '(':
            opStack.push(token)
        elif token == ')':
            topToken = opStack.pop()
            while topToken != '(':
                postfixList.append(topToken)
                topToken = opStack.pop()
    #遇到右括号，将元素从栈中一个个弹出放入列表中，直到弹出左括号
        else:
            while (not opStack.isEmpty()) and \
            (prec[opStack.peek()] >= prec[token]):
                postfixList.append(opStack.pop())
            opStack.push(token)
    #当栈不为空且栈顶优先级大于当前符号优先级时，将栈顶元素弹出到列表中，再将当前符号推到栈中
    #当栈为空或栈顶优先级小于当前符号时，只需要将当前符号推至栈中

    while not opStack.isEmpty():
        postfixList.append(opStack.pop())

    return "".join(postfixList)

#测试
infixToPostfix("( A + B ) * ( C + B )") #'AB+CB+*'，注意中序表达式之间有空格以便分割
infixToPostfix("( A + B ) * C") #'AB+C*'
infixToPostfix("A + B * C") #'ABC*+'
```
接下来实现后序表达式的运算：
1. 创建空栈operandStack 。
2. 使用字符串方法split将输入的后序表达式转换成一个列表。
3. 从左往右扫描这个标记列表。
如果标记是操作数，将其转换为整数并压入operandStack栈中。
如果标记是运算符，从operandStack栈中取出两个操作数，先右再左进行运算并将结果压入operandStack栈中。
4. 处理结束后，栈中的值就是结果，将其返回。

```python
def postfixEval(postfixExpr):
    operandStack = Stack()

    tokenList = postfixExpr.split()

    for token in tokenList:
        if token in "0123456789":
            operandStack.push(int(token))
        else:
            operand2 = operandStack.pop()
            operand1 = operandStack.pop()
            result = doMath(token, operand1, operand2) 
            #字符串无法直接转换为操作指令
            operandStack.push(result)

    return operandStack.pop()
    
def doMath(op, op1, op2):
    if op == "*":
        return op1 * op2
    elif op == "/":
        return op1 / op2
    elif op == "+":
        return op1 + op2
    else:
        return op1 - op2

#测试
postfixEval("7 8 + 3 2 + /") #3.0
```

<br/>

#### 队列

队列是有序集合，添加操作发生在“尾部”，移除操作发生在“头部”，排序原则是FIFO，即先进先出，支持以下操作：

+ Queue() 创建一个空队列。
+ enqueue(item)在队列的尾部添加一个元素，需要一个元素作参数，无返回值。
+ dequeue() 从列队的头部移除一个元素。不需要参数且返回一个元素，并修改队列内容。
+ isEmpty() 检查队列是否为空。不需要参数，且会返回一个布尔值。
+ size() 返回队列中元素的数目，不需要参数。

假设队列的尾部在列表的位置 0 处，可以使用 insert 函数向队列的尾部添加新元素，pop() 则可用于移除队列头部的元素。这意味着添加操作的时间复杂度为 $O(n)$ ，移除操作则是 $O(1)$ 。

```python
#dsm.py
class Queue:
    def __init__(self):
        self.items = []
    
    def isEmpty(self):
        return self.items == []
    
    def enqueue(self, item):
        self.items.insert(0, item)

    def dequeue(self):
        return self.items.pop()

    def size(self):
        return len(self.items)
```
模拟：传土豆

```python
def hotPotato(namelist, num):
    simqueue = Queue()
    for name in namelist:
        simqueue.enqueue(name) #创建队列
    
    while simqueue.size() > 1:
        for i in range(num):
            simqueue.enqueue(simqueue.dequeue())
            #以num为次数进行队首队尾转换,num可大于len(namelist)
        
        simqueue.dequeue() #将此人从队首去除
    
    return simqueue.dequeue() #将最后一个去除并返回

#测试
hotPotato(["Bill","David","Susan","Jane","Kent","Brad"],7)
#'Susan'
```
模拟：打印任务

```python
#每小时10个学生，最多打印两次，每次1-20页不等
#差不多180s一个任务，每分钟低质量10页高质量5页，求平均等待时间
#创建3个类：Printer、Task、PrintQueue 模拟打印机、打印任务和队列
import random

class Printer:

    def __init__(self, ppm):
        self.pagerate = ppm
        self.currentTask = None
        self.timeRemaining = 0
    
    def tick(self):
        if self.currentTask != None:
            self.timeRemaining = self.timeRemaining-1
            if self.timeRemaining <= 0:
                self.currentTask = None
    
    def busy(self):
        if self.currentTask != None:
            return True
        else:
            return False
    
    def startNext(self, newtask):
        self.currentTask = newtask
        self.timeRemaining = newtask.getPages()*60/self.pagerate


class Task:

    def __init__(self, time):
        self.timestamp = time
        self.pages = random.randrange(1, 21)
    
    def getStamp(self):
        return self.timestamp

    def getPages(self):
        return self.pages

    def waitTime(self, currenttime):
        return currenttime - self.timestamp


from dsm import Queue

def simulation(numSeconds, pagesPerMinute):
    labprinter = Printer(pagesPerMinute)
    printQueue = Queue()
    waitingtimes = []

    for currentSecond in range(numSeconds):

        if newPrintTask()：
            task = Task(currentSecond)
            printQueue.enqueue(task)

        if (not labprinter.busy()) and (not printQueue.isEmpty()):
            nexttask = printQueue.dequeue()
            waitingtimes.append(nexttask.waitTime(currentSecond))
            labprinter.startNext(nexttask)

        labprinter.tick()

        averageWait = sum(waitingtimes)/len(waitingtimes)
        print("Average Wait %6.2f secs %3d tasks remaining."\
            %(averageWait, printQueue.size()))
        
        def newPrintTask():
            num = random.randrange(1, 181)
            if num == 180:
                return True
            else:
                return False
```

```python
for i in range(10):
    simulation(3600, 5)

"""
Average Wait 169.15 secs   0 tasks remaining.
Average Wait 271.48 secs   0 tasks remaining.
Average Wait  64.06 secs   1 tasks remaining.
Average Wait 123.55 secs   0 tasks remaining.
Average Wait 243.35 secs   3 tasks remaining.
Average Wait  47.11 secs   0 tasks remaining.
Average Wait  78.62 secs   0 tasks remaining.
Average Wait  42.88 secs   1 tasks remaining.
Average Wait 215.57 secs   0 tasks remaining.
Average Wait 461.30 secs   3 tasks remaining.
"""

for i in range(10):
    simulation(3600, 10)

"""
Average Wait   8.39 secs   0 tasks remaining.
Average Wait  17.83 secs   0 tasks remaining.
Average Wait  11.21 secs   0 tasks remaining.
Average Wait  12.91 secs   0 tasks remaining.
Average Wait  42.52 secs   0 tasks remaining.
Average Wait  11.94 secs   0 tasks remaining.
Average Wait  10.75 secs   2 tasks remaining.
Average Wait  14.29 secs   0 tasks remaining.
Average Wait   1.31 secs   0 tasks remaining.
Average Wait   6.69 secs   0 tasks remaining.
"""
```
<br/>

#### 双端队列

双端队列是元素的有序集合，其任何一端都允许添加或移除元素。
+ Deque() 创建一个空的双端队列。
+ addFront(item) 将元素添加到双端队列前端。
+ addRear(item) 将元素添加到双端队列后端。
+ removeFront() 从双端队列前端移除一个元素，并返回。
+ removeRear() 从双端队列后端移除一个元素，并返回。
+ isEmpty() 检查双端队列是否为空。
+ size() 返回双端队列的元素数目。

我们用列表构建双端队列，假设后端是位置0处：

```python
class Deque:
    def __init__(self):
        self.items = []
    
    def isEmpty(self):
        return self.items == []

    def addFront(self, item):
        self.items.append(item)
    
    def addRear(self, item):
        self.items.insert(0, item)

    def removeFront(self):
        return self.item.pop()
    
    def removeRear(self):
        return self.items.pop(0)

    def size(self):
        return len(self.items)
```

这里前端的操作时间复杂度为$O(1)$，后端则是$O(n)$ 。

**回文检测器**

构建一个程序，接受一个字符串并检测其是否为回文。按从左往右的顺序将字符串中的字符添加到双端队列的后端，再从前后两端开始移除并比较，相等才继续。如果字符数是偶数则全部处理完，为偶数则只剩最后一个元素。

```python
from dsm import Deque

def palchecker(aString):
    chardeque = Deque()

    for ch in aString:
        chardeque.addRear(ch)

    stillEqual = True

    while chardeque.size() > 1 and stillEqual:
        first = chardeque.removeFront()
        last = chardeque.removeRear()
        if first != last:
            stillEqual = False
    
    return stillEqual
```
<br/>

#### 列表

列表是元素的集合，其中每个元素都有一个相对其他元素的位置，这种抽象数据类型称为**无序列表**。
+ List() 创建一个空列表。
+ add(item) 假设 item 之前不在列表中，接受 item 且无返回值。
+ remove(item) 假设 item 已经在列表中，移除 item 修改列表。
+ search(item) 在列表中搜索 item，返回布尔值。
+ isEmpty() 检查列表是否为空，不需要参数且返回布尔值。
+ length() 返回列表中元素的个数，不需要参数且返回整数。
+ append(item) 假设元素 item 之前不在列表中，在最后添加元素。
+ index(item) 假设元素 item 已经在列表中，返回该元素的位置（下标）。
+ insert(pos, item) 假设元素 item 不在列表中且 pos 合理，在 pos 处添加该元素。
+ pop() 假设列表不为空，移除其中最后一个元素并返回。
+ pop(pos) 假设指定位置存在元素，移除它并返回。

**链表**
为实现无序列表，我们需要构建链表。无序列表需要维持元素间的相对位置，但不需要在连续的内存空间中维护这些相对位置，而是通过链接来传递。

**Node 节点**是构建链表的基本数据结构，每个节点必须包含列表元素即节点的数据变量。其次，节点必须保存指向下一个节点的引用，在 Python 中 Node 的构造方法将 next 初始值设为 None 。构建节点时，需要为其提供初始值，也要包含访问和修改数据的方法:

```python
class Node:
    def __init__(self, initdata):
        self.data = initdata
        self.next = None
        #两个属性，data和next，next结点接地

    def getData(self):
        return self.data

    def getNext(self):
        return self.next
    
    def setData(self, newdata):
        self.data = newdata

    def setNext(self, newnext): #next为Node实例self.head(初始为None）
        self.next = newnext
```
列表本身并不包含任何节点对象，只有指向整个链表结构中第一个节点的引用，其后每个元素都能通过下一个引用找到：

```python
class UnorderedList:
    def __init__(self):
        self.head = None
    
    def isEmpty(self):
        return self.head == None
    #检查头结点是否为None，当且仅当列表没有节点时为真
    
    def add(self, item):
        temp = Node(item)
        temp.setNext(self.head)
        self.head = temp
    #从头部添加新结点，把已有元素链接到后面，再修改头结点（先链接使节点不丢失）
    
    #实现length,search和remove；会将引用和None进行比较
    def length(self):
        current = self.head
        count = 0
        while current != None:
            count = count + 1
            current = current.getNext()
        
        return count
    
    #设置found初始值False，跳出条件为找到相符或到达末尾
    def search(self, item):
        current = self.head
        found = False
        while current != None and not found:
            if current.getData() == item:
                found = True
            else:
                current = current.getNext()

        return found
    
    #与search类似，找到元素后需将前面结点中的next引用指向current之后的节点
    def remove(self, item):
        current = self.head
        previous = None
        found = False
        while not found:
            if current.getData() == item:
                found = True
            else:
                previous = current
                current = current.getNext()
        
    #被移除元素正好是第一个元素时修改头节点而不是previous
        if previous == None:
            self.head = current.getNext()
        else:
            previous.setNext(current.getNext())
            
            
    #练习：实现append,insert,index和pop
    def append(self, item):
        current = self.head
        previous = None
        while current != None: #找到列表尾部
            previous = current
            current = current.getNext()
        temp = Node(item) #创建新的Node节点
        previous.setNext(temp) #将尾部指向该节点
    
    def insert(self, n, item):
        i = 0
        current = self.head
        previous = None
        while i != n and current != None:
            previous = current
            current = current.getNext()
            i += 1

        temp = Node(item)
        if previous != None:
            temp.setNext(current)
            previous.setNext(temp)
        else:
            temp.setNext(self.head)
            self.head = temp
            
    def index(self, item):
        current = self.head
        found = False
        i = 0
        while current != None and not found:
            i += 1
            if current.getData() == item:
                found = True
            else:
                current = current.getNext()

        return i
    
    def pop(self, pos=length):
        current = self.head
        previous = None
        i = 0
        while current.getNext() != None and i != pos: 
            previous = current
            current = current.getNext()
            i += 1
        if previous != None:
            previous.setNext(current.getNext())
        else:
            self.head = current.getNext()
        return current.getData()

```

**有序列表**

在有序列表中，元素的相对位置取决于它们的基本特征，假设元素可以比较的前提下通常为升序或者降序，操作则与无序列表相同。

```python
class OrderedList:
    def __init__(self):
        self.head = None
    
    #isEmpty,length和remove实现方法不变
    def isEmpty(self):
        return self.head == None
    
    def length(self):
        current = self.head
        count = 0
        while current != None:
            count += 1
            current = current.getNext()

    def remove(self,item):
        current = self.head
        previous = None
        found = False
        while not found:
            if current.getData() == item:
                found = True
            else:
                previous = current
                current = current.getNext()
        if previous == None:
            self.head = current.getNext()
        else:
            previous.getNext(current.getNext())

    #search方法可以利用元素有序排列这一特性尽早结束
    def search(self, item):
        current = self.head
        found = False
        stop = False
        while current != None and not found and not stop:
            if current.getData() == item:
                found = True
            elif current.getData() > item:
                stop = True
            else:
                current = current.getNext()

        return found

    #add方法需要遍历链表来确定新元素插入的位置
    def add(self,item):
        current = self.head
        previous = None
        stop = False
        while current != None and not stop:
            if current.getData() > item:
                stop = True
            else:
                previous = current
                current = current.getNext()
        
        temp = Node(item)
        if previous == None:
            temp.setNext(self.head)
            self.head = temp
        else:
            temp.setNext(current)
            previous.setNext(temp)

    #练习，实现index和pop
    def index(self,item):
        current = self.head
        count = 0
        found = False
        while not found:
            if current.getData() != item:
                count += 1
                current = current.getNext()
            else:
                found = True
        return count
    
    def pop(self,pos=length):
        current = self.head
        previous = None
        i = 0
        while current.getNext() != None and i != pos: 
            previous = current
            current = current.getNext()
            i += 1
        if previous != None:
            previous.setNext(current.getNext())
        else:
            self.head = current.getNext()
        return current.getData()
```

**链表分析**

以有 n 个节点的链表为例，isEmpty 方法的时间复杂度为 $O(1)$ ，这是因为它只需要执行一步操作即检查 head 引用是否为 None 。length 方法则总是需要执行 n 步操作，时间复杂度为 $O(n)$ 。向无序列表中添加元素是 $O(1)$ ，因为只是简单地将新节点放在第一位。但有序列表的 search、remove 和 add 都需要进行遍历操作，即时间复杂度为 $O(n)$ 。

这种链表实现方法在性能上和 Python 列表有差异，因为 Python 列表是通过数组实现的。

**电梯问题**

```python
class ele:
    def __init__(self):
        self.pos = 1
        self.t1 = []
        self.t2 = []
        self.t3 = []
    
    def button(self,start,stop):
        start = int(start)
        stop = int(stop)
        if self.t1 == []:
            self.t1.append(start)
            self.t1.append(stop)
            (self.t1).sort
        else:
            if self.pos > start and self.pos > self.t1[-1]:
                if stop < start:
                    self.t1.append(start)
                    self.t1.append(stop)
                    (self.t1).sort
                else:
                    self.t2.append(start)
                    self.t2.append(stop)
                    (self.t2).sort
            if self.pos > start and self.pos < self.t1[0]:
                if stop < start:
                    self.t2.append(start)
                    self.t2.append(stop)
                    (t2).sort
                else:
                    self.t3.append(start)
                    self.t3.append(stop)
                    (self.t3).sort
            if self.pos < start and self.pos < self.t1[0]:
                if stop > start:
                    self.t1.append(start)
                    self.t1.append(stop)
                    (self.t1).sort()
                else:
                    self.t2.append(start)
                    self.t2.append(stop)
                    (self.t2).sort()
            if self.pos < start and self.pos > self.t1[-1]:
                if stop > start:
                    self.t2.append(start)
                    self.t2.append(stop)
                    (self.t2).sort()
                else:
                    self.t3.append(start)
                    self.t3.append(stop)
                    (self.t3).sort()


    def mov(self):
        if self.pos > self.t1[-1]:
            self.pos = self.t1.pop()
            print("电梯位置: "+str(self.pos))
        elif self.pos < self.t1[0]:
            self.pos = self.t1.pop(0)
            print("电梯位置: "+str(self.pos))
```



<br/>

## 递归

#### 递归基础

递归是解决问题的一种方法，它将问题不断分成更小的子问题，直到子问题可以用普通方法解决。通常情况下，递归会使用一个不停调用自己的函数。

**计算数列之和**

假设需要计算数字列表 [1, 3, 5, 7, 9] 的和：

```python
def listsum(numList):
    theSum = 0
    for i in numList:
        theSum = theSum + i
    return theSum
```

假设暂时没有 while 循环和 for 循环，数字列表 numList 的总和等于列表中的第一个元素 numList[0] 加上其余元素 numList[1:] 之和：

$listSum(numList)=first(numList)+listSum(rest(numList))$

```python
def listsum(numList):
    if len(numList) == 1:
        return numList[0]
        #函数的退出语句
    else:
        return numList[0] + listsum(numList[1:])
        #递归函数调用自己
```
每次递归调用都是在解决一个更小的问题，直到问题本身不能再简化时，开始拼接所有子问题的答案，以解决最初的问题。

**递归三原则**
>1. 递归算法必须有基本情况，即停止递归的条件。

>2. 递归算法必须改变其状态并向基本情况靠近。

>3. 递归算法必须递归地调用自己。

listsum 算法的基本情况就是列表长度为1；改变状态是指修改算法所用的某些数据，通常意味着数据以某种方式变小，这里即列表长度向1靠近；最后一条算法必须对自身调用在这里也满足。

注意，递归通过调用自己来解决问题的逻辑并不是循环，而是将问题分解为更小、更容易解决的子问题。

**将整数转换成任意进制的字符串**

很多算法都能解决这个问题，但递归的方式非常巧妙。假设有一个字符序列对应前 base 个数，若要将一个小于 base 的数字转换成其对应的字符串，只需在序列中查找对应数字即可。一个很好的基本情况就是数字小于base 。

1. 将原来的整数分成一系列仅有单数位的数；
2. 通过查表将单数位的数转换成字符串；
3. 连接得到的字符串，从而形成结果。

接下来需要设法改变状态并向基本情况靠近，依然用整除 base 取余的方法，直到得到的商 n 小于 bast 取 n 。接下来实现将整数转换成 2~16 为进制基数的字符串。

```python
def toStr(n, base):
    convertString = "0123456789ABCDEF"
    if n < base:
        return convertString[n]
        #跳出函数
    else:
        return toStr(n//base, base) + convertString[n%base]
```

因为函数先进行递归再拼接余数，先得到的余数放在最后，得到的数顺序正确。

#### 栈帧

假设不拼接递归调用 toStr 的结果和 convertString 的查找结果，而是在进行递归调用之前把字符串压入栈中，如下所示：

```python
rStack = Stack()

def toStr(n, base):
    convertString = "0123456789ABCDEF"
    if n < base:
        rStack.push(convertString[n])
    else:
        rStack.push(convertString[n % base])
        toStr(n//base, base)
```

当调用函数时，Python 分配一个栈帧来处理该函数的局部变量，当函数返回时，返回值就在栈的顶端，以供调用者访问。

栈帧限定了函数所用变量的作用域，尽管反复调用相同的函数，但是每一次调用都会为函数的局部变量创建新的作用域。

#### 递归可视化

Python 的 turtle 可以用来绘制图案，创建小乌龟并前后左右移动，我们来根据它定义 darwSpiral 函数：

```python
from turtle import *

myTurtle = Turtle()
myWin = myTurtle.getscreen()

def drawSpiral(myTurtle, lineLen):
    if lineLen > 0:
        myTurtle.forward(lineLen)
        myTurtle.right(90)
        drawSpiral(myTurtle, lineLen-5)

drawSpiral(myTurtle,100)
myWin.exitonclick()
```
接下来绘制分形树：

```python
def tree(branchLen, t):
    if branchLen > 5:
        t.forward(branchLen)
        t.right(20)
        tree(branchLen-15, t)
        t.left(40)
        tree(branchLen-10, t)
        t.right(20)
        t.backward(branchLen)

from turtle import *
t = Turtle()
myWin = t.getscreen()
t.left(90)
t.up()
t.backward(300)
t.down()
t.color('green')
tree(110, t)
myWin.exitonclick()
```
第五行和第七行进行了递归调用，第五行小乌龟在向右转了20度后立刻进行递归调用，绘制右子树。第7行再一次进行递归调用，但这是左转了40度之后，即抵消右转的20度绘制左子树。注意，每一次进行递归调用时都从参数 branchLen 中减去一些，为了让递归树越来越小，第二行会检查 branchLen 是否满足基本情况。

<br/>

## 搜索和排序

#### 顺序搜索

从列表第一个元素开始沿默认顺序逐个查看，直到找到目标元素或查完列表。无序列表的顺序搜索方式如下：

```python
def sequentialSearch(alist, item):
    pos = 0
    found = False

    while pos < len(alist) and not found:
        if alist[pos] == item:
            found = True
        else:
            pos = pos + 1
        
        return found
```

这种算法在普通情况下，需要 n/2 次比较，所以顺序搜索算法的时间复杂度为 $O(n)$ 。

假设列表中的元素按升序排列，如果存在目标元素，那么它出现在 n 个位置中任意一个位置的可能性仍然一样大，因此比较次数与在无序列表中相同。不过，如果不存在目标元素，那么搜索效率会有提升。{?}

#### 二分搜索

二分搜索进一步利用列表有序，从中间元素着手，再排除一半的元素，如此循环直到直接找到目标元素。完整代码如下：

```python
def binarySearch(alist, item):
    first = 0
    last - len(alist) + 1
    found = False

    while first <= last and not found:
        midpoint = (first + last) // 2
        if alist[midpoint] == item:
            found = True
        else:
            if item < alist[midpoint]:
                last = midpoint - 1
            else:
                first = midpoint + 1
    
    return found
```
二分搜索的递归版本：

```python
def binarySearch(alist, item):
    if len(alist) == 0:
        return False
    else:
        midpoint = len(alist) // 2
        if alist[midpoint] == item:
            return True
        else:
            if item < alist[midpoint]:
                return binarySearch(alist[:midpoint],item)
            else:
                return binarySearch(alist[midpoint+1:],item)
```
每次比较后剩余元素减少一半，直到 i 次后 $\frac{n}{2^{i}}=1$ ，即 $i=log_n$ ，所以二分搜索算法的时间复杂度是 $O(log_n)$ 。

但实际在 python 中使用切片操作的时间复杂度为 $O(k)$ ，所以在 n 较小时排序等额外开销影响较大，除非排序开销有限且一次排序后能搜索多次，否则优先考虑顺序搜索。

#### 散列

散列表是元素集合，其中的元素以一种便于查找到方式存储。散列表中的每个位置通常被称为槽，其中可以存储一个元素，槽从一个从0开始的整数标记。在初始情况下，散列表中没有元素，每个槽都为空。可以用列表来实现散列表，并将每个元素都初始化为 Python 中的特殊值 None 。

散列函数将散列表中的元素与其所属位置对应起来，对散列表中的任一元素，散列函数返回一个介于 0 和 m-1 之间的整数。假设