import { Button } from '@mui/material'
import React, { useContext, useState } from 'react'
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import canvasContext from '../assets/context/CanvasContext';
import { dfs } from '../algorithms/dfs';
import { GRAPH_ALGORITHM, RUN_STATE } from '../constants';
import { toast } from 'react-toastify';
import { bfs } from '../algorithms/bfs';
import { dijkstra } from '../algorithms/dijkstra';
import { bellmanFord } from '../algorithms/bellmanFord';
import { aStar } from '../algorithms/aStar';
import { floydWarshall } from '../algorithms/floydWarshall';
import { kruskal } from '../algorithms/kruskal';
import { prim } from '../algorithms/prim';
import { topologicalSort } from '../algorithms/topologicalSort';
import { tarjan } from '../algorithms/tarjan';
import { kosaraju } from '../algorithms/kosaraju';

const Run = ({className,disabled}) => {

    const context = useContext(canvasContext);
    const {animationTime,startNode, cy,createGraph,algo,nodes
      ,isDirected,isWeighted, changeDistance,setActiveTableRowId,setTableRowBgColor,
      setIsRunning,isRunning, changeDistanceInMatrix, setActiveTableColumnId, nodeMapping, adjacencyMatrix, createAdjacencyMatrixAndSetStartNode
      ,setTopoSortedNodeIds ,setRunEnded
    } = context;

    
    
    
   const onClick = async() => {
    if(!cy) return;

  
    
    setIsRunning(true);
    setRunEnded(RUN_STATE.RUNNING);
    createAdjacencyMatrixAndSetStartNode(
        createGraph(async(updatedGraph) => {

            switch(algo) {
                case GRAPH_ALGORITHM.DEPTH_FIRST_SEARCH:
                    await dfs(cy,updatedGraph,startNode,isDirected,isWeighted,animationTime);
                    break;

                case GRAPH_ALGORITHM.BREADTH_FIRST_SEARCH:
                    await bfs(cy, updatedGraph, startNode, isDirected, isWeighted,animationTime);
                    break;
              
                  case GRAPH_ALGORITHM.DIJKSTRA:
                    await dijkstra(cy, updatedGraph, startNode, isDirected, isWeighted, changeDistance,setActiveTableRowId,setTableRowBgColor,animationTime);
                    break;
              
                  case GRAPH_ALGORITHM.BELLMAN_FORD:
                    await bellmanFord(cy, updatedGraph, startNode, isDirected, isWeighted, changeDistance, nodes,
                      setActiveTableRowId,setTableRowBgColor,animationTime
                    ).then((value)=>{
                      if(!value) toast.error("Negative cycle present in this graph!");
                    })
                    break;
              
                  case GRAPH_ALGORITHM.A_STAR:
                    await aStar(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.FLOYD_WARSHALL:
                    await floydWarshall(cy, updatedGraph, startNode, isDirected, isWeighted, nodes, changeDistanceInMatrix,animationTime, setActiveTableColumnId, setActiveTableRowId,setTableRowBgColor);
                    break;
              
                  case GRAPH_ALGORITHM.MST:
                    await prim(cy, updatedGraph, startNode, isDirected, isWeighted,  nodeMapping, adjacencyMatrix, nodes, animationTime);
                    break;
              
                  case GRAPH_ALGORITHM.TOPOLOGICAL_SORT:
                    await topologicalSort(cy, updatedGraph, startNode, isDirected, isWeighted,animationTime,setTopoSortedNodeIds)
                    .then((value) => {
                       if(value == 0) toast.warning('Graph is undirected,Any possible order is topologically sorted.');
                       if(value == 1) toast.error('Cycle is present, Invalid topological sorting order');
                    })
                    break;
              
                  case GRAPH_ALGORITHM.TARJAN:
                    await tarjan(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
              
                  case GRAPH_ALGORITHM.KOSARAJU:
                    await kosaraju(cy, updatedGraph, startNode, isDirected, isWeighted);
                    break;
                default:
                    toast.error("Invalid algorithm selected");
            }
            setIsRunning(false);
            setRunEnded(RUN_STATE.ENDED);

          }) );
   };  

  return (
      <Button disabled={disabled} sx={{ width : '120px',margin : '10px 0px 10px 0px' ,backgroundColor : '#2882d7'}} onClick={onClick} variant='contained' 
      className={`flex flex-row justify-between items-center ${className}`}>
        <PlayArrowRoundedIcon className='h-4 w-4'  />
        <span className='ml-1'>Run</span>
      </Button>
  )
}

export default Run