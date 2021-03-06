import React, {useState} from 'react';
import DailyConfirmedChart from '../ChartHelpers/DailyCases';
import TotalConfirmedChart from '../ChartHelpers/TotalCases';
import NewVsRecChart from '../ChartHelpers/NewVsRec';
import RecVsDeathChart from '../ChartHelpers/DailyRecVsDeaths';
import ActiveVsRecChart from '../ChartHelpers/ActiveVsRec';
import {useEffectOnce} from 'react-use';


//import axios from 'axios';
import {Helmet} from 'react-helmet';

import {singaporedatajson} from '../dataexport.js';



function SingStats(props) {

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);


  useEffectOnce(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      let testJson1;
      testJson1 = await singaporedatajson();
      setTimeseries(testJson1.cases_time_series);

      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="cards-container">
      <Helmet>
        <title>Singapore Timeline</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>Singapore</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TotalConfirmedChart title="Total Cases - Singapore" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyConfirmedChart title="Daily Cases - Singapore" timeseries={timeseries} />
        </div>


        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <NewVsRecChart title="Newly Infected vs Newly Recovered - Singapore" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RecVsDeathChart title="Daily Recovered vs Daily Deaths - Singapore" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <ActiveVsRecChart title="Daily Active vs Daily Recovered - Singapore" timeseries={timeseries} />
        </div>

      </section>
    </div>
  );
}

export default SingStats;  