
import React, { useCallback, useContext, useEffect, useRef} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { GRAPH_ALGORITHM, layout } from '../constants';

import DropdownButtonEdge from './DropdownButtonEdge';

import DropdownButtonNode from './DropdownButtonNode';
import canvasContext from '../assets/context/CanvasContext';

import SelectAlgo from './SelectAlgo';
import SelectStartNode from './SelectStartNode';

import Switch from '@mui/material/Switch';
import Run from './Run';
import Reset from './Reset';
import ClearGraph from './ClearGraph';

import DistanceVisualizer from './DistanceVisualizer';
import NodeMenu from './NodeMenu';
import EdgeMenu from './EdgeMenu';
import Sidebar, { SidebarItem } from './Sidebar';
import PlayArrowRoundedIcon from '@mui/icons-material/PlayArrowRounded';
import AnimationSlider from './animation-slider';
import { Button } from '@mui/material';
import RandomGraph from './RandomGraph';


const Graph = () => {
  const context = useContext(canvasContext);
  const {
    setAnimationTime,isRunning
    ,algo, startNode, cy, setCy, elements, stylesheet, toggleWeighted, toggleDirected, createGraph, graph
    , isDirected, isWeighted , deleteNode,deleteEdge
  } = context;

  const showTable = ()=>{
    return (algo === GRAPH_ALGORITHM.DIJKSTRA || algo === GRAPH_ALGORITHM.FLOYD_WARSHALL || algo === GRAPH_ALGORITHM.BELLMAN_FORD);
  }

  const onCyReady = useCallback((cyGot) => {
      setCy(cyGot);



      // cy?.on('cxttap','node',(e) => {
      //   e.preventDefault();
      //   var node = e.target;
      //   console.log(`To remove : `,node.id());
      //   setAnchorEl(node);
      // })
  
      // cy?.on('cxttap','edge',(e) => {
      //   var edge = e.target;
      //   console.log(`To remove : `,edge.id());
        
      // })

  }, [cy]);

  useEffect(() => {
   
  }, [stylesheet]);

  
  const handleChangeDierectedness = () => {
    toggleDirected();
  }
  const handleChangeWeightedness = () => {
    toggleWeighted();
  }



  return (
    <div className="h-screen ">

       <div className='flex flex-row justify-left items-center bg-amber-400 py-4'>
          <NodeMenu cy={cy} deleteNode={deleteNode} disabled={isRunning}/>
          <EdgeMenu cy={cy} deleteEdge={deleteEdge} disabled={isRunning}/>
          <DropdownButtonNode disabled={isRunning} />
          <DropdownButtonEdge disabled={isRunning} />
          <div><Switch disabled={isRunning} checked={isDirected} onClick={handleChangeDierectedness}/>Directed</div>
          <div><Switch disabled={isRunning} checked={isWeighted} onClick={handleChangeWeightedness}/>Weighted</div>
          <SelectAlgo disabled={isRunning} />
          <SelectStartNode disabled={isRunning} />
          <AnimationSlider setAnimationTime={setAnimationTime} disabled={isRunning} />
      </div>
    
      <div className="canvasComponent flex flex-row h-full w-full">
        <div className='fixed w-44 py-2 px-2 mt-2 left-1'>
            {/* <Sidebar>
              <SidebarItem component={<Run />}/>
              <SidebarItem component={<ClearGraph />}/>
              <SidebarItem component={<Reset />}/>
            </Sidebar> */}
        </div>
        <div className='w-full' id="cy-container">
            <CytoscapeComponent
              elements={elements}
              stylesheet={stylesheet}
              layout={layout}
              style={{
                width: `100%`,
                height: '100%',
                backgroundColor: '#9da1f3ba'
              }}
              cy={onCyReady}
              wheelSensitivity={0.05}
              
            />
        </div>
        {showTable() &&
          <aside className='fixed w-44 py-2 px-2 mt-2 right-1 hover:cursor-pointer'>
              <DistanceVisualizer />
          </aside>
        }
         <aside className='fixed w-44 py-2 mt-2 left-0 hover:cursor-pointer'>
          <div className='mx-4'>
              <Run disabled={isRunning} />
              <Reset disabled={isRunning}/>
              <ClearGraph disabled={isRunning} />
              <RandomGraph disabled={isRunning} />
          </div>
          </aside>
      </div>
    </div>
  );
};

export default Graph;

