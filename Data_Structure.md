# Problem Solving with Algorithms and Data Structures

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

## 算法分析
**大O记法**
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