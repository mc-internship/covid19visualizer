import indiadatajson from '../data/indiadatajson.json';
import germandatajson from '../data/germanydatajson.json'
import italydatajson from '../data/italydatajson.json'
import usadatajson from '../data/usadatajson.json'
import singaporedatajson from '../data/singaporedatajson.json'
import germanystatesdistrict from '../data/germanysatesdistrict.json'
import usastatesdistrict from '../data/usadistricts.json'

import '../../App.scss'
import MapExplorer from './MapMain';
import  Table from './TableComponent';

import axios from 'axios';
import React, {useState, useCallback} from 'react';
import {useEffectOnce} from 'react-use';
import HeadBarAbove from './HeadBarAbove';
import LeftPanel from './StateStats';

function Home(props) {
  const [states, setStates] = useState(null);
  const [stateDistrictWiseData, setStateDistrictWiseData] = useState(null);
  const [fetched, setFetched] = useState(false);
  const [regionHighlighted, setRegionHighlighted] = useState({
    state: 'Total',
  });
  const [mapOption, setMapOption] = useState('confirmed');
  
  useEffectOnce(() => {
    getStates();
  });
  
  const getStates = async () => {
    try {
    
     /* const [
        /*{data},
        {data: stateDistrictWiseResponse},
    
      ] = await Promise.all([
        /*axios.get('http://localhost:8000/covidDataIndiaStatewise/2/?format=json'),
        axios.get('https://api.covid19india.org/state_district_wise.json')  
      ]);*/
      
  if(props.nameofmap === 'India'){setStates(indiadatajson.statewise);}
  if(props.nameofmap === 'Germany'){setStates(germandatajson.statewise);}
  if(props.nameofmap === 'Italy'){setStates(italydatajson.statewise);}
  if(props.nameofmap === 'USA'){setStates(usadatajson.statewise);}
  if(props.nameofmap === 'Singapore'){setStates(singaporedatajson.statewise);}

  
      /*setStateDistrictWiseData(stateDistrictWiseResponse);
      setFetched(true);
    } catch (err) {
      console.log(err);
    }*/
    if(props.nameofmap == "Germany")
      setStateDistrictWiseData(germanystatesdistrict);
    else if(props.nameofmap == "USA")
      setStateDistrictWiseData(usastatesdistrict);  
    else 
      setStateDistrictWiseData(5)
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
   
  }, []);


  return (

    <React.Fragment>
      
      <div className="Home">
        
        <div className="home-right" styles="overflow-y: scroll; height:400px;" >
        <React.Fragment>
        {stateDistrictWiseData && (
            <Table
              states={states}
              summary={false}
              districts={stateDistrictWiseData}
              
              regionHighlighted={regionHighlighted}
              setRegionHighlighted={setRegionHighlighted}
              onHighlightState={onHighlightState}
              onHighlightDistrict={onHighlightDistrict}
            />
          )}
          </React.Fragment>
  
        </div>

        <div className="home-middle">
          <React.Fragment>
            {fetched && (
              <MapExplorer
                mapName={props.nameofmap}
                states={states}
                districts={null}                
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
                mapOption={mapOption}
                setMapOption={setMapOption}
              />
            )}
          </React.Fragment>

          <div classname="home-new">
          <React.Fragment>
            {fetched && (
              <HeadBarAbove
                mapName={props.nameofmap}
                states={states}
                districts={null}               
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
                mapOption={mapOption}
                setMapOption={setMapOption}
              />
            )}
            </React.Fragment>
          </div>
        </div>

        {/*<div classname="home-new">
      {fetched && (
              <HeadBarAbove
                mapName={props.nameofmap}
                states={states}
                districts={null}               
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
                mapOption={mapOption}
                setMapOption={setMapOption}
              />
            )}
      </div>*/}

      <div classname="home-left">
      <React.Fragment>
      {fetched && (
              <LeftPanel
                mapName={props.nameofmap}
                states={states}
                districts={null}               
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
                mapOption={mapOption}
                setMapOption={setMapOption}
              />
            )}
        </React.Fragment>
      </div>
      </div>
      
    </React.Fragment>
  );
}

export default Home;
