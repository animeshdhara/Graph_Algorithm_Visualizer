import { STATE } from "../constants";
import {  animateEdge, animateNode } from "../utils/formatColor";

export const bfs = async (cy, graph, startNode, isDirected, isWeighted,animationTime) => {

  
  let queue = [];
  queue.push(startNode);
  let visited = {};
  visited[startNode] = true;

  while (queue.length > 0) {
    let currentNode = queue.shift();
    await animateNode(cy,currentNode,STATE.VISITED,animationTime);

    let neighbors = graph[currentNode];
    if(!neighbors) continue;

    for (const [neighbor, edgeWeight] of graph[currentNode]) {
      if (!visited[neighbor]) {
        visited[neighbor] = true;
        queue.push(neighbor);
        await animateEdge(cy,currentNode,neighbor,STATE.VISITED,animationTime,isDirected);
        await animateNode(cy,neighbor,STATE.VISITED,animationTime);
      }
    }
  }
};




