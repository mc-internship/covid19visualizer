import React, {useState, useEffectOnce} from 'react';
import AirlinesChart from '../ChartHelpers/AirlinesIndustry';
import TravelChart from '../ChartHelpers/TravelIndustry';
import RetailChart from '../ChartHelpers/RetailIndustry';
import FoodChart from '../ChartHelpers/FoodIndustry';
import EntertainmentChart from '../ChartHelpers/EntertainmentIndustry';

//import axios from 'axios';
import {Helmet} from 'react-helmet';

import {indiaimpact} from '../dataexport.js';


function IndiaIm(props) {

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
      testJson = await indiaimpact();

      setTimeseries(testJson);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="cards-container">
      <Helmet>
        <title>India Impact</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>India</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <AirlinesChart title="Airline Industry Indices with Time - India" note = "The index is the Total Outstanding Shares Volume (MRQ) -weighted average of tHe close values of SPJT, JET, INGL, GLVE" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TravelChart title="Travel Industry Indices with Time - India" note = "The index is the Total Outstanding Shares Volume (MRQ) -weighted average of tHe close values of THOM, BLSN, ITRV, TRNS, COKI" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <EntertainmentChart title="Entertainment Industry Indices with Time - India" note = "NIFTY MEDIA Index" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <FoodChart title="Food Industry Indices with Time - India" note = "The index is the Total Outstanding Shares Volume (MRQ) -weighted average of tHe close values of KRBL, LTOL, CLSE, Himalaya Food, KOFO, KOVI" timeseries={timeseries} />
        </div>
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RetailChart title="Retail Industry Indices with Time - India" note = "The index is the Total Outstanding Shares Volume (MRQ) -weighted average of tHe close values of AVEU, TREN, ADIA, FRTL, VMAR, SHOP, ARVF" timeseries={timeseries} />
        </div>
      </section>
    </div>
  );
}

export default IndiaIm;  