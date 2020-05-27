import React from 'react';
import Home from './Mapscountry/MainView.js'
import {Helmet} from 'react-helmet';



function Italy(props) {
  return(  
      <div>
             <Helmet>
        <title>Italy</title>
        <meta name="title" content="Graphs" />
      </Helmet>
          <Home 
          nameofmap = "Italy"/>
      </div>
    );
}

export default Italy;   