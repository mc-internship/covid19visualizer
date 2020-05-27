
import {
    MAP_META,
    MAP_STATISTICS,
    MAP_TYPES,
    MAP_VIEWS,
  } from '../../constants.js';

import equal from 'fast-deep-equal';
import React, {useState, useEffect} from 'react';

const isEqual = (prevProps, currProps) => {
  if (!equal(prevProps.regionHighlighted, currProps.regionHighlighted)) {
    return false;
  }
  if (!equal(prevProps.mapOption, currProps.mapOption)) {
    return false;
  }
  if (!equal(prevProps.anchor, currProps.anchor)) {
    return false;
  }
  return true;
};

/*const getRegionFromState = (state) => {
  if (!state) return;
  const region = {...state};
  return region;
};

const getRegionFromDistrict = (districtData, name) => {
  if (!districtData) return;
  const region = {...districtData};
  return region;
};*/

function HeadBarAbove({
  mapName,
  states,
  districts,
  regionHighlighted,
  mapOption,
  setMapOption,
  isCountryLoaded = true,
}) {
  const [currentMap, setCurrentMap] = useState({
    name: mapName,
    stat: MAP_STATISTICS.TOTAL,
    view:
      MAP_META[mapName].mapType === MAP_TYPES.COUNTRY
        ? MAP_VIEWS.STATES
        : MAP_VIEWS.DISTRICTS,
  });
  const currentMapMeta = MAP_META[currentMap.name];

  /*const [hoveredRegion, panelRegion] = useMemo(() => {
    if (!regionHighlighted.district) {
      const state = getRegionFromState(
        states.find((state) => regionHighlighted.state === state.state)
      );
      return [state, state];
    } else {
      const stateDistrictObj = districts[regionHighlighted.state] || {
        districtData: {},
      };
      const districtData = stateDistrictObj.districtData[
        regionHighlighted.district
      ] || {
        confirmed: 0,
        active: 0,
        recovered: 0,
        deaths: 0,
      };
      const district = getRegionFromDistrict(
        districtData,
        regionHighlighted.district
      );
      let state = getRegionFromState(
        states.find((state) => state.state === regionHighlighted.state)
      );
      district.district = regionHighlighted.district;
      district.state = state.state;
      if (currentMapMeta.mapType === MAP_TYPES.COUNTRY)
        state = states.find((state) => state.state === 'Total');
      return [district, state];
    }
  }, [states, districts, currentMapMeta.mapType, regionHighlighted]);*/

  useEffect(() => {
    if (regionHighlighted === undefined || regionHighlighted === null) return;

    if ('district' in regionHighlighted) {
      if (
        currentMap.name !== regionHighlighted.state &&
        !(
          currentMapMeta.mapType === MAP_TYPES.COUNTRY &&
          currentMap.view === MAP_VIEWS.DISTRICTS
        )
      ) {
        const state = regionHighlighted.state;
        const newMapMeta = MAP_META[state];
        if (!newMapMeta) {
          return;
        }
        setCurrentMap({
          name: state,
          view: MAP_VIEWS.DISTRICTS,
          stat: MAP_STATISTICS.TOTAL
        });
      }
    } else if (isCountryLoaded && currentMapMeta.mapType === MAP_TYPES.STATE) {
      setCurrentMap({
        name: 'India',
        view: MAP_VIEWS.STATES,
        stat: currentMap.stat,
      });
    }
  }, [isCountryLoaded, regionHighlighted, currentMap, currentMapMeta.mapType]);

  return (
    <div
      className={`MapStatistics fadeInUp`}
      style={{
        animationDelay: '1.5s'
      }}
    >
      <div className="map-stats">
        <div
          className={`stats fadeInUp ${
            mapOption === 'confirmed' ? 'focused' : ''
          }`}
          style={{animationDelay: '2s'}}
          onClick={() => setMapOption('confirmed')}
        >
          <h5>{window.innerWidth <= 769 ? 'Cnfmd': 'Confirmed'}</h5>
          <div className="stats-bottom">
            <h1>{/*formatNumber(panelRegion.confirmed)*/}</h1>
            <h6>{/*`+${formatNumber(panelRegion.deltaconfirmed)}`*/}</h6>
          </div>
        </div>

        <div
          className={`stats is-blue fadeInUp ${
            mapOption === 'active' ? 'focused' : ''
          }`}
          style={{animationDelay: '2.1s'}}
          onClick={() => setMapOption('active')}
        >
          <h5>{window.innerWidth <= 769 ? 'Actv' : 'Active'}</h5>
          <div className="stats-bottom">
            <h1>{/*formatNumber(panelRegion.active)*/}</h1>
            <h6>{/*` `*/}</h6>
          </div>
        </div>

        <div
          className={`stats is-green fadeInUp ${
            mapOption === 'recovered' ? 'focused' : ''
          }`}
          style={{animationDelay: '2.2s'}}
          onClick={() => setMapOption('recovered')}
        >
          <h5>{window.innerWidth <= 769 ? 'Rcvrd' : 'Recovered'}</h5>
          <div className="stats-bottom">
            <h1>{/*formatNumber(panelRegion.recovered)*/}</h1>
            <h6>{/*`+${formatNumber(panelRegion.deltarecovered)}`*/}</h6>
          </div>
        </div>

        <div
          className={`stats is-gray fadeInUp ${
            mapOption === 'deceased' ? 'focused' : ''
          }`}
          style={{animationDelay: '2.3s'}}
          onClick={() => setMapOption('deceased')}
        >
          <h5>{window.innerWidth <= 769 ? 'Dcsd' : 'Deceased'}</h5>
          <div className="stats-bottom">
            <h1>{/*formatNumber(panelRegion.deaths)*/}</h1>
            <h6>{/*`+${formatNumber(panelRegion.deltadeaths)}`*/}</h6>
          </div>
        </div>
      </div>
    </div>
  );
}

export default React.memo(HeadBarAbove, isEqual);


