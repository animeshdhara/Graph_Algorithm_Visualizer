
import {  STATE } from "../constants";
import {  animateEdge, animateNode } from "../utils/formatColor";


export const topologicalSort = async (cy, graph, startNode, isDirected, isWeighted,animationTime,setTopoSortedNodeIds) => {
    console.log('topologicalSort');

    if(!isDirected){
        return 0;
    }

    const inDegree = {};
    const queue = [];
    const sortedNodes = [];

  // Calculate in-degrees
    for (const node in graph) {
      inDegree[node] = 0; // Initialize in-degree for each node
    }

    for (const node in graph) {
      for (const [neighbor] of graph[node]) {
        if (inDegree[neighbor] !== undefined) {
          inDegree[neighbor]++;
        }
      }
    }

    // Enqueue nodes with in-degree 0
    for (const node in inDegree) {
      if (inDegree[node] === 0) {
        queue.push(node);
      }
    }

    // Process the nodes
    while (queue.length > 0) {
      const node = queue.shift();
      sortedNodes.push(node);

      if (graph[node]) {
        for (const [neighbor] of graph[node]) {
          await animateEdge(cy, node, neighbor, STATE.VISITED, animationTime, isDirected);
          await animateNode(cy, neighbor, STATE.VISITED, animationTime);
          
          inDegree[neighbor]--;

          if (inDegree[neighbor] === 0) {
            queue.push(neighbor);
          }
        }
      }
    }

  // Check if the topological sort is possible (i.e., no cycle detected)
  if (sortedNodes.length !== Object.keys(graph).length) {
    console.error('Graph has at least one cycle. Topological sort is not possible.');
    return 1;
  }

  setTopoSortedNodeIds(sortedNodes);
  return 2;
    
};
  