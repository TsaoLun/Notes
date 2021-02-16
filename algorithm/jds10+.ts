//--- Adelson-Velskii-Landi 自平衡树 ---
//左右子树高度之差最多为 1

const { BinarySearchTree, defaultCompare } = require ('./jds10');
const aNode = require ('./jds10').Node;

class AVLTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    getNodeheight(node) {
        if (node == null) {
            return -1;
        }
        //节点的高度是从节点到其任意子节点的边的最大值
        return Math.max(
            this.getNodeheight(node.left), this.getNodeheight(node.right)
        ) + 1;
    }

    //计算平衡因子
    getBalanceFactor(node) {
        const heightDifference = this.getNodeheight(node.left) - this.getNodeheight(node.right);
        return heightDifference; //-2, -1, 0, 1, 2
    }

    //AVL 旋转 ???
    //LL: 向右单旋转 Z-X-Y (Y根节点变换为X)
    rotationLL(node) {
        //node.right 不变，修改 node.left
        const tmp = node.left; //将 X (node.left) 置于 Y 所在的位置 (声明新的根节点 tmp ，存储 node.left 信息)
        node.left = tmp.right; //将节点 Y 的左侧子节点设为 X 的右子节点 (修改 node.left: 存储原 node.key 节点信息即 tmp.right，node.right )
        tmp.right = node; //将 X 右子节点设为节点 Y (tmp.right 即修改后的 node )
        return tmp;
    }

    //RR: 向左单旋转(node.left 不变，修改 node.right)
    rotationRR(node) {
        const tmp = node.right; //存储 node.right 
        node.right = tmp.left; //修改 node.right 为 tmp.left
        tmp.left = node; //修改 tmp.left 为 node
        return tmp;
    }

    rotationLR(node) {
        node.left = this.rotationRR(node.left);
        return this.rotationLL(node);
    }

    rotationRL(node) {
        node.right = this.rotationLL(node.right);
        return this.rotationRR(node);
    }

    //向 AVL 树插入节点

    //从 AVL 树中移除节点

}

//----- 红黑树 -----

//包含多次插入和删除的自平衡树(AVL树依靠旋转)
//1. 树的根节点是黑的，叶节点也都是黑的
//2. 如果一个节点是红的，那么它的两个子节点都是黑的
//3. 不能有两个相邻的红节点，一个红节点不能有红的父节点或子节点
//4. 从给定的节点到它的后代节点的所有路径包含相同数量的黑色节点

const Colors = {
    BLACK: 0,
    RED: 1
}

class RedBlackTree<T> extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn);
        this.compareFn = compareFn;
        this.root = null;
    }

    //需要一种方法使返回值的类型与传入参数的类型是相同的，范型 T
    insert(key: T) {
        if (this.root == null) {
            this.root = new RedBlackNode(key);
            this.root.color = Colors.BLACK;
        } else {
            const newNode = this.insertNode(this.root, key);
            this.fixTreeProperties(newNode);
        }
    }

    insertNode(node, key) {
        if (key < node.key) {
            if (node.left == null) {
                node.left = new RedBlackNode(key);
                node.left.parent = node;
                return node.left;
            } else {
                return this.insertNode(node.left, key);
            } 
        } else if (node.right == null) {
            node.right = new RedBlackNode(key);
            node.right.parent = node;
            return node.right;
        } else {
            return this.insertNode(node.right, key);
        }
    }

    //插入后验证红黑树属性
    //...暂略...
}

class RedBlackNode extends aNode {
    constructor(key) {
        super(key);
        this.key = key;
        this.color = Colors.RED;
        this.parent = null;
    }

    isRed() {
        return this.color === Colors.RED;
    }
}