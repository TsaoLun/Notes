//--- Adelson-Velskii-Landi 自平衡树 ---
//左右子树高度之差最多为 1
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var _a = require('./jds10'), BinarySearchTree = _a.BinarySearchTree, defaultCompare = _a.defaultCompare;
var aNode = require('./jds10').Node;
var AVLTree = /** @class */ (function (_super) {
    __extends(AVLTree, _super);
    function AVLTree(compareFn) {
        if (compareFn === void 0) { compareFn = defaultCompare; }
        var _this = _super.call(this, compareFn) || this;
        _this.compareFn = compareFn;
        _this.root = null;
        return _this;
    }
    AVLTree.prototype.getNodeheight = function (node) {
        if (node == null) {
            return -1;
        }
        //节点的高度是从节点到其任意子节点的边的最大值
        return Math.max(this.getNodeheight(node.left), this.getNodeheight(node.right)) + 1;
    };
    //计算平衡因子
    AVLTree.prototype.getBalanceFactor = function (node) {
        var heightDifference = this.getNodeheight(node.left) - this.getNodeheight(node.right);
        return heightDifference; //-2, -1, 0, 1, 2
    };
    //AVL 旋转 ???
    //LL: 向右单旋转 Z-X-Y (Y根节点变换为X)
    AVLTree.prototype.rotationLL = function (node) {
        //node.right 不变，修改 node.left
        var tmp = node.left; //将 X (node.left) 置于 Y 所在的位置 (声明新的根节点 tmp ，存储 node.left 信息)
        node.left = tmp.right; //将节点 Y 的左侧子节点设为 X 的右子节点 (修改 node.left: 存储原 node.key 节点信息即 tmp.right，node.right )
        tmp.right = node; //将 X 右子节点设为节点 Y (tmp.right 即修改后的 node )
        return tmp;
    };
    //RR: 向左单旋转(node.left 不变，修改 node.right)
    AVLTree.prototype.rotationRR = function (node) {
        var tmp = node.right; //存储 node.right 
        node.right = tmp.left; //修改 node.right 为 tmp.left
        tmp.left = node; //修改 tmp.left 为 node
        return tmp;
    };
    AVLTree.prototype.rotationLR = function (node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    };
    AVLTree.prototype.rotationRL = function (node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    };
    return AVLTree;
}(BinarySearchTree));
//----- 红黑树 -----
//包含多次插入和删除的自平衡树(AVL树依靠旋转)
//1. 树的根节点是黑的，叶节点也都是黑的
//2. 如果一个节点是红的，那么它的两个子节点都是黑的
//3. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
//4. 从给定的节点到它的后代节点的所有路径包含相同数量的黑色节点
var Colors = {
    BLACK: 0,
    RED: 1
};
var RedBlackTree = /** @class */ (function (_super) {
    __extends(RedBlackTree, _super);
    function RedBlackTree(compareFn) {
        if (compareFn === void 0) { compareFn = defaultCompare; }
        var _this = _super.call(this, compareFn) || this;
        _this.compareFn = compareFn;
        _this.root = null;
        return _this;
    }
    //需要一种方法使返回值的类型与传入参数的类型是相同的，范型 T
    RedBlackTree.prototype.insert = function (key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        }
        else {
            var newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    };
    RedBlackTree.prototype.insertNode = function (node, key) {
        if (key < node.key) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            }
            else {
                return this.insertNode(node.left, key);
            }
        }
        else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        }
        else {
            return this.insertNode(node.right, key);
        }
    };
    return RedBlackTree;
}(BinarySearchTree));
var RedBlackNode = /** @class */ (function (_super) {
    __extends(RedBlackNode, _super);
    function RedBlackNode(key) {
        var _this = _super.call(this, key) || this;
        _this.key = key;
        _this.color = Colors.RED;
        _this.parent = null;
        return _this;
    }
    RedBlackNode.prototype.isRed = function () {
        return this.color === Colors.RED;
    };
    return RedBlackNode;
}(aNode));
