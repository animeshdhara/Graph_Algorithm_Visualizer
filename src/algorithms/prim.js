import { ANIMATION_TIME_MS, STATE } from "../constants";
import { animateEdge, animateNode } from "../utils/formatColor";


class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(key, value) {
    this.heap.push({ key, value });
    this.bubbleUp();
  }

  extractMin() {
    if (this.heap.length === 1) {
      return this.heap.pop();
    }
    const min = this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown(0);
    return min;
  }

  bubbleUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index].value >= this.heap[parentIndex].value) break;
      [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
      index = parentIndex;
    }
  }

  bubbleDown(index) {
    const length = this.heap.length;
    const element = this.heap[index];
    while (true) {
      let leftChildIdx = 2 * index + 1;
      let rightChildIdx = 2 * index + 2;
      let swapIdx = null;

      if (leftChildIdx < length) {
        if (this.heap[leftChildIdx].value < element.value) {
          swapIdx = leftChildIdx;
        }
      }
      if (rightChildIdx < length) {
        if (
          (swapIdx === null && this.heap[rightChildIdx].value < element.value) ||
          (swapIdx !== null && this.heap[rightChildIdx].value < this.heap[swapIdx].value)
        ) {
          swapIdx = rightChildIdx;
        }
      }
      if (swapIdx === null) break;
      this.heap[index] = this.heap[swapIdx];
      this.heap[swapIdx] = element;
      index = swapIdx;
    }
  }

  isEmpty() {
    return this.heap.length === 0;
  }
}

export const prim = async (cy, graph, startNode, isDirected, isWeighted, nodeMapping, adjacencyMatrix, nodes, animationTime) => {
  console.log('prim called');
  // Implementation for Prim's algorithm
  const V = nodes.length;
  const key = Array(V).fill(Infinity);
  const parent = Array(V).fill(-1);
  const inMST = Array(V).fill(false);

  // console.log("adjacency matrix; ",adjacencyMatrix);
  // console.log("start node: ",startNode);
  
  const minHeap = new MinHeap();
  key[nodeMapping[startNode]] = 0;
  // console.log("nodeMapping[startNode]: ",nodeMapping[startNode]);
  
  minHeap.insert(nodeMapping[startNode], 0);

  while (!minHeap.isEmpty()) {
    const { key: u } = minHeap.extractMin();
    // console.log("u: ",u," type: ",typeof(u));
    
    inMST[u] = true;
    const currNode = nodes[u];
    const p = parent[u];
    await animateEdge(cy,p === -1?'#': nodes[p], currNode,STATE.VISITED,animationTime,isDirected);
    await animateNode(cy,currNode,STATE.VISITED,animationTime);

    for (let v = 0; v < V; v++) {
      if (adjacencyMatrix[u][v] !== Infinity && !inMST[v] && adjacencyMatrix[u][v] < key[v]) {
        key[v] = adjacencyMatrix[u][v];
        parent[v] = u;
        minHeap.insert(v, key[v]);
      }
    }
  }

};