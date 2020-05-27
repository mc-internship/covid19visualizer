import React from 'react';
import Home from './Mapscountry/MainView.js'
import {Helmet} from 'react-helmet';


function Usa(props) {
  return(  
      <div>
             <Helmet>
        <title>Usa</title>
        <meta name="title" content="Graphs" />
      </Helmet>
          <Home 
          nameofmap = "USA"/>
      </div>
    );
}

export default Usa;   