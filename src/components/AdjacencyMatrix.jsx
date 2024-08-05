import React, { useEffect } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { useContext } from 'react';
import canvasContext from '../assets/context/CanvasContext';

const AdjacencyMatrix = () => {
  // const nodes = ['A', 'B', 'C', 'D'];
  const matrix = [
    [0, 1, 0, 1],
    [1, 0, 1, 0],
    [0, 1, 0, 1],
    [1, 0, 1, 0],
  ];

  const context = useContext(canvasContext);
  const {adjacencyMatrix, nodes, tableRowBgColor,activeTableRowId, activeTableColumnId} = context;



  return (
    <TableContainer component={Paper} sx={{ width: 'auto', margin: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell />
            {nodes.map((node) => (
              <TableCell key={node} align="center">{node}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {adjacencyMatrix.map((row, rowIndex) => (
            <TableRow key={rowIndex}>
              <TableCell align="center">{nodes[rowIndex]}</TableCell>
              {row.map((cell, cellIndex) => (
                <TableCell key={cellIndex}  align="center" sx={ activeTableRowId === rowIndex&& activeTableColumnId === cellIndex  ? { backgroundColor : tableRowBgColor } : {}}>{cell=== Infinity?'∞':cell}</TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default AdjacencyMatrix;
