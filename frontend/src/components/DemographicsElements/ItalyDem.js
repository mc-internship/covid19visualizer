import React, {useState, useEffect} from 'react';
import GenderChart from '../ChartHelpers/GenderDemographics';
import AgeChart from '../ChartHelpers/AgeDemographics';
import DiabeticChart from '../ChartHelpers/Diabetic';
import SmokersChart from '../ChartHelpers/Smokers';



import {Helmet} from 'react-helmet';

import datajson from '../data/italycountrydata.json';


function ItalyDemo(props) {

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
      <div className="cards-container">
      <Helmet>
        <title>Italy Timeline</title>
        <meta name="title" content="Graphs" />
      </Helmet>
        <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <GenderChart title="Gender Demographics - Italy" male = {data.male} female = {data.female}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AgeChart title="Age Demographics - Italy" children = {data.children} adult = {data.adults} oldage = {data.oldage}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DiabeticChart title="Percentage of Diabetics Infected - Italy" diabetes = {data.diabetes}/>
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <SmokersChart title="Percentage of Smokers Infected - Italy" malesmokers = {data.malesmokers} femalesmokers = {data.femalesmokers}/>
        </div>
        </section>
        </div>
    );
}

export default ItalyDemo;  