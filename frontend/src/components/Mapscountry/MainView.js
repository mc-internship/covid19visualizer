//import indiadatajson from '../data/indiadatajson.json';
/*import germandatajson from '../data/germanydatajson.json'
import italydatajson from '../data/italydatajson.json'
import usadatajson from '../data/usadatajson.json'
import singaporedatajson from '../data/singaporedatajson.json'
import germanystatesdistrict from '../data/germanysatesdistrict.json'
import usastatesdistrict from '../data/usadistricts.json'*/
import {germanydatajson,indiadatajson,italydatajson,singaporedatajson,usadatajson,germanysatesdistrict,usadistricts} from '../dataexport.js';

import '../../App.scss'
import MapExplorer from './MapMain';
import  Table from './TableComponent';

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
      

 
  let testJson;
  if(props.nameofmap === 'India'){testJson = await indiadatajson();}
  if(props.nameofmap === 'Germany'){testJson = await germanydatajson();}
  if(props.nameofmap === 'Italy'){testJson = await italydatajson()}
  if(props.nameofmap === 'USA'){testJson = await usadatajson();}
  if(props.nameofmap === 'Singapore'){testJson = await singaporedatajson();}

  
  setStates(testJson.statewise)


    let testJson2;
    if(props.nameofmap === "Germany"){
      testJson2 = await germanysatesdistrict();
      setStateDistrictWiseData(testJson2)
    }
    else if(props.nameofmap === "USA"){
      testJson2 = await usadistricts(); 
      setStateDistrictWiseData(testJson2);
    } 
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
