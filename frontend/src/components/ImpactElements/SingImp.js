import React, {useState, useEffectOnce} from 'react';
import AirlinesChart from '../ChartHelpers/AirlinesIndustry';
import TravelChart from '../ChartHelpers/TravelIndustry';
import RetailChart from '../ChartHelpers/RetailIndustry';
import FoodChart from '../ChartHelpers/FoodIndustry';
import EntertainmentChart from '../ChartHelpers/EntertainmentIndustry';

//import axios from 'axios';
import {Helmet} from 'react-helmet';

import {singaporeimpact} from '../dataexport.js';


function SingIm(props) {

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
      testJson = await singaporeimpact();

      setTimeseries(testJson);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="cards-container">
      <Helmet>
        <title>Singapore Impact</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>Singapore</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AirlinesChart title="Airline Industry Indices with Time - Singapore" note = "Outstanding Share volume weighted average of Adj. Close value of SIA ENGINEERING, SIA" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TravelChart title="Travel Industry Indices with Time - Singapore" note = "Outstanding Share volume weighted average of Adj. Close value of SHANGRI LA SKD, Far East Hospitality Trust FEHT, MAN ORIENTAL US" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <EntertainmentChart title="Entertainment Industry Indices with Time - Singapore" note = "Outstanding Share volume weighted average of Adj. Close value of GENTING, STRACO, MM2ASIA" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <FoodChart title="Food Industry Indices with Time - Singapore" note = "Outstanding Share volume weighted average of Adj. Close value of SHENG SIONG, DAIRYFARM USD, OLAM INTL" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RetailChart title="Retail Industry Indices with Time - Singapore" note = "Outstanding Share volume weighted average of Adj. Close value of JSH USD, JARDINE, ISETAN" timeseries={timeseries} />
        </div>
      </section>
    </div>
  );
}

export default SingIm;  