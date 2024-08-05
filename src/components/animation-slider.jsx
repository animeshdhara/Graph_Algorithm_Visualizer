import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Slider from '@mui/material/Slider';
import { INITIAL_SPEED } from '../constants';
import { getAnimationTime } from '../utils/formatColor';

export default function AnimationSlider({setAnimationTime,disabled}) {
  const [value, setValue] = React.useState(INITIAL_SPEED);

  const handleChange = (event, newValue) => {
    // console.log('check ',newValue);
    setValue(newValue);
    const time = getAnimationTime(newValue);
    setAnimationTime(time);
  };

  return (
    <div className="flex flex-row justify-between items-center bg-white/80 hover:bg-white pr-3 h-[38px] rounded-md hover:cursor-pointer  transition-all duration-300 ease-in-out">
    <span className="text-sm font-semibold mx-4">Animation Speed</span>
    <Stack spacing={2} direction="row" sx={{ width: '100px' }} alignItems="center">
      <Slider disabled={disabled} aria-label="Default" value={value} onChange={handleChange} />
    </Stack>
  </div>
  );
}