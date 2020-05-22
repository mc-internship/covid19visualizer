import React from 'react';
import Home from './Mapscountry/MainView.js'

function Usa(props) {
  return(  
    <div>
      <div className="container">
        <h4>USA</h4>
      </div>
      <div>
          <Home 
          nameofmap = "USA"/>
      </div>
    </div>  
    );
}

export default Usa;   