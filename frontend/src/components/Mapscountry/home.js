import '../../App.scss'
import MapExplorer from './mapexplorer';
import Table from './table';


/*import {
  mergeTimeseries,
  preprocessTimeseries,
  parseStateTimeseries,
  parseStateTestTimeseries,
  parseTotalTestTimeseries,
  parseDistrictZones,
  //  isDevelopmentOrTest,
} from './utils/commonfunctions';
*/
import 'intersection-observer';
import axios from 'axios';
import React, {useState, useCallback/*, useMemo*/} from 'react';
/*import * as Icon from 'react-feather';*/
import {useEffectOnce, useLocalStorage} from 'react-use';
import HeadBarAbove from './HeadBarAbove';

function Home(props) {
  const [states, setStates] = useState(null);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState(null);
 /* const [districtZones, setDistrictZones] = useState(null);*/
  /*const [stateTestData, setStateTestData] = useState(null);*/
 /* const [lastUpdated, setLastUpdated] = useState('')*/
  /*const [timeseries, setTimeseries] = useState(null);*/
  const [fetched, setFetched] = useState(false);
  const [regionHighlighted, setRegionHighlighted] = useState({
    state: 'Total',
  });
  /*const [showUpdates, setShowUpdates] = useState(false);*/
  const [anchor, setAnchor] = useState(null);
  const [mapOption, setMapOption] = useState('confirmed');
  /*const [isTimeseriesIntersecting, setIsTimeseriesIntersecting] = useState(
    false
  );*/

  const [lastViewedLog, setLastViewedLog] = useLocalStorage(
    'lastViewedLog',
    null
  );
 /* const [newUpdate, setNewUpdate] = useLocalStorage('newUpdate', false);

  const Bell = useMemo(
    () => (
      <Icon.Bell
        onClick={() => {
          setShowUpdates(!showUpdates);
          setNewUpdate(false);
        }}
      />
    ),
    [setNewUpdate, showUpdates]
  );
*/
 /* const BellOff = useMemo(
    () => (
      <Icon.BellOff
        onClick={() => {
          setShowUpdates(!showUpdates);
        }}
      />
    ),
    [showUpdates]
  );
*/
  useEffectOnce(() => {
    getStates();
  });

  /*useEffectOnce(() => {
    axios
      .get('https://api.covid19india.org/updatelog/log.json')
      .then((response) => {
        const lastTimestamp = response.data
          .slice()
          .reverse()[0]
          .timestamp.toString();
        if (lastTimestamp !== lastViewedLog) {
         /* setNewUpdate(true);
          setLastViewedLog(lastTimestamp);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  });*/

  const getStates = async () => {
    try {
      /*const [
       {data: statesDailyResponse},
        /*{data: zonesResponse},
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/states_daily.json'),
       /* axios.get('https://api.covid19india.org/zones.json'),
      ]);*/

      const [
        {data},
        {data: stateDistrictWiseResponse},
        /*{data: stateTestData},*/
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json'),
        /*axios.get('https://api.covid19india.org/state_test_data.json'),*/
      ]);

      setStates(data.statewise);
     /* setDistrictZones(parseDistrictZones(zonesResponse.zones));*/

      /*const ts = parseStateTimeseries(statesDailyResponse);
      ts['TT'] = preprocessTimeseries(data.cases_time_series);*/
      // Testing data timeseries
      /*const testTs = parseStateTestTimeseries(stateTestData.states_tested_data);*/
      /*testTs['TT'] = parseTotalTestTimeseries(data.tested);*/
      // Merge
     /* const tsMerged = mergeTimeseries(ts, testTs);*/
      /*setTimeseries(tsMerged);*/

      /*setLastUpdated(data.statewise[0].lastupdatedtime);*/

      /*const testData = [...stateTestData.states_tested_data].reverse();*/
      /*const totalTest = data.tested[data.tested.length - 1];*/
      /*testData.push({
        updatedon: totalTest.updatetimestamp.split(' ')[0],
        totaltested: totalTest.totalsamplestested,
        source: totalTest.source,
        state: 'Total',
      });*/
     /* setStateTestData(testData);*/

      setStateDistrictWiseData(stateDistrictWiseResponse);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }
  };


  const onHighlightState = useCallback((state) => {
    if (!state) return setRegionHighlighted(null);
    setRegionHighlighted({state: state.state});
  }, []);

  const onHighlightDistrict = useCallback((district, state) => {
   /* if (!state && !district) return setRegionHighlighted(null);
    setRegionHighlighted({district, state: state.state});*/
  }, []);

  

  /*const options = {
    rootMargin: '0px 0px 0px 0px',
  };
*/
  return (

    <React.Fragment>
      
      <div className="Home">

        
        <div className="home-left" styles="overflow-y: scroll; height:400px;" >

        {stateDistrictWiseData && (
            <Table
              states={states}
              summary={false}
              districts={stateDistrictWiseData}
              /*zones={districtZones}*/
              regionHighlighted={regionHighlighted}
              setRegionHighlighted={setRegionHighlighted}
              onHighlightState={onHighlightState}
              onHighlightDistrict={onHighlightDistrict}
            />
          )}
  
        </div>

        <div className="home-right">
          <React.Fragment>
            {fetched && (
              <MapExplorer
                mapName={'India'}
                states={states}
                districts={null}
                zones={null}
                /*stateTestData={null}*/
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
                anchor={anchor}
                setAnchor={setAnchor}
                mapOption={mapOption}
                setMapOption={setMapOption}
              />
            )}

          </React.Fragment>
        </div>

        <div classname='home-new'>
      {fetched && (
              <HeadBarAbove
                mapName={'India'}
                states={states}
                districts={null}
                zones={null}
                /*stateTestData={null}*/
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
                anchor={anchor}
                setAnchor={setAnchor}
                mapOption={mapOption}
                setMapOption={setMapOption}
              />
            )}
      </div>
      </div>
      
    </React.Fragment>
  );
}

export default Home;