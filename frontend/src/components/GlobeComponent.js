import React, { useState } from 'react';
import Globe from 'react-globe';
import { Redirect } from 'react-router-dom';

const markers = [
  {
    "id": 1,
    "city": "Singapore",
    "color": "red",
    "coordinates": [
      1.3521,
      103.8198
    ],
    "value": 150
  },
  {
    "id": 2,
    "city": "Rome",
    "color": "lightblue",
    "coordinates": [
      41.9028,
      12.4964
    ],
    "value": 150
  },
  {
    "id": 3,
    "city": "Washington D.C.",
    "color": "teal",
    "coordinates": [
      38.9072,
      -77.0369
    ],
    "value": 150
  },
  {
    "id": 4,
    "city": "New Delhi",
    "color": "lightpink",
    "coordinates": [
      28.6139,
      77.2090
    ],
    "value": 150
  },
  {
    "id": 5,
    "city": "Berlin",
    "color": "orange",
    "coordinates": [
      52.5200,
      13.4050
    ],
    "value": 150
  }
];


function World(props) {
  const [link, linkNavigator] = useState({});
  
  const onClickMarker = (marker, markerObject, event) => {
    if(marker.city === "New Delhi"){
      linkNavigator('india');
    }
    else if(marker.city === "Rome"){
      linkNavigator('italy');
    }
    else if(marker.city === "Berlin"){
      linkNavigator('germany');
    }
    else if(marker.city === "Washington D.C."){
      linkNavigator('usa');
    }
    else if(marker.city === "Singapore"){
      linkNavigator('singapore');
    }
  }

  if (link === 'india') {
    return <Redirect to='/home/india' />
  }
  else if(link === 'usa'){
    return <Redirect to='/home/usa' />
  }
  else if(link === 'germany'){
    return <Redirect to='/home/germany' />
  }
  else if(link === 'italy'){
    return <Redirect to='/home/italy' />
  }
  else if(link === 'singapore'){
    return <Redirect to='/home/singapore' />
  }


  return (
    <div style={{ width: "550px", height: "550px" }}>
      <Globe
        markers={markers}
        markerOptions={{
          activeScale: 1.5,
          enableTooltip: true,
          enterAnimationDuration: 3000,
          enterEasingFunction: ['Bounce', 'InOut'],
          exitAnimationDuration: 3000,
          exitEasingFunction: ['Cubic', 'Out'],
          getTooltipContent: marker => `${marker.city}`,
          radiusScaleRange: [0.01, 0.05],
          glowRadiusScale: 1

        }}
        globeOptions={{
          enableBackground: false,
          //backgroundTexture: `https://www.colorhexa.com/161625.png`
          glowRadiusScale: 0.15

        }}  
        cameraOptions = {{
          autoRotateSpeed: 5
        }}
        onClickMarker={onClickMarker}
      />
    </div>
  );
}

export default World;
