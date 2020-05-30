import React, {useState} from 'react';

import {indiadatajson, usadatajson, germanydatajson, italydatajson, singaporedatajson, 
indiaevents, usaevents, germanyevents, italyevents, singaporeevents}  from './dataexport.js';

import EventHelper from './EventHelperComponent';
import DailyNewChart from './ChartHelpers/DailyNew';
import {useEffectOnce} from 'react-use';



function Events(props) {

  const [selectedCountry, changeSelection] = React.useState("India");

  const [fetched, setFetched] = useState(false);
  const [timeseriesIN, setTimeseriesIN] = useState([]);
  const [timeseriesUS, setTimeseriesUS] = useState([]);
  const [timeseriesGR, setTimeseriesGR] = useState([]);
  const [timeseriesIT, setTimeseriesIT] = useState([]);
  const [timeseriesSG, setTimeseriesSG] = useState([]);
  const [eventsIN, setEventsIN] = useState([]);
  const [eventsUS, setEventsUS] = useState([]);
  const [eventsGR, setEventsGR] = useState([]);
  const [eventsIT, setEventsIT] = useState([]);
  const [eventsSG, setEventsSG] = useState([]);

  useEffectOnce(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      let testJson1;
      testJson1 = await indiadatajson();
      let testJson2;
      testJson2 = await usadatajson();
      let testJson3;
      testJson3 = await germanydatajson();
      let testJson4;
      testJson4 = await italydatajson();
      let testJson5;
      testJson5 = await singaporedatajson();
      setTimeseriesIN(testJson1.cases_time_series);
      setTimeseriesUS(testJson2.cases_time_series);
      setTimeseriesGR(testJson3.cases_time_series);
      setTimeseriesIT(testJson4.cases_time_series);
      setTimeseriesSG(testJson5.cases_time_series);

      let testJson6;
      testJson6 = await indiaevents();
      setEventsIN(testJson6);
      let testJson7;
      testJson7 = await usaevents();
      setEventsUS(testJson7);
      let testJson8;
      testJson8 = await germanyevents();
      setEventsGR(testJson8);
      let testJson9;
      testJson9 = await italyevents();
      setEventsIT(testJson9);
      let testJson10;
      testJson6 = await singaporeevents();
      setEventsSG(testJson10);

      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



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
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - India" timeseries={timeseriesIN} />
        </div>
        </section>
        
        <div className = "events">
          <EventHelper name = {eventsIN.name} events = {eventsIN.events} />
        </div>
        </div>
        </div>}

        {selectedCountry === "USA" && <div id= "usat" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - USA" timeseries={timeseriesUS} />
        </div>
        </section>
        
        <div className = "events">
          <EventHelper name = {eventsUS.name} events = {eventsUS.events} />
        </div> 
        </div>
        </div>}

        {selectedCountry === "Germany" && <div id= "germanyt" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - Germany" timeseries={timeseriesGR} />
        </div>
        </section>
        
        <div className = "events">
          <EventHelper name = {eventsGR.name} events = {eventsGR.events} />
        </div>
        </div>
        </div>}

        {selectedCountry === "Italy" && <div id= "italyt" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - Italy" timeseries={timeseriesIT} />
        </div>
        </section>
        
        <div className = "events">
          <EventHelper name = {eventsIT.name} events = {eventsIT.events} />
        </div>
        </div>
        </div>}

        {selectedCountry === "Singapore" && <div id= "singt" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - Singapore" timeseries={timeseriesSG} />
        </div>
        </section>
        
        <div className = "events">
          <EventHelper name = {eventsSG.name} events = {eventsSG.events} />
        </div>
        </div>
    </div> }

    </div>
  
</div>
    )

}


export default Events;   