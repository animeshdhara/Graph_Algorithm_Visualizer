import {  sleep, STATE } from "../constants";
import { animateEdge, animateNode,flashTableRowBgColor } from "../utils/formatColor";

class PriorityQueue {
    constructor() {
        this.nodes = [];
    }

    enqueue(priority, key) {
        this.nodes.push({ key, priority });
        this.sort();
    }

    dequeue() {
        return this.nodes.shift();
    }

    sort() {
        this.nodes.sort((a, b) => a.priority - b.priority);
    }

    isEmpty() {
        return this.nodes.length === 0;
    }
}

export const dijkstra = async (cy, graph, startNode, isDirected, isWeighted, changeDistance,setActiveTableRowId,setTableRowBgColor
    ,animationTime
) => {
    // console.log('dijkstra called');
    // Implementation for Dijkstra's algorithm
    changeDistance(startNode, 0);
    const distances = {};
    for (let node in graph) {
        distances[node] = Infinity;
    }
    distances[startNode] = 0;

    const pq = new PriorityQueue();
    pq.enqueue(0, startNode);
    const parent = {};
    parent[startNode] ='#'



    while (!pq.isEmpty()) {
        const { key: currentNode } = pq.dequeue();
        // console.log("node: ",currentNode," parent: ",parent[currentNode]);
        
        await animateEdge(cy,parent[currentNode], currentNode,STATE.VISITED,animationTime,isDirected);
        await animateNode(cy,currentNode,STATE.VISITED,animationTime);

        let neighbors = graph[currentNode];
        if(!neighbors) continue;

        for (const [neighbor, edgeWeight] of graph[currentNode]) {
            if(edgeWeight < 0) return false;
            const distance = parseInt(distances[currentNode], 10) + parseInt(edgeWeight, 10);

            if (distance < distances[neighbor]) {
                // console.log('updating dist start : ',neighbor);
                await flashTableRowBgColor(neighbor,animationTime,setActiveTableRowId,setTableRowBgColor);
                await sleep(animationTime);
                // console.log('updating dist end : ',neighbor);
                distances[neighbor] = distance;
                changeDistance(neighbor, distance);
                parent[neighbor] = currentNode;
                pq.enqueue(distance, neighbor);
            }
        }
    }

    // console.log("distance array: ",distances);
    return true;
};