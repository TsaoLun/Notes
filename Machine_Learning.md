# 学习笔记<br /> Hands-On Machine Learning with Scikit-Learn & TensorFlow

## 学习要点
>机器学习基础与方法论

>算法训练与面试技巧

>MySQL

## 机器学习分类
* 监督学习 _supervised learning_
  
    训练数据带标签 _labels_ ，任务为分类 _Classification_ 与回归 _Regression_
    机器学习中的属性 _attribute_ 与特征 _feature_ 的细微区别：属性为数据所属种类，而特征为属性加属性值

    - k近邻 _k-Nearest Neighbors_
    - 线性回归 _Linear Regression_
    - 逻辑回归 _Logistic Regression_
    - 支持向量机 _SVM_
    - 决策树与随机森林 _Decision Trees & Random Forests_
    - 神经网络 _Neural networks_

* 无监督学习 _unsupervised learning_

    训练数据无标签，常见模型如下：
    
    - 聚类 _Clustering_
    _k-Means_
    层次聚类 _HCA_
    期望最大化
    - 可视化与降维 _Visualization and dimensionality reduction_
    主成分分析 _PCA_
    核 _PCA_
    局部线性嵌入 _LLE_
    _t-SNE_
    - 关联规则学习 _Association rule learning_ 
* 半监督学习 _semisupervised learning_ 

    部分标记的训练数据 _partially labeled_ 

* 强化学习 _reinforcement learning_


根据数据输入方式不同，分为批量学习与在线学习 _Batch & Online Learning_ ：

>后者可以接受小批次的新训练数据 _mini_batches_ 持续学习，而前者训练数据多为完整的数据集 _full dataset_

根据泛化方式 _generalize_ 不同，分为基于实例学习与基于模型学习 _Instance-based & Model-based learning_
``` python
import matplotlib
import matplotlib.pyplot as plt
import numpy as np
import pandas as pd
import sklearn

#load the data
oecd_bli = pd.read_csv("oecd_bli_2015.csv", thousands=',')
gdp_per_capita = pd.read_csv("gdp_per_capita.csv",thousands=',',delimiter='\t',encoding='latin1',na_values="n/a")

#prepare the data
country_stats = prepare_country_stats(oecd_bli, gdp_per_capita)#注意是伪代码或者说是待定义函数
X = np.c_[country_stats["GDP per capita"]]
y = np.c_[country_stats["Life satisfaction"]]

#visualize the data
country_stats.plot(kind='scatter', x="GDP per capita", y='Life satisfaction')
plt.show()

#select a linear model
lin_reg_model = sklearn.linear_model.LinearRegression()

#train the model
lin_reg_model.fit(X, y)

#Make a prediction for Cyprus
X_new = [[22587]] # Cyprus' GDP per capita
print(lin_reg_model.predict(X_new)) # outputs
```
## 端对端机器学习 _END TO END_

### Get the data

构建一个可以预测加州任何地区房价中位数的模型，以给后续Pipeline中的投资模型提供数据
_多变量回归的批量学习 multivariate regression with batch learning_

回归问题常用的性能衡量指标 _Performance Measure_ 是**均方根误差** _Root Mean Square Error_
_It measures the standard deviation of the errors the system makes in its predictions._

RMSE$(X,h)=\sqrt{{1\over m}\sum_{i=1}^m(h(x^{(i)})-y^{(i)})^2}\,$

当出现很多离群点时 _outlier_ ，我们通常会用**平均绝对误差** _Mean Aboslute Error_
MAE$(X,h)={1\over m}\sum_{i=1}^m|h(x^{(i)})-y^{(i)}|\,$

RMSE对应欧几里得范数，L2范数写作$\parallel . \parallel _2$
MAE对应曼哈顿范数，L1范数写作$\parallel . \parallel _1$
L0表示向量中非0元素的个数，Lp则是 $\parallel v \parallel _p=(|v_0|^p+|v_1|^p+...+|v_n|^p)^{1\over p}$

RMSE对离群点的敏感程度高于MAE，当离群点很少时优先选择RMSE进行评估
接下来来从网页读取Housing文件：
```python
#function to fetch the data
import os
import tarfile#标准库，用于解压打开文件
from six.moves import urllib
#six.moves解决python2,3的兼容性问题,urllib为爬取网页
DOWNLOAD_ROOT = "https://www.dcc.fc.up.pt/~ltorgo/Regression/cal_housing.tgz"
HOUSING_PATH = "datasets/housing"

def fetch_housing_data(housing_url=DOWNLOAD_ROOT, housing_path=HOUSING_PATH):
    #爬取制定网页保存在制定位置
    if not os.path.isdir(housing_path):
        os.makedirs(housing_path)
    tgz_path = os.path.join(housing_path, "housing.tgz")#连接路径
    urllib.request.urlretrieve(housing_url, tgz_path)
    #将指定url数据下载到本地指定位置
    housing_tgz = tarfile.open(tgz_path)
    housing_tgz.extractall(path=housing_path)
    #打开并解压
    housing_tgz.close()

import pandas as pd
def load_housing_data(housing_path=HOUSING_PATH):
    csv_path = os.path.join(housing_path,"CaliforniaHousing")
    return pd.read_csv(csv_path)

fetch_housing_data()
housing = load_housing_data()
housing.head()
```
得到DataFrame文件并读取
```
longitude latitude housingMedianAge totalRooms totalBedrooms population households medianIncome medianHouseValue 
0 	-122.23 	37.88 	41.0 	880.0 	129.0 	322.0 	126.0 	8.3252 	452600.0
1 	-122.22 	37.86 	21.0 	7099.0 	1106.0 	2401.0 	1138.0 	8.3014 	358500.0
2 	-122.24 	37.85 	52.0 	1467.0 	190.0 	496.0 	177.0 	7.2574 	352100.0
3 	-122.25 	37.85 	52.0 	1274.0 	235.0 	558.0 	219.0 	5.6431 	341300.0
4 	-122.25 	37.85 	52.0 	1627.0 	280.0 	565.0 	259.0 	3.8462 	342200.0
```
接下来将数据分组
```python
import numpy as np

def split_train_test(data, test_ratio):
    shuffled_indices = np.random.permutation(len(data))#np.random.permutation()随机排一个序列
    test_set_size = int(len(data) * test_ratio)
    test_indices = shuffled_indices[:test_set_size]
    train_indices = shuffled_indices[test_set_size:]
    return data.iloc[train_indices],data.iloc[test_indices]#iloc通过行号提取行数据
```
完成训练集与测试集分组，但每运行一次产生的数据集不一样会导致模型最终学习了整个数据集。解决方法之是每次运行完保存数据，或者在调用np.random.permutation()之前设置一个随机数生成器的种子(比如np.random.seed)以生成相同的随机索引。但这样仍会在更新数据后实效，最好的方法是对每个实例使用一个**标识符** _identifier_ 来决定是否放入测试集，即便有新数据也会被确保放入测试集，实现方式如下：
```python
import hashlib
#接受传入内容并得到hash值
def test_set_check(identifier, test_ratio, hash):
    return hash(np.int64(identifier)).digest()[-1] < 256 * test_ratio #digest()返回摘要
def split_train_test_by_id(data, test_ratio, id_column, hash=hashlib.md5):
    ids = data[id_column]
    in_test_set = ids.apply(lambda id_: test_set_check(id_, test_ratio, hash))
    return data.loc[~in_test_set], data.loc[in_test_set]#loc[]通过标签索引行数据
```
这里 _housing_ 数据集没有标识数据，最简单的解决方法是使用行索引作为ID:
```python
housing_with_id = housing.reset_index()
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "index")
```
如果在添加新数据时不能保证不删除之前的行，则可以用稳定的特征来创建唯一标识符，比如经纬度:
```python
housing_with_id["id"] = housing["longitude"]*1000 + housing["latitude"]#这里的特征名称有出入
train_set, test_set = split_train_test_by_id(housing_with_id, 0.2, "id")
```
Scikit-Learn提供的**train_test_split**与之前定义的split_train_test几乎相同，通过random_state参数设置随机生成器种子，它能接受多个行数相同的数据集进行一致的拆分。
```python
from sklearn.model_selection import train_test_split
train_set, test_set = train_test_split(housing, test_size=0.2, random_state=42)
```
这种方法在数据集较小时可能会产生抽样偏差，当数据不平衡时应该采取**分层抽样** _stratified sampling_ 且每一层都要有足够数量的实例：比如收入中位数大多聚集在2～5，也有部分远超6，将收入中位数除以1.5,然后使用ceil进行取整，最后将所有大于5的类别合并为类别5
```python
housing["income_cat"] = np.ceil(housing["median_income"]/1.5)
housing["income_cat"].where(housing["income_cat"] < 5, 5.0, inplace=True)
#np.where(condition, x, y):满足条件(condition)，输出x，不满足输出y
```
现在可以根据收入类别进行分层抽样了，使用 _Scikit-Learn_ 的 _Stratified-Shuffle Split_ 类:
```python
from sklearn.model_selection import StratifiedShuffleSplit
split = StratifiedShuffleSplit(n_splits=1, test_size=0.2, random_state=42)
#n_splits为打乱的迭代次数,接下来该实例进行分层抽样，利用split函数对housing数据集按中收分层进行分割得到索引位置train_index和test_index,并用loc提取数据
for train_index, test_index in split.split(housing, housing["income_cat"]):
    start_train_set = housing.loc[train_index]
    start_test_set = housing.loc[test_index]
```
查看一下 _income_ 各类别占比
```python
housing["income_cat"].value_counts()/len(housing)
```
3.0    0.350581
2.0    0.318847
4.0    0.176308
5.0    0.114438
1.0    0.039826
Name: income_cat, dtype: float64
再查看一下训练集与测试集中的类别占比
```python
strat_train_set["income_cat"].value_counts()/len(strat_train_set)
```
3.0    0.350594
2.0    0.318859
4.0    0.176296
5.0    0.114402
1.0    0.039850
Name: income_cat, dtype: float64
```python
strat_test_set["income_cat"].value_counts()/len(strat_test_set)
```
3.0    0.350533
2.0    0.318798
4.0    0.176357
5.0    0.114583
1.0    0.039729
Name: income_cat, dtype: float64
```python
train_set["income_cat"].value_counts()/len(train_set)
```
3.0    0.348595
2.0    0.317466
4.0    0.178537
5.0    0.115673
1.0    0.039729
Name: income_cat, dtype: float64
```python
test_set["income_cat"].value_counts()/len(test_set)
```
3.0    0.358527
2.0    0.324370
4.0    0.167393
5.0    0.109496
1.0    0.040213
Name: income_cat, dtype: float64
可见在分层抽样下，训练集、测试集与完整数据分布基本一致，而随机的train_test_split则稍有偏差
在train_test_split()中加入**stratify参数**，比如stratify=y,这里是housing["income_cat"]
```python
from sklearn.model_selection import train_test_split
train_set, test_set = train_test_split(housing, test_size=0.2,stratify=housing["income_cat"],random_state=42)
train_set["income_cat"].value_counts()/len(train_set)
test_set["income_cat"].value_counts()/len(test_set)
```
3.0    0.350594
2.0    0.318859
4.0    0.176296
5.0    0.114402
1.0    0.039850
Name: income_cat, dtype: float64
3.0    0.350533
2.0    0.318798
4.0    0.176357
5.0    0.114583
1.0    0.039729
Name: income_cat, dtype: float64
得到与整体分布更接近的样本采样，现在删除 _income_cat_ 属性，将数据复原:
```python
for set in (strat_train_set, strat_test_set):
    set.drop(["income_cat"], axis=1, inplace=True)
```
### 数据探索与可视化
_Put the test set aside and only explore the training set._
```python
#创建副本进行探索
housing = strat_train_set.copy()
#建立一个各区域的分布图，设置alpha=0.1突出高密度区域
housing.plot(kind="scatter", x="longitude", y="latitude",alpha=0.1)
```
![avatar](geohousing.png)
圆半径大小代表人口数量 _s_ ，颜色代表价格 _c_ ，我们使用名为jet的预定义颜色表 _cmap_ 来进行可视化：
```python
housing.plot(kind="scatter", x="longitude", y="latitude",alpha=0.4,s=housing["population"]/100,label="population",c="median_house_value",cmap=plt.get_cmap("jet"),colorbar=True)
plt.legend()
```
![avatar](mixhousing.png)
可以通过corr()方法计算每对属性间的标准相关系数 _standard correlation coefficient_ (也叫皮尔逊相关系数 _Pearson's_ )
```python
corr_matrix = housing.corr()
```
来看一下各系数与median_house_value之间的关系
```python
corr_matrix["median_house_value"].sort_values(ascending=False)
```
median_house_value    1.000000
median_income         0.688075
total_rooms           0.134153
housing_median_age    0.105623
households            0.065843
total_bedrooms        0.049686
population           -0.024650
longitude            -0.045967
latitude             -0.144160
Name: median_house_value, dtype: float64
还可以使用Pandas绘制 _scatter_matrix_ 函数，我们选取那些与房价中位数相关的属性：
```python
from pandas.plotting import scatter_matrix
attributes = ["median_house_value","median_income","total_rooms","housing_median_age"]
scatter_matrix(housing[attributes], figsize=(12, 8))
```
![avatar](scattermatrix.png)
在输入数据之前还能尝试各自属性的组合:
```python
housing["rooms_per_household"] = housing["total_rooms"]/housing["households"]
housing["bedrooms_per_room"] = housing["total_bedrooms"]/housing["total_rooms"]
housing["population_per_household"] = housing["population"]/housing["households"]
#来看一下关联矩阵 correlation matrix
corr_matrix = housing.corr()
corr_matrix["median_house_value"].sort_values(ascending=False)
```
median_house_value          1.000000
median_income               0.688075
rooms_per_household         0.151948
total_rooms                 0.134153
housing_median_age          0.105623
households                  0.065843
total_bedrooms              0.049686
population_per_household   -0.023737
population                 -0.024650
longitude                  -0.045967
latitude                   -0.144160
bedrooms_per_room          -0.255880
Name: median_house_value, dtype: float64
发现 _bedrooms_per_room_ 与 _median_house_value_ 负相关，而 _rooms_per_household_ 与也比 _total_rooms_ 更具信息量

### 数据准备
通过编写函数来准备数据的好处：
+ 可以在任何数据集上重现这些转换
+ 可以逐渐建立起转换函数的函数库
+ 实时系统中用于处理数据并 _feed_ 给算法
+ 尝试多种转换方式看哪种转换组合的效果最好

回到干净的数据集 _strat_train_set_ ，把**预测器**与**标签**分开(注意drop会创建副本不会影响 _strat_train_set_ )
```python
housing = strat_train_set.drop("median_house_value", axis=1)
housing_labels = strat_train_set["median_house_value"].copy()
```
根据 _housing.info_ 得知 _total_bedrooms_ 和 _bedrooms_per_room_ 有所缺失。对于缺失的特征，需要创建函数辅助处理，可以放弃这些地区、属性或者将缺失值设置为某个值（零均值或中位数）
通过DataFrame的dropna()、drop()和fillna()方法可以完成这些操作：
```python
housing.dropna(subset=["total_bedrooms"])#法1
housing.drop("total_bedrooms",axis=1)#法2
median = housing["total_bedrooms"].median()
housing["total_bedrooms"].fillna(median)#法3
```
Scikit-Learn提供了一个非常容易上手的类 _class_ 来处理缺失值：**SimpleImputer**，首先创建实例并指定替代值类型
```python
from sklearn.impute import SimpleInputer
imputer = SimpleImputer(strategy="median")
#把ocean_proximity排除在外因为它不是数值,没有中位数，无法根据中位数填补缺失值
housing_num = housing.drop("ocean_proximity".axis=1)
#使用fit()方法将imputer实例适配到训练集
imputer.fit(housing_num)
#这里imputer计算了每个属性的中位数值以实现填补并将结果存储在实例变量imputer.statistics_中
```
虽然 _total_bedrooms_ 存在缺失值，但我们无法确认系统启动后新数据是否一定不存在任何缺失值
此时可以使用这个imputer将缺失值转化为中位数得到一个Numpy array,再放回DataFrame中:
```python
X = imputer.transform(housing_num)
housing_tr = pd.DataFrame(X, columns=housing_num.columns)
```
再查看housing_tr.info()得到完整的数据集
上例也可以在得到imputer实例和housing_num数据集后利用**fit_transform**一步实现拟合与转换:
```python
X = imputer.fit_transform(housing_num)
housing_tr = pd.DataFrame(X, columns=housing_num.columns)
```
#### _Scikit-Learn Design_
>估计器 _estimators_ :能根据数据集对某些参数进行估计的任意对象都能被称为估计器,通过fit方法执行并以数据集作为参数，此时如 _strategy_ 这类的其他参数作为超参数 _hyperparameter_ (用于 _SimpleImputer_ 实例)

>转换器 _transformers_ :有些估计器可以用于转换数据集，这些被称为转换器，由transform()方法与待转换数据一起执行并返回转换后的数据集，所有转换器都能使用 _fit_transform_ 方法。

>预测器 _predictors_ :有些估计器能基于一个给定的数据集进行预测，被称为预测器。预测器的predict()方法会接受一个新实例的数据集，然后返回一个包含相应预测的数据集。score()方法则用来衡量给定测试集的预测质量。

+ 检查 _Inspection_ :所有估计器的超参数都可以通过公共实例变量直接访问(e.g., imputer.strategy)直接访问，所有估计器的学习参数也可以通过带下划线后缀的公共实例变量来访问, imputer.statistics_得到是housing_num.median().values
+ 类不扩散 _Nonproliferation of classes_ :数据集被表示为Numpy数组或者Scipy稀疏矩阵，而不是自定义类型。超参数只是普通 _Python_ 字符串或者数字。
+ 构成 _Composition_ :现有构建代码块 _blocks_ 尽最大可能重用，任意序列的转换器加上预测器就能创建一个 _Pipeline_
+ 合理默认值 _Sensible defaults_ :_Scikit-Learn_ 为大多数参数提供了合理的默认值，从而可以快速搭建起一个基础工作系统 _baseline working system_

#### 处理文本和分类属性
之前我们排除的分类属性ocean_proximity是文本属性，无法计算中位数，其实大部分机器学习算法都适合处理数字，接下来将其转换成数字，_Scikit-Learn_ 提供了转换器**LabelEncoder**:
```python
from sklearn.preprocessing import LabelEncoder
encoder = LabelEncoder()
housing_cat = housing["ocean_proximity"]
housing_cat_encoded = encoder.fit_transform(housing_cat)
housing_cat_encoded
```
array([0, 0, 4, ..., 1, 0, 3])
可以通过classes_属性来查看编译器encoder所学到的映射mapping
```python
print(encoder.classes_)
```
['<1H OCEAN' 'INLAND' 'ISLAND' 'NEAR BAY' 'NEAR OCEAN']对应[0, 1, 2, 3, 4]
这种代表方式的问题是算法会假设两个相近的数字比较远的更相似，而实际情况可能不是，常见的解决方式是给每个类别创建一个二进制属性，即 _one-hot_ 编码。_Scikit-Learn_ 提供了OneHotEncoder编码器，可以将整数分类转换为独热向量，不过fit_transform()只接受二维数组并输出 _SciPy_ 稀疏矩阵 _sparse matrix_，这里需要 _reshape_ (**重塑**) _housing_cat_encoded_ 使样本沿row0延伸
```python
from sklearn.preprocessing import OneHotEncoder
encoder = OneHotEncoder()
housing_cat_1hot = encoder.fit_transform(housing_cat_encoded.reshape(-1,1))
housing_cat_1hot
```
<16512x5 sparse matrix of type '<class 'numpy.float64'>'
	with 16512 stored elements in Compressed Sparse Row format>
这里的稀疏矩阵仅储存非零元素的位置更节约内存，可以通过toarray()方法来将其转换为dense array
```python
housing_cat_1hot.toarray()
```
array([[1., 0., 0., 0., 0.],
       [1., 0., 0., 0., 0.],
       [0., 0., 0., 0., 1.],
       ...,
       [0., 1., 0., 0., 0.],
       [1., 0., 0., 0., 0.],
       [0., 0., 0., 1., 0.]])
使用**LabelBinarizer类**实现一次性完成两个转换（从文本到整数再到独热向量）
注意现在LabelBinarizer只能用来转换labels而不能同时处理X(Features),如果直接放入Pipeline中会报错因为Pipeline会传给它X和y
```python
from sklearn.preprocessing import LabelBinarizer
encoder = LabelBinarizer()
housing_cat_1hot = encoder.fit_transform(housing_cat)
housing_cat_1hot
```
这时默认返回的是密集Numpy数组，可以通过对LabelBinarizer设置sparse_output=True来得到稀疏矩阵
```python
from sklearn.preprocessing import LabelBinarizer
encoder = LabelBinarizer(sparse_output=True)
housing_cat_1hot = encoder.fit_transform(housing_cat)
housing_cat_1hot
```
<16512x5 sparse matrix of type '<class 'numpy.int64'>'
	with 16512 stored elements in Compressed Sparse Row format>
#### Custom Transformers定制转换器
虽然 _Scikit-Learn_ 提供了许多有用的转换器，但仍需要一些自定义清理操作或者组合任务的转换器
由于 _Scikit-Learn_ 依赖于 _duck typing_ 而不是继承 _inheritance_ ,所以只需**创建一个类**，然后应用fit()、transform()、fit_transform()，如果添加**TransformerMixin**作为基类就能直接得到最后一个方法。同样如果添加**BaseEstimator**作为基类（并在函数构造中避免*args和**kargs），还能获得两个非常有用的自动调整超参数的方法 _get_params()和set_params()_，以下定制转换器用来添加组合后的属性：
```python

from sklearn.base import BaseEstimator, TransformerMixin
rooms_ix, bedrooms_ix, population_ix, household_ix = 3, 4, 5, 6#各属性在housing_num中所属的列
class CombinedAttributesAdder(BaseEstimator, TransformerMixin):
    def __init__(self, add_bedrooms_per_room=True):#no *args or **kwargs
        self.add_bedrooms_per_room = add_bedrooms_per_room
    def fit(self, X, y=None):
        return self #nothing else to do
    def transform(self, X, y=None):
        rooms_per_household=X[:,rooms_ix]/X[:,household_ix]
        population_per_household=X[:,population_ix]/X[:,household_ix]
        if self.add_bedrooms_per_room:
            bedrooms_per_room = X[:,bedrooms_ix]/X[:,household_ix]
            return np.c_[X, rooms_per_household, population_per_household,bedrooms_per_room]
        else:
            return np.c_[X, rooms_per_household, population_per_household]
attr_adder = CombinedAttributesAdder(add_bedrooms_per_room=False)
housing_extra_attribs = attr_adder.transform(housing.values)
```
在本例中，转换器有一个默认设置为真的超参数add_bedrooms_per_room,用来控制该步骤的开关。自动化执行的步骤越多，能尝试的组合也就越多。
#### Feature Scaling特征缩放
数值差异过大会导致算法性能不佳，常用的两种缩放方法是 _min-max sacling_ 归一化和 _standardization_ 标准化
归一化即将值减去最小值并除以最大值和最小值的差使得最终范围在0～1之间。_Scikit-Learn_ 提供了名为**MinMaxScaler**的转换器，并可以通过超参数feature_range进行更改。
标准化则是减去平均值再除以方差，受异常值的影响较小，不会把数值限制在一个特定的范围，对于有些算法比如神经网络来说可能存在问题。_Scikit-Learn_ 提供了一个标准化的转换器**StandardScaler**
>跟所有转换一样，缩放器仅用来拟合训练集，而不是完整的数据集

####Transformation Pipelines
_Scikit-Learn_ 提供了Pipeline类来支持一系列的转换，以下为测试：
```python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler

num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy="median")),
    ('attribs_adder',CombinedAttributesAdder()),
    ('std_scaler',StandardScaler())
])

housing_num_tr = num_pipeline.fit_transform(housing_num)
```
Pipeline构造函数会通过一系列名称/估计器(name/estimator)的配对来定义步骤的序列，除了最后一个之前的估计器必须是转换器（有fit_transform()方法)
当对Pipeline调用fit()方法时会在所有转换器上调用fit_transfrom()方法，将前面调用的输出作为参数传递给下一个调用方法，直到最后一个估算器只调用fit()方法
Pipeline的方法与最终估计器的调用方法一致，本例中最后一个估计器是StandardScaler，因此也可以直接使用transform()方法和fit_transform()方法
接下来，为了同时在分类值上应用LabelBinarizer（把文本转换为独热），需要用到Scikit-Learn的**FeatureUnion**类，即特征联合。可以接受多个待转换对象，只需分别提供转换器列表（可以是Pipelines），就能依次调用transform()或者fit()方法，并将输出串联到复合特征空间。以下是一个完整的处理数值和分类属性的Pipline：
```python
from sklearn.pipeline import FeatureUnion

num_attribs = list(housing_num) #即housing_num中各属性
cat_attribs = ["ocean_proximity"]

num_pipeline = Pipeline([
    ('selector',DataFrameSelector(num_attribs)), #选择待处理的数值特征
    ('imputer',SimpleImputer(strategy="median")),      #求出中位数
    ('attribs_adder',CombinedAttributesAdder()), #加上组合属性
    ('std_scaler',StandardScaler()),             #进行标准化
])

cat_pipeline = Pipeline([
    ('selector',DataFrameSelector(cat_attribs)), #选出待处理分类特征
    ('label_binarizer',LabelBinarizer()),        #转换为独热向量
])

full_pipeline = FeatureUnion(transformer_list=[
    ("num_pipeline",num_pipeline),               
    ("cat_pipeline",cat_pipeline),
])
```
对了，还需要定义一下上例中的DataFrameSelector()，它选出指定类型特征并将结果从DataFrame转换为Numpy数组:
```python
from sklearn.base import BaseEstimator, TransformerMixin
class DataFrameSelector(BaseEstimator, TransformerMixin):
    def __init__(self, attribute_names):
        self.attribute_names=attribute_names
    def fit(self, X, y=None):
        return self
    def transform(self, X):
        return X[self.attribute_names].values
```
接下来正式处理housing数据集
```python
housing_prepared = full_pipeline.fit_transform(housing)
housing_prepared
```
此处报错，因为Pipeline假设LabelBinarizer方法会接受三个参数即fit_transform(self, X, y)而实际上它现在的fit_tranform只用到fit_transform(self, X)
解决办法，创建一个定制转换器可以接受三个参数
```python
from sklearn.base import TransformerMixin #gives fit_transform method for free
class MyLabelBinarizer(TransformerMixin):
    def __init__(self, *args, **kwargs):
        self.encoder = LabelBinarizer(*args, **kwargs)
    def fit(self, x, y=0):
        self.encoder.fit(x)
        return self
    def transform(self, x, y=0):
        return self.encoder.transform(x)
```
在FeatureUnion的Pipeline中替换,再使用：
```python
housing_prepared = full_pipeline.fit_transform(housing)
housing_prepared
```
