import {STATE_ROW_STATISTICS/*, DISTRICT_ROW_STATISTICS*/} from '../../constants.js';
import {
  formatNumber,
  
} from '../../shared/UtilFunctions.js';

import classnames from 'classnames';
import equal from 'fast-deep-equal';
import React, {useState, useCallback, useMemo} from 'react';
import * as Icon from 'react-feather';


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

function Rowwithoutdistrict({
  index,
  state,
  regionHighlighted,
  onHighlightState,
  onHighlightDistrict,
}) {
  const [showDistricts, setShowDistricts] = useState(false);
 
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

export default React.memo(Rowwithoutdistrict, isEqual);
