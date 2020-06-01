import React, {useState} from 'react';
import DailyConfirmedChart from '../ChartHelpers/DailyCases';
import TotalConfirmedChart from '../ChartHelpers/TotalCases';
import NewVsRecChart from '../ChartHelpers/NewVsRec';
import RecVsDeathChart from '../ChartHelpers/DailyRecVsDeaths';
import ActiveVsRecChart from '../ChartHelpers/ActiveVsRec';
import AllStatesChart from '../ChartHelpers/StatesChart';
import {useEffectOnce} from 'react-use';

//import axios from 'axios';
import {Helmet} from 'react-helmet';

import {italydatajson} from '../dataexport.js';
import {italystatesdaily} from '../dataexport.js';



function ItalyStats(props) {

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
      testJson1 = await italydatajson();
      let testJson2;
      testJson2 = await italystatesdaily();
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
        <title>Italy Timeline</title>
        <meta name="title" content="Graphs" />
      </Helmet>
      <h1 style = {{textAlign: 'center', fontSize: '30px'}}>Italy</h1>
      <section className="cards">
        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <TotalConfirmedChart title="Total Cases - Italy" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <DailyConfirmedChart title="Daily Cases - Italy" timeseries={timeseries} />
        </div>


        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <NewVsRecChart title="Newly Infected vs Newly Recovered - Italy" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <RecVsDeathChart title="Daily Recovered vs Daily Deaths - Italy" timeseries={timeseries} />
        </div>

        <div className="card fadeInUp" style={{animationDelay: '0.7s'}}>
          <ActiveVsRecChart title="Daily Active vs Daily Recovered - Italy" timeseries={timeseries} />
        </div>

        <div
          className="card card-big fadeInUp"
          style={{animationDelay: '0.7s'}}
        >
          <AllStatesChart
            title="Total Cases by State - Italy"
            data={statesTimeSeries}
          />
        </div>



      </section>
    </div>
  );
}

export default ItalyStats;  