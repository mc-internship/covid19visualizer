import React, {useState, useEffect} from 'react';
import DailyConfirmedChart from '../ChartHelpers/DailyCases';
import TotalConfirmedChart from '../ChartHelpers/TotalCases';
import NewVsRecChart from '../ChartHelpers/NewVsRec';
import RecVsDeathChart from '../ChartHelpers/DailyRecVsDeaths';
import ActiveVsRecChart from '../ChartHelpers/ActiveVsRec';


//import axios from 'axios';
import {Helmet} from 'react-helmet';

import datajson from '../data/Singaporedatajson.json';


function SingStats(props) {

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);

  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      setTimeseries(datajson.cases_time_series);
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