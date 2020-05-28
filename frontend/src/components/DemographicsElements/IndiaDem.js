import React, {useState, useEffect} from 'react';
import GenderChart from '../ChartHelpers/GenderDemographics';
import AgeChart from '../ChartHelpers/AgeDemographics';
import DiabeticChart from '../ChartHelpers/Diabetic';
import SmokersChart from '../ChartHelpers/Smokers';



import {Helmet} from 'react-helmet';

import datajson from '../data/indiacountrydata.json';


function IndiaDemo(props) {

  const [fetched, setFetched] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {

      setData(datajson.country);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



    return(
      <div className="card-demographics">
      <Helmet>
        <title>India Demographics</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>India</h1>
      <h2 style = {{textAlign: 'center', color:"salmon"}}>0.010% of Population Affected</h2>
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s',border: 'none'}}>
          <GenderChart title="Gender Demographics" male = {data.male} female = {data.female}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AgeChart title="Age Demographics" children = {data.children} adult = {data.adults} oldage = {data.oldage}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DiabeticChart title="Percentage of Diabetics" diabetes = {data.diabetes}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <SmokersChart title="Percentage of Smokers" malesmokers = {data.malesmokers} femalesmokers = {data.femalesmokers}/>
        </div>
        </section>
        </div>
    );
}

export default IndiaDemo;  