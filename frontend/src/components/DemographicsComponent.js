import React from "react";
import IndiaDemo from './DemographicsElements/IndiaDem';
import UsaDemo from './DemographicsElements/UsaDem';
import ItalyDemo from './DemographicsElements/ItalyDem';
import GermanyDemo from './DemographicsElements/GermanyDem';
import SingDemo from './DemographicsElements/SingDem';

function Demographics(props) {
    return(
      <div className="container">
        <h4>Demographics</h4>
      

<div>
<ul class="nav flex-column nav-pills ">
  <li class="nav-item">
    <a class="nav-link active" href="#indiat">India</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#usat">USA</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#germanyt">Germany</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#italyt">Italy</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" href="#singt">Singapore</a>
  </li>
</ul>
</div>

    <div className = "content">
        <div id= "indiat" className = "timeline-details">
          <IndiaDemo />
        </div>
        <div id= "usat" className = "timeline-details"> 
          <UsaDemo />
        </div>
        <div id= "germanyt" className = "timeline-details"> 
          <GermanyDemo />
        </div>
        <div id= "italyt" className = "timeline-details"> 
          <ItalyDemo />
        </div>
        <div id= "singt" className = "timeline-details"> 
          <SingDemo />
        </div>
    </div>
  
</div>
    )

}


export default Demographics;   