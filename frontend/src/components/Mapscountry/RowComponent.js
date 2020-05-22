import {STATE_ROW_STATISTICS/*, DISTRICT_ROW_STATISTICS*/} from '../../constants.js';
import {
  formatNumber,
  /*capitalize,
  abbreviate,*/
} from '../../shared/UtilFunctions.js';

import classnames from 'classnames';
import equal from 'fast-deep-equal';
import React, {useState, useCallback, useMemo} from 'react';
import * as Icon from 'react-feather';
//import ReactTooltip from 'react-tooltip';
//import {createBreakpoint, useLocalStorage, useEffectOnce} from 'react-use';

//const useBreakpoint = createBreakpoint({XL: 1280, L: 768, S: 350});

function StateCell({state, statistic}) {
  const ArrowUp = useMemo(() => <Icon.ArrowUp />, []);

  return (
    <td>
      <span className={classnames('delta', `is-${statistic}`)}>
        {state[`delta${statistic}`] > 0 && ArrowUp}
        {state[`delta${statistic}`] > 0 && state[`delta${statistic}`]}
      </span>
      <span className="total">
        {state[statistic] === 0 ? '-' : formatNumber(state[statistic])}
      </span>
    </td>
  );
}
/*
function DistrictHeaderCell({handleSort, statistic, sortData}) {
  const breakpoint = useBreakpoint();
  return (
    <td onClick={() => handleSort(statistic)}>
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
          {sortData.isAscending ? (
            <div className="arrow-up" />
          ) : (
            <div className="arrow-down" />
          )}
        </div>
      </div>
    </td>
  );
}

function PureDistrictCell({district, statistic}) {
  return (
    <td>
      <span className={classnames('delta', `is-${statistic}`)}>
        {district.delta[statistic] > 0 && <Icon.ArrowUp />}
        {district.delta[statistic] > 0 && district.delta[statistic]}
      </span>
      <span className="total">{formatNumber(district[statistic])}</span>
    </td>
  );
}

const DistrictCell = React.memo(PureDistrictCell);

const isDistrictRowEqual = (prevProps, currProps) => {
  if (equal(prevProps.regionHighlighted?.district, prevProps.district)) {
    return false;
  }
  if (equal(currProps.regionHighlighted?.district, currProps.district)) {
    return false;
  }
  return true;
};

function PureDistrictRow({
  regionHighlighted,
  district,
  state,
  onHighlightDistrict,
  sortedDistricts,
  districts,
}) {

  return (
    <tr
      key={district.district}
      className={classnames('district', {
        'is-highlighted': regionHighlighted?.district === district,
      })}
      onMouseEnter={() => onHighlightDistrict(district, state)}
    >
      <td>
        <div className="title-chevron">
          <span className="title-icon">
            {district}
            <span
              data-for="district"
              data-tip={[[sortedDistricts[district].notes]]}
              data-event="touchstart mouseover"
              data-event-off="mouseleave"
              onClick={(e) => e.stopPropagation()}
            >
              {sortedDistricts[district].notes }
            </span>
          </span>
        </div>
      </td>

      {DISTRICT_ROW_STATISTICS.map((statistic) => (
        <DistrictCell
          key={statistic}
          district={districts[district]}
          statistic={statistic}
        />
      ))}
    </tr>
  );
}

const DistrictRow = React.memo(PureDistrictRow, isDistrictRowEqual);
*/
const isEqual = (prevProps, currProps) => {
  if (!equal(prevProps.state.state, currProps.state.state)) {
    return false;
  }
  if (
    !equal(
      prevProps.regionHighlighted?.state,
      currProps.regionHighlighted?.state
    )
  ) {
    return false;
  }
  if (
    !equal(
      prevProps.regionHighlighted?.district,
      currProps.regionHighlighted?.district
    )
  ) {
    return false;
  }
  return true;
};

function Row({
  index,
  state,
  /*districts,*/
  regionHighlighted,
  onHighlightState,
  onHighlightDistrict,
}) {
  //const [sortedDistricts, setSortedDistricts] = useState(districts);
  const [showDistricts, setShowDistricts] = useState(false);
  /*const [sortData, setSortData] = useLocalStorage('districtSortData', {
    sortColumn: 'confirmed',
    isAscending: false,
  });
  */
  const Chevron = useMemo(
    () => (
      <span
        className={classnames(
          'dropdown',
          {rotateRightDown: showDistricts},
          {rotateDownRight: !showDistricts}
        )}
      >
        <Icon.ChevronDown />
      </span>
    ),
    [showDistricts]
  );

  const _onHighlightState = useCallback(
    (state) => {
      if (!equal(state.state, regionHighlighted?.state)) {
        onHighlightState(state);
      }
    },
    [onHighlightState, regionHighlighted]
  );
/*
  const doSort = useCallback(
    (sortData) => {
      const sorted = {};
      Object.keys(sortedDistricts)
        .sort((district1, district2) => {
          if (sortData.sortColumn !== 'district') {
            return sortData.isAscending
              ? parseInt(sortedDistricts[district1][sortData.sortColumn]) -
                  parseInt(sortedDistricts[district2][sortData.sortColumn])
              : parseInt(sortedDistricts[district2][sortData.sortColumn]) -
                  parseInt(sortedDistricts[district1][sortData.sortColumn]);
          } else {
            return sortData.isAscending
              ? district1.localeCompare(district2)
              : district2.localeCompare(district1);
          }
        })
        .forEach((key) => {
          sorted[key] = sortedDistricts[key];
        });
      setSortedDistricts(sorted);
    },
    [sortedDistricts]
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
    if (state.statecode !== 'TT') doSort(sortData);
  });
  */ 

  return (
    <React.Fragment>
      <tr
        className={classnames(
          'state',
          {'is-total': state.statecode === 'TT'},
          {'is-highlighted': regionHighlighted?.state === state.state},
        )}
        onMouseEnter={() => _onHighlightState(state)}
        onClick={
          state.statecode !== 'TT'
            ? () => {
                setShowDistricts(!showDistricts);
              }
            : null
        }
      >
        <td>
          <div className="title-chevron">
            {state.statecode !== 'TT' && Chevron}
            <span className="title-icon">
              {state.state}
            </span>
          </div>
        </td>

        {STATE_ROW_STATISTICS.map((statistic, index) => (
          <StateCell key={index} state={state} statistic={statistic} />
        ))}
      </tr>

      
    </React.Fragment>
  );
}

export default React.memo(Row, isEqual);