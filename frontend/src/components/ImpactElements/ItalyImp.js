import React, {useState, useEffectOnce} from 'react';
import AirlinesChart from '../ChartHelpers/AirlinesIndustry';
import TravelChart from '../ChartHelpers/TravelIndustry';
import RetailChart from '../ChartHelpers/RetailIndustry';
import FoodChart from '../ChartHelpers/FoodIndustry';
import EntertainmentChart from '../ChartHelpers/EntertainmentIndustry';

//import axios from 'axios';
import {Helmet} from 'react-helmet';

import italyimpact from './dataexport.js';


function ItalyIm(props) {

  
  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);

  useEffectOnce(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      let testJson;
      testJson = await italyimpact();

      setTimeseries(testJson);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="cards-container">
      <Helmet>
        <title>Italy Impact</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>Italy</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AirlinesChart title="Airline Industry Indices with Time - Italy" note = "Outstanding Share volume weighted average of Adj. Close value of AF, LHA" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TravelChart title="Travel Industry Indices with Time - Italy" note = "Outstanding Share volume weighted average of Adj. Close value of TRIP.MI, IGV.MI, PSA.MI" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <EntertainmentChart title="Entertainment Industry Indices with Time - Italy" note = "Outstanding Share volume weighted average of Adj. Close value of VIV.MI, IE.MI, JUVE.MI" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <FoodChart title="Food Industry Indices with Time - Italy" note = "Outstanding Share volume weighted average of Adj. Close value of AD, DNN, MARR" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RetailChart title="Retail Industry Indices with Time - Italy" note = "Outstanding Share volume weighted average of Adj. Close value of AD, DNN, MARR" timeseries={timeseries} />
        </div>
      </section>
    </div>
  );
}

export default ItalyIm;  