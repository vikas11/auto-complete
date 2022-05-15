import React from 'react';
import logo from './logo.svg';
import './App.css';

import { AutoCompleteComponent } from './components/auto-complete/auto-complete';


function App() {
  const myStyle = {
    backgroundImage: `url(${window.location.origin + "/assets/images/bg.png"})`,
    height: '99.9vh',
    backgroundSize: 'cover',
    backgroundRepeat: 'repeat',
    padding: '20px'
  };

  return (
     <div style={myStyle} >
      <div className="col-md-6">
         <AutoCompleteComponent></AutoCompleteComponent>
      </div>
    </div>
  );
}

export default App;
