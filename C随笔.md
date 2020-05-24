# C随笔

### 编程机制
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