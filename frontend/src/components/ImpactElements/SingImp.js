import React, {useState, useEffect} from 'react';
import AirlinesChart from '../ChartHelpers/AirlinesIndustry';
import TravelChart from '../ChartHelpers/TravelIndustry';
import RetailChart from '../ChartHelpers/RetailIndustry';
import FoodChart from '../ChartHelpers/FoodIndustry';
import EntertainmentChart from '../ChartHelpers/EntertainmentIndustry';

//import axios from 'axios';
import {Helmet} from 'react-helmet';

import datajson from '../data/Singaporeimpact.json';


function SingIm(props) {

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      setTimeseries(datajson);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };


  return (
    <div className="cards-container">
      <Helmet>
        <title>Sing Impact</title>
        <meta name="title" content="Graphs" />
      </Helmet>

      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AirlinesChart title="Airline Industry Indices with Time - Singapore" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TravelChart title="Travel Industry Indices with Time - Singapore" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <EntertainmentChart title="Entertainment Industry Indices with Time - Singapore" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <FoodChart title="Food Industry Indices with Time - Singapore" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RetailChart title="Retail Industry Indices with Time - Singapore" timeseries={timeseries} />
        </div>
      </section>
    </div>
  );
}

export default SingIm;  