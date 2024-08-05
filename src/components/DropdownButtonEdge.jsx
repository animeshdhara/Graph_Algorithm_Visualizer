import { Menu, MenuButton, MenuItems } from '@headlessui/react';
import { useContext, useRef, useState } from 'react';
import canvasContext from '../assets/context/CanvasContext';
import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import DoneIcon from '@mui/icons-material/Done';
import { formEdgeId } from '../utils/formatColor';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { toast } from 'react-toastify';


export default function DropdownButtonEdge({disabled}) {

    const [weight, setWeight] = useState('0');
    const [source, setSource] = useState("");
    const [target, setTarget] = useState("");

    const buttonRef = useRef(null);

    const context = useContext(canvasContext);
    const {addEdge, isWeighted, isDirected} = context;


    // document.getElementById('menu-edge')?.addEventListener('keydown', (event) => {
    //   if (event.key === 'Enter' && source.length && target.length) {
    //      console.log('enter key pressed edge');
    //      handleSave();
    //   }
    // });

    const handleClose = () => {
  
       buttonRef?.current.click();
       setSource('');
       setTarget('');
       setWeight(0);
    };

    const handleWeightChange = (e)=>{
        e.preventDefault();
        if(e.target.value == null) return;
        setWeight(e.target.value);
    }
    const handleSourceChange = (e)=>{
        e.preventDefault();
        const val = e.target.value;
        // console.log("val: ",e);
        
        if(e.target.value == null) return;
        setSource(val);
    }
    const handleTargetChange = (e)=>{
        e.preventDefault();
        const val = e.target.value;
        // console.log("val: ",val);

        if(e.target.value == null) return;
        setTarget(val);
    }


    const handleSave = ()=>{
        const id = formEdgeId(source,target);
        console.log("weight in handle save: ",weight );
        
        try {
          const wt = parseFloat(weight,10);
          if(isNaN(wt)){
            throw new Error();
          }
          addEdge(id, source, target,wt);
          
        } catch (error) {
          toast.error("Please enter correct weight")
        }
        handleClose();
    }


  return (
    <Menu  as="div" id="menu-edge" className="relative inline-block text-left px-3">
      <div>
        <MenuButton disabled={disabled} ref={buttonRef} className=" inline-flex items-center w-auto justify-center gap-x-1.5 rounded-md bg-red-900  hover:bg-red-700 ease-in  px-3 py-2 text-sm font-semibold text-white shadow-lg ring-1 ring-inset ring-gray-300">
          <span>Add Edge</span>
            <KeyboardArrowDownIcon />
        </MenuButton>
      </div>

      <MenuItems
      
      transition
      className="absolute left-0 z-10 mt-2 w-auto origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
      >
                <div className='p-1 flex flex-row justify-between'>
                    <label className=' w-16 mr-1'>{isDirected ? "From:" : "First:"}</label>
                    <input required type="text" id='source-input-in-edge' className='w-16 p-1 bg-gray-200 rounded-lg'  value={source} onChange={handleSourceChange}/>
                </div>
                
                <div className='p-1  flex flex-row justify-between'>
                    <label htmlFor="target" className=' w-16 mr-2'>{isDirected?'To:':'Second:'}</label>
                    <input required type="text" id='target' className='w-16 p-1 bg-gray-200 rounded-lg' value={target} onChange={handleTargetChange}/>
                </div>


                {isWeighted === true && <div className='p-1  flex flex-row justify-between'>
                    <label htmlFor="weight" className=' w-16 mr-1'>Weight:</label>
                    <input type="text" id='weight' className='w-16 p-1 bg-gray-200 rounded-lg' onChange={handleWeightChange} value={weight}/>
                </div>}

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
