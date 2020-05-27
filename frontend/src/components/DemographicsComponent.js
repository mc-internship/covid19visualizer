import React from "react";
import IndiaDemo from './DemographicsElements/IndiaDem';
import UsaDemo from './DemographicsElements/UsaDem';
import ItalyDemo from './DemographicsElements/ItalyDem';
import GermanyDemo from './DemographicsElements/GermanyDem';
import SingDemo from './DemographicsElements/SingDem';

function Demographics(props) {
  const [selectedCountry, changeSelection] = React.useState("India");
    return(
      <div className="container">
      
<div className = "navigator">
<ul class="nav flex-column nav-pills orange">
  <li class="nav-item ">
    <a class="nav-link active" onClick={()=>changeSelection("India")} href="#indiat">India</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" onClick={()=>changeSelection("USA")} href="#usat">USA</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" onClick={()=>changeSelection("Germany")} href="#germanyt">Germany</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" onClick={()=>changeSelection("Italy")} href="#italyt">Italy</a>
  </li>
  <li class="nav-item">
    <a class="nav-link active" onClick={()=>changeSelection("Singapore")} href="#singt">Singapore</a>
  </li>
</ul>
</div>

<div className = "content">
        {selectedCountry === "India" && <div id= "indiat" className = "timeline-details">
          <IndiaDemo />
        </div> }
        {selectedCountry === "USA" && <div id= "usat" className = "timeline-details"> 
          <UsaDemo />
        </div>}
        {selectedCountry === "Germany" && <div id= "germanyt" className = "timeline-details"> 
          <GermanyDemo />
        </div>}
        {selectedCountry === "Italy" && <div id= "italyt" className = "timeline-details"> 
          <ItalyDemo />
        </div>}
        {selectedCountry === "Singapore" && <div id= "singt" className = "timeline-details"> 
          <SingDemo />
        </div>}
    </div>
  
</div>
    )

}


export default Demographics;   