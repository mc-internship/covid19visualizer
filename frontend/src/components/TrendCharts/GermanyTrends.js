import React, {useState, useEffect} from 'react';
import DailyConfirmedChart from '../ChartHelpers/DailyCases';
import TotalConfirmedChart from '../ChartHelpers/TotalCases';
import NewVsRecChart from '../ChartHelpers/NewVsRec';
import RecVsDeathChart from '../ChartHelpers/DailyRecVsDeaths';
import ActiveVsRecChart from '../ChartHelpers/ActiveVsRec';
import AllStatesChart from '../ChartHelpers/StatesChart';


//import axios from 'axios';
import {Helmet} from 'react-helmet';

import datajson from '../data/germanydatajson.json';
import statesdata from '../data/germanystatesdaily.json';



function GermanyStats(props) {

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);


  useEffect(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      setTimeseries(datajson.cases_time_series);
      setStatesTimeSeries(statesdata.states_daily);

      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="cards-container">
      <Helmet>
        <title>Germany Timeline</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>Germany</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TotalConfirmedChart title="Total Cases - Germany" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyConfirmedChart title="Daily Cases - Germany" timeseries={timeseries} />
        </div>


        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <NewVsRecChart title="Newly Infected vs Newly Recovered - Germany" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RecVsDeathChart title="Daily Recovered vs Daily Deaths - Germany" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <ActiveVsRecChart title="Daily Active vs Daily Recovered - Germany" timeseries={timeseries} />
        </div>

        <div
          className="card card-big fadeInUp"
          style={{animationDelay: '0.7s'}}
        >
          <AllStatesChart
            title="Total Cases by State - Germany"
            data={statesTimeSeries}
          />
        </div>



      </section>
    </div>
  );
}

export default GermanyStats;  