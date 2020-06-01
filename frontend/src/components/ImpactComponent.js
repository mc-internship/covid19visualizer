import React from "react";
import IndiaIm from './ImpactElements/IndiaImp';
import UsaIm from './ImpactElements/UsaImp';
import ItalyIm from './ImpactElements/ItalyImp';
import GermanyIm from './ImpactElements/GermanyImp';
import SingIm from './ImpactElements/SingImp';


function Impact(props) {
  const [selectedCountry, changeSelection] = React.useState("India");
    return(
      <div className="container">
 
        <div>
          
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
          <IndiaIm />
        </div> }
        {selectedCountry === "USA" && <div id= "usat" className = "timeline-details"> 
          <UsaIm />
        </div>}
        {selectedCountry === "Germany" && <div id= "germanyt" className = "timeline-details"> 
          <GermanyIm />
        </div>}
        {selectedCountry === "Italy" && <div id= "italyt" className = "timeline-details"> 
          <ItalyIm />
        </div>}
        {selectedCountry === "Singapore" && <div id= "singt" className = "timeline-details"> 
          <SingIm />
        </div>}
    </div>
  
  
</div>
    )

}


export default Impact;   