import React, { useTransition } from 'react'
import canvasContext from './CanvasContext'
import { useState } from 'react'
import { ANIMATION_TIME_MS, ANIMATION_TIME_MS_SPEED_HIGH, GRAPH_ALGORITHM, initalStylesheet, initialElements, RUN_STATE, TABLE_ROW_BG_COLOR, TABLE_ROW_BG_FLASH_COLOR } from '../../constants';
import { generateRandomPosition } from '../../utils/formatColor';
import { toast } from 'react-toastify';
import { FaArrowUpFromGroundWater } from 'react-icons/fa6';

export default function CanvasState(props) {
  const [cy, setCy] = useState(null);
  const [stylesheet, setStylesheet] = useState(initalStylesheet);
  const [algo, setAlgo] = useState(GRAPH_ALGORITHM.DEFAULT);
  const [elements, setElements] = useState(initialElements);
  const [isDirected, setIsDirected] = useState(true);
  const [isWeighted, setIsWeighted] = useState(true);
  const [nodes, setNewNode] = useState(elements?.filter((e) => e.data.source === undefined).map((f) => f.data.id));
  const [startNode, setStartNode] = useState(nodes.length > 0 ? nodes[0] : null);
  // console.log("elements***: ",elements);

  const [isPending, startTransition] = useTransition();
  const [edges, setNewEdge] = useState(elements?.filter((e) => e.data.source !== undefined).map((f) => f.data.id));
  const [graph, setGraph] = useState({});
  const [tableRowBgColor, setTableRowBgColor] = useState(TABLE_ROW_BG_COLOR);
  const [activeTableRowId, setActiveTableRowId] = useState(null);
  const [activeTableColumnId, setActiveTableColumnId] = useState(null);
  const [distanceArray, setDistanceValue] = useState(nodes.reduce((acc, node) => {
    acc[node] = Infinity;
    return acc;
  }, {}));


  const [animationTime, setAnimationTime] = useState(ANIMATION_TIME_MS);
  const [isRunning, setIsRunning] = useState(false);
  const [topoSortedNodeIds,setTopoSortedNodeIds] = useState(nodes);
  
  const [runEnded,setRunEnded] = useState(RUN_STATE.STARTED);

  const nodeMapping = {};

  const computeAdjacencyMatrix = (nodes_array,new_elements) => {

    var use_nodes_array = nodes_array;
    if(use_nodes_array === undefined || use_nodes_array === null){
       use_nodes_array = nodes;
    }
      
    use_nodes_array.forEach((node, index) => {
      nodeMapping[node] = index;
    });


    const matrix = [];
    let n = use_nodes_array.length;
    for (let i = 0; i < n; i++) {
      matrix[i] = [];
      for (let j = 0; j < n; j++) {
        if (i == j) {
          matrix[i][j] = 0;
          continue;
        }
        matrix[i][j] = Infinity;
      }
    }

      var use_elements = new_elements;
      if(use_elements === undefined || use_elements === null){
         use_elements = elements;
      }
    
      use_elements.forEach((e) => {
        if (e.data.source !== undefined) {
          const source = e.data.source;
          const target = e.data.target;
          const u = nodeMapping[source];
          const v = nodeMapping[target];
  
          matrix[u][v] = e.data.weight;
          if (!isDirected) { // For Undirected graph. 
            matrix[v][u] = e.data.weight;
          }
        }
      })

    // console.log('adjacency matrix: ',matrix);

    return matrix;
  }

  const [adjacencyMatrix, setAdjacencyMatrix] = useState(
    computeAdjacencyMatrix()
  )

  const createAdjacencyMatrixAndSetStartNode = (callback,nodes_array,new_elements)=>{
    var use_nodes_array = nodes_array;
    if(use_nodes_array === undefined || use_nodes_array === null){
        use_nodes_array = nodes;
    }

    var use_elements = new_elements;
    if(use_elements === undefined || use_elements === null){
        use_elements = elements;
    }

    setAdjacencyMatrix(computeAdjacencyMatrix(use_nodes_array,use_elements));
    setStartNode(startNode === null ? use_nodes_array[0] : startNode);
    if(callback){
      callback();
    }
  }

  const createGraph = (callback) => {
    var graphObj = {};
    elements.map((element) => {
      // element is node
      if (element.position) {
        graphObj[element.data.id] = [];
      }
      // element is edge
      else if (element.data.source) {
        graphObj[element.data.source].push([element.data.target, element.data.weight]);
        if (!isDirected) {
          graphObj[element.data.target].push([element.data.source, element.data.weight]);
        }
      }
      return element;
    })
    // console.log('local ',graphObj);
    setGraph((g) => graphObj);

    if (callback) {
      callback(graphObj);
    }


  }

  const checkNodeExistence = (node) => {
    var found = false;
    nodes.forEach((e) => {
      if (e === node) {
        found = true;
        return;
      }
    })
    return found;
  }

  const checkEdgeExistence = (edge) => {
    var found = false;
    edges.forEach((e) => {
      if (e === edge) {
        found = true;
        return;
      }
    })
    return found;
  }


  const addEdge = (id, source, target, weight) => {
    const newEdge = { data: { id: id, source: source, target: target, weight: weight } };

    if (checkNodeExistence(source) && checkNodeExistence(target)) {
      // console.log("edges**: ", edges);
      // console.log("id**:  ", id);


      if (checkEdgeExistence(id)) {
        toast.error("Edge already exists!");
      }
      else {
        setElements([...elements, newEdge]);
        setNewEdge([...edges, id]);
      }
    }
    else toast.error("Node does not exist!");

  }

  const updateEdge = (id, weight) => {
    const edgeIndex = elements.findIndex(edge => edge.data.id === id);

    if (edgeIndex !== -1) {
      const updatedElements = elements.map((edge, index) => {
        if (index === edgeIndex) {
          return { ...edge, data: { ...edge.data, weight: weight } };
        }
        return edge;
      });
      setElements(updatedElements);
    } else {
      toast.error("Edge does not exist!");
    }

    const [src, dest] = id.split('-');
    const srcInd = nodeMapping[src];
    const destInd = nodeMapping[dest];

    changeDistanceInMatrix(srcInd, destInd, weight);
  };


  const deleteEdge = (id) => {
    let found = checkEdgeExistence(id);
    if (found) {
      // 1. edges array update
      const updatedEdges = edges.filter(edge => edge !== id);
      setNewEdge(updatedEdges);
      // 2. elements update
      const updatedElements = elements.filter(element => {
        if (element.data.id === id) {
          return false;
        }
        return true;
      });
      setElements(updatedElements);
    } else {
      toast.error("Edge does not exist");
    }

  }

  const addNode = (id) => {
    console.log("node id at add node: ", id);
    let found = checkNodeExistence(id);
    if (!found) {
      setNewNode([...nodes, id]);

      const { x, y } = generateRandomPosition();
      const newNode = { data: { id: id }, position: { x: x, y: y } };
      setElements([...elements, newNode]);

      setDistanceValue((prev) => ({
        ...prev,
        [id]: Infinity,
      }));
    }
    else {
      toast.error("Node already exists!");
    }
  }

  const deleteNode = (id) => {
    let found = checkNodeExistence(id);
    if (found) {
      //1. nodes array update
      const updatedNodes = nodes.filter(node => node !== id);
      setNewNode(updatedNodes);


      // 2. edges array update
      const updatedEdges = edges.filter(edge => {
        const [first, second] = edge.split('-');

        if (first === id || second === id) {
          return false;
        }
        else return true;
      })

      setNewEdge(updatedEdges);
      // console.log('updated edges ', updatedEdges);

      // 3. elements update
      const updatedElements = elements.filter(element => {
        if (element.data.id === id) {
          return false;
        }
        if (element.data.source === id || element.data.target === id) {
          return false;
        }
        return true;
      });
      setElements(updatedElements);

      // Remove the node from the distanceValue object
      const updatedDistanceValue = { ...distanceArray };
      delete updatedDistanceValue[id];
      setDistanceValue(updatedDistanceValue);
    } else {
      toast.error("Node does not exist");
    }
  };
  const toggleWeighted = () => {
    const newWeighted = !isWeighted;
    setIsWeighted(newWeighted);
    //  setIsDirected(!isDirected);
    const newStyleSheet = stylesheet.map((sheet) => {
      if (sheet.selector === 'edge') {
        sheet.style.label = newWeighted ? 'data(weight)' : '';
      }
      return sheet;
    });

    setStylesheet(newStyleSheet);

    cy?.style().clear().fromJson(stylesheet).update();
  }

  const toggleDirected = () => {
    const newDirected = !isDirected;
    setIsDirected(newDirected);
    const newStyleSheet = stylesheet.map((sheet) => {
      if (sheet.selector === 'edge') {
        sheet.style['target-arrow-shape'] = newDirected ? 'triangle' : '';
      }
      return sheet;
    });

    setStylesheet(newStyleSheet);

    cy?.style().clear().fromJson(stylesheet).update();
  }



  const changeStartNode = (node) => {
    const check = checkNodeExistence(node);
    if (check) {
      setStartNode(node);
      changeDistance(node, 0);
    }
    else {
      toast.error("Node does not exist!")
    }
  }

  const clearGraph = () => {
    setElements([]);
    setDistanceValue({});
    setNewNode([])
    setStartNode(null);
    setNewEdge([]);
    setAdjacencyMatrix([]);
  }



  const changeDistance = (id, newDistance) => {
    setDistanceValue((prev) => ({
      ...prev,
      [id]: newDistance,
    }));
  }

  const createAndSetDistancetoInfinity = (new_nodes) => {
       const new_dist_array = new_nodes.reduce((acc, node) => {
        acc[node] = Infinity;
        return acc;
      }, {}); 
       setDistanceValue(new_dist_array);
  }

  const setDistanceToInfinity = () => {
    setDistanceValue((prev) => ({
      ...prev,
      ...Object.keys(prev).reduce((acc, key) => {
        acc[key] = Infinity;
        return acc;
      }, {})
    }))
    setAdjacencyMatrix(computeAdjacencyMatrix());
  }

  const changeDistanceInMatrix = (u, v, wt) => {
    setAdjacencyMatrix(prevMatrix => {
      const newMatrix = prevMatrix.map(row => row.slice());
      newMatrix[u][v] = wt;
      return newMatrix;
    });
  }

  return (
    <canvasContext.Provider value={{
      setRunEnded,runEnded,
      topoSortedNodeIds,
      setTopoSortedNodeIds,
      createAndSetDistancetoInfinity,
      setElements,
      setNewEdge,
      setNewNode,
      setIsRunning,
      isRunning,
      setAnimationTime,
      animationTime,
      updateEdge, deleteEdge,
      deleteNode, setActiveTableRowId, setActiveTableColumnId,
      setTableRowBgColor, activeTableRowId, activeTableColumnId, tableRowBgColor,
      setDistanceToInfinity, nodes, distanceArray, changeDistance,
      clearGraph, isPending, startTransition, startNode, changeStartNode,
      algo, setAlgo, createGraph, graph, cy, setCy, toggleWeighted, stylesheet,
      toggleDirected, isDirected, isWeighted, elements, addEdge, addNode,
      adjacencyMatrix, changeDistanceInMatrix, nodeMapping, createAdjacencyMatrixAndSetStartNode
    }}>
      {props.children}
    </canvasContext.Provider>
  )
}
