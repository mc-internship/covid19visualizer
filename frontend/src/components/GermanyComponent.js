import React from 'react';
import Home from './Mapscountry/MainView.js'
import {Helmet} from 'react-helmet';


function Germany(props) {
  return(  
      <div>
             <Helmet>
        <title>Germany</title>
        <meta name="title" content="Graphs" />
      </Helmet>
          <Home 
          nameofmap = "Germany"/>
      </div>
    );
}

export default Germany;   