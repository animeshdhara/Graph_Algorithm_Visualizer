import React from 'react';
import { styled, alpha } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';

import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useState, useContext } from 'react';
import canvasContext from '../assets/context/CanvasContext';
import { FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { GRAPH_ALGORITHM } from '../constants';


const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 120,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .Muidiv-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

export default function SelectAlgo({disabled}) {
    const [anchorEl, setAnchorEl] = useState(null);
    const context = useContext(canvasContext);
    const { algo,setAlgo } = context;

    const [buttonText,setButtonText] = useState('Select Algorithm');
    
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleSelectAlgo = (e,label)=>{
        e.preventDefault();

        handleClose();

        if(algo === label) return;
        // console.log("label: ", label);
        setAlgo(label);
        setButtonText(label);
        handleClose();
    }


    return (
        <div className='px-4 w-[237px]'>
            <Button
                id="demo-customized-button"
                aria-controls={open ? 'demo-customized-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                variant="contained"
                disableElevation
                onClick={handleClick}
                endIcon={<KeyboardArrowDownIcon />}
                disabled={disabled}
            >
                {buttonText}
            </Button>
            <StyledMenu
                id="demo-customized-menu"
                MenuListProps={{
                    'aria-labelledby': 'demo-customized-button',
                }}
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
            >
            <FormControl >
                    <RadioGroup
                        aria-labelledby="demo-radio-buttons-group-label"
                        defaultValue="female"
                        name="radio-buttons-group"
                    >
                        {
                            Object.keys(GRAPH_ALGORITHM).map(key => {
                                if(GRAPH_ALGORITHM[key] !== GRAPH_ALGORITHM.DEFAULT){
                                    return (
                                        <FormControlLabel 
                                            key={key}
                                            control={<Radio />} 
                                            label={GRAPH_ALGORITHM[key]}
                                            onClick={(e) => handleSelectAlgo(e,GRAPH_ALGORITHM[key])}
                                            className='pl-3 hover:bg-blue-50 hover:rounded-lg mr-4'
                                            checked = {algo === GRAPH_ALGORITHM[key]}
                                            disabled={disabled}
                                        />
                                    )
                                }
                            })
                        }

                    </RadioGroup>
            </FormControl>
    </StyledMenu>


        </div>
    );
}