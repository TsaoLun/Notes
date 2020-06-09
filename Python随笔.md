# Python 随笔

## 入门

#### 函数

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
#### 列表

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

#### 方法

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

#### 引用

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
#### 字典

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

导入 pprint 模块，使用 pprint() 和 pformat() 函数实现漂亮打印

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

#### 字符串

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

rjust()，ljust() 和 center() 用于对齐文本,第一个参数是整数长度，第二个可选参数用于填充字符，取代空格。如果需要打印表格式数据，留出正确的空格，这些方法就特别有用：

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
pyperclip 模块的 copy() 和 paste() 函数用于拷贝与粘贴字符串

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

#### 正则表达式

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
Regex 对象的 findall() 方法，直接返回包含需查找字符串所有匹配的列表，不需要在调用 search() 方法后再对结果调用 group() 。针对未分组对象会返回字符串列表，针对已分组的则返回元组列表。

Regex 对象的 sub() 方法用于替换字符串，需要传入两个参数，第一个参数是用于取代发现匹配的字符串，第二个即待匹配的字符串，sub() 方法返回完成后的字符串

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

#### 读写文件

os.path.join() 函数用于返回完整的路径+文件名

```python
import os
print(os.path.join('home/lun','test.txt'))#ome/lun/test.txt
#可以创建一个文件名列表，利用for循环创建多个文件
```
+ os.getcwd() 函数获得当前路径
+ os.chdir() 函数改变当前路径
+ .\代表当前路径..\是上一级路径
+ .\spam.txt 和 spam.txt 指的是同一文件

os.makedirs() 函数创建新文件夹

```python
import os
os.makedirs('/home/lun/practice/waffles')
```
os.path.dirname(path) 返回 path 参数中最后一个斜杠之前的内容
os.path.basename(path) 返回 path 参数中最后一个斜杠之后的内容
os.path.split(path) 返回这两个字符串组成的元组

```python
path = '/home/lun/Documents/gopl-zh.pdf'
os.path.dirname(path) #'/home/lun/Documents'
os.path.basename(path) #'gopl-zh.pdf'
os.path.split(path) #('/home/lun/Documents', 'gopl-zh.pdf')
#返回由每个目录构成的列表
path.split(os.path.sep) #['', 'home', 'lun', 'Documents', 'gopl-zh.pdf']
```
os.path.getsize() 函数查看文件大小

```python
path = '/home/lun/Documents/gopl-zh.pdf'
os.path.getsize(path) #4347440(字节)
```
os.listdir() 函数查看文件夹下的文件名

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
查看文件夹下所有内容的总大小,注意 getsize() 函数不计算目录下内容的大小

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

#### 组织文件

shutil模块
shutil.copy(source,destination) 用于将 source 文件复制到 destination 处的文件夹。如果 destination 是一个文件名，它将作为被复制文件的新名字。该函数返回一个字符串，表示被复制文件的路径。

```python
import shutil, os
os.chdir('/home/lun/Documents')
shutil.copy('DOCX.docx','/home/lun/practice/test.docx')
#'/home/lun/practice/test.docx'
```
shutil.copytree() 与 shutil.copy() 类似，只不过复制整个文件夹以及它包含的文件
shutil.move(source, destination) 将路径 source 处的文件移动到 destination，并返回新位置的绝对路径。注意如果 destination 不存在，会将原文件改名，这个过程要注意。
os.unlink(path) 删除 path 处的文件，os.rmdir(path) 删除 path 处的空文件夹
shutil.rmtree(path) 将删除 path 处的文件夹及其包含的文件

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
用 send2trash 模块实现安全删除

```python
import send2trash
baconFile = open('bacon.txt','a')
baconFile.write('Bacon is not a vegatable.')
baconFile.close() #起保存作用
send2trash.send2trash('bacon.txt')
```
遍历目录树
os.walk() 函数被传入文件夹路径的字符串，返回3个值组成的 generator 迭代器:(str,list,list)，和 for 循环结合实现遍历目录树：

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
#### 调试

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
toss = random.randint(0,1) #0 is tails, 1 is heads
if toss == guess:
    print('You got it!')
else:
    print('None! Guess again!')
    guess = input()
    if toss == guess:
        print('You got it!')
    else:
        print('Nope. You are really bad at this game.')
```
修改后增加logging
```python
import random
import logging
logging.basicConfig(filename='guesslog.txt',level=logging.DEBUG, format='%(asctime)s-%(levelname)s-%(message)s')
logging.debug('Start of program')
guess = ''
while guess not in ('heads','tails'):
    print('Guess the coin toss! Enter heads or tails:')
    guess = input()
    logging.debug('guess is {}'.format(guess))
num = random.randint(0,1) #0 is tails, 1 is heads
tosslist = ['heads','tails']
toss = tosslist[num]
logging.debug('toss is {}'.format(toss))
if toss == guess:
    logging.debug('toss == guess')
    print('You got it!')
else:
    print('None! Guess again!')
    logging.debug('toss != guess')
    guess = input()
    logging.debug('second guess is {}'.format(guess))
    if toss == guess:
        logging.debug('toss == guess')
        print('You got it!')
    else:
        print('Nope. You are really bad at this game.')
        logging.debug('toss != guess')
logging.debug('End of program')
```
```python
#运行三次后查看logging
2020-05-12 21:17:29,212-DEBUG-Start of program
2020-05-12 21:17:45,849-DEBUG-guess is heads
2020-05-12 21:17:45,850-DEBUG-toss is heads
2020-05-12 21:17:45,850-DEBUG-toss == guess
2020-05-12 21:17:45,850-DEBUG-End of program
2020-05-12 21:17:51,076-DEBUG-Start of program
2020-05-12 21:18:42,187-DEBUG-guess is heads
2020-05-12 21:18:42,187-DEBUG-toss is heads
2020-05-12 21:18:42,187-DEBUG-toss == guess
2020-05-12 21:18:42,188-DEBUG-End of program
2020-05-12 21:18:46,799-DEBUG-Start of program
2020-05-12 21:18:49,179-DEBUG-guess is heads
2020-05-12 21:18:49,179-DEBUG-toss is tails
2020-05-12 21:18:49,180-DEBUG-toss != guess
2020-05-12 21:18:53,082-DEBUG-second guess is tails
2020-05-12 21:18:53,082-DEBUG-toss == guess
2020-05-12 21:18:53,082-DEBUG-End of program
```

#### Web信息抓取

**webbrowser**的open()函数启动浏览器打开指定URL

```python
import webbrowser
webbrowser.open('http://inventwithpython.com/')
```
首先弄清楚URL，再处理命令行参数以得到字符串。

```python
import webbrowser, sys
if len(sys.argv) > 1:
    address = ' '.join(sys.argv[1:])
```
sys.argv变量保存了程序的文件名和命令行参数的列表，如果列表不只有文件名返回值就会大于1，意味着提供了命令行参数。命令行参数通常用空格分隔，将它传递给join()方法返回字符串，同时去掉程序名sys.argv[0]

```python
import webbrowser, sys, pyperclip
if len(sys.argv) > 1:
    address = ' '.join(sys.argv[1:])
else:
    address = pyperclip.paste()
webbrowser.open('https://www.bing.com/maps/place/'+address)
#如果没有命令行参数，程序将假定地址保存在剪切版中，并调用webbrowser进行搜索。
```
**requests模块**
requests.get()函数接受一个要下载的URL字符串，通过在requests.get()的返回值上调用type()，你可以看到它返回一个Response对象，其中包含了Web服务器对请求作出的响应。

```python
import requests
res = requests.get('http://www.gutenberg.org/cache/epub/1112/pg1112.txt')
type(res) #requests.models.Response
```
通过检查Response对象的status_code属性，可以了解对这个网页的请求是否成功。下载的页面作为字符串，保存在Response对象的text变量中。

```python
res.status_code == requests.codes.ok #True(200)
len(res.text) #179378
print(res.text[:250])
"""
The Project Gutenberg EBook of Romeo and Juliet, by William Shakespeare


*******************************************************************
THIS EBOOK WAS ONE OF PROJECT GUTENBERG'S EARLY FILES PRODUCED AT A
TIME WHEN PROOFING METHODS AND TOO"""
```
在Response对象上调用raise_for_status()方法也可以了解请求是否成功，可以确保程序在下载失败时停止。

```python
res = requests.get('http://inventwithpython.com/page_that_does_not_exist')
res.raise_for_status()
#HTTPError: 404 Client Error: Not Found for url: http://inventwithpython.com/page_that_does_not_exist
```
用try和except语句将raise_for_status()代码行包裹起来，不让程序崩溃：

```python
res = requests.get('http://inventwithpython.com/page_that_does_not_exist')
try:
    res.raise_for_status()
except Exception as exc: #注意这个用法
    print('There was a problem: %s' % (exc))
#There was a problem: 404 Client Error: Not Found for url: http://inventwithpython.com/page_that_does_not_exist
```
用标准的open()函数和write()方法将Web页面保存到硬盘中的一个文件，这里有两点注意：为了保存该文本中的Unicode编码，必须用二进制模式即'wb'打开，也必须写入二进制数据，并利用Respose对象的iter_content()方法做循环，参数为100000。

```python
import requests
res = requests.get('http://www.gutenberg.org/cache/epub/1112/pg1112.txt')
res.raise_for_status()
with open('RomeoAndJuliet.txt','wb') as playfile:
    for chunk in res.iter_content(100000): #bytes数据类型
        playfile.write(chunk)
```
**BeautifulSoup**
bs4模块用于从HTML页面提取信息，首先创建BeautifulSoup对象：

```python
import requests, bs4
res = requests.get('http://nostarch.com')
res.raise_for_status()
noStarchSoup = bs4.BeautifulSoup(res.text)
type(noStarchSoup)
#现在要验证码了
```

```python
#尝试本地html文件
exampleFile = open('example.html')
exampleSoup = bs4.BeautifulSoup(exampleFile)
type(exampleSoup) #bs4.BeautifulSoup
```
用select()方法寻找元素，向BeautifulSoup对象的select()方法传递CSS选择器，比如soup.select('div')将匹配所有名为< div >的元素，soup.select('input[type="button"]')匹配所有名为< input >并有一个type属性值为button的元素。

select()方法将返回一个针对每次匹配的Tag对象列表，这是Beautiful Soup表示一个HTML元素的方式。Tag值可以传递给str()函数，显示它们代表的HTML标签。Tag值也可以有attrs属性，它将该Tag的所有HTML属性作为一个字典。

```python
import bs4
exampleFile = open('example.html')
exampleSoup = bs4.BeautifulSoup(exampleFile.read())
elems = exampleSoup.select('#author')
type(elems) #bs4.element.ResultSet
len(elems) #1
type(elems[0]) #bs4.element.Tag
elems[0].getText() #'Al Sweigart'
str(elems[0]) #'<span id="author">Al Sweigart</span>'
elems[0].attrs #{'id': 'author'}
```
也可以从BeautifulSoup对象中找出< p>元素，保存在pElems中，分别对其中每个元素使用str()函数，调用getText()方法。

```python
pElems = exampleSoup.select('p')
str(pElems[0]) #'<p>Download my <strong>Python</strong> book from <a href="http://inventwithpython.com">my website</a>.</p>'
pElems[0].getText() #'Download my Python book from my website.'
str(pElems[1]) #'<p class="slogan">Learn Python the easy way!</p>'
pElems[1].getText() #'Learn Python the easy way!'
str(pElems[2]) #'<p>By <span id="author">Al Sweigart</span></p>'
pElems[2].getText() #'By Al Sweigart'
```
Tag对象的get()方法可以从元素中获取属性值，向该方法传入一个属性名称的字符串将返回该属性的值。

```python
import bs4
soup = bs4.BeautifulSoup(open('example.html'))
spanElem = soup.select('span')[0]
str(spanElem) #'<span id="author">Al Sweigart</span>'
spanElem.get('id') #'author'
spanElem.get('some_nonexistent_addr') == None #True
spanElem.attrs #{'id': 'author'}
```
**练手：Bing查找 lucky.py**
+ 从命令行参数中获取查询关键字
+ 取得查询结果页面
+ 为每个结果打开浏览器选项卡

代码需要完成以下工作

- 从sys.argv中读取命令行参数
- 用requests模块取得查询结果页面
- 找到每个查询结果的链接
- 调用webbrowser.open()函数打开Web浏览器

```python
import requests, sys, webbrower, bs4
print('Bing...')
res = requests.get("http://bing.com/search?q=" + ' '.join(sys.argv[1:]))
res.raise_for_status()

soup = bs4.BeautifulSoup(res.text)
linkelems = soup.select('.r a')

numopen = min(5, len(linkelems))
for i in range(numopen):
    webbrowser.open('http://bing.com'+linkelems[i].get('href'))
```

**练手：下载所有XKCD漫画**

程序需要做的事：
+ 加载主页
+ 保存该页的漫画
+ 转入前一张漫画的链接
+ 重复直到第一张漫画

代码需要做的事：
+ 利用requests模块下载页面
+ 利用Beautiful Soup找到页面中漫画图像的URL
+ 利用iter_cotent()下载漫画图像并保存
+ 找到前一张漫画的连接URL，然后重复这一过程

```python
import requests, os, bs4
url = 'http://xkcd.com'
os.makedirs('xkcd', exist_ok=True)
while not url.endswith('#'):
    print('Downing page %s...' % url)
    res = requests.get(url)
    res.raise_for_status
    soup = bs4.BeautifulSoup(res.text)
    comicElem = soup.select('#comic img')
    if comicElem == []:
        print('Could not find comic image.')
    else:
        comicUrl = 'http:'+comicElem[0].get('src')
        print('Downloading image %s...' % (comicUrl))
        res = requests.get(comicUrl)
        res.raise_for_status()
    
        imageFile = open(os.path.join('xkcd', os.path.basename(comicUrl)),'wb')
        for chunk in res.iter_content(100000):
            imageFile.write(chunk)
        imageFile.close()
    
    prevlink = soup.select('a[rel="prec"]')[0]
    url = 'http://xkcd.com' + prevLink.get('href')
print('Done.')
```
<br/>


#### 简单实践

从 windows 上将之前的 markdown 笔记拖到 Ubuntu 上了，还合并了一个 images 文件夹，里面有很多笔记里没出现的多余图片，想要一张张区分开来很难搞。

![avatar](images/屏幕截图.png)

好在找到了规律，之前 windows 上保存的图片都是 png 后缀，而且都是插入到《ML基础教程笔记.md》中的，接下来写一个脚本，识别出 png 后缀的文件名并在 markdown 笔记中查找，对于找不到对应文件名的通通移动到指定文件夹中。

首先 import 两个必用模块 os 和 shutil，用 os.walk() 函数遍历该文件夹：

```python
import os
import shutil

pnglist = []
for fdname, subfds, flnames in os.walk('/home/lun/Notes/images'):
    for flname in flnames:
        if flname[:3] == 'png' or 'PNG':
            pnglist.append(flname)
```

好，我们来看一下列表...WTF？出现了好多 svg 后缀的文件？想不通，那就换个方法...

```python
import os
import shutil

pnglist = []
for fdname, subfds, flnames in os.walk('/home/lun/Notes/images'):
    for flname in flnames:
        if 'svg' not in flname and 'SVG' not in flname:
            pnglist.append(flname)
```

现在 png 后缀的列表建好了，遍历列表中的每个文件名，看看是否在 markdown 文件中，并放入不移动列表：

```python
notmov = []
with open('/home/lun/Notes/ML基础教程笔记.md') as f:
    for line in f.readlines():
        for i in pnglist:
            if i in line:
                notmov.append(i)
```

检查列表，嗯，大概没问题了。最后移动：

```python
for fl in pnglist:
    if fl not in notmov:
        shutil.move('/home/lun/Notes/images/'+fl,'/home/lun/Notes/')
```

好了，检查一下，发现刚刚的系统截图给误移除了，放回去，其他的框起来删掉就行（是的，没有用 os.unlink)

<br/>

## 进阶

### 整洁之道

<br/>

#### 断言

Python内置的断言 assert 语句是一种调试工具，用来测试某个断言条件。如果为真就正常执行，为假则会引发 AssertionError 异常并报错。

```python
def apply_discount(product, discount):

    price = int(product['price'] * (1.0 - discount))
    assert 0 <= price <= product['price']
    #确保折后价不低于0也不会高于产品原价

    return price 

#测试
shoes = {'name':'Fancy Shoes','price':14900}
apply_discount(shoes, 0.25) #11175
apply_discount(shoes, 2.0)
"""报错
AssertionError                            Traceback (most recent call last)
 in 
----> 1 apply_discount(shoes, 2.0)
 in apply_discount(product, discount)
      2 
      3     price = int(product['price'] * (1.0 - discount))
----> 4     assert 0 <= price <= product['price']"""
```
通过这种方法可以快速得知断言报错的位置，加快了调试工作的速度，也更易于维护。断言与 if 语句作用不同，它用于程序内部自检，如声明一些代码中不可能出现的条件，如果触发这些条件即意味着程序存在 bug ，换句话说，断言是用来帮助程序员找到 bug 的，不能用于程序逻辑判断。

> 断言会给应用程序带来安全风险和bug ；容易形成语法怪癖，编写无用断言



两个注意点：

1. 不要使用断言验证数据
命令行中使用 -O 或 -OO 标识或修改 CPython 环境变量就会全局禁用断言，而禁用断言可能会引发错误和安全漏洞，如下例所示：

```python
def delete_product(prod_id, user):
    assert user.is_admin(), 'Must be admin'
    assert store.has_product(prod_id), 'Unkown product'
    store.get_product(prod_id).delete()
```
这里的问题是使用断言检查管理员限权，一旦禁用后任意用户都可以删除产品，即引发安全问题。另一个问题是跳过了 has_product() 检查以对无效产品ID进行操作，最糟的情况会导致 DoS 攻击。所以在验证(操作）数据时使用常规的 if 语句，绝对不要使用断言：

```python
def delete_product(product_id, user):
    if not user.is_admin():
        raise AuthError('Must be admin to delete')
    if not store.has_product(product_id):
        raise ValueError('Unkown product id')
    store.get_product(product_id).delete()
```

2. 不要使用恒真断言
    错误地在 assert 后面添加括号形成元组，而非空元组恒真，故永不触发异常，比如：

```python
assert (
    counter == 10,
    "It should have counted all the items'
)

```

<br/>

#### 逗号

将列表、字典或集合常量分割成多行有助于提高可读性并更容易维护，此时为了避免在列表末尾添加移除内容而导致混乱，可以在每一项包括最后一项的后面添加逗号。

```python
names = [
    'Alice',
    'Bob',
    'Dilbert',
]
#避免了拼接特性引发bug
```

<br/>

#### with 语句

with 语句有助于简化一些通用资源管理模式，抽象出其中的功能并将其分解重用：

```python
with open('hello.txt', 'w') as f:
    f.write('hello, world!')
```
打开的文件描述符在程序执行离开with语句的上下文后关闭，和下面的代码等效：

```python
f = open('hello.txt', 'w')
try:
f.write('hello, world!')
finally:
    f.close()
```
再看一下 with 语句在 threading.Lock 类中的使用：

```python
some_lock = threading.Lock()

#有问题
some_lock.acquire()
try:
    #执行某些操作...
finally:
    some_lock.release()

#改进

with some_lock:
    #执行某些操作...
```
两个例子中 with 语句都抽象出大部分资源处理逻辑，不必每次都显式地写try...finally语句，在代码更易读的同时实现自动的资源释放。

> 上下文管理器：context manager，简单的协议（或接口），自定义对象需要遵循这个接口来支持 with 语句。如果想要将一个对象作为上下文管理器，需要向其中添加__enter__和__exit__方法，Python将在资源管理周期的适当时间调用这两种方法。

接下来定义一个 ManagedFile 类实现原来的 open() 上下文管理器：

```python
class ManagedFile:
    def __init__(self, name):
        self.name = name

    def __enter__(self):
        self.file = open(self.name, 'w')
        return self.file
    
    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()

#运行测试

with ManagedFile('hello.txt') as f:
    f.write('hello, world!')
    f.write('bye now')
```

当执行流程进入 with 语句上下文时，Python 会调用 `__enter__` 获取资源，离开 with 上下文时，Python 会调用 `__exit__` 释放资源。

除了基于上下文管理器来支持 with 语句外，标准库中的 contextlib 模块在上下文管理器基本协议的基础上提供了更多抽象：例如，contextlib.contextmanager 装饰器能够为资源定义一个基于生成器的工厂函数，该函数自动支持 with 语句。接下来用这种技术重写 ManagedFile 上下文管理器：

```python
from contextlib import contextmanager

@contextmanager

def managed_file(name): 
    try:
        f = open(name, 'w')
        yield f
    finally:
        f.close()

with managed_file('hello.txt') as f:
    f.write('hello, world!')
    f.write('bye now')
```
这里的 managed_file() 是生成器，先获取资源再暂停执行并产生资源以供调用者使用，当离开 with 上下文时生成器继续执行剩余的清理步骤，并将资源释放回系统。基于类的实现和基于生成器的实现基本是等价的。

上下文管理器非常灵活，巧妙使用 with 语句能够为模块和类定义方便的 API ：

```python
with Indenter() as indent:
    indent.print('hi!')
    with indent:
        indent.print('hello')
        with indent:
            indent.print('bonjour')
    indent.print('hey')

"""
hi!
        hello
            bonjour
    hey
"""
```
多次进入并离开相同的文本管理器，以更改缩进级别。接下来用基于类的上下文管理器来实现该方法：

```python
class Indenter:
    def __init__(self):
        self.level = 0
    
    def __enter__(self):
        self.level += 1
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self.level -= 1
    
    def print(self, text):
        print('    ' * self.level + text)
```
<br/>
要点：

+ with 语句通过在所谓的上下文管理器中封装 try...finally 语句的标准用法来简化异常处理。

+ with 语句一般用来管理系统资源的安全获取和释放。资源首先由 with 语句获取，并在执行离开 with 上下文时自动释放。

+ 有效地使用 with 有助于避免资源泄露的问题，让代码更易于阅读。

<br/>

#### 下划线

介绍五种带下划线的变量名或方法名：`_var`，`var_`，`__var`，`__var__`，`_`

**前置单下划线**：`_var`，PEP 8约定以单下划线开头的变量或方法只能在内部使用，但事实上 Python 没有私有和公共变量的严格区别：

```python
class Test:
    def __init__(self):
        self.foo = 11
        self._bar = 23

#此时尝试访问_bar
t = Test()
t._bar #23，并没有阻止我们访问
```
从模块中导入名称时，前置下划线会有影响（除非模块定义了 `__all__` 列表覆盖）：

```python
# my_module.py:

def external_func():
    return 23
def _internal_func():
    return 42
```
使用通配符导入这个模块的所有名称（一般不推荐用）：

```python
from my_module import *
external_func() #23
_internal_func() #not defined
```
<br/>

**后置单下划线**：`var_`，一般某个最合适的名称已被 Python 的关键字占用时使用：

```python
#class是Python关键字
#直接用会报错SyntaxError:"invalid syntax"
def make_object(name, class_):
    pass
```
<br/>

**前置双下划线**：`__var`，在类环境中触发改写，会让 Python 解释器重写属性名称，以避免子类中的命名冲突。

```python
class Test:

    def __init__(self):
        self.foo = 11
        self._bar = 23
        self.__baz = 42 
        #__baz被改名为_Test__baz

#接着用内置的dir()函数查看这个对象的属性
t = Test()
dir(t)

"""
['_Test__baz', #__bar
 '__class__',
 '__delattr__',
 '__dict__',
 '__dir__',
 '__doc__',
 '__eq__',
 '__format__',
 '__ge__',
 '__getattribute__',
 '__gt__',
 '__hash__',
 '__init__',
 '__init_subclass__',
 '__le__',
 '__lt__',
 '__module__',
 '__ne__',
 '__new__',
 '__reduce__',
 '__reduce_ex__',
 '__repr__',
 '__setattr__',
 '__sizeof__',
 '__str__',
 '__subclasshook__',
 '__weakref__',
 '_bar',
 'foo']
 """
```
其中 _Test__baz 是 Python 解释器应用名称改写之后的属性名称，可以防止子类覆盖这些变量。

接着创建另一个类来扩展 Test 类，并尝试覆盖之前构造函数中添加到属性：

```python
class ExtendedTest(Test):
    def __init__(self):
        super().__init__()
        self.foo = 'overridden'
        self._bar = 'overridden'
        self.__bar = 'overridden'

t2 = ExtendedTest()
t2.__baz 
#"'ExtendedTest' object has no attribute '__baz'"
```

即该对象不存在`__baz`属性，只有`_ExtendedTest__baz`以及原来的`_Test__baz`

```python
class ManglingTest:
    def __init__(self):
        self.__mangled = 'hello'
    
    def get_mangled(self):
        return self.__mangled

ManglingTest().get_mangled() #'hello'
ManglingTest().__mangled #AttributeError

class MangledMethod:
    def __method(self):
        return 42
    def call_it(self):
        return self.__method()

MangledMethod().__method() #AttributeError
MangledMethod().call_it() #42

_MangledGlobal__mangled = 23
class MangledGlobal:
    def test(self):
        return __mangled
    
MangledGlobal().test() #23
```

最后一个例子通过声明全局变量并赋值，并成功改变了`MangledGlobal().test()`，说明名称改写不专门与类属性绑定，而是能够应用于类环境中所有以双下划线开头的名称。

<br/>

**前后双下划线**：`__var__`，前后由双下划线包围的变量不受 Python 解释器影响，但一般是类似于`__init__`，`__call__`这样有特殊用途的：

```python
class PrefixPostfixTest:
    def __init__(self):
        self.__bam__ = 42
```

<br/>

**单下划线**：`_`，用作临时或无关紧要的变量名称。

```python
for _ in range(32):
    print("Hello, World.")

car = ('red', 'auto', 12, 3812.4)
color, _, _, mileage = car
#这里只需要用到color和mileage
```

在解释器会话中 `_` 可以获得先前的结果或对象

```python
list() #[]

_.append(1)
_.append(2)
_.append(3)

_ #[1, 2, 3]
```

<br/>

#### 字符串格式化

1. 通过 % 操作符进行位置格式化，类似C语言中的 printf 风格（转换说明）:

```python
errno = 50159747054
name = 'Bob'

"Hello, %s" % name #'Hello, Bob'
"%x" % errno #'badc0ffee',将int转换为十六进制

"Hey %s, there is a 0x%x error!" % (name,errno)
#'Hey Bob, there is a 0xbadc0ffee error!' 注意和C的区别

#还能按名称替换变量
"Hey %(name)s, there is a 0x%(errno)x error!" % {"name":name, "errno":errno}
#'Hey Bob, there is a 0xbadc0ffee error!'
```
2. format() 函数

```python
"Hello, {}".format(name) #'Hello, Bob'

#还能用别名排序，并且不必修改格式参数
"Hey {name}, there is 0x{errno:x} error!".format(name=name, errno=errno)
#'Hey Bob, there is 0xbadc0ffee error!' 十六进制符号后缀
```
3. 字符串字面值 3.6+

```python
f"Hello, {name}!" #'Hello, Bob!'

a = 5
b = 10
f"Five plus ten is {a+b} and not {2 * (a + b)}."
#'Five plus ten is 15 and not 30.'
```
本质上，格式化字符串字面值是 Python 解释器的功能，将 f 字符串转换为一系列字符串常量和表达式，然后合并起来构建最终的字符串。

字符串字面值也支持 str.format() 方法：

```python
f"Hey {name}, there's a {errno:#x} error!"
#"Hey Bob, there's a 0xbadc0ffee error!"

f"Hey {name}, there's a 0x{errno:x} error!"
#"Hey Bob, there's a 0xbadc0ffee error!"
```
4. 模板字符串 template string

```python
from string import Template
t = Template('Hey, $name!')
t.substitute(name=name)
#'Hey, Bob!'

#模板字符串不能使用格式说明符，只能手动转换十六进制
templ_string = 'Hey $name, there is a $error error!'
Template(templ_string).substitute(name=name,error=hex(errno))
#'Hey Bob, there is a 0xbadc0ffee error!'
#模板字符串本身无法访问任何变量，比其他格式化字符串更安全
```
<br/>

**Python 之禅**

美丽好过丑陋，

浅显好过隐晦，

简单好过复合，

复合好过复杂，

扁平好过嵌套，

稀疏好过密集，

可读性最重要，

即使祭出实用性为理由，特例也不可违背这些规则。

不应默认包容所有错误，得由人明确地让它闭嘴！

面对太多的可能，不要尝试猜测，应该有一个直白的解决方法。

当然，找到这个方法不是件容易的事，谁叫你不是荷兰人呢！

但是，现在就做永远比不做要好。

若实现方案很难解释，那么它就不是一个好方案；反之也成立！

名称空间是一个绝妙想法——现在就来共同共同体验和增进这些吧！

<br/>

**The Zen of Python, by Tim Peters**

```python
Beautiful is better than ugly.
Explicit is better than implicit.
Simple is better than complex.
Complex is better than complicated.
Flat is better than nested.
Sparse is better than dense.
Readability counts.
Special cases aren't special enough to break the rules.
Although practicality beats purity.
Errors should never pass silently.
Unless explicitly silenced.
In the face of ambiguity, refuse the temptation to guess.
There should be one-- and preferably only one --obvious way to do it.
Although that way may not be obvious at first unless you're Dutch.
Now is better than never.
Although never is often better than *right* now.
If the implementation is hard to explain, it's a bad idea.
If the implementation is easy to explain, it may be a good idea.
Namespaces are one honking great idea -- let's do more of those!
```