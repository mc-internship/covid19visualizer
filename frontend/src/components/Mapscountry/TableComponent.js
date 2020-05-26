import Row from './RowComponent';
import Rowwithoutdistrict from './RowComponentwithoutdistricts'

import {STATE_ROW_STATISTICS} from '../../constants.js';
import {capitalize, abbreviate} from '../../shared/UtilFunctions.js';

import classnames from 'classnames';
import equal from 'fast-deep-equal';
import React, {useState,  useCallback} from 'react';
import ReactTooltip from 'react-tooltip';
import {createBreakpoint, useLocalStorage, useEffectOnce} from 'react-use';

const useBreakpoint = createBreakpoint({XL: 1280, L: 768, S: 350});

function StateHeaderCell({handleSort, sortData, statistic}) {
  const breakpoint = useBreakpoint();

  return (
    <th onClick={() => handleSort(statistic)}>
      <div className="heading-content">
        <abbr
          className={classnames({[`is-${statistic}`]: breakpoint === 'S'})}
          title={statistic}
        >
          {breakpoint === 'L'
            ? statistic.slice(0)
            : breakpoint === 'S'
            ? capitalize(
                abbreviate(statistic === 'deaths' ? 'deceased' : statistic)
              )
            : capitalize(statistic === 'deaths' ? 'deceased' : statistic)}
        </abbr>
        <div
          style={{
            display: sortData.sortColumn === statistic ? 'initial' : 'none',
          }}
        >
          <div
            className={classnames(
              {'arrow-up': sortData.isAscending},
              {'arrow-down': !sortData.isAscending}
            )}
          />
        </div>
      </div>
    </th>
  );
}

const isEqual = (prevProps, currProps) => {
  return equal(prevProps.regionHighlighted, currProps.regionHighlighted);
};

function Table({
  states,
  districts,
  regionHighlighted,
  onHighlightState,
  onHighlightDistrict,
}) {
  const [sortData, setSortData] = useLocalStorage('sortData', {
    sortColumn: 'confirmed',
    isAscending: false,
  });

  const [sortedStates, setSortedStates] = useState(
    states.filter((state) => state.statecode !== 'TT')
  );

  const doSort = useCallback(
    (sortData) => {
      const newSortedStates = [...sortedStates].sort((x, y) => {
        if (sortData.sortColumn !== 'state') {
          return sortData.isAscending
            ? parseInt(x[sortData.sortColumn]) -
                parseInt(y[sortData.sortColumn])
            : parseInt(y[sortData.sortColumn]) -
                parseInt(x[sortData.sortColumn]);
        } else {
          return sortData.isAscending
            ? x[sortData.sortColumn].localeCompare(y[sortData.sortColumn])
            : y[sortData.sortColumn].localeCompare(x[sortData.sortColumn]);
        }
      });
      setSortedStates(newSortedStates);
    },
    [sortedStates]
  );

  const handleSort = useCallback(
    (statistic) => {
      const newSortData = {
        isAscending: !sortData.isAscending,
        sortColumn: statistic,
      };
      doSort(newSortData);
      setSortData(Object.assign({}, sortData, newSortData));
    },
    [doSort, setSortData, sortData]
  );

  useEffectOnce(() => {
    doSort(sortData);
  });

  if (states.length > 0) {
    return (
      <React.Fragment>
        <ReactTooltip
          place="right"
          type="dark"
          effect="solid"
          multiline={true}
          globalEventOff="click"
        />

        <table className="table fadeInUp" style={{animationDelay: '1.8s'}}>
          <thead>
            <tr>
              <th className="state-heading" onClick={() => handleSort('state')}>
                <div className="heading-content">
                  <abbr title="State">{'State/UT'}</abbr>
                  <div
                    style={{
                      display:
                        sortData.sortColumn === 'state' ? 'initial' : 'none',
                    }}
                  >
                    <div
                      className={classnames(
                        {'arrow-up': sortData.isAscending},
                        {'arrow-down': !sortData.isAscending}
                      )}
                    />
                  </div>
                </div>
              </th>
              {STATE_ROW_STATISTICS.map((statistic, index) => (
                <StateHeaderCell
                  key={index}
                  handleSort={handleSort}
                  sortData={sortData}
                  statistic={statistic}
                />
              ))}
            </tr>
          </thead>
          <div>
     
      { console.log(districts) }
      {console.log(sortedStates)}
    </div>
        {sortedStates && (
          <tbody>
              
            {sortedStates.map((state, index) => {
              if(districts!=5){
                if (state.confirmed > 0 && state.statecode !== 'TT' && state.state !== 'Dadra and Nagar Haveli') {
                  
                  return (
                    <Row
                      key={state.statecode}
                      state={state}
                      districts={districts[state.state]?.districtData}
                      regionHighlighted={
                        equal(regionHighlighted?.state, state.state)
                          ? regionHighlighted
                          : null
                      }
                      onHighlightState={onHighlightState}
                      onHighlightDistrict={onHighlightDistrict}
                    />
                  );
                }}
                else{
                  if (state.confirmed > 0 && state.statecode !== 'TT' && state.state !== 'Dadra and Nagar Haveli') {
                  
                    return (
                      <Rowwithoutdistrict
                        key={state.statecode}
                        state={state}
                        regionHighlighted={
                          equal(regionHighlighted?.state, state.state)
                            ? regionHighlighted
                            : null
                        }
                        onHighlightState={onHighlightState}
                        onHighlightDistrict={onHighlightDistrict}
                      />
                    );
                  }
                }
                return null;
              })}
            </tbody>
          )}

          {states && (
            <tbody>
              <Row
                key={0}
                state={states[0]}
                onHighlightState={onHighlightState}
              />
            </tbody>
          )}
        </table>
      </React.Fragment>
    );
  } else {
    return <div style={{height: '50rem'}}></div>;
  }
}

export default React.memo(Table, isEqual);
