export const VISITED_COLOR_EDGE = '#e9ff00';
export const UNVISITED_COLOR_EDGE = '#8ec639';
export const INITIAL_COLOR_EDGE = '#8ec639';


export const VISITED_COLOR_NODE = '#00ff53';
export const UNVISITED_COLOR_NODE = '#2f753d';
export const INITIAL_COLOR_NODE = '#2f753d';


export const TABLE_ROW_BG_COLOR = '#FFFFFF';
export const TABLE_ROW_BG_FLASH_COLOR = '#C8C8C8';

// speed 0 --> 1000 , 

export const ANIMATION_TIME_MS_SPEED_LOW = 1000;
export const ANIMATION_TIME_MS_SPEED_HIGH = 100;
export const INITIAL_SPEED = 30;
export const MIN_SPEED = 0;
export const MAX_SPEED = 100;


export var ANIMATION_TIME_MS = 300;

export const MIN_NODE_COUNT = 2;
export const MAX_NODE_COUNT = 10;

export const MIN_EDGE_COUNT = 1;

export const MIN_WEIGHT = 1;
export const MAX_WEIGHT = 10;
 

export const getRandomEdgeExcludingBlacklist = (edgesArrray, blacklistedArray) => {
  const filteredEdges = edgesArrray.filter(edge => !blacklistedArray.includes(edge.data.id));

  if (filteredEdges.length === 0) {
    return null;
  }
  const randomIndex = Math.floor(Math.random() * filteredEdges.length);
  return filteredEdges[randomIndex];
};


export const generateRandomIntegerInRangeInclusive = (a, b) => {
  // Ensure a and b are integers
  const min = Math.ceil(a);
  const max = Math.floor(b);
  
  // Generate a random integer between min and max (inclusive)
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export const STATE =  Object.freeze({
    VISITED : 1,
    UNVISITED : 0
})

export const RUN_STATE =  Object.freeze({
  STARTED : 2,
  RUNNING : 1,
  ENDED : 0,
})

export const GRAPH_ALGORITHM = Object.freeze({
  DEFAULT : "NO ALGO",
  DEPTH_FIRST_SEARCH: "DFS",
  BREADTH_FIRST_SEARCH: "BFS",
  DIJKSTRA: "DIJKSTRA",
  BELLMAN_FORD: "BELLMAN FORD",
  A_STAR: "A STAR",
  FLOYD_WARSHALL: "FLOYD WARSHALL",
  // KRUSKAL: "KRUSKAL",
  // PRIM: "PRIM",
  MST : "MINIMUM SPANNIG TREE",
  TOPOLOGICAL_SORT: "TOPOLOGICAL SORT",
  TARJAN: "TARJAN",
  KOSARAJU: "KOSARAJU"
});

export const initialElements = [
    { data: { id: 'a' }, position: { x: 250, y: 100 } },
    { data: { id: 'b' }, position: { x: 200, y: 200 } },
    { data: { id: 'c' }, position: { x: 300, y: 150 } },
    { data: { id: 'd' }, position: { x: 400, y: 100 } },
    { data: { id: 'e' }, position: { x: 500, y: 200 } },
    { data: { id: 'a-b', source: 'a', target: 'b' , weight : 1} },
    { data: { id: 'b-c', source: 'b', target: 'c' , weight : 2} },
    { data: { id: 'c-d', source: 'c', target: 'd' , weight : 3} },
    { data: { id: 'd-e', source: 'd', target: 'e' , weight : 4} },
    { data: { id: 'a-c', source: 'a', target: 'c' , weight : 5} },
    { data: { id: 'b-d', source: 'b', target: 'd' , weight : 5} },
  ];

export const initalStylesheet = [
  {
    selector: 'node',
    style: {
      'background-color': INITIAL_COLOR_NODE,
      'label': 'data(id)',
      'text-valign': 'center',
      'color': '#fff',
      'font-size': '15px',
      'width': 25,
      'height': 25
    }
  },
  {
    selector: 'edge',
    style: {
      'label' : 'data(weight)',
      'color' : '#fff',
      'text-margin-x': '10px',           // Horizontal offset from the edge
      'text-margin-y': '10px',           // Vertical offset from the edge
      // 'text-rotation': 'autorotate',
     
      'width': 3,
      'line-color': INITIAL_COLOR_EDGE,
      'target-arrow-color': INITIAL_COLOR_EDGE,
      'target-arrow-shape': 'triangle',
      'curve-style': 'unbundled-bezier',
      'control-point-distances': 50, // Control distances can be adjusted dynamically
      'control-point-weights': 0.5,
      'line-fill': 'solid'
    }
  }
];

export const layout = {
  name: 'preset',
};