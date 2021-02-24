//---------- 内存控制 ----------
//V8 在 64 位上的内存限制为 1.4GB，在 32 位上为 0.7GB
//可在启动时通过 node --max-old-space-size=1700 XXXX.js 调用更多的堆内存

/* > process.memoryUsage();
{
  rss: 145670144,
  heapTotal: 5709824, //堆内存总量 约5G
  heapUsed: 4687152, //已使用的堆内存 约4G
  external: 1004101, 
  arrayBuffers: 9935
} */

//V8 为避免垃圾回收引起的线程暂停，限制了堆内存的大小

//----- 垃圾回收 -----
//V8 的垃圾回收策略主要基于分代式垃圾回收机制
//1. V8 的内存分代 (64bit/32bit)
//新生代内存空间 new space(32MB/16MB) 与老生代内存空间 old space(1400MB/700MB) 分别放存活时间较短/长的对象

//--- 新生代 ---
//新生代中的对象主要通过 Scavenge 算法进行垃圾回收，该算法在具体实现中采用了 Cheney 算法
//Cheney 算法是一种采用复制方式实现的垃圾回收算法，它将内存一分为二(semispace，16MB/8MB)
//两块区域一个为使用状态(From空间)，一个为闲置状态(To空间)
//垃圾回收时，检查From空间中的存活对象并复制到To空间，释放非存活对象占用的空间

//优点：在生命周期短的场景中只需复制少量存活对象，时间效率高
//缺点：只能使用一半的堆内存空间，存活对象较多时复制效率低(25%限制)
 
//当新生代中的对象多次复制依然存活时(即第二次复制前)，会晋升到老生代中，采用新算法进行管理
//在To空间内存占比超过25%时，也会将(后续)复制对象晋升到老生代中，以保证内存分配效率(老生代对象会越来越多？)

//--- 老生代 ---
//采用 Mark-Sweep 和 Mark-Compact 结合的方式

//Mark-Sweep：遍历标记活的对象，再清除没有被标注的对象
//优点：死亡对象只占老生代的小部分，清除工作效率较高
//缺点：标记清除回收后的内存空间不连续，再次分配大对象时会提前触发垃圾回收

//Mark-Compact：为解决内存碎片问题，会在整理过程中将活对象往一端移动，移动完成后清理掉边界外的内存
//优点：空间开销少且无碎片
//缺点：速度慢

//V8 在老生代主要使用 Mark-Sweep，在空间不足以及对新生代晋升过来的对象才使用 Mark-Compact 分配。
//3种算法都需要全停顿，新生代配置小、待处理的活对象少故影响不大。老生代配置大处理对象多，需通过【增量标记】进行优化。
//Incremental Marking 增量标记：垃圾回收与应用逻辑交替执行，将最大停顿时间减少到原本1/6左右。

//通过在启动时添加 --trace_gc 参数查看垃圾回收日志
//node --trace_gc -e "const a = []; for (let i = 0; i < 1000000; i++) a.push(new Array(100));" > gc.log
/* 以下为 log
[82356:0x118008000]       84 ms: Scavenge 4.3 (4.6) -> 3.8 (5.6) MB, 1.5 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]      965 ms: Scavenge 4.8 (6.1) -> 4.7 (6.9) MB, 1.2 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]      966 ms: Scavenge 5.2 (6.9) -> 5.2 (9.1) MB, 0.7 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]      967 ms: Scavenge 6.6 (9.1) -> 6.6 (9.6) MB, 0.7 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]      968 ms: Scavenge 7.1 (9.6) -> 7.0 (15.1) MB, 0.7 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]      970 ms: Scavenge 10.4 (15.1) -> 10.6 (15.4) MB, 1.2 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]      972 ms: Scavenge 10.8 (15.4) -> 10.4 (27.4) MB, 1.7 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]     1002 ms: Scavenge 18.2 (27.6) -> 18.9 (28.1) MB, 2.0 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]     1004 ms: Scavenge 19.0 (28.1) -> 18.1 (51.4) MB, 2.3 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]     1017 ms: Scavenge 34.4 (52.0) -> 35.8 (53.3) MB, 6.1 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]     1020 ms: Scavenge 35.8 (53.3) -> 34.1 (67.5) MB, 3.2 / 0.0 ms  (average mu = 1.000, current mu = 1.000) allocation failure 
[82356:0x118008000]     1046 ms: Mark-sweep 69.9 (99.2) -> 68.2 (103.2) MB, 4.4 / 0.1 ms  (+ 5.8 ms in 92 steps since start of marking, biggest step 0.7 ms, walltime since start of marking 21 ms) (average mu = 1.000, current mu = 1.000) finalize incremental marking via stack guard GC in old space requested
[82356:0x118008000]     1393 ms: Mark-sweep 444.6 (486.6) -> 439.9 (481.8) MB, 18.0 / 0.0 ms  (+ 70.7 ms in 581 steps since start of marking, biggest step 9.5 ms, walltime since start of marking 214 ms) (average mu = 0.745, current mu = 0.745) finalize incremental marking via stack guard GC in old space requested
[82356:0x118008000]     1586 ms: Scavenge 720.6 (768.0) -> 720.6 (768.0) MB, 13.2 / 0.0 ms  (average mu = 0.745, current mu = 0.745) allocation failure  */

//在启动时使用 --prof 参数可得到 V8 执行时的性能分析数据(包括垃圾回收占用时间)，在 deps/v8/tools 找到 linux-tick-processor 用于统计日志信息
//node --prof test01.js
//生成 log 文件
//node --prof-process isolate-0x118008000-83072-v8.log > processed.txt
//得到 ticks 4   total 1.7%   nonlib 1.8%   GC
//即垃圾回收运行时长占比 1.7%

//--- 堆外内存 ---
//我们将 Node 中不是通过 V8 分配的内存称为堆外内存
//Buffer 对象不经过 V8