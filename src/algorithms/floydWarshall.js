import {  sleep, STATE } from "../constants";
import { flashTableRowBgColor,flashEdgeWithNodes } from "../utils/formatColor";

export const floydWarshall = async (cy, graph, startNode, isDirected, isWeighted, nodes, changeDistanceInMatrix,animationTime, setActiveTableColumnId, setActiveTableRowId,setTableRowBgColor) => {
    // console.log('floydWarshall called');
    // Implementation for Floyd-Warshall algorithm
    // console.log("graph begin: ",graph);
    
    const V = Object.keys(graph).length;
    // console.log("V: ",V);
    
    // Initialize the distance matrix with the graph's adjacency matrix
    const dist = [];
    for (let i = 0; i < V; i++) {
        dist[i] = [];
        dist[i][i] = 0;
        for(let j = 0; j<V; j++){
          if(j == i) continue;
          dist[i][j] = Infinity;
        }
    }

    // console.log("dist: ",dist);
    // console.log("nodes: ",nodes);
    

    const nodeMapping = {};
    nodes.forEach((node, index) => {
      nodeMapping[node] = index;
      });
    // console.log("node mapping : ",nodeMapping);
    

    for(let i = 0; i<nodes.length; i++){
      for(let j = 0; j<graph[nodes[i]].length; j++){
        const edge = graph[nodes[i]][j];
        
        const source = nodes[i].toLowerCase();
        const target = edge[0].toLowerCase();
        const u = nodeMapping[source];
        const v = nodeMapping[target];
        const weight = edge[1];
        // console.log("source: ",u," type: ",typeof(u),"target: ",v,"weight: ",weight, 'tp: ',typeof(weight));
        dist[u][v] = weight;
        
      }
    }

    // Apply Floyd-Warshall algorithm
    for (let k = 0; k < V; k++) {
        for (let i = 0; i < V; i++) {
            for (let j = 0; j < V; j++) {
                if ((dist[i][k] !== Infinity && dist[k][j] != Infinity)&& dist[i][k] + dist[k][j] < dist[i][j]) {
                    dist[i][j] = dist[i][k] + dist[k][j];
                    // console.log(`i : ${nodes[i]} j : ${nodes[j]}`);
                    await flashEdgeWithNodes(cy,nodes[i],nodes[j],STATE.VISITED,animationTime,isDirected);
                    await flashTableRowBgColor(i,animationTime,setActiveTableRowId,setTableRowBgColor);
                    await sleep(animationTime);
                    setActiveTableColumnId(j);
                    changeDistanceInMatrix(i,j,dist[i][j]);
                }
            }
        }
    }

    // console.log("distance for floyd warshal: ",dist);
    
  };
  