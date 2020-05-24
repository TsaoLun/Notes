# C随笔

### 概述
1. 源代码
2. 编译器
3. 目标代码
4. 链接器（库函数，启动代码）
5. 可执行代码

```c
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


```c
/* platinum.c -- your weight in platinum */
#include <stdio.h>

int main(void)
{
    float weight;
    float value;

    printf("Are you worth your weight in platinum?\n");
    printf("Let's check it out.\n");
    printf("Please enter your weight in pounds: ");

    //获得用户输入并赋给变量weight，使用%f处理浮点值，&符号用来定位待赋值的weight
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

```c
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

```c
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

```c
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

```c
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

```c
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
```
打印浮点值：

```c
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