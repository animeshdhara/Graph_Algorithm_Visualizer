import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useContext, useRef, useState } from 'react';
import canvasContext from '../assets/context/CanvasContext';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';


export default function SelectStartNode({disabled}) {

    const [node, setNode] = useState("");
    const [label,setLabel] = useState("Select start Node");

    const buttonRef = useRef(null);

    const context = useContext(canvasContext);
    const {startNode, changeStartNode,changeDistance} = context;


    document.getElementById('menu-start-node')?.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && node.length) {
         console.log('enter key pressed');
         handleSave();
      }
    });

    const handleClose = () => {
  
       buttonRef?.current.click();
       setNode("");
    };

   
    const handleNodeChange = (e)=>{
        e.preventDefault();
        if(e.target.value == null) return;
        setNode(e.target.value);
    }


    const handleSave = ()=>{
        const id = node;
        setLabel(node);
        changeStartNode(id);
        // changeDistance(id,0);   
        handleClose();
    }


  return (
    <Menu  as="div" id="menu-start-node" className="relative inline-block text-left px-3 w-[237px] ">
      <div>
        <MenuButton disabled={disabled} ref={buttonRef} className=" items-start inline-flex justify-center gap-x-1.5 rounded-md bg-red-900 hover:bg-red-700 px-3 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-inset ring-gray-300 ">
          <span>{label}</span>
            <KeyboardArrowDownIcon />
        </MenuButton>
      </div>

      <MenuItems
      
      transition
      className="absolute left-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
                <div className='p-1 flex flex-row justify-between'>
                    <label className=' w-16 mr-1'>Node: </label>
                    <input required type="text" id='source-input-in-edge' className='w-16 p-1 bg-gray-200 rounded-lg'  value={node} onChange={handleNodeChange}/>
                </div>
                
                <div className='flex flex-row justify-around items-center'>
                    <IconButton aria-label='cancel' color="error" size='small' onClick={handleClose}>
                        <CloseIcon />
                    </IconButton>
                    <IconButton aria-label='cancel' color="success" size='small' onClick={handleSave}>
                        <DoneIcon />
                    </IconButton>
                   
                </div>
      </MenuItems>
    </Menu>
  );
}