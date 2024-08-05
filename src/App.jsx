import React from 'react';
import Graph from './components/Graph';
import './index.css'; // Import Tailwind CSS
import CanvasState from './assets/context/CanvasState';

function App() {
  return (
    <CanvasState>
      <div className="App "
        style = {{
          backgroundImage : 'url(/graph_bg.jpg)'
        }}
      >
        <h1 className="text-4xl font-extrabold text-center h-20 pt-4"
          
          style={{
            fontFamily: '"Edu AU VIC WA NT Hand", cursive',
            fontOpticalSizing: 'auto',
            fontWeight: '500', // Replace <weight> with the desired value, e.g., 'normal', 'bold', '700'
            fontStyle: 'normal',
            color : '#ffd100',
          }}
        
        >
          Graph Algorithm Visualizer
        </h1>
        <div className="mx-auto overflow-y-hidden">
          <Graph />
        </div>
      </div>
    </CanvasState>
  );
}

export default App;
