import React, { useContext, useEffect, useState } from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import EditWeightModal from './EditWeightModal';
import canvasContext from '../assets/context/CanvasContext';
import { toast } from 'react-toastify';

export default function EdgeMenu({ cy,deleteEdge,disabled }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [contextMenu, setContextMenu] = useState({ mouseX: null, mouseY: null });
  const [edgeId,setEdgeId] = useState(null);
  const [sureDelete,setSureDelete] = useState(false);
  const [openModal,setOpenModal] = useState(false);
  const [openModalEdit,setOpenModalEdit] = useState(false);

  const [weight,setWeight] = useState("");

  const {updateEdge} = useContext(canvasContext);

  useEffect(() => {
    
    cy?.on('tap', 'edge', (e) => {
      if(disabled) return;
      e.preventDefault();

      var edge = e.target;
      console.log(`To remove : `, edge.id());
      setContextMenu({
        mouseX: e.originalEvent.clientX + 100,
        mouseY: e.originalEvent.clientY - 50,
      });
      if(!disabled) setAnchorEl(e.originalEvent);
      setEdgeId(edge.id());
    });
  }, [cy]);

  const handleClose = () => {
    setAnchorEl(null);
    setContextMenu({ mouseX: null, mouseY: null });
  };

  const handleDelete = () => {
      setOpenModal(true);
      handleClose();
  }

  const handleEditWeight = () => {
      setOpenModalEdit(true);
      handleClose();
  }

  const onCloseModal = ()=>{
    setSureDelete(false);
    setOpenModal(false);
 }

 const onConfirmModal = ()=>{
  const newSureDelete = true;
  setSureDelete(newSureDelete);
  if(newSureDelete){
    deleteEdge(edgeId);
    console.log('deleting ',edgeId);
  }
  setOpenModal(false);
}

const onCloseModalEdit = ()=>{
  setOpenModalEdit(false);
}

const onConfirmModalEdit = ()=>{
  console.log('editting ',weight);

  try {
    const wt = parseFloat(weight,10);

    // console.log('wt ', wt);
    if(isNaN(wt)){
       throw new Error();
    }

    updateEdge(edgeId,wt);
    
  } catch (error) {
    toast.error("Please enter correct weight");
  }

  setOpenModalEdit(false);
}

  return (
    <div id="cy-container-menu">
      <EditWeightModal openModal={openModalEdit} onClose={onCloseModalEdit} onConfirm={onConfirmModalEdit}
      setWeight={setWeight} disabled={disabled} />
      <DeleteConfirmationModal 
      disabled={disabled}
      openModal={openModal} onClose={onCloseModal} onConfirm={onConfirmModal}/>
      <Menu
        anchorReference="anchorPosition"
        anchorPosition={
          contextMenu.mouseY !== null && contextMenu.mouseX !== null
            ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
            : undefined
        }
        open={Boolean(anchorEl) && !disabled}
        onClose={handleClose}
      >
        <MenuItem>
          <span className='text-lg font-medium m-auto text-cyan-500'>
            Value : {edgeId} 
          </span>
        </MenuItem>
        <MenuItem>
          <IconButton disabled={disabled} aria-label='Edit' color="primary" size='small' onClick={handleEditWeight}>
                <EditIcon /> Edit
          </IconButton>
        </MenuItem>
        <MenuItem >
        <IconButton disabled={disabled} aria-label='Delete' color="warning" size='small' onClick={handleDelete}>
              <DeleteIcon />  Delete
          </IconButton>
        </MenuItem>
      </Menu>
    </div>
  );
}
