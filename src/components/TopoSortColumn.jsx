import React, { useContext, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import canvasContext from '../assets/context/CanvasContext';

const TopoSortColumn = () => {
  const context = useContext(canvasContext);
  const {topoSortedNodeIds} = context;

  return (
      <TableContainer component={Paper} >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align="center" sx={{ padding: '10px' }}>Sorted</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topoSortedNodeIds.map((node, index) => {
              return (
                <TableRow key={node} >
                  <TableCell align="center" sx={{ padding: '4px'}}>{node}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
  );
};

export default TopoSortColumn;
