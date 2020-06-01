import React from 'react';
import Home from './Mapscountry/MainView.js'
import {Helmet} from 'react-helmet';


function Singapore(props) {
    return(
      <div>
             <Helmet>
        <title>Singapore</title>
        <meta name="title" content="Graphs" />
      </Helmet>
        <Home 
        nameofmap = "Singapore"/>
      </div>
    );
}

export default Singapore;   