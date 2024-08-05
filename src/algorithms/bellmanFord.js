import {  sleep, STATE } from "../constants";
import {  animateEdge, animateNode, flashTableRowBgColor } from "../utils/formatColor";

export const bellmanFord = async (cy, graph, startNode, isDirected, isWeighted, changeDistance, nodes,
  setActiveTableRowId,setTableRowBgColor,animationTime
) => {
    // console.log('bellmanFord called');
    // Implementation for Bellman-Ford algorithm
    // Step 1: Initialize distances from src to all other vertices as INFINITE
    changeDistance(startNode, 0);
    // console.log("startnode: ",startNode);
    
    const distances = {};
    for (let i = 0; i<nodes.length; i++) {
      
        distances[nodes[i]] = Infinity;
    }

    distances[startNode] = 0;
    
    let edges = [];

    for(let i = 0; i<nodes.length; i++){
      for(let j = 0; j<graph[nodes[i]].length; j++){
        const edge = graph[nodes[i]][j];
        
        const source = nodes[i];
        const target = edge[0];
        const weight = edge[1];
        edges.push({source, target, weight});
        // console.log("source: ",source,"target: ",target,"weight: ",weight);
      }
    }
    let counter = 0;
    // console.log('edges; ',edges);
    

    await animateNode(cy,startNode,STATE.VISITED,animationTime);
    // Step 2: Relax all edges |V| - 1 times.
    for (let i = 0; i < nodes.length-1; i++) {
        for(let j = 0; j<edges.length; j++){
          const src = edges[j].source;
          const dest = edges[j].target;
          const weight = edges[j].weight;
  
            if (distances[src] !== Infinity && ((distances[src] + weight) < distances[dest])) {
              // console.log("counter: ",counter++);

              await animateEdge(cy,src, dest,STATE.VISITED,animationTime,isDirected);
              await animateNode(cy,dest,STATE.VISITED,animationTime);
              await flashTableRowBgColor(dest,animationTime,setActiveTableRowId,setTableRowBgColor);
              await sleep(animationTime);

              distances[dest] = distances[src] + weight;
              changeDistance(dest, distances[dest]);
            }
        }
    }

    // Step 3: Check for negative-weight cycles.
    for(let i = 0; i<edges.length; i++){
      const src = edges[i].source;
      const dest = edges[i].target;
      const weight = edges[i].weight;
      // console.log("weight in loop: ", weight);
      

      if (distances[src] !== Infinity && ((distances[src] + weight) < distances[dest])) {
        // console.log("Negative-weight cycle detected!");
          return false;
      }
    }
    return true;
  };