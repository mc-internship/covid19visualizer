import React, {useState, useEffect} from 'react';
import GenderChart from '../ChartHelpers/GenderDemographics';
import AgeChart from '../ChartHelpers/AgeDemographics';
import DiabeticChart from '../ChartHelpers/Diabetic';
import SmokersChart from '../ChartHelpers/Smokers';


import axios from 'axios';
import {Helmet} from 'react-helmet';

import datajson from '../data/usacountrydata.json';


function UsaDemo(props) {

  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState([]);
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
      setData(datajson.country);
      setStatesTimeSeries(stateDailyResponse.data.states_daily);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



    return(
      <div className="cards-container">
      <Helmet>
        <title>USA Timeline</title>
        <meta name="title" content="Graphs" />
      </Helmet>
        <h4>USA Demographics</h4>
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <GenderChart title="Gender Demographics - USA" male = {data.male} female = {data.female}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AgeChart title="Age Demographics - USA" children = {data.children} adult = {data.adults} oldage = {data.oldage}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DiabeticChart title="Percentage of Diabetics Infected - USA" diabetes = {data.diabetes}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <SmokersChart title="Percentage of Smokers Infected - USA" malesmokers = {data.malesmokers} femalesmokers = {data.femalesmokers}/>
        </div>
        </section>
        </div>
    );
}

export default UsaDemo;  