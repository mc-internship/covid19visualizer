import React from "react";
import IndiaStats from './timeline/india';
import UsaStats from './timeline/usa';
import ItalyStats from './timeline/italy';
import GermanyStats from './timeline/germany';
import SingStats from './timeline/sing';


function Timeline(props) {
    return(
      <div className="container">
        <h4>Timeline</h4>
      

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
          <IndiaStats />
        </div>
        <div id= "usat" className = "timeline-details"> 
          <UsaStats />
        </div>
        <div id= "germanyt" className = "timeline-details"> 
          <GermanyStats />
        </div>
        <div id= "italyt" className = "timeline-details"> 
          <ItalyStats />
        </div>
        <div id= "singt" className = "timeline-details"> 
          <SingStats />
        </div>
    </div>
  
</div>
    )

}


export default Timeline;   