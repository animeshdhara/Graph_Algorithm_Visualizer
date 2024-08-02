import { Button } from '@mui/material';
import React, { useCallback, useContext, useEffect, useTransition, useState} from 'react';
import CytoscapeComponent from 'react-cytoscapejs';
import { layout} from '../constants';

import DropdownButtonEdge from './DropdownButtonEdge';
import DropdownButtonNode from './DropdownButtonNode';
import canvasContext from '../assets/context/CanvasContext';
import { dfs } from '../algorithms/dfs';

import Checkbox from '@mui/material/Checkbox';
import SelectAlgo from './SelectAlgo';
import SelectStartNode from './SelectStartNode';

import Switch from '@mui/material/Switch';
import Run from './Run';

const Graph = () => {
  const context = useContext(canvasContext);
  const {startNode, cy,setCy,elements, stylesheet,toggleWeighted,toggleDirected,createGraph,graph
    ,isDirected,isWeighted
   } = context;
  

  const onCyReady = useCallback((cyGot) => {
    setCy(cyGot);

    

  }, []);

  useEffect(()=>{
    
     

  },[stylesheet]);


  const onClick = () => {
    if(!cy) return;
      createGraph((updatedGraph) => {
        dfs(cy,updatedGraph,startNode,isDirected,isWeighted);
      })
  };

  const handleChangeDierectedness = ()=>{
    toggleDirected();
  }
  const handleChangeWeightedness = ()=>{
    console.log("isWeighted prev: ",isWeighted);
    toggleWeighted();
  }

  return (
    <div className="h-screen ">

       <div className='flex flex-row justify-between items-center bg-amber-400 py-4'>
        <Run />
        <Button onClick={onClick} variant='contained' className='bg-red-300'>
            Start Animation
        </Button>
        <div><Switch checked={isDirected} onClick={handleChangeDierectedness}/>Directed</div>
        <div><Switch checked={isWeighted} onClick={handleChangeWeightedness}/>Weighted</div>
        <DropdownButtonNode />
        <SelectAlgo/>
        <SelectStartNode />
        <DropdownButtonEdge />
       </div>

      <CytoscapeComponent
        elements={elements}
        stylesheet={stylesheet}
        layout={layout}
        style={{
         width: '100%',
         height: '100%',
         backgroundColor : '#9da1f3ba'
        }}
        cy={onCyReady}
        wheelSensitivity={0.05}
      />
    </div>
  );
};

export default Graph;

