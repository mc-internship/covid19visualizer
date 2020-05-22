import ChoroplethMap from './ChoroplethComponent';

import {
  MAP_META,
  MAP_STATISTICS,
  MAP_TYPES,
  MAP_VIEWS,
  STATE_POPULATIONS,
} from '../../constants.js';

import equal from 'fast-deep-equal';
import React, {useState, useEffect, useMemo} from 'react';

const isEqual = (prevProps, currProps) => {
  if (!equal(prevProps.regionHighlighted, currProps.regionHighlighted)) {
    return false;
  }
  if (!equal(prevProps.mapOption, currProps.mapOption)) {
    return false;
  }
  return true;
};

function MapExplorer({
  mapName,
  states,
  districts,
  regionHighlighted,
  setRegionHighlighted,
  mapOption,
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
  const [statistic, currentMapData] = useMemo(() => {
    let currentMapData = {};
    let statistic = {};
   
    const dataTypes = ['confirmed', 'active', 'recovered', 'deceased'];
    statistic = dataTypes.reduce((acc, dtype) => {
      acc[dtype] = {total: 0, max: 0};
      return acc;
    }, {});
    if (currentMapMeta.mapType === MAP_TYPES.COUNTRY) {
      currentMapData = states.reduce((acc, state) => {
        acc[state.state] = {};
        dataTypes.forEach((dtype) => {
          let typeCount = parseInt(
            state[dtype !== 'deceased' ? dtype : 'deaths']
          );
          if (currentMap.stat === MAP_STATISTICS.PER_MILLION)
            typeCount = (1e6 * typeCount) / STATE_POPULATIONS[state.state];
          if (state.state !== 'Total') {
            statistic[dtype].total += typeCount;
            if (typeCount > statistic[dtype].max) {
              statistic[dtype].max = typeCount;
            }
          }
          acc[state.state][dtype] = typeCount;
        });
        return acc;
      }, {});
    } else if (currentMapMeta.mapType === MAP_TYPES.STATE) {
      const districtWiseData = (
        districts[currentMap.name] || {districtData: {}}
      ).districtData;
      currentMapData[currentMap.name] = Object.keys(districtWiseData).reduce(
        (acc, district) => {
          acc[district] = {};
          dataTypes.forEach((dtype) => {
            const typeCount = parseInt(districtWiseData[district][dtype]);
            statistic[dtype].total += typeCount;
            if (typeCount > statistic[dtype].max) {
              statistic[dtype].max = typeCount;
            }
            acc[district][dtype] = typeCount;
          });
          return acc;
        },
        {}
      );
      currentMapData[currentMap.name].Total = states.find(
        (state) => currentMap.name === state.state
      );
    }
    
    return [statistic, currentMapData];
  }, [
    currentMap.name,
    currentMap.stat,
    currentMapMeta.mapType,
    districts,
    states,
  ]);

  
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
          stat:
            currentMap.stat === MAP_STATISTICS.PER_MILLION
              ? MAP_STATISTICS.TOTAL
              : currentMap.stat,
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
      className={`MapExplorer fadeInUp`}
      style={{
        animationDelay: '1.5s'
      }}
    >
      <div className="header">
        <h1>
          {currentMap.name} {'Map'}
        </h1>
        <h6>
          {window.innerWidth <= 769 ? 'Tap': 'Hover'} over a{' '}
          {currentMapMeta.mapType === MAP_TYPES.COUNTRY
            ? 'state/UT'
            : 'district'}{' '}
          {'for more details'}
        </h6>
      </div>
      <div>
        {mapOption && (
          <ChoroplethMap
            statistic={statistic}
            currentMap={currentMap}
            mapData={currentMapData}
            regionHighlighted={regionHighlighted}
            setRegionHighlighted={setRegionHighlighted}
            isCountryLoaded={isCountryLoaded}
            mapOption={mapOption}
          />
        )}
      </div>
    </div>
  );
}

export default React.memo(MapExplorer, isEqual);
