import React, {useState} from 'react';
import AllStatesChart from '../ChartHelpers/StatesChart';
import DailyConfirmedChart from '../ChartHelpers/DailyCases';
import TotalConfirmedChart from '../ChartHelpers/TotalCases';
import NewVsRecChart from '../ChartHelpers/NewVsRec';
import RecVsDeathChart from '../ChartHelpers/DailyRecVsDeaths';
import ActiveVsRecChart from '../ChartHelpers/ActiveVsRec';
import {useEffectOnce} from 'react-use';


import {Helmet} from 'react-helmet';

import {indiadatajson} from '../dataexport.js';
import {indiastatesdaily} from '../dataexport.js';



function IndiaStats(props) {

  const [fetched, setFetched] = useState(false);
  const [timeseries, setTimeseries] = useState([]);
  const [statesTimeSeries, setStatesTimeSeries] = useState([]);

  useEffectOnce(() => {
    if (fetched === false) {
      getStates();
    }
  }, [fetched]);

  const getStates = async () => {
    try {
      let testJson1;
      testJson1 = await indiadatajson();
      let testJson2;
      testJson2 = await indiastatesdaily();
      setTimeseries(testJson1.cases_time_series);
      setStatesTimeSeries(testJson2.states_daily);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };



  return (
    <div className="cards-container">
      <Helmet>
        <title>India Timeline</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>India</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TotalConfirmedChart title="Total Cases - India" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyConfirmedChart title="Daily Cases - India" timeseries={timeseries} />
        </div>


        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <NewVsRecChart title="Newly Infected vs Newly Recovered - India" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RecVsDeathChart title="Daily Recovered vs Daily Deaths - India" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <ActiveVsRecChart title="Daily Active vs Daily Recovered - India" timeseries={timeseries} />
        </div>

        <div
          className="card card-big fadeInUp"
          style={{animationDelay: '0.7s'}}
        >
          <AllStatesChart
            title="Total Cases by State - India"
            data={statesTimeSeries}
          />
        </div>

      </section>
    </div>
  );
}

export default IndiaStats;  