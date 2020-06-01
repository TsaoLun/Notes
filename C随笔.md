# C随笔

<br/>

### 概述

编程机制：
1. 源代码
2. 编译器
3. 目标代码
4. 链接器（库函数，启动代码）
5. 可执行代码

```c++
#include <stdio.h> // #include预处理器指令，stdio.h头文件是编译器软件包标准部分，提供键盘输入和屏幕输出

void butler(void); //函数原型(函数声明)，告知编译器在程序中会使用该函数，同时指名函数属性(没有返回值，不带参数)

int main(void) //函数头，main()函数，返回整数，不带参数
{              //函数体开始
    int num1, num2;   //声明变量，所有变量必须先声明才能使用，包含变量名和类型

    num1 = 1;  //赋值表达式，将等号右侧的值储存在声明时编译器为num预留了的内存空间中
    num2 = 2;
    printf("My favorite numbers are %d and %d.\n", num1, num2); //调用printf()函数，%d占位符，num作为十进制整数打印
    butler();
    return 0;  //对应main函数返回值int，默认返回0
}

void butler(void) //定义函数
{
    printf("You rang, sir?\n);
}
```

<br/>

### 数据和C


```c++
/* platinum.c -- your weight in platinum */
#include <stdio.h>

int main(void)
{
    float weight;
    float value;

    printf("Are you worth your weight in platinum?\n");
    printf("Let's check it out.\n");
    printf("Please enter your weight in pounds: ");

    //获得用户输入并赋给变量weight，使用%f处理浮点值，前缀&创建指针以定位待赋值的weight
    scanf("%f", &weight); 
    //假设黄金价格是每盎司$1700，14.5833将用于转换单位
    value = 1700 * weight * 14.5833;

    printf("Your weight in platinum is worth $%.2f.\n", value); 
    //%.2f转换说明，指定printf()以保留两位小数的浮点型格式打印value
    printf("You are easily worth that! If platinum prices drop,\n");
    printf("eat more to maintain your value.\n");
    
    getchar();
    getchar(); 
    //第一个getchar()读取输入后的换行符，所以需要第二个getchar()实现暂停
    return 0;
}
```

```c++
/*base.c--以十进制、八进制、十六进制打印十进制数100*/
#include <stdio.h>
int main(void)
{
    int x = 100;

    printf("dec = %d; octal = %o; hex = %x\n", x, x, x);
    printf("dec = %d; octal = %#o; hex = %#x\n", x, x, x); //#带前缀

    return 0;
}

/*
dec = 100; octal = 144; hex = 64
dec = 100; octal = 0144; hex = 0x64
*/
```

```c++
/*print2.c--根据待打印值的类型使用正确的转换说明*/
#include <stdio.h>
int main(void)
{
    unsigned int un = 3000000000;
    short end = 200;
    long big = 65537;
    long long verybig = 12345678908642;

    printf("un = %u and not %d\n", un, un);
    printf("end = %hd and %d\n", end, end); //%hd转换说明，打印short类型
    printf("big = %ld and not %hd\n", big, big); //%ld转换说明，打印long类型
    printf("verybig = %lld and not %ld\n", verybig, verybig); 

    return 0;
}
/*
un = 3000000000 and not -1294967296
end = 200 and 200
big = 65537 and not 1
verybig = 12345678908642 and not 12345678908642
*/
```
在C语言中，用单引号括起来的单个字符被称为字符常量 _character constant_（一般是字母和标点），双引号括起来的是字符串。正确的字符常量赋值和初始化方法：`char grade = ' A ';` ，char 还能将转义序列赋给字符变量，同样需要单引号：`char nerf = ' \n ';` 此时打印nerf的效果是另起一行。

```c++
/*实现三次Warning三次警鸣*/
#include <stdio.h>
int main(void)
{
    char alert = '\a';
    
    printf("Warning!\n");
    printf("%c",alert);
    getchar();

    printf("Warning!\n");
    printf("%c",alert);
    getchar();

    printf("Warning!\n");
    printf("%c",alert);
    getchar();

    return 0;
}
```

```c++
/*charcode.c-显示字符的代码编号*/
#include <stdio.h>
int main(void)
{
    char ch;

    printf("Please enter a character.\n");
    scanf("%c", &ch);
    printf("The code for %c is %d.\n", ch, ch);
    //%d转换说明打印ch字符对应的ASCII码

    return 0;
}

/*
a
The code for a is 97.
*/
```
可移植类型和相应转换说明的用法：（这块不理解）

```c++
/*altnames.c -- 可移植整数类型名*/
#include <stdio.h>
#include <inttypes.h> //支持可移植类型的头文件
int main(void)
{
    int32_t me32; //me32是一个32位有符号整数变量

    me32 = 45933945;
    printf("First, assume int32_t is int: ");
    printf("me32 = %d\n", me32);
    printf("Next, let's not make any assumptions.\n");
    printf("Instead, use a \"macro\" from inttypes.h: ");
    printf("me32 = %" PRId32 "\n", me32);

    return 0;
}
/*
First, assume int32_t is int: me32 = 45933945
Next, let's not make any assumptions.
Instead, use a "macro" from inttypes.h: me32 = 45933945
*/
```
打印浮点值：

```c++
/*showf_pt.c--以两种方式显示float类型的值*/
#include <stdio.h>
int main(void)
{
    float about = 32000.0;
    double abet = 2.14e9;
    long double dip = 5.32e-5;

    printf("%f can be written %e\n", about, about);
    printf("And it's %a in hexadecimal, powers of 2 notation\n", about);
    printf("%f can be written %e\n", abet, abet);
    printf("%Lf can be written %Le\n", dip, dip);

    return 0;
}
/*
32000.000000 can be written 3.200000e+04
And it's 0x1.f4p+14 in hexadecimal, powers of 2 notation
2140000000.000000 can be written 2.140000e+09
0.000053 can be written 5.320000e-05
*/
```

浮点值的上溢和下溢：

```c++
/*floatterr.c--演示舍入错误*/
#include <stdio.h>
int main(void)
{
    float a,b;

    b = 2.0e20 + 1.0;
    a = b - 2.0e20;
    printf("%f \n", a);

    return 0;
}
//4008175468544.000000 
```
计算机缺少足够的小数位来完成正确的运算，float 类型只能存储按指数比例缩小或放大的6或7位有效数字，而2.0e20加1发生变化的是第21位，改成2.0e4加1则只需改变第5位上的数字。

当前系统的类型大小：

```c++
/*typesize.c -- 打印类型大小*/
#include <stdio.h>
int main(void)
{
    printf("Type int has a size of %zd bytes.\n", sizeof(int));
    printf("Type char has a size of %zd bytes.\n", sizeof(char));
    printf("Type long has a size of %zd bytes.\n", sizeof(long));
    printf("Type long long has a size of %zd bytes.\n", sizeof(long long));
    printf("Type long double has a size of %zd bytes.\n", sizeof(long double));

    return 0;
}
/*
Type int has a size of 4 bytes.
Type char has a size of 1 bytes.
Type long has a size of 8 bytes.
Type long long has a size of 8 bytes.
Type long double has a size of 16 bytes.
*/
```
参数匹配问题

C语言通过函数原型机制检查函数调用时参数的个数和类型是否正确，但该机制对 printf() 和 scanf() 不起作用，因为这两个函数的参数个数可变:

```c++
/*badcount.c--参数错误的情况*/
#include <stdio.h>
int main(void)
{
    int n = 4;
    int m = 5;
    float f = 7.0f;
    float g = 8.0f;

    printf("%d\n", n, m); //参数太小
    printf("%d %d %d\n", n); //参数太多
    printf("%d %d\n", f, g); //值类型不匹配

    return 0;
}
/*
4
4 0 0
1758986848 0
*/
```
注意用%d显示 float 类型的值，其值不会被转换成 int 类型，编译器会捕捉到这类问题但C标准对此未做要求。

转义序列示例：退格(\b)、水平制表符(\t)、回车(\r)的工作方式演示：

```c++
/*escape.c -- 使用转义序列*/
#include <stdio.h>
int main(void)
{
    float salary;

    printf("\aEnter your desired monthly salary:");
    printf(" $_______\b\b\b\b\b\b\b"); //7个下划线
    scanf("%f", &salary);
    printf("\n\t$%.2f a month is $%.2f a year.", salary, salary * 12.0);
    printf("\rGee!\n");

    return 0;
}
```
刷新输出：最初 printf() 语句将输出发送到一个叫作缓冲区的中间存储区域，当缓冲区满、遇到换行字符或需要输入的时候就会刷新缓冲区。旧式编译器遇到scanf() 也不刷新缓冲区，即不显示任何内容等待用户输入，这时需要改代码：

```c++
printf("Enter your desired monthly salary:\n");
scanf("%f", &salary);
```
<br/>

### 字符串和格式化I/O

```c++
//talkback.c -- 演示与用户交互
#include <stdio.h>
#include <string.h> //提供strlen()函数的原型
#define DENSITY 62.4 //人体密度，用C预处理器定义字符常量

int main()
{
    float weight, volume;
    int size, letters;
    char name[40]; 
    //name是一个可容纳40个字符的数组array，即用数组储存字符串，占用内存40个连续字节

    printf("Hi! What's your first name?\n");
    scanf("%s", name); //为什么不需要&?
    printf("%s, what's your weight in pounds?\n", name);
    scanf("%f", &weight)；
    size = sizeof name;
    letters = strlen(name); //获取字符串长度
    volume = weight / DENSITY;
    printf("Well, %s, your volumn is %2.2f cubic feet.\n", name, volumn);
    printf("Also, your first name has %d letters,\n", letters);
    printf("and we have %d bytes to store it.\n", size);

    return 0;
}

/*
Hi! What's your first name?
TsaoLun
TsaoLun, what's your weight in pounds?
23
Well, TsaoLun, your volume is 0.37 cubic feet.
Also, your first name has 7 letters,
and we have 40 bytes to store it.
*/
```

**字符串**

_character string_ ，一个或多个字符的序列，双引号不是字符串的一部分，作用类似于单引号标识单个字符一样。

C语言没有专门存储字符串的变量类型，字符串都被存储在char类型的数组中。数组由连续的存储单元组成，字符串中的字符被存储在相邻的存储单元中，每个单元存储一个字符。数组末尾位置的字符 \0 是空字符 null character，用来标记字符串的结束，这意味着数组的容量必须比待存储字符串的字符数多1。

```c++
/*praise1.c--使用不同类型的字符串*/
#include <stdio.h>
#define PRAISE "You are an extraordinary being."

int main(void)
{
    char name[40];

    printf("What's your name? ");
    scanf("%s", name);
    printf("Hello, %s. %s\n", name, PRAISE);

    return 0;
}

/*
What's your name? Angela Plains
Hello, Angela. You are an extraordinary being.
为什么输入40个字符能正常储存？*/
```
scanf() 只读取了 Angela Plains 中的 Angela，在遇到第一个空白（空格，制表符或换行符）的时候就不再读取输入。根据 %s 转换说明，scanf() 只会读取字符串中的一个单词而不是一整句。

sizeof 运算符以字节为单位给出对象的大小，strlen() 函数给出字符串中的字符长度，我们把两种方法用于字符串并比较结果：

```c++
/*praise2.c*/
#include <stdio.h>
#include <string.h> //提供strlen()函数的原型
#define PRAISE "You are an extraordinary being."

int main(void)
{
    char name[40];

    printf("What's your name? ");
    scanf("%s", name);
    printf("Hello, %s. %s\n", name, PRAISE);
    printf("Your name of %zd letters occupies %zd memory cells.\n", strlen(name), sizeof name);
    printf("The phrase of praise has %zd letters ", strlen(PRAISE));
    printf("and occupies %zd memory cells.\n", sizeof PRAISE);

    return 0;
}

/*
What's your name? Aaron Yuan
Hello, Aaron. You are an extraordinary being.
Your name of 5 letters occupies 40 memory cells.
The phrase of praise has 31 letters and occupies 32 memory cells.

What's your name? 0123456789012345678901234567890123456789
Hello, 0123456789012345678901234567890123456789. You are an extraordinary being.
Your name of 40 letters occupies 40 memory cells. ？？？
The phrase of praise has 31 letters and occupies 32 memory cells.
*/
```
C语言把函数库中相关的函数归为一类，并为每类函数提供一个头文件。C99 和 C11 标准为 sizeof 运算符的返回类型添加了 %zd 转换说明，这对 strlen() 同样适用。早期 sizeof 和 strlen() 返回的实际类型为 unsigned 或 unsigned long 。注意，sizeof 的运算对象是类型时需要圆括号，比如 sizeof(char)，但对特定量则可有可无，建议是所有情况都加括号。

**常量和C预处理器**

程序中使用符号常量比数字常量表意更清晰，也更方便修改。因为变量值会在程序中改变，相比于声明变量再赋值，要创建符号常量更好的办法是用预处理器来定义。通用格式为 `define NAME value` ，符号常量一般大写，所有的 NAME 会完成编译时替换，这样的常量被称为明示常量。

```c++
/*pizza.c -- 在比萨饼程序中使用已定义的常量*/
#include <stdio.h>
#define PI 3.14159

int main(void)
{
    float area, circum, radius;

    printf("What is the radius of your pizza?\n");
    scanf("%f", &radius);
    area = PI * radius * radius;
    circum = 2.0 * PI * radius;
    printf("Your basic pizza parameters are as follows:\n");
    printf("circumference = %1.2f, area = %1.2f\n", circum, area); 
    //1表示打印宽度

    return 0;
}
```
const关键字，用于限定一个变量为只读：`const int MONTHS = 12;`，const 用起来比#define更灵活。

```c++
//defines.c -- 使用limit.h和float头文件中定义的明示常量
#include <stdio.h>
#include <limits.h> //整形限制
#include <float.h>  //浮点型限制

int main(void)
{
    printf("Some number limits for this system:\n");
    printf("Biggest int: %d\n", INT_MAX);
    printf("Smallest long long: %lld\n", LLONG_MIN);
    printf("One byte = %d bits on this system.\n", CHAR_BIT);
    printf("Largest double: %e\n", DBL_MAX);
    printf("Smallest normal float: %e\n", FLT_MIN);
    printf("float precision = %d digits\n", FLT_DIG);
    printf("float epsilon = %e\n", FLT_EPSILON);

    return 0;
}

/*
Some number limits for this system:
Biggest int: 2147483647
Smallest long long: -9223372036854775808
One byte = 8 bits on this system.
Largest double: 1.797693e+308
Smallest normal float: 1.175494e-38
float precision = 6 digits
float epsilon = 1.192093e-07
*/
```

**printf()**

printf() 函数打印数据的指令要与待打印数据的类型相匹配。转换说明 _conversion specification_ 指定了如何把数据转换成可显示的形式。

```c++
/*printout.c -- 使用转换说明*/
#include <stdio.h>
#define PI 3.141593
int main(void)
{
    int number = 7;
    float pies = 12.75;
    int cost = 7800;

    printf("The %d contestants ate %f berry pies.\n", number, pies);
    printf("The value of pi is %f.\n", PI);
    printf("Farewell! thou art too dear for my possessing,\n");
    printf("%c%d\n", '$', 2 * cost);

    return 0;
}

/*
The 7 contestants ate 12.750000 berry pies.
The value of pi is 3.141593.
Farewell! thou art too dear for my possessing,
$15600
*/
```

```c++
/*width.c -- 字段宽度*/
#include <stdio.h>
#define PAGES 959
int main(void)
{
    printf("*%d*\n", PAGES);
    printf("*%2d*\n", PAGES);
    printf("*%10d*\n", PAGES); //默认右对齐
    printf("*%-10d*\n", PAGES); //负号左对齐

    return 0;
}

/*
*959*
*959*
*       959*
*959       *
*/
```

```c++
//floats.c -- 一些浮点型修饰符的组合
#include <stdio.h>

int main(void)
{
    const double RENT =3852.99; // const变量，只读

    printf("*%f*\n", RENT);
    printf("*%e*\n", RENT);
    printf("*%4.2f*\n", RENT);
    printf("*%3.1f*\n", RENT);
    printf("*%10.3f*\n", RENT);
    printf("*%10.3E*\n", RENT);
    printf("*%+4.2f*\n", RENT);
    printf("*%010.2f*\n", RENT);

    return 0;
}

/*
*3852.990000*
*3.852990e+03*
*3852.99*
*3853.0*
*  3852.990*
* 3.853E+03*
*+3852.99*
*0003852.99*
*/
```

```c++
//flags.c -- 演示一些格式标记
#include <stdio.h>

int main(void)
{
    printf("%x %X %#x\n", 31, 31, 31);
    printf("**%d**% d**% d**\n", 42, 42, -42);
    printf("**%5d**%5.3d**%05d**%05.3d**\n", 6, 6, 6, 6);

    return 0;
}

/*
1f 1F 0x1f
**42** 42**-42**
**    6**  006**00006**  006**
*/
```

```c++
//stringf.c -- 字符串格式
#include <stdio.h>
#define BLURB "Authentic imitation!"
int main(void)
{
    printf("[%2s]\n", BLURB);
    printf("[%24s]\n", BLURB);
    printf("[%24.5s]\n", BLURB);
    printf("[%-24.5s]\n", BLURB);

    return 0;
}

/*
[Authentic imitation!]
[    Authentic imitation!]
[                   Authe]
[Authe                   ]
*/
```

```c++
//intconv.c -- 一些不匹配的整型转换
#include <stdio.h>
#define PAGES 336
#define WORDS 65618
int main(void)
{
    short num = PAGES;
    short mnum = -PAGES;
    
    printf("num as short and unsigned short: %hd %hu\n", num, num);
    printf("-num as short and unsigned short: %hd %hu\n", mnum, mnum);
    printf("num as int and char: %d %c\n", num, num);
    printf("WORDS as int, short, and char: %d %hd %c\n", WORDS, WORDS, WORDS);

    return 0;
}

/*
num as short and unsigned short: 336 336
-num as short and unsigned short: -336 65200
num as int and char: 336 P
WORDS as int, short, and char: 65618 82 R
*/
```

```c++
//floatcnv.c -- 不匹配的浮点型转换
#include <stdio.h>
int main(void)
{
    float n1 = 3.0;
    double n2 = 3.0;
    long n3 = 2000000000;
    long n4 = 1234567890;

    printf("%.1e %.1e %.1e %.1e\n", n1, n2, n3, n4);
    printf("%ld %ld\n", n3, n4);
    printf("%ld %ld %ld %ld\n", n1, n2, n3, n4);

    return 0;
}

/*
3.0e+00 3.0e+00 -5.5e+303 3.2e-319
2000000000 1234567890
2000000000 1234567890 0 0
*/
```
参数传递：`printf("%ld %ld %ld %ld\n", n1, n2, n3, n4)`，该调用将 n1,n2,n3,n4 的值传递给程序，程序将传入的值放入被称为栈(stack)的内存区域。计算机根据变量类型（不是转换说明）将值放入栈中，分别占8,8,4,4字节。控制转到 printf() 函数，该函数根据转换说明从栈中读取值。%ld 转换说明表明 printf() 应该读取四个字节，即n1的前半部分被解释为long类型的整数，后半部分则被第二个%ld读取，第三第四个%ld类，故全部读错。

大部分C函数都有一个返回值，这是函数计算并返回给主调程序(calling program)的值。例如C库的 sqrt() 函数，接受一个数作为参数并返回该数的平方根。可以把返回值赋给变量，也可以用于计算，还能作为参数传递。printf() 返回打印字符的个数，如果输出有误则返回负值，可以利用其返回值来检查输出错误。

```c++
//prntval.c -- printf()返回值
#include <stdio.h>
int main(void)
{
    int bph2o = 212;
    int rv;

    rv = printf("%d F is water's boiling point.\n", bph2o);
    //在打印信息的同时完成赋值
    printf("The printf() function printed %d characters.\n", rv);

    return 0;
}

/*
212 F is water's boiling point.
The printf() function printed 32 characters.
*/
```

一条 printf() 语句可以写成多行，只需在不同部分之间输入空白即可。注意不能在双引号括起来的字符串中间断行，正确断行方法如下：

```c++
//longstrg.c -- 打印较长字符串
#include <stdio.h>
int main(void)
{
    printf("Here's one way to print a ");
    printf("long string.\n");
    printf("Here's another way to print a \
long string.\n");
    printf("Here's the newest way to print a "
    "long string.\n"); //ANSI C

    return 0;
}

/*
Here's one way to print a long string.
Here's another way to print a long string.
Here's the newest way to print a long string.
*/
```
**scanf()**

scanf() 把输入的字符串转换成整数、浮点数、字符或字符串，与 printf() 类似，也使用格式字符串和参数列表，其中格式字符串表明字符输入流的目标数据类型，而针对参数列表，printf() 函数使用变量、常量和表达式，scanf() 函数使用指向变量的指针。

先记住，scanf() 读取**基本变量类型**的值，在变量名前加上一个&，而如果用 scanf() 把**字符串**读入字符数组中，则不要使用 & 。

```c++
//input.c -- 何时使用&
#include <stdio.h>
int main(void)
{
    int age;
    float assets;
    char pet[30];

    printf("Enter your age, assets, and favorite pet.\n");
    scanf("%d %f", &age, &asserts);
    scanf("%s", pet);
    printf("%d $%.2f %s\n", age, assets, pet);

    return 0;
}

/*
Enter your age, assets, and favorite pet.
12 
30
Dog
12 $30.00 Dog
*/
```
scanf() 函数使用空白（换行符、制表符和空格）把输入分成多个字段。唯一例外的是%c转换说明，它会读取每个字符，包括空白。

在两个转换说明中添加一个逗号 `scanf("%d,%d", &n, &m);` ，则输入也必须在两个数字中间加入逗号，而两个输入数字间的空白将被忽略，两个转换说明间的空白也一样。只有在%c前加入空白时，scanf() 会从第一个非空白符开始读取。scanf() 函数返回成功读取的项数。

***修饰符**

printf() 和 scanf() 都可以使用*修饰符来修改转换说明的含义，比如在 printf() 中替代字段宽度：

```c++
//varwid.c -- 使用变宽输出字段
#include <stdio.h>
int main(void)
{
    unsigned width, precision;
    int number = 256;
    double weight = 242.5;
    
    printf("Enter a field width:\n");
    scanf("%d", &width);
    printf("The number is:%*d:\n", width, number);
    printf("Now enter a width and a precision:\n");
    scanf("%d %d", &width, &precision);
    printf("Weight = %*.*f\n", width, precision, weight);
    printf("Done!\n");
        
    return 0;
}

/*
Enter a field width:
6
The number is:   256:
Now enter a width and a precision:
8
3
Weight =  242.500
Done!
*/
```
scanf() 中 * 的用法不同，把 * 放在%和转换字符之间，使得 scanf() 跳过相应的输出项：

```c++
//skiptwo.c -- 跳过输入中的前两个整数
#include <stdio.h>
int main(void)
{
    int n;

    printf("Please enter three integers:\n");
    scanf("%*d %*d %d", &n);
    printf("The last integer was %d\n", n);

    return 0;
}

/*
Please enter three integers:
2013 2014 2015
The last integer was 2015
*/
```
<br/>

## 运算符、表达式和语句

**while 循环**

首先不使用循环，计算穿9码男鞋的脚长：

```c++
//shoes1.c -- 把鞋码转换为
#include <stdio.h>
#define ADJUST 7.31 //创建符号常量

int main(void)
{
    const double SCALE = 0.333; //创建不可更改变量
    double shoe, foot;

    shoe = 9.0;
    foot = SCALE * shoe + ADJUST;
    //根据鞋尺码计算脚长

    printf("Shoe size (men's)    foot length\n");
    printf("%10.1f %15.2f inches\n", shoe, foot);

    return 0;
}

/*
Shoe size (men's)    foot length
       9.0           10.31 inches
*/
```

利用 while 循环改进程序：

```c++
//shoes2.c -- 计算多个不同鞋码对应的脚长
#include <stdio.h>
#define ADJUST 7.31

int main(void)
{
    const double SCALE = 0.333;
    double shoe, foot;

    printf("Shoe size (men's)    foot length\n");
    shoe = 3.0;
    while (shoe < 18.5)
    {
        foot = SCALE * shoe + ADJUST;
        printf("%10.1f %15.2f inches\n", shoe, foot);
        shoe = shoe + 1.0;
        //返回while入口部分检查条件，花括号内的部分被称为块block
    }
    printf("If the shoe fits, wear it.\n");

    return 0;
}

/*
Shoe size (men's)    foot length
       3.0            8.31 inches
       4.0            8.64 inches
       5.0            8.97 inches
       6.0            9.31 inches
       7.0            9.64 inches
       8.0            9.97 inches
       9.0           10.31 inches
      10.0           10.64 inches
      11.0           10.97 inches
      12.0           11.31 inches
      13.0           11.64 inches
      14.0           11.97 inches
      15.0           12.30 inches
      16.0           12.64 inches
      17.0           12.97 inches
      18.0           13.30 inches
If the shoe fits, wear it.
*/
```
**基本运算符**
