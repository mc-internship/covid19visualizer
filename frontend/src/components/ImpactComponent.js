import React from "react";
import IndiaIm from './impact/india';
import UsaIm from './impact/usa';
import ItalyIm from './impact/italy';
import GermanyIm from './impact/germany';
import SingIm from './impact/sing';


function Impact(props) {
    return(
      <div className="container">
        <h4>Impact</h4>
      

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
          <IndiaIm />
        </div>
        <div id= "usat" className = "timeline-details"> 
          <UsaIm />
        </div>
        <div id= "germanyt" className = "timeline-details"> 
          <GermanyIm />
        </div>
        <div id= "italyt" className = "timeline-details"> 
          <ItalyIm />
        </div>
        <div id= "singt" className = "timeline-details"> 
          <SingIm />
        </div>
    </div>
  
</div>
    )

}


export default Impact;   