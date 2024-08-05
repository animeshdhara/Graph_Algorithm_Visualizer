import { Button } from '@mui/material'
import React, { useContext } from 'react'
import canvasContext from '../assets/context/CanvasContext';

import { formEdgeId, generateRandomPosition, ResetColor } from '../utils/formatColor';
import { FaRandom } from "react-icons/fa";
import { generateRandomIntegerInRangeInclusive, getRandomEdgeExcludingBlacklist, MAX_NODE_COUNT, MAX_WEIGHT, MIN_EDGE_COUNT, MIN_NODE_COUNT, MIN_WEIGHT, RUN_STATE } from '../constants';
const RandomGraph = ({disabled}) => {

    const context = useContext(canvasContext);
    const { cy,setNewNode,setNewEdge,setElements,setRunEnded
      ,clearGraph,elements,createAdjacencyMatrixAndSetStartNode,createAndSetDistancetoInfinity
     } = context;

     const createRandomGraph = () => {
        const node_count = generateRandomIntegerInRangeInclusive(MIN_NODE_COUNT,MAX_NODE_COUNT);
        const max_posssible_edge = node_count*(node_count - 1)/2;
        const edge_count = generateRandomIntegerInRangeInclusive(MIN_EDGE_COUNT,max_posssible_edge);

        console.log(`node ${node_count} edge ${edge_count}`);
        // { data: { id: 'a-b', source: 'a', target: 'b' , weight : 1} }

        var nodes_array = [],edges_array = [],blacklist_id_array = [];
        for(var i=0;i<node_count;i++){
            const {x,y} = generateRandomPosition();
            const id = String.fromCharCode(i + 'a'.charCodeAt(0));
            nodes_array.push( { data: { id: id }, position: { x: x, y: y } });
        }
        
        // console.log('n ',nodes_array);

        const all_edges = [];
        for (let i = 0; i < nodes_array.length; i++) {
          for (let j = i + 1; j < nodes_array.length; j++) {
            const source = nodes_array[i].data.id;
            const target = nodes_array[j].data.id;
            all_edges.push({ data: { id: formEdgeId(source,target), source, target,
               weight: generateRandomIntegerInRangeInclusive(MIN_WEIGHT,MAX_WEIGHT) } });
          }
        }


        for(var i=0;i<edge_count;i++){
          
           const edge_random = getRandomEdgeExcludingBlacklist(all_edges,blacklist_id_array);
           if(!edge_random) break;
           blacklist_id_array.push(edge_random.data.id);
           edges_array.push(edge_random);
        }

        const new_elements = [...nodes_array,...edges_array];

        setElements(new_elements);

        const node_ids = nodes_array.map(node => node.data.id);
        const edge_ids = edges_array.map(edge => edge.data.id);

        setNewNode(node_ids);
        setNewEdge(edge_ids);

        createAndSetDistancetoInfinity(node_ids);
        
        createAdjacencyMatrixAndSetStartNode(() => {},node_ids,new_elements);

        setRunEnded(RUN_STATE.STARTED);

        // console.log('e ',edges_array);


     }


   
   const onClick = () => {
       if(!cy) return;
       ResetColor(cy,elements);
       clearGraph();
       createRandomGraph();
   };  

  return (

      <Button disabled={disabled} onClick={onClick}  sx={{ width : '120px',margin : '10px 0px 10px 0px' }} className='flex flex-row justify-right items-center'  variant='contained'>
        <FaRandom className='mr-0' />
        <span className='ml-2'>Random</span>
      </Button>
  )
}

export default RandomGraph





/*

    setDistanceValue({});
  
    setStartNode(null);
 
    setAdjacencyMatrix([]);


*/