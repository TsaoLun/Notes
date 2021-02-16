//---------- 图 GRAPH ----------
//图是一组由边连接的节点
//任何二元关系都可以用图来表示
//G = (V, E) , 其中 V 为一组顶点，E 为一组边，连接 V 中的顶点
//度：相邻顶点的数量
//简单路径：不包含重复的顶点（包括环）
//连通：每两个顶点间都存在路径
//强连通：有向图中两个顶点在双向上都存在路径

const { Dictionary } = require("./jds8");

class Graph {
    constructor(isDirected = false) {
        this.isDirected = isDirected; //是否有向
        this.vertices = []; //顶点名字
        this.adjList = new Dictionary(); //邻接表
    }

    //添加新的顶点
    addVertex(v) {
        if (!this.vertices.includes(v)) {
            this.vertices.push(v);
            this.adjList.set(v, []);
        }
    }

    //建立连接的两个顶点'
    addEdge(v, w) {
        if (!this.adjList.get(v)) {
            this.addVertex(v);
        }
        if (!this.adjList.get(w)) {
            this.addVertex(w);
        }
        this.adjList.get(v).push(w);
        if (!this.isDirected) {
            this.adjList.get(w).push(v);
        }
    }

    //返回顶点名字列表
    getVertices() {
        return this.vertices;
    }

    //返回临接表
    getAdjList() {
        return this.adjList;
    }

    //输出图
    toString() {
        let s = '';
        for (let i = 0; i < this.vertices.length; i++) {
            s += `${this.vertices[i]} -> `;
            const neighbors = this.adjList.get(this.vertices[i]);
            for (let j = 0; j < neighbors.length; j++) {
                s += `${neighbors[j]}`;
            }
            s += `\n`;
        }
        return s;
    }
}

const graph = new Graph();
const myVerticles = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
for (let i = 0; i < myVerticles.length; i++) {
    graph.addVertex(myVerticles[i]);
}
graph.addEdge('A', 'B');
graph.addEdge('A', 'C');
graph.addEdge('A', 'D');
graph.addEdge('C', 'D');
graph.addEdge('C', 'G');
graph.addEdge('D', 'G');
graph.addEdge('D', 'H');
graph.addEdge('B', 'E');
graph.addEdge('B', 'F');
graph.addEdge('E', 'I');

console.log(graph.toString());