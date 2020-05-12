# Python随笔

### 函数

+ 局部作用域不能使用其他局部作用域内的变量

```python
def spam():
    eggs = 99
    bacon()
    print(eggs)

def bacon():
    ham = 101
    eggs = 0
    
spam()
#输出：99
```


+ 全局变量可以在局部作用域中读取

```python
def spam():
    print(eggs)
eggs = 42
spam()
#输出：42
```

因为在spam()函数中，没有变元名为eggs，也没有代码为eggs赋值。当spam()使用eggs时，会认为是对全局变量eggs的引用。

+ 在局部变量赋值之前就使用它，则会报错

```python
def spam():
    print(eggs)
    eggs = 'spam local'

eggs = 'global'
spam()
#UnboundLocalError: local variable 'eggs' referenced before assignment
```
在spam()函数中存在针对eggs的赋值，即被认为是局部变量，但打印语句在赋值之前，Python不会再退回到全局变量。
* try语句一旦跳到except子句就不会回到try子句
* 练手：猜数字


```python
#This is a guess the number between 1 and 20 game.
import random
secretNumber = random.randint(1, 20)
print(“I’m thinking a number between 1 and 20”)
#Ask the player to guess 6 times.
import random
secretNumber = random.randint(1, 20)
print("I'm thinking a number between 1 and 20")
#Ask the player to guess 6 times.
for guessesTaken in range(1, 7):
    print("Take a guess.")
    guess = int(input())
    
    if guess < secretNumber:
        print("Your guess is too low!")
    elif guess > secretNumber:
        print("Your guess is too high!")
    else:
        break
if guess == secretNumber:
    print("Good job! You guessed my number in "+str(guessesTaken)+ " guesses.")
else:
    print("Nope. The number I was thinking of was "+str(secretNumber))
```
* 练手：Collatz序列

```python 
def collatz(number):
    if number%2 == 0:
        thenum = number//2
        print(thenum)
        return thenum
    elif number%2 == 1:
        thenum = 3*number + 1
        print(thenum)
        return thenum   

xnum = int(input("Please input an int number."))
while xnum != 1:
    xnum = collatz(xnum)
    print(xnum)
```
加入try和except语句，检测用户是否输入了非整数字符串。int()函数传入一个非整数字符串会产生ValueError错误。

```python 
def collatz(number):
    if number%2 == 0:
        thenum = number//2
        return thenum
    elif number%2 == 1:
        thenum = 3*number + 1
        return thenum   
try:
    xnum = int(input("Please input an integer."))
    while xnum != 1:
        xnum = collatz(xnum)
        print(xnum)
except ValueError:
    print("Not an integer!")
```
### 列表

利用列表保存猫的名字

```python
catNames = []
while True:
    print('Enter the name of cat ' + str(len(catNames)+1) +'(Or enter nothing to stop.):')
    name = input()
    if name == '':
        break
    catNames = catNames + [name] 
    #或者catNames.append(name)
print('The cat names are:')
for name in catNames:
    print(' ' + name)
```

for循环结合range(len())

```python
supplies = ['pens','staplers','flame-throwers','binders']
for i in range(len(supplies)):
    print('Index ' + str(i) + ' in supplies is:' + supplies[i])
```
多重赋值

```python
cat = ['fat','black','loud']
size, color, disposition = cat
#变量的数目和列表的长度必须严格相等，否则会给出ValueError
```

### 方法

方法和函数是一回事，只是它是调用在一个值上的。方法部分跟在这个值后面，以一个句点分隔。每种数据类型都有自己的一组方法，例如列表有一系列用来查找、添加、删除或操作列表中的值。

index方法在列表中查找值

```python
spam = ['hello','hi','howdy','howdy','heyas']
spam.index['howdy']
#2，当列表中存在重复值则会返回第一次出现的下标，类似的remove('howdy')方法只删除第一次出现的值
```
列表中的append()和insert()方法，都不会将新值作为返回值（返回None)，而是直接修改。如果在字符串或整形上调用会产生AttributeError错误。

```python
eggs = 'hello '
eggs.append('world')
#AttributeError: 'str' object has no attribute 'append'
```

列表的sort方法也是当场排序，且不能对既有数字又有字符串值的列表排序,会出现TypeError错误。sort()方法对字符串排序时使用ASCII字符顺序，如果需要按字母顺序可以设置关键字参数key。

```python
spam = ['Alice', 'ants', 'Bob', 'badgers', 'Carol', 'cats']
spam.sort()
spam
#['Alice', 'Bob', 'Carol', 'ants', 'badgers', 'cats']，小写在大写之后
spam = ['a', 'z', 'A', 'Z']
spam.sort(key=str.lower)
#['a', 'A', 'z', 'Z']
```
练手：神奇8球和列表

```python
#利用列表而不是elif
import random
messages = ['It is certain',
'It is decidely so',
'Yes definitely',
'Reply hazy try again',
'My reply is no',
'Outlook not so good',
'Very doubtful']
print(message[random.randint(0, len(messages) - 1)])
#注意randint可以取两端的数
```
字符串和元组的许多操作类似于列表：按下标取值、切片、用于for循环、用于len()。不同之处在于列表是可变数据类型，它的值可以添加、删除或改变。但是字符串和元组是不可变的，尝试对其中某一字符或元素重新赋值会导致TypeError错误，正确的方式要么整个赋值要么使用切片连接：

```python
name = 'Zophie a cat'
newName = name[0:7] + 'the' + name[8:12]
```
在内存地址不变的前提下，修改列表需要用到del语句和列表的append()方法

```python
eggs = [1,2,3]#id(eggs)是140453277312072
del eggs[2]
del eggs[1]
del eggs[0]
eggs.append(4)
eggs.append(5)
eggs.append(6)#eggs变成[4,5,6]但内存地址没变
```
如果元组中只有一个值，可以在括号内该值的后面加上加上逗号，否则python把它认作这个值的数据类型

```python
type(('hello')) #str
type(('hello',))#tuple
```
利用list()和tuple()函数实现数据类型转换,或者对字符串进行转换

```python
tuple('Hello world!')
#('H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!')
list('Hello world!')
#['H', 'e', 'l', 'l', 'o', ' ', 'w', 'o', 'r', 'l', 'd', '!']
```

###引用

在变量保存可变数据类型的值时，例如列表和字典，Python就使用引用，此时修改数据所有变量都会改变。
对于不可变的数据类型的值，例如字符串、整数或元组，Python就保存值本身。此时改数据只会改变直接赋值的变量。

```python
def eggs(someParameter):
    someParameter.append('Hello')
spam = [1, 2, 3]
eggs(spam)
print(spam) #[1, 2, 3, 'Hello']
```
注意，当eggs()被调用时，没有使用返回值来为spam赋新值，而是直接修改了该列表。尽管someParameter和spam包含了不同的引用，但都指向相同的列表，需要记住Python处理列表和字典时的引用传递方式。
+ copy

```python
import copy
spam = ['A','B','C','D']
cheese = copy.copy(spam)
cheese[1] = 42
spam #['A', 'B', 'C', 'D']
```

```python
spam = ['A','B','C','D']
cheese = spam[:]
cheese[1] = 42
spam #['A', 'B', 'C', 'D']
```
复制后的cheese引用ID数字发生改变，此时修改列表不会影响到原列表。
修改复制列表所包含的列表时，如果需要保持原始列表不变，可以使用deepcopy()

```python
a = ['A']
spam = [a,'B','C','D']
cheese = copy.deepcopy(spam)
cheese[0][0] = 'E'
spam #[['A'], 'B', 'C', 'D']
```
+ 练手：编写一个函数，将spam列表值作为参数，返回一个字符串。该字符串包含所有表项，表项之间以逗号和空格分隔，并在最后一个表项之前插入and

```python
def linklist(alist):
    for element in alist[:-2]:
        print(element+', ',end='') #设置print的end参数实现不换行
    print(alist[-2]+ ' and ' +alist[-1])

spam = ['apples','bananas','tofu','cats']
linklist(spam) #apples, bananas, tofu and cats
```
+ 练手：字符图网格

遇到问题，如果修改某一行某个数会改变多行

```python
i=['.']*6
grid=[i]*8
grid
[['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.']]
```
解如下
 ```python
grid=[['.', '.', '.', '.', '.', '.'],
 ['.', '0', '0', '.', '.', '.'],
 ['0', '0', '0', '0', '.', '.'],
 ['0', '0', '0', '0', '0', '.'],
 ['.', '0', '0', '0', '0', '0'],
 ['0', '0', '0', '0', '0', '.'],
 ['0', '0', '0', '0', '.', '.'],
 ['.', '0', '0', '.', '.', '.'],
 ['.', '.', '.', '.', '.', '.']]
for i in grid:
    for j in i[:5]:
        print (j,end='')
    print(i[5])
 ```
### 字典

在字典中，键值对输入的顺序并不重要，也不能像列表那样进行切片。
字典有3个方法返回类似列表的值，分别对应于字典的键、值和键值对：keys(),values(),items()。返回的数据类型分别是dict_keys、dict_values和dict_items，可以用于for循环。
```python
spam = {'color':'red','age':42}
spam #dict_values(['red', 42])

for v in spam.values():
    print(v)
```
可以通过将这些数据类型传递给list函数得到列表 `list(spam.values())` 得到['red', 42]

get()方法：

```python
#为了避免键不存在的KeyError，取得键对应的值，以及如果该键不存在时返回备用值。
picnicItems = {'apples':5,'cups':2}
'I am bringing '+str(picnicItems.get('cups', 0))+' cups.'
#'I am bringing 2 cups.'
'I am bringing '+str(picnicItems.get('eggs', 0))+' eggs.'
#'I am bringing 0 eggs.'
```

setdefault()方法：

```python
#第一个参数是要检查的键，第二个参数是该键不存在时设置的值
spam = {'name':'Pooka', 'age':5}
spam.setdefault('color','black') #'black'
spam.setdefault('age','none') #5
```

练手：计算字符串中每个字符出现的次数

```python
message = 'It was a bright cold day in April, and the clocks were striking thirteen.'
count = {}
for character in message:
    count.setdefault(character, 0)
    count[character] = count[character] + 1
#{'I': 1, 't': 6, ' ': 13, 'w': 2, 'a': 4, 's': 3, 'b': 1, 'r': 5, 'i': 6, 'g': 2, 'h': 3, 'c': 3, 'o': 2, 'l': 3, 'd': 3, 'y': 1, 'n': 4, 'A': 1, 'p': 1, ',': 1, 'e': 5, 'k': 2, '.': 1}
```

导入pprint模块，使用pprint()和pformat()函数实现漂亮打印

```python
import pprint
message = 'It was a bright cold day in April, and the clocks were striking thirteen.'
count = {}
for character in message:
    count.setdefault(character, 0)
    count[character] = count[character] + 1
pprint.pprint(count)
#或者print(pprint.pformat(someDictionaryValue))
```

```
{' ': 13,
 ',': 1,
 '.': 1,
 'A': 1,
 'I': 1,
 'a': 4,
 'b': 1,
 'c': 3,
 'd': 3,
 'e': 5,
 'g': 2,
 'h': 3,
 'i': 6,
 'k': 2,
 'l': 3,
 'n': 4,
 'o': 2,
 'p': 1,
 'r': 5,
 's': 3,
 't': 6,
 'w': 2,
 'y': 1}
```

练手：井字棋盘

```python
theBoard = {'top-L': '0', 'top-M': '0' , 'top-R': '0',
           'mid-L': 'X', 'mid-M': 'X', 'mid-R': ' ',
           'low-L': ' ', 'low-M': ' ', 'low-R': 'X'}
def printBoard(board):
    print(board['top-L'] + '|' +board['top-M'] + '|' + board['top-R'])
    print('-+-+-')
    print(board['mid-L'] + '|' + board['mid-M'] + '|' + board['mid-R'])
    print('-+-+-')
    print(board['low-L'] + '|' + board['low-M'] + '|' + board['low-R'])
printBoard(theBoard)
```

添加代码，允许玩家输入他们的着法：

```python
theBoard = {'top-L': ' ', 'top-M': ' ' , 'top-R': ' ',
           'mid-L': ' ', 'mid-M': ' ', 'mid-R': ' ',
           'low-L': ' ', 'low-M': ' ', 'low-R': ' '}
def printBoard(board):
    print(board['top-L'] + '|' +board['top-M'] + '|' + board['top-R'])
    print('-+-+-')
    print(board['mid-L'] + '|' + board['mid-M'] + '|' + board['mid-R'])
    print('-+-+-')
    print(board['low-L'] + '|' + board['low-M'] + '|' + board['low-R'])
turn = 'X'
for i in range(9):
    printBoard(theBoard)
    print('Turn for '+turn+'. Move on which space?')
    move = input()
    theBoard[move] = turn
    if turn == 'X':  #交替使用值'X'和'0'
        turn = '0'
    else:
        turn = 'X'
printBoard(theBoard)
```

练手：计算所有客人带来的食物总数，嵌套字典

```python
allGuests = {'Alice':{'apples':5, 'pretzels':12}, 
            'Bob': {'ham sandwiches':3, 'apples': 2},
            'Carol': {'cups':3, 'apple pies':1}}
def totalBrought(guests, item):
    numBrought = 0
    for k, v in guests.items():
        numBrought = numBrought + v.get(item, 0)
    return numBrought
#如果参数是键，则添加该值至numBrought，如果不是键则返回0
print('Number of things being brought:')
print(' - Apples ' + str(totalBrought(allGuests, 'apples')))
print(' - Cups ' + str(totalBrought(allGuests, 'cups')))
print(' - Cakes ' + str(totalBrought(allGuests, 'cakes')))
print(' - Ham Sandwiches ' + str(totalBrought(allGuests, 'ham sandwiches')))
print(' - Apple Pies ' + str(totalBrought(allGuests, 'apple pies')))
```

```
Number of things being brought:
 - Apples 7
 - Cups 3
 - Cakes 0
 - Ham Sandwiches 3
 - Apple Pies 1
```

练手：写一个displayInventory()的函数，接受任何可能的物品清单并显示Inventory:

```python
stuff = {'rope':1, 'torch':6, 'gold coin':42, 'dagger':1,'arrow':12}
def displayInventory(inventory):
    print("Inventory:")
    number = 0
    for key,value in inventory.items():
        print(str(value)+' '+key)
        number += value
    print("Total number of items: "+str(number))
displayInventory(stuff)
```
Inventory:
1 rope
6 torch
42 gold coin
1 dagger
12 arrow
Total number of items: 62

练手：写一个addToInventory(inventory,addedItems)函数，其中inventory参数是一个字典，表示玩家的物品清单，addedItems参数是一个列表（dragonLoot)。该函数返回一个字典，表示更新过的物品清单。

```python
def addToInventory(inventory,addedItems):
    for i in addedItems:
        if i in inventory.keys():
            inventory[i] += 1
        else:
            inventory[i] = 1
    return inventory

inv = {'gold coin':42, 'rope':1}
dragonLoot = ['gold coin','dagger','gold coin','gold coin','ruby']
inv = addToInventory(inv, dragonLoot)
displayInventory(inv)
```
Inventory:
45 gold coin
1 rope
1 dagger
1 ruby
Total number of items: 48

### 字符串

+ 转义符：`\'单引号, \"双引号, \t制表符, \n换行符, \\倒斜杠`
+ 在字符串开始的引号之前加上r，使它成为原始字符串，忽略所有转义。
+ 通过三重引号创建创建多行字符串,也可以用作代码注释。

字符串方法：

upper()和lower()返回转换大小写后的字符串（并不改变字符串本身，需赋值）

isupper()和islower()方法根据字符串大小写情况返回布尔值，属于**isX字符串方法**，还有isalpha()判断是否只包含字母，isalnum()只有字母和数字，isdecimal()只包含数字，isspace()只包含空格、制表符和换行，istitle()字符串是否开头大写其余小写。可以结合while True:和if语句限制用户输入的数据格式。

startswith()和endswith()方法根据调用的字符串返回布尔值，很多场景下可以替代操作符 ==

join()方法将返回由调用字符串间隔、参数字符串填充而成的新字符串
`', '.join(['cats', 'rats', 'bats'])` 输出'cats, rats, bats'

split()方法则相反，将调用字符串以参数字符串为间隔进行分割并输出字符串列表，默认按空白字符分割。常用的是以换行符分割多行字符串。

```python
spam = """Dear Alice,
How have you been? I am fine.
There is a container in the fridge
that is labeled "Milk Experiment".

Please do not drink it.
Sincerely,
Bob"""
spam.split('\n')
```

rjust()，ljust()和center()用于对齐文本,第一个参数是整数长度，第二个可选参数用于填充字符，取代空格。如果需要打印表格式数据，留出正确的空格，这些方法就特别有用：

```python
#定义一个方法，接受一个信息字典与左右列宽度参数，利用center()、ljust()和rjust()，以干净对齐的表格形式显示这些信息
picnicItems = {'sandwiches':4,'apples':12,'cups':4,'cookies':8000}
def printPicnic(itemsDict,leftWidth,rightWidth):
    print('PICNIC ITEMS'.center(leftWidth+rightWidth,'-'))
    for k,v in itemsDict.items():
        print(k.ljust(leftWidth,'.')+str(v).rjust(rightWidth,'.'))
printPicnic(picnicItems,12,5)
```
```python
---PICNIC ITEMS--
sandwiches......4
apples.........12
cups............4
cookies......8000
```
strip()，rstrip()，lstrip()删除调用字符串两边、右边、左边的空白字符，也可以接受一个字符串参数删除对应侧指定字符：

```python
spam = 'SpamBaconSpamEggsSpamSpam'
spam.rstrip('mSpa')
#'SpamBaconSpamEggs'注意传入的顺序不重要
```
pyperclip模块的copy()和paste()函数用于拷贝与粘贴字符串

```python
import pyperclip
pyperclip.copy('Hello world!')
pyperclip.paste()
```

练手：对粘贴板段落前添加*号

```python
#1.从剪切板复制粘贴 2.分离文中行并添加星号 3.连接修改过的行
import pyperclip
text = pyperclip.paste()

lines = text.split('\n')
for i in range(len(lines)):
    lines[i] = '* ' + lines[i]

text = '\n'.join(lines)
pyperclip.copy(text)
```

练手：表格纵向打印

```python
#要点,如何找到每个内层最长的字符串？
tableData = [['apple','oranges','cherries','banana'],
['Alice','Bob','Carol','David'],
['dogs','cats','moose','goose']]
def findmaxlen(list):
    maxlen=0
    for i in list:
        if maxlen < len(i):
            maxlen = len(i)
    return maxlen

def printTable(data):
    for i in range(len(data[0])):
        for j in range(len(data)):
            print(data[j][i].ljust(findmaxlen(data[j])),end=' ')
        print()

printTable(tableData)
```

```python
#输出
apple    Alice dogs  
oranges  Bob   cats  
cherries Carol moose 
banana   David goose
```

### 正则表达式

```python
import re
phoneNumRegex = re.compile(r'\d{3}-\d{3}-\d{4}')
mo = phoneNumRegex.search('My number is 415-555-4242.')
print('Phone number found: ' + mo.group())
#输出：Phone number found: 415-555-4242
```

```python
#利用括号分组
phoneNumRegex = re.compile(r'(\d{3})-(\d{3}-\d{4})')
mo = phoneNumRegex.search('My number is 415-555-4242.')
mo.group(1) #'415'
mo.group(2) #'555-4242'
mo.group(0) #'415-555-4242'
mo.groups() #('415', '555-4242')

areaCode, mainNumber = mo.groups()
print("areaCode: "+areaCode)
print("mainNumber: "+mainNumber)
#多重赋值
```

```python
#自带（）的括号分组,注意前后括号前都要加\转义符
phoneNumRegex = re.compile(r'(\(\d{3}\))(\d{3}-\d{3})')
mo = phoneNumRegex.search('My phone number is (415)555-4242')
mo.group(1) #'(415)'
```

```python
#字符|称为管道，用于匹配多个表达式中的一个
batRegex = re.compile(r'Bat(man|mobile|copter|bat)')
mo = batRegex.search('Batmobile lost a wheel')
mo.group() #'Batmobile'
mo.group(1) #'mobile'
```

```python
#用问号实现可选匹配
batRegex = re.compile(r"Bat(wo)?man")
mo1 = batRegex.search('The Adventures of Batman')
mo1.group() #'Batman'

mo2 = batRegex.search('The Adventures of Batwoman')
mo2.group() #'Batwoman'
```

```python
phoneRegex = re.compile(r'(\d{3}-)?\d{3}-\d{4}')
mo1 = phoneRegex.search('My number is 415-555-4242')
mo1.group() #'415-555-4242'

mo2 = phoneRegex.search('My number is 555-4242')
mo2.group() #'555-4242'
```

```python
#星号匹配零次或多次
lanRegex = re.compile(r"C(\+)*")
mo = lanRegex.search('673Go19520Python123java1314C++1314131456')
mo.group() #'C++'
```

```python
#花括号代表匹配特定次数
lanRegex = re.compile(r"C(\+){,2}") #匹配至多两个带两个+的C
mo = lanRegex.search('673Go1952C0Python123java1314C++1314131456')
mo.group() #'C'
#花括号后加问号表非贪心匹配
```
Regex对象的findall()方法，直接返回包含需查找字符串所有匹配的列表，不需要在调用search()方法后再对结果调用group()。针对未分组对象会返回字符串列表，针对已分组的则返回元组列表。

Regex对象的sub()方法用于替换字符串，需要传入两个参数，第一个参数是用于取代发现匹配的字符串，第二个即待匹配的字符串，sub()方法返回完成后的字符串

```python
"""补充:
\d、\w、\s分别匹配数字、单词和空格
\D、\W、\S匹配三者以外的所有字符
[abc]匹配方括号内任意字符
[^abc]匹配不在方括号内的字符
^spam意味字符从spam开始
spam$意为字符从spam结束
.匹配所有字符，换行符除外"""
```

### 读写文件

os.path.join()函数用于返回完整的路径+文件名

```python
import os
print(os.path.join('home/lun','test.txt'))#ome/lun/test.txt
#可以创建一个文件名列表，利用for循环创建多个文件
```
+ os.getcwd()函数获得当前路径
+ os.chdir()函数改变当前路径
+ .\代表当前路径..\是上一级路径
+ .\spam.txt和spam.txt指的是同一文件

os.makedirs()函数创建新文件夹

```python
import os
os.makedirs('/home/lun/practice/waffles')
```
os.path.dirname(path)返回path参数中最后一个斜杠之前的内容
os.path.basename(path)返回path参数中最后一个斜杠之后的内容
os.path.split(path)返回这两个字符串组成的元组

```python
path = '/home/lun/Documents/gopl-zh.pdf'
os.path.dirname(path) #'/home/lun/Documents'
os.path.basename(path) #'gopl-zh.pdf'
os.path.split(path) #('/home/lun/Documents', 'gopl-zh.pdf')
#返回由每个目录构成的列表
path.split(os.path.sep) #['', 'home', 'lun', 'Documents', 'gopl-zh.pdf']
```
os.path.getsize()函数查看文件大小

```python
path = '/home/lun/Documents/gopl-zh.pdf'
os.path.getsize(path) #4347440(字节)
```
os.listdir()函数查看文件夹下的文件名

```python
path='/home/lun/Documents'
os.listdir(path)
"""['.ipynb_checkpoints',
 'SICP',
 'docker_practice.pdf',
 '.vscode',
 '.[Machine Learning].swp',
 'NVIDIA_CUDA-10.2_Samples',
 'lrngsql',
 'gopl-zh.pdf',
 'handson-ml-master']"""
```
查看文件夹下所有内容的总大小,注意getsize()函数不计算目录下内容的大小

```python
path = '/home/lun/Documents'
totalsize = 0
for i in os.listdir(path):
    totalsize += os.path.getsize(os.path.join(path,i))
print(totalsize) #12446685
```
检查路径有效性
>os.path.exists(path) 检查文件或文件夹是否存在
>os.path.isfile(path) 检查文件是否存在
>os.path.isdir(path) 检查文件夹是否存在

练手：读入文本文件，并在指定地方加上自己的文本

```python
madlibs = open('madlibs.txt','w')
madlibs.write('The ADJECTIVE panda walked to the NOUN and then VERB. A nearby NOUN was unaffected by these events.')
madlibs.close()
```

```python
madlibs = open('madlibs.txt','r')
x = madlibs.read()
madlibs.close()
print(x)
#The ADJECTIVE panda walked to the NOUN and then VERB. A nearby NOUN was unaffected by these events.
```

```python
#以下是实现过程，逐个找出再让用户逐个输入替换词，最后保存文件
import re
rg = re.compile('ADJECTIVE|NOUN|VERB')
with open('madlibs.txt','r') as f:
    madlib = f.read()
while rg.search(madlib):
    c = input("Enter an "+rg.search(madlib).group().lower()+":")
    madlib = rg.sub(c,madlib,count=1)#注意count参数
with open('madlibs.txt','w') as f:
    f.write(madlib)
#The silly panda walked to the chandelier and then screamed. A nearby pickup truck was unaffected by these events.
```

### 组织文件

shutil模块
shutil.copy(source,destination)用于将source文件复制到destination处的文件夹。如果destination是一个文件名，它将作为被复制文件的新名字。该函数返回一个字符串，表示被复制文件的路径。

```python
import shutil, os
os.chdir('/home/lun/Documents')
shutil.copy('DOCX.docx','/home/lun/practice/test.docx')
#'/home/lun/practice/test.docx'
```
shutil.copytree()与shutil.copy()类似，只不过复制整个文件夹以及它包含的文件
shutil.move(source, destination)将路径source处的文件移动到destination，并返回新位置的绝对路径。注意如果destination不存在，会将原文件改名，这个过程要注意。
os.unlink(path)删除path处的文件，os.rmdir(path)删除path处的空文件夹
shutil.rmtree(path)将删除path处的文件夹及其包含的文件

```python
#注意os.unlink()的使用要谨慎
import os
for filename in os.listdir():
    if filename.endswith('.docx'):
        #os.unlink(filename)
        print(filename)
"""
test.docx
DOCX.docx
"""
#在确定待删除的文件后，再去掉注释运行（删除不可恢复）
```
用send2trash模块实现安全删除

```python
import send2trash
baconFile = open('bacon.txt','a')
baconFile.write('Bacon is not a vegatable.')
baconFile.close() #起保存作用
send2trash.send2trash('bacon.txt')
```
遍历目录树
os.walk()函数被传入文件夹路径的字符串，返回3个值组成的generator迭代器:(str,list,list)，和for循环结合实现遍历目录树：
1. 当前文件夹名称的字符串 
2. 当前文件夹中子文件夹的字符串列表 
3. 当前文件夹中文件的字符串列表
```python
for foldername,subfolders,filenames in os.walk('/home/lun/Documents/SICP'):
    print("The current folder is: "+foldername)
    for subfolder in subfolders:
        print("Subfolder of "+foldername+": "+subfolder)
    for filename in filenames:
        print("Filename of "+foldername+": "+filename)
    print("")
```
练手：将A文件夹中与B文件夹同名但后缀不一样的文件移动到文件夹C

```python
import shutil, os
for foldername,subfolder,filenames in os.walk('/home/lun/practice/B'):
    fb = []
    for i in filenames:
        fb.append(i.split('.')[0])
for foldername,subfolder,filenames in os.walk('/home/lun/practice/A'):
    for filename in filenames:
        if filename.split('.')[0] in fb:
            shutil.move('/home/lun/practice/A/'+filename,'/home/lun/practice/C')
```
用zipfile模块的ZipFile()函数读取zip文件，ZipFile对象有一个namelist()方法，返回ZIP文件中包含的所有文件和文件夹的字符串列表。这些字符串列表可以作为ZipFile对象的方法getinfo()的参数，返回特定的ZipInfo对象（可以赋值给一个变量或直接查看属性file_size和compress_size,分别表示原文件大小和压缩后文件大小）

```python
import zipfile
examplezip = zipfile.ZipFile('example.zip')
examplezip.namelist()
#['temp_test.py', 'test.jpg']
x = examplezip.getinfo('temp_test.py').file_size #569
y = examplezip.getinfo('temp_test.py').compress_size #275
```
计算压缩效率

```python
'Compress file is {:.2f}% smaller.'.format(100*(x-y)/x)
#'Compress file is 51.67% smaller.'
'Compress file is %s%% smaller.'%(round(100*(x-y)/x,2))
#'Compress file is 51.67% smaller.'
```
ZipFile对象的extract()方法从ZIP文件中解压缩单个文件，第一个参数是待解压缩的文件(一个压缩包有多个文件)，第二个可选参数是解压后的路径

```python
examplezip.extract('temp_test.py','/home/lun/Documents')
examplezip.close()
```
extractall()方法则将全部内容解压，可选参数为解压后的路径
创建和添加zip文件：

```python
import zipfile
newzip = zipfile.ZipFile('new.zip','w') #必须是写模式
newzip.write('go.go', compress_type=zipfile.ZIP_DEFLATED)
newzip.close()
```

练手：将文件名中的美式日期MM-DD-YYYY改为欧式日期DD-MM-YYYY
检查当前目录所有文件名，寻找美式日期，并交换月份和日期的位置
1. 创建正则表达式，寻找美国风格的日期的文本模式
2. 利用os.walk()循环遍历每个文件名，并用shutil.move()对文件改名

```python
"""
闯说可以用pdb.set_trace()方法进行调试
"""
import re, os, shutil
rg = re.compile(r'((0|1)?\d)-((0|1|2|3)?\d)-((19|20)?\d\d)')
for fdn,sbf,filenames in os.walk('/home/lun/practice/'):
    for filename in filenames:
        try:
            x = rg.search(filename).group(1)
            y = rg.search(filename).group(3)
            z = rg.search(filename).group(5)
            newname = rg.sub(y+'-'+x+'-'+z,filename,count=1)
            shutil.move(os.path.join(fdn,filename),os.path.join(fdn,newname))
        except AttributeError:
            pass
```
练手：列出系统里超过100M的单个文件名

```python
path = '/home'
bigfiles=[]
for foldname,subfolders,filenames in os.walk('/home/'):
    for filename in filenames:
        if os.path.getsize(os.path.join(foldname,filename))>102400:
            bigfiles.append()
```
### 调试

**raise语句**
+ raise关键字
+ 对Exception函数的调用
+ 传递给Exception函数的字符串，包含有用错误信息

常用方法：raise语句写在函数中，try和except语句在调用该函数时使用

```python
def boxprint(symbol, width, height):
    if len(symbol) != 1:
        raise Exception('Symbol must be a single character string.')
    if width <= 2:
        raise Exception('Width must be greater than 2.')
    if height <= 2:
        raise Exception('Height must be greater than 2.')
    print(symbol * width)
    for i in range(height - 2):
        print(symbol + (' '*(width - 2)) + symbol)
    print(symbol * width)

for sym, w, h in (('*', 4, 4),('0', 20, 5),('x', 1, 3),('ZZ', 3, 3)):
    try:
        boxprint(sym, w, h)
    except Exception as err: #若返回Exception则存在err中
        print('An exception happened: ' + str(err))
```

```python
****
*  *
*  *
****
00000000000000000000
0                  0
0                  0
0                  0
00000000000000000000
An exception happened: Width must be greater than 2.
An exception happened: Symbol must be a single character string.
#这样可以更优雅地处理错误
```
反向跟踪：Python遇到错误时生成的错误信息，包含了出错消息、错误代码行号、导致错误的函数调用序列。这个序列称为调用栈。
通过调用traceback.format_exc()，将反向跟踪信息写入日志文件，并让程序继续运行。
```python
import traceback
try:
    raise Exception('This is the eror message.')
except:
    errorFile = open('errorInfo.txt','w')
    errorFile.write(traceback.format_exc())
    errorFile.close()
    print('The traceback info was written to errorInfo.txt.')
```
**断言**：确保代码没有做明显错误的事情
+ assert关键字
+ 条件（即求值为True或False的表达式）
+ 逗号
+ 当条件为False时显示的字符串
```python
podbaydoorstatus = 'open'
assert podbaydoorstatus == 'open','The pod bay doors need to be "open".'
podbaydoorstatus = 'I\'m sorry, Dave. I\'m afraid I can\'t do that.'
assert podbaydoorstatus == 'open', 'The pod bay doors need to be "open".'
```
在我们把错误的值赋给变量后，断言会抓住这个错误：
AssertionError: The pod bay doors need to be "open".

代码不应该用try和except处理assert语句，如果assert失败就应该直接报错。断言针对的是编程错误，而不是用户错误，对于那些可恢复的错误（比如文件没找到或输入无效值），则应该抛出异常，而不是用assert语句检测它。

练手：交通灯模拟

```python
#两个路口的灯
market_2nd = {'ns':'green','ew':'red'}
mission_16th = {'ns':'red','ew':'green'}
#switchlights()函数，接受路口字典作为参数并切换红绿灯
def switchlights(stoplight):
    for key in stoplight.keys():
        if stoplight[key] == 'green':
            stoplight[key] = 'yellow'
        elif stoplight[key] == 'yellow':
            stoplight[key] = 'red'
        elif stoplight[key] == 'red':
            stoplight[key] = 'green'
            
switchlights(market_2nd) #{'ns': 'yellow', 'ew': 'green'}导致车相撞
```
最好的办法是在函数中加入断言，确保至少一个红灯

```python
assert 'red' in stoplight.values(),'Neither light is red!'+str(stoplight)
#AssertionError: Neither light is red!{'ns': 'yellow', 'ew': 'green'}
```
在完成编程后，在运行Python时在终端传入-O选项可以禁用断言以提升性能。断言是针对开发的而不是针对最终产品。

**日志**
通过logging模块替代print()语句。创建自定义消息记录，这些日志消息描述程序何时到达日志函数调用，并列出变量值，同时通过缺失日志监控被跳过的代码。

```python
import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s-%(levelname)s-%(message)s')
```

```python
import logging
logging.basicConfig(level=logging.DEBUG, format='%(asctime)s-%(levelname)s-%(message)s')
logging.debug('Start of program')

def factorial(n):
    logging.debug('Start of factorial(%s)'%(n))
    total = 1
    for i in range(n+1):
        total *= i
        logging.debug('i is '+ str(i) +', total is '+str(total))
    logging.debug('End of factorial(%s)'%(n))
    return total
print(factorial(5))
logging.debug('End of program')
```

```python
2020-05-12 14:24:32,265-DEBUG-Start of program
2020-05-12 14:24:32,266-DEBUG-Start of factorial(5)
2020-05-12 14:24:32,267-DEBUG-i is 0, total is 0
2020-05-12 14:24:32,267-DEBUG-i is 1, total is 0
2020-05-12 14:24:32,268-DEBUG-i is 2, total is 0
2020-05-12 14:24:32,268-DEBUG-i is 3, total is 0
2020-05-12 14:24:32,268-DEBUG-i is 4, total is 0
2020-05-12 14:24:32,269-DEBUG-i is 5, total is 0
2020-05-12 14:24:32,269-DEBUG-End of factorial(5)
2020-05-12 14:24:32,270-DEBUG-End of program
0
```
打印日志信息时使用logging.debug()函数，这个debug()函数将调用basicConfig()打印我们指定格式的内容。根据日志可以发现for循环没有从1开始，所以迭代都是错的。
将`for i in range(n+1)：`改为`for i in range(1,n+1)：`

```python
2020-05-12 14:25:08,171-DEBUG-Start of program
2020-05-12 14:25:08,173-DEBUG-Start of factorial(5)
2020-05-12 14:25:08,173-DEBUG-i is 1, total is 1
2020-05-12 14:25:08,174-DEBUG-i is 2, total is 2
2020-05-12 14:25:08,174-DEBUG-i is 3, total is 6
2020-05-12 14:25:08,175-DEBUG-i is 4, total is 24
2020-05-12 14:25:08,176-DEBUG-i is 5, total is 120
2020-05-12 14:25:08,176-DEBUG-End of factorial(5)
2020-05-12 14:25:08,177-DEBUG-End of program
120
```
日志消息表明循环内发生了什么，直接指向了缺陷。logging.debug()调用不仅打印了传递给它的字符串，而且包含一个时间戳和单词DEBUG。

```python
import logging
logging.basicConfig(level=logging.DEBUG,format='%(asctime)s-%(levelname)s-%(message)s')
```
上面的代码虽然有点不方便，但相比于在调试完成后冒着风险删除print()还是有很大优势的，只需在调试结束后加入一次`logging.disable(logging.CRITICAL)`调用，就能禁止日志。同样调试是用于编程的而不是针对用户的，例如文件不存在无效输入等等应使用print()。

日志有五种级别，对应五种日志函数。通过向basicConfig()函数传入logging.DEBUG作为level关键字参数,即显示所有日志级别;若设置为logging.ERROR，将只显示ERROR和CRITICAL消息。

```python
logging.debug() #诊断细节
logging.info() #记录一般事件
logging.warning() #表示可能的问题
logging.eror() #记录程序错误
logging.critical() #表示致命错误
```
通过向logging.disable()传入一个日志级别可以禁止该行代码以后等于或低于该级别的所有日志消息。

```python
logging.basicConfig(level=logging.INFO,format='%(asctime)s-%(levelname)s-%(message)s')
logging.critical('Critical error! Critical error!')
#2020-05-12 15:04:25,456-CRITICAL-Critical error! Critical error!
logging.disable(logging.CRITICAL)
#添加到接近import logging的位置，必要时可以注释掉
```
将日志记录到文件，logging.basicConfig()函数接受filename关键字参数：

```python
import logging
logging.basicConfig(filename='myProgramLog.txt',level=logging.DEBUG,format='%(asctime)s-%(levelname)-%(message)s')
#jupyter下disable后无法重开logging，VScode注释调就ok
```
练手：对以下代码进行调试，玩家有两次猜抛硬币的机会

```python
import random
guess = ''
while guess not in ('head','tails'):
    print('Guess the coin toss! Enter heads or tails:')
    guess = input()
    
```