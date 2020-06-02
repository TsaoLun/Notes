

# 机器学习



## 导入数据集

##### forge

```python
X, y = mg.learn.datasets.make_forge()
mglearn.discrete_scatter(X[:,0],X[:,1],y)
plt.legend(["Class 0","Class 1"],loc=4)
plt.xlabel("First feature")
plt.ylabel("Second feature")
print("X.shape:{}".formate(X.shape))
```

输出 `X.shape(26, 2)` ,可知共26个样本（数据点），两个特征

![](images\forge.png)

##### wave

```python
X, y =mglearn.datasets.make_wave(n_samples=40)
plt.plot(X, y,'o')
plt.ylim(-3,3)
plt.xlabel("Feature")
plt.ylabel("Target")
```

其中X.shape是(40, 1)，四十个一维数据即一个特征

![](images\wave.png)

##### cancer

```python
from sklearn.datasets import load_breast_cancer
cancer = load_breast_cancer()
print("cancer.keys():{}".format(cancer.keys()))
```

输出`cancer.keys():dict_keys(['data', 'target', 'target_names', 'DESCR', 'feature_names'])`

即这个数据集有五个类似于键的部分，输入代码得到`cancer.data.shape`为(569, 30)，即**data**有**569个数据点**，每个数据点有**30个特征**，**特征名feature_names**。接下来看看哪些被标记为恶性，哪些被标记为良性。`cancer.target_names`有['malignant' 'benign']，而`cancer.target`则输出由569个0或1组成的一维数组

```python
print("Sample counts per class:{}".format({n:v for n,v in zip(cancer.target_names, np.bincount(cancer.target))}))
#输出一个字典，键为cancer.target_names,值为对应属性在cancer.target里的个数,zip实现同时遍历
```

`Sample counts per class:{'malignant': 212, 'benign': 357}`212个标记为恶性，357个标记为良性。

接下来查看每个**特征名**`cancer.feature_names`

```
['mean radius' 'mean texture' 'mean perimeter' 'mean area'
 'mean smoothness' 'mean compactness' 'mean concavity'
 'mean concave points' 'mean symmetry' 'mean fractal dimension'
 'radius error' 'texture error' 'perimeter error' 'area error'
 'smoothness error' 'compactness error' 'concavity error'
 'concave points error' 'symmetry error' 'fractal dimension error'
 'worst radius' 'worst texture' 'worst perimeter' 'worst area'
 'worst smoothness' 'worst compactness' 'worst concavity'
 'worst concave points' 'worst symmetry' 'worst fractal dimension']
```

##### boston

波士顿房价数据集，利用犯罪率、是否临近查尔斯河、公路可达性等信息来预测20世纪70年代波士顿房价的中位数。

```python
from sklearn.datasets import load_boston
boston = load_boston()
print("Data shape:{}".format(boston.data.shape))
```

得到Data shape:(506, 13)，即506个数据点，13个特征。

**特征工程**，我们不重复地两两组合这些特征并相乘，得到C(2,13)个组合即78个加上原来13个一共91个，该数据在`mglearn.datasets`中，通过`X, y = mglearn.datasets.load_extended_boston()`导入，X.shape: (506,104)

`boston.DESCR`的信息如下

```
Boston House Prices dataset
===========================
Notes
------
Data Set Characteristics:  
    :Number of Instances: 506 
    :Number of Attributes: 13 numeric/categorical predictive 
    :Median Value (attribute 14) is usually the target
    :Attribute Information (in order):
        - CRIM     per capita crime rate by town
        - ZN       proportion of residential land zoned for lots over 25,000 sq.ft.
        - INDUS    proportion of non-retail business acres per town
        - CHAS     Charles River dummy variable (= 1 if tract bounds river; 0 otherwise)
        - NOX      nitric oxides concentration (parts per 10 million)
        - RM       average number of rooms per dwelling
        - AGE      proportion of owner-occupied units built prior to 1940
        - DIS      weighted distances to five Boston employment centres
        - RAD      index of accessibility to radial highways
        - TAX      full-value property-tax rate per $10,000
        - PTRATIO  pupil-teacher ratio by town
        - B        1000(Bk - 0.63)^2 where Bk is the proportion of blacks by town
        - LSTAT    % lower status of the population
        - MEDV     Median value of owner-occupied homes in $1000's
    :Missing Attribute Values: None
    :Creator: Harrison, D. and Rubinfeld, D.L.
This is a copy of UCI ML housing dataset.
http://archive.ics.uci.edu/ml/datasets/Housing

This dataset was taken from the StatLib library which is maintained at Carnegie Mellon University.

The Boston house-price data of Harrison, D. and Rubinfeld, D.L. 'Hedonic
prices and the demand for clean air', J. Environ. Economics & Management,
vol.5, 81-102, 1978.   Used in Belsley, Kuh & Welsch, 'Regression diagnostics
...', Wiley, 1980.   N.B. Various transformations are used in the table on
pages 244-261 of the latter.

The Boston house-price data has been used in many machine learning papers that address regression
problems.   
     
**References**
   - Belsley, Kuh & Welsch, 'Regression diagnostics: Identifying Influential Data and Sources of Collinearity', Wiley, 1980. 244-261.
   - Quinlan,R. (1993). Combining Instance-Based and Model-Based Learning. In Proceedings on the Tenth International Conference of Machine Learning, 236-243, University of Massachusetts, Amherst. Morgan Kaufmann.
   - many more! (see http://archive.ics.uci.edu/ml/datasets/Housing)
```



## 监督学习

#### K近邻

优点：模型容易理解，不需要过多调节。

缺点：训练集较大时预测速度慢；需要对数据预处理；对特征过多（几百上千）或者稀疏数据集的效果不佳

重要参数：邻居个数与数据点之间距离的度量方法。实践中较小邻居个数如3或5效果较好，默认使用欧式距离。

##### K近邻分类

导入**forge数据**，利用mglearn绘图`mglearn.plots.plot_knn_classification(n_neighbors=1)`，观察k-NN在一个最近邻模型下的预测结果，每个五角星都标记了与它最近的点。

![](images\k-NN1.png)

还可以考虑k个邻居，在这种情况下用投票法指定标签，即通过比较类别0与1的邻居个数来决定预测结果。

`mglearn.plots.plot_knn_classification(n_neighbors=3)`得到下图

![](images\k-NN2.png)

**接下来正式通过`sklearn.neighbors`的`KNeighborsClassifier`来应用k近邻分类算法**

```python
from sklearn.model_selection import train_test_split
X, y = mglearn.datasets.make_forge()
X_train,X_test,y_train,y_test = train_test_split(X, y, random_state=0)
#导入类将其实例化
from sklearn.neighbors import KNeighborsClassifier
clf = KNeighborsClassifier(n_neighbors=3)
#利用训练集对这个分类器进行拟合fit
clf.fit(X_train, y_train)
```

此时可调用predict方法对测试数据进行预测：

`print("Test set predictions:{}".format(clf.predict(X_test)))`得到 Test set predictions:[1 0 1 0 1 0 0]，与预测完毕。

还需评估模型好坏，与y_test的[1 0 1 0 1 1 0]进行对比。可以对**测试数据**与**测试标签**调用score方法：

`print("Test set predictions:{:.2f}".format(clf.score(X_test, y_test)))`得到模型精度为86%。

接下来分别查看1、3、9个邻居的决策边界

```python
import mglearn
from sklearn.neighbors import KNeighborsClassifier
X, y = mglearn.datasets.make_forge()
#生成画布和坐标系，1X3个，横纵10：3
fig, axes = plt.subplots(1, 3, figsize=(10,3))
for n_n, a_n in zip([1,3,9], axes):
    #fit方法返回对象本身，所以将实例化和拟合放在一行代码中
    clf = KNeighborsClassifier(n_n).fit(X, y)
    #画出K临近模型的决策边界
    mglearn.plots.plot_2d_separator(clf, X, fill=True, eps=0.5, ax=a_n, alpha=.4)
    #根据X的二维数据(特征)和标记y制散点图
    mglearn.discrete_scatter(X[:,0],X[:,1],y, ax=a_n)
    ax.set_title("{} neighbor(s)".format(n_n))
    ax.set_xlabel("feature 0")
    ax.set_ylabel("feature 1")
axes[0].legend(loc=3)
```

![](images\K-NN3.png)

可见使用更少n_neighbors(n_n)的邻居对应更高的模型复杂度，当邻居个数大到整个数据点数量时，则只剩一类。接下来用**乳腺癌数据cancer**来探讨模型复杂度与泛化能力之间的关系。

```python
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_breast_cancer
cancer = load_breast_cancer()
#导入cancer数据并分类，把cancer.target作为标签来进行分类(即默认分类后target的比例在分类前后不变)
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, stratify=cancer.target, random_state=66)
training_accuracy=[]
test_accuracy=[]
neighbors_settings = range(1,11)
for n_n in neighbors_settings:
    clf = KNeighborsClassifier(n_neighbors = n_n)
    clf.fit(X_train, y_train)
    training_accuracy.append(clf.score(X_train, y_train))
    test_accuracy.append(clf.score(X_test, y_test))
plt.plot(neighbors_settings, training_accuracy,label="training accuracy")
plt.plot(neighbors_settings, test_accuracy, label='test accuracy')
plt.ylabel("Accuracy")
plt.xlabel("n_neighbors")
plt.legend
```

![](images\n_neighbors.png)

由图可知，在本例中当邻居个数大约为6时性能最佳。

##### K近邻回归

添加三个测试数据点，单一近邻观察**wave数据**，预测结果为最近邻的目标值

`mglearn.plots.plot_knn_regression(n_neighbors=1)`

![](images\K-NNR1.png)

多个近邻进行回归，此时预测结果为这些近邻的平均值

`mglearn.plots.plot_knn_regression(n_neighbors=3)`

![](images\k-NNR3.png)

**接下来正式通过`sklearn.neighbors`的`KNeighborsRegressor`来应用k近邻回归算法**

```python
from sklearn.neighbors import KNeighborsRegressor
X, y = mglearn.datasets.make_wave(n_samples=40)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
reg = KNeighborsRegressor(3)
reg.fit(X_train, y_train)
```

对测试集进行预测

`print("Test set predictions:\n{}".format(reg.predict(X_test)))`

通过np.around更改数组中的小数保留位数

`print("Test set predictions:\n{}".format(np.around(reg.predict(X_test),3)))`

得到Test set predictions:
[-0.054  0.357  1.137 -1.894 -1.139 -1.631  0.357  0.912 -0.447 -1.139]

利用score方法来评估模型，在回归问题中该方法返回的是R^2分数，也叫决定系数，是回归模型预测的优度度量，位于0到1之间，R^2=1对应完美预测，0则对应常数模型(常数为y_train的平均值)

`print("Test set R^2:{:.2f}".format(reg.score(X_test, y_test)))`

得到 Test set R^2:0.83，表示拟合结果相对较好。接下来分析一下该模型：

```python
fig, axes = plt.subplots(1,3,figsize=(15,4))
#创建1000个数据点，在-3到3间均匀分布(此处也可用调参后的arange)的一维数组，并调为1列(与wave的shape匹配)
line = np.linspace(-3,3,1000).reshape(-1,1)
for n_neighbors, ax in zip([1,3,9], axes):
    reg = KNeighborsRegressor(n_neighbors=n_neighbors)
    reg.fit(X_train, X_test)
    ax.plot(line, reg.predict(line))
    ax.plot(X_train, y_train, '^', c=mglearn.cm2(0), markersize=8)
    ax.plot(X_test, y_test, 'v', c=mglearn.cm2(1), markersize=8)
    ax.set_title("{}neighbor(s)\n train score{.2f} test score{.2f}".format(n_neighbors,reg.score(X_train,y_train),reg.score(X_test,y_test)))
    ax.set_xlabel("Feature")
    ax.set_ylabel("Target")
#在第一个坐标系添加图例说明
axes[0].legend(["Model prediction","Training data/target","Test data/target",loc='best'])
```

![](images\k-NNR.png)

注意如果line数据没有改为一列会报错提示：Reshape your data either using array.reshape(-1, 1) if your data has a single feature or array.reshape(1, -1) if it contains a single sample.即一维数组要改成列。如图可知，单一邻居下预测结果很不稳定，但过多邻居则导致对训练数据拟合性能差。

#### 线性模型

一般公式 : y=w[0]x[0]+w[1]x[1]+w[2]x[2]+...+w[p]x[p]+b，其中x[0]到x[p]表示单个数据点的特征(特征数为p+1)

多特征数据集下效果好，在特征数量大于训练数据点的数量时，任何目标y都可以在训练集上用线性模型完美拟合

单一特征公式为 y=w[0]x[0]+b ,在一维wave上学习参数w[0]和b

`mglearn.plots.plot_linear_regression_wave()`

![](images\L1.png)

主要参数是**正则化参数**，在回归模型岭回归(L2)与Lasso(L1)中叫作**alpha**(正比),在分类器LinearSVC和LogisticRegression中叫**C**(反比)，正则化强则模型相对简单。当只有几个特征真正重要时或者需要解释性更强的模型时用L1正则，否则默认L2正则。

优点：训练速度快，预测速度也快，对大数据集、稀疏数据都有效。LogisticRegression和Ridge模型的slover='sag'选项可加快数据处理，其他选项还有SGDClassifier类和SGDRegressor类。

在特征数量大于样本数量的情况下，线性模型表现通常很好，但在低维空间里其他模型的泛化性能可能更好。

##### 线性回归

线性回归（普通最小二乘法OLS），均方误差是预测值与真实值之差的平方和除以样本数。线性回归没有可调参数，模型复杂度是固定的。

```python
from sklearn.linear_model import LinearRegression
X, y = mglearn.datasets.make_wave(n_samples=60)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=42)
lr = LinearRegression().fit(X_train, y_train)
#斜率参数w(权重或系数)被保存在coef_属性中，而截距b被保存在intercept_属性中
print("lr.coef_:{}".format(lr.coef_))
print("lr.intercept_:{}".format(lr.intercept_))
```

得到:`lr.coef_:[0.39390555]   lr.intercept_:-0.031804343026759746`，该模型训练集得分0.67，测试集得分R^2是0.66，可能存在欠拟合。在高维数据集下（即有大量特征的数据集），线性模型性能会更好但过拟合可能性变大。接下来看一下波士顿房价数据集，有506个样本和105个导出特征。

```python
X, y = mglearn.datasets.load_extended_boston()
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
lr = LinearRegression().fit(X_train,y_train)
print("Train set score:{:.2f}".format(lr.score(X_train, y_train)))
print("Test set score:{:.2f}".format(lr.score(X_test, y_test)))
```

Train set score:0.95
Test set score:0.61

训练集和测试集之间的性能差异是过拟合的明显标志。此时用岭回归(ridge regression)替代以控制模型复杂度。

##### 岭回归

对w系数进行L2正则化的线性模型，系数尽量小，使得每个特征对输出的影响也尽可能小，以避免过拟合。

```python
from sklearn.linear_model import Ridge
ridge = Ridge().fit(X_train, y_train)
print("Train set score:{:.2f}".format(ridge.score(X_train, y_train)))
print("Test set score:{:.2f}".format(ridge.score(X_test, y_test)))
```

得到训练集0.89，测试集0.75，泛化性能得到提升。

alpha参数可以控制模型复杂度，越大表示约束越大。这里当alpha=0.1时R^2进一步提升为0.77，最佳取值取决于具体模型，可以通过代码查看不同alpha取值时coef_属性。

```python
X, y = mglearn.datasets.load_extended_boston()
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
ridge = Ridge().fit(X_train, y_train)
ridge10 = Ridge(alpha=10).fit(X_train, y_train)
ridge01 = Ridge(alpha=0.1).fit(X_train, y_train)

plt.plot(ridge.coef_,'s',label="Ridge alpha=1")
plt.plot(ridge10.coef_,'^',label="Ridge alpha=10")
plt.plot(ridge01.coef_,'v',label="Ridge alpha=0.1")

plt.plot(lr.coef_,'o',label="LinearRegression")
plt.xlabel("Coefficient index")
plt.ylabel("Coefficient magnitude")
plt.hlines(0, 0, len(lr.coef_))
plt.ylim(-25,25)
plt.legend()
```

![](images\RL.png)

这里x轴对应coef_元素，x=0对应第一特征的系数w[0]，以此类推到x=100，y轴对应该系数的具体取值。对于alpha=10系数大多在-3和3之间；对于alpha=1即默认值对应的岭回归模型，系数要稍大一些；对于没有做正则化的线性回归(alpha=0)，点范围很大。

还有方法来理解正则化的影响，就是固定alpha值但改变训练数据量。我们对波士顿房价二次抽样，并在数据量逐渐增加的子数据集上分别对LinearRegression和Ridge(alpha=1)两个模型进行评估，将模型性能作为数据集大小的函数进行绘图，这样的图像叫作**学习曲线**

![](images\size_score_lr.png)

可见，无论岭回归还是线性回归，所有数据集大小对应的训练分数都要高于测试分数。正则化后的岭回归在训练分数上低于线性回归，但它的测试分数更高，特别在较小的子数据集上。随着可用数据变多，线性回归的性能最终追上了岭回归，即如果有足够多的训练数据，正则化将不再重要。

##### Lasso回归

lasso也是约束系数使其接近0，使用了L1正则化。L1正则化使得某些系数刚好为0，即某些特征被模型完全忽略，模型更容易解释，也可以呈现模型最重要的特征。

```python
from sklearn.linear_model import Lasso
lasso = Lasso().fit(X_train, y_train)
print("Training set score:{:.2f}.format(lasso.score(X_train, y_train))")
print("Test set score:{:.2f}.format(lasso.score(X_test, y_test))")
print("Number of features used:{}".format(np.sum(lasso.coef_!=0)))
```

得到结果：Training set score:0.29
				   Test set score:0.21
				   Number of features used:4

Lasso在训练集和测试集上的表现都很差，说明存在欠拟合，而且模型只用到105个特征中的4个。尝试减小**alpha**来减少正则化影响以提升拟合性能，同时增加**max_iter**的值(运行迭代的最大次数)。

当alpha=0.01,max_iter=100000时训练集得分为0.90，测试集得分为0.77，此时用到105个特征中的33个。而当进一步缩小时就会消除正则化效果出现过拟合，得到类似LinearRegression的结果，同样对不同模型系数作图：

```python
lasso001 = Lasso(alpha=0.01, max_iter=100000).fit(X_train,y_train)
lasso00001 = Lasso(alpha=0.0001, max_iter=100000).fit(X_test,y_test)
plt.plot(lasso.coef_,'s',label='Lasso alpha=1')
plt.plot(lasso001.coef_,'^',label='Lasso alpha=0.01')
plt.plot(lasso00001.coef_,'v',label='Lasso alpha=0.0001')

plt.plot(ridge01.coef_,'o',label='Ridge alpha=0.1')
plt.legend(ncol=2, loc=(0,1.05))
plt.ylim(-25,25)
plt.xlabel("Coefficient index")
plt.ylabel("Coefficient magnitude")
```

![](images\coef_lasso_ridge.png)

alpha=1时系数几乎都为0，减到0.01时一大部分为0，而当alpha为0.0001时正则化很弱系数很少为0。当alpha为0.01时的Lasso与alpha=0.1时的Ridge模型性能相近，但Ridge模型的系数都不为0.

##### 二分类:逻辑回归&线性SVM

二分类下的线性模型：y = w[0]x[0]+w[1]x[1]+...+w[p]x[p]+b>0

设置阈值(0)以预测类别-1和1，对于二分类问题来说线性分类器就是利用直线、平面或超平面来分开两个类别的分类器。最常见的两种线性分类算法是**Logistic回归**与**线性支持向量机(SVM)**，接下来应用到Forge数据集上并将线性模型的**决策边界**可视化。

```python
from sklearn.linear_model import LogisticRegression
from sklearn.svm import LinearSVC
X, y = mglearn.datasets.make_forge()
fig, axes = plt.subplots(1,2,figsize=(10,3))
for model,ax in zip([LinearSVC(), LogisticRegression()], axes):
    clf = model.fit(X,y)
    mglearn.plots.plot_2d_separator(clf, X, fill=False, eps=0.5,ax=ax,alpha=.7)
    mglearn.discrete_scatter(X[:,0],X[:,1],y,ax=ax)
    ax.set_title("{}".format(clf.__class__.__name__))
    ax.set_xlabel("Feature 0")
    ax.set_ylabel("Feature 1")
axes[0].legend()
```

![](images\SVC_LR_F.png)

两个模型都默认使用L2正则化，权衡参数为C，C值越大正则化越弱(作用与Lasso和岭回归中的alpha**相反**)。这里较大的C会强调每个点分类准确，较小的C则强调算法适应大多数数据点。

`mglearn.plots.plot_linear_svc_regularization()`

![](images\svm_forge.png)

C值很小对应正则化较强，线相对水平。中间C值稍大，决策边界因两个分类错误的样本而倾斜。最右C值非常大，决策边界斜率也很大，0的分类都是正确的，但可能存在过拟合。同样在高维空间中，用于分类的线性模型会更强大，但在多特征时更需避免过拟合。接下来分析cancer数据集：

```python
from sklearn.datasets import load_breast_cancer
cancer = load_breast_cancer()
X_train,X_test,y_train,y_test = train_test_split(cancer.data, cancer.target, stratify=cancer.target, random_state=42)
logreg = LogisticRegression().fit(X_train, y_train)
print("Training set score:{:.3f}".format(logreg.score(X_train, y_train)))
print("Test set score:{:.3f}".format(logreg.score(X_test, y_test)))
```

Training set score:0.955
Test set score:0.958

C=1的默认值在Logistic回归分类器下的效果就很好，但考虑到性能接近且测试集高于训练集可能存在欠拟合。为加强拟合这里减弱正则化，增大C值。

```python
logreg100 = LogisticRegression(C=100).fit(X_train, y_train)
print("Training set score:{:.3f}".format(logreg100.score(X_train, y_train)))
print("Test set score:{:.3f}".format(logreg100.score(X_test, y_test)))
```

Training set score:0.972
Test set score:0.965

接下来看一下正则化参数不同的情况下模型学到的系数：

```python
#为什么要coef_.T? shape为读取矩阵对应维的长度
logreg001 = LogisticRegression(C=0.01).fit(X_train, y_train)
plt.plot(logreg.coef_.T,'o',label='C=1')
plt.plot(logreg100.coef_.T,'^',label='C=100')
plt.plot(logreg001.coef_.T,'v',label='C=0.01')
plt.xticks(range(cancer.data.shape[1]),cancer.feature_names,rotation=90)
plt.hlines(0,0,cancer.data.shape[1])
plt.ylim(-5,5)
plt.xlabel("Coefficient index")
plt.ylabel("Coefficient magnitude")
plt.legend()
```

![](images\LR_C.png)

可见更强的正则化使得系数趋于0但不会为0，如果想得到可解释性更强的模型可使用penalty参数改用L1正则化。

```python
for C,marker in zip([0.001,1,100],['o','^','v']):
    lr_l1 = LogisticRegression(C=C, penalty='l1').fit(X_train, y_train)
    print("Training accuracy of l1 logreg with C={:.3f}:{:.2f}".format(C, lr_l1.score(X_train,y_train)))
    print("Test accuracy of l1 logreg with C={:.3f}:{:.2f}".format(C,lr_l1.score(X_test, y_test)))
```

Training accuracy of l1 logreg with C=0.001:0.91
Test accuracy of l1 logreg with C=0.001:0.92
Training accuracy of l1 logreg with C=1.000:0.96
Test accuracy of l1 logreg with C=1.000:0.96
Training accuracy of l1 logreg with C=100.000:0.99
Test accuracy of l1 logreg with C=100.000:0.98

##### 多分类线性模型

通过“一对其余”方法，将二分类算法推广到多分类算法中，即对每个类别都学习一个二分类模型，这样就生成与类别个数一样多的二分类模型，每个类别都对应一个二类分类器，在对应类别中分数最高的分类器胜出。

首先，将“一对其余”方法应用在一个简单的三分类问题上，用到一个二维数据集make_blobs，每个类别的数据都是从一个高斯分布中采样得出的。

```python
from sklearn.datasets import make_blobs
X,y = make_blobs(random_state=42)
mglearn.discrete_scatter(X[:,0],X[:,1],y)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
plt.legend(["Class 0","Class 1","Class 2"])
```

![](images\blobs.png)

现在在这个数据集上训练一个LinearSVC分类器

```python
linear_svm = LinearSVC().fit(X,y)
print("Coefficient shape: ",linear_svm.coef_.shape)
print("Intercept shape: ",linear_svm.intercept_.shape)
```

Coefficient shape:  (3, 2)
Intercept shape:  (3,)

即有三个对应类别的系数向量，两个对应特征的系数值。intercept_是一维数组，保存每个类别的截距。

```python
#将这三个分类器给出的直线可视化,这里-(line*coef[0]+intercept)/coef[1]的意思是？
mglearn.discrete_scatter(X[:,0],X[:,1],y)
line = np.linspace(-15, 15)
for coef, intercept, color in zip(linear_svm.coef_, linear_svm.intercept_,['b','r','g']):
    plt.plot(line, -(line*coef[0]+intercept)/coef[1],c=color)
plt.ylim(-10,15)
plt.xlim(-10,8)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
plt.legend(['Class 0','Class 1','Class 2','Line class 0','Line class 1','Line class 2'],loc=(1.01, 0.3))
```

![](images\S1.png)

接下来给出预测结果

```python
mglearn.plots.plot_2d_classification(linear_svm, X, fill=True, alpha=.7)
mglearn.discrete_scatter(X[:,0],X[:,1],y)
line = np.linspace(-15,15)
for coef,intercept,color in zip(linear_svm.coef_, linear_svm.intercept_,['b','r','g']):
    plt.plot(line, -(line*coef[0]+intercept)/coef[1],c=color)
    plt.legend(['Class 0','Class 1','Class 2','Line class 0','Line class 1','Line class 2'],loc=(1.01,0.3))
    plt.xlabel("Feature 0")
    plt.ylabel("Feature 1")
```

![](images\S2.png)



#### 朴素贝叶斯分类器

朴素贝叶斯分类器是一种与线性模型相似的分类器，训练速度往往更快，泛化能力则稍差。

朴素贝叶斯通过单独查看每个特征来学习参数，并从每个特征中收集简单的类别统计数据。scikit-learn中实现了三种朴素贝叶斯分类器：**GaussianNB, BernoulliNB, MultinomialNB.**

GaussianNB（高斯，正态）可应用于任意连续数据，而BernoulliNB(伯努利，0-1)假定输入数据为二分类数据，MultinomialNB(多项)假定输入数据为计数数据。后两者常用于文本数据分析。

BernoulliNB分类器计算每个类别（对应数据点）中每个特征不为0的元素个数：

```python
X = np.array([[0, 1, 0, 1],
             [1, 0, 1, 1],
             [0, 0, 0, 1],
             [1, 0, 1, 0]])
y = np.array([0, 1, 0, 1])
```

这里有四个数据点，每个点有四个二分类特征，一共有两个类别：0和1。

```python
counts = {}
for label in np.unique(y):
    #对每个类别进行遍历
    #计算（求和）每个特征中1的个数
    counts[label] = X[y == label].sum(axis=0)#计算类别0(1,3数据点)和1(2，4数据点)每一列（特征）不为0的数量,并储存在键为label的字典中
print("Feature counts:\n{}".format(counts))
```

得到结果 Feature counts: {0: array([0, 1, 0, 2]), 1: array([2, 0, 2, 1])}

MultinomialNB计算每个类别中每个特征的平均值，GaussianNB会保存每个类别中每个特征的平均值和标准差。MultinomialNB和BernoulliNB预测公式的形式都与线性模型完全相同。朴素贝叶斯模型coef_的含义与线性模型稍有不同（不同于w）。

MultinomialNB和BernoulliNB都只有一个参数alpha，工作原理是添加相应数量的虚拟点，使得数据平滑化。以上两种算法广泛用于稀疏计数数据，比如文本，M通常优于B。GaussianNB主要用于高维数据。朴素贝叶斯的优缺点与线性模型类似，训练预测速度都很快，且在高维稀疏数据上的效果很好。



#### 决策树

决策树是广泛用于分类和回归任务的模型，本质上是一层层的if/else问题中进行学习并得出结论。

我们在二维数据集make_moons上构造决策树，这个数据集由2个半月形组成，每个类别包括50个数据点。连续数据的**测试**形式类似" 特征i的值是否大于a？"，为构造决策树算法会寻找出信息量（信息增益）最大的点对数据集进行二元划分，接下来分别对已划分的数据递归这个过程，直到决策树的每个叶节点只包含单一目标值（纯）。

为避免异常点导致的过拟合，可通过预剪枝和后剪枝限制树的最大深度、叶节点的最大数目。scikit-learn的决策树在DecisionTreeRegressor类和DecisionTreeClassifier类中实现，只存在预剪枝(max_depth, max_leaf_nodes或min_samples_leaf)。

```python
from sklearn.tree import DecisionTreeClassifier
cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(cancer.data,cancer.target,stratify=cancer.target,random_state=42)
tree = DecisionTreeClassifier(random_state=0)
tree.fit(X_train, y_train)
print("Accuracy on training set:{:.3f}".format(tree.score(X_train,y_train)))
print("Accuracy on test set:{:.3f}".format(tree.score(X_test,y_test)))
```

Accuracy on training set:1.000
Accuracy on test set:0.937

因为叶节点是纯的故在训练集上精度为100%，而测试集得分比线性模型的精度95%略低，接下来通过预剪枝来提升泛化性能避免过拟合。可以通过限制树的最大深度**max_depth**=4，在降低训练集精度的同时提升测试集性能。

```python
tree = DecisionTreeClassifier(max_depth=4, random_state=0)
tree.fit(X_train, y_train)
print("Accuracy on training set:{:.3f}".format(tree.score(X_train, y_train)))
print("Accuracy on test set:{:.3f}".format(tree.score(X_test, y_test)))
```

Accuracy on training set:0.988
Accuracy on test set:0.951

可利用tree模块的export_graphviz函数来将树可视化。这个函数会生成一个.dot格式的文件。再利用graphviz模块读取这个文件并将其可视化。

```python
from sklearn.tree import export_graphviz
export_graphviz(tree, out_file='tree.dot', class_names=["malignant","benign"],feature_names=cancer.feature_names, impurity=False,filled=True)

import os
os.environ["PATH"] += os.pathsep + 'C:/Users/ycl18/Anaconda3/Lib/site-packages/graphviz/bin'
import graphviz
with open("tree.dot") as f:
    dot_graph = f.read()
graphviz.Source(dot_graph)
```

![](images\tree.PNG)

接下来分析一下特征重要性

`print("Feature importances:\n{}".format(tree.feature_importances_))`

再可视化

```python
def plot_feature_importances_cancer(model):
    n_features = cancer.data.shape[1]#shape[1]即shape(569,30)的第二个元素30
    plt.barh(range(n_features), model.feature_importances_, align='center')
    plt.yticks(np.arange(n_features), cancer.feature_names)
    plt.xlabel("Feature importance")
    plt.ylabel("Feature")
plot_feature_importances_cancer(tree)
```

![](images\tree_features.png)

与线性模型不同，树的特征重要性始终为正，但没有说明特征对应哪个类别比如良性恶性。但事实上，特征和类别之间的关系没有这么简单，如图`tree = mglearn.plots.plot_tree_not_monotone()`  /  `display(tree)`

![](images\tree_class.png)

![](images\tree_classTF.PNG)

该图显示的是有两个特征和两个类别的数据集，信息主要包含在X[1]中，但对应关系不是单调的。

用于回归的决策树DecisionTreeRegressor与分类器类似，但相比于其他回归模型，它**不能外推**(extrapolate),也不能在训练范围之外进行预测。利用计算机RAM价格来研究:

```python
import pandas as pd
ram_prices = pd.read_csv("data/ram_price.csv")
plt.semilogy(ram_prices.date, ram_prices.price)
plt.xlabel("Year")
plt.ylabel("Price in $/Mbyte")
```

![](images\RAM.png)

我们将应用2000年前的数据来预测2000年后的价格，只用日期作为特征，对比DecisionTreeRegressor和LinearRegression，对价格**取对数**使得二者关系的线性相对更好(会影响到线性回归)。训练模型并作出预测后运用指数映射来做对数变换逆运算。

```python
from sklearn.tree import DecisionTreeRegressor
#利用历史数据预测2000年后的价格
data_train = ram_prices[ram_prices.date < 2000]
data_test = ram_prices[ram_prices.date >= 2000]
#基于日期来预测价格
X_train = data_train.date[:,np.newaxis]
#利用对数变换使得数据与目标间的关系更简单
y_train = np.log(data_train.price)
tree = DecisionTreeRegressor().fit(X_train, y_train)
linear_reg =LinearRegression().fit(X_train, y_train)
#对所有数据进行预测
X_all = ram_prices.date[:, np.newaxis]
pred_tree = tree.predict(X_all)
pred_lr = linear_reg.predict(X_all)
#逆运算
price_tree = np.exp(pred_tree)
price_lr = np.exp(pred_lr)
plt.semilogy(data_train.date, data_train.price, label='Training data')
plt.semilogy(data_test.date, data_test.price, label='Test data')
plt.semilogy(ram_prices.date, price_tree, label="Tree prediction")
plt.semilogy(ram_prices.date, price_lr, label="Linear prediction")
plt.legend()
```

![](images\tree_ram.png)

线性模型对2000年后的数据做出了很好的预测，树模型对2000年前的训练数据完美预测，但一旦输入超出了模型训练数据的范围，模型就只能持续预测最后(近)一个已知数据点，树不能在训练数据的范围之外生成新的响应。

决策树的优点：一是得到的模型很容易可视化，二是算法不受数据缩放的影响，不需要特征预处理比如归一化或标准化(如特征尺度不一或存在二元特征连续特征共存)

##### 随机森林

决策树的主要缺点是容易过拟合，而随机森林是**决策树集成**(**ensemble**)的一种，通过构造很多树再对这些树取平均值来降低过拟合。树的随机化方法有两种：一种是通过选择用于构造树的数据点，另一种是通过选择每次划分测试的特征。

确定用于构造的树的个数，用RandomForestRegressor或RandomForestClassifier的**n_estimators**参数，这些树构造时彼此完全独立并存在区别：首先对数据进行自助采样(bootstrap sample)，从n_samples个数据点中有放回地重复随机抽取一个样本，共抽取n_samples次(部分的数据会重复，大约1/3的数据会缺失：因为抽不到的概率为(1-1/n)^n当n趋于无穷为1/e)。基于这个新创建的数据集来构造决策树，不过在每个结点处随机选择特征的一个子集，并对其中的一个特征寻找最佳测试而非对每个结点都寻找**最佳测试**。选择的**特征个数**由**max_features**参数进行控制，每个结点中特征子集的选择相互独立，即每个结点可以使用特征的不同子集来做决策。(前后两次随机)

关键参数**max_features**，如果设置为n_features则每次划分都考虑数据集所有特征，特征选择过程就没有了随机性；如果设置为1则无法选择对哪个特征进行测试。即**max_features**设置较大时随机森林里的树会很相似，比较容易拟合数据；设置较小则差异很大，需要每棵树深度足够大才能拟合数据。

利用随机森林进行预测，首先是对森林里的每棵树进行预测。在回归问题中，对这些预测取平均值作为最终预测；对于分类问题则对每个可能的输出标签的概率取平均值，将概率最大的类别作为预测结果。

下面将由五棵树组成(n_estimators=5)的随机森林应用到two_moons数据集上

```python
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import make_moons
X, y = make_moons(n_samples=100, noise=0.25, random_state=3)
X_train, X_test, y_train, t_test = train_test_split(X, y ,stratify=y, random_state=42)
forest = RandomForestClassifier(n_estimators=5, random_state=2)
forest.fit(X_train, y_train)
#作为随机森林的一部分，树被保存在estimator_属性中
fig, axes = plt.subplots(2,3,figsize=(20,10))
for i,(ax, tree) in enumerate(zip(axes.ravel(), forest.estimators_)):
    ax.set_title("Tree{}".format(i))
    mglearn.plots.plot_tree_partition(X_train, y_train, tree, ax=ax)
    mglearn.plots.plot_2d_separator(forest, X_train, fill=True, ax=axes[-1,-1],alpha=.4)
    axes[-1,-1].set_title("Random Forest")
    mglearn.discrete_scatter(X_train[:,0],X_train[:,1],y_train)
```

![](images\tree_sep.png)

因为自助采样，随机森林比单独每一棵树的过拟合都要小，决策边界也更好，这里可以用几百上千棵树得到更平滑的边界。接下来将100棵树的随机森林应用到乳腺癌数据集cancer上:

```python
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=0)
forest = RandomForestClassifier(n_estimators=100, random_state=0)
forest.fit(X_train,y_train)

print("Accuracy on training set:{:.3f}".format(forest.score(X_train, y_train)))
print("Accuracy on test set:{:.3f}".format(forest.score(X_test, y_test)))
```

Accuracy on training set:1.000
Accuracy on test set:0.972

性能比线性模型或单棵决策树要好，当然也能调节max_features或预剪枝。将max_features设置为21得到：

Accuracy on training set:1.000
Accuracy on test set:0.986

计算特征重要性，将森林中所有树的特征重要性求和并区平均:

`plot_feature_importances_cancer(forest)`

![](images\rf_feature.png)

相比单棵决策树，随机森林有着更多重要特征，并选择最大周长作为信息量最大的特征，比单棵树更能从总体把握数据的特征。

优点：不需要反复调参，也不需要数据缩放。

缺点：对维度非常高的稀疏数据往往表现不佳（比如文本），对硬件有一定要求速度比线性模型慢。

参数：重要参数：**n_estimators**和**max_features**，n_estimators越大越好，以降低过拟合；max_features决定每棵树的随机性大小，对于分类默认max_features=sqrt(n_features)，回归则默认n_features。预剪枝max_depth和max_leaf_nodes也可以调节性能和表现n_jobs参数调节内核使用个数，`n_jobs=-1`调用所有内核。

##### 梯度提升回归树

梯度提升回归树**GradientBoosting**是另一种集成方法ensemble，通过合并多个决策树构建一个更强大的模型。虽然名字有回归，但其实既可用于回归也可以用于分类。与随机森林不同，梯度提升采用连续方法构造树，每棵树用于纠正前一棵树，迭代提高性能。默认情况下无随机化，只是用到了强预剪枝，通常深度也很小（1到5）。梯度提升树通常对参数更为敏感，设置正确的话，模型精度也更高。

除了预剪枝和集成树的数量之外，另一个重要参数为**learning_rate**(学习率)，用于控制每棵树纠正前一棵树的强度。也可以通过增大**n_estimators**向集成添加更多的树，同样是增加了模型复杂度。

下面是是GradientBoostingClassifier在Cancer数据集上的应用，默认100棵树，最大深度3，学习率0.1：

```python
from sklearn.ensemble import GradientBoostingClassifier
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=0)
gbrt = GradientBoostingClassifier()
gbrt.fit(X_train, y_train)
print("Accuracy on training set:{:.3f}".format(gbrt.score(X_train, y_train)))
print("Accuracy on test set:{:.3f}".format(gbrt.score(X_test, y_test)))
```

Accuracy on training set:1.000
Accuracy on test set:0.958

为降低过拟合，可以通过限制最大深度**max_depth**来加强预剪枝，也可以降低学习率**learning_rate**

```python
from sklearn.ensemble import GradientBoostingClassifier
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=0)
gbrt = GradientBoostingClassifier(max_depth=2,learning_rate=0.06)
gbrt.fit(X_train, y_train)
print("Accuracy on training set:{:.3f}".format(gbrt.score(X_train, y_train)))
print("Accuracy on test set:{:.3f}".format(gbrt.score(X_test, y_test)))
```

Accuracy on training set:0.998
Accuracy on test set:0.972

在本例中限制最大深度显著提升了模型性能。我们将特征重要性可视化，100棵树，深度为1。

```python
gbrt = GradientBoostingClassifier(random_state=0, max_depth=1)
gbrt.fit(X_train, y_train)
plot_feature_importances_cancer(gbrt)
```

![](images\gbrt.png)

如果想将梯度提升应用在大规模问题上，可以研究一下xgboost包。

优点：强大而且常用，不需要数据缩放，适用二元特征与连续特征共存的数据集。

缺点：需要仔细调参，训练时间较长，不适用于高维稀疏数据。

参数：主要是树数量**n_estimators**和学习率**learning_rate**，这两个参数高度相关，学习率越低就需要更多的树来构建相似复杂度的模型。n_estimators不同于随机森林里的越大越好，过大会导致模型过于复杂过拟合。通常做法是选择合适n_estimators，再对不同learning_rate进行遍历。另外的重要参数max_depth或max_leaf_nodes用于降低每棵树的复杂度，max_depth一般很小不会超过5。



#### 核支持向量机SVC

核支持向量机(kernelized support vector machine)，这里主要讨论支持向量分类问题SVC，类似的概念也适用于支持向量回归SVR。

![](images\tree_class.png)

以上是决策树给出的决策边界，线性模型（比如线性SVM）在低维空间里可能非常受限。有一种方式可以让线性模型更加灵活，就是添加更多特征：比如输入特征的交互项或多项式。借用make_blobs数据集：

```python
from sklearn.datasets import make_blobs
X, y = make_blobs(centers=4, random_state=8)
y = y % 2
mglearn.discrete_scatter(X[:,0],X[:,1], y)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\make_blobs.png)

利用线性SVM给出决策边界：

```python
from sklearn.svm import LinearSVC
linear_svm = LinearSVC().fit(X, y)
mglearn.plots.plot_2d_separator(linear_svm, X)
mglearn.discrete_scatter(X[:,0],X[:,1],y)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\l_svm.png)

现在对输入特征进行拓展，添加第二个特征的平方(feature1**2)

将每个数据表示为三维点(feature0,feature1,feature1**2)并绘制散点图

```python
#添加第二特征的平方作为一个新特征
X_new = np.hstack([X,X[:,1:]**2])#hstack用于水平方向上拼接数组，将原来的X与X[:,1:]**2拼接
from mpl_toolkits.mplot3d import Axes3D, axes3d
figure = plt.figure()
#3D可视化
ax = Axes3D(figure, elev=-152, azim=-26)
#首先画出所有y==0的点，然后画出所有y==1的点；mask=0,~mask为取反，1
mask = y==0
ax.scatter(X_new[mask, 0],X_new[mask, 1],X_new[mask, 2],c='b',cmap=mglearn.cm2, s=60)
ax.scatter(X_new[~mask,0],X_new[~mask,1],X_new[~mask,2],c='r',marker='^',cmap=mglearn.cm2,s=60)
ax.set_xlabel("feature0")
ax.set_ylabel("feature1")
ax.set_zlabel("feature1**2")
```

![](images\feature1_2.png)

现在可以用线性模型（三维空间的平面）将这两个类别分开，接下来用模型拟合拓展后的数据集：

```python
#ravel()将多维数组转化为一维
linear_svm_3d = LinearSVC().fit(X_new,y)
coef, intercept = linear_svm_3d.coef_.ravel(),linear_svm_3d.intercept_
#显示线性决策边界
figure = plt.figure()
ax = Axes3D(figure, elev=-152, azim=-26)
xx = np.linspace(X_new[:,0].min()-2,X_new[:,0].max()+2,50)
yy = np.linspace(X_new[:,1].min()-2,X_new[:,1].max()+2,50)
XX, YY = np.meshgrid(xx, yy)#画网格
ZZ = (coef[0]*XX +coef[1]*YY+intercept)/-coef[2]
ax.plot_surface(XX, YY, ZZ, rstride=8, cstride=8, alpha=0.3)
ax.scatter(X_new[mask, 0],X_new[mask, 1],X_new[mask, 2],c='b',cmap=mglearn.cm2, s=60)
ax.scatter(X_new[~mask,0],X_new[~mask,1],X_new[~mask,2],c='r',marker='^',cmap=mglearn.cm2,s=60)
ax.set_xlabel("feature0")
ax.set_ylabel("feature1")
ax.set_zlabel("feature1**2")
```

![](images\3dsvm.png)

这时将线性SVM模型看作原始特征的函数，呈现出椭圆

```python
#contourf等高图
ZZ = YY**2
dec = linear_svm_3d.decision_function(np.c_[XX.ravel(),YY.ravel(),ZZ.ravel()])
plt.contourf(XX, YY, dec.reshape(XX.shape),levels=[dec.min(),0,dec.max()],cmap=mglearn.cm2, alpha=0.5)
mglearn.discrete_scatter(X[:,0],X[:,1],y)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\svm2d.png)

平时遇到线性不可分的样例尝试把特征映射到高维空间时，由于我们不知道向数据表示中添加哪些非线性特征，而且添加高维所有可能交互项计算量巨大（维度爆炸），我们一般会采用**核技巧**：利用**核函数**(Kernel Function)简化映射空间中的内积运算，直接在原来的低维空间进行计算而不需要显式地写出映射后的结果。

对于支持向量机，将数据映射到更高维空间中有两种常用的方法：一种是**多项式核**，在一定阶数内计算原始特征所有可能的多项式；另一种是径向基函数核，也叫**高斯核**，它考虑所有阶数所有可能的多项式，随着阶数的增高特征重要性减小。

训练过程中，通常只有位于类别边界上的数据点对于决策边界很重要，这些点叫作**支持向量**(support vector)。分类决策是基于新样本与支持向量之间的距离以及在训练过程中学到的支持向量重要性(保存在SVC的dual_coef_属性中)来做出的。数据点间的距离由**高斯核rbf**给出：k(x1,x2)=exp(-gamma|x1-x2|^2)，其中|x1-x2|表示欧式距离，**gamma**是控制高斯核宽度的参数。

将核SVM应用在二维二分类forge数据集上：

```python
from sklearn.svm import SVC
X, y = mglearn.tools.make_handcrafted_dataset()
svm = SVC(kernel='rbf',C=10,gamma=0.1).fit(X,y)
mglearn.plots.plot_2d_separator(svm, X, eps=.5)
mglearn.discrete_scatter(X[:,0],X[:,1],y)
#画出支持向量
sv = svm.support_vectors_
#支持向量的类别标签由dual_coef_的正负号给出
sv_labels = svm.dual_coef_.ravel()>0
mglearn.discrete_scatter(sv[:,0],sv[:,1],sv_labels,s=15,markeredgewidth=3)
plt.xlabel=("Feature 0")
plt.ylabel=("Feature 1")
```

![](images\rbfsvm.png)

接下来调节C参数与gamma参数：gamma参数用于控制高斯核宽度，决定了点与点之间“靠近”是指多大距离；C参数是正则化参数，与线性模型中的类似，用来控制每个点的重要性，即每个点的 **dual_coef_**

```python
fig, axes = plt.subplots(3, 3, figsize=(15,10))
for ax, C in zip(axes,[-1,0,3]):
    for a, gamma in zip(ax, range(-1,2)):
        mglearn.plots.plot_svm(log_C=C, log_gamma=gamma, ax=a)
axes[0,0].legend(["class 0","class 1","sv class 0","sv class 1"],ncol=4,loc=(.9,1.2))
```

![](images\3x3svm.png)

gamma越小高斯核半径越大，越多的点被看作靠近点，图中从左往右gamma从0.1到10，决策边界从平滑变得更关注单个点，模型更加复杂；而随着C值变大，模型受限越来越小(C小则每个点影响范围有限)。

下面将RBF核SVM应用到乳腺癌数据集cancer上，默认`C=1, gamma=1/n_features`

```python
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target,random_state=0)
svc = SVC()
svc.fit(X_train, y_train)
print("Accuracy on training set:{:.2f}".format(svc.score(X_train,y_train)))
print("Accuracy on test set:{:.2f}".format(svc.score(X_test, y_test)))
```

Accuracy on training set:1.00
Accuracy on test set:0.63

存在严重过拟合，为调整参数，我们看一下每个特征的最大最小值，并绘制在对数坐标上：

```python
plt.plot(X_train.min(axis=0),'o',label="min")
plt.plot(X_train.max(axis=0),'^',label="max")
plt.legend(loc=4)
plt.xlabel("Feature index")
plt.ylabel("Feature magnitude")
plt.yscale("log")
```

![](images\notcallable.png)

可见cancer特征具有完全不同的数量级，对其他比如线性模型来说是小问题，但是对核SVM影响极大，故需对SVM数据预处理，对每个特征进行缩放，核SVM将所有特征缩放到0到1之间（先手工缩放，以后可以学习MinMaxScaler进行预处理）：

```python
#计算训练集中每个特征的最小值
min_on_training = X_train.min(axis=0)
#计算训练集中每个特征的范围，即求减法后的最大值
range_on_training = (X_train - min_on_training).max(axis=0)
#标准化处理，每个值减去最小值再除以范围
X_train_scaled = (X_train - min_on_training)/range_on_training
#对训练集的最小值和范围对测试集做同样的变换
X_test_scaled = (X_test - min_on_training)/range_on_training
svc = SVC()
svc.fit(X_train_scaled, y_train)
print("Accuracy on training set:{:.3f}".format(svc.score(X_train_scaled,y_train)))
print("Accuracy on test set:{:.3f}".format(svc.score(X_test_scaled, y_test)))
```

Accuracy on training set:0.948
Accuracy on test set:0.951

数据缩放作用明显，但目前模型还是欠拟合，可以尝试增大C或者gamma来拟合更复杂的模型：

```python
svc = SVC(C=100)
svc.fit(X_train_scaled, y_train)
print("Accuracy on training set:{:.3f}".format(svc.score(X_train_scaled,y_train)))
print("Accuracy on test set:{:.3f}".format(svc.score(X_test_scaled,y_test)))
```

Accuracy on training set:0.986
Accuracy on test set:0.965

优点：在低维数据和高维数据（即不管特征多少)上都表现很好。

缺点：需要对数据缩放预处理，数据量大于100000时运行时间和内存消耗较大；对参数调节较为敏感，难以简单解释模型。

参数：正则化参数C，核的选择以及核相关的参数（这里用到RBF高斯核）。RBF只有一个参数gamma，是高斯核宽度的倒数。gamma和C都是越大模型越复杂，应该同时调节。



#### 神经网络

用于分类和回归的**多层感知机**(multilayer perceptron,**MLP**)，被称为前馈神经网络，简称神经网络。

线性回归：y = w[0]x[0]+w[1]x[1]+...w[p]x[p]+b

在MLP中多次重复这个计算加权求和的过程，中间的称为隐单元hidden unit，应用非线性函数（比如校正非线性relu或正切双曲线tanh)将输入值非线性化。relu截断小于0的值，而tanh在输入值较小时接近-1而在较大时接近+1

```python
line = np.linspace(-3,3,100)
plt.plot(line, np.tanh(line), label="tanh")
plt.plot(line, np.maximum(line,0),label="relu")
plt.legend(loc="best")
plt.xlabel("x")
plt.ylabel("relu(x), tanh(x)")
```

![](images\tanh_relu.png)

将**MLPClassifier**应用到two_moons数据集上：

```python
from sklearn.neural_network import MLPClassifier
from sklearn.datasets import make_moons
X, y = make_moons(n_samples=100, noise=0.25, random_state=3)
X_train,X_test,y_train,y_test = train_test_split(X, y ,stratify=y,random_state=42)
mlp = MLPClassifier(solver='lbfgs',random_state=0).fit(X_train, y_train)
mglearn.plots.plot_2d_separator(mlp,X_train,fill=True,alpha=.3)
mglearn.discrete_scatter(X_train[:,0],X_train[:,1],y_train)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\mlpscatter.png)

默认情况下，MLP使用100个隐结点，可以修改参数hidden_layer_sizes=[n]，默认非线性函数是relu可以修改为tanh非线性，也可以添加第二个隐藏层[n,m]

`mlp = MLPClassifier(solver='lbfgs',activation='tanh',random_state=0,hidden_layer_sizes=[10,10])`

![](images\tanh_2.png)

还能利用L2惩罚使权重趋向于0，从而控制神经网络的复杂度。在MLPClassifier中的参数是alpha，它的默认值很小，正则化较弱。

```python
fig, axes = plt.subplots(2,4,figsize=(20,8))
for axx, n_hidden_nodes in zip(axes, [10,100]):
    for ax, alpha in zip(axx, [0.0001,0.01,0.1,1]):
        mlp = MLPClassifier(solver='lbfgs',random_state=0,hidden_layer_sizes=[n_hidden_nodes,n_hidden_nodes],alpha=alpha)
        mlp.fit(X_train,y_train)
        mglearn.plots.plot_2d_separator(mlp,X_train,fill=True,alpha=.3,ax=ax)
        mglearn.discrete_scatter(X_train[:,0],X_train[:,1],y_train,ax=ax)
        ax.set_title("n_hidden=[{},{}]\nalpha={:.4f}".format(n_hidden_nodes,n_hidden_nodes,alpha))
```

![](images\alpha2_4.png)

这里控制神经网络复杂度的方法：**hidden_layer_sizes=[m,n]**，隐层的个数、每个隐层中的单元个数与正则化**alpha**

```python
#因为MLP初始化的权重是随机的，下面尝试生成一组图形，所有模型都使用相同参数
fig, axes = plt.subplots(2, 4, figsize=(20,8))、
#ravel将数组降维，并通过enumerate遍历列表，元组或字符串(与之前zip不同,这里扁平化后类似numpy字符串)
for i, ax in enumerate(axes.ravel()):
    mlp = MLPClassifier(solver='lbfgs',random_state=i,hidden_layer_sizes=[100,100])
    mlp.fit(X_train,y_train)
    mglearn.plots.plot_2d_separator(mlp,X_train,fill=True,alpha=.3,ax=ax)
    mglearn.discrete_scatter(X_train[:,0],X_train[:,1],y_train,ax=ax)
```

将MLPClassifier应用到乳腺癌数据集cancer上，先检查各特征最大值：

`print("Cancer data per-feature maxima:\n{}".format(cancer.data.max(axis=0)))`

Cancer data per-feature maxima:
[2.811e+01 3.928e+01 1.885e+02 2.501e+03 1.634e-01 3.454e-01 4.268e-01
2.012e-01 3.040e-01 9.744e-02 2.873e+00 4.885e+00 2.198e+01 5.422e+02
3.113e-02 1.354e-01 3.960e-01 5.279e-02 7.895e-02 2.984e-02 3.604e+01
4.954e+01 2.512e+02 4.254e+03 2.226e-01 1.058e+00 1.252e+00 2.910e-01
6.638e-01 2.075e-01]

使用默认参数：

```python
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target,random_state=0)
mlp = MLPClassifier(random_state=42)
mlp.fit(X_train,y_train)
print("Accuracy on training set:{:.2f}".format(mlp.score(X_train,y_train)))
print("Accuracy on test set:{:.2f}".format(mlp.score(X_test, y_test)))
```

Accuracy on training set:0.91
Accuracy on test set:0.88

接下来通过手工缩放数据，化均值为0，方差为1(以后会用到StandardScaler自动完成)

```
mean_on_train = X_train.mean(axis=0)
std_on_train = X_train.std(axis=0)
X_train_scaled = (X_train - mean_on_train)/std_on_train
X_test_scaled = (X_test - mean_on_train)/std_on_train
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target,random_state=0)
mlp = MLPClassifier(random_state=42)
mlp.fit(X_train_scaled,y_train)
print("Accuracy on training set:{:.2f}".format(mlp.score(X_train_scaled,y_train)))
print("Accuracy on test set:{:.2f}".format(mlp.score(X_test_scaled, y_test)))
```

Accuracy on training set:0.99
Accuracy on test set:0.97

接下来增加迭代次数max_iter和alpha参数(从0.0001到1)

`mlp = MLPClassifier(max_iter=1000,alpha=1,random_state=42)`

Accuracy on training set:0.99
Accuracy on test set:0.98

得到目前最好性能的模型，我们来可视化一下权重，行对应30个特征，列对应100个隐单元：

```
plt.figure(figsize=(20,5))
plt.imshow(mlp.coefs_[0], interpolation='none', cmap='viridis')
plt.yticks(range(30),cancer.feature_names)
plt.xlabel("Columns in weight matrix")
plt.ylabel("Input feature")
plt.colorbar()
```

![](images\coef.png)

虽然有点难以理解，但可以推断的是如果某特征对所有隐单元权重都很小，则“不太重要”，比如smoothness error和fractal dimension error之间的特征权重都较小。

优点：能够获取大量数据中包含的信息并构建复杂的模型，无论回归还是分类性能都很卓越。

缺点：训练时间较长，需要仔细预处理数据，最好是均匀数据，如果特征种类不一使用树模型效果更好。

参数：最重要的是层数max_iter和每层隐单元个数,每层的结点数通常和特征数相近。模型参数solver默认是'adam'，还能使用'lbfgs'或'sgd'（前两者较常用，'sgd'参数较复杂)。我们通常先创建一个足够大到过拟合的网络，再缩小网络或者增大alpha来加强正则化，提高泛化能力。



#### 分类器的不确定度估计

scikit-learn有两个函数可用于获取分类器的不确定度估计：decision_function 和 predict_proba ，接下来构建一个GradientBoostingClassifier分类器，看一下这两个函数对一个模拟的二维数据集的作用：

```python
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.datasets import make_circles
X, y = make_circles(noise=0.25, factor=0.5, random_state=1)
#为了便于说明，我们将两个类别重命名为'blue'和'red'
y_named = np.array(["blue","red"])[y]
```

这里 y 是array([1,1,0......1,0,0],dtype=int64)，而 y_named 是array(['red','red','blue'...],dtype='<U4')

```python
#对任意个数组调用train_test_split,划分方式一致
X_train, X_test, y_train_named, y_test_named, y_train, y_test = train_test_split(X,y_named,y,random_state=0)
#构建梯度提升模型
gbrt = GradientBoostingClassifier(random_state=0)
gbrt.fit(X_train, y_train_named)
```

##### 决策函数

对于二分类的情况，decision_function返回值的形状是(n_samples)，为每个样本都返回一个浮点数

```python
print("X_test.shape:{}".format(X_test.shape))
print("Decision function shape:{}".format(gbrt.decision_function(X_test).shape))
```

X_test.shape:(25, 2)
Decision function shape:(25,)

```python
#显示decision_function的前几个元素
print("Decision function:\n{}".format(gbrt.decision_function(X_test)[:6]))
```

Decision function:
[ 4.13592629 -1.7016989  -3.95106099 -3.62599351  4.28986668  3.66166106]

正值表示该样本对正类的偏好，负值是对反类的偏好

```python
print("Thresholded decision function:\n{}".format(gbrt.decision_function(X_test)>0))
print("Predictions:\n{}".format(gbrt.predict(X_test)))
```

Thresholded decision function:
[ True False False False  True  True False  True  True  True False  True
True False  True False False False  True  True  True  True  True False
False]
Predictions:
['red' 'blue' 'blue' 'blue' 'red' 'red' 'blue' 'red' 'red' 'red' 'blue'
'red' 'red' 'blue' 'red' 'blue' 'blue' 'blue' 'red' 'red' 'red' 'red'
'red' 'blue' 'blue']

对于二分类问题，"反"类始终是classes_属性的第一个元素，”正“类是第二个元素。

因此要完全再现predict输出，需要利用classes_属性：

```python
#将布尔值True/False转换成0和1
greater_zero = (gbrt.decision_function(X_test)>0).astype(int)
#利用0和1作为classes_的索引
pred = gbrt.classes_[greater_zero]
```

这里的pred输出与gbrt.predict完全一致，decision_function可以在任意范围取值，这取决于数据与模型参数:

```
decision_function = gbrt.decision_function(X_test)
print("Decision function minimum:{:.2f} maximum:{:.2f}".format(np.min(decision_function),np.max(decision_function)))
```

Decision function minimum:-7.69 maximum:4.29

接下来利用颜色编码在二维平面中画出所有点的decision_function与决策边界，将训练点画成圆测试数据画成三角

```python
fig, axes = plt.subplots(1, 2, figsize=(13,5))
mglearn.tools.plot_2d_separator(gbrt, X, ax=axes[0], alpha=.4,fill=True, cm=mglearn.cm2)
scores_image = mglearn.tools.plot_2d_scores(gbrt, X, ax=axes[1],alpha=.4, cm=mglearn.ReBl)
for ax in axes:
    #画出训练点与测试点
    mglearn.discrete_scatter(X_test[:,0],X_test[:,1],y_test,markers='^',ax=ax)
    mglearn.discrete_scatter(X_train[:,0],X_train[:,1],y_train,markers='o',ax=ax)
    ax.set_xlabel("Feature 0")
    ax.set_ylabel("Feature 1")
cbar = plt.colorbar(scores_image, ax=axes.tolist())
axes[0].legend(["Test class 0","Test class 1","Train class 0","Train class 1"],ncol=4,loc=(.1,1.1))
```

![](images\gbrtdf.png)

左决策边界，右决策函数。这样既给出预测结果，又给出分类器的置信程度，但边界较为模糊。

##### 预测概率

predict_proba的输出是每个类别的概率，通常比decision_function的输出更容易理解。对于二分类问题，它的形状是`(n_samples, 2)`

每行的第一个元素为第一个类别的估计概率，第二个元素为第二个类别的估计概率，它们的和为1。

```
print("Predicted probabilities:\n{}".format(gbrt.predict_proba(X_test[:6])))
```

Predicted probabilities:
[[0.01573626 0.98426374]
 [0.84575649 0.15424351]
 [0.98112869 0.01887131]
 [0.97406775 0.02593225]
 [0.01352142 0.98647858]
 [0.02504637 0.97495363]]

过拟合更强的模型可能会做出置信程度更高的预测，即使可能是错的。复杂度越低则预测的不确定度越大，如果模型给出的不确定度符合实际情况则称为校正模型。接下来继续给出数据集的决策边界以及类别1的概率：

```python
fig, axes = plt.subplots(1,2,figsize=(13,5))
mglearn.tools.plot_2d_separator(gbrt, X, ax=axes[0],alpha=.4,fill=True,cm=mglearn.cm2)
scores_image = mglearn.tools.plot_2d_scores(gbrt, X, ax=axes[1],alpha=.5,cm=mglearn.ReBl,function='predict_proba')
for ax in axes:
    mglearn.discrete_scatter(X_test[:,0],X_test[:,1],y_test,markers='^',ax=ax)
    mglearn.discrete_scatter(X_train[:,0],X_train[:,1],y_train,markers='o',ax=ax)
    ax.set_xlabel("Feature 0")
    ax.set_ylabel("Feature 1")
cbar = plt.colorbar(scores_image, ax=axes.tolist())
axes[0].legend(["Test class 0","Test class 1","Train class 0","Train class 1"],ncol=4,loc=(.1,1.1))
```

![](images\predict_proba.png)

##### 多分类问题的不确定度

将**decision_function**函数应用于鸢尾花(Iris)数据集，这是一个三分类数据集：

```python
from sklearn.datasets import load_iris
iris = load_iris()
X_train, X_test, y_train, y_test = train_test_split(iris.data,iris.target,random_state=42)
gbrt = GradientBoostingClassifier(learning_rate=0.01, random_state=0)
gbrt.fit(X_train,y_train)
print("Decision function shape:{}".format(gbrt.decision_function(X_test).shape))
print("Decision function:\n{}".format(gbrt.decision_function(X_test)[:6,:]))
```

Decision function shape:(38, 3)

Decision function:
[[-0.52931069  1.46560359 -0.50448467]
 [ 1.51154215 -0.49561142 -0.50310736]
 [-0.52379401 -0.4676268   1.51953786]
 [-0.52931069  1.46560359 -0.50448467]
 [-0.53107259  1.28190451  0.21510024]
 [ 1.51154215 -0.49561142 -0.50310736]]

找出每个数据点的最大元素，利用这些分数再现预测结果：

```
print("Argmax of decision function:\n{}".format(np.argmax(gbrt.decision_function(X_test),axis=1)))
print("Predictions:\n{}".format(gbrt.predict(X_test)))
```

Argmax of decision function:
[1 0 2 1 1 0 1 2 1 1 2 0 0 0 0 1 2 1 1 2 0 2 0 2 2 2 2 2 0 0 0 0 1 0 0 2 1
0]
Predictions:
[1 0 2 1 1 0 1 2 1 1 2 0 0 0 0 1 2 1 1 2 0 2 0 2 2 2 2 2 0 0 0 0 1 0 0 2 1
0]

函数**predict_proba**输出的形状相同，每个数据点所有可能类别的概率之和为1：

```
print("Predicted probabilities:\n{}".format(gbrt.predict_proba(X_test)[:6]))
print("Sums:{}".format(gbrt.predict_proba(X_test)[:6].sum(axis=1)))
```

Predicted probabilities:
[[0.10664722 0.7840248  0.10932798]
 [0.78880668 0.10599243 0.10520089]
 [0.10231173 0.10822274 0.78946553]
 [0.10664722 0.7840248  0.10932798]
 [0.10825347 0.66344934 0.22829719]
 [0.78880668 0.10599243 0.10520089]]
Sums:[1. 1. 1. 1. 1. 1.]

同样通过计算predict_proba的argmax来再现预测结果：

```python
print("Argmax of predicted probabilities:\n{}".format(np.argmax(gbrt.predict_proba(X_test),axis=1)))
print("Predictions:\n{}".format(gbrt.predict(X_test)))
```

Argmax of predicted probabilities:
[1 0 2 1 1 0 1 2 1 1 2 0 0 0 0 1 2 1 1 2 0 2 0 2 2 2 2 2 0 0 0 0 1 0 0 2 1
0]
Predictions:
[1 0 2 1 1 0 1 2 1 1 2 0 0 0 0 1 2 1 1 2 0 2 0 2 2 2 2 2 0 0 0 0 1 0 0 2 1
0]

如果类别是字符串，或者不是从0开始的连续整数，如果想对比predict的结果与decision_function或predict_proba的结果，一定要用分类器的**class_**属性来获取真实的属性名称：

```python
logreg = LogisticRegression()
#用Iris数据集的类别名称来表示每一个目标值
named_target = iris.target_names[y_train]
logreg.fit(X_train, named_target)
print("unique classes in training data:{}".format(logreg.classes_))
print("predictions:{}".format(logreg.decision_function(X_test)[:10]))
argmax_dec_func = np.argmax(logreg.decision_function(X_test),axis=1)
print("argmax of decision function:{}".format(argmax_dec_func[:10]))
print("argmax combined with classes_:{}".format(logreg.classes_[argmax_dec_func][:10]))
```

unique classes in training data:['setosa' 'versicolor' 'virginica']
predictions:[[ -4.74421081   0.10206931  -1.08359885]
 [  3.69925393  -1.93718538 -10.9764477 ]
 [-10.12822014   0.89802146   4.26248657]
 [ -4.50415391  -0.50012883  -0.91979596]
 [ -4.88103492   0.24942097  -1.51195778]
 [  3.36879349  -1.64440224 -10.16663932]
 [ -2.55379303  -0.8487211   -2.85047143]
 [ -5.92195262  -0.99666606   0.48794006]
 [ -5.38618179   0.67361954  -0.16982408]
 [ -3.2945895   -0.21625645  -2.35924879]]
argmax of decision function:[1 0 2 1 1 0 1 2 1 1]
argmax combined with classes_:['versicolor' 'setosa' 'virginica' 'versicolor' 'versicolor' 'setosa'
 'versicolor' 'virginica' 'versicolor' 'versicolor']



## 无监督学习

没有已知输出，只有输入数据的学习算法。无监督学习分为**数据集变换**与**聚类**

通常来说，评估无监督算法结果的唯一方法就是人工检查。无监督算法通常可作为监督算法的预处理步骤，包括数据缩放等等。也可以用作探索性分析，分解、流形学习和聚类都是加深数据理解的重要工具。

#### 数据预处理

scikit-learn中不同类型的数据预处理(变换)方法：StandardScaler, RobustScaler, MinMaxScaler, Normalizer

接下来将核SVM应用到cancer数据集上，并使用MinMaxScaler来预处理数据：

```python
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=1)
print(X_train.shape)
print(X_test.shape)
```

(426, 30)
(143, 30)

```python
#导入实现预处理的类并实例化
from sklearn.preprocessing import MinMaxScaler
scaler = MinMaxScaler()
#使用fit方法拟合缩放器(scaler)并将其应用于训练数据,这里只需要X_train
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
#在缩放之前和之后分别打印数据集属性
print("transformed shape:{}".format(X_train_scaled.shape))
print("per-feature minimum before scaling:\n{}".format(X_train.min(axis=0)))
print("per-feature maximum before scaling:\n{}".format(X_train.max(axis=0)))
print("per-feature minimum after scaling:\n{}".format(X_train_scaled.min(axis=0)))
print("per-feature maximum after scaling:\n{}".format(X_train_scaled.max(axis=0)))
```

运行可知，现在所有特征都位于0到1之间，符合预期，接下来将transform应用到X_test_scaled上

```python
X_test_scaled = scaler.transform(X_test)
print("per-feature minimum after scaling:\n{}".format(X_test_scaled.min(axis=0)))
print("per-feature maximum after scaling:\n{}".format(X_test_scaled.max(axis=0)))
```

测试集缩放后得到在0~1范围之外，因为scaler一开始是拟合的训练集，而测试集不应影响处理数据的方式

```python
#对make_blobs数据的训练数据和测试数据同时缩放
import matplotlib.pyplot as plt
import mglearn
from sklearn.datasets import make_blobs
X,_ = make_blobs(n_samples=50, centers=5, random_state=4, cluster_std=2)
X_train, X_test = train_test_split(X, random_state=5, test_size=.1)
#绘制训练集和测试集
fig, axes = plt.subplots(1,2,figsize=(10,4))
axes[0].scatter(X_train[:,0],X_train[:,1],c=mglearn.cm2(0),label="Training set",s=60)
axes[0].scatter(X_test[:,0],X_test[:,1],marker='^',c=mglearn.cm2(1),label="Test set",s=60)
axes[0].legend(loc='upper left')
axes[0].set_title("Original Data")
#利用MinMaxScaler缩放数据
scaler = MinMaxScaler()
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
#将缩放数据可视化
axes[1].scatter(X_train_scaled[:,0],X_train_scaled[:,1],c=mglearn.cm2(0),label="Training set",s=60)
axes[1].scatter(X_test_scaled[:,0],X_test_scaled[:,1],marker='^',c=mglearn.cm2(1),label="Test set", s=60)
axes[1].set_title("Scaled Data")
for ax in axes:
    ax.set_xlabel("Feature 0")
    ax.set_ylabel("Feature 1")
```

![](images\scaleddata.png)

在某数据集上fit一个模型，再将其transform，可以用fit_transform方法或者方法链替代：

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
#依次调用fit和transform(方法链)
X_scaled = scaler.fit(X).transform(X)
#fit_transform
X_scled_d = scaler.fit_transform(X)
```

接下来观察使用MinMaxScaler对学习**核SVM(SVC)**的作用：

```python
from sklearn.svm import SVC
X_train, X_test, y_train, y_test = train_test_split(cancer.data,cancer.target,random_state=0)
svm = SVC(C=100)
svm.fit(X_train, y_train)
print("Test set accuracy:{:.2f}".format(svm.score(X_test,y_test)))
```

Test set accuracy:0.63

```python
#使用0-1缩放进行预处理
scaler = MinMaxScaler()
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
svm.fit(X_train_scaled, y_train)
#在缩放后的测试集上计算分数
print("Scaled test set accuracy:{:.2f}".format(svm.score(X_test_scaled,y_test)))
```

Scaled test set accuracy:0.97

也可以改变预处理算法

```python
from sklearn.preprocessing import StandardScaler
scaler = StandardScaler()
scaler.fit(X_train)
X_train_scaled = scaler.transform(X_train)
X_test_scaled = scaler.transform(X_test)
#在缩放后的训练数据上学习SVM
svm.fit(X_train_scaled, y_train)
print("SVM test accuracy:{:.2f}".format(svm.score(X_test_scaled,y_test)))
```

SVM test accuracy:0.96



#### 降维、特征提取与流形学习

利用无监督学习进行数据变换，可视化、压缩数据，以及寻找信息量更大的数据表示。

##### 主成分分析PCA

主成分分析(principal component analysis,PCA)是一种旋转数据集的方法，旋转后的特征在统计上不相关。

算法首先找到方差最大的方向标记为成分1(Component 1)，然后找到与之正交且包含最多信息的方向为成分2，这一过程被称为主成分，一般来说主成分个数与原始特征相同。旋转数据并减去平均值使得数据以0为中心（平移），仅保留一部分主成分来使用PCA进行降维，最后反向旋转并将平均值重新加到数据中，即回归到原始特征空间中。这种变换可以去除数据中的噪声影响，或者将主成分中保留的那部分信息可视化。

接下来将PCA应用于cancer数据集并可视化，先对每个特征分别计算两个类别的直方图：

```python
fig, axes = plt.subplots(15,2,figsize=(10,20))
malignant = cancer.data[cancer.target == 0]
benign = cancer.data[cancer.target == 1]
ax = axes.ravel()
for i in range(30):
    _,bins = np.histogram(cancer.data[:,i], bins=50)
    ax[i].hist(malignant[:,i],bins=bins,color=mglearn.cm3(0),alpha=.5)
    ax[i].hist(benign[:,i],bins=bins,color=mglearn.cm(2),alpha=.5)
    ax[i].set_title(cancer.feature_names[i])
    ax[i].set_yticks(())
ax[0].set_xlabel("Feature magnitude")
ax[0].set_ylabel("Frequency")
ax[0].legend(["malignant","benign"],loc="best")
fig.tight_layout()
```

![](images\PCAIRISF.png)

这种图无法向我们展示变量之间的相互作用以及这种相互作用与类别之间的关系。我们将利用PCA获取主要相互作用，找到前两个主成分，并在新的二维空间中用散点图将数据可视化。先用StandardScaler缩放数据，使每个特征的方差均为1。

```python
from sklearn.datasets import load_breast_cancer
cancer = load_breast_cancer()
scaler = StandardScaler()
scaler.fit(cancer.data)
X_scaled = scaler.transform(cancer.data)
```

将PCA实例化，调用fit方法找到主成分，然后调用transform来旋转并降维。默认情况下，PCA仅旋转并移动数据，保留所有主成分。为降低维度，需要在创建PCA对象时指定想要保留的主成分个数。

```python
from sklearn.decomposition import PCA
pca = PCA(n_components=2)
pca.fit(X_scaled)
#将数据变换到前两个主成分上
X_pca = pca.transform(X_scaled)
print("Original shape:{}".format(str(X_scaled.shape)))
print("Reduced shape:{}".format(str(X_pca.shape)))
```

Original shape:(569, 30)
Reduced shape:(569, 2)

现在对前两个主成分作图

```python
plt.figure(figsize=(8, 8))
mglearn.discrete_scatter(X_pca[:,0],X_pca[:,1],cancer.target)
plt.legend(cancer.target_names, loc="best")
plt.gca().set_aspect("equal")
plt.xlabel("First principal component")
plt.ylabel("Second principal component")
```

![](images\cancerpacscatter.png)

此时可见即便是线性分类器也可以有不错的表现，还看得出恶性点比良性点更加分散。PCA的缺点在于不容易对图中的两个轴做出解释，它是原始特征的组合。在拟合过程中，主成分被保存在PCA对象的components_属性中：

`print("PCA components:\n{}".format(pca.components_))`

PCA components:
[[ 0.21890244  0.10372458  0.22753729  0.22099499  0.14258969  0.23928535
0.25840048  0.26085376  0.13816696  0.06436335  0.20597878  0.01742803
0.21132592  0.20286964  0.01453145  0.17039345  0.15358979  0.1834174
0.04249842  0.10256832  0.22799663  0.10446933  0.23663968  0.22487053
0.12795256  0.21009588  0.22876753  0.25088597  0.12290456  0.13178394]
[-0.23385713 -0.05970609 -0.21518136 -0.23107671  0.18611302  0.15189161
0.06016536 -0.0347675   0.19034877  0.36657547 -0.10555215  0.08997968
-0.08945723 -0.15229263  0.20443045  0.2327159   0.19720728  0.13032156
0.183848    0.28009203 -0.21986638 -0.0454673  -0.19987843 -0.21935186
0.17230435  0.14359317  0.09796411 -0.00825724  0.14188335  0.27533947]]

还能用热图将系数可视化

```python
plt.matshow(pca.components_,cmap='viridis')
plt.yticks([0,1],["First component","Second component"])
plt.colorbar()
plt.xticks(range(len(cancer.feature_names)),
          cancer.feature_names, rotation=60, ha='left')
plt.xlabel("Feature")
plt.ylabel("Principal components")
```

Text(0,0.5,'Principal components')

![](images\cancercolorbar.png)

用PCA对图像做**特征提取**，处理Wild数据集Labeled Faces中的人脸图像

```python
from sklearn.datasets import fetch_lfw_people
people = fetch_lfw_people(min_faces_per_person=20,resize=0.7)
image_shape = people.images[0].shape
fix, axes = plt.subplots(2,5,figsize=(15,8),subplot_kw={'xticks':(),'yticks':()})
for target,image,ax in zip(people.target,people.images,axes.ravel()):
    ax.imshow(image)
    ax.set_title(people.target_names[target])
```

一共3023张图像，每张大小为87像素x65像素，分别属于62个不同的人

`print("people.images.shape:{}".format(people.images.shape))`

`print("Number of classes:{}".format(len(people.target_names)))`

people.images.shape:(3023, 87, 65)
Number of classes:62

```python
#计算每个目标出现的次数
counts = np.bincount(people.target)
#将次数与目标名称一起打印起来
for i,(count, name) in enumerate(zip(counts, people.target_names)):
    print("{0:25}{1:3}".format(name, count),end='  ')
    if (i+1)%3 == 0:
        print()
```

  Alejandro Toledo          39  Alvaro Uribe              35  Amelie Mauresmo           21  
Andre Agassi              36  Angelina Jolie            20  Ariel Sharon              77  
Arnold Schwarzenegger     42  Atal Bihari Vajpayee      24  Bill Clinton              29  
Carlos Menem              21  Colin Powell             236  David Beckham             31  
Donald Rumsfeld          121  George Robertson          22  George W Bush            530  
Gerhard Schroeder        109  Gloria Macapagal Arroyo   44  Gray Davis                26  
Guillermo Coria           30  Hamid Karzai              22  Hans Blix                 39  
Hugo Chavez               71  Igor Ivanov               20  Jack Straw                28  
Jacques Chirac            52  Jean Chretien             55  Jennifer Aniston          21  
Jennifer Capriati         42  Jennifer Lopez            21  Jeremy Greenstock         24  
Jiang Zemin               20  John Ashcroft             53  John Negroponte           31  
Jose Maria Aznar          23  Juan Carlos Ferrero       28  Junichiro Koizumi         60  
Kofi Annan                32  Laura Bush                41  Lindsay Davenport         22  
Lleyton Hewitt            41  Luiz Inacio Lula da Silva 48  Mahmoud Abbas             29  
Megawati Sukarnoputri     33  Michael Bloomberg         20  Naomi Watts               22  
Nestor Kirchner           37  Paul Bremer               20  Pete Sampras              22  
Recep Tayyip Erdogan      30  Ricardo Lagos             27  Roh Moo-hyun              32  
Rudolph Giuliani          26  Saddam Hussein            23  Serena Williams           52  
Silvio Berlusconi         33  Tiger Woods               23  Tom Daschle               25  
Tom Ridge                 33  Tony Blair               144  Vicente Fox               32  
Vladimir Putin            49  Winona Ryder              24

为降低G.W.Bush导致的数据偏斜，我们对每个人最多取50张图像:

```python
mask = np.zeros(people.target.shape, dtype=np.bool)
for target in np.unique(people.target):
    mask[np.where(people.target == target)[0][:50]] = 1
X_people = people.data[mask]
y_people = people.target[mask]
#将灰度值缩放到0到1之间，而不是在0到255之间
#以得到更好的数据稳定性
X_people = X_people/255
```

我们对训练数据拟合PCA对象，并提取前100个主成分，然后对训练数据和测试数据进行变换:

```python
X_train, X_test, y_train, y_test = train_test_split(X_people,y_people,stratify=y_people,random_state=0)
pca = PCA(n_components=100,whiten=True,random_state=0).fit(X_train)
X_train_pca = pca.transform(X_train)
X_test_pca = pca.transform(X_test)
print("X_train_pca.shape:{}".format(X_train_pca.shape))
```

X_train_pca.shape:(1547, 100)

新数据有100个特征，即前100个主成分，这时对新表示使用单一最近邻分类器来将图像分类:

```python
knn = KNeighborsClassifier(n_neighbors=1)
knn.fit(X_train_pca, y_train)
print("Test set accuracy: {:.2f}".format(knn.score(X_test_pca,y_test)))
```

Test set accuracy: 0.31

比PCA前的26.6%有所提升，接下来看一下前几个主成分

`print("pca.components_.shape:{}".format(pca.components_.shape))`

pca.components_.shape:(100, 5655)

```python
fix, axes = plt.subplots(3,5, figsize=(15,12),subplot_kw={'xticks':(),'yticks':()})
for i,(component,ax) in enumerate(zip(pca.components_,axes.ravel())):
    ax.imshow(component.reshape(image_shape),cmap='viridis')
    ax.set_title("{}. component".format((i+1)))
```

![](images\15component.png)

人脸数据集前15个主成分的成分向量，原图像就是它们的加权求和。当仅使用少量主成分时，仅能捕捉图片基本特征，如果使用的成分个数与像素个数相等，则旋转后不会丢失任何信息，能完美重建图像。

##### 非负矩阵分解NMF

非负矩阵分解(non-negative matrix factorization,NMF)是另一种无监督学习算法，其目的在于提取有用的特征。工作原理类似PCA也是降维，但在PCA中我们想要的是正交分量，并能够解释尽可能多的数据方差；而在NMF中我们希望分量和系数均为非负。NMF对由多个独立源相加创建而成的数据特别有用，比如音轨或音乐。与PCA相比，NMF得到的分量更容易解释，因为不会产生抵消效应。

将NMF应用于Wild数据集Labeled Faces，主要参数是要提取的分量个数**n_components**，通常要小于输入特征的个数。这里尝试提取15个分量:

```python
from sklearn.decomposition import NMF
nmf = NMF(n_components=15,random_state=0)
nmf.fit(X_train)
X_train_nmf = nmf.transform(X_train)
X_test_nmf = nmf.transform(X_test)
fix, axes = plt.subplots(3,5,figsize=(15,12),subplot_kw={'xticks':(),'yticks':()})
for i,(component, ax) in enumerate(zip(nmf.components_,axes.ravel())):
    ax.imshow(component.reshape(image_shape))
    ax.set_title("{}. component".format(i))
```

![](images\nmf15.png)

接下来研究一下分量与图像的关系

```python
compn = 3
#按第3个分量排序，绘制前10张图像
inds = np.argsort(X_train_nmf[:,compn])[::-1]
fig, axes = plt.subplots(2,5,figsize=(15,8),subplot_kw={'xticks':(),'yticks':()})
for i,(ind,ax) in enumerate(zip(inds, axes.ravel())):
    ax.imshow(X_train[ind].reshape(image_shape))
compn = 7
#按第7个分量排序，绘制前10张图像
inds = np.argsort(X_train_nmf[:,compn])[::-1]
fig, axes = plt.subplots(2,5,figsize=(15,8),subplot_kw={'xticks':(),'yticks':()})
for i,(ind,ax) in enumerate(zip(inds, axes.ravel())):
    ax.imshow(X_train[ind].reshape(image_shape))
```

![](images\3compn.png)

![](images\7compn.png)

分量3系数较大的都是向右看的人脸，分量7较大的则是向左看。接下来分析一下叠加结构的数据，一个由三个不同信号源合成的信号

```
S = mglearn.datasets.make_signals()
plt.figure(figsize=(6,1))
plt.plot(S,'-')
plt.xlabel("Time")
plt.ylabel("Signal")
```

![](images\signal.png)

将混合信号分解为原始分量，可以用NMF来还原这三个信号:

```python
#将数据混合成100维的状态
A = np.random.RandomState(0).uniform(size=(100, 3))
X = np.dot(S, A.T)
print("Shape of measurements:{}".format(X.shape))
```

Shape of measurements:(2000, 100)

```python
nmf = NMF(n_components=3, random_state=42)
S_ = nmf.fit_transform(X)
print("Recoverd signal shape:{}".format(S_.shape))
```

Recoverd signal shape:(2000, 3)

借用PCA对比：

```python
pca = PCA(n_components=3)
H = pca.fit_transform(X)
```

给出NMF和PCA发现的信号活动:

```python
models = [X, S, S_, H]
names = ['Observations (first three measurements)','True sources','NMF recovered signals','PCA recovered signals']
fig, axes = plt.subplots(4, figsize=(8,4), gridspec_kw={'hspace':.5},subplot_kw={'xticks':(),'yticks':()})
for model, name, ax in zip(models, names, axes):
    ax.set_title(name)
    ax.plot(model[:,:3],'-')
```

![](images\NMFPCA.png)

NMF发现了原始信号而PCA失败了，类似的分量分解方式在scikit-learn中还有独立成分分析(ICA)、因子分析(FA)和稀疏编码(字典学习)等等。

##### 用t-SNE进行流形学习

流形学习算法允许进行相比于PCA更复杂的映射，也能给出更好的可视化，其中特别有用的一个就是**t-SNE算法**

流形学习算法主要用于可视化，因此很少用来生成两个以上新特征。t-SNE计算训练数据的一种新表示，但不允许变换新数据，所有无法用于测试集，大多用于探索性数据分析而不是机器学习。t-SNE首先给出每个数据点的随机二维表示，然后尝试让在原始特征空间中距离较近的点更加靠近，原始特征空间中距离远的点更远离，t-SNE试图保存那些表示哪些点比较靠近的信息。

在8x8灰度图像中应用t-SNE流形学习算法:

```python
from sklearn.datasets import load_digits
digits = load_digits()
fig, axes = plt.subplots(2, 5, figsize=(10,5),subplot_kw={'xticks':(),'yticks':()})
for ax, img in zip(axes.ravel(), digits.images):
    ax.imshow(img)
```

![](images\digits.png)

我们用PCA将降到二维的数据可视化，对前两个主成分作图，并按类别对数据点着色:

```python
#构建一个PCA模型
pca = PCA(n_components=2)
pca.fit(digits.data)
#将digits数据变换到前两个主成分的方向上
digits_pca = pca.transform(digits.data)
colors = ["#476A2A","#7851B8","#BD3430","#4A2D4E","#875525","#A83683","#4E655E","#853541","#3A3120","#535D8E"]
plt.figure(figsize=(10,10))
plt.xlim(digits_pca[:,0].min(), digits_pca[:,0].max())
plt.ylim(digits_pca[:,1].min(), digits_pca[:,1].max())
for i in range(len(digits.data)):
    #将数据实际绘制成文本，而不是散点
  plt.text(digits_pca[i,0],digits_pca[i,1],str(digits.target[i]),color=colors[digits.target[i]], fontdict={'weight':'bold','size':9})
plt.xlabel("First principal component")
plt.ylabel("Second principal component")
```

Text(0,0.5,'Second principal component')

![](images\2digits.png)

可见0，6，4相对较好分开，但大多数重叠在一起。我们将t-SNE应用于同一数据集，由于t-SNE不支持变换新数据，所以**没有transform方法**，但可调用**fit_transform**方法来代替，它会构建模型并立刻返回变换后的数据:

```python
from sklearn.manifold import TSNE
tsne = TSNE(random_state=42)
#使用fit_transform而不是fit，因为TSNE没有transform方法
digits_tsne = tsne.fit_transform(digits.data)
plt.figure(figsize=(10,10))
plt.xlim(digits_tsne[:,0].min(),digits_tsne[:,0].max()+1)
plt.ylim(digits_tsne[:,1].min(),digits_tsne[:,1].max()+1)
for i in range(len(digits.data)):
    #将数据实际绘制成文本，而不是散点
    plt.text(digits_tsne[i,0],digits_tsne[i,1],str(digits.target[i]),color = colors[digits.target[i]],fontdict={'weight':'bold','size':9})
plt.xlabel("t-SNE feature 0")
plt.xlabel("t-SNE feature 1")
```

![](images\tsnedigits.png)

t-SNE的结果很棒，但要注意的是这种方法并不知道类别标签，它是完全无监督的，它只是根据原始空间中的靠近程度找到数据的一种二维表示。它的调节参数有perplexity和early_exaggeration，但作用很小。



#### 聚类cluster

聚类(clustering)是将数据集划分成组的任务，这些组叫作簇(cluster)。与分类算法类似，聚类算法为每个数据点分配或预测一个数字，表示这个点属于哪个簇。

##### k均值聚类

k均值聚类(KMeans)试图找到代表数据特定区域的簇中心(cluster center)，算法交替执行以下两个步骤：将每个数据点分配给最近的簇中心，然后将每个簇中心设置为所分配的所有数据点的平均值。

下面将KMeans类实例化，并设置需要寻找的簇个数，并对数据调用fit方法:

```python
from sklearn.datasets import make_blobs
from sklearn.cluster import KMeans
#生成模拟的二维数据
X, y = make_blobs(random_state=1)
#构建聚类模型
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
```

`print("Cluster memberships:\n{}".format(kmeans.labels_))`

Cluster memberships:
[0 2 2 2 1 1 1 2 0 0 2 2 1 0 1 1 1 0 2 2 1 2 1 0 2 1 1 0 0 1 0 0 1 0 2 1 2
2 2 1 1 2 0 2 2 1 0 0 0 0 2 1 1 1 0 1 2 2 0 0 2 1 1 2 2 1 0 1 0 2 2 2 1 0
0 2 1 1 0 2 0 2 2 1 0 0 0 0 2 0 1 0 0 2 2 1 1 0 1 0]

注意，聚类算法中的标签不存在先验意义。簇中心被保存在cluster_centers_属性中，用三角形表示：

```python
mglearn.discrete_scatter(X[:,0],X[:,1],kmeans.labels_,markers='o')
mglearn.discrete_scatter(kmeans.cluster_centers_[:,0],kmeans.cluster_centers_[:,1],[0,1,2],markers='^',markeredgewidth=2)
```

![](images\cluster3.png)

因为每个簇仅由其中心定义，意味着每个簇都是凸形(convex)；k均值还假设所有簇在某种程度上具有相同的直径，边界都处于中间位置。来看一下簇密度不同时的聚类结果:

```python
X_varied, y_varied = make_blobs(n_samples=200,cluster_std=[1.0,2.5,0.5],random_state=170)
y_pred = KMeans(n_clusters=3,random_state=0).fit_predict(X_varied)
mglearn.discrete_scatter(X_varied[:,0],X_varied[:,1],y_pred)
plt.legend(["cluster 0","cluster 1","cluster 2"],loc='best')
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\f_cluster.png)

如果二维数据沿线性方向拉长，形成非球形簇，k均值也无法处理

```python
#生成一些随机分组数据
X,y = make_blobs(random_state=170,n_samples=600)
rng = np.random.RandomState(74)
#变换数据使其拉长
transformation = rng.normal(size=(2,2))
X = np.dot(X, transformation)
#将数据聚类成3个簇
kmeans = KMeans(n_clusters=3)
kmeans.fit(X)
y_pred = kmeans.predict(X)
#画出簇分类和簇中心
plt.scatter(X[:,0],X[:,1],c=y_pred,cmap=mglearn.cm3)
plt.scatter(kmeans.cluster_centers_[:,0],kmeans.cluster_centers_[:,1],marker='^',c=[0,1,2],s=100,linewidth=2,cmap=mglearn.cm3)
```

![](images\longcluster.png)

如果形状更加复杂比如two_moons数据，k均值同样无法处理。

PCA和NMF两种方法都试图将数据点表示为分量之和，k均值则尝试利用簇中心来表示每个数据点，也可以视为仅用一个由簇中心给出的分量来表示数据点。我们分别提取PCA、NMF分量，对k均值找簇中心:

```python
X_train, X_test, y_train, y_test = train_test_split(X_people,y_people,stratify=y_people,random_state=0)
nmf = NMF(n_components=100,random_state=0)
nmf.fit(X_train)
pca = PCA(n_components=100,random_state=0)
pca.fit(X_train)
kmeans = KMeans(n_clusters=100,random_state=0)
kmeans.fit(X_train)

X_reconstructed_pca = pca.inverse_transform(pca.transform(X_test))
X_reconstructed_kmeans = kmeans.cluster_centers_[kmeans.predict(X_test)]
X_reconstructed_nmf = np.dot(nmf.transform(X_test),nmf.components_)
```



![](images\1003.png)

![](images\1003_1.png)

利用k均值做矢量量化的有趣在于可以用比输入维度更多的簇来对数据进行编码，回到two_moons数据，利用PCA和NMF将其讲到一维会完全破坏数据的结构，但通过使用更多的簇中心，可以用k均值找到一种更具表现力的表示

```python
X, y = make_moons(n_samples=200,noise=0.05,random_state=0)
kmeans = KMeans(n_clusters=10,random_state=0)
kmeans.fit(X)
y_pred = kmeans.predict(X)

plt.scatter(X[:,0],X[:,1],c=y_pred,s=60,cmap='Paired')
plt.scatter(kmeans.cluster_centers_[:,0],kmeans.cluster_centers_[:,1],s=60,marker='^',c=range(kmeans.n_clusters),linewidth=2,cmap='Paired')
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
print("Cluster memberships:\n{}".format(y_pred))
```

Cluster memberships:
[9 2 5 4 2 7 9 6 9 6 1 0 2 6 1 9 3 0 3 1 7 6 8 6 8 5 2 7 5 8 9 8 6 5 3 7 0
9 4 5 0 1 3 5 2 8 9 1 5 6 1 0 7 4 6 3 3 6 3 8 0 4 2 9 6 4 8 2 8 4 0 4 0 5
6 4 5 9 3 0 7 8 0 7 5 8 9 8 0 7 3 9 7 1 7 2 2 0 4 5 6 7 8 9 4 5 4 1 2 3 1
8 8 4 9 2 3 7 0 9 9 1 5 8 5 1 9 5 6 7 9 1 4 0 6 2 6 4 7 9 5 5 3 8 1 9 5 6
3 5 0 2 9 3 0 8 6 0 3 3 5 6 3 2 0 2 3 0 2 6 3 4 4 1 5 6 7 1 1 3 2 4 7 2 7
3 8 6 4 1 4 3 9 9 5 1 7 5 8 2]

![](images\moonsk.png)

这时可以看作10个分量表示的数据，还可以得到一种表现力更强的数据表示，将每个簇中心的距离作为特征，利用kmeans的transform完成：

```python
distance_features = kmeans.transform(X)
print("Distance feature shape:{}".format(distance_features.shape))
print("Distance features:\n{}".format(distance_features))
```

优点：容易理解和实现，速度快，可以轻松扩展到大数据集

缺点：依赖随机初始化，默认情况下会用十个不同随机初始化运行10次并返回最佳结果；对簇形状的假设约束性强，还需要找到簇个数。

##### 凝聚聚类

凝聚距离(agglomerative clustering)指的是许多基于相同原则构建的聚类算法：首先声明每个点是自己的簇，然后合并两个最相似的簇，直至满足某种停止准则为止。还有一些链接(linkage)用来度量"最相似的簇"：ward，默认，方差增加最小化，最终大小相似；average，簇中所有点平均距离最小；complete簇中点之间最大距离最小。一般默认ward，如果簇中成员个数非常不同可以尝试average和complete。

由于算法的工作原理，凝聚算法不能对新数据点做出预测。因此AgglomerativeClustering没有predict方法，为构造模型并得到训练集上簇的成员关系，可以改用fit_predict方法:

```python
from sklearn.cluster import AgglomerativeClustering
X, y = make_blobs(random_state=1)
agg = AgglomerativeClustering(n_clusters=3)
assignment = agg.fit_predict(X)
mglearn.discrete_scatter(X[:,0],X[:,1],assignment)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\P141.png)

这种可视化依赖于数据的二维性质，多维数据集可用scipy的dendrogram函数来绘制树状图:

```python
#从SciPy中导入dendrogram函数和ward聚类函数
from scipy.cluster.hierarchy import dendrogram,ward
X, y = make_blobs(random_state=0, n_samples=12)
#将ward聚类应用于数据数组X，SciPy的ward函数返回一个数组
linkage_array = ward(X)
dendrogram(linkage_array)
#在树中标记划分成两个簇或三个簇的位置
ax = plt.gca()
bounds = ax.get_xbound()
ax.plot(bounds,[7.25,7.25],'--',c='k')
ax.plot(bounds,[4,4],'--',c='k')
ax.text(bounds[1],7.25,'two clusters',va='center',fontdict={'size':15})
ax.text(bounds[1],4,'three clusters',va='center',fontdict={'size':15})
plt.xlabel("Sample index")
plt.ylabel("Cluster distance")
```

![](images\P142.png)

但凝聚聚类仍然无法分离像two_moons数据集这样复杂的形状，算法DBSCAN可以解决这个问题。

##### DBSCAN

DBSCAN即具有噪声的基于密度的空间聚类应用，它无需先验地设置簇的个数，可以划分具有复杂形状的簇，还可以找出不属于任何簇的点。DBSCAN比凝聚聚类和k均值稍慢，但仍可以拓展到较大数据集。

DBSCAN原理是识别特征空间的”拥挤“区域中的点，这些区域被称为特征空间中的密集(dense)区域。DBSCAN背后的思想是，簇形成数据的密集区域，并由相对较空的区域分隔开。

在密集区域内的点被称为核心样本(core sample.或核心点)，DBSCAN由两个参数：min_samples和eps，如果在距一个给定数据点eps的距离内至少有min_samples个数据点，那么这个数据点就是核心样本。DBSCAN将彼此距离小于eps的核心样本放到同一个簇中。与凝聚聚类类似，DBSCAN不能对新数据进行预测，需使用fit_predict：

```python
from sklearn.cluster import DBSCAN
X, y = make_blobs(random_state=0,n_samples=12)
dbscan = DBSCAN()
clusters = dbscan.fit_predict(X)
print("Cluster memberships:\n{}".format(clusters))
```

Cluster memberships:
[-1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1 -1]

结果所有数据点都被判定为噪声，下面看一下eps和min_samples参数的影响：`mglearn.plots.plot_dbscan()`

![](images\P145.png)

增大eps，更多的点会被包含在簇中，增大min_samples，核心点会变得更少，噪声会变多。

使用StandardScaler或MinMaxScaler对数据缩放之后，更容易找到eps较好的取值

```python
X, y = make_moons(n_samples=200, noise=0.05, random_state=0)
#将数据缩放成平均值是0方差是1
scaler = StandardScaler()
scaler.fit(X)
X_scaled = scaler.transform(X)

dbscan=DBSCAN()
clusters = dbscan.fit_predict(X_scaled)
#绘制簇分配
plt.scatter(X_scaled[:,0],X_scaled[:,1],c=clusters,cmap=mglearn.cm2,s=60)
plt.xlabel("Feature 0")
plt.ylabel("Feature 1")
```

![](images\P146.png)

注意，当存在噪声时标签为-1，作为另一个数据的索引会发生错误。

##### 对比与评估

聚类算法的难点在于很难评估好坏，也难以比较结果。

调整rand指数(adjusted_rand_score，ARI)和归一化互信息(NMI)可用于评估聚类算法相对于真实聚类的结果，二者最佳值为1，0表示不相关的聚类(ARI甚至能取负)。

下面使用ARI来比较k均值、凝聚聚类和DBSCAN算法:

```python
from sklearn.metrics.cluster import adjusted_rand_score
from sklearn.cluster import AgglomerativeClustering
X, y = make_moons(n_samples=200, noise=0.05, random_state=0)
#将数据缩放成平均值为0、方差为1
sclaer = StandardScaler()
scaler.fit(X)
X_scaled = scaler.transform(X)
fig, axes = plt.subplots(1,4,figsize=(15,3),subplot_kw={'xticks':(),'yticks':()})
#列出要使用的算法
algorithms = [KMeans(n_clusters=2),AgglomerativeClustering(n_clusters=2),DBSCAN()]
#创建一个随机的簇分配作为参考
random_state = np.random.RandomState(seed=0)
random_clusters = random_state.randint(low=0,high=2,size=len(X))
#绘制随机分配
axes[0].scatter(X_scaled[:,0],X_scaled[:,1],c=random_clusters,cmap=mglearn.cm3,s=60)
axes[0].set_title("Random assignment - ARI:{:.2f}".format(adjusted_rand_score(y,random_clusters)))
for ax,algorithm in zip(axes[1:],algorithms):
    #绘制簇分配和簇中心
    clusters = algorithm.fit_predict(X_scaled)
    ax.scatter(X_scaled[:,0],X_scaled[:,1],c=clusters,cmap=mglearn.cm3,s=60)
    ax.set_title("{} - ARI:{:.2f}".format(algorithm.__class__.__name__,adjusted_rand_score(y,clusters)))
```

![](images\P149.png)

这类聚类评估时常见的错误是使用accuracy_score，精度要求分配的簇标签与真实值匹配，但簇标签本身毫无意义，唯一重要的是哪些点位于同一簇中：

```python
from sklearn.metrics import accuracy_score
#这两种点标签对应于相同的聚类
clusters1 = [0,0,1,1,0]
clusters2 = [1,1,0,0,1]
#精度为0，因为标签完全不同
print("Accuracy:{:.2f}".format(accuracy_score(clusters1,clusters2)))
#调整rand分数为1，因为二者聚类完全相同
print("ARI:{:.2f}".format(adjusted_rand_score(clusters1,clusters2)))
```

Accuracy:0.00
ARI:1.00

因为通常没有真实值来比较结果，很多时候要用到轮廓系数(silhouette coefficient): `silhouette_score`。人脸这样的数据集，唯一的办法就是人工分析:

```python
#从lfw数据中提取特征脸，并对数据进行变换
from sklearn.decomposition import PCA
pca = PCA(n_components=100, whiten=True, random_state=0)
pca.fit_transform(X_people)
X_pca = pca.transform(X_people)
#应用默认参数DBSCAN
dbscan = DBSCAN()
labels = dbscan.fit_predict(X_pca)
print("Unique labels:{}".format(np.unique(labels)))
```

Unique labels:[-1]

我们看到所有返回的数据被DBSCAN标记为噪声，可增大eps或减小min_samples来尝试改变:

```python
dbscan = DBSCAN(min_samples=3,eps=15)
labels = dbscan.fit_predict(X_pca)
print("Unique labels:{}".format(np.unique(labels)))
```

Unique labels:[-1  0]

使用更大的eps和更小的min_samples我们只得到了单一簇和噪声点，为进一步理解发生的事情，我们查看有多少噪声多少在簇内:

`print("Number of points per cluster:{}".format(np.bincount(labels + 1)))`

Number of points per cluster:[  32 2031]

得到32个噪声，查看这些噪声:

```python
noise = X_people[labels==-1]
fig, axes = plt.subplots(3,9,subplot_kw={'xticks':(),'yticks':()},figsize=(12,4))
for image,ax in zip(noise, axes.ravel()):
    ax.imshow(image.reshape(image_shape), vmin=0, vmax=1)
```

![](images\P151.png)

这被称为异常值检测(outlier detection)，接下来寻找更多的簇，将eps设置得更小，取值在15和0.5(默认)之间

```python
for eps in [1,3,5,7,9,11,13]:
    print("\neps={}".format(eps))
    dbscan = DBSCAN(eps=eps,min_samples=3)
    labels = dbscan.fit_predict(X_pca)
    print("Clusters present:{}".format(np.unique(labels)))
    print("Cluster sizes:{}".format(np.bincount(labels+1)))
```

eps=1
Clusters present:[-1]
Cluster sizes:[2063]
eps=3
Clusters present:[-1]
Cluster sizes:[2063]
eps=5
Clusters present:[-1]
Cluster sizes:[2063]
eps=7
Clusters present:[-1  0  1  2  3  4  5  6  7  8  9 10 11 12]
Cluster sizes:[2004    3   14    7    4    3    3    4    4    3    3    5    3    3]
eps=9
Clusters present:[-1  0  1  2]
Cluster sizes:[1307  750    3    3]
eps=11
Clusters present:[-1  0]
Cluster sizes:[ 413 1650]
eps=13
Clusters present:[-1  0]
Cluster sizes:[ 120 1943]

这表示数据中没有两类或三类非常不同的人脸图像，即利用DBSCAN无法创建多于一个较大的簇。凝聚聚类或k均值可能更加均匀，但需要设置簇的目标个数。接下来用k均值分析人脸数据集，先设置为10簇再分析:

```python
#用k均值提取簇
km = KMeans(n_clusters=10,random_state=0)
labels_km = km.fit_predict(X_pca)
print("Cluster sizes k-means:{}".format(np.bincount(labels_km)))
```

Cluster sizes k-means:[155 175 238  75 358 257  91 219 323 172]

使用pca.inverse_transform将簇中心旋转回到原始空间并可视化:

```python
fig, axes = plt.subplots(2,5,subplot_kw={'xticks':(),'yticks':()},figsize=(12,4))
for center,ax in zip(km.cluster_centers_, axes.ravel()):
    ax.imshow(pca.inverse_transform(center).reshape(image_shape),vmin=0,vmax=1)
```

![](images\P154.png)

每个簇中心都是64到386张人脸图像的平均，注意，k平均是对所有数据点划分而不像DBSCAN那样具有噪声点的概念，利用更多簇可找到更席位区别，但也使人工更困难。

接下来使用凝聚聚类分析人脸:

```python
#用ward凝聚聚类提取簇
agglomerative = AgglomerativeClustering(n_clusters=10)
labels_agg = agglomerative.fit_predict(X_pca)
print("Cluster sizes agglomerative clustering:{}".format(np.bincount(labels_agg)))
```

Cluster sizes agglomerative clustering:[169 660 144 329 217  85  18 261  31 149]

用ARI来度量凝聚聚类与k均值是否相似 `print(adjust_rand_score(labels_agg, labels_km))`

0.08710124457309265

因为对于k均值，远离簇中心的点似乎没什么共同点。接下来绘制树状图，并限制深度:

```python
linkage_array = ward(X_pca)
plt.figure(figsize=(20,5))
dendrogram(linkage_array,p=7,truncate_mode='level',no_labels=True)
plt.xlabel("Sample index")
plt.ylabel("Cluster distance")
```

![](images\P156.png)

从树状图来看，两个或三个簇就能很好划分数据。

```Python
#用ward凝聚聚类提取簇，改用40个簇并挑选一些出来
agglomerative = AgglomerativeClustering(n_clusters=40)
labels_agg = agglomerative.fit_predict(X_pca)
print(np.bincount(labels_agg))

n_clusters = 40
for cluster in [10,13,19,22,36]:
    mask = labels_agg == cluster
    fig, axes = plt.subplots(1,15,subplot_kw={'xticks':(),'yticks':()},figsize=(15,8))
    cluster_size = np.sum(mask)
    axes[0].set_ylabel("#{}:{}".format(cluster, cluster_size))
    for image, label, asdf, ax in zip(X_people[mask],y_people[mask],labels_agg[mask],axes):
        ax.imshow(image.reshape(image_shape),vmin=0,vmax=1)
        ax.set_title(people.target_names[label].split()[-1],fontdict={'fontsize':9})
        for i in range(cluster_size,15):
            axes[i].set_visible(False)
```

[ 43 120 100 194  56  58 127  22   6  37  65  49  84  18 168  44  47  31
78  30 166  20  57  14  11  29  23   5   8  84  67  30  57  16  22  12
29   2  26   8]

![](images\1.png)

![](images\P158.PNG)

可以找出其中的规律如"咧嘴"、"高额头"等等。

聚类的应用与评估是一个非常定性的过程，通常在数据分析的探索阶段很有帮助，三种聚类都能控制聚类的粒度(granularity)，k均值和凝聚聚类允许指定簇的数量，而DBSCAN允许用eps参数定义接近程度，从而影响簇大小。

k均值可以用簇的平均值来表示簇，可被看成由簇中心表示的分解方法；DBSCAN可以检测"噪声点"，还能帮助自动判断簇的数量，特别的一点是允许簇具有复杂形状；凝聚聚类则可以划分层次结构，生成树状图查看。



## 数据表示与特征工程

对某个特定的应用，如何找到最佳数据表示，这个问题被称为特征工程。正确的方式表示数据，对监督模型性能的影响比所选择的精确参数还要大。

#### 分类变量

表示分类变量最常用的方法就是使用**one-hot编码**(one-hot-encoding)或N取一编码(one-out-of-N encoding),也叫**虚拟变量(**dummy variable)。虚拟变量背后的思想是将一个分类变量替换为一个或多个新特征，新特征取0和1。

将数据转换为分类变量的one-hot编码有两种方法，pandas和scikit-learn，这里选用pandas方法因为更简单:

```python
import pandas as pd
from IPython.display import display
#文件中没包含列名称的表头，因此传入header=None,然后在"names"中显式地提供列名称
data = pd.read_csv("data/adult.data",header=None,index_col=False,
                  names=['age','workclass','fnlwgt','education','education-num','matrial-status','occupation','relationship','race','gender','capital-gain','capital-loss','hours-per-week','native-country','income'])
#为便于说明，只选择了其中几例
data = data[['age','workclass','education','gender','hours-per-week','occupation','income']]
display(data.head())
```

![](images\P164.PNG)

使用pandas Series的value_counts函数检查列的内容，以显示唯一值及其出现的次数

`print(data.gender.value_counts())`

Male      21790
Female    10771
Name: gender, dtype: int64

为自动变换所有具有对象类型的列或所有分类的列，这里用到pandas的**get_dummies**函数

```python
print("Original features:\n",list(data.columns),"\n")
data_dummies = pd.get_dummies(data)
print("Features after get_dummies:\n",list(data_dummies.columns))
```

Original features:
['age', 'workclass', 'education', 'gender', 'hours-per-week', 'occupation', 'income'] 
Features after get_dummies:
['age', 'hours-per-week', 'workclass_ ?', 'workclass_ Federal-gov', 'workclass_ Local-gov', 'workclass_ Never-worked', 'workclass_ Private', 'workclass_ Self-emp-inc', 'workclass_ Self-emp-not-inc', 'workclass_ State-gov', 'workclass_ Without-pay', 'education_ 10th', 'education_ 11th', 'education_ 12th', 'education_ 1st-4th', 'education_ 5th-6th', 'education_ 7th-8th', 'education_ 9th', 'education_ Assoc-acdm', 'education_ Assoc-voc', 'education_ Bachelors', 'education_ Doctorate', 'education_ HS-grad', 'education_ Masters', 'education_ Preschool', 'education_ Prof-school', 'education_ Some-college', 'gender_ Female', 'gender_ Male', 'occupation_ ?', 'occupation_ Adm-clerical', 'occupation_ Armed-Forces', 'occupation_ Craft-repair', 'occupation_ Exec-managerial', 'occupation_ Farming-fishing', 'occupation_ Handlers-cleaners', 'occupation_ Machine-op-inspct', 'occupation_ Other-service', 'occupation_ Priv-house-serv', 'occupation_ Prof-specialty', 'occupation_ Protective-serv', 'occupation_ Sales', 'occupation_ Tech-support', 'occupation_ Transport-moving', 'income_ &lt;=50K', 'income_ &gt;50K']

`data_dummies.head()`

![](images\P165.PNG)

使用values属性将data_dummies数据框(DataFrame)转换为NumPy数组

```python
#提取Numpy数组，所有特征，但不包含目标
features = data_dummies.ix[:,'age':'occupation_ Transport-moving']
X = features.values
y = data_dummies['income_ >50K'].values
print("X.shape:{} y.shape:{}".format(X.shape, y.shape))
```

X.shape:(32561, 44) y.shape:(32561,)

现在数据的表示可以被scikit-learn处理：

```Python
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y ,random_state=0)
logreg = LogisticRegression()
logreg.fit(X_train, y_train)
print("Test score:{:.2f}".format(logreg.score(X_test, y_test)))
```

Test score:0.81

成功！

注意，在这个例子中，我们对同时包含训练数据和测试数据的数据框调用get_dummies这一点很重要，确保训练集和测试集中分类变量的表示方式相同。

pandas的get_dummies函数将所有数字看作是连续的，不会为其创建虚拟变量。可以通过scikit-learn的OneHotEncoder解决这一问题，指定哪些变量是连续的，哪些是离散的。也能将数据框中的数值转换为字符串：

```python
#创建一个DataFrame包含一个整数特征和一个分类字符串特征
demo_df = pd.DataFrame({'Integer Feature':[0,1,2,1],'Categorical Feature':['socks','fox','socks','box']})
display(demo_df)
```

![](images\P167.PNG)

若直接用get_dummies只会编码字符串特征，不会改变整数特征 `pd.get_dummies(demo_df)`

![](images\P167_1.PNG)

如果想为"Integer Feature"这一列创建虚拟变量，可以使用columns显式地给出想要编码的列:

`demo_df['Integer Feature'] = demo_df['Integer Feature'].astype(str)`

或者

`pd.get_dummies(demo_df, columns=['Integer Feature','Categorical Feature'])`

#### 分箱、离散化、线性模型与树

线性模型只能对线性关系建模，决策树可以构建复杂模型但依赖于数据表示。有一种方法可以让线性模型在连续数据上变得更加强大，就是使用**特征分箱**(binning，也叫离散化discretization)将其划分为多个特征。假设将特征的输入范围划分成固定个数的箱子bin，那么数据点就可以用它所在的箱子来表示。

```python
from sklearn.linear_model import LinearRegression
from sklearn.tree import DecisionTreeRegressor
X, y = mglearn.datasets.make_wave(n_samples=100)
line = np.linspace(-3, 3, 1000, endpoint=False).reshape(-1,1)
reg = DecisionTreeRegressor(min_samples_split=3).fit(X, y)
plt.plot(line, reg.predict(line), label="decision tree")
reg = LinearRegression().fit(X, y)
plt.plot(line, reg.predict(line), label="linear regression")
plt.plot(X[:,0], y, 'o', c='k')
plt.ylabel("Regression output")
plt.xlabel("Input feature")
plt.legend(loc="best")
```

![](images\P168.png)

```python
#用linspace函数创建11个元素，从而创建10个箱子，即两个连续边界之间的空间
bins = np.linspace(-3,3,11)
print("bins:{}".format(bins))
```

bins:[-3.  -2.4 -1.8 -1.2 -0.6  0.   0.6  1.2  1.8  2.4  3. ]

接下来记录每个数据点所属的箱子，可以用**np.digitize**函数计算出来:

```python
which_bin = np.digitize(X, bins=bins)
print("\nData points:\n",X[:5])
print("\nBin membership for data points:\n",which_bin[:5])
```

Data points:
 [[-0.75275929]
 [ 2.70428584]
 [ 1.39196365]
 [ 0.59195091]
 [-2.06388816]]

Bin membership for data points:
 [[ 4]
 [10]
 [ 8]
 [ 6]
 [ 2]]

利用preprocessing模块的**OneHotEncoder**将这个离散特征变换为one-hot编码（与get_dummies相同但只适用整数分类变量)

```python
from sklearn.preprocessing import OneHotEncoder
encoder = OneHotEncoder(sparse=False)
encoder.fit(which_bin)
#transform创建one-hot编码
X_binned = encoder.transform(which_bin)
print(X_binned[:5])
```

`print("X_binned.shape:{}".format(X_binned.shape))`

X_binned.shape:(100, 10)，得到10维数据

```python
line_binned = encoder.transform(np.digitize(line, bins=bins))
reg = LinearRegression().fit(X_binned,y)
plt.plot(line, reg.predict(line_binned), label='decision tree binned')
plt.plot(X[:,0],y,'o',c='k')
plt.vlines(bins,-3,3,linewidth=1,alpha=.2)
plt.legend(loc='best')
plt.ylabel("Regression output")
plt.xlabel("Input feature")
```

![](images\P171.png)

线性回归模型和决策树做出完全相同的预测，相比于特征分箱之前，线性模型的灵活性提升，而决策树的灵活性降低了，所以对于特定数据集，如果有充分理由使用线性模型（如数据集很大、维度很高），但有些特征与输出的关系是非线性的，那么可以应用**分箱**来提高建模能力。

#### 交互特征与多项式特征

想要丰富特征表示，特别是对线性模型而言，另一种方法是添加原始数据的**交互特征**和**多项式特征**

上一节通过分箱，线性模型对wave数据集每个 箱子都学到一个常数值，但线性模型不仅能学习偏移还能学习斜率。想在线性模型的分箱数据上添加斜率，一种方法是重新加入原始特征（图中的x轴），这样会得到10+1维数据，此时所有箱子斜率一致，只有加入乘积特征才会出现不同斜率

```python
X_combined = np.hstack([X, X_binned])#此时X_combined.shape是(100,11),所有箱子斜率一致需要改进
#通过添加交互特征或乘积特征，用来表示数据点所在的箱子以及数据点在x轴上的位置,该特征是指示符与原始特征的乘积
X_product = np.hstack([X_binned, X*X_binned])#此时X_product.shape是(100,20)
#线性模型在这种新表示上的结果
reg = LinearRegression().fit(X_product, y)
line_product = np.hstack([line_binned, line*line_binned])
plt.plot(line, reg.predict(line_product), label='linear regression product')
for bin in bins:
    plt.plot([bin,bin],[-3,3],':',c='k')
plt.plot(X[:,0],y,'o',c='k')
plt.ylabel("Regression output")
plt.xlabel("Input feature")
plt.legend(loc="best")
```

![](images\P173.png)

此时每个箱子都有自己的偏移和斜率。使用分箱是拓展连续特征的一种方法，另一种方法是使用原始特征的多项式**ploynomial**。在preprocessing模块的PolynomialFeatures中实现:

```python
from sklearn.preprocessing import PolynomialFeatures
#包含直到x**10的多项式，默认include_bias=True添加恒等于1的常数特征需改成False
poly = PolynomialFeatures(degree=10, include_bias=False)
X_poly = poly.transform(X)
poly.fit(X)
```

可以调用get_feature_names方法来获取特征的语义`print(poly.get_feature_names())`

['x0', 'x0^2', 'x0^3', 'x0^4', 'x0^5', 'x0^6', 'x0^7', 'x0^8', 'x0^9', 'x0^10']

将多项式特征与线性回归模型一起使用，可以得到经典的**多项式回归(polynomial regression)模型**

```python
reg = LinearRegression().fit(X_poly, y)
line_poly = poly.transform(line)
plt.plot(line, reg.predict(line_poly), label='polynomial linear regression')
plt.plot(X[:,0],y,'o',c='k')
plt.ylabel("Regression output")
plt.xlabel("Input feature")
plt.legend(loc="best")
```

![](images\P175.png)

多项式在这个一维数据上得到了非常平滑的拟合，但高次多项式在边界上或者数据很少的区域可能有极端表现。

作为对比，下面是原始数据在核SVM模型上的表现:

```python
from sklearn.svm import SVR
for gamma in [1,10]:
    svr = SVR(gamma=gamma).fit(X, y)
    plt.plot(line, svr.predict(line), label='SVR gamma={}'.format(gamma))
plt.plot(X[:,0],y,'o',c='k')
plt.ylabel("Regression output")
plt.xlabel("Input feature")
plt.legend(loc="best")
```

![](images\P176.png)

使用更加复杂的模型可以学得类似的结果，且不需要进行显式的特征变换。

再次观察波士顿房价，之前已使用过多项式特征，现在来看一下这些特征的构造方式以及多项式特征的帮助效果：

```python
#先加载数据再利用MinMaxScaler缩放到0到1
from sklearn.datasets import load_boston
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler

boston = load_boston()
X_train,X_test,y_train,y_test = train_test_split(boston.data,boston.target,random_state=0)
#缩放数据
scaler = MinMaxScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)
#提取多项式特征和交互特征，次数最高为2
poly = PolynomialFeatures(degree=2).fit(X_train_scaled)
X_train_poly = poly.transform(X_train_scaled)#X_train.shape(379,13), poly.shape(379,105)
x_test_poly = poly.transform(X_test_scaled)#13x12/2+13+13+1,1为常数特征，get_feature_names
```

接下来对比两个数据集在Ridge上的表现

```python
from sklearn.linear_model import Ridge
ridge = Ridge().fit(X_train_scaled, y_train)
print("Score without interactions:{:.3f}".format(ridge.score(X_test_scaled,y_test)))
ridge = Ridge().fit(X_train_poly, y_train)
print("Score with interactions:{:.3f}".format(ridge.score(X_test_poly,y_test)))
```

Score without interactions:0.621
Score with interactions:0.753

<u>可见使用Ridge时交互特征和多项式特征对性能提升很大，但如果使用更复杂的模型（比如随机森林），其本身性能要优于Ridge，添加交互特征可能会降低其性能。</u>

#### 单变量非线性变换

线性模型和神经网络依赖每个特征的尺度和分布，如果特征和目标之间存在非线性关系则建模(特别是回归问题)就很困难。log和exp函数可以帮助调节数据的相对比例，从而改进线性模型或神经网络的学习效果（第二章内存有应用）。在处理周期性问题时，sin和cos函数非常有用。

大部分模型在每个特征大致遵循高斯分布时表现最好，当实际数据与高斯分布相差很远时，非线性变换就很有用：

```python
rnd = np.random.RandomState(0)
X_rog = rnd.normal(size=(1000, 3))
w = rnd.normal(size=3)

X = rnd.poisson(10*np.exp(X_org))
y = np.dot(X_org, w)
```

可视化该数据集

```python
bins = np.bincount(X[:,0])
plt.bar(range(len(bins)), bins)
plt.ylabel("Number of appearances")
plt.xlabel("Value")
```

![](images\P179.png)

X[:, 1]与X[:, 2]具有类似的性质，这种类型的数值分布实践中很常见但大多数线性模型无法很好处理。尝试一些岭回归：

```python
from sklearn.linear_model import Ridge
X_train, X_test, y_train, y_test = train_test_split(X, y , random_state=0)
score = Ridge().fit(X_train, y_train).score(X_test, y_test)
print("Test score:{:.3f}".format(score))
```

Test score:0.622

这时应用对数变换，因为原数据中有0故这里用log(x + 1)

```python
X_train_log = np.log(X_train + 1)
X_test_log = np.log(X_test + 1)
plt.hist(X_train_log[:,0],bins=25,color='gray')
plt.ylabel("Number of appearances")
plt.xlabel("Value")
```

![](images\P180.png)

```python
score = Ridge().fit(X_train_log,y_train).score(X_test_log, y_test)
print("Test score:{:.3f}".format(score))
```

Test score:0.875

为数据集和模型的所有组合寻找最佳变换，嗯，是一种，艺术。通常来说只有一部分特征应该进行变换，变换方式不也一样，尝试预测时使用log(y+1)往往有用。一般来说，对于线性模型或者朴素贝叶斯这些复杂度较低的模型会有帮助，基于树的模型则不需要变换数据。其他比如SVM、最邻近和神经网络有时也会收益。

#### 自动化特征选择

当增大数据维度，使其大于原始特征的数量，可能会让模型过于复杂导致过拟合。在添加新特征或处理高维数据时，最好将特征的数量减少到只包含最有用的那些特征，并删除其余特征。这样会得到泛化性能更好、更简单的模型。判断每个特征作用的策略有三种：**单变量统计**，**基于模型的选择**和**迭代选择**。这些方法都是监督方法，需要目标值来拟合数据，即将数据划分为训练集和测试集，并只在训练集上拟合特征选择。

##### 单变量统计

在单变量统计(univariate statistics)中，我们计算每个特征和目标值之间的关系是否存在统计显著性，然后选择具有最高置信度的特征。对于分类问题，这也被称为**方差分析**(analysis of variance, ANOVA)。这些测试的一个关键性质就是它们是单变量(univariate)的，即只单独考虑每个特征。因此当一个特征只有在和另一个特征合并时才具有信息量时，它就会被舍弃。

首先进行测试，在分类问题中是f_classif，对回归问题是f_regression，然后基于测试中确定的**p值**来选择一种舍弃特征的方法(使用**阈值**来舍弃所有p值过大的特征，它们不可能与目标值相关)。计算阈值的方法最简单的是**SelectKBest**和**SelectPercentile**，前者选择固定数量的k个特征，后者选择固定百分比的特征。

向cancer数据集加入一些没有信息量的噪声特征，测试特征选择能否识别并删除它们:

```python
from sklearn.datasets import load_breast_cancer
from sklearn.feature_selection import SelectPercentile
from sklearn.model_selection import train_test_split
cancer = load_breast_cancer()
#获得确定性的随机数
rng = np.random.RandomState(42)
noise = rng.normal(size=(len(cancer.data),50))
#向数据中添加50个噪声特征
X_w_noise = np.hstack([cancer.data, noise])
X_train, X_test, y_train, y_test = train_test_split(X_w_noise,cancer.target,random_state=0,test_size=.5)
#使用f_classif和Selecpercentile来选择50%的特征
select = SelectPercentile(percentile=50)
select.fit(X_train, y_train)
#对训练集进行变换
X_train_selected = select.transform(X_train)#X_train.shape(284, 80)变换后为(284,40)
```

可以用**get_support**方法来查看哪些特征被选中，它会返回所选特征的布尔遮罩(mask)

```python
mask = select.get_support()
print(mask)
#将遮罩可视化
plt.matshow(mask.reshape(1,-1),cmap='gray_r')
plt.xlabel("Sample index")
```

![](images\P182.PNG)

大多数所选特征为原始特征，但还原并不完美，在Logistic回归上比较选用不同特征时的性能:

```python
from sklearn.linear_model import LogisticRegression
X_test_selected = select.transform(X_test)
lr = LogisticRegression()
lr.fit(X_train, y_train)
print("Score with all features:{:.3f}".format(lr.score(X_test, y_test)))
lr.fit(X_train_selected, y_train)
print("Score with selected features:{:.3f}".format(lr.score(X_test_selected,y_test)))
```

Score with all features:0.930
Score with selected features:0.940

可见，删除噪声特征可以提高性能，即使丢失了某些原始特征。在实践中如果遇到特征量太大以至于无法构建模型，或者怀疑许多特征无信息量，可用到单变量特征选择。

##### 基于模型的特征选择

基于模型的特征选择使用一个监督机器学习模型来判断每个特征的重要性，并且仅保留最重要的特征。特征选择模型需要为每个特征提供某种重要性度量，以便用这个度量对特征进行排序。

**决策树的相关模型**都提供了feature_importances_属性，可以直接编码每个特征的重要性。

**线性模型**系数的绝对值也可以用于表示特征重要性。L1惩罚的线性模型学到的稀疏系数就只用到特征的一个子集，可以视作模型本身的一种特征选择形式或者用作另一个模型选择特征的预处理步骤。

与单变量选择不同，基于模型的选择同时考虑所有特征以获取交互项，这里使用**SelectFromModel**变换器：

```python
from sklearn.feature_selection import SelectFromModel
from sklearn.ensemble import RandomForestClassifier
select = SelectFromModel(RandomForestClassifier(n_estimators=100,random_state=42),threshold="median")
```

SelectFromModel类选出重要性度量大于给定阈值的所有特征，这里为了便于和**单变量特征选择**对比，使用了中位数作为阈值。

```python
select.fit(X_train,y_train)
X_train_l1 = select.transform(X_train)
print("X_train.shape:{}".format(X_train.shape))
print("X_train_l1.shape:{}".format(X_train_l1.shape))
```

X_train.shape:(284, 80)
X_train_l1.shape:(284, 40)

```python
mask = select.get_support()
#将遮罩可视化——黑色为True,白色为False
plt.matshow(mask.reshape(1,-1),cmap='gray_r')
plt.xlabel("Sample index")
```

![](images\P184.PNG)

来看一下性能：

```python
X_test_l1 = select.transform(X_test)
score = LogisticRegression().fit(X_train_l1, y_train).score(X_test_l1, y_test)
print("Test score:{:.3f}".format(score))
```

Test score:0.951

利用更好的特征选择，性能提升更多。

##### 迭代特征选择

构建一系列模型，每个模型都使用不同数量的特征。有两种基本方法：逐个添加特征，直到满足某个终止条件；或者从所有特征开始，然后逐个删除特征，直到满足某个终止条件。

一种特殊方法是递归特征消除(recursive feature elimination,RFE)，它从所有特征开始构建模型，直到仅剩下预设数量的特征。用于选择的模型需要提供某种确定特征重要性的方法：

```python
from sklearn.feature_selection import RFE
select = RFE(RandomForestClassifier(n_estimators=100, random_state=42),n_features_to_select=40)
select.fit(X_train, y_train)
#将选中特征可视化
mask = select.get_support()
plt.matshow(mask.reshape(1,-1),cmap='gray_r')
plt.xlabel("Sample index")
```

这时结果会更好，但由于训练了40次运行时间也更长，接下来测试一下logistic回归模型的精度:

```python
X_train_rfe = select.transform(X_train)
X_test_rfe = select.transform(X_test)
score = LogisticRegression().fit(X_train_rfe,y_train).score(X_test_rfe,y_test)
print("Test score:{:.3f}".format(score))
```

Test score:0.951

还能在RFE内使用模型来进行预测

`print("Test score:{:.3f}".format(select.score(X_test, y_test)))`

只要选择了正确的特征，线性模型的表现就能和随机森林一样好。自动化特征选择有助于减少所需要的特征数量，加快预测速度，或允许可解释性更强的模型。

#### 利用专家知识

对特定应用，可以在特征工程中利用**专家知识**(expert knowledge)，虽然一般情况下我们会避免创建一组专家设计的规则，但这不意味着舍弃该领域的先验知识。我们可以将关于任务属性的先验知识编码到特征中，以辅助机器学习算法。添加一个特征并不会强制机器学习算法使用它，即便特征不包含相关信息，用它来扩充数据也不会有什么害处。

首先来研究一个DataFrame自行车出租数据Citibike:

```python
citibike = mglearn.datasets.load_citibike()
print("Citi Bike data:\n{}".format(citibike.head()))
```

Citi Bike data:
starttime
2015-08-01 00:00:00     3
2015-08-01 03:00:00     0
2015-08-01 06:00:00     9
2015-08-01 09:00:00    41
2015-08-01 12:00:00    39
Freq: 3H, Name: one, dtype: int64

给出整个月租车数量的可视化：

```python
plt.figure(figsize=(10,3))
xticks = pd.date_range(start=citibike.index.min(), end=citibike.index.max(),freq='D')
plt.xticks(xticks, xticks.strftime("%a %m-%d"), rotation=90, ha="left")
plt.plot(citibike, linewidth=1)
plt.xlabel("Date")
plt.ylabel("Rentals")
```

![](images\P187.png)

在对这种时间序列上的预测模型进行评估时，我们通常希望从过去学习并预测未来。这里，我们将使用前184个数据点（前23天）作为训练集，剩余64个数据点（对应8天）作为测试集。在预测任务中，我们使用唯一特征就是某一租车数量对应的日期和时间。

在计算机上存储数据的常用方式是使用POSIX时间，它是1970年1月1日00:00:00（也就是UNIX时间起点)起至现在的总秒数。可以尝试使用这个单一整数特征作为数据表示:

```python
#提取目标值
y = citibike.values
X = citibike.index.astype("int64").values.reshape(-1,1)
#首先定义一个函数，将数据划分为训练集和测试集，构建模型并将结果可视化
n_train = 184
#对给定特征集上的回归进行评估和作图的函数
def eval_on_features(features, target, regressor):
    #将给定特征划分为训练集和测试集
    X_train,X_test = features[:n_train], features[n_train:]
    #同样划分目标数组
    y_train,y_test = target[:n_train], target[n_train:]
    regressor.fit(X_train, y_train)
    print("Test-set R^2:{:.2f}".format(regressor.score(X_test, y_test)))
    y_pred = regressor.predict(X_test)
    y_pred_train = regressor.predict(X_train)
    plt.figure(figure=(10,3))
    plt.xticks(range(0, len(X), 8), xticks.strftime("%a %m-%d"), rotation=90, ha="left")
    plt.plot(range(n_train), y_train, label="train")
    plt.plot(range(n_train, len(y_test)+n_train),y_test,'-',label="test")
    plt.plot(range(n_train), y_pred_train,'--',label="prediction train")
    plt.plot(range(n_train, len(y_test)+n_train),y_pred,'--',label="prediction test")
    plt.legend(loc=(1.01,0))
    plt.xlabel("Date")
    plt.ylabel("Rentals")
```

因为随机森林很少需要预处理，这里应用它来预测。使用POSIX时间特征X，并将随机森林回归传入我们eval_on_features函数:

```python
from sklearn.ensemble import RandomForestRegressor
regressor = RandomForestRegressor(n_estimators=100, random_state=0)
plt.figure()
eval_on_features(X, y, regressor)
```

![](images\P188.png)

Test-set R^2:-0.04

数据在训练集上的预测结果很好，但测试集R方为-0.04说明什么也没学到。测试集中POSIX时间特征的值超出了训练集中特征取值的范围，时间戳要晚于训练集，而树模型无法外推，只能预测最后一个数据。

这时引入专家知识，加入因素：一天内的时间与一周的星期几。首先仅使用每天的时刻：

```python
X_hour = citibike.index.hour.values.reshape(-1,1)
eval_on_features(X_hour, y , regressor)
```

Test-set R^2:0.60

![](images\P189.png)

R方已经好了很多，但并没有抓住每周的模式:

```python
X_hour_week = np.hstack([citibike.index.dayofweek.values.reshape(-1,1),citibike.index.hour.values.reshape(-1,1)])
eval_on_features(X_hour_week, y, regressor)
```

Test-set R^2:0.84

![](images\P190.png)

预测结果相当好，接下来我们尝试用更简单的模型LinearRegression

```python
from sklearn.linear_model import LinearRegression
eval_on_features(X_hour_week, y, LinearRegression())
```

Test-set R^2:0.13

效果差得多，其原因在于我们用整数编码一周的星期几和一天内的时间，它们被解释为**连续变量**。而**线性模型**只能学到关于每天时间的线性函数：时间越晚租车越多。可以通过将整数解释为**分类变量**(用**OneHotEncoder**进行变换)来获取这种模式：

```python
enc = OneHotEncoder()
X_hour_week_onehot = enc.fit_transform(X_hour_week).toarray()
eval_on_features(X_hour_week_onehot, y, Ridge())
```

Test-set R^2:0.62

![](images\P191.png)

利用交互特征(多项式），可以让线性模型为星期几和时刻的每一种组合都学到一个系数:

```python
poly_transformer = PolynomialFeatures(degree=2,interaction_only=True,include_bias=False)
X_hour_week_onehot_poly = poly_transformer.fit_transform(X_hour_week_onehot)
lr = Ridge()
eval_on_features(X_hour_week_onehot_poly, y, lr)
```

Test-set R^2:0.85

![](images\P1917.png)

线性模型最终得到一个性能与随机森林类似的模型，并且可以对模型学到的系数作图:

```python
hour = ["%02d:00" % i for i in range(0, 24, 3)]
day = ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]
features = day + hour
#利用get_feature_names方法对PolynomialFeatures提取所有交互特征进行命名，并保留系数不为0的
features_poly = poly_transformer.get_feature_names(features)
features_nonzero = np.array(features_poly)[lr.coef_ != 0]
coef_nonzero = lr.coef_[lr.coef_ != 0]
#下面将线性模型学到的系数可视化
plt.figure(figsize=(15,2))
plt.plot(coef_nonzero,'o')
plt.xticks(np.arange(len(coef_nonzero)), features_nonzero,rotation=90)
plt.xlabel("Feature name")
plt.ylabel("Feature magnitude")
```

![](images\P192.png)

可见使用适合机器学习算法的数据表示方式的重要性，例如one-hot编码过的分类变量。通过特征工程生成新特征以及利用专家知识创建特征都很有用。在线性模型中，分箱、添加多项式和交互项从而生成新特征。对更加复杂的非线性模型，比如随机森林或SVM，则**无需显式拓展特征空间**。实践中特征与方法之间的匹配通常是良好表现的前提。



## 模型评估与改进

到目前为止，为评估我们的监督模型，我们使用train_test_split函数将数据集划分为训练集和测试集，在训练集上调用fit方法来构建模型，并在测试集上用score方法来评估。

本章将从两个方面进行模型评估，先是**交叉验证**，一种更可靠的评估泛化性能的方法；然后再讨论评估分类和回归性能的方法。

为获得最佳泛化性能，本章还会讨论**网格搜索**，这是一种调节监督模型参数的有效方法。

#### 交叉验证

交叉验证(cross-validation)是一种评估泛化性能的统计学方法，它比单次划分训练集和测试集的方法更加稳定全面。在交叉验证中，数据被多次划分，并且需要训练多个模型。最常用的交叉验证是k折交叉验证(k-fold)，其中k由用户指定，通常取5或10。

在进行5折交叉验证时，首先将数据划分为(大致)相等的5部分，每一部分叫做折(fold)。依次取一折作测试集，其他折为训练集，最终得到5个精度值。

scikit-learn是利用model_selection模块中的cross_val_score函数来实现交叉验证的，其参数是需要评估的模型、训练数据与真实标签，在iris数据集上对LogisticRegression进行评估:

```python
from sklearn.model_selection import cross_val_score
from sklearn.datasets import load_iris
from sklearn.linear_model import LogisticRegression
iris = load_iris()
logreg = LogisticRegression()
scores = cross_val_score(logreg, iris.data, iris.target)
print("Cross-validation:{}".format(scores))
```

Cross-validation:[0.96078431 0.92156863 0.95833333]

默认情况下将返回三个精度值，可以通过**修改cv参数**（交叉验证分离器: 验证方法的重要参数）来改变折数:

```python
scores = cross_val_score(logreg, iris.data, iris.target, cv=5)
print("Cross-validation scores:{}".format(scores))
```

Cross-validation scores:[1.         0.96666667 0.93333333 0.9        1.        ]

总结交叉验证精度的一种常用方法是计算平均值:

`print("Average cross-validation score:{:.2f}".format(scores.mean()))`

Average cross-validation score:0.96

预计模型的平均精度为96%，其中折与折的精度有较大变化，意味模型的训练依赖于某个折或者数据集的数据量太小。

**交叉验证的优点**：单次划分容易造成训练集测试集不均匀，而交叉验证每个样例都刚好在测试集中出现一次，其得分更能代表模型的泛化能力。对数据进行多次划分，还能提供模型对训练集选择的敏感性信息，即模型在应用于新数据时最坏情况和最好情况下的可能表现。

与单次划分相比，交叉验证的另一个优点是对数据的使用更加高效。在使用train_test_split时我们通常将75%的数据用于训练25%的数据用于评估，而5折10折交叉验证则分别用了80%和90%的数据来拟合模型，更多的数据通常可以得到更为精确的模型。

**缺点**：增加了计算成本，训练k个模型的时间是单个模型的1/k。在调用cross_val_score时内部会构建多个模型，但目的只是评估在特定数据集上训练后的泛化性能好坏。

除了上述缺点，k折交叉验证在有些**分类问题**的数据集上会**失效**，来看一下iris数据集:

```python
from sklearn.datasets import load_iris
iris = load_iris()
print("Iris labels:\n{}".format(iris.target))
```

Iris labels:
[0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0
0 0 0 0 0 0 0 0 0 0 0 0 0 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1
1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 2 2 2 2 2 2 2 2 2 2 2
2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2 2
2 2]

此时划分数据后训练集与测试集类别将不相同，需使用**分层k折交叉验证**(StratifiedKFold)，使每个折中类别之间的比例与整个数据集中的比例相同。或者将**数据打乱**，这里需要从model_selection模块中导入KFold分离器类：

```python
from sklearn.model_selection import KFold
kfold = KFold(n_splits=3, shuffle=True, random_state=0)#
print("Cross-validation scores:\n{}".format(cross_val_score(logreg,iris.data,iris.target,cv=kfold)))
```

Cross-validation scores:
[0.9  0.96 0.96]

另一种常用的交叉验证方法是**留一法**(leave-one-out)，即每次选取一个样本作为测试集再取均值，可以看作单个样本的k折交叉验证。这种方法可能非常耗时，但在小数据集上的估计结果很好:

```python
from sklearn.model_selection import LeaveOneOut
loo = LeaveOneOut()
scores = cross_val_score(logreg,iris.data,iris.target,cv=loo)
print("Number of cv iterations:",len(scores))
print("Mean accuracy:{:.2f}".format(scores.mean()))
```

Number of cv iterations: 150
Mean accuracy:0.95

还有**打乱划分交叉验证**，每次划分为训练集取样train_size个点，为测试集取样test_size个点，将这一划分方法重复n_iter次，实现在训练集和测试集大小之外独立控制迭代次数。下面代码将数据集划分为50%训练集和50%测试集，共10次迭代:

```python
from sklearn.model_selection import ShuffleSplit
shuffle_split = ShuffleSplit(test_size=.5,train_size=.5,n_splits=10)
scores = cross_val_score(logreg, iris.data, iris.target, cv=shuffle_split)
print("Cross-validation scores:\n{}".format(scores))
```

Cross-validation scores:
[0.88       0.94666667 0.97333333 0.92       0.94666667 0.90666667
0.90666667 0.94666667 0.86666667 0.96      ]

**分组交叉验证**，将数据集中的数据分组打包（比如一个人的多张脸），使用GroupKFold以groups数组作为参数用来说明照片对应的是哪个人。

```python
from sklearn.model_selection import GroupKFold
#创建模拟数据集
X, y = make_blobs(n_samples=12, random_state=0)
#前三个，中间四个，最后三个一组
groups = [0,0,0,1,1,1,1,2,2,3,3,3]
scores = cross_val_score(logreg, X, y, groups, cv=GroupKFold(n_splits=3))
print("Cross-validation scores:\n{}".format(scores))
```

Cross-validation scores:
[0.75       0.8        0.66666667]

总之，最常用的就是**KFold**, **StratifiedKFold**和**GroupKFold**.

#### 网格搜索

在尝试调参之前，重要的是要理解参数的含义。网格搜索(grid search)就是尝试关心参数的所有可能组合。

考虑一个具有RBF核的核SVM例子，它有两个重要参数:核宽度gamma和正则化参数C，假设我们希望尝试C的取值为0.001、0.01、0.1、1、10和100，gamma也取这6个值。由于我想尝试的C和gamma都有6个不同的取值，共36种参数组合。

我们可以实现一个简单的网格搜索，在2个参数上使用for循环，对每种参数组合分别训练并评估一个分类器：

```python
#简单的网络搜索
from sklearn.svm import SVC
X_train,X_test,y_train,y_test = train_test_split(iris.data,iris.target,random_state=0)
print("Size of training set:{} size of test set:{}".format(X_train.shape[0],X_test.shape[0]))
best_score=0
lista=[0.001,0.01,0.1,1,10,100]
for gamma in lista:
    for C in lista:
        svm = SVC(gamma=gamma, C=C)
        svm.fit(X_train, y_train)
        score = svm.score(X_test,y_test)
        if score > best_score:
            best_score=score
            best_parameters = {'C':C,'gamma':gamma}
print("Best score:{:.2f}".format(best_score))
print("Best parameters:{}".format(best_parameters))
```

Size of training set:112 size of test set:38
Best score:0.97
Best parameters:{'C': 100, 'gamma': 0.001}

这里尝试了许多不同的参数，并选择了在测试集上精度最高的，但这个精度不一定能推广到新数据上——由于我们使用测试数据进行调参了，所以不能再用它来评估模型的好坏。我们需要一个创建模型时没有用到的独立数据集。

为解决这个问题，一种方法是再次划分数据成3个数据集:用于构建模型的训练集、用于选择模型参数的验证集(开发集)、用于评估所选参数性能的测试集：

```python
from sklearn.svm import SVC
#将数据划分为训练验证集与测试集
X_trainval, X_test, y_trainval, y_test = train_test_split(iris.data, iris.target, random_state=0)
X_train, X_valid, y_train, y_valid = train_test_split(X_trainval, y_trainval, random_state=1)
print("Size of training set:{} size of validation set:{} size of test set:{}".format(X_train.shape[0],X_valid.shape[0],X_test.shape[0]))
best_score = 0
lista=[0.001,0.01,0.1,1,10,100]
for gamma in lista:
    for C in lista:
        svm = SVC(gamma=gamma, C=C)
        svm.fit(X_train, y_train)
        score = svm.score(X_valid,y_valid)
        if score > best_score:
            best_score=score
            best_parameters = {'C':C,'gamma':gamma}
#在训练+验证集上重新构建一个模型并在测试集上评估
svm =SVC(**best_parameters)
svm.fit(X_trainval, y_trainval)
test_score = svm.score(X_test, y_test)
print("Best score:{:.3f}".format(best_score))
print("Best parameters:{}".format(best_parameters))
print("Test set score with best parameters:{:.3f}".format(test_score))
```

Size of training set:84 size of validation set:28 size of test set:38
Best score:0.964
Best parameters:{'C': 10, 'gamma': 0.001}
Test set score with best parameters:0.921

此时只能声称对92%的数据正确分类，因为我们使用了更少的数据来训练模型。

训练集、验证集和测试集之间的区别对于在实践中应用机器学习方法至关重要任何根据测试集精度所做的选择都会将测试集的信息“泄露”(leak)到模型中。因此，保留一个单独的测试集很重要，它仅用于最终评估。

好的做法是利用训练集和验证集的组合完成所有探索性分析与模型选择，并保留测试集用于最终评估。严格来说，在测试集上对不止一个模型进行评估并选择更好的那个，将会导致对模型精度过于乐观的估计。

#### 评估指标与评分

目前为止，我们使用精度(正确分类样本所占比例)来评估分类性能，使用R^2来评估回归性能。

对回归问题，大部分情况下使用R^2就足够了，它由回归器的score方法给出，是评估回归模型最直观的指标。

对分类问题，精度指标可能不适用，接下来介绍一些其他指标。

##### 二分类指标

正类(positive class)是我们要寻找的类，另一个就是反类(negative class)。

**错误类型**：在cancer数据集中，错误的阳例预测叫做假正例(false positive)，需要接受进一步检查，而假反例(false negative)却有可能致命。在统计学中称假正例为第一类错误(type I error)，假反例为第二类错误(type II error)。这类例子中我们将尽量避免假反例，而假正例的影响则不是很大。

在现实情况中的两个类别，经常会一个类别比另一个类别出现次数多很多的数据集，这通常叫作**不平衡数据集**(imbalanced dataset)。在这样的情况下，随意预测的精度都很高，但这时精度无法帮助我们区别出更优秀的模型。为了便于说明，我们将digits数据集中的数字9与其他九个类别加以区分创建一个9：1的不平衡数据集：

```python
from sklearn.datasets import load_digits
digits = load_digits()
y = digits.target == 9
X_train, X_test, y_train, y_test = train_test_split(digits.data, y, random_state=0)
```

使用DummyClassifier来始终预测多数类(这里是非9)，以查看精度提供的信息量有多少:

```python
from sklearn.dummy import DummyClassifier
dummy_majority = DummyClassifier(strategy='most_frequent').fit(X_train, y_train)
pred_most_frequent = dummy_majority.predict(X_test)
print("Unique predicted labels:{}".format(np.unique(pred_most_frequent)))
print("Test score:{:.2f}".format(dummy_majority.score(X_test, y_test)))
```

Unique predicted labels:[False]
Test score:0.90

我们得到了90%的精度却没有学到任何东西，以下是一个真实的分类器:

```python
from sklearn.tree import DecisionTreeClassifier
tree = DecisionTreeClassifier(max_depth=2).fit(X_train, y_train)
pred_tree = tree.predict(X_test)
print("Test score:{:.2f}".format(tree.score(X_test, y_test)))
```

Test score:0.92

```python
from sklearn.linear_model import LogisticRegression
dummy = DummyClassifier().fit(X_train, y_train)
pred_dummy = dummy.predict(X_test)
print("dummy score:{:.2f}".format(dummy.score(X_test, y_test)))
logreg = LogisticRegression(C=0.1).fit(X_train, y_train)
pred_logreg = logreg.predict(X_test)
print("logreg score:{:.2f}".format(logreg.score(X_test, y_test)))
```

dummy score:0.80
logreg score:0.98

可见对不平衡数据的预测精度进行量化，精度并不是一种合适的度量。一个好的指标应该给出模型比"最常见"预测(由pred_most_frequent给出)或者随机预测(由pred_dummy给出)要好多少。

对二分类问题的评估结果，一种最全面的表示方式是使用**混淆矩阵**(confusion matrix)，我们利用confusion_matrix函数来检查上一节中LogisticRegression的预测结果，之前已将结果保存在pred_logreg中:

```python
from sklearn.metrics import confusion_matrix
confusion = confusion_matrix(y_test, pred_logreg)
print("Confusion:\n{}".format(confusion))
```

Confusion:   
[[401   2]      [[TN, FP]
[  8  39]]         [FN, TP]]

主对角线上的元素对应正确的分类，左上为TN（反类中被预测为反类的）右上的FP（反类中被预测为正类的），左下为FN（正类中被预测为反类的），右下为TP（正类中被预测为正类的)

```python
print("Most frequent class:")
print(confusion_matrix(y_test, pred_most_frequent))
print("\nDummy model:")
print(confusion_matrix(y_test, pred_dummy))
print("\nDecision tree:")
print(confusion_matrix(y_test, pred_tree))
print("\nLogistic Regression")
print(confusion_matrix(y_test, pred_logreg))
```

Most frequent class:
[[403   0]
 [ 47   0]]

Dummy model:
[[361  42]
 [ 41   6]]

Decision tree:
[[390  13]
 [ 24  23]]

Logistic Regression
[[401   2]
 [  8  39]]

可以很明显看出pred_most_frequent有问题，因为它总是预测同一个类别。pred_dummy的真正例很少，假正例的数量比正正例还多，只有决策树与逻辑回归给出的预测是好的。

精度，正确预测分类的数量占所有样本的比例：Accuracy=(TP+TN)/(TP+TN+FP+FN)

准确率，被预测为正例的样本中真正例的比例：Precision=TP/(TP+FP)

召回率，正类样本中有多少被预测为正类：Recall=TP/(TP+FN)

优化就是在召回率和准确率之间折中。将两者度量进行汇总的方法是**f分数**，即两者的调和平均：

F=2(precision*recall)/(precision+recall)

```python
#假定9为正类,求各模型f1_score
from sklearn.metrics import f1_score
print("f1 score most frequent:{:.2f}".format(f1_score(y_test, pred_most_frequent)))
print("f1 score dummy:{:.2f}".format(f1_score(y_test, pred_dummy)))
print("f1 score tree:{:.2f}".format(f1_score(y_test, pred_tree)))
print("f1 score logistic regression:{:.2f}".format(f1_score(y_test, pred_logreg)))
```

f1 score most frequent:0.00
f1 score dummy:0.19
f1 score tree:0.55
f1 score logistic regression:0.89

f1_score比精度更符合我们对好模型的直觉，不过解释性略差。通过**classification_report**把这些指标打印出来：

```python
from sklearn.metrics import classification_report
print(classification_report(y_test, pred_most_frequent,target_names=["not nine","nine"]))
```

​              precision    recall  f1-score   support
not nine      0.90      1.00      0.94       403
nine             0.00      0.00      0.00        47
avg / total   0.80      0.90      0.85       450

classification_report函数以每个类别生成一行，并给出以该类别为正类的准确率、召回率和f分数。最后一行是对应指数的加权平均（按样本个数）

`print(classification_report(y_test, pred_dummy, target_names=["not nine","nine"]))`

​              precision    recall    f1-score   support
not nine       0.90      0.93      0.91       403
nine              0.12      0.09      0.10        47
avg / total    0.82      0.84      0.83       450

`print(classification_report(y_test, pred_logreg, target_names=["not nine","nine"]))`

​               precision    recall  f1-score   support
not nine       0.98      1.00      0.99       403
nine              0.95      0.83      0.89        47
avg / total    0.98      0.98      0.98       450

大多数分类器都提供一个decision_function或predict_proba方法来评估预测的不确定度。预测可以被看作是以某个固定点作为decision_function或predict_proba输出的阈值——在二分类问题中，使用0作为决策函数的阈值，0.5作为predict_proba的阈值。

下面是一个不平衡二分类任务，反例400个正例50个，在这个数据集上训练一个核SVM模型:

```python
from mglearn.datasets import make_blobs
X, y = make_blobs(n_samples=(400, 50), centers=2, cluster_std=[7.0, 2],random_state=22)
X_train, X_test, y_train, y_test = train_test_split(X, y, random_state=0)
svc = SVC(gamma=.05).fit(X_train, y_train)
#使用classification_report函数来评估两个类别的准确率和召回率
print(classification_report(y_test, svc.predict(X_test)))
```

​               precision    recall  f1-score   support
0                      0.97      0.89      0.93       104
1                      0.35      0.67      0.46         9
avg / total      0.92      0.88      0.89       113

对于类别1我们得到的准确率特别低，召回率也不高。假如在应用中，类别1具有高召回率更重要，svc.predict生成的预测无法满足这个要求，但我们可以通过改变预测阈值不为0来将预测重点放在类别1的召回率上。默认情况下，decision_function值大于0的点将被划为类别1，我们可以减小阈值：

```python
y_pred_lower_threshold = svc.decision_function(X_test) > -.8
print(classification_report(y_test, y_pred_lower_threshold))
```

​            precision    recall  f1-score   support
0                  1.00      0.82      0.90       104
1                  0.32      1.00      0.49         9
avg / total  0.95      0.83      0.87       113

此时评估值中类别1的召回率提升到最高，也就是当数据不平衡时，改变阈值是得到更好结果的最简单方法。由于decision_function的取值可能在任意范围，所以很难提供关于如何选取阈值的经验法则。（注意不要在测试集上设置决策阈值，可以使用验证集或交叉验证替代）

对于实现predict_proba方法的模型来说，选择阈值可能更简单，因为predict_proba的输出固定在0到1之间，表示的是概率，默认阈值为0.5。虽然使用概率比任意阈值更直观，但不是所有模型都有predict_proba(比如最大深度的树模型，这与校准的概念有关calibration)

改变模型中用于做出分类决策的阈值，是一种调节给定分类器的准确率和召回率之间折中的方法。总是可以设置一个阈值来满足特定的召回率（或准确率），难点在于在满足这个阈值的同时仍具有合理的准确率（或召回率）。

对分类器设置要求通常被称为设置的工作点，固定工作点有助于为他人提供性能保证。在开发新模型时，并不清楚工作点在哪里，通常做法是同时查看所有可能的阈值或准确率和召回率的所有可能折中。利用P-R曲线(准确率-召回率)可以实现这一点，可以在**sklearn.metrics**模块中调用，这个函数需要真实标签与预测的不确定度，后者由decision_function或predict_proba给出:

```python
from sklearn.metrics import precision_recall_curve
precision, recall, thresholds = precision_recall_curve(y_test, svc.decision_function(X_test))
```

**precision_recall_curve**函数返回一个列表，包含按顺序排序的所有可能阈值（在决策函数中出现的所有值）对应的准确率和召回率，这样就能绘制P-R曲线:

```python
#使用更多数据点来得到更加平滑的曲线
X, y = make_blobs(n_samples=(4000, 500), centers=2, cluster_std=[7.0,2],random_state=22)
X_train,X_test,y_train,y_test = train_test_split(X, y, random_state=0)
svc = SVC(gamma=.05).fit(X_train, y_train)
precision, recall, thresholds = precision_recall_curve(y_test, svc.decision_function(X_test))
#找到最接近于0的阈值
close_zero = np.argmin(np.abs(thresholds))
plt.plot(precision[close_zero], recall[close_zero], 'o',markersize=10,label="threshold zero",fillstyle="none",c='k',mew=2)
plt.plot(precision, recall, label="precision recall curve")
plt.xlabel("Precision")
plt.ylabel("Recall")
```

![](images\P224.png)

曲线越靠近右上角，则分类器越好。下面来对比SVM和随机森林，注意RandomForestClassifier没有decision_function，只有predict_proba:

```python
from sklearn.ensemble import RandomForestClassifier
rf = RandomForestClassifier(n_estimators=100, random_state=0, max_features=2)
rf.fit(X_train, y_train)
precision_rf, recall_rf, thresholds_rf = precision_recall_curve(y_test,rf.predict_proba(X_test)[:,1])
plt.plot(precision, recall, label='svc')
plt.plot(precision[close_zero],recall[close_zero],'o',markersize=10,label="threshold zero svc",fillstyle="none",c='k',mew=2)
plt.plot(precision_rf, recall_rf, label="rf")
close_default_rf = np.argmin(np.abs(thresholds_rf - 0.5))
plt.plot(precision_rf[close_default_rf], recall_rf[close_default_rf],'^',c='k',markersize=10,label="threshold 0.5 rf",fillstyle="none",mew=2)
plt.xlabel("Precision")
plt.ylabel("Recall")
plt.legend(loc="best")
```

![](images\P225.png)

可见随机森林在极值处表现更好，中间位置SVM表现更好，f分数只能反映P-R曲线在默认阈值处的性能。

```python
print("f1_score of random forest:{:.3f}".format(f1_score(y_test, rf.predict(X_test))))
print("f1_score of svc:{:.3f}".format(f1_score(y_test, svc.predict(X_test))))
```

f1_score of random forest:0.610
f1_score of svc:0.656

总结P-R曲线的一种方法是计算曲线下的积分或面积，也叫作平均准确率(average precision)，可以用average_precision_score函数来计算平均准确率，将average_precision_score传入decision_function或predict_proba的结果:

```python
from sklearn.metrics import average_precision_score
ap_rf = average_precision_score(y_test, rf.predict_proba(X_test)[:,1])
ap_svc = average_precision_score(y_test, svc.decision_function(X_test))
print("Average precision of random forest:{:.3f}".format(ap_rf))
print("Average precision of svc:{:.3f}".format(ap_svc))
```

Average precision of random forest:0.660
Average precision of svc:0.666

还有一种常用的工具可以分析不同阈值的分类器行为：受试者工作特征曲线，简称**ROC曲线**，真正例其实就是召回率，假正例率是假正例占所有反类样本的比例：FPR=FP/(FP+TN)，可以用roc_curve函数计算ROC曲线:

```python
from sklearn.metrics import roc_curve
fpr, tpr, thresholds = roc_curve(y_test, svc.decision_function(X_test))
plt.plot(fpr, tpr, label="ROC Curve")
plt.xlabel("FPR")
plt.ylabel("TPR(recall)")
#找到最接近于0的阈值
close_zero = np.argmin(np.abs(thresholds))
plt.plot(fpr[close_zero],tpr[close_zero],'o',markersize=10,label="threshold zero",fillstyle="none",c='k',mew=2)
plt.legend(loc=4)
```

![](images\P227.png)

理想的ROC曲线要靠近左上角：在召回率很高的同时假正例率很低。图中存在与默认阈值0相比召回率更高而FPR仅稍有增加的点。下面对比随机森林与SVM的ROC曲线:

```python
from sklearn.metrics import roc_curve
fpr_rf, tpr_rf, thresholds_rf = roc_curve(y_test, rf.predict_proba(X_test)[:,1])
plt.plot(fpr, tpr, label="ROC Curve SVC")
plt.plot(fpr_rf, tpr_rf, label="ROC Curve RF")
plt.xlabel("FPR")
plt.ylabel("TPR(recall)")
plt.plot(fpr[close_zero],tpr[close_zero],'o',markersize=10,label="threshold zero SVC",fillstyle="none",c='k',mew=2)
close_default_rf = np.argmin(np.abs(thresholds_rf - 0.5))
plt.plot(fpr_rf[close_default_rf], tpr[close_default_rf],'^',markersize=10,label="threshold 0.5 RF",fillstyle="none",c='k',mew=2)
plt.legend(loc=4)
```

![](images\P228.png)

曲线下的面积被称为AUC，可以利用roc_auc_score函数计算ROC曲线下的面积:

```python
from sklearn.metrics import roc_auc_score
rf_auc = roc_auc_score(y_test, rf.predict_proba(X_test)[:,1])
svc_auc = roc_auc_score(y_test, svc.decision_function(X_test))
print("AUC for Random Forest:{:.3f}".format(rf_auc))
print("AUC for SVC:{:.3f}".format(svc_auc))
```

AUC for Random Forest:0.937
AUC for SVC:0.916

这里发现随机森林的表现比SVM要略好一些。对于不平衡分类问题来说，AUC是一个比精度好得多的指标。AUC可以被解释为评估正例样本的排名最高得分为1，说明所有正类点的分数高于所有反类点。

还是将digits数据集中的所有9与其他数据加以区分，使用SVM对数据集分类，分别使用三种不同的内核宽度gamma设置:

```python
y = digits.target == 9
X_train, X_test, y_train, y_test = train_test_split(digits.data, y, random_state=0)
plt.figure()
for gamma in[1, 0.1, 0.01]:
    svc = SVC(gamma=gamma).fit(X_train, y_train)
    accuracy=svc.score(X_test, y_test)
    auc = roc_auc_score(y_test, svc.decision_function(X_test))
    fpr, tpr, _ = roc_curve(y_test, svc.decision_function(X_test))
    print("gamma={:.2f} accuracy = {:.2f} AUC = {:.2f}".format(gamma, accuracy, auc))
    plt.plot(fpr, tpr, label="gamma={:.3f}".format(gamma))
plt.xlabel("FPR")
plt.ylabel("TPR")
plt.xlim(-0.01, 1)
plt.ylim(0, 1.02)
plt.legend(loc="best")
```

![](images\P229.png)

当gamma为0.01时，我们得到等于1的完美AUC，即所有正类点排名要高于所有反类点。利用正确的阈值，可以实现对所有数据的完美分类。在不平衡数据上的评估模型使用AUC没有使用默认阈值，为了从高AUC的模型中得到有用分类结果，还需要调节决策阈值。

##### 多分类指标

digits数据集中10种不同的手写数字进行分类:

```python
from sklearn.metrics import accuracy_score
X_train,X_test,y_train,y_test = train_test_split(digits.data, digits.target, random_state=0)
lr = LogisticRegression().fit(X_train, y_train)
pred = lr.predict(X_test)
print("Accuracy:{:.3f}".format(accuracy_score(y_test, pred)))
print("Confusion matrix:\n{}".format(confusion_matrix(y_test, pred)))
```

Accuracy:0.953
Confusion matrix:
[[37  0  0  0  0  0  0  0  0  0]
 [ 0 39  0  0  0  0  2  0  2  0]
 [ 0  0 41  3  0  0  0  0  0  0]
 [ 0  0  1 43  0  0  0  0  0  1]
 [ 0  0  0  0 38  0  0  0  0  0]
 [ 0  1  0  0  0 47  0  0  0  0]
 [ 0  0  0  0  0  0 52  0  0  0]
 [ 0  1  0  1  1  0  0 45  0  0]
 [ 0  3  1  0  0  0  0  0 43  1]
 [ 0  0  0  1  0  1  0  0  1 44]]

混淆矩阵每一行对应真实标签，每一列对应预测标签，下面给出更可观的图像：

```python
score_image = mglearn.tools.heatmap(confusion_matrix(y_test, pred), xlabel='Predicted label', ylabel='True label',xticklabels=digits.target_names,yticklabels=digits.target_names,cmap=plt.cm.gray_r,fmt="%d")
plt.title("Confusion matrix")
plt.gca().invert_yaxis()
```

![](images\P231.png)

利用classification_report函数，可以计算每个类别准确率、召回率和f分数:

`print(classification_report(y_test, pred))`

precision    recall  f1-score   support
0       1.00      1.00      1.00        37
1       0.89      0.91      0.90        43
2       0.95      0.93      0.94        44
3       0.90      0.96      0.92        45
4       0.97      1.00      0.99        38
5       0.98      0.98      0.98        48
6       0.96      1.00      0.98        52
7       1.00      0.94      0.97        48
8       0.93      0.90      0.91        48
9       0.96      0.94      0.95        47
avg / total       0.95      0.95      0.95       450

对于多分类问题中的不平衡数据集，最常用的指标就是多分类版本的f分数，该类别为正类其他类别组成反类。整体来看，如果对每个样本等同看待，推荐使用“微”平均f分数；如果对每个类别等同看待，则使用“宏”平均f分数：

```python
print("Micro average f1 score:{:.3f}".format(f1_score(y_test, pred,average="micro")))
print("Macro average f1 score:{:.3f}".format(f1_score(y_test, pred,average="macro")))
```

Micro average f1 score:0.953
Macro average f1 score:0.954

##### 模型选择中使用评估指标

可以通过scikit-learn中的scoring参数用于GridSearchCV或cross_val_score模型选择。比如想用AUC分数对digits数据集中9与其他上的SVM分类器进行评估，想将分数从默认默认值（精度）改成AUC，可以提供"roc_auc"作为scoring参数的值：

```python
#分类问题的默认评分是精度
print("Default scoring:{}".format(cross_val_score(SVC(),digits.data,digits.target == 9)))
roc_auc = cross_val_score(SVC(),digits.data,digits.target==9,scoring="roc_auc")
print("AUC scoring:{}".format(roc_auc))
```

Default scoring:[0.89983306 0.89983306 0.89983306]
AUC scoring:[0.99372294 0.98957947 0.99594929]

类似地，我们可以改变GridSearchCV中用于选择最佳参数的指标：

```python
from sklearn.model_selection import GridSearchCV
X_train, X_test, y_train, y_test = train_test_split(digits.data, digits.target==9,random_state=0)
#我们给出不太好的网格以说明
param_grid={'gamma':[0.0001,0.01,0.1,1,10]}
#使用默认的精度:
grid = GridSearchCV(SVC(), param_grid=param_grid)
grid.fit(X_train, y_train)
print("Grid-Search with accuracy")
print("Best parameters:",grid.best_params_)
print("Best cross-validation score(accuracy):{:.3f}".format(grid.best_score_))
print("Test set AUC:{:.3f}".format(roc_auc_score(y_test, grid.decision_function(X_test))))
print("Test set accuracy:{:.3f}".format(grid.score(X_test, y_test)))
```

Grid-Search with accuracy
Best parameters: {'gamma': 0.0001}
Best cross-validation score(accuracy):0.970
Test set AUC:0.992
Test set accuracy:0.973

```python
#使用AUC评分来代替
grid = GridSearchCV(SVC(), param_grid=param_grid,scoring="roc_auc")
grid.fit(X_train, y_train)
print("Grid-Search with AUC")
print("Best parameters:",grid.best_params_)
print("Best cross-validation score(accuracy):{:.3f}".format(grid.best_score_))
print("Test set AUC:{:.3f}".format(roc_auc_score(y_test, grid.decision_function(X_test))))
print("Test set accuracy:{:.3f}".format(grid.score(X_test, y_test)))
```

Grid-Search with AUC
Best parameters: {'gamma': 0.01}
Best cross-validation score(accuracy):0.997
Test set AUC:1.000
Test set accuracy:1.000

使用精度时选择的参数是gamma=0.0001，而使用AUC时选择的参数是gamma=0.01，对应更高的AUC，甚至对应的精度也更高。

对于分类问题，scoring参数最重要的取值包括：accuracy, roc_auc, average_precision(P-R曲线下方的面积), f1, f1_macro, f1_micro和f1_weighted。对于回归问题是r2, mean_squared, mean_absolute_error，也可以通过查看metrics.scorer模块中定义的SCORER字典。



## 算法链与管道

大多数机器学习应用不仅需要应用单个算法，而且还需要将许多不同的处理步骤和机器学习模型链接在一起。这章将介绍使用Pipeline类来简化构建变换和模型链的过程。重点介绍如何将Pipeline和GridSearchCV结合起来，从而同时搜索所有处理步骤中的参数。

使用MinMaxScaler进行预处理来提高核SVM在cancer数据集上的性能：

```python
from sklearn.svm import SVC
from sklearn.datasets import load_breast_cancer
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import MinMaxScaler
#加载并划分数据
cancer = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=0)
#计算训练数据的最小值和最大值
scaler = MinMaxScaler().fit(X_train)
#对训练数据进行缩放
X_train_scaled = scaler.transform(X_train)
svm = SVC()
#在缩放后的训练数据上学习SVM
svm.fit(X_train_scaled, y_train)
#对测试数据进行缩放，并计算缩放后的数据的分数
X_test_scaled = scaler.transform(X_test)
print("Test score:{:.2f}".format(svm.score(X_test_scaled, y_test)))
```

Test score:0.95

利用GridSearchCV找到更好的SVC参数时，我们使用了训练集中的所有数据来找到训练的方法，使用缩放后的训练数据来运行带交叉检验的网格搜索，对于模型来说这些数据与测试集中的新数据截然不同，这将导致在交叉验证过程中得到过于乐观的结果。为解决这个问题，应该在进行任何预处理之前完成数据集的划分，任何交叉验证都位于处理过程的"最外层循环"。

在scikit-learn中，要想使用cross_val_score函数和GridSearchCV函数实现这一点，可以使用Pipeline类，将多个处理步骤合并(glue)为单个scikit-learn估计器。Pipeline类本身具有 fit, predict和 score方法，最常用的是将预处理步骤（比如数据缩放）与一个监督模型（比如分类器）链接在一起。

首先我们构建一个由步骤列表组成的管道对象，每个步骤都是一个元组，其中包含一个名称和一个估计器实例：

```python
from sklearn.pipeline import Pipeline
pipe = Pipeline([("scaler", MinMaxScaler()),("svm",SVC())])
pipe.fit(X_train, y_train)
#这里Pipeline首先对第一个步骤(缩放器)调用fit,然后使用该缩放器对训练数据进行变换，用缩放后的数据拟合SVM
print("Test score:{:.2f}".format(pipe.score(X_test, y_test)))
```

Test score:0.95

利用Pipeline，我们减少了”预处理+分类“过程中所需要的代码量，不过主要优点是可以在cross_val_score或GridSearchCV中使用这个估计器:

```python
param_grid = {'svm_C':[0.001, 0.01, 0.1, 1, 10, 100],
             'svm_gamma':[0.001, 0.01, 0.1, 1, 10, 100]}
#有了这个参数网格，我们可以像平常一样使用GridSearchCV
grid = GridSearchCV(pipe, param_grid=param_grid, cv=5)
grid.fit(X_train, y_train)
print("Best cross-validation accuracy:{:.2f}".format(grid.best_score_))
print("Test set score:{:.2f}".format(grid.score(X_test, y_test)))
print("Best parameters:{}".format(grid.best_params_))
```

与前面的网格搜索不同，现在对于交叉验证的每次划分来说，仅使用训练部分对MinMaxScaler进行拟合，测试部分的信息没有泄露到参数搜索中。在交叉验证中，信息泄露的影响大小取决于预处理步骤的性质。使用测试部分来估计数据的范围，通常不会产生可怕的影响，但在特征提取和特征选择中使用测试部分则会导致结果的显著差异：

```python
#从高斯分布中独立采样100个样本与10000个特征
rnd = np.random.RandomState(seed=0)
X = rnd.normal(size=(100,10000))
y = rnd.normal(size=(100,))
#考虑到创建数据集的方式，数据X与目标y之间没有任何关系（它们是独立的），所以不可能学到任何内容。下面我们利用SelectPercentile特征选择从10000个特征中选择信息量最大的特征，然后使用交叉验证对Ridge回归进行评估
from sklearn.feature_selection import SelectPercentile, f_regression
select = SelectPercentile(score_func=f_regression, percentile=5).fit(X, y)
X_selected = select.transform(X)#X_selected.shape为(100,500)
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import Ridge
print("Cross-validation accuracy(cv only on ridge):{:.2f}".format(np.mean(cross_val_score(Ridge(), X_selected, y, cv=5))))
```

Cross-validation accuracy(cv only on ridge):0.91

交叉验证计算得到的平均R^2为0.91，这显然不对，因为数据完全是随机的。这里的特征选择从10000个随机特征中刚好选出了与目标相关性非常好的一些特征，而由于我们在**交叉验证之外**对特征选择进行拟合，所以它能够找到在训练部分和测试部分都相关的特征。从测试部分泄露出去的信息包含的信息量非常大，导致得到非常不切实际的结果。下面使用管道Pipeline（正确的交叉验证）来进行对比：

```python
pipe = Pipeline([("select",SelectPercentile(score_func=f_regression,percentile=5)),("ridge",Ridge())])
print("Cross-validation accuracy (pipeline):{:.2f}".format(np.mean(cross_val_score(pipe, X, y, cv=5))))
```

Cross-validation accuracy (pipeline):-0.25

利用管道，特征选择现在位于交叉验证循环内部。也就是说，仅使用数据的训练部分来选择特征，而不使用测试部分。特征选择找到的特征在训练集中与目标相关，但由于数据是完全随机的，这些特征在训练集中并不与目标相关。

Pipeline类不但可用于预处理和分类，实际上还可以将任意数量的估计器连接在一起。例如，可以构建一个包含特征提取、特征选择、缩放和分类（回归或聚类）的管道，总共4个步骤。

管道中估计器除了最后一步都需要具有transform方法，这样可以生成新的数据表示，以供下一个步骤使用。在调用Pipeline.fit的过程中，管道内部依次对每个步骤调用fit和transform，其输入是前一个步骤中transform方法的输出。对于管道中的最后一步，则仅调用fit。pipeline.steps是由元组组成的列表，所以`pipeline.steps[0][1]`是第一个估计器，`pipeline.steps[1][1]`是第二个估计器，以此类推：

```python
def fit(self, X, y):
    X_transformed = X
    for name, estimator in self.steps[:-1]:
        #遍历除最后一步之外的所有步骤
        #对数据进行拟合和变换
        X_transformed = estimator.fit_transform(X_transformed, y)
        #对最后一步进行拟合
    self.steps[-1][1].fit(X_transformed, y)
    return self
```

使用Pipeline进行预测时，我们同样利用除最后一步之外的所有步骤对数据进行变换(transform)，然后对最后一步调用predict：

```python
def predict(self, X):
    X_transformed = X
    for step in self.steps[:-1]:
        #遍历除最后一步之外的所有步骤
        #对数据进行变换
        X_transformed = step[1].transform(X_transformed)
    #利用最后一步进行预测
    return self.steps[-1][1].predict(X_transformed)
```

管道的最后一步不需要具有predict函数，可以创建一个只包含一个缩放器和一个PCA的管道。由于最后一步（PCA)具有transform方法，所以我们可以对管道调用transform，以得到将PCA.transform应用于前一个步骤处理过的数据后得到的输出。管道的最后一步只需要具有fit方法。

函数make_pipeline可以为我们创建管道并根据每个步骤所属的类为其自动命名:

```python
from sklearn.pipeline import make_pipeline
#标准语法
pipe_long = Pipeline([("scaler",MinMaxScaler()),("svm",SVC(C=100))])
#缩写语法
pipe_short = make_pipeline(MinMaxScaler(),SVC(C=100))
```

管道对象pipe_long和pipe_short的作用完全相同，但pipe_short的步骤是自动命名的，可以通过查看steps属性来查看步骤的名称:

`print("Pipeline steps:\n{}".format(pipe_short.steps))`

Pipeline steps:
[('minmaxscaler', MinMaxScaler(copy=True, feature_range=(0, 1))), ('svc', SVC(C=100, cache_size=200, class_weight=None, coef0=0.0,
decision_function_shape='ovr', degree=3, gamma='auto', kernel='rbf',
max_iter=-1, probability=False, random_state=None, shrinking=True,
tol=0.001, verbose=False))]

这两个步骤被命名为minmaxscaler和svc，一般步骤名称是类名称的小写，如果多个属于同一类则会附加一个数字：

```python
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
pipe = make_pipeline(StandardScaler(),PCA(n_components=2),StandardScaler())
print("Pipeline steps:\n{}".format(pipe.steps))
```

Pipeline steps:
[('standardscaler-1', StandardScaler(copy=True, with_mean=True, with_std=True)), ('pca', PCA(copy=True, iterated_power='auto', n_components=2, random_state=None,
svd_solver='auto', tol=0.0, whiten=False)), ('standardscaler-2', StandardScaler(copy=True, with_mean=True, with_std=True))]

```python
#用前面定义的管道对cancer数据集进行拟合
pipe.fit(cancer.data)
#从"pca"步骤中提取前两个主成分
components = pipe.named_steps["pca"].components_
print("components.shape:{}".format(components.shape))
```

components.shape:(2, 30)

我们对cancer数据集上的LogisticRegression分类器进行网格搜索，在将数据传入LogisticRegression分类器之前，先用Pipeline和StandardScaler对数据进行缩放。首先，我们用make_pipeline函数创建一个管道：

```python
from sklearn.linear_model import LogisticRegression
pipe = make_pipeline(StandardScaler(), LogisticRegression())
```

接下来，我们创建一个参数网格。LogisticRegression需要调节的正则化参数是参数C，我们对这个参数使用对数网格，在0.01和100之间进行搜索。由于我们使用了make_pipeline函数，所以管道中LogisticRegression步骤的名称是logisticregression，因此为了调节参数C，我们必须指定logisticregression_C的参数网格:

`param_grid = {'logisticregression_C':[0.01, 0.1, 1, 10, 100]}`

像往常一样，我们将cancer数据集划分为训练集和测试集，并对网格搜索进行拟合：

```python
X_train, X_test, y_train, y_test = train_test_split(cancer.data, cancer.target, random_state=4)
grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X_train, y_train)
```

**GridSearchCV找到的最佳模型（在所有训练数据上训练得到的模型）保存在grid.best_estimator_中**，best_estimator是一个管道，它包含两个步骤：standardscaler和logisticregression。我们可以使用管道的**named_steps**属性来访问logisticregression步骤，并得到对应的`coef_`

`print("Logistic regression cofficients:\n{}".format(grid.best_estimator_.named_steps["logisticregression"].coef_))`

Logistic regression cofficients:
[[-0.38856355 -0.37529972 -0.37624793 -0.39649439 -0.11519359  0.01709608
-0.3550729  -0.38995414 -0.05780518  0.20879795 -0.49487753 -0.0036321
-0.37122718 -0.38337777 -0.04488715  0.19752816  0.00424822 -0.04857196
0.21023226  0.22444999 -0.54669761 -0.52542026 -0.49881157 -0.51451071
-0.39256847 -0.12293451 -0.38827425 -0.4169485  -0.32533663 -0.13926972]]

我们可以利用管道将机器学习工作流程中所有处理步骤封装成一个scikit-learn估计器，还能使用监督任务的输出来调节预处理参数。前几章里，我们应用岭回归处理boston数据集的多项式特征，接下来用一个管道重复这个建模过程。管道包含3个步骤：缩放数据、计算多项式特征与岭回归：

```python
from sklearn.datasets import load_boston
boston = load_boston()
X_train, X_test, y_train, y_test = train_test_split(boston.data, boston.target, random_state=0)
from sklearn.preprocessing import PolynomialFeatures
pipe = make_pipeline(StandardScaler(), PolynomialFeatures(), Ridge())
```

我们希望根据分类结果来选择degree参数，利用管道搜索degree参数以及Ridge的alpha参数。为了实现这一点，我们要定义一个包含这两个参数的param_grid，并用步骤名称作为前缀:

```python
param_grid = {'polynomialfeatures__degree':[1,2,3],
             'ridge__alpha':[0.001,0.01,0.1,1,10,100]}
grid = GridSearchCV(pipe, param_grid=param_grid, cv=5, n_jobs=-1)
grid.fit(X_train, y_train)
```

用热图将交叉验证的结果可视化:

```python
plt.matshow(grid.cv_results_['mean_test_score'].reshape(3,-1),vmin=0,cmap="viridis")
plt.xlabel("ridge__alpha")
plt.ylabel("polynomialfeatures__degree")
plt.xticks(range(len(param_grid['ridge__alpha'])),param_grid['ridge__alpha'])
plt.yticks(range(len(param_grid['polynomialfeatures__degree'])),
          param_grid['polynomialfeatures__degree'])
plt.colorbar()
```

![](images\P247.png)

可以调用grid.best_params_得到degree参数与alpha参数

还能结合GridSearchCV和Pipeline，尝试针对某个数据集最好的模型和最好的参数（虽然不常用）：

```python
pipe = Pipeline([('preprocessing',StandardScaler()),('classifier',SVC())])
from sklearn.ensemble import RandomForestClassifier
param_grid = [
    {'classifier':[SVC()],'preprocessing':[StandardScaler(),None],
    'classifier__gamma':[0.001,0.01,0.1,1,10,100],
    'classifier__C':[0.001,0.01,0.1,1,10,100]},
    {'classifier':[RandomForestClassifier(n_estimators=100)],
    'preprocessing':[None],'classifier__max_features':[1,2,3]}
]
#将网格搜索实例化并在cancer数据集上运行
X_train, X_test, y_train, y_test = train_test_split(
cancer.data, cancer.target, random_state=0)
grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(X_train, y_train)
print(grid.best_params_)
print(grid.best_score_)
print(grid.score(X_test, y_test))
```

```
{'classifier': SVC(C=10, cache_size=200, class_weight=None, coef0=0.0,
decision_function_shape='ovr', degree=3, gamma=0.01, kernel='rbf',
max_iter=-1, probability=False, random_state=None, shrinking=True,
tol=0.001, verbose=False), 'classifier__C': 10, 'classifier__gamma': 0.01, 'preprocessing': StandardScaler(copy=True, with_mean=True, with_std=True)}
0.9859154929577465
0.9790209790209791
```

最好的是SVC与StandardScaler预处理，在C为10gamma为0.01时最佳



## 处理文本数据

四种字符串数据：分类数据、可映射类别的自由字符串、结构化字符串数据、文本数据。

在文本分析的语境中，数据集通常被称为语料库(corpus)，每个由单个文本表示的数据点被称为文档(document) ，这些属于来自于自然语言处理(natural language processing)。

```python
from sklearn.datasets import load_files
reviews_train = load_files("data\\aclImdb\\train\\")
text_train, y_train = reviews_train.data, reviews_train.target
print("type of text_train: {}".format(type(text_train)))
print("length of text_train: {}".format(len(text_train)))
print("text_train[1]:\n{}".format(text_train[1]))
```

type of text_train: &lt;class 'list'&gt;
length of text_train: 75000
text_train[1]:
b"Amount of disappointment I am getting these days seeing movies like Partner, Jhoom Barabar and now, Heyy Babyy is gonna end my habit of seeing first day shows.&lt;br /&gt;&lt;br /&gt;The movie is an utter disappointment because it had the potential to become a laugh riot only if the d\xc3\xa9butant director, Sajid Khan hadn't tried too many things. Only saving grace in the movie were the last thirty minutes, which were seriously funny elsewhere the movie fails miserably. First half was desperately been tried to look funny but wasn't. Next 45 minutes were emotional and looked totally artificial and illogical.&lt;br /&gt;&lt;br /&gt;OK, when you are out for a movie like this you don't expect much logic but all the flaws tend to appear when you don't enjoy the movie and thats the case with Heyy Babyy. Acting is good but thats not enough to keep one interested.&lt;br /&gt;&lt;br /&gt;For the positives, you can take hot actresses, last 30 minutes, some comic scenes, good acting by the lead cast and the baby. Only problem is that these things do not come together properly to make a good movie.&lt;br /&gt;&lt;br /&gt;Anyways, I read somewhere that It isn't a copy of Three men and a baby but I think it would have been better if it was."

可以看到text_train是一个长度为75000的列表，其中每个元素是包含一条评论的字符串。打印出索引编号为1的评论后发现包含一些HTML换行符`(<br />)`，虽然不会造成多大影响但最好清洗数据并删除这种格式：

`text_train = [doc.replace(b"<br />",b" ") for doc in text_train]`

```python
import numpy as np
print("Samples per class (training):{}".format(np.bincount(y_train)))
```

Samples per class (training):[12500 12500 50000]

对应元素为0，1，2，这里需要将50000个无监督学习的无标签文档剔除：

```python
import numpy as np
text_train = np.array(text_train)[y_train!=2]
vect = CountVectorizer().fit(text_train)
X_train = vect.transform(text_train)
y_train = y_train[y_train!=2]
```

用同样方式加载测试数据集:

```python
reviews_test = load_files("data/aclImdb/test")
text_test, y_test = reviews_test.data, reviews_test.target
print("Number of documents in test data:{}".format(len(text_test)))
print("Samples per class(test):{}".format(np.bincount(y_test)))
text_test = [doc.replace(b"<br />",b" ") for doc in text_test]
```

Number of documents in test data:25000
Samples per class(test):[12500 12500]

我们要解决的任务如下，给定一条评论，希望根据该评论的内容对其分配一个”正面的“或”负面的“标签。但文本数据不是机器学习模型可以处理的格式，需要将文本的字符串表示转换为数值表示。

通过**词袋**(bag-of-words)，我们舍弃了输入文本中的大部分结构，比如章节、段落、句子和格式，只计算语料库中每个单词在每个文本中出现频次。三个步骤是分词tokenization、构建词表vocabulary building和编码encoding,原始字符串中的单词顺序与词袋特征表示完全无关。

词袋表示是在CountVectorizer中实现的，它是一个变换器(transformer)。首先将它应用于一个包含两个样本的玩具数据集，来看一下它的工作原理：

```python
bards_words = ["The fool doth think he is wise,","but the wise man knows himself to be a fool"]
from sklearn.feature_extraction.text import CountVectorizer
vect = CountVectorizer()
vect.fit(bards_words)
#拟合CountVectorizer包括训练数据的分词和词表的构建，可以通过vocabulary_属性来访问列表:
print("Vocabulary size:{}".format(len(vect.vocabulary_)))
print("Vocabulary cotent:\n{}".format(vect.vocabulary_))
```

Vocabulary size:13
Vocabulary cotent:
{'the': 9, 'fool': 3, 'doth': 2, 'think': 10, 'he': 4, 'is': 6, 'wise': 12, 'but': 1, 'man': 8, 'knows': 7, 'himself': 5, 'to': 11, 'be': 0}

词表共包含13个词，从”be“到"wise"，可以调用transform方法来创建训练数据的词袋表示：

```python
bag_of_words = vect.transform(bards_words)
print("bag_of_words:{}".format(repr(bag_of_words)))
```

bag_of_words:&lt;2x13 sparse matrix of type '&lt;class 'numpy.int64'&gt;'
with 16 stored elements in Compressed Sparse Row format&gt;

词袋表示保存在一个SciPy稀疏矩阵中，这种数据格式只保存非0元素，形状为2x13。想查看稀疏矩阵的实际内容，可以使用toarray方法将其转换为”密集的“NumPy数组：

`print("Dense representation of bag_of_words:\n{}".format(bag_of_words.toarray()))`

Dense representation of bag_of_words:
[[0 0 1 1 1 0 1 0 0 1 1 0 1]
[1 1 0 1 0 1 0 1 1 1 0 1 1]]

下面将其用于电影评论情感分析的任务：

```python
vect = CountVectorizer().fit(text_train)
X_train = vect.transform(text_train)
print("X_train:\n{}".format(repr(X_train)))
```

X_train:
&lt;75000x124255 sparse matrix of type '&lt;class 'numpy.int64'&gt;'
with 10315542 stored elements in Compressed Sparse Row format&gt;

访问词表的另一种方法是使用向量器vectorizer的get_feature_name方法，它将返回一个列表，每个元素对应一个特征。`feature_names = vect.get_feature_names()`，该变量长度为74849，其中有大量重复语义的单词。

在尝试改进特征提取之前，我们先通过实际构建一个分类器来得到性能的量化度量。我们将训练标签保存在y_train中，训练数据的词袋表示保存在X_train中，因此可以在这个数据上训练一个分类器。对于这样的高维稀疏数据，类似LogisticRegression的线性模型通常效果最好。先使用交叉验证进行评估:

```python
from sklearn.model_selection import cross_val_score
from sklearn.linear_model import LogisticRegression
scores = cross_val_score(LogisticRegression(),X_train,y_train,cv=5)
print("Mean cross-validation accuracy:{:.2f}".format(np.mean(scores)))
```

Mean cross-validation accuracy:0.88

我们得到交叉验证平均分数是88%，通过交叉验证调节正则化参数C：

```python
from sklearn.model_selection import GridSearchCV
param_grid = {'C':[0.001,0.01,0.1,1,10]}
grid = GridSearchCV(LogisticRegression(), param_grid, cv=5)
grid.fit(X_train, y_train)
print("Best cross-validation score:{:.2f}".format(grid.best_score_))
print("Best parameters:",grid.best_params_)
```

Best cross-validation score:0.89
Best parameters: {'C': 0.1}

使用C=0.1得到的交叉验证分数是89%，我们可以在测试集上评估这个参数设置的泛化性能

```python
X_test = vect.transform(text_test)
print("{:.2f}".format(grid.score(X_test, y_test)))
```

0.88

仅在一个文档中出现的词例不太可能出现在测试集中，因此没什么用，可以用min_df参数来设置词例至少需要在多少个文档中出现过：

```python
vect = CountVectorizer(min_df=5).fit(text_train)
X_train = vect.transform(text_train)
print("X_train with min_df:{}".format(repr(X_train)))
```

X_train with min_df:&lt;25000x27272 sparse matrix of type '&lt;class 'numpy.int64'&gt;'
with 3368680 stored elements in Compressed Sparse Row format&gt;

通过要求每个词例至少在5个文档中出现过将特征数量减少到27271个，为原始特征的1/3，再次运行网格搜索查看模型性能：

```python
grid = GridSearchCV(LogisticRegression(), param_grid, cv=5)
grid.fit(X_train, y_train)
print("Best cross-validation score:{:.2f}".format(grid.best_score_))
```

Best cross-validation score:0.89

减少特征数量加速处理过程，同时提高模型的可解释性。

删除没有信息量的单词还有另一种方法，就是舍弃那些出现次数太多以至于没有信息量的单词。有两种主要方法，使用特定语言的**停用词**(stopword)列表，或者舍弃那些出现过于频繁的单词。scikit-learn的feature_extraction.text模块中提供了英语停用词的内置列表：

```python
from sklearn.feature_extraction.text import ENGLISH_STOP_WORDS
print("Number of stop words:{}".format(len(ENGLISH_STOP_WORDS)))
print("Every 10th stopword:\n{}".format(list(ENGLISH_STOP_WORDS)[::10]))
```

Number of stop words:318
Every 10th stopword:
['ten', 'his', 'only', 'otherwise', 'him', 'others', 'un', 'become', 'ltd', 'sometime', 'someone', 'nevertheless', 'keep', 'any', 'whoever', 'above', 'another', 'yourselves', 'per', 'into', 'please', 'several', 'three', 'meanwhile', 'further', 'sincere', 'anywhere', 'name', 'i', 'to', 'do', 'behind']

这里因为特征数量过小，对模型影响有限，不作删除。

另一种方法是按我们预计的特征信息量大小来缩放特征，常见的做法是词频-逆向文档频率方法，也叫**tf-idf**方法。如果一个单词在某个特定文档中经常出现但在许多文档中却不常出现，那么这个单词很有可能是对文档内容的很好描述。scikit-learn在两个类中实现了tf-idf方法：TfidfTransformer和TfidfVectorizer，前者接受CountVectorizer生成的稀疏矩阵并将其变换，后者接受文本数据并完成词袋特征提取与tf-idf变换：

```python
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.pipeline import make_pipeline
pipe = make_pipeline(TfidfVectorizer(min_df=5),
                    LogisticRegression())
param_grid = {'logisticregression__C':[0.001,0.01,0.1,1,10]}
grid = GridSearchCV(pipe, param_grid, cv=5)
grid.fit(text_train, y_train)
print("Best cross-validation score:{:.2f}".format(grid.best_score_))
```

Best cross-validation score:0.89

常用于文本数据的一种特殊技术是**主题建模**(topic modeling)，这是描述将每个文档分配给一个或多个主题的任务（通常为无监督）的概括性术语。如果每个文档分配一个主题那就是文档聚类任务，如果有多个主题则作分解（如主成分）。通常在讨论主题建模时，指的是**隐含狄利克雷分布**(**LDA**, Latent Dirichlet Allocation)的特定分解方法。

LDA模型试图找出频繁共同出现的单词群组（即主题），LDA还要求每个文档可以被理解为主题子集的”混合“，这些主题类似PCA或NMF所提取的成分，可能存在语义也可能没有。我们将LDA应用于电影评论数据集，删除15%文档中的单词，并将词袋模型限定为最常见的10000个单词：

```python
vect = CountVectorizer(max_features=10000, max_df=.15)
X = vect.fit_transform(text_train)
#学习一个包含10个主题的模型，使用"batch"学习方法，还将增大max_iter
from sklearn.decomposition import LatentDirichletAllocation
lda = LatentDirichletAllocation(n_topics=10, learning_method="batch",max_iter=25,random_state=0)
#构建模型并变换数据
document_topics = lda.fit_transform(X)
```

LDA有一个**components_**属性，保存了每个单词对每个主题的重要性，**components_**的大小为(n_topics, n_words): `lda.components_.shape 为 (10, 10000)`

```python
#按每个主题排序，通过[:,::-1]将行反转，变为降序
sorting = np.argsort(lda.components_, axis=1)[:,::-1]
#从向量器中获取特征名称
feature_names = np.array(vect.get_feature_names())
```

目前自然语言处理NLP，最常用的文本处理是使用连续向量表示，也叫作词向量(word vector)或分布式词表示，在word2vec库中实现。还有就是使用递归神经网络(recurrent neural network, RNN)，可以生成同样是文本的输出，适合作翻译与摘要。

