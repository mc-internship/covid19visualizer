import React from 'react';
import Home from './Mapscountry/MainView.js'
import {Helmet} from 'react-helmet';

function India(props) {
  return( 
      <div>
          <Helmet>
        <title>India</title>
        <meta name="title" content="Graphs" />
      </Helmet>
          <Home 
          nameofmap = "India"/>
      </div>  
    );
}

export default India;   