import '../../App.scss'
import MapExplorer from './MapMain';
import  Table from './TableComponent';

import axios from 'axios';
import React, {useState, useCallback} from 'react';
import {useEffectOnce} from 'react-use';
import HeadBarAbove from './HeadBarAbove';

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
    
      const [
        {data},
        {data: stateDistrictWiseResponse},
    
      ] = await Promise.all([
        axios.get('https://api.covid19india.org/data.json'),
        axios.get('https://api.covid19india.org/state_district_wise.json')  
      ]);

      setStates(data.statewise);
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
   
  }, []);


  return (

    <React.Fragment>
      
      <div className="Home">
        
        <div className="home-left" styles="overflow-y: scroll; height:400px;" >

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
  
        </div>

        <div className="home-right">
          <React.Fragment>
            {fetched && (
              <MapExplorer
                mapName={'India'}
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

        <div classname='home-new'>
      {fetched && (
              <HeadBarAbove
                mapName={'India'}
                states={states}
                districts={null}               
                regionHighlighted={regionHighlighted}
                setRegionHighlighted={setRegionHighlighted}
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
