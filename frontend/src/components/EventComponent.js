import React, {useState, useEffect} from 'react';

import indiadatajson from './data/indiadatajson.json';
import usadatajson from './data/usadatajson.json';
import germanydatajson from './data/germanydatajson.json';
import italydatajson from './data/italydatajson.json';
import singaporedatajson from './data/singaporedatajson.json';
import indiaeventsdata from './data/indiaevents.json';
import usaeventsdata from './data/usaevents.json';
import germanyeventsdata from './data/germanyevents.json';
import italyeventsdata from './data/italyevents.json';
import singaporeeventsdata from './data/singaporeevents.json';

import EventHelper from './EventHelperComponent';
import DailyNewChart from './ChartHelpers/DailyNew';

import axios from 'axios';
import {Helmet} from 'react-helmet';

function Events(props) {

  const [fetched, setFetched] = useState(false);
  const [timeseriesIN, setTimeseriesIN] = useState([]);
  const [timeseriesUS, setTimeseriesUS] = useState([]);
  const [timeseriesGR, setTimeseriesGR] = useState([]);
  const [timeseriesIT, setTimeseriesIT] = useState([]);
  const [timeseriesSG, setTimeseriesSG] = useState([]);
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      const [
        stateDailyResponse,
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/states_daily.json'),
      ]);
      setTimeseriesIN(indiadatajson.cases_time_series);
      setTimeseriesUS(usadatajson.cases_time_series);
      setTimeseriesGR(germanydatajson.cases_time_series);
      setTimeseriesIT(italydatajson.cases_time_series);
      setTimeseriesSG(singaporedatajson.cases_time_series);
      setStatesTimeSeries(stateDailyResponse.data.states_daily);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



    return(
      <div className="container">
        <h4>Impact</h4>
      

<div>
<ul class="nav flex-column nav-pills orange">
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
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - India" timeseries={timeseriesIN} />
        </div>
        </section>
        </div>
        <div className = "events">
          <EventHelper name = {indiaeventsdata.name} events = {indiaeventsdata.events} />
        </div>
        </div>
        <div id= "usat" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - USA" timeseries={timeseriesUS} />
        </div>
        </section>
        </div>
        <div className = "events">
          <EventHelper name = {usaeventsdata.name} events = {usaeventsdata.events} />
        </div>
       
        </div>
        <div id= "germanyt" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - Germany" timeseries={timeseriesGR} />
        </div>
        </section>
        </div>
        <div className = "events">
          <EventHelper name = {germanyeventsdata.name} events = {germanyeventsdata.events} />
        </div>
        
        </div>
        <div id= "italyt" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - Italy" timeseries={timeseriesIT} />
        </div>
        </section>
        </div>
        <div className = "events">
          <EventHelper name = {italyeventsdata.name} events = {italyeventsdata.events} />
        </div>
     
        </div>
        <div id= "singt" className = "timeline-details"> 
        <div className="cards-container">
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyNewChart title="Daily New Cases - Singapore" timeseries={timeseriesSG} />
        </div>
        </section>
        </div>
        <div className = "events">
          <EventHelper name = {singaporeeventsdata.name} events = {singaporeeventsdata.events} />
        </div>
 
        </div>
    </div>
  
</div>
    )

}


export default Events;   