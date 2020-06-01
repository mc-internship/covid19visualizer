import * as React from "react";
import IndiaStats from './TrendCharts/IndiaTrends';
import UsaStats from './TrendCharts/UsaTrends';
import ItalyStats from './TrendCharts/ItalyTrends';
import GermanyStats from './TrendCharts/GermanyTrends';
import SingStats from './TrendCharts/SingTrends';


function Timeline(props) {
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
          <IndiaStats />
        </div> }
        {selectedCountry === "USA" && <div id= "usat" className = "timeline-details"> 
          <UsaStats />
        </div>}
        {selectedCountry === "Germany" && <div id= "germanyt" className = "timeline-details"> 
          <GermanyStats />
        </div>}
        {selectedCountry === "Italy" && <div id= "italyt" className = "timeline-details"> 
          <ItalyStats />
        </div>}
        {selectedCountry === "Singapore" && <div id= "singt" className = "timeline-details"> 
          <SingStats />
        </div>}
    </div>
  
</div>
    )

}


export default Timeline;   